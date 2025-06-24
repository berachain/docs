---
head:
  - - meta
    - property: og:title
      content: Berachain Trifork Upgrade Instructions
  - - meta
    - name: description
      content: Berachain Trifork upgrade instructions
  - - meta
    - property: og:description
      content: Berachain Trifork upgrade instructions
---

# Trifork Hardfork 🔱

Our next upgrade brings to Berachain two approved Improvement Proposals.

1. [BRIP-0001 (Execution Layer Forked Clients)](https://github.com/berachain/BRIPs/blob/main/meta/BRIP-0001.md) and
2. [BRIP-0002 - Gas Fee Modifications](https://github.com/berachain/BRIPs/blob/main/meta/BRIP-0002.md)

[Bera-reth](https://github.com/berachain/bera-reth) and [Bera-geth](https://github.com/berachain/bera-geth) are new forks of ParadymXYZ's reth and Ethereum Foundation's go-ethereum, under the same software license.

Either of these execution clients are _required_ to follow Berachain after the appointed upgrade date. Beacon Kit will refuse to start without these clients.

:::warning
All users, whether hosting an RPC or running a validator, **must upgrade** their Execution Client to either Bera-reth or Bera-geth, **and** upgrade to Beacon Kit TBD, to continue following the chain.
:::

## Hardfork Upgrade Timeline

| Date                    | Milestone                                                   |
| ----------------------- | ----------------------------------------------------------- |
| June 27, 2025           | Beacon-Kit TBD-rc, Bera-geth TBD-rc and Bera-reth released  |
| July 7, 2025            | All Bepolia infrastructure partners expected to be upgraded |
| July 8, 2025 @ 12pm EDT | Trifork Upgrade Activates on Bepolia                        |
| TBD                     | Beacon-Kit TBD, Bera-geth TBD and Bera-reth released        |
| TBD                     | All infrastructure partners expected to be upgraded         |
| TBD                     | Trifork Upgrade Activates on Berachain Mainnet              |

## New Chain Clients and Genesis Files

| Client          | Version                                                         |
| --------------- | --------------------------------------------------------------- |
| Bera-geth vTBD  | [TBD](https://github.com/berachain/bera-geth/releases/tag/TBD)  |
| Bera-reth vTBD  | [TBD](https://github.com/berachain/bera-reth/releases/tag/TBD)  |
| Beacon-Kit vTBD | [TBD](https://github.com/berachain/beacon-kit/releases/tag/TBD) |

| Chain             | Genesis file & hash                                                                              |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| Bepolia           | [TBD](https://github.com/berachain/beacon-kit/blob/main/testing/networks/80069/eth-genesis.json) |
| Berachain Mainnet | not released yet                                                                                 |

Berachain will release stand-alone executables and Docker images for Linux ARM and AMD64 architectures. All clients are easily compiled for other systems and architectures with a few minutes' time; review their respective READMEs for details.

Operators currently running Geth or Reth can upgrade to our forked versions while retaining their current chain data files. Operators migrating from other clients should sync a node.

## Upgrade instructions

1. Test your modifications on non-Mainnet infrastructure to verify your upgrade process and new chain launch procedure that refers to Bera-reth/Bera-geth.

:::tip
If you duplicate your EL installation to test, don't duplicate the (reth) `discovery_secret` or (geth) `nodekey` files to avoid interfering with your production node's peering.
:::

2. Stop your current execution and consensus clients.
3. Install the new genesis files linked above into place, and verify their md5 hash.
4. Install Beacon-Kit and either Bera-geth or Bera-reth into place. See below for additional steps for Bera-geth.
5. Start both clients.

### Geth Additional Steps

For `bera-geth` you must run `bera-geth init` after the genesis file has been installed to upgrade the chain data to reflect the new genesis. As a rule of thumb, invoke `bera-geth init` the _exact_ same way you invoke `bera-geth node` to run your chain client.

We recommend this be made a permanent part of every geth startup.

Our recommended [startup process](https://github.com/berachain/guides/tree/main/apps/node-scripts/run-geth.sh) now includes this.

```bash
bera-geth init --datadir /path/to/geth/data /path/to/eth-genesis.json;
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
