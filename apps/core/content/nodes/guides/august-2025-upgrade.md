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

[Bera-Reth](https://github.com/berachain/bera-reth) and [Bera-Geth](https://github.com/berachain/bera-geth) are new forks of ParadymXYZ's reth and Ethereum Foundation's go-ethereum, under the upstream software licenses.

:::warning
All users, whether hosting an RPC or running a validator, **must upgrade** their Execution Client to either Bera-Reth or Bera-Geth, **and** upgrade to Beacon Kit 1.3.0, to continue following the chain.
:::

## August 2025 Upgrade Timeline

| Date                                 | Milestone                                                                 |
| ------------------------------------ | ------------------------------------------------------------------------- |
| July 30, 2025                        | Beacon-Kit, Bera-Geth, and Bera-Reth released for installation to Bepolia |
| August 4, 2025                       | All Bepolia infrastructure partners expected to be upgraded               |
| August 6, 2025 @ 1600 GMT / 1200 EDT | Bepolia upgrade activated                                                 |
| TBD                                  | Mainnet upgrade instructions posted                                       |
| TBD                                  | Mainnet hardfork activates                                                |

## Upgrade Details

Berachain will release stand-alone executables and Docker images for Linux ARM and AMD64 architectures for Beacon Kit, Bera-Reth, and Bera-Geth. All clients are easily compiled for other systems and architectures with a few minutes' time; review their respective READMEs for details.

**Executable names** are changed: `geth` → `bera-geth` and `reth` → `bera-reth`, in our release binaries and Docker images.

Operators currently running Geth or Reth can upgrade to our forked versions while **retaining their current chain data files**. Operators migrating from other clients should sync a new node with a snapshot - [testnet](https://storage.googleapis.com/bera-testnet-snapshot-eu/index.html) or [mainnet](https://storage.googleapis.com/bera-snapshot-eu/index.html).

**New Genesis files** are required for Beacon-Kit and Bera-Reth/Geth, but **no other configuration changes** are needed.

## Upgrade instructions

Test your modifications on non-production infrastructure to verify your upgrade success.

:::tip
If you duplicate your installation to test, don't duplicate these identity files to avoid interfering with your production node's peering:

- **Bera-Reth**: `discovery_secret` file
- **Bera-Geth**: `nodekey` file
- **Beacon-Kit**: `priv_validator_key.json` file
  :::

1. Stop your current execution and consensus clients.
2. Install Beacon-Kit and either Bera-Geth or Bera-Reth, linked below, into place.
3. Install the new consensus & execution genesis files linked below into place, and verify the hash with `md5sum <file>`.
   - **Beacon-Kit:** overwrite `$BEACOND_HOME/config/genesis.json`
   - **Bera-Reth:**, overwrite `$RETH_DATA/genesis.json`.
   - **Bera-Geth:** Run `bera-geth init` against your Geth data directory with the supplied genesis file.
     We recommend making this a permanent part of every `bera-geth` startup. Our recommended [startup process](https://github.com/berachain/guides/tree/main/apps/node-scripts/run-geth.sh) now includes this.

     `bera-geth init --datadir /geth/datadir eth-genesis.json`

4. Start all clients.

### Download links

| Chain   | Github release page                                                                              | Release date |
| ------- | ------------------------------------------------------------------------------------------------ | ------------ |
| Bepolia | [Bera-Geth v1.011602.1-rc0](https://github.com/berachain/bera-geth/releases/tag/v1.011602.1-rc0) | August 2     |
| Bepolia | [Bera-Reth v1.0.0-rc.8](https://github.com/berachain/bera-reth/releases/tag/v1.0.0-rc.8)         | July 31      |
| Bepolia | [Beacon-Kit v1.3.0-rc1](https://github.com/berachain/beacon-kit/releases/tag/v1.3.0-rc1)         | July 29      |

| File                           | Download link & md5 hash                                                                                                                                                |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bepolia Bera-Reth/Geth Genesis | [b659cbef86a6eded371d8e443abf2c0b](https://raw.githubusercontent.com/berachain/beacon-kit/refs/heads/main/testing/networks/80069/eth-genesis.json)                      |
| Bepolia Beacon-Kit Genesis     | [355e22c65b6040f91cea78c54ae009ee](https://raw.githubusercontent.com/berachain/beacon-kit/f27637ea49beb171fff47f10bece4fd6d57c5df9/testing/networks/80069/genesis.json) |

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

## FAQ

Where's my Bera-Geth data directory?

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
