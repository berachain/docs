---
head:
  - - meta
    - property: og:title
      content: Berachain  Upgrade Instructions
  - - meta
    - name: description
      content: Berachain  upgrade instructions
  - - meta
    - property: og:description
      content: Berachain  upgrade instructions
---

# Arctic Hardfork 🔱

Our next upgrade brings to Berachain four approved Improvement Proposals.

1. [BRIP-0001 - Execution Layer Forked Clients](https://github.com/berachain/BRIPs/blob/main/meta/BRIP-0001.md)
2. [BRIP-0002 - Gas Fee Modifications](https://github.com/berachain/BRIPs/blob/main/meta/BRIP-0002.md)
3. [BRIP-0003 - Stable Block Time](https://github.com/berachain/BRIPs/blob/main/meta/BRIP-0003.md)
4. [BRIP-0004 - Enshrined PoL Reward Distribution](https://github.com/berachain/BRIPs/blob/main/meta/BRIP-0004.md)

[Bera-reth](https://github.com/berachain/bera-reth) and [Bera-geth](https://github.com/berachain/bera-geth) are new forks of ParadymXYZ's reth and Ethereum Foundation's go-ethereum, under the upstream software licenses.

:::warning
All users, whether hosting an RPC or running a validator, **must upgrade** their Execution Client to either Bera-reth or Bera-geth, **and** upgrade to Beacon Kit TBD, to continue following the chain.
:::

## Arctic Upgrade Timeline

| Date                     | Milestone                                                                              |
| ------------------------ | -------------------------------------------------------------------------------------- |
| July 21, 2025            | Beacon-Kit TBD-rc, Bera-geth TBD-rc and Bera-reth released for installation to Bepolia |
| July 28, 2025            | All Bepolia infrastructure partners expected to be upgraded                            |
| July 30, 2025 @ Noon EDT | Bepolia upgrade activates                                                              |
| mid August               | Mainnet upgrade instructions posted                                                    |
| late August              | Mainnet hardfork activates                                                             |

## New Chain Clients and Genesis Files

| Chain   | Client                                                                         |
| ------- | ------------------------------------------------------------------------------ |
| Bepolia | [Bera-geth vTBD-rc](https://github.com/berachain/bera-geth/releases/tag/TBD)   |
| Bepolia | [Bera-reth vTBD-rc](https://github.com/berachain/bera-reth/releases/tag/TBD)   |
| Bepolia | [Beacon-Kit vTBD-rc](https://github.com/berachain/beacon-kit/releases/tag/TBD) |

| Chain   | Genesis file & hash                                                                              |
| ------- | ------------------------------------------------------------------------------------------------ |
| Bepolia | [TBD](https://github.com/berachain/beacon-kit/blob/main/testing/networks/80069/eth-genesis.json) |

Berachain will release stand-alone executables and Docker images for Linux ARM and AMD64 architectures. All clients are easily compiled for other systems and architectures with a few minutes' time; review their respective READMEs for details.

Operators currently running Geth or Reth can upgrade to our forked versions while retaining their current chain data files. Operators migrating from other clients should sync a new node with a [snapshot](https://storage.googleapis.com/bera-snapshot-eu/index.html).

## Upgrade instructions

Test your modifications on non-production infrastructure to verify your upgrade process and new chain launch procedure that refers to Bera-reth/Bera-geth.

:::tip
If you duplicate your EL installation to test, don't duplicate the (reth) `discovery_secret` or (geth) `nodekey` files to avoid interfering with your production node's peering.
:::

1. Stop your current execution and consensus clients.
2. Install the new genesis files linked above into place, and verify their md5 hash.
3. Install Beacon-Kit and either Bera-geth or Bera-reth into place. See below for additional steps for Bera-geth.
4. Start both clients.

### Geth Additional Steps

For `bera-geth` you must run `bera-geth init` after the genesis file has been installed to upgrade the chain data to reflect the new genesis. As a rule of thumb, invoke `bera-geth init` the _exact_ same way you invoke `bera-geth node` to run your chain client.

We recommend this be made a permanent part of every geth startup.

Our recommended [startup process](https://github.com/berachain/guides/tree/main/apps/node-scripts/run-geth.sh) now includes this.

```bash
bera-geth init --datadir /path/to/geth/datadir /path/to/eth-genesis.json;
```

The geth `datadir` should contain the following directories:

```bash-vue{4-8}
tree datadir;

# [Expected Output]:
# datadir
# ├── keystore
# └── geth
#     ├── blobpool
#     └── chaindata
```

## Confirm upgrade

Beacon-Kit should log the following on startup:

```
TBD
```
