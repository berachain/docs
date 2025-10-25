---
head:
  - - meta
    - property: og:title
      content: Morpho Chainlink Oracle V2 Contract Reference
  - - meta
    - name: description
      content: Developer reference for the Morpho Chainlink Oracle V2 contract in Bend
  - - meta
    - property: og:description
      content: Developer reference for the Morpho Chainlink Oracle V2 contract in Bend
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# MorphoChainlinkOracleV2

> <small>[Git Source](https://github.com/morpho-org/morpho-blue-oracles/blob/main/src/morpho-chainlink/MorphoChainlinkOracleV2.sol)</small>

**Inherits:** [IMorphoChainlinkOracleV2](https://github.com/morpho-org/morpho-blue-oracles/blob/main/src/morpho-chainlink/interfaces/IMorphoChainlinkOracleV2.sol)

Morpho Blue oracle using Chainlink-compliant feeds.

## State Variables

### BASE_VAULT

Returns the address of the base ERC4626 vault.

```solidity
IERC4626 public immutable BASE_VAULT
```

### BASE_VAULT_CONVERSION_SAMPLE

Returns the base vault conversion sample.

```solidity
uint256 public immutable BASE_VAULT_CONVERSION_SAMPLE
```

### QUOTE_VAULT

Returns the address of the quote ERC4626 vault.

```solidity
IERC4626 public immutable QUOTE_VAULT
```

### QUOTE_VAULT_CONVERSION_SAMPLE

Returns the quote vault conversion sample.

```solidity
uint256 public immutable QUOTE_VAULT_CONVERSION_SAMPLE
```

### BASE_FEED_1

Returns the address of the first base feed.

```solidity
AggregatorV3Interface public immutable BASE_FEED_1
```

### BASE_FEED_2

Returns the address of the second base feed.

```solidity
AggregatorV3Interface public immutable BASE_FEED_2
```

### QUOTE_FEED_1

Returns the address of the first quote feed.

```solidity
AggregatorV3Interface public immutable QUOTE_FEED_1
```

### QUOTE_FEED_2

Returns the address of the second quote feed.

```solidity
AggregatorV3Interface public immutable QUOTE_FEED_2
```

### SCALE_FACTOR

Returns the price scale factor, calculated at contract creation.

```solidity
uint256 public immutable SCALE_FACTOR
```

## Functions

### constructor

Here is the list of assumptions that guarantees the oracle behaves as expected:

- The vaults, if set, are ERC4626-compliant.
- The feeds, if set, are Chainlink-interface-compliant.
- Decimals passed as argument are correct.
- The base vaults's sample shares quoted as assets and the base feed prices don't overflow when multiplied.
- The quote vault's sample shares quoted as assets and the quote feed prices don't overflow when multiplied.

Properly configured Morpho Blue markets should ensure that price of the oracle cannot change instantly such
that the new price is less than the old price multiplied by LLTV\*LIF. So in particular, vaults that can receive
donations shouldn't be used as loan/quote assets.

The base asset should be the collateral token and the quote asset the loan token.

```solidity
constructor(
    IERC4626 baseVault,
    uint256 baseVaultConversionSample,
    AggregatorV3Interface baseFeed1,
    AggregatorV3Interface baseFeed2,
    uint256 baseTokenDecimals,
    IERC4626 quoteVault,
    uint256 quoteVaultConversionSample,
    AggregatorV3Interface quoteFeed1,
    AggregatorV3Interface quoteFeed2,
    uint256 quoteTokenDecimals
) ;
```

**Parameters**

| Name                         | Type                    | Description                                                                                                                                                                                                         |
| ---------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `baseVault`                  | `IERC4626`              | Base vault. Pass address zero to omit this parameter.                                                                                                                                                               |
| `baseVaultConversionSample`  | `uint256`               | The sample amount of base vault shares used to convert to underlying. Pass 1 if the base asset is not a vault. Should be chosen such that converting `baseVaultConversionSample` to assets has enough precision.    |
| `baseFeed1`                  | `AggregatorV3Interface` | First base feed. Pass address zero if the price = 1.                                                                                                                                                                |
| `baseFeed2`                  | `AggregatorV3Interface` | Second base feed. Pass address zero if the price = 1.                                                                                                                                                               |
| `baseTokenDecimals`          | `uint256`               | Base token decimals.                                                                                                                                                                                                |
| `quoteVault`                 | `IERC4626`              | Quote vault. Pass address zero to omit this parameter.                                                                                                                                                              |
| `quoteVaultConversionSample` | `uint256`               | The sample amount of quote vault shares used to convert to underlying. Pass 1 if the quote asset is not a vault. Should be chosen such that converting `quoteVaultConversionSample` to assets has enough precision. |
| `quoteFeed1`                 | `AggregatorV3Interface` | First quote feed. Pass address zero if the price = 1.                                                                                                                                                               |
| `quoteFeed2`                 | `AggregatorV3Interface` | Second quote feed. Pass address zero if the price = 1.                                                                                                                                                              |
| `quoteTokenDecimals`         | `uint256`               | Quote token decimals.                                                                                                                                                                                               |

### price

Returns the price of 1 asset of collateral token quoted in 1 asset of loan token, scaled by 1e36.

It corresponds to the price of 10**(collateral token decimals) assets of collateral token quoted in
10**(loan token decimals) assets of loan token with `36 + loan token decimals - collateral token decimals`
decimals of precision.

```solidity
function price() external view returns (uint256);
```
