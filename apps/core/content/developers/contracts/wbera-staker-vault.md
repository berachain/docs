---
head:
  - - meta
    - property: og:title
      content: WBERAStakerVault Contract Reference
  - - meta
    - name: description
      content: Developer reference for the WBERAStakerVault contract in PoL V2
  - - meta
    - property: og:description
      content: Developer reference for the WBERAStakerVault contract in PoL V2
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# WBERAStakerVault Contract Reference

The `WBERAStakerVault` is an ERC4626-compliant vault that allows users to stake `$BERA` and earn yield from redirected PoL incentives. This contract is the core component of the PoL V2 BERA Yield Module.

## Contract Overview

**Contract Name**: WBERAStakerVault  
**Standard**: ERC4626 (Vault Standard)  
**Token**: sWBERA (Staked WBERA)  
**Asset**: WBERA (Wrapped BERA)  
**Withdrawal Period**: 7 days

## Key Features

- **ERC4626 Compliance**: Standard vault interface for easy integration
- **Native BERA Support**: Accepts both native BERA and WBERA deposits
- **7-Day Unbonding**: Withdrawal requests require 7-day cooldown period
- **Auto-Compounding**: Rewards automatically compound to staker positions
- **Inflation Attack Protection**: Initial deposit mechanism prevents attacks
- **Emergency Controls**: Pausable with role-based access control

## Contract Addresses

| Network | Contract Address                                          | Status   |
| ------- | --------------------------------------------------------- | -------- |
| Mainnet | `{{ config.mainnet.contracts.wberaStakerVault.address }}` | Deployed |
| Testnet | `{{ config.bepolia.contracts.wberaStakerVault.address }}` | Deployed |

## Core Functions

### Initialization

```solidity
function initialize(address governance) external initializer
```

Initializes the vault with the governance address. Can only be called once.

**Parameters:**

- `governance`: Address that will have DEFAULT_ADMIN_ROLE

### Deposits

#### Native BERA Deposit

```solidity
function depositNative(uint256 assets, address receiver)
    external
    payable
    whenNotPaused
    returns (uint256 shares)
```

Deposits native BERA into the vault. The function automatically wraps BERA to WBERA.

**Parameters:**

- `assets`: Amount of BERA to deposit (must equal `msg.value`)
- `receiver`: Address to receive the sWBERA shares

**Returns:**

- `shares`: Number of sWBERA shares minted

#### WBERA Deposit

```solidity
function deposit(uint256 assets, address receiver)
    external
    whenNotPaused
    returns (uint256 shares)
```

Deposits WBERA into the vault (standard ERC4626 deposit).

**Parameters:**

- `assets`: Amount of WBERA to deposit
- `receiver`: Address to receive the sWBERA shares

**Returns:**

- `shares`: Number of sWBERA shares minted

### Withdrawals

#### Initiate Withdrawal

```solidity
function withdraw(uint256 assets, address receiver, address owner)
    external
    whenNotPaused
    returns (uint256 shares)
```

Initiates a withdrawal request. The withdrawal will be available after 7 days.

**Parameters:**

- `assets`: Amount of WBERA to withdraw
- `receiver`: Address to receive the withdrawn assets
- `owner`: Address that owns the shares

**Returns:**

- `shares`: Number of sWBERA shares burned

#### Complete Withdrawal

```solidity
function completeWithdrawal(bool isNative)
    external
    nonReentrant
    whenNotPaused
```

Completes a withdrawal request after the 7-day cooldown period.

**Parameters:**

- `isNative`: If true, receive native BERA; if false, receive WBERA

### View Functions

#### Total Assets

```solidity
function totalAssets() public view returns (uint256)
```

Returns the total WBERA in the vault, excluding reserved assets for pending withdrawals.

#### Withdrawal Request

```solidity
function withdrawalRequests(address user)
    external
    view
    returns (
        uint256 assets,
        uint256 shares,
        uint256 requestTime,
        address owner,
        address receiver
    )
```

Returns the withdrawal request details for a user.

**Parameters:**

- `user`: Address to check withdrawal request for

**Returns:**

- `assets`: Amount of assets requested for withdrawal
- `shares`: Number of shares burned for the withdrawal
- `requestTime`: Timestamp when withdrawal was requested
- `owner`: Address that owned the shares
- `receiver`: Address that will receive the assets

#### Reserved Assets

```solidity
function reservedAssets() public view returns (uint256)
```

Returns the total amount of assets reserved for pending withdrawals.

## Admin Functions

### Pause/Unpause

```solidity
function pause() external onlyRole(PAUSER_ROLE)
function unpause() external onlyRole(MANAGER_ROLE)
```

Pauses or unpauses the vault operations.

