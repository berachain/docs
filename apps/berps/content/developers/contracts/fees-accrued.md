---
head:
  - - meta
    - property: og:title
      content: FeesAccrued Interface
  - - meta
    - name: description
      content: Technical reference for FeesAccrued contract interface.
  - - meta
    - property: og:description
      content: Technical reference for FeesAccrued contract interface.
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# FeesAccrued Contract Interface

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.feesAccrued.address">{{config.contracts.feesAccrued.address}}</a><span v-if="config.contracts.feesAccrued.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.feesAccrued.abi">ABI JSON</a></span></small>

`FeesAccrued.sol` calculates and manages borrowing fees.

## getPairBorrowingFee

```solidity
function getPairBorrowingFee(
    uint256 pairIndex,
    bool long
)
    public
    view
    returns (uint256 feeP)
```

Retrieves the borrowing fee percentage for a pair.

**Parameters**

| Name      | Type    | Description                            |
| --------- | ------- | -------------------------------------- |
| pairIndex | uint256 | The index of the trading pair.         |
| long      | bool    | Whether the position is long or short. |

**Returns**

| Name | Type    | Description                                |
| ---- | ------- | ------------------------------------------ |
| feeP | uint256 | The borrowing fee percentage for the pair. |

## getTradeBorrowingFee

```solidity
function getTradeBorrowingFee(BorrowingFeeInput memory input)
    public
    view
    returns (uint256 fee)
```

Calculates the borrowing fee for a specific trade.

**Parameters**

| Name  | Type              | Description                         |
| ----- | ----------------- | ----------------------------------- |
| input | BorrowingFeeInput | The input parameters for the trade. |

**Returns**

| Name | Type    | Description                                 |
| ---- | ------- | ------------------------------------------- |
| fee  | uint256 | The borrowing fee for the trade (in HONEY). |

## getTradeLiquidationPrice

```solidity
function getTradeLiquidationPrice(LiqPriceInput calldata input)
    external
    view
    returns (uint256)
```

Calculates the liquidation price for a specific trade.

**Parameters**

| Name  | Type          | Description                         |
| ----- | ------------- | ----------------------------------- |
| input | LiqPriceInput | The input parameters for the trade. |

**Returns**

| Type    | Description                                         |
| ------- | --------------------------------------------------- |
| uint256 | The liquidation price for the trade (in PRECISION). |

## withinMaxGroupOi

```solidity
function withinMaxGroupOi(
    uint256 pairIndex,
    bool long,
    uint256 positionSizeHoney
)
    external
    view
    returns (bool)
```

Checks if a position size is within the maximum group open interest limit.

**Parameters**

| Name              | Type    | Description                            |
| ----------------- | ------- | -------------------------------------- |
| pairIndex         | uint256 | The index of the trading pair.         |
| long              | bool    | Whether the position is long or short. |
| positionSizeHoney | uint256 | The size of the position (in HONEY).   |

**Returns**

| Type | Description                                                     |
| ---- | --------------------------------------------------------------- |
| bool | True if the position size is within the limit, false otherwise. |

## getGroup

```solidity
function getGroup(uint16 groupIndex)
    external
    view
    returns (Group memory)
```

Retrieves the group information for a specific group index.

**Parameters**

| Name       | Type   | Description             |
| ---------- | ------ | ----------------------- |
| groupIndex | uint16 | The index of the group. |

**Returns**

| Type         | Description                                    |
| ------------ | ---------------------------------------------- |
| Group memory | The group information for the specified index. |

## getPair

```solidity
function getPair(uint256 pairIndex)
    external
    view
    returns (Pair memory)
```

Retrieves the pair information for a specific pair index.

**Parameters**

| Name      | Type    | Description                    |
| --------- | ------- | ------------------------------ |
| pairIndex | uint256 | The index of the trading pair. |

**Returns**

| Type        | Description                                   |
| ----------- | --------------------------------------------- |
| Pair memory | The pair information for the specified index. |

## getAllPairs

```solidity
function getAllPairs()
    external
    view
    returns (Pair[] memory)
```

Retrieves the information for all trading pairs.

**Returns**

| Type          | Description                                  |
| ------------- | -------------------------------------------- |
| Pair[] memory | The array of pair information for all pairs. |

## getGroups

```solidity
function getGroups(uint16[] calldata indices)
    external
    view
    returns (Group[] memory)
```

Retrieves the group information for the specified indices.

**Parameters**

