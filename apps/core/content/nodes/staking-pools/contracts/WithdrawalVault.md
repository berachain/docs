---
head:
  - - meta
    - property: og:title
      content: WithdrawalVault Contract Reference
  - - meta
    - name: description
      content: Developer reference for the WithdrawalVault contract
  - - meta
    - property: og:description
      content: Developer reference for the WithdrawalVault contract
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# WithdrawalVault

> <small><span v-if="config.contracts.stakingPools.withdrawalVault.address?.berachainMainnet">Mainnet: <a target="_blank" :href="config.websites.berascan.url + 'address/' + config.contracts.stakingPools.withdrawalVault.address.berachainMainnet">{{config.contracts.stakingPools.withdrawalVault.address.berachainMainnet}}</a></span><span v-else>Mainnet: Not yet deployed</span><span v-if="config.contracts.stakingPools.withdrawalVault.address?.berachainBepolia"><br>Bepolia: <a target="_blank" :href="config.websites.berascanBepolia.url + 'address/' + config.contracts.stakingPools.withdrawalVault.address.berachainBepolia">{{config.contracts.stakingPools.withdrawalVault.address.berachainBepolia}}</a></span><span v-if="config.contracts.stakingPools.withdrawalVault.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.stakingPools.withdrawalVault.abi">ABI JSON</a></span></small>

The WithdrawalVault contract manages withdrawal requests for staking pools. It implements ERC721Enumerable to create non-transferable NFTs representing withdrawal requests and handles the finalization process after a cooldown period. The contract also manages full exits from the consensus layer.

**NFT Details:**

- **Name**: "Berachain Staking Pool Withdrawal Request"
- **Symbol**: "BSPWR"
- **Token ID**: The `requestId` returned from `requestWithdrawal()` or `requestRedeem()` is the NFT token ID
- **Non-Transferable**: NFTs cannot be transferred to other addresses
- **Enumerable**: Supports standard ERC721Enumerable functions for querying owned NFTs

## State Variables

### withdrawalRequests

```solidity
mapping(uint256 => WithdrawalRequest) public withdrawalRequests;
```

### allocatedWithdrawalsAmount

```solidity
mapping(bytes => uint256) public allocatedWithdrawalsAmount;
```

## Structs

### WithdrawalRequest

Represents a withdrawal request.

```solidity
struct WithdrawalRequest {
    bytes pubkey;
    uint256 assetsRequested;
    uint256 sharesBurnt;
    address user;
    uint256 requestBlock;
}
```

**Properties**

| Name              | Type      | Description                                             |
| ----------------- | --------- | ------------------------------------------------------- |
| `pubkey`          | `bytes`   | The validator's public key                              |
| `assetsRequested` | `uint256` | The amount of BERA required for the withdrawal.         |
| `sharesBurnt`     | `uint256` | The amount of shares burned for the withdrawal.         |
| `user`            | `address` | The address of the staker who requested the withdrawal. |
| `requestBlock`    | `uint256` | The block number when the withdrawal request was made.  |

## View Functions

### getWithdrawalRequest

Gets a withdrawal request by ID. The request ID is the same as the NFT token ID.

```solidity
function getWithdrawalRequest(uint256 requestId) external view returns (WithdrawalRequest memory);
```

**Parameters**

| Name        | Type      | Description                                                                     |
| ----------- | --------- | ------------------------------------------------------------------------------- |
| `requestId` | `uint256` | The ID of the withdrawal request (this is also the ERC721 token ID for the NFT) |

**Returns**

| Name     | Type                | Description                   |
| -------- | ------------------- | ----------------------------- |
| `<none>` | `WithdrawalRequest` | The withdrawal request struct |

**Note**: Since WithdrawalVault implements ERC721Enumerable, you can also use standard ERC721 functions:

- `ownerOf(uint256 tokenId)` - Returns the owner of a withdrawal request NFT (the `requestId` is the `tokenId`)
- `balanceOf(address owner)` - Returns the number of withdrawal request NFTs owned by an address
- `tokenOfOwnerByIndex(address owner, uint256 index)` - Returns a token ID owned by an address at a given index
- `totalSupply()` - Returns the total number of withdrawal request NFTs minted

## Functions

### requestRedeem

Requests a redemption of shares from the staking pool. Creates an NFT representing the redemption that will be necessary to finalize the request.

```solidity
function requestRedeem(
    bytes memory pubkey,
    uint256 shares,
    uint256 maxFeeToPay
)
    external
    payable
    nonReentrant
    whenNotPaused;
```

**Parameters**

