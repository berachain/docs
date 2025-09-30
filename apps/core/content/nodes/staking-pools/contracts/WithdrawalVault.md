# WithdrawalVault

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.pol.withdrawalVault['mainnet-address']">{{config.contracts.pol.withdrawalVault['mainnet-address']}}</a><span v-if="config.contracts.pol.withdrawalVault.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.pol.withdrawalVault.abi">ABI JSON</a></span></small>

[Git Source](https://github.com/berachain/contracts/blob/main/src/WithdrawalVault.sol)

**Inherits:**
[IWithdrawalVault](/src/interfaces/IWithdrawalVault.sol/interface.IWithdrawalVault.md), AccessControlUpgradeable, UUPSUpgradeable, [ELWithdrawHelper](/src/helpers/ELWithdrawHelper.sol/abstract.ELWithdrawHelper.md), ERC721EnumerableUpgradeable, ReentrancyGuardUpgradeable, PausableUpgradeable

## Constants

### WITHDRAWAL_REQUEST_FINALIZATION_BLOCK_DELAY

192 blocks per epoch \* 256 epochs

```solidity
uint256 public constant WITHDRAWAL_REQUEST_FINALIZATION_BLOCK_DELAY = 49_152;
```

## State Variables

### \_factory

```solidity
ICoreContractsStorage internal _factory;
```

### \_nextRequestId

```solidity
uint256 internal _nextRequestId;
```

### withdrawalRequests

```solidity
mapping(uint256 => WithdrawalRequest) public withdrawalRequests;
```

### allocatedWithdrawalsAmount

```solidity
mapping(bytes => uint256) public allocatedWithdrawalsAmount;
```

### \_isFullyExited

```solidity
mapping(bytes => bool) internal _isFullyExited;
```

## Functions

### requestRedeem

Requests a redemption of shares from the staking pool.

Creates an NFT representing the redemption that will be necessary to finalize the request.

**Note:**
throws: InvalidAmount if shares is 0.

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

| Name          | Type      | Description                                                               |
| ------------- | --------- | ------------------------------------------------------------------------- |
| `pubkey`      | `bytes`   | The validator's public key.                                               |
| `shares`      | `uint256` | The amount of shares to redeem.                                           |
| `maxFeeToPay` | `uint256` | The maximum fee the user is willing to pay for the redemption (EIP-7002). |

### requestWithdrawal

Requests a withdrawal of assets from the staking pool.

Creates an NFT representing the withdrawal that will be necessary to finalize the request.

**Note:**
throws: InvalidAmount if assetsInGWei is 0.

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

| Name           | Type      | Description                                                               |
| -------------- | --------- | ------------------------------------------------------------------------- |
| `pubkey`       | `bytes`   | The validator's public key.                                               |
| `assetsInGWei` | `uint64`  | The amount of BERA to withdraw in GWei.                                   |
| `maxFeeToPay`  | `uint256` | The maximum fee the user is willing to pay for the withdrawal (EIP-7002). |

### finalizeWithdrawalRequest

Finalizes a withdrawal request.

**Note:**
throws: RequestAlreadyFinalized if the request has already been finalized.

```solidity
function finalizeWithdrawalRequest(uint256 requestId) external nonReentrant whenNotPaused;
```

**Parameters**

| Name        | Type      | Description                                   |
| ----------- | --------- | --------------------------------------------- |
| `requestId` | `uint256` | The ID of the withdrawal request to finalize. |

### finalizeWithdrawalRequests

Finalizes multiple withdrawal requests.

**Note:**
throws: RequestAlreadyFinalized if one of the requests has already been finalized.

```solidity
function finalizeWithdrawalRequests(uint256[] calldata requestIds) external nonReentrant whenNotPaused;
```

**Parameters**

| Name         | Type        | Description                                  |
| ------------ | ----------- | -------------------------------------------- |
| `requestIds` | `uint256[]` | Array of withdrawal request IDs to finalize. |

### notifyFullExitFromCL

Notifies the withdrawal vault that a full exit was triggered from the CL.

```solidity
function notifyFullExitFromCL(bytes memory pubkey) external;
```

**Parameters**

| Name     | Type    | Description                 |
| -------- | ------- | --------------------------- |
| `pubkey` | `bytes` | The validator's public key. |

### getWithdrawalRequest

Gets a withdrawal request by ID

```solidity
function getWithdrawalRequest(uint256 requestId) external view returns (WithdrawalRequest memory);
```

**Parameters**

| Name        | Type      | Description                      |
| ----------- | --------- | -------------------------------- |
| `requestId` | `uint256` | The ID of the withdrawal request |

**Returns**

| Name     | Type                | Description                   |
| -------- | ------------------- | ----------------------------- |
| `<none>` | `WithdrawalRequest` | The withdrawal request struct |