| Name    | Type     | Description                 |
| ------- | -------- | --------------------------- |
| indices | uint16[] | The array of group indices. |

**Returns**

| Type           | Description                                               |
| -------------- | --------------------------------------------------------- |
| Group[] memory | The array of group information for the specified indices. |

## getTradeInitialAccFees

```solidity
function getTradeInitialAccFees(
    address trader,
    uint256 pairIndex,
    uint256 index
)
    external
    view
    returns (
        InitialAccFees memory feesAccrued,
        IPairInfos.TradeInitialAccFees memory otherFees
    )
```

Retrieves the initial accumulated fees for a specific trade.

**Parameters**

| Name      | Type    | Description                    |
| --------- | ------- | ------------------------------ |
| trader    | address | The address of the trader.     |
| pairIndex | uint256 | The index of the trading pair. |
| index     | uint256 | The index of the trade.        |

**Returns**

| Name        | Type                                  | Description                                  |
| ----------- | ------------------------------------- | -------------------------------------------- |
| feesAccrued | InitialAccFees memory                 | The initial accumulated borrowing fees.      |
| otherFees   | IPairInfos.TradeInitialAccFees memory | The initial accumulated fees from PairInfos. |

## getInitialAccFees

```solidity
function getInitialAccFees(
    uint256 offset,
    uint256 count
)
    external
    view
    returns (InitialAccFees[] memory)
```

Retrieves a range of initial accumulated fees for trades.

**Parameters**

| Name   | Type    | Description                      |
| ------ | ------- | -------------------------------- |
| offset | uint256 | The starting index of the range. |
| count  | uint256 | The number of items to retrieve. |

**Returns**

| Type                    | Description                                       |
| ----------------------- | ------------------------------------------------- |
| InitialAccFees[] memory | The array of initial accumulated fees for trades. |

## getPairPendingAccFees

```solidity
function getPairPendingAccFees(
    uint256 pairIndex,
    uint256 currentBlock
)
    public
    view
    returns (
        uint64 accFeeLong,
        uint64 accFeeShort,
        int256 pairAccFeeDelta
    )
```

Retrieves the pending accumulated fees for a pair.

**Parameters**

| Name         | Type    | Description                    |
| ------------ | ------- | ------------------------------ |
| pairIndex    | uint256 | The index of the trading pair. |
| currentBlock | uint256 | The current block number.      |

**Returns**

| Name            | Type   | Description                                      |
| --------------- | ------ | ------------------------------------------------ |
| accFeeLong      | uint64 | The pending accumulated fee for long positions.  |
| accFeeShort     | uint64 | The pending accumulated fee for short positions. |
| pairAccFeeDelta | int256 | The change in the pair's accumulated fee.        |

## getPairPendingAccFee

```solidity
function getPairPendingAccFee(
    uint256 pairIndex,
    uint256 currentBlock,
    bool long
)
    public
    view
    returns (uint64 accFee)
```

Retrieves the pending accumulated fee for a pair based on the position type.

**Parameters**

| Name         | Type    | Description                            |
| ------------ | ------- | -------------------------------------- |
| pairIndex    | uint256 | The index of the trading pair.         |
| currentBlock | uint256 | The current block number.              |
| long         | bool    | Whether the position is long or short. |

**Returns**

| Name   | Type   | Description                                                  |
| ------ | ------ | ------------------------------------------------------------ |
| accFee | uint64 | The pending accumulated fee for the specified position type. |

## getGroupPendingAccFees

```solidity
function getGroupPendingAccFees(
    uint16 groupIndex,
    uint256 currentBlock
)
    public
    view
    returns (
        uint64 accFeeLong,
        uint64 accFeeShort,
        int256 groupAccFeeDelta
    )
```

Retrieves the pending accumulated fees for a group.

**Parameters**

| Name         | Type    | Description               |
| ------------ | ------- | ------------------------- |
| groupIndex   | uint16  | The index of the group.   |
| currentBlock | uint256 | The current block number. |

**Returns**

| Name             | Type   | Description                                      |
| ---------------- | ------ | ------------------------------------------------ |
| accFeeLong       | uint64 | The pending accumulated fee for long positions.  |
| accFeeShort      | uint64 | The pending accumulated fee for short positions. |
| groupAccFeeDelta | int256 | The change in the group's accumulated fee.       |

## getGroupPendingAccFee

```solidity
function getGroupPendingAccFee(
    uint16 groupIndex,
    uint256 currentBlock,
    bool long
)
    public
    view
    returns (uint64 accFee)
```

