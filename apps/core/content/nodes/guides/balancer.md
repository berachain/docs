---
head:
  - - meta
    - property: og:title
      content: Berachain Balancer Upgrade
  - - meta
    - name: description
      content: Berachain Balancer Upgrade
  - - meta
    - property: og:description
      content: Berachain Balancer Upgrade
---

# Berachain Balancer Upgrade

This upgrade disrupts the ability for funds dislodged by the Balancer exploit of November 3 to be transferred anywhere except the Berachain Foundation.

:::warning
All node operators, whether hosting an RPC or running a validator, **must upgrade** their Execution Client to the versions below to continue following the chain.
:::

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

| Chain   | Github release page                                                                      | Release date |
| ------- | ---------------------------------------------------------------------------------------- | ------------ |
| Mainnet | [Bera-Geth v1.011602.6](https://github.com/berachain/bera-geth/releases/tag/v1.011602.6) | Nov 4        |
| Mainnet | [Bera-Reth v1.2.0](https://github.com/berachain/bera-reth/releases/tag/v1.2.0)           | Nov 4        |

| Bera-Reth/Geth Genesis File | Updated | Download link & md5 hash                                                                                                                           |
| --------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mainnet                     | Nov 4   | [c5060f8dc392192c43d74c5b33b93cde](https://raw.githubusercontent.com/berachain/beacon-kit/refs/heads/main/testing/networks/80094/eth-genesis.json) |
| Bepolia                     | —       | No Bepolia update required.                                                                                                                        |

## Confirm upgrade

Bera-Reth and Bera-Geth should log the fork timestamp and details:

```txt
Berachain Prague3 configuration: {time=1762164459, blocked_addresses=... rescue_address=0xD276D30592bE512a418f2448e23f9E7F372b32A2]
```
