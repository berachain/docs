<script setup>
  import config from '@berachain/config/constants.json';
</script>

# WithdrawalVault

The WithdrawalVault is a vault for temporary storage of withdrawals with integrated withdrawal request NFTs. It handles withdrawal requests and processing, including NFT minting for requests.

## State Variables

### WITHDRAWAL_REQUEST_FINALIZATION_BLOCK_DELAY

```solidity
uint256 public constant WITHDRAWAL_REQUEST_FINALIZATION_BLOCK_DELAY = 49_152;
```

The number of blocks to wait before a withdrawal request can be finalized (192 blocks per epoch \* 256 epochs).

## Functions

### requestWithdrawal

```solidity
function requestWithdrawal(bytes memory pubkey, uint64 assetsInGWei, uint256 maxFeeToPay) external payable;
```

Requests a withdrawal of assets from the staking pool.

**Parameters:**

- `pubkey`: The validator's public key
- `assetsInGWei`: The amount of BERA to withdraw in GWei
- `maxFeeToPay`: The maximum fee the user is willing to pay for the withdrawal

### requestRedeem

```solidity
function requestRedeem(bytes memory pubkey, uint256 shares, uint256 maxFeeToPay) external payable;
```

Requests a redemption of shares from the staking pool.

**Parameters:**

- `pubkey`: The validator's public key
- `shares`: The amount of shares to redeem
- `maxFeeToPay`: The maximum fee the user is willing to pay for the redemption

### finalizeWithdrawalRequest

```solidity
function finalizeWithdrawalRequest(uint256 requestId) external;
```

Finalizes a single withdrawal request.

**Parameters:**

- `requestId`: The ID of the withdrawal request to finalize

### finalizeWithdrawalRequests

```solidity
function finalizeWithdrawalRequests(uint256[] calldata requestIds) external;
```

Finalizes multiple withdrawal requests.

**Parameters:**

- `requestIds`: Array of withdrawal request IDs to finalize

### notifyFullExitFromCL

```solidity
function notifyFullExitFromCL(bytes memory pubkey) external;
```

Notifies the withdrawal vault that a full exit was triggered from the consensus layer.

**Parameters:**

- `pubkey`: The validator's public key

### getWithdrawalRequest

```solidity
function getWithdrawalRequest(uint256 requestId) external view returns (WithdrawalRequest memory);
```

Gets a withdrawal request by ID.

**Parameters:**

- `requestId`: The ID of the withdrawal request

**Returns:**

- `WithdrawalRequest`: The withdrawal request struct

## View Functions

### tokenOfOwnerByIndex

```solidity
function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256);
```

Returns the token ID owned by the owner at the given index.

### balanceOf

```solidity
function balanceOf(address owner) external view returns (uint256);
```

Returns the number of tokens owned by the owner.

## Structs

### WithdrawalRequest

```solidity
struct WithdrawalRequest {
    bytes pubkey;
    uint256 assetsRequested;
    uint256 sharesBurnt;
    address user;
    uint256 requestBlock;
    bool finalized;
}
```

Represents a withdrawal request.

**Fields:**

- `pubkey`: The validator's public key
- `assetsRequested`: The amount of BERA required for the withdrawal
- `sharesBurnt`: The amount of shares burned for the withdrawal
- `user`: The address of the user who requested the withdrawal
- `requestBlock`: The block number when the withdrawal request was made
- `finalized`: Whether the withdrawal request has been finalized

## Events

### WithdrawalRequested

```solidity
event WithdrawalRequested(
    address indexed user,
    uint256 amountOfAsset,
    uint256 amountOfShares,
    uint256 requestId,
    bool isFullExitWithdraw
);
```

Emitted when a withdrawal request is created.

### WithdrawalRequestFinalized

```solidity
event WithdrawalRequestFinalized(uint256 requestId);
```

Emitted when a withdrawal request is finalized.

### ERC20Recovered

```solidity
event ERC20Recovered(address token, address to, uint256 amount);
```

Emitted when ERC20 tokens are recovered.

## Errors

### InvalidSender

```solidity
error InvalidSender();
```

Thrown when the sender is not authorized.

### OverpaidFee

```solidity
error OverpaidFee();
```

Thrown when the fee paid exceeds the maximum allowed.

### InsufficientFee

```solidity
error InsufficientFee();
```

Thrown when the fee paid is insufficient.

### InvalidAmount

```solidity
error InvalidAmount();
```

Thrown when an invalid amount is provided.

### RequestAlreadyFinalized

```solidity
error RequestAlreadyFinalized();
```

Thrown when attempting to finalize an already finalized request.

### RequestNotReady

```solidity
error RequestNotReady();
```

Thrown when attempting to finalize a request that is not ready.

### NotEnoughFunds

```solidity
error NotEnoughFunds();
```

Thrown when there are not enough funds to complete the withdrawal.

### NonTransferable

```solidity
error NonTransferable();
```

Thrown when attempting to transfer a non-transferable token.
