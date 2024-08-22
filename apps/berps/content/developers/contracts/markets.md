---
head:
  - - meta
    - property: og:title
      content: Markets Interface
  - - meta
    - name: description
      content: Technical reference of Markets contract interface.
  - - meta
    - property: og:description
      content: Technical reference of Markets contract interface.
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Markets Contract Interface

> <small><a target="_blank" :href="config.testnet.dapps.beratrail.url + 'address/' + config.contracts.markets.address">{{config.contracts.markets.address}}</a><span v-if="config.contracts.markets.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.markets.abi">ABI JSON</a></span></small>

`Markets.sol` stores trading pair parameters and limits.

## isPairIndexListed

```solidity
function isPairIndexListed(
    uint256 _pairIndex
) public view returns (bool)
```

Checks if a given pair index is listed.

**Parameters**
| Name | Type | Description |
|-------------|-----------|---------------------------------------|
| \_pairIndex | uint256 | The index of the pair to check. |

**Returns**
| Type | Description |
|----------|---------------------------------------|
| bool | True if the pair index is listed, false otherwise. |

## pairFeed

```solidity
function pairFeed(
    uint256 _pairIndex
) external view returns (Feed memory)
```

Retrieves the price feed information for a given pair index.

**Parameters**
| Name | Type | Description |
|-------------|-----------|---------------------------------------|
| \_pairIndex | uint256 | The index of the pair to retrieve the feed for. |

**Returns**

| Type        | Description                                    |
| ----------- | ---------------------------------------------- |
| Feed memory | The price feed information for the given pair. |

## pairMinLeverage

```solidity
function pairMinLeverage(
    uint256 _pairIndex
) external view returns (uint256)
```

Retrieves the minimum leverage for a given pair index.

**Parameters**
| Name | Type | Description |
|-------------|-----------|---------------------------------------|
| \_pairIndex | uint256 | The index of the pair to retrieve the minimum leverage for. |

**Returns**

| Type    | Description                              |
| ------- | ---------------------------------------- |
| uint256 | The minimum leverage for the given pair. |

## pairMaxLeverage

```solidity
function pairMaxLeverage(
    uint256 _pairIndex
) external view returns (uint256)
```

Retrieves the maximum leverage for a given pair index.

**Parameters**
| Name | Type | Description |
|-------------|-----------|---------------------------------------|
| \_pairIndex | uint256 | The index of the pair to retrieve the maximum leverage for. |

**Returns**
| Type | Description |
|----------|---------------------------------------|
| uint256 | The maximum leverage for the given pair. |

## groupMaxCollateral

```solidity
function groupMaxCollateral(
    uint256 _pairIndex
) external view returns (uint256)
```

Retrieves the maximum collateral for a given pair index.

**Parameters**

| Name        | Type    | Description                                                   |
| ----------- | ------- | ------------------------------------------------------------- |
| \_pairIndex | uint256 | The index of the pair to retrieve the maximum collateral for. |

**Returns**
| Type | Description |
|----------|---------------------------------------|
| uint256 | The maximum collateral for the given pair. |

## groupCollateral

```solidity
function groupCollateral(
    uint256 _pairIndex,
    bool _long
) external view returns (uint256)
```

Retrieves the group collateral for a given pair index and long/short direction.

**Parameters**
| Name | Type | Description |
|-------------|-----------|---------------------------------------|
| \_pairIndex | uint256 | The index of the pair to retrieve the group collateral for. |
| \_long | bool | True for long direction, false for short direction. |

**Returns**

| Type    | Description                                            |
| ------- | ------------------------------------------------------ |
| uint256 | The group collateral for the given pair and direction. |

## guaranteedSlEnabled

```solidity
function guaranteedSlEnabled(
    uint256 _pairIndex
) external view returns (bool)
```

Checks if guaranteed stop loss is enabled for a given pair index.

**Parameters**

| Name        | Type    | Description                                                            |
| ----------- | ------- | ---------------------------------------------------------------------- |
| \_pairIndex | uint256 | The index of the pair to check if guaranteed stop loss is enabled for. |

**Returns**

| Type | Description                                                            |
| ---- | ---------------------------------------------------------------------- |
| bool | True if guaranteed stop loss is enabled for the pair, false otherwise. |