### Recover ERC20

```solidity
function recoverERC20(address tokenAddress, uint256 tokenAmount)
    external
    onlyRole(DEFAULT_ADMIN_ROLE)
```

Recovers ERC20 tokens accidentally sent to the vault (except WBERA).

**Parameters:**

- `tokenAddress`: Address of the token to recover
- `tokenAmount`: Amount of tokens to recover

### Upgrade Contract

```solidity
function upgradeToAndCall(address newImplementation, bytes memory data)
    external
    onlyRole(DEFAULT_ADMIN_ROLE)
```

Upgrades the vault implementation (UUPS upgradeable).

## Events

### Deposit Events

```solidity
event Deposit(address indexed caller, address indexed owner, uint256 assets, uint256 shares)
```

Emitted when assets are deposited into the vault.

### Withdrawal Events

```solidity
event WithdrawalRequested(
    address indexed caller,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)

event WithdrawalCompleted(
    address indexed caller,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Emitted when withdrawal is requested and completed.

### Admin Events

```solidity
event ERC20Recovered(address indexed token, uint256 amount)
```

Emitted when ERC20 tokens are recovered from the vault.

## Integration Examples

### Basic Deposit and Withdrawal

```javascript
// Deposit native BERA
const depositAmount = ethers.parseEther("10");
await wberaStakerVault.depositNative(depositAmount, userAddress, {
  value: depositAmount
});

// Check shares received
const shares = await wberaStakerVault.balanceOf(userAddress);
console.log("Shares received:", ethers.formatEther(shares));

// Initiate withdrawal
await wberaStakerVault.withdraw(depositAmount, userAddress, userAddress);

// Wait 7 days and complete withdrawal
await time.increase(7 * 24 * 60 * 60); // 7 days
await wberaStakerVault.completeWithdrawal(true); // Receive native BERA
```

### Check Withdrawal Status

```javascript
// Check if user has pending withdrawal
const request = await wberaStakerVault.withdrawalRequests(userAddress);
if (request.assets > 0) {
  const requestTime = request.requestTime;
  const cooldownEnd = requestTime + 7 * 24 * 60 * 60; // 7 days
  const isReady = block.timestamp >= cooldownEnd;

  console.log("Withdrawal ready:", isReady);
  console.log("Assets to withdraw:", ethers.formatEther(request.assets));
}
```

### Monitor Vault State

```javascript
// Get vault statistics
const totalAssets = await wberaStakerVault.totalAssets();
const totalSupply = await wberaStakerVault.totalSupply();
const reservedAssets = await wberaStakerVault.reservedAssets();

console.log("Total assets:", ethers.formatEther(totalAssets));
console.log("Total shares:", ethers.formatEther(totalSupply));
console.log("Reserved assets:", ethers.formatEther(reservedAssets));

// Calculate share price
const sharePrice = totalAssets.mul(ethers.parseEther("1")).div(totalSupply);
console.log("Share price:", ethers.formatEther(sharePrice));
```

## Security Considerations

### Withdrawal Cooldown

- Only one withdrawal request per address at a time
- 7-day unbonding period cannot be bypassed
- No rewards earned during unbonding period

### Access Control

- `DEFAULT_ADMIN_ROLE`: Can upgrade contract and recover tokens
- `MANAGER_ROLE`: Can unpause vault and manage PAUSER_ROLE
- `PAUSER_ROLE`: Can pause vault operations

### Inflation Attack Protection

- Initial deposit mechanism prevents inflation attacks
- Reserved assets tracking ensures accurate accounting
- Careful balance between total assets and available assets

## Error Codes

| Error                        | Description                                   |
| ---------------------------- | --------------------------------------------- |
| `ZeroAddress`                | Governance address cannot be zero             |
| `InsufficientNativeValue`    | `msg.value` must equal assets parameter       |
| `WithdrawalNotRequested`     | No withdrawal request found for caller        |
| `WithdrawalNotReady`         | 7-day cooldown period not completed           |
| `WithdrawalAlreadyRequested` | Only one withdrawal request allowed at a time |
| `CannotRecoverStakingToken`  | Cannot recover WBERA token                    |

## Related Contracts

- [BGTIncentiveFeeCollector](./bgt-incentive-fee-collector.md): Collects and distributes incentive fees
- [RewardVaultFactory](./reward-vault-factory.md): Manages incentive fee rates
- [WBERA](./wbera.md): Wrapped BERA token contract

## Resources

- [BERA Staking Guide](/learn/guides/bera-staking)
- [PoL V2 Migration Guide](/learn/guides/pol-v2-migration)
- [ERC4626 Standard](https://eips.ethereum.org/EIPS/eip-4626)
