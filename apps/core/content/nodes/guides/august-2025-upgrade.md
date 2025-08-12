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

| Date                                    | Milestone                                                                                         |
| --------------------------------------- | ------------------------------------------------------------------------------------------------- |
| July 30, 2025                           | Beacon-Kit, Bera-Geth/Reth release candidates out for installation to Bepolia                     |
| August 6, 2025                          | Bepolia upgrade activated                                                                         |
| August 13, 2025                       | Final versions of Beacon-Kit, Bera-Geth/Reth released for installation to Mainnet _and_ Bepolia. |
| August 27, 2025 @ 1600 GMT / 1200 EDT | Mainnet hardfork activates                                                                        |

## Upgrade Details

Berachain will release stand-alone executables and Docker images for Linux ARM and AMD64 architectures for Beacon Kit, Bera-Reth, and Bera-Geth. All clients are easily compiled for other systems and architectures with a few minutes' time; review their respective READMEs for details.

**Executable names** are changed: `geth` → `bera-geth` and `reth` → `bera-reth`, in our release binaries and Docker images.

Operators currently running Geth or Reth can switch to our forked versions while **retaining their current chain data files**. Note that Bera-Geth will update the data store by by renaming `geth` directory to `bera-geth` on the first run.

**New genesis files** are required for Bera-Reth/Geth.

**No configuration changes** are required for CL/EL config files.


## Upgrade instructions

Test your modifications on non-production infrastructure to verify your new startup scripting that refers to the new executable names `bera-reth` and `bera-geth`.

:::tip
If you duplicate your installation to test, don't duplicate these identity files to avoid interfering with your production node's peering:

- **Bera-Reth**: `discovery_secret` file
- **Bera-Geth**: `nodekey` file
- **Beacon-Kit**: `priv_validator_key.json` file
  :::

1. Stop all clients.
2. Install Beacon-Kit and either Bera-Geth or Bera-Reth, linked below, into place.
3. Install the new Reth/Geth genesis files linked below into place, and verify the hash with `md5sum <file>`.
   - **Bera-Reth:** overwrite `$RETH_DATA/genesis.json`.
   - **Bera-Geth:** Run `bera-geth init` against your Geth data directory with the supplied genesis file.
     We recommend making this a permanent part of every `bera-geth` startup, especially in kubernetes. Our recommended [startup process](https://github.com/berachain/guides/tree/main/apps/node-scripts/run-geth.sh) now includes this.

     `bera-geth init --datadir /path/to/geth/datadir eth-genesis.json`

4. Start all clients.

### Download links

| Chain             | Github release page                                                              | Release date |
| ----------------- | -------------------------------------------------------------------------------- | ------------ |
| Mainnet & Bepolia | [Bera-Geth v1.011602.1](https://github.com/berachain/bera-geth/releases/tag/v1.011602.1)     | August 13
| Mainnet & Bepolia | [Bera-Reth v1.0.0](https://github.com/berachain/bera-reth/releases/tag/v1.0-0)     | August 13     |
| Mainnet & Bepolia | [Beacon-Kit v1.3.0](https://github.com/berachain/beacon-kit/releases/tag/v1.3.0) | August 13     |

| File                           | Download link & md5 hash                                                                                                                           |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bepolia Bera-Reth/Geth Genesis | [b659cbef86a6eded371d8e443abf2c0b](https://raw.githubusercontent.com/berachain/beacon-kit/refs/heads/main/testing/networks/80069/eth-genesis.json) |
| Mainnet Bera-Reth/Geth Genesis | [52f2eb675d095f32fdb0091de9f0025e](https://raw.githubusercontent.com/berachain/beacon-kit/refs/heads/main/testing/networks/80094/eth-genesis.json)                             |

## Confirm upgrade

Beacon-Kit should log the following on startup:
```
DOCTODO
```


Bera-Geth should log the following on startup:
```
DOCTODO
```

Bera-Reth should log the following on startup:
```
DOCTODO
```

## FAQ

Where's my Geth data directory?

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
