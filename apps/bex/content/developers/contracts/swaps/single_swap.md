# Single Swap

A single swap in BEX allows users to exchange one token for another within a single liquidity pool.

## Function Signature

```solidity
function swap(
    SingleSwap memory singleSwap,
    FundManagement memory funds,
    uint256 limit,
    uint256 deadline
) returns (uint256 amountCalculated)
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| singleSwap | SingleSwap | A definition of the swap to be executed |
| funds | FundManagement | A definition of where funds are going to/from |
| limit | uint256 | The minimum amount to receive (for GIVEN_IN swaps) or the maximum amount to send (for GIVEN_OUT swaps) i.e. slippage tolerance |
| deadline | uint256 | The UNIX timestamp by which the swap must be completed |

## Return Value

| Name | Type | Description |
|------|------|-------------|
| amountCalculated | uint256 | The amount of tokens sent (for GIVEN_IN swaps) or received (for GIVEN_OUT swaps) |

## SingleSwap Struct

```solidity
struct SingleSwap {
    bytes32 poolId;
    SwapKind kind;
    IAsset assetIn;
    IAsset assetOut;
    uint256 amount;
    bytes userData;
}
```

| Field | Type | Description |
|-------|------|-------------|
| poolId | bytes32 | The id of the pool to swap with |
| kind | SwapKind | The type of swap to perform (GIVEN_IN or GIVEN_OUT) |
| assetIn | IAsset | The address of the token to swap into the pool |
| assetOut | IAsset | The address of the token to receive in return |
| amount | uint256 | The amount of tokens being sent (for GIVEN_IN) or received (for GIVEN_OUT) |
| userData | bytes | Any additional data required by the pool for the swap |

## FundManagement Struct

```solidity
struct FundManagement {
    address sender;
    bool fromInternalBalance;
    address payable recipient;
    bool toInternalBalance;
}
```

| Field | Type | Description |
|-------|------|-------------|
| sender | address | The address from which tokens will be taken to perform the swap |
| fromInternalBalance | bool | Whether to use tokens stored in the Vault |
| recipient | address payable | The address to which tokens will be sent after the swap |
| toInternalBalance | bool | Whether to store tokens in the recipient's internal balance |