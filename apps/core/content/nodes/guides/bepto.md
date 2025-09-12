---
head:
  - - meta
    - property: og:title
      content: Berachain Bepto Upgrade Instructions
  - - meta
    - name: description
      content: Berachain Bepto upgrade instructions
  - - meta
    - property: og:description
      content: Berachain Bepto upgrade instructions
---

# Bepto Berachain Upgrade 🤕⛽

Our next upgrade adjusts the effect of [BRIP-0002 - Gas Fee Modifications](https://github.com/berachain/BRIPs/blob/main/meta/BRIP-0002.md), to eliminate the gas price floor and give us more time to examine the issue more closely.

This is an _execution client only_ hardfork.

:::warning
All node operators — validators and regular RPC — **must upgrade** their Execution Client to the versions below to continue following the chain.
:::

## Upgrade Timeline

| Date                                  | Milestone                                 |
| ------------------------------------- | ----------------------------------------- |
| Sep 17, 2025                          | Bera-Reth and Bera-Geth binaries released |
| Sep 29, 2025                          | All operators should be upgraded          |
| October 1, 2025 @ 1600 GMT / 1200 EDT | Mainnet hardfork activates                |

## Upgrade Details

Berachain released stand-alone executables and Docker images for Linux ARM and AMD64 architectures for Bera-Reth and Bera-Geth. All clients are easily compiled for other systems and architectures with a few minutes' time; review their respective READMEs for details.

**New genesis files** are required for Bera-Reth/Geth.

**No configuration changes** are required.

## Upgrade Instructions

:::tip
If you duplicate your installation to test the upgrade — which is recommended — don't duplicate these identity files to avoid interfering with your production node's peering:

- **Bera-Reth**: `discovery_secret`
- **Bera-Geth**: `nodekey`
- **Beacon-Kit**: `priv_validator_key.json`
  :::

:::warning
If you compile your own build, do so against the **recommended release branches**.
:::

1. Stop all clients.
2. Install the recommended release version of Bera-Geth or Bera-Reth, linked below, into place.
3. Install the new Reth/Geth genesis files linked below into place, and verify the hash with `md5sum <file>`. Then:
   - **Bera-Reth:** overwrite `$RETH_DATA/genesis.json`.
   - **Bera-Geth:** run `bera-geth init` against your Geth data directory with the supplied genesis file.
     We recommend making this a permanent part of every `bera-geth` startup, especially in kubernetes. Our recommended [startup process](https://github.com/berachain/guides/tree/main/apps/node-scripts/run-geth.sh) now includes this.

     `bera-geth init --datadir /path/to/geth/datadir /path/to/eth-genesis.json`

4. Start all clients.

### Download links

| Chain             | Github release page                                                                      | Release date |
| ----------------- | ---------------------------------------------------------------------------------------- | ------------ |
| Mainnet & Bepolia | [Bera-Geth v1.011602.4](https://github.com/berachain/bera-geth/releases/tag/v1.011602.4) | Sep 17       |
| Mainnet & Bepolia | [Bera-Reth v1.1.0](https://github.com/berachain/bera-reth/releases/tag/v1.1.0)           | Sep 17       |

| Bera-Reth/Geth Genesis File | Updated | Download link & md5 hash                                                                                               |
| --------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------- |
| Bepolia                     | Sep 17  | [TODO](https://raw.githubusercontent.com/berachain/beacon-kit/refs/heads/main/testing/networks/80069/eth-genesis.json) |
| Mainnet                     | Sep 17  | [TODO](https://raw.githubusercontent.com/berachain/beacon-kit/refs/heads/main/testing/networks/80094/eth-genesis.json) |

## Confirm upgrade

Bera-Geth should log the fork timestamp:

```txt
TODO
```

Bera-Reth should log the fork timestamp:

```txt
TODO
```
