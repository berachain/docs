---
head:
  - - meta
    - property: og:title
      content: Entrypoint Interface
  - - meta
    - name: description
      content: Technical reference of Entrypoint contract interface.
  - - meta
    - property: og:description
      content: Technical reference of Entrypoint contract interface.
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Entrypoint Contract Interface

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.entrypoint.address">{{config.contracts.entrypoint.address}}</a><span v-if="config.contracts.entrypoint.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.entrypoint.abi">ABI JSON</a></span></small>

`Entrypoint.sol` serves as the entrypoint for all trading actions

## openTrade

```solidity
function openTrade(
    ITradingStorage.Trade memory t,
    ISettlement.TradeType orderType,
    uint256 slippageP,
    bytes[] calldata priceUpdateData
) external payable
```

Allows a user to open a new trade (market or limit order).

**Parameters**

| Name            | Type                  | Description                                               |
| --------------- | --------------------- | --------------------------------------------------------- |
| t               | ITradingStorage.Trade | The trade parameters.                                     |
| orderType       | ISettlement.TradeType | The order type (market or limit).                         |
| slippageP       | uint256               | The allowed slippage percentage (for market orders only). |
| priceUpdateData | bytes[] calldata      | The price update data from the oracle.                    |

## closeTradeMarket

```solidity
function closeTradeMarket(
    uint256 pairIndex,
    uint256 index,
    bytes[] calldata priceUpdateData
) external payable
```

Allows a user to close an existing trade using a market order.

**Parameters**
| Name | Type | Description |
|------------------|-----------|---------------------------------------|
| pairIndex | uint256 | The index of the trading pair. |
| index | uint256 | The index of the trade to close. |
| priceUpdateData | bytes[] calldata | The price update data from the oracle. |

## updateOpenLimitOrder

```solidity
function updateOpenLimitOrder(
    uint256 pairIndex,
    uint256 index,
    uint256 newPrice,
    uint256 tp,
    uint256 sl,
    bytes[] calldata priceUpdateData
) external payable
```

Allows a user to update an open limit order.

**Parameters**
| Name | Type | Description |
|------------------|-----------|---------------------------------------|
| pairIndex | uint256 | The index of the trading pair. |
| index | uint256 | The index of the limit order to update. |
| newPrice | uint256 | The new limit price. |
| tp | uint256 | The new take profit price. |
| sl | uint256 | The new stop loss price. |
| priceUpdateData | bytes[] calldata | The price update data from the oracle. |

## cancelOpenLimitOrder

```solidity
function cancelOpenLimitOrder(
    uint256 pairIndex,
    uint256 index
) external
```

Allows a user to cancel an open limit order.

**Parameters**
| Name | Type | Description |
|------------------|-----------|---------------------------------------|
| pairIndex | uint256 | The index of the trading pair. |
| index | uint256 | The index of the limit order to cancel. |

## updateTp

```solidity
function updateTp(
    uint256 pairIndex,
    uint256 index,
    uint256 newTp
) external
```

Allows a user to update the take profit price of an open trade.

**Parameters**

| Name      | Type    | Description                       |
| --------- | ------- | --------------------------------- |
| pairIndex | uint256 | The index of the trading pair.    |
| index     | uint256 | The index of the trade to update. |
| newTp     | uint256 | The new take profit price.        |

## updateSl

```solidity
function updateSl(
    uint256 pairIndex,
    uint256 index,
    uint256 newSl,
    bytes[] calldata priceUpdateData
) external payable
```

Allows a user to update the stop loss price of an open trade.

**Parameters**
| Name | Type | Description |
|------------------|-----------|---------------------------------------|
| pairIndex | uint256 | The index of the trading pair. |
| index | uint256 | The index of the trade to update. |
| newSl | uint256 | The new stop loss price. |
| priceUpdateData | bytes[] calldata | The price update data from the oracle. |

## executeLimitOrder

```solidity
function executeLimitOrder(
    ITradingStorage.LimitOrder orderType,
    address trader,
    uint256 pairIndex,
    uint256 index,
    bytes[] calldata priceUpdateData
) external payable
```

Allows a user to execute a limit order (open, close, TP, SL, or liquidation).

**Parameters**
| Name | Type | Description |
|------------------|-------------------------------------------|---------------------------------------|
| orderType | ITradingStorage.LimitOrder | The type of the limit order. |
| trader | address | The address of the trader. |
| pairIndex | uint256 | The index of the trading pair. |
| index | uint256 | The index of the limit order. |
| priceUpdateData | bytes[] calldata | The price update data from the oracle. |

## pythConfig

```solidity
function pythConfig() external view returns (PythConfig memory)
```

Returns the current Pyth configuration settings.

**Returns**
| Type | Description |
|-------------------------------------------|---------------------------------------|
| PythConfig | Pyth configuration settings. |