Retrieves the pending accumulated fee for a group based on the position type.

**Parameters**

| Name         | Type    | Description                            |
| ------------ | ------- | -------------------------------------- |
| groupIndex   | uint16  | The index of the group.                |
| currentBlock | uint256 | The current block number.              |
| long         | bool    | Whether the position is long or short. |

**Returns**

| Name   | Type   | Description                                                  |
| ------ | ------ | ------------------------------------------------------------ |
| accFee | uint64 | The pending accumulated fee for the specified position type. |

## getPendingAccFees

```solidity
function getPendingAccFees(
    uint64 accFeeLong,
    uint64 accFeeShort,
    uint256 oiLong,
    uint256 oiShort,
    uint32 feePerBlock,
    uint256 currentBlock,
    uint256 accLastUpdatedBlock,
    uint256 vaultMarketCap
)
    public
    pure
    returns (
        uint64 newAccFeeLong,
        uint64 newAccFeeShort,
        int256 delta
    )
```

Calculates the pending accumulated fees based on various parameters.

**Parameters**

| Name                | Type    | Description                                      |
| ------------------- | ------- | ------------------------------------------------ |
| accFeeLong          | uint64  | The current accumulated fee for long positions.  |
| accFeeShort         | uint64  | The current accumulated fee for short positions. |
| oiLong              | uint256 | The open interest for long positions.            |
| oiShort             | uint256 | The open interest for short positions.           |
| feePerBlock         | uint32  | The fee per block.                               |
| currentBlock        | uint256 | The current block number.                        |
| accLastUpdatedBlock | uint256 | The block number of the last fee update.         |
| vaultMarketCap      | uint256 | The market cap of the vault.                     |

**Returns**

| Name           | Type   | Description                                  |
| -------------- | ------ | -------------------------------------------- |
| newAccFeeLong  | uint64 | The new accumulated fee for long positions.  |
| newAccFeeShort | uint64 | The new accumulated fee for short positions. |
| delta          | int256 | The change in the accumulated fee.           |

## getPairGroupAccFeesDeltasNoTrade

```solidity
function getPairGroupAccFeesDeltasNoTrade(
    uint256 i,
    PairGroup[] memory pairGroups,
    uint256 pairIndex,
    bool long,
    uint256 currentBlock
)
    public
    view
    returns (uint64 deltaGroup, uint64 deltaPair)
```

Retrieves the accumulated fee deltas for a pair group when no trade is active.

**Parameters**

| Name         | Type               | Description                            |
| ------------ | ------------------ | -------------------------------------- |
| i            | uint256            | The index of the pair group.           |
| pairGroups   | PairGroup[] memory | The array of pair groups.              |
| pairIndex    | uint256            | The index of the trading pair.         |
| long         | bool               | Whether the position is long or short. |
| currentBlock | uint256            | The current block number.              |

**Returns**

| Name       | Type   | Description                              |
| ---------- | ------ | ---------------------------------------- |
| deltaGroup | uint64 | The accumulated fee delta for the group. |
| deltaPair  | uint64 | The accumulated fee delta for the pair.  |

## getPairGroupAccFeesDeltas

```solidity
function getPairGroupAccFeesDeltas(
    uint256 i,
    PairGroup[] memory pairGroups,
    InitialAccFees memory initialFees,
    uint256 pairIndex,
    bool long,
    uint256 currentBlock
)
    public
    view
    returns (
        uint64 deltaGroup,
        uint64 deltaPair,
        bool beforeTradeOpen
    )
```

Retrieves the accumulated fee deltas for a pair group.

**Parameters**

| Name         | Type                  | Description                            |
| ------------ | --------------------- | -------------------------------------- |
| i            | uint256               | The index of the pair group.           |
| pairGroups   | PairGroup[] memory    | The array of pair groups.              |
| initialFees  | InitialAccFees memory | The initial accumulated fees.          |
| pairIndex    | uint256               | The index of the trading pair.         |
| long         | bool                  | Whether the position is long or short. |
| currentBlock | uint256               | The current block number.              |

**Returns**

| Name            | Type   | Description                                         |
| --------------- | ------ | --------------------------------------------------- |
| deltaGroup      | uint64 | The accumulated fee delta for the group.            |
| deltaPair       | uint64 | The accumulated fee delta for the pair.             |
| beforeTradeOpen | bool   | Whether the pair group is before the trade opening. |

## getPairOpenInterestHoney

