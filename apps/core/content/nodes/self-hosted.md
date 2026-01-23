---
head:
  - - meta
    - property: og:title
      content: Self-Hosted RPC Guide
  - - meta
    - name: description
      content: How to efficiently use RPCs and set up self-hosted RPC infrastructure for Berachain
  - - meta
    - property: og:description
      content: How to efficiently use RPCs and set up self-hosted RPC infrastructure for Berachain
---

# Self-Hosted RPC Guide

## Introduction

Berachain operates public RPCs at rpc.berachain.com. These serve normal everyday usage by end-users. Even so, some commercial projects route their backend transaction traffic through these public services. This poses reliability and performance risks to those projects. This article explains how to make your systems efficient, and cost-effectively build or rent a substitute for [public RPCs](https://docs.berachain.com/developers/developer-tools#rpc-infrastructure-providers).

## 1. How to Use an RPC Efficiently

You can transmit queries through two mechanisms. The most common is ETH-RPC, which involves looking up the server address, establishing a TCP connection to the server, negotiating SSL connection parameters, transmitting the RPC call, then closing the connection. If you're transmitting a few queries and then signing a transaction, this is a reasonable approach.

However, if you are performing dozens or hundreds of queries per second, this connection overhead adds up quickly. There's a better way: [websockets](https://ethereum.org/bs/developers/tutorials/using-websockets/). WebSocket connections are, in principle, permanent. After you establish them, they can last for seconds or hours.

In addition to regular ETH-RPC queries, a new category of RPC call becomes available: `eth_subscribe`. You can subscribe for a variety of events:

- when new transactions enter the transaction pool
- when new blocks appear
- when transactions log events matching given criteria

Putting this together, we can identify anti-patterns and what to replace them with:

| Antipattern                              | Do this instead                              |
| ---------------------------------------- | -------------------------------------------- |
| Dozens or more connections every second  | Persistent websocket connection              |
| Polling `eth_blockNumber` for new blocks | `eth_subscribe` to `newHeads` over websocket |
| Calling `eth_getLogs` frequently         | `eth_subscribe` for events over websocket    |

Using `eth_subscribe` as a substitute for `eth_getLogs` provides immediate notification of events, dramatically more efficient processing, and suffers fewer transient connection failures.

## 2. Inexpensive Paid Services

Paid services vary in their approach to pricing, but generally work on a model where you purchase a given amount of API credits, and providers price ETH-RPC calls according to their computational cost. You might expect to see costs of around $1-$2 per 100,000 requests.

We have a useful list of paid RPC providers on our [developer tools page](https://docs.berachain.com/developers/developer-tools#rpc-infrastructure-providers).

## 3. Running Your Own RPC

Running a Berachain node requires two software components - the consensus layer (Beacon-Kit) and the execution layer (bera-reth or bera-geth). These are separate processes, each with their own database and configuration. Berachain provides simple node setup and launch scripts that support this combination, using one of two approaches:

1. individual "setup" and "run" commands for each of the chain's components
   ```
   ./fetch-berachain-params.sh
   ./setup-beacond.sh
   ./setup-reth.sh
   ./run-beacond.sh &
   ./run-reth.sh &
   ```
2. a complete "launch a node for me" command that downloads appropriate executables for Beacon-Kit and the execution layer, configures them, installs a chain-state snapshot, and prepares `systemd` units, ready to start.
   ```
   mkberanode.sh --chain mainnet --el reth --mode pruned
   sudo systemctl start berachain-el
   sudo systemctl start berachain-cl
   ```

You can find both approaches in the Guides repository, and the Quickstart [describes them](https://docs.berachain.com/nodes/quickstart).

Another common choice is to operate in Docker/Kubernetes.

## 4. Reliability and Pricing

Berachain sets its public RPCs to commercially normal use limits. These endpoints are designed for end users sending transactions, not for running the backend of a service. Commercial projects should provision their own infrastructure or use paid services.

When choosing an RPC solution, you have several options. Free services from the Berachain community are available and listed on our [developer tools page](https://docs.berachain.com/developers/developer-tools#rpc-infrastructure-providers). Public paid services typically cost around $42/month for 40M requests, providing roughly 30 requests per second sustained over the month. For a private RPC service you manage yourself, expect costs around $100/month for essentially unlimited requests, with hundreds of requests per second depending on your infrastructure provisioning.

Paid providers build redundancy into their offerings, but if you're assembling your own multi-provider setup, you'll want a layer that handles failover automatically. [eRPC](https://github.com/erpc/erpc) is one such tool: a fault-tolerant RPC proxy that sits in front of multiple upstreams and manages retries, circuit breakers, failovers, and hedged requests. It routes traffic to the fastest healthy provider, caches responses to reduce upstream load, and provides a single endpoint for your application regardless of how many backends you're actually using.
