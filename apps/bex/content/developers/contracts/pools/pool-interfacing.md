---
head:
  - - meta
    - property: og:title
      content: BEX Pool Interfacing
  - - meta
    - name: description
      content: Nuances of interacting with different BEX pools
  - - meta
    - property: og:description
      content: Nuances of interacting with different BEX pools
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Pool Interfacing

Different pool types (e.g. Weighted, Stable) have different interfaces for interacting with them, where the underlying logic can vary widely. This document outlines the common interfaces for interacting with BEX pools.

In general, users will interface with the [Vault](/developers/contracts/vault) contract to obtain information on pools. Specific nuances of interacting with different pool types are also detailed below.

## Using `poolId`

To interface with a pool, you will need its `poolId`, which is its unique identifier in BEX (32 bytes in length).

#### Example:

- A pool might have an id `0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014`
- The first 20-bytes of the `poolId` represent the pool's address `0x5c6ee304399dbdb9c8ef030ab642b10820db8f56`

### Obtaining `poolId`

You can get a `poolId` from:

- A pool's URL: <a target="_blank" :href="config.websites.hub.url + 'pools/' + config.websites.bex.examplePoolId + '/details/'">{{config.websites.hub.url + 'pools/' + config.websites.bex.examplePoolId + '/details/'}}</a>
- The [SDK](/developers/sdk)
- Calling `getPoolId()` on the pool contract itself if you already have it

## Common Pool Interfaces

### Pool Balances (Vault)

The Vault can be queried for a particular pool's token balances using [`getPoolTokens`](/developers/contracts/vault#getpooltokens).

For example, calling:

```solidity
vault.getPoolTokens(0x8353157092ed8be69a9df8f95af097bbf33cb2af0000000000000000000005d9)
```

returns something resembling:

```
tokens:
[[0x40D16FC0246aD3160Ccc09B8D0D3A2cD28aE6C2f]
[0x8353157092ED8Be69a9DF8F95af097bbF33Cb2aF]
[0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48]
[0xdAC17F958D2ee523a2206206994597C13D831ec7]]

balances: [794569830111428445878272,2596148429278955607828401901927006,4333829907765,4422662782925]

lastChangeBlock:  20728927
```

### Swap Fee

Swap fees are stored at the pool level, which can be obtained using:

```solidity
pool.getSwapFeePercentage()
```

This returns an 18 decimal value like:

```
500000000000000 // corresponds to a 0.05% swap fee
```

### Emergency Pause State

In the unlikely case that there is an issue with the pools, swaps and pool joins can be paused. Withdrawals are not paused, so users can always exit a pool.

To check if a pool is paused, calling:

```solidity
pool.getPausedState()
```

returns something resembling:

```
paused :  False
pauseWindowEndTime :  1627668973
bufferPeriodEndTime :  1630260973
```

### Rate Providers

Returns the rate providers configured for each token (in the same order as registered). Zero-address entries means there's no rate provider for that token.

```solidity
function getRateProviders() external view returns (address[]);
```

### Pool Token Supply

Because certain pool types (Stable Pools) pre-mint BPT to the Vault contract, the following function should be used to get the total supply of pool tokens:

```solidity
function getActualSupply() external view returns (uint256);
```

## Weighted Pools

The following section documents functions specific to Weighted Pools.

### getNormalizedWeights

Returns all normalized weights, in the same order as the Pool's tokens.

```solidity
function getNormalizedWeights() external view returns (uint256[] memory)
```

## Stable Pools

The following section documents functions specific to Stable Pools.

### getRate

This function returns the appreciation of LP tokens relative to the underlying tokens. The rate is a monotonically increasing function _as long as the tokens in the pool do not lose value_.

```solidity
function getRate() external view virtual override returns (uint256)
```