```solidity
function getPairOpenInterestHoney(uint256 pairIndex)
    public
    view
    returns (uint256, uint256, uint256)
```

Retrieves the open interest in HONEY for a pair.

**Parameters**

| Name      | Type    | Description                    |
| --------- | ------- | ------------------------------ |
| pairIndex | uint256 | The index of the trading pair. |

**Returns**

| Type    | Description                            |
| ------- | -------------------------------------- |
| uint256 | The open interest for long positions.  |
| uint256 | The open interest for short positions. |
| uint256 | The maximum open interest.             |

## getPairGroupIndex

```solidity
function getPairGroupIndex(uint256 pairIndex)
    public
    view
    returns (uint16 groupIndex)
```

Retrieves the group index for a pair.

**Parameters**

| Name      | Type    | Description                    |
| --------- | ------- | ------------------------------ |
| pairIndex | uint256 | The index of the trading pair. |

**Returns**

| Name       | Type   | Description                                 |
| ---------- | ------ | ------------------------------------------- |
| groupIndex | uint16 | The index of the group the pair belongs to. |

## getPendingAccBlockWeightedMarketCap

```solidity
function getPendingAccBlockWeightedMarketCap(uint256 currentBlock)
    public
    view
    returns (uint256)
```

Retrieves the pending accumulated block-weighted market cap.

**Parameters**

| Name         | Type    | Description               |
| ------------ | ------- | ------------------------- |
| currentBlock | uint256 | The current block number. |

**Returns**

| Type    | Description                                        |
| ------- | -------------------------------------------------- |
| uint256 | The pending accumulated block-weighted market cap. |

## getGroupWeightedVaultMarketCapSinceLastUpdate

```solidity
function getGroupWeightedVaultMarketCapSinceLastUpdate(
    uint16 groupIndex,
    uint256 currentBlock
)
    public
    view
    returns (uint256)
```

Retrieves the group's weighted vault market cap since the last update.

**Parameters**

| Name         | Type    | Description               |
| ------------ | ------- | ------------------------- |
| groupIndex   | uint16  | The index of the group.   |
| currentBlock | uint256 | The current block number. |

**Returns**

| Type    | Description                                                  |
| ------- | ------------------------------------------------------------ |
| uint256 | The group's weighted vault market cap since the last update. |

## getPairWeightedVaultMarketCapSinceLastUpdate

```solidity
function getPairWeightedVaultMarketCapSinceLastUpdate(
    uint256 pairIndex,
    uint256 currentBlock
)
    public
    view
    returns (uint256)
```

Retrieves the pair's weighted vault market cap since the last update.

**Parameters**

| Name         | Type    | Description                    |
| ------------ | ------- | ------------------------------ |
| pairIndex    | uint256 | The index of the trading pair. |
| currentBlock | uint256 | The current block number.      |

**Returns**

| Type    | Description                                                 |
| ------- | ----------------------------------------------------------- |
| uint256 | The pair's weighted vault market cap since the last update. |

## getWeightedVaultMarketCap

```solidity
function getWeightedVaultMarketCap(
    uint256 accBlockWeightedMarketCap,
    uint256 lastAccBlockWeightedMarketCap,
    uint256 blockDelta
)
    public
    pure
    returns (uint256)
```

Calculates the weighted vault market cap based on various parameters.

**Parameters**

| Name                          | Type    | Description                                     |
| ----------------------------- | ------- | ----------------------------------------------- |
| accBlockWeightedMarketCap     | uint256 | The accumulated block-weighted market cap.      |
| lastAccBlockWeightedMarketCap | uint256 | The last accumulated block-weighted market cap. |
| blockDelta                    | uint256 | The difference in block numbers.                |

**Returns**

| Type    | Description                               |
| ------- | ----------------------------------------- |
| uint256 | The calculated weighted vault market cap. |

## getPairsCurrentAPR

```solidity
function getPairsCurrentAPR(uint256[] calldata indices)
    external
    view
    returns (uint64[] memory borrowAPRLong, uint64[] memory borrowAPRShort)
```

Retrieves the current annual percentage rate (APR) for the specified pairs.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| indices | uint256[] | The array of pair indices. |

**Returns**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| borrowAPRLong | uint64[] | The current APR for long positions of each pair. |
| borrowAPRShort | uint64[] | The current APR for short positions of each pair. |

## getGroupsCurrentAPR

```solidity
function getGroupsCurrentAPR(uint16[] calldata indices)
    external
    view
    returns (uint64[] memory borrowAPRLong, uint64[] memory borrowAPRShort)
```

