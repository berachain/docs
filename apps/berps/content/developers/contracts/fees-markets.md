---
head:
  - - meta
    - property: og:title
      content: PairInfos Interface
  - - meta
    - name: description
      content: Technical reference for PairInfos contract interface.
  - - meta
    - property: og:description
      content: Technical reference for PairInfos contract interface.
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# FeesMarkets Contract Interface

> <small><a target="_blank" :href="config.testnet.dapps.beratrail.url + 'address/' + config.contracts.feesMarkets.address">{{config.contracts.feesMarkets.address}}</a><span v-if="config.contracts.feesMarkets.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.feesMarkets.abi">ABI JSON</a></span></small>

`FeesMarkets.sol` calculates and manages fees related to trading pairs.

## Functions

### getTradePriceImpact

```solidity
function getTradePriceImpact(
    int64 openPrice,
    uint256 pairIndex,
    bool long,
    uint256 tradeOpenInterest
) external view returns (int64 priceImpactP, int64 priceAfterImpact)
```

Calculates the price impact of a trade.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| openPrice | int64 | The opening price of the trade. |
| pairIndex | uint256 | The index of the pair. |
| long | bool | Whether the trade is a long position. |
| tradeOpenInterest | uint256 | The open interest of the trade. |

**Returns**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| priceImpactP | int64 | The price impact percentage. |
| priceAfterImpact | int64 | The price after applying the impact. |

### getTradePriceImpactPure

```solidity
function getTradePriceImpactPure(
    int64 openPrice,
    bool long,
    uint256 startOpenInterest,
    uint256 tradeOpenInterest,
    uint256 onePercentDepth
) public pure returns (int64 priceImpactP, int64 priceAfterImpact)
```

Calculates the price impact of a trade using pure function.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| openPrice | int64 | The opening price of the trade. |
| long | bool | Whether the trade is a long position. |
| startOpenInterest | uint256 | The starting open interest. |
| tradeOpenInterest | uint256 | The open interest of the trade. |
| onePercentDepth | uint256 | The one percent depth. |

**Returns**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| priceImpactP | int64 | The price impact percentage. |
| priceAfterImpact | int64 | The price after applying the impact. |

### getTradeRolloverFee

```solidity
function getTradeRolloverFee(
    uint256 pairIndex,
    uint256 tradeIndex,
    uint256 collateral
) public view returns (uint256)
```

Calculates the rollover fee for a trade.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| pairIndex | uint256 | The index of the pair. |
| tradeIndex | uint256 | The index of the trade. |
| collateral | uint256 | The collateral amount of the trade. |

**Returns**
| Type | Description |
|----------|---------------------------------------|
| uint256 | The rollover fee for the trade. |

### getPendingAccRolloverFees

```solidity
function getPendingAccRolloverFees(uint256 pairIndex) public view returns (uint256)
```

Retrieves the pending accumulated rollover fees for a specific pair.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| pairIndex | uint256 | The index of the pair. |

**Returns**
| Type | Description |
|----------|---------------------------------------|
| uint256 | The pending accumulated rollover fees. |

### getTradeFundingFee

```solidity
function getTradeFundingFee(
    uint256 pairIndex,
    uint256 tradeIndex,
    bool long,
    uint256 collateral,
    uint256 leverage
) public view returns (int256)
```

Calculates the funding fee for a trade.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| pairIndex | uint256 | The index of the pair. |
| tradeIndex | uint256 | The index of the trade. |
| long | bool | Whether the trade is a long position. |
| collateral | uint256 | The collateral amount of the trade. |
| leverage | uint256 | The leverage of the trade. |

**Returns**
| Type | Description |
|----------|---------------------------------------|
| int256 | The funding fee for the trade. Positive value indicates a fee, negative value indicates a reward. |

### getTradeLiquidationPrice

```solidity
function getTradeLiquidationPrice(
    uint256 pairIndex,
    uint256 index,
    int64 openPrice,
    bool long,
    uint256 collateral,
    uint256 leverage
) external view returns (int64)
```

Calculates the liquidation price for a trade.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| pairIndex | uint256 | The index of the pair. |
| index | uint256 | The index of the trade. |
| openPrice | int64 | The opening price of the trade. |
| long | bool | Whether the trade is a long position. |
| collateral | uint256 | The collateral amount of the trade. |
| leverage | uint256 | The leverage of the trade. |

**Returns**
| Type | Description |
|----------|---------------------------------------|
| int64 | The liquidation price for the trade. |

### getTradeValuePure

```solidity
function getTradeValuePure(
    uint256 collateral,
    int256 percentProfit,
    uint256 rolloverFee,
    int256 fundingFee,
    uint256 closingFee
) public pure returns (uint256)
```

Calculates the trade value after applying PnL and fees.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| collateral | uint256 |The collateral amount of the trade (1e18 HONEY). |
| percentProfit | int256 | The percentage profit of the trade. |
| rolloverFee | uint256 | The rollover fee of the trade (1e18 HONEY). |
| fundingFee | int256 | The funding fee of the trade (1e18 HONEY). |
| closingFee | uint256 | The closing fee of the trade. |

**Returns**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| value | uint256 | The trade value after applying PnL and fees. |

### getPair

```solidity
function getPair(uint256 pairIndex) external view returns (
    PairParams memory,
    PairRolloverFees memory,
    PairFundingFees memory
)
```

Retrieves the parameters and fees for a specific pair.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| pairIndex | uint256 | The index of the pair. |

**Returns**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| - | PairParams | The parameters of the pair. |
| - | PairRolloverFees | The rollover fees of the pair. |
| - | PairFundingFees | The funding fees of the pair. |

### getAllPairs

