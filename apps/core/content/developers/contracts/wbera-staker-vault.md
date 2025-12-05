---
head:
  - - meta
    - property: og:title
      content: WBERAStakerVault Contract Reference
  - - meta
    - name: description
      content: Developer reference for the WBERAStakerVault contract in PoL
  - - meta
    - property: og:description
      content: Developer reference for the WBERAStakerVault contract in PoL
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# WBERAStakerVault

> <small><a target="_blank" :href="config.websites.berascan.url + 'address/' + config.contracts.pol.wberaStakerVault.address.berachainMainnet">{{config.contracts.pol.wberaStakerVault.address.berachainMainnet}}</a><span v-if="config.contracts.pol.wberaStakerVault.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.pol.wberaStakerVault.abi">ABI JSON</a></span></small>

[Git Source](https://github.com/berachain/contracts/blob/main/src/pol/WBERAStakerVault.sol)

The WBERAStakerVault is an ERC4626-compliant vault that allows users to stake $BERA and earn yield from redirected PoL incentives. This contract is the core component of the PoL BERA Yield Module.

Key features:

- ERC4626 Compliance: Standard vault interface for easy integration
- Native BERA Support: Accepts both native BERA and WBERA deposits
- 7-Day Unbonding: Withdrawal requests require 7-day cooldown period
- Auto-Compounding: Rewards automatically compound to staker positions
- Inflation Attack Protection: Initial deposit mechanism prevents attacks
- Emergency Controls: Pausable with role-based access control

## Constants

### MANAGER_ROLE

The MANAGER role.

```solidity
bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");
```

### PAUSER_ROLE

The PAUSER role.

```solidity
bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
```

### WBERA

The WBERA token address, serves as underlying asset.

```solidity
address public constant WBERA = 0x6969696969696969696969696969696969696969;
```

### WITHDRAWAL_COOLDOWN

The withdrawal cooldown period.

```solidity
uint256 public constant WITHDRAWAL_COOLDOWN = 7 days;
```

## State Variables

### reservedAssets

Amount of assets reserved for pending withdrawals.

```solidity
uint256 public reservedAssets;
```

### withdrawalRequests

Mapping of user to withdrawal request.

```solidity
mapping(address => WithdrawalRequest) public withdrawalRequests;
```

## Structs

### WithdrawalRequest

Struct to hold withdrawal request data.

```solidity
struct WithdrawalRequest {
    uint256 assets;
    uint256 shares;
    uint256 requestTime;
    address owner;
    address receiver;
}
```

**Properties**

| Name          | Type      | Description                                |
| ------------- | --------- | ------------------------------------------ |
| `assets`      | `uint256` | The amount of assets to withdraw           |
| `shares`      | `uint256` | The amount of shares to burn               |
| `requestTime` | `uint256` | The timestamp when the request was created |
| `owner`       | `address` | The owner of the withdrawal request        |
| `receiver`    | `address` | The receiver of the withdrawn assets       |

## View Functions

### allowance

Returns the remaining number of tokens that `spender` will be allowed to spend on behalf of `owner` through {transferFrom}.

```solidity
function allowance(address owner, address spender) external view returns (uint256)
```

### balanceOf

Returns the amount of tokens owned by `account`.

```solidity
function balanceOf(address account) external view returns (uint256)
```

### convertToAssets

Convert a given amount of shares to assets.

```solidity
function convertToAssets(uint256 shares) external view returns (uint256 assets)
```

### convertToShares

Convert a given amount of assets to shares.

```solidity
function convertToShares(uint256 assets) external view returns (uint256 shares)
```

### decimals

Returns the number of decimals used to get its user representation.

```solidity
function decimals() external view returns (uint8)
```

### maxDeposit

Returns the maximum amount of assets that can be deposited.

```solidity
function maxDeposit(address) external view returns (uint256)
```

### maxMint

Returns the maximum amount of shares that can be minted.

```solidity
function maxMint(address) external view returns (uint256)
```

### maxRedeem

Returns the maximum amount of shares that can be redeemed.

```solidity
function maxRedeem(address owner) external view returns (uint256)
```

### maxWithdraw

Returns the maximum amount of assets that can be withdrawn.

```solidity
function maxWithdraw(address owner) external view returns (uint256)
```

### name

Returns the name of the token.

```solidity
function name() external view returns (string memory)
```

### previewDeposit

Calculates how much $WBERA would be received for a given number of shares.

```solidity
function previewDeposit(uint256 assets) external view returns (uint256 shares)
```

### previewMint

Calculates how many assets would be required to mint a given number of shares.

```solidity
function previewMint(uint256 shares) external view returns (uint256 assets)
```

### previewRedeem

Calculates how much $WBERA would be received for a given number of shares.

```solidity
function previewRedeem(uint256 shares) external view returns (uint256 assets)
```

**Note:** This function is essential for calculating the vault's APR by measuring share value changes over time.

### previewWithdraw

Calculates how many shares would be burned for a given amount of assets.

```solidity
function previewWithdraw(uint256 assets) external view returns (uint256 shares)
```

### symbol

Returns the symbol of the token.

```solidity
function symbol() external view returns (string memory)
```

### totalAssets

Returns the total WBERA in the vault, excluding reserved assets for pending withdrawals.

```solidity
function totalAssets() public view returns (uint256)
```

### totalSupply

Returns the total supply of shares.

```solidity
function totalSupply() external view returns (uint256)
```

## Functions

### approve

Sets `amount` as the allowance of `spender` over the caller's tokens.

```solidity
function approve(address spender, uint256 amount) external returns (bool)
```

### completeWithdrawal

Completes a withdrawal request after the 7-day cooldown period.

```solidity
function completeWithdrawal(bool isNative) external nonReentrant whenNotPaused
```

### deposit

Deposits WBERA into the vault (standard ERC4626 deposit).

```solidity
function deposit(uint256 assets, address receiver) public whenNotPaused returns (uint256 shares)
```

### depositNative

Deposits native BERA into the vault. The function automatically wraps BERA to WBERA.

```solidity
function depositNative(uint256 assets, address receiver) public payable whenNotPaused returns (uint256 shares)
```

### mint

Mints shares for a given amount of assets.

```solidity
function mint(uint256 shares, address receiver) public whenNotPaused returns (uint256 assets)
```

### pause

Pauses the vault operations.

```solidity
function pause() external onlyRole(PAUSER_ROLE)
```

### recoverERC20

Recovers ERC20 tokens accidentally sent to the vault (except WBERA).

```solidity
function recoverERC20(address tokenAddress, uint256 tokenAmount) external onlyRole(DEFAULT_ADMIN_ROLE)
```

### redeem

Redeems shares for assets.

```solidity
function redeem(uint256 shares, address receiver, address owner) external whenNotPaused returns (uint256 assets)
```

### transfer

Transfers `amount` tokens from the caller to `to`.

```solidity
function transfer(address to, uint256 amount) external returns (bool)
```

### transferFrom

Transfers `amount` tokens from `from` to `to` using the allowance mechanism.

```solidity
function transferFrom(address from, address to, uint256 amount) external returns (bool)
```

### unpause

Unpauses the vault operations.

```solidity
function unpause() external onlyRole(MANAGER_ROLE)
```

### withdraw

Initiates a withdrawal request. The withdrawal will be available after 7 days.

```solidity
function withdraw(uint256 assets, address receiver, address owner) external whenNotPaused returns (uint256 shares)
```

## Events

### Approval

Emitted when the allowance of a `spender` for an `owner` is set by a call to {approve}.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value)
```

### Deposit

Emitted when assets are deposited into the vault.

```solidity
event Deposit(address indexed caller, address indexed owner, uint256 assets, uint256 shares)
```

### ERC20Recovered

Emitted when ERC20 tokens are recovered from the vault.

```solidity
event ERC20Recovered(address indexed token, uint256 amount)
```

### Transfer

Emitted when `value` tokens are moved from one account (`from`) to another (`to`).

```solidity
event Transfer(address indexed from, address indexed to, uint256 value)
```

### WithdrawalCompleted

Emitted when a withdrawal is completed.

```solidity
event WithdrawalCompleted(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

### WithdrawalRequested

Emitted when a withdrawal is requested.

```solidity
event WithdrawalRequested(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

## Errors

### ZeroAddress

```solidity
error ZeroAddress();
```

Thrown when governance address cannot be zero.

### InsufficientNativeValue

```solidity
error InsufficientNativeValue();
```

Thrown when `msg.value` must equal assets parameter.

### WithdrawalNotRequested

```solidity
error WithdrawalNotRequested();
```

Thrown when no withdrawal request found for caller.

### WithdrawalNotReady

```solidity
error WithdrawalNotReady();
```

Thrown when 7-day cooldown period not completed.

### WithdrawalAlreadyRequested

```solidity
error WithdrawalAlreadyRequested();
```

Thrown when only one withdrawal request allowed at a time.

### CannotRecoverStakingToken

```solidity
error CannotRecoverStakingToken();
```

Thrown when cannot recover WBERA token.