Retrieves the current annual percentage rate (APR) for the specified groups.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| indices | uint16[] | The array of group indices. |

**Returns**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| borrowAPRLong | uint64[] | The current APR for long positions of each group. |
| borrowAPRShort | uint64[] | The current APR for short positions of each group. |

## getTradesLiquidationPrices

```solidity
function getTradesLiquidationPrices(uint256[] calldata tradeIndices)
    external
    view
    returns (int64[] memory liqPrices, uint256[] memory borrowFees)
```

Retrieves the liquidation prices and borrowing fees for the specified trade indices.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| tradeIndices | uint256[] | The array of trade indices. |

**Returns**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| liqPrices | int64[] | The liquidation prices for each trade. |
| borrowFees | uint256[] | The borrowing fees for each trade. |

## getPairsOpenInterest

```solidity
function getPairsOpenInterest(uint256[] calldata indices)
    external
    view
    returns (uint256[] memory longOIs, uint256[] memory shortOIs, uint256[] memory maxOIs)
```

Retrieves the current open interest for the specified pairs.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| indices | uint256[] | The array of pair indices. |

**Returns**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| longOIs | uint256[] | The open interest for long positions of each pair. |
| shortOIs | uint256[] | The open interest for short positions of each pair. |
| maxOIs | uint256[] | The maximum open interest allowed for each pair. |

## getAllPairs

```solidity
function getAllPairs() external view returns (Pair[] memory p)
```

Retrieves all pairs.

**Returns**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| p | Pair[] | The array of all pairs. |

## getTradeInitialAccFees

```solidity
function getTradeInitialAccFees(uint256 tradeIndex)
    external
    view
    returns (InitialAccFees memory feesAccrued, IFeesMarkets.TradeInitialAccFees memory otherFees)
```

Retrieves the initial accumulated fees for a specific trade.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| tradeIndex | uint256 | The index of the trade. |

**Returns**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| feesAccrued | InitialAccFees | The initial accumulated fees from FeesAccrued. |
| otherFees | IFeesMarkets.TradeInitialAccFees | The initial accumulated fees from FeesMarkets. |

## Structs

```solidity
struct PairGroup {
    uint16 groupIndex;
    uint48 block;
    uint64 initialAccFeeLong; // 1e10 (%)
    uint64 initialAccFeeShort; // 1e10 (%)
    uint64 prevGroupAccFeeLong; // 1e10 (%)
    uint64 prevGroupAccFeeShort; // 1e10 (%)
    uint64 pairAccFeeLong; // 1e10 (%)
    uint64 pairAccFeeShort; // 1e10 (%)
    uint64 _placeholder; // might be useful later
}

struct Pair {
    PairGroup[] groups;
    uint32 feePerBlock; // 1e10 (%)
    uint64 accFeeLong; // 1e10 (%)
    uint64 accFeeShort; // 1e10 (%)
    uint48 accLastUpdatedBlock;
    uint48 _placeholder; // might be useful later
    uint256 lastAccBlockWeightedMarketCap; // 1e40
}

struct Group {
    uint112 oiLong; // 1e10
    uint112 oiShort; // 1e10
    uint32 feePerBlock; // 1e10 (%)
    uint64 accFeeLong; // 1e10 (%)
    uint64 accFeeShort; // 1e10 (%)
    uint48 accLastUpdatedBlock;
    uint80 maxOi; // 1e10
    uint256 lastAccBlockWeightedMarketCap; // 1e40
}

struct InitialAccFees {
    bytes32 tradeKey; // tradeKeyFor: (address trader, uint256 pairIndex, uint256 index)
    uint64 accPairFee; // 1e10 (%)
    uint64 accGroupFee; // 1e10 (%)
    uint48 block;
    uint80 _placeholder; // might be useful later
}

struct PairParams {
    uint16 groupIndex;
    uint32 feePerBlock; // 1e10 (%)
}

struct GroupParams {
    uint32 feePerBlock; // 1e10 (%)
    uint80 maxOi; // 1e10
}

struct BorrowingFeeInput {
    address trader;
    uint256 pairIndex;
    uint256 index;
    bool long;
    uint256 collateral; // 1e18 (HONEY)
    uint256 leverage;
}

struct LiqPriceInput {
    address trader;
    uint256 pairIndex;
    uint256 index;
    uint256 openPrice; // 1e10
    bool long;
    uint256 collateral; // 1e18 (HONEY)
    uint256 leverage;
}
```
