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

## ~~August~~ September 2025 Upgrade Timeline

| Date                                    | Milestone                                                                                        |
| --------------------------------------- | ------------------------------------------------------------------------------------------------ |
| July 30, 2025                           | Beacon-Kit, Bera-Geth/Reth release candidates out for installation to Bepolia                    |
| August 6, 2025                          | Bepolia upgrade activated                                                                        |
| August 13, 2025                         | Final versions of Beacon-Kit, Bera-Geth/Reth released for installation to Mainnet _and_ Bepolia. |
| August 15, 2025                         | Updated releases + fork activation date                                                          |
| September 3, 2025 @ 1600 GMT / 1200 EDT | Mainnet hardfork activates                                                                       |

## Upgrade Details

Berachain will release stand-alone executables and Docker images for Linux ARM and AMD64 architectures for Beacon Kit, Bera-Reth, and Bera-Geth. All clients are easily compiled for other systems and architectures with a few minutes' time; review their respective READMEs for details.

**Executable names** are changed: `geth` → `bera-geth` and `reth` → `bera-reth`, in our release binaries and Docker images.

Operators currently running Geth or Reth can switch to our forked versions while **retaining their current chain data files**. Note that Bera-Geth will update the data store by by renaming `geth` directory to `bera-geth` on the first run.

**New genesis files** are required for Bera-Reth/Geth.

**No configuration changes** are required for CL/EL config files.

## Upgrade instructions

Test your modifications on non-production infrastructure to verify your new startup process that refers to the new executable names `bera-reth` and `bera-geth`.

:::tip
If you duplicate your installation to test, don't duplicate these identity files to avoid interfering with your production node's peering:

- **Bera-Reth**: `discovery_secret` file
- **Bera-Geth**: `nodekey` file
- **Beacon-Kit**: `priv_validator_key.json` file
  :::

1. Stop all clients.
2. Install Beacon-Kit 1.3.0 and the release version of either Bera-Geth or Bera-Reth, linked below, into place.
3. Install the new Reth/Geth genesis files linked below into place, and verify the hash with `md5sum <file>`. Then:
   - **Bera-Reth:** overwrite `$RETH_DATA/genesis.json`.
   - **Bera-Geth:** run `bera-geth init` against your Geth data directory with the supplied genesis file.
     We recommend making this a permanent part of every `bera-geth` startup, especially in kubernetes. Our recommended [startup process](https://github.com/berachain/guides/tree/main/apps/node-scripts/run-geth.sh) now includes this.

     `bera-geth init --datadir /path/to/geth/datadir /path/to/eth-genesis.json`

4. Start all clients.

### Download links

| Chain             | Github release page                                                                      | Release date |
| ----------------- | ---------------------------------------------------------------------------------------- | ------------ |
| Mainnet & Bepolia | [Bera-Geth v1.011602.2](https://github.com/berachain/bera-geth/releases/tag/v1.011602.2) | August 15    |
| Mainnet & Bepolia | [Bera-Reth v1.0.1](https://github.com/berachain/bera-reth/releases/tag/v1.0.1)           | August 13    |
| Mainnet & Bepolia | [Beacon-Kit v1.3.1](https://github.com/berachain/beacon-kit/releases/tag/v1.3.1)         | August 15    |

| Bera-Reth/Geth Genesis File | Updated   | Download link & md5 hash                                                                                                                           |
| --------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bepolia                     | August 15 | [b659cbef86a6eded371d8e443abf2c0b](https://raw.githubusercontent.com/berachain/beacon-kit/refs/heads/main/testing/networks/80069/eth-genesis.json) |
| Mainnet                     | August 15 | [51ec047b71b06f7fbca9689037ec1d60](https://raw.githubusercontent.com/berachain/beacon-kit/refs/heads/main/testing/networks/80094/eth-genesis.json) |

## Confirm upgrade

Beacon-Kit should log the fork timestamp:

```txt{6}
 	+ ⭐️ Star BeaconKit on GitHub @ https://github.com/berachain/beacon-kit    +
 	+ 🧩 Your node is running version: v1.3.1                                  +
 	+ 💾 Your system: linux/amd64                                              +
 	+ 🍴 Deneb1 Fork Time: 1738415507                                          +
 	+ 🍴 Electra Fork Time: 1749056400                                         +
 	+ 🍴 Electra1 Fork Time: 1756915200                                        +
 	+ 🦺 Please report issues @ https://github.com/berachain/beacon-kit/issues +
 	+==========================================================================+
```

Bera-Geth should log the fork timestamp:

```txt{1}
	+ 🍴 Electra1 Fork Time: 1756915200                                        +
...
INFO  Ready for fork activation                fork=Prague1 date="3 Sep 25 12:00 EDT" remaining=...` timestamp=1,756,915,200
```

Bera-Reth should log fork timestamp:

```txt{3}
- Prague1                          @1756915200
...
Berachain Prague1 configuration: {time=1756915200, base_fee_denominator=48, min_base_fee=1 gwei, pol_distributor=0xD2f19a79b026Fb636A7c300bF5947df113940761}
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
