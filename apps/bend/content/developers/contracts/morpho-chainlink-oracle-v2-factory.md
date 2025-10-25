---
head:
  - - meta
    - property: og:title
      content: Morpho Chainlink Oracle V2 Factory Contract Reference
  - - meta
    - name: description
      content: Developer reference for the Morpho Chainlink Oracle V2 Factory contract in Bend
  - - meta
    - property: og:description
      content: Developer reference for the Morpho Chainlink Oracle V2 Factory contract in Bend
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# MorphoChainlinkOracleV2Factory

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.bend.morphoChainlinkOracleV2Factory.address + '?utm_source=' + config.websites.docsBend.utmSource">{{config.mainnet.contracts.bend.morphoChainlinkOracleV2Factory.address}}</a> | [Git Source](https://github.com/morpho-org/morpho-blue-oracles/blob/main/src/morpho-chainlink/MorphoChainlinkOracleV2Factory.sol)</small>

**Inherits:** [IMorphoChainlinkOracleV2Factory](<[/Users/mannybera/Documents/github/morpho-blue-oracles/docs/src/src](https://github.com/morpho-org/morpho-blue-oracles/blob/main/src)/morpho-chainlink/interfaces/IMorphoChainlinkOracleV2Factory.sol>)

This contract allows to create MorphoChainlinkOracleV2 oracles, and to index them easily.

## State Variables

### isMorphoChainlinkOracleV2

```solidity
mapping(address => bool) public isMorphoChainlinkOracleV2
```

## Functions

### createMorphoChainlinkOracleV2

Here is the list of assumptions that guarantees the oracle behaves as expected:

- The vaults, if set, are ERC4626-compliant.
- The feeds, if set, are Chainlink-interface-compliant.
- Decimals passed as argument are correct.
- The base vaults's sample shares quoted as assets and the base feed prices don't overflow when multiplied.
- The quote vault's sample shares quoted as assets and the quote feed prices don't overflow when multiplied.

```solidity
function createMorphoChainlinkOracleV2(
    IERC4626 baseVault,
    uint256 baseVaultConversionSample,
    AggregatorV3Interface baseFeed1,
    AggregatorV3Interface baseFeed2,
    uint256 baseTokenDecimals,
    IERC4626 quoteVault,
    uint256 quoteVaultConversionSample,
    AggregatorV3Interface quoteFeed1,
    AggregatorV3Interface quoteFeed2,
    uint256 quoteTokenDecimals,
    bytes32 salt
) external returns (IMorphoChainlinkOracleV2 oracle);
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
| `salt`                       | `bytes32`               | The salt to use for the CREATE2.                                                                                                                                                                                    |