| Name          | Type      | Description                                                                 |
| ------------- | --------- | --------------------------------------------------------------------------- |
| `pubkey`      | `bytes`   | The validator's public key.                                                 |
| `shares`      | `uint256` | The amount of shares to redeem.                                             |
| `maxFeeToPay` | `uint256` | The maximum fee the staker is willing to pay for the redemption (EIP-7002). |

**Requirements**

- Shares must be greater than 0
- The number of shares will be rounded down so that the corresponding asset value is a multiple of GWei

### requestWithdrawal

Requests a withdrawal of assets from the staking pool. Creates an NFT representing the withdrawal that will be necessary to finalize the request.

```solidity
function requestWithdrawal(
    bytes memory pubkey,
    uint64 assetsInGWei,
    uint256 maxFeeToPay
)
    external
    payable
    nonReentrant
    whenNotPaused;
```

**Parameters**

| Name           | Type      | Description                                                                 |
| -------------- | --------- | --------------------------------------------------------------------------- |
| `pubkey`       | `bytes`   | The validator's public key.                                                 |
| `assetsInGWei` | `uint64`  | The amount of BERA to withdraw in GWei.                                     |
| `maxFeeToPay`  | `uint256` | The maximum fee the staker is willing to pay for the withdrawal (EIP-7002). |

**Requirements**

- Assets must be greater than 0

### finalizeWithdrawalRequest

Finalizes a withdrawal request.

```solidity
function finalizeWithdrawalRequest(uint256 requestId) external nonReentrant whenNotPaused;
```

**Parameters**

| Name        | Type      | Description                                   |
| ----------- | --------- | --------------------------------------------- |
| `requestId` | `uint256` | The ID of the withdrawal request to finalize. |

**Requirements**

- Request must not already be finalized
- Delay period must have passed
- Withdrawal vault must have enough funds

### finalizeWithdrawalRequests

Finalizes multiple withdrawal requests.

```solidity
function finalizeWithdrawalRequests(uint256[] calldata requestIds) external nonReentrant whenNotPaused;
```

**Parameters**

| Name         | Type        | Description                                  |
| ------------ | ----------- | -------------------------------------------- |
| `requestIds` | `uint256[]` | Array of withdrawal request IDs to finalize. |

**Requirements**

- All requests must not already be finalized
- Delay period must have passed for all requests
- Withdrawal vault must have enough funds for all requests

### notifyFullExitFromCL

Notifies the withdrawal vault that a full exit was triggered from the CL.

```solidity
function notifyFullExitFromCL(bytes memory pubkey) external;
```

**Parameters**

| Name     | Type    | Description                 |
| -------- | ------- | --------------------------- |
| `pubkey` | `bytes` | The validator's public key. |

## Events

### WithdrawalRequested

```solidity
event WithdrawalRequested(
    address indexed user, uint256 amountOfAsset, uint256 amountOfShares, uint256 requestId, bool isFullExitWithdraw
);
```

Emitted when a staker creates a withdrawal request that will be processed through the consensus layer after a cooldown period. The request creates an NFT that must be used to finalize the withdrawal after the delay.

**Parameters**

| Name                 | Type      | Description                                             |
| -------------------- | --------- | ------------------------------------------------------- |
| `user`               | `address` | The address of the staker who requested the withdrawal. |
| `amountOfAsset`      | `uint256` | The amount of asset requested for withdrawal.           |
| `amountOfShares`     | `uint256` | The amount of shares burned for the withdrawal.         |
| `requestId`          | `uint256` | The ID of the withdrawal request.                       |
| `isFullExitWithdraw` | `bool`    | Indicates if this is a full exit withdrawal.            |

### WithdrawalRequestFinalized

Emitted when a withdrawal request is finalized.

```solidity
event WithdrawalRequestFinalized(uint256 requestId);
```

**Parameters**

| Name        | Type      | Description                                          |
| ----------- | --------- | ---------------------------------------------------- |
| `requestId` | `uint256` | The ID of the withdrawal request that was finalized. |

## Errors

### InvalidSender

```solidity
error InvalidSender();
```

### OverpaidFee

```solidity
error OverpaidFee();
```

### InsufficientFee

```solidity
error InsufficientFee();
```

### InvalidAmount

```solidity
error InvalidAmount();
```

### InvalidRequest

```solidity
error InvalidRequest();
```

### RequestNotReady

```solidity
error RequestNotReady();
```

### NotEnoughFunds

```solidity
error NotEnoughFunds();
```

### NonTransferable

```solidity
error NonTransferable();
```