## pairOpenFeeP

```solidity
function pairOpenFeeP(
    uint256 _pairIndex
) external view returns (uint256)
```

Retrieves the open fee percentage for a given pair index.

**Parameters**
| Name | Type | Description |
|-------------|-----------|---------------------------------------|
| \_pairIndex | uint256 | The index of the pair to retrieve the open fee percentage for. |

**Returns**
| Type | Description |
|----------|---------------------------------------|
| uint256 | The open fee percentage for the given pair. |

## pairCloseFeeP

```solidity
function pairCloseFeeP(
    uint256 _pairIndex
) external view returns (uint256)
```

Retrieves the close fee percentage for a given pair index.

**Parameters**
| Name | Type | Description |
|-------------|-----------|---------------------------------------|
| \_pairIndex | uint256 | The index of the pair to retrieve the close fee percentage for. |

**Returns**

| Type    | Description                                  |
| ------- | -------------------------------------------- |
| uint256 | The close fee percentage for the given pair. |

## pairLimitOrderFeeP

```solidity
function pairLimitOrderFeeP(
    uint256 _pairIndex
) external view returns (uint256)
```

Retrieves the limit order fee percentage for a given pair index.

**Parameters**
| Name | Type | Description |
|-------------|-----------|---------------------------------------|
| \_pairIndex | uint256 | The index of the pair to retrieve the limit order fee percentage for. |

**Returns**

| Type    | Description                                        |
| ------- | -------------------------------------------------- |
| uint256 | The limit order fee percentage for the given pair. |

## pairMinLevPosHoney

```solidity
function pairMinLevPosHoney(
    uint256 _pairIndex
) external view returns (uint256)
```

Retrieves the minimum leveraged position size in HONEY for a given pair index.

**Parameters**

| Name        | Type    | Description                                                                |
| ----------- | ------- | -------------------------------------------------------------------------- |
| \_pairIndex | uint256 | The index of the pair to retrieve the minimum leveraged position size for. |

**Returns**

| Type    | Description                                                      |
| ------- | ---------------------------------------------------------------- |
| uint256 | The minimum leveraged position size in HONEY for the given pair. |

## getPair

```solidity
function getPair(uint256 _pairIndex) external view returns (
    Pair memory,
    Group memory,
    Fee memory
)
```

Retrieves the pair, group, and fee information for a given pair index.

**Parameters**
| Name | Type | Description |
|-------------|-----------|---------------------------------------|
| \_pairIndex | uint256 | The index of the pair to retrieve the information for. |

**Returns**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| - | Pair memory | The pair information. |
| - | Group memory | The group information associated with the pair. |
| - | Fee memory | The fee information associated with the pair. |

## getAllPairs

```solidity
function getAllPairs() external view returns (
    Pair[] memory,
    Group[] memory,
    Fee[] memory
)
```

Retrieves all pairs, groups, and fees information.

## Structs

```solidity
struct Feed {
    // Pyth Price Feed ID for the base currency
    bytes32 baseID;
    // Pyth Price Feed ID for the quote currency
    bytes32 quoteID;
    // Whether the price requires a singular or triangular calculation
    FeedCalculation feedCalculation;
    // If true, will use the confidence range of a price result. This implies the settlement of orders and
    // positions will occur at the boundaries of the price range rather than the usually used mean.
    // More info: https://docs.pyth.network/price-feeds/best-practices#confidence-intervals
    bool useConfSpread;
}

struct Pair {
    string from; // name of the base currency
    string to; // name of the quote currency
    Feed feed;
    uint256 groupIndex;
    uint256 feeIndex;
}

struct Group {
    string name;
    uint256 minLeverage;
    uint256 maxLeverage;
    uint256 maxCollateralP; // % (of HONEY vault current balance)
}

struct Fee {
    string name;
    uint256 openFeeP; // PRECISION (% of leveraged pos)
    uint256 closeFeeP; // PRECISION (% of leveraged pos)
    uint256 limitOrderFeeP; // PRECISION (% of leveraged pos)
    uint256 minLevPosHoney; // 1e18 (collateral x leverage, useful for min fee)
}
```