```solidity
function getAllPairs() external view returns (
    PairParams[] memory,
    PairRolloverFees[] memory,
    PairFundingFees[] memory
)
```

Retrieves the parameters and fees for all pairs.

**Returns**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| - | PairParams[] | The array of parameters for all pairs. |
| - | PairRolloverFees[] | The array of rollover fees for all pairs. |
| - | PairFundingFees[] | The array of funding fees for all pairs. |

### getOnePercentDepthAbove

```solidity
function getOnePercentDepthAbove(uint256 pairIndex) external view returns (uint256)
```

Retrieves the one percent depth above the price for a specific pair.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| pairIndex | uint256 | The index of the pair. |

**Returns**
| Type | Description |
|----------|---------------------------------------|
| uint256 | The one percent depth above the price. |

### getOnePercentDepthBelow

```solidity
function getOnePercentDepthBelow(uint256 pairIndex) external view returns (uint256)
```

Retrieves the one percent depth below the price for a specific pair.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| pairIndex | uint256 | The index of the pair. |

**Returns**
| Type | Description |
|----------|---------------------------------------|
| uint256 | The one percent depth below the price. |

### getRolloverFeePerBlockP

```solidity
function getRolloverFeePerBlockP(uint256 pairIndex) external view returns (uint256)
```

Retrieves the rollover fee per block for a specific pair.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| pairIndex | uint256 | The index of the pair. |

**Returns**
| Type | Description |
|----------|---------------------------------------|
| uint256 | The rollover fee per block. |

### getFundingFeePerBlockP

```solidity
function getFundingFeePerBlockP(uint256 pairIndex) external view returns (uint256)
```

Retrieves the funding fee per block for a specific pair.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| pairIndex | uint256 | The index of the pair. |

**Returns**
| Type | Description |
|----------|---------------------------------------|
| uint256 | The funding fee per block. |

### getAccRolloverFees

```solidity
function getAccRolloverFees(uint256 pairIndex) external view returns (uint256)
```

Retrieves the accumulated rollover fees for a specific pair.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| pairIndex | uint256 | The index of the pair. |

**Returns**
| Type | Description |
|----------|---------------------------------------|
| uint256 | The accumulated rollover fees. |

### getAccRolloverFeesUpdateBlock

```solidity
function getAccRolloverFeesUpdateBlock(uint256 pairIndex) external view returns (uint256)
```

Retrieves the last update block for the accumulated rollover fees of a specific pair.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| pairIndex | uint256 | The index of the pair. |

**Returns**
| Type | Description |
|----------|---------------------------------------|
| uint256 | The last update block for the accumulated rollover fees. |

### getAccFundingFeesLong

```solidity
function getAccFundingFeesLong(uint256 pairIndex) external view returns (int256)
```

Retrieves the accumulated funding fees for long positions of a specific pair.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| pairIndex | uint256 | The index of the pair. |

**Returns**
| Type | Description |
|----------|---------------------------------------|
| int256 | The accumulated funding fees for long positions. |

### getAccFundingFeesShort

```solidity
function getAccFundingFeesShort(uint256 pairIndex) external view returns (int256)
```

Retrieves the accumulated funding fees for short positions of a specific pair.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| pairIndex | uint256 | The index of the pair. |

**Returns**
| Type | Description |
|----------|---------------------------------------|
| int256 | The accumulated funding fees for short positions. |

### getAccFundingFeesUpdateBlock

```solidity
function getAccFundingFeesUpdateBlock(uint256 pairIndex) external view returns (uint256)
```

Retrieves the last update block for the accumulated funding fees of a specific pair.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| pairIndex | uint256 | The index of the pair. |

**Returns**
| Type | Description |
|----------|---------------------------------------|
| uint256 | The last update block for the accumulated funding fees. |

### tradeInitialAccFees

```solidity
function tradeInitialAccFees(uint256 tradeIndex) external view returns (TradeInitialAccFees memory)
```

Retrieves the initial accumulated fees for a specific trade.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| tradeIndex | uint256 | The index of the trade. |

**Returns**
| Type | Description |
|----------|---------------------------------------|
| TradeInitialAccFees | The initial accumulated fees for the trade. |

### getTradeInitialAccFees

```solidity
function getTradeInitialAccFees(
    uint256 offset,
    uint256 count
) external view returns (TradeInitialAccFees[] memory)
```

Retrieves a range of initial accumulated fees for trades.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| offset | uint256 | The starting index of the range. |
| count | uint256 | The number of items to retrieve. |

**Returns**
| Type | Description |
|----------|---------------------------------------|
| TradeInitialAccFees[] | The array of initial accumulated fees for trades. |

## Structs

```solidity
struct TradeInitialAccFees {
    bytes32 tradeKey; // tradeKeyFor: (address trader, uint256 pairIndex, uint256 index)
    uint256 rollover; // 1e18 (HONEY)
    int256 funding; // 1e18 (HONEY)
    bool openedAfterUpdate;
}

struct PairParams {
    uint256 onePercentDepthAbove; // HONEY
    uint256 onePercentDepthBelow; // HONEY
    uint256 rolloverFeePerBlockP; // PRECISION (%) // rolling over when
        // position open (flat fee)
    uint256 fundingFeePerBlockP; // PRECISION (%) // funding fee per block
        // (received/provided for long/short)
}

struct PairFundingFees {
    int256 accPerOiLong; // 1e18 (HONEY) // accrued funding fee per oi long
    int256 accPerOiShort; // 1e18 (HONEY) // accrued funding fee per oi
        // short
    uint256 lastUpdateBlock;
}

// accrued per collateral
struct PairRolloverFees {
    uint256 accPerCollateral; // 1e18 (HONEY)
    uint256 lastUpdateBlock;
}
```
