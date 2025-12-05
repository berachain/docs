---
head:
  - - meta
    - property: og:title
      content: Berachain Balancer Upgrade the 2nd
  - - meta
    - name: description
      content: Berachain Balancer Upgrade the 2nd
  - - meta
    - property: og:description
      content: Berachain Balancer Upgrade the 2nd
---

# Berachain Balancer Upgrade #2

This upgrade to Berachain Mainnet restores some functionality to BEX.

:::warning
All node operators, whether hosting an RPC or running a validator, **must upgrade** their execution client to the versions below in order to continue following the chain.
:::

:::info
**Hardfork Date:** Wednesday, November 12 at 16:00 GMT / 11:00 EST.

All nodes are expected to have their binaries and respective genesis files updated before this date, or risk having their node stop working.
:::

## Upgrade Details

Berachain has released standalone executables and Docker images for Linux ARM and AMD64 architectures for both Bera-Reth and Bera-Geth. All clients can be easily compiled for other systems and architectures within a few minutes; please review their respective READMEs for details.

**New genesis files** are required for Bera-Reth/Geth.

**No configuration changes** are required.

## Upgrade Instructions

:::tip
If you duplicate your installation to test the upgrade—which is recommended—do not copy these identity files, as this could interfere with your production node's peering:

- **Bera-Reth**: `discovery_secret`
- **Bera-Geth**: `nodekey`
- **Beacon-Kit**: `priv_validator_key.json`
  :::

:::warning
If you compile your own build, do so against the **recommended release branches**.
:::

1. Stop all clients.
2. Install the recommended release version of Bera-Geth or Bera-Reth, linked below, in place.
3. Install the new Reth/Geth genesis files linked below, and verify the hash with `md5sum <file>`. Then:
   - **Bera-Reth:** Overwrite `$RETH_DATA/genesis.json`.
   - **Bera-Geth:** No additional steps are required.
4. Start all clients.

:::tip
Previous instructions specified a `geth init` step. This is no longer necessary.

If you performed a `geth init` step and received a "mismatching Prague3 fork" warning, it can safely be ignored.
:::

### Download links

| Chain   | Github release page                                                                      | Release date |
| ------- | ---------------------------------------------------------------------------------------- | ------------ |
| Mainnet | [Bera-Geth v1.011607.0](https://github.com/berachain/bera-geth/releases/tag/v1.011607.0) | Nov 7        |
| Mainnet | [Bera-Reth v1.3.0](https://github.com/berachain/bera-reth/releases/tag/v1.3.0)           | Nov 7        |

| Bera-Reth/Geth Genesis File | Updated | Download link & md5 hash                                                                                                                           |
| --------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mainnet                     | Nov 7   | [6b333924b81a1935e51ac70e7d9d7cb0](https://raw.githubusercontent.com/berachain/beacon-kit/refs/heads/main/testing/networks/80094/eth-genesis.json) |
| Bepolia                     | -       | No upgrade required                                                                                                                                |

## Confirm upgrade

Bera-Reth and Bera-Geth should log the fork timestamp and details:

```txt
Berachain Prague3 configuration: {time=1762164459, blocked_addresses=... rescue_address=0xD276D30592bE512a418f2448e23f9E7F372b32A2]
```
