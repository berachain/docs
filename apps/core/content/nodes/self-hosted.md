---
head:
  - - meta
    - property: og:title
      content: Self-Hosted RPC Guide
  - - meta
    - name: description
      content: How to efficiently use RPCs and choose paid or self-hosted options for Berachain
  - - meta
    - property: og:description
      content: How to efficiently use RPCs and choose paid or self-hosted options for Berachain
---

# Self-Hosted RPC Guide

## Introduction

Berachain operates public RPCs at https://rpc.berachain.com/. These serve normal, day-to-day usage by end users. Some commercial projects also route production backend traffic through these public services; that can make it harder to hit strict latency and availability targets on a shared, rate-limited endpoint. This article covers the highest-leverage fixes for app developers. Start with usage patterns, then move on to replacing [public RPCs](https://docs.berachain.com/developers/developer-tools#rpc-infrastructure-providers) when you need dedicated capacity.

## 1. How to Use an RPC Efficiently

You can transmit queries through two common transports. The most common is JSON-RPC over HTTP or HTTPS. Well-behaved clients typically reuse connections with keep-alive enabled, but high request rates still pay per-request overhead from headers, request and response framing, and retry behaviour. That overhead can amplify tail latency.

Retry discipline matters at least as much as raw request volume. If you are seeing `429` rate limits or intermittent timeouts, avoid “retry immediately” loops: they create retry storms that make throttling worse and can turn partial degradation into a full outage. Use exponential backoff with jitter, honour `Retry-After` when present, and cap retries. When upstreams stay unhealthy, shed load by queueing work, degrading non-critical reads, or failing fast. Be especially careful retrying write flows; reads are typically safe to retry, but duplicate submissions can surprise you.

If you need streaming updates or you are polling aggressively, [WebSockets](https://ethereum.org/developers/tutorials/using-websockets/) are often a better fit. WebSocket connections are long-lived, which makes push workflows viable and reduces churn from repeated connect/reconnect cycles.

In addition to regular JSON-RPC queries, a new category of RPC call becomes available over WebSockets: `eth_subscribe`. You can subscribe to a variety of events: when new blocks appear, or when transaction logs match given criteria.

Putting this together, we can identify anti-patterns and what to replace them with:

| Anti-pattern                             | Do this instead                              |
| ---------------------------------------- | -------------------------------------------- |
| Short-lived HTTP connections without keep-alive | Enable keep-alive or use a persistent WebSocket |
| Polling `eth_blockNumber` for new blocks | `eth_subscribe` to `newHeads` over WebSocket |
| Calling `eth_getLogs` frequently         | `eth_subscribe` for events over WebSocket    |

Subscriptions provide immediate notification of new data and can dramatically reduce load compared to polling. They do not replace `eth_getLogs` for historical backfills, and they are not a delivery guarantee. Production consumers still need reconnect and resubscribe logic, plus a robust way to detect and repair gaps. A common pattern tracks the last processed block and uses `eth_getLogs` to reconcile after reconnects.

For event-heavy workloads such as analytics, indexing, and historical backfills, hammering `eth_getLogs` directly from app servers is usually the wrong tool. Prefer an indexing service and query it over a purpose-built API; Goldsky supports Berachain, and their [Berachain docs](https://docs.goldsky.com/chains/berachain) show the current options. Reserve RPC log queries for narrow reconciliation. If you do use `eth_getLogs`, keep queries tight by filtering on contract address and topics, chunk by block range, checkpoint the last processed block, and run it from a single worker to avoid redundant scans.

If your pain is not reads, but user write flows, reduce round-trips per user action. Where supported, standards like [EIP-5792](https://eips.ethereum.org/EIPS/eip-5792), via `wallet_sendCalls`, can batch multiple calls into a single wallet flow, cutting RPC chatter and wallet friction in multi-step sequences.

## 2. Inexpensive Paid Services

Paid services vary in their approach to pricing, but generally work on a model where you purchase API credits and providers price JSON-RPC calls according to their computational cost. Costs vary widely by request mix; simple reads are usually cheaper than log queries, and cacheability and archive access also matter. Treat any single "$X per 100,000 requests" number as an order-of-magnitude estimate, not a budget.

We have a useful list of paid RPC providers on our [developer tools page](https://docs.berachain.com/developers/developer-tools#rpc-infrastructure-providers).

## 3. Running Your Own RPC When You Need Isolation

If you need predictable throughput, hard isolation, or you cannot tolerate multi-tenant rate limits, the next step is operating a private RPC endpoint backed by your own node. A Berachain node has two components: the consensus layer, Beacon-Kit, and the execution layer, bera-reth or bera-geth. For setup instructions, use the node Quickstart, which stays current as tooling changes: [nodes/quickstart](https://docs.berachain.com/nodes/quickstart).

## 4. Reliability and Pricing

Berachain sets its public RPCs to commercially typical usage limits. These endpoints are designed for end users sending transactions, not for running the backend of a service. Commercial projects should provision their own infrastructure or use paid services.

When choosing an RPC solution, you have several options. Free services from the Berachain community are available and listed on our [developer tools page](https://docs.berachain.com/developers/developer-tools#rpc-infrastructure-providers). Paid services usually price by request credits and redundancy tier; self-hosting shifts cost into compute, storage, and operational overhead. In practice, the "right" choice depends less on raw request count and more on your latency targets, failure tolerance, and whether your workload relies on expensive calls like log queries.

Paid providers build redundancy into their offerings. If you are stitching together multiple RPC backends yourself, whether for cost or redundancy, put a single proxy in front so your app talks to one endpoint and the proxy picks an upstream. [eRPC](https://github.com/erpc/erpc) is one option: it can automatically route around slow or erroring providers, retry some requests, and optionally cache common reads to reduce upstream load.

## Summary

Optimize your usage patterns before you spend money. Persistent WebSocket connections and `eth_subscribe` often reduce load and improve timeliness, but treat subscriptions as best-effort and reconcile after reconnects. For production traffic, use either a paid provider or a dedicated self-hosted node; if you self-host, treat it like a service: add [monitoring](/nodes/monitoring) and alerting, and consider a failover layer like eRPC.

