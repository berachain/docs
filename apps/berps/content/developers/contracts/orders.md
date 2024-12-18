---
head:
  - - meta
    - property: og:title
      content: Orders Interface
  - - meta
    - name: description
      content: Technical reference of Orders contract interface.
  - - meta
    - property: og:description
      content: Technical reference of Orders contract interface.
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Orders Contract Interface

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.orders.address">{{config.contracts.orders.address}}</a><span v-if="config.contracts.orders.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.orders.abi">ABI JSON</a></span></small>

`Orders.sol` manages open trades, limit orders, and stores user funds.

## getOpenTrade

```solidity
function getOpenTrade(uint256 tradeIndex) external view returns (Trade memory)
```

Retrieves an open trade for a given trade index.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| tradeIndex | uint256 | The index of the trade. |

**Returns**
| Type | Description |
|----------|---------------------------------------|
| Trade memory | The open trade for the specified index. |

## getOpenTradeInfo

```solidity
function getOpenTradeInfo(uint256 tradeIndex) external view returns (TradeInfo memory)
```

Retrieves the additional trade information for a given trade index.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| tradeIndex | uint256 | The index of the trade. |

**Returns**
| Type | Description |
|----------|---------------------------------------|
| TradeInfo memory | The additional trade information for the specified trade. |

## getOpenTradesCount

```solidity
function getOpenTradesCount(address trader, uint256 pairIndex) external view returns (uint256)
```

Retrieves the count of open trades for a given trader and pair index.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| trader | address | The address of the trader. |
| pairIndex | uint256 | The index of the trading pair. |

**Returns**
| Type | Description |
|----------|---------------------------------------|
| uint256 | The count of open trades for the specified trader and pair. |

## getOpenTrades

```solidity
function getOpenTrades(uint256 offset, uint256 count) external view returns (Trade[] memory)
```

Retrieves a range of open trades.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| offset | uint256 | The starting index of the range. |
| count | uint256 | The number of trades to retrieve. |

**Returns**
| Type | Description |
|----------|---------------------------------------|
| Trade[] memory | An array of open trades within the specified range. |

## getOpenTradeInfos

```solidity
function getOpenTradeInfos(uint256 offset, uint256 count) external view returns (TradeInfo[] memory)
```

Retrieves a range of additional trade information for open trades.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| offset | uint256 | The starting index of the range. |
| count | uint256 | The number of trade information entries to retrieve. |

**Returns**
| Type | Description |
|----------|---------------------------------------|
| TradeInfo[] memory | An array of additional trade information within the specified range. |

## getOpenLimitOrder

```solidity
function getOpenLimitOrder(uint256 limitIndex) external view returns (OpenLimitOrder memory)
```

Retrieves an open limit order for a given order index.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| limitIndex | uint256 | The index of the limit order. |

**Returns**
| Type | Description |
|----------|---------------------------------------|
| OpenLimitOrder memory | The open limit order for the specified index. |

## getOpenLimitOrdersCount

```solidity
function getOpenLimitOrdersCount(address trader, uint256 pairIndex) external view returns (uint256)
```

Retrieves the count of open limit orders for a given trader and pair index.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| trader | address | The address of the trader. |
| pairIndex | uint256 | The index of the trading pair. |

**Returns**
| Type | Description |
|----------|---------------------------------------|
| uint256 | The count of open limit orders for the specified trader and pair. |

## getOpenLimitOrders

```solidity
function getOpenLimitOrders(uint256 offset, uint256 count) external view returns (OpenLimitOrder[] memory)
```

Retrieves a range of open limit orders.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| offset | uint256 | The starting index of the range. |
| count | uint256 | The number of limit orders to retrieve. |

**Returns**
| Type | Description |
|----------|---------------------------------------|
| OpenLimitOrder[] memory | An array of open limit orders within the specified range. |

## Structs

```solidity
struct Trade {
    address trader;
    uint256 pairIndex;
    uint256 index; // don't need, will auto-fill
    uint256 initialPosToken; // 1e18
    uint256 positionSizeHoney; // 1e18
    uint256 openPrice; // PRECISION == 1e10
    bool buy;
    uint256 leverage;
    uint256 tp; // PRECISION
    uint256 sl; // PRECISION
}

struct TradeInfo {
    uint256 tokenPriceHoney; // PRECISION
    uint256 openInterestHoney; // positionSize * leverage (1e18)
    uint256 tpLastUpdated;
    uint256 slLastUpdated;
    uint256 openTime; // timestamp of opening
}

struct OpenLimitOrder {
    address trader;
    uint256 pairIndex;
    uint256 index;
    uint256 positionSize; // 1e18 (HONEY)
    bool buy;
    uint256 leverage;
    uint256 tp; // PRECISION (%)
    uint256 sl; // PRECISION (%)
    uint256 minPrice; // PRECISION
    uint256 maxPrice; // PRECISION
    uint256 openTime; // timestamp of opening
}
```

## Enums

```solidity
enum LimitOrder {
    TP,
    SL,
    LIQ,
    OPEN
}
```
