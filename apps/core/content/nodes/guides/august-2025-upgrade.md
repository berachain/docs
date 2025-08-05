---
head:
  - - meta
    - property: og:title
      content: Berachain August 2025 Upgrade Instructions
  - - meta
    - name: description
      content: Berachain August 2025 upgrade instructions
  - - meta
    - property: og:description
      content: Berachain August 2025 upgrade instructions
---

# August 2025 Berachain Upgrade 🔱

Our next upgrade brings to Berachain four approved Improvement Proposals.

1. [BRIP-0001 - Execution Layer Forked Clients](https://github.com/berachain/BRIPs/blob/main/meta/BRIP-0001.md)
2. [BRIP-0002 - Gas Fee Modifications](https://github.com/berachain/BRIPs/blob/main/meta/BRIP-0002.md)
3. [BRIP-0003 - Stable Block Time](https://github.com/berachain/BRIPs/blob/main/meta/BRIP-0003.md)
4. [BRIP-0004 - Enshrined PoL Reward Distribution](https://github.com/berachain/BRIPs/blob/main/meta/BRIP-0004.md)

[Bera-reth](https://github.com/berachain/bera-reth) and [Bera-geth](https://github.com/berachain/bera-geth) are new forks of ParadymXYZ's reth and Ethereum Foundation's go-ethereum, under the upstream software licenses.

:::warning
All users, whether hosting an RPC or running a validator, **must upgrade** their Execution Client to either Bera-reth or Bera-geth, **and** upgrade to Beacon Kit 1.3.0, to continue following the chain.
:::

## August 2025 Upgrade Timeline

| Date                                 | Milestone                                                                                                     |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| July 30, 2025                        | Beacon-Kit 1.3.0-rc1, Bera-geth v1.011602.0-rc4 and Bera-reth 1.0.0-rc.8 released for installation to Bepolia |
| August 1, 2025                       | Bera-geth v1.011602.0-rc5 released                                                                            |
| August 4, 2025                       | All Bepolia infrastructure partners expected to be upgraded                                                   |
| August 6, 2025 @ 1600 GMT / 1200 EDT | Bepolia upgrade activates                                                                                     |
| TBD                                  | Mainnet upgrade instructions posted                                                                           |
| TBD                                  | Mainnet hardfork activates                                                                                    |

## New Chain Clients and Genesis Files

| Chain   | Client                                                                                           |
| ------- | ------------------------------------------------------------------------------------------------ |
| Bepolia | [Bera-geth v1.011602.0-rc5](https://github.com/berachain/bera-geth/releases/tag/v1.011602.0-rc5) |
| Bepolia | [Bera-reth v1.0.0-rc.8](https://github.com/berachain/bera-reth/releases/tag/v1.0.0-rc.8)         |
| Bepolia | [Beacon-Kit v1.3.0-rc1](https://github.com/berachain/beacon-kit/releases/tag/v1.3.0-rc1)         |

| Chain   | Genesis file & md5 hash                                                                                                                            |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bepolia | [b659cbef86a6eded371d8e443abf2c0b](https://raw.githubusercontent.com/berachain/beacon-kit/refs/heads/main/testing/networks/80069/eth-genesis.json) |

Berachain will release stand-alone executables and Docker images for Linux ARM and AMD64 architectures. All clients are easily compiled for other systems and architectures with a few minutes' time; review their respective READMEs for details.

Operators currently running Geth or Reth can upgrade to our forked versions while retaining their current chain data files. Operators migrating from other clients should sync a new node with a snapshot - [testnet](https://storage.googleapis.com/bera-testnet-snapshot-eu/index.html) or [mainnet](https://storage.googleapis.com/bera-snapshot-eu/index.html).

## Upgrade instructions

Test your modifications on non-production infrastructure to verify your upgrade process and new chain launch procedure that refers to Bera-reth/Bera-geth.

**No configuration changes are needed** aside from the new executables.

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
	+==========================================================================+
	+ ⭐️ Star BeaconKit on GitHub @ https://github.com/berachain/beacon-kit    +
	+ 🧩 Your node is running version: v1.3.0-rc1                              +
	+ ♦ Eth client: unknown (version: unknown)                                 +
	+ 💾 Your system: linux/amd64                                              +
	+ 🍴 Deneb1 Fork Time: 1740090694                                          +
	+ 🍴 Electra Fork Time: 1746633600                                         +
	+ 🍴 Electra1 Fork Time: 1754496000                                        +
	+ 🦺 Please report issues @ https://github.com/berachain/beacon-kit/issues +
	+==========================================================================+

```
