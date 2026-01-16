## Introduction

Berachain operates public RPCs at rpc.berachain.com. These serve normal everyday usage by end-users. Even so, some commercial projects route their backend transaction traffic through these public services. This poses reliability and performance risks to those projects. This article explains how to make your systems efficient, and cost-effectively build or rent a substitute for [public RPCs](https://docs.berachain.com/developers/developer-tools#rpc-infrastructure-providers).

1. How to use an RPC efficiently

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

2. Inexpensive paid services

Paid services vary in their approach to pricing, but generally work on a model where you purchase a given amount of API credits, and providers price ETH-RPC calls according to their computational cost. You might expect to see costs of around $1-$2 per 100,000 requests.

We have a useful list of paid RPC providers on our [developer tools page](https://docs.berachain.com/developers/developer-tools#rpc-infrastructure-providers).

3. Running your own RPC

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

## 4. Reliability

Berachain is setting its RPCs to commercially normal public RPC use limits. The use case enables end users to send transactions, not for running the backend of a service.

Use RPCs efficiently by caching receipts and logs, and avoiding repeated `eth_getLogs` / `eth_blockNumber` / `'latest'` calls every N seconds. Instead, use websockets and subscribe.

---

    - Berachain is setting its RPCs to commercially normal public RPC use limts

    - Use case enables end users to send transactions.

    - Not for running the backend of a service

- Use RPCs efficiently
  - cache receipts and logs
  - repeatede getLogs / eth_blockNumber / ('latest') every N seconds
    - use websockets / subscribe

- Options are:
  - Free services from Bera community
    https://docs.berachain.com/developers/developer-tools#rpc-infrastructure-providers

  - Public paid services
    $42/mo at Quicknode gets you 40M requests
    30 requests/sec all month long

  - Private RPC service you manage
    $100/mo basically unlimited, hundreds of request/sec depending on what you provision

  - What about failover? SKIP THIS
    Paid services include a lot of redundancy
    Roll your own with eRPC https://github.com/erpc/erpc
