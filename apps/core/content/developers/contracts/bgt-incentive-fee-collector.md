---
head:
  - - meta
    - property: og:title
      content: BGTIncentiveFeeCollector Contract Reference
  - - meta
    - name: description
      content: Developer reference for the BGTIncentiveFeeCollector contract in PoL
  - - meta
    - property: og:description
      content: Developer reference for the BGTIncentiveFeeCollector contract in PoL
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# BGTIncentiveFeeCollector Contract Reference

The `BGTIncentiveFeeCollector` is responsible for collecting incentive fees from PoL protocols and distributing them to BERA stakers. This contract is a key component of the PoL incentive tax mechanism.

## Contract Overview

**Contract Name**: BGTIncentiveFeeCollector  
**Purpose**: Collect and distribute incentive fees to BERA stakers  
**Payout Token**: WBERA  
**Status**: Pausable with role-based access control

## Key Features

- **Fee Collection**: Collects incentive fees from Reward Vaults
- **Token Auction**: Auctions collected tokens for WBERA
- **Payout Distribution**: Distributes WBERA to WBERAStakerVault
- **Configurable Payouts**: Adjustable payout amounts via governance
- **Emergency Controls**: Pausable operations with role-based access

## Contract Addresses

| Network | Contract Address                                                  | Status   |
| ------- | ----------------------------------------------------------------- | -------- |
| Mainnet | `{{ config.mainnet.contracts.bgtIncentiveFeeCollector.address }}` | Deployed |
| Testnet | `{{ config.bepolia.contracts.bgtIncentiveFeeCollector.address }}` | Deployed |

## Core Functions

### Initialization

```solidity
function initialize(
    address governance,
    uint256 _payoutAmount,
    address _wberaStakerVault
) public initializer
```

Initializes the contract with governance, payout amount, and vault address.

**Parameters:**

- `governance`: Address with DEFAULT_ADMIN_ROLE
- `_payoutAmount`: Amount of WBERA required to claim fees
- `_wberaStakerVault`: Address of the WBERAStakerVault contract

### Fee Claiming

```solidity
function claimFees(
    address _recipient,
    address[] calldata _feeTokens
) external whenNotPaused
```

Claims collected incentive fees. The caller must transfer the payout amount of WBERA to the WBERAStakerVault.

**Parameters:**

- `_recipient`: Address to receive the auctioned tokens
- `_feeTokens`: Array of token addresses to claim

**Requirements:**

- Caller must transfer `payoutAmount` WBERA to WBERAStakerVault
- Contract must have collected fees for the specified tokens

### Payout Amount Management

```solidity
function queuePayoutAmountChange(uint256 _newPayoutAmount)
    external
    onlyRole(DEFAULT_ADMIN_ROLE)
```

Queues a change to the payout amount. The change takes effect on the next fee claim.

**Parameters:**

- `_newPayoutAmount`: New payout amount in WBERA

## View Functions

### Payout Amount

```solidity
function payoutAmount() external view returns (uint256)
```

Returns the current payout amount required to claim fees.

### Queued Payout Amount

```solidity
function queuedPayoutAmount() external view returns (uint256)
```

Returns the queued payout amount that will take effect on the next fee claim.

### WBERA Staker Vault

```solidity
function wberaStakerVault() external view returns (address)
```

Returns the address of the WBERAStakerVault contract.

## Admin Functions

### Pause/Unpause

```solidity
function pause() external onlyRole(PAUSER_ROLE)
function unpause() external onlyRole(MANAGER_ROLE)
```

Pauses or unpauses fee claiming operations.

### Upgrade Contract

```solidity
function upgradeToAndCall(address newImplementation, bytes memory data)
    external
    onlyRole(DEFAULT_ADMIN_ROLE)
```

Upgrades the contract implementation (UUPS upgradeable).

## Events

### Payout Amount Events

```solidity
event PayoutAmountSet(uint256 oldAmount, uint256 newAmount)
event QueuedPayoutAmount(uint256 newAmount, uint256 currentAmount)
```

Emitted when payout amounts are set or queued.

### Fee Claiming Events

```solidity
event IncentiveFeeTokenClaimed(
    address indexed caller,
    address indexed recipient,
    address indexed token,
    uint256 amount
)

event IncentiveFeesClaimed(
    address indexed caller,
    address indexed recipient
)
```

Emitted when fees are claimed and tokens are transferred.

## Integration Examples

### Claim Incentive Fees

```javascript
// Prepare fee tokens to claim
const feeTokens = [
  "0x...", // USDC
  "0x...", // USDT
  "0x..." // DAI
];

// Get payout amount
const payoutAmount = await bgtIncentiveFeeCollector.payoutAmount();
console.log("Payout amount:", ethers.formatEther(payoutAmount));

// Approve WBERA transfer to WBERAStakerVault
const wberaStakerVault = await bgtIncentiveFeeCollector.wberaStakerVault();
await wbera.approve(wberaStakerVault, payoutAmount);

// Claim fees
await bgtIncentiveFeeCollector.claimFees(recipientAddress, feeTokens);

console.log("Fees claimed successfully");
```

### Monitor Fee Collection

```javascript
// Check contract balances for different tokens
const tokens = ["0x...", "0x...", "0x..."]; // USDC, USDT, DAI
const balances = {};

for (const token of tokens) {
  const tokenContract = new ethers.Contract(token, ERC20_ABI, provider);
  const balance = await tokenContract.balanceOf(bgtIncentiveFeeCollector.address);
  balances[token] = balance;
  console.log(`Balance of ${token}:`, ethers.formatUnits(balance, 6)); // Assuming 6 decimals
}

// Check if fees are available to claim
const totalFees = Object.values(balances).reduce((sum, balance) => sum + balance, 0n);
const payoutAmount = await bgtIncentiveFeeCollector.payoutAmount();

if (totalFees > 0) {
  console.log("Fees available to claim:", ethers.formatUnits(totalFees, 6));
  console.log("Payout amount required:", ethers.formatEther(payoutAmount));
}
```

### Queue Payout Amount Change

```javascript
// Queue a new payout amount (admin only)
const newPayoutAmount = ethers.parseEther("10000"); // 10,000 WBERA
await bgtIncentiveFeeCollector.queuePayoutAmountChange(newPayoutAmount);

// Check queued amount
const queuedAmount = await bgtIncentiveFeeCollector.queuedPayoutAmount();
console.log("Queued payout amount:", ethers.formatEther(queuedAmount));

// The change will take effect on the next fee claim
```

## Fee Collection Flow

### 1. Protocol Incentive Payment

```solidity
// In RewardVault.addIncentive()
uint256 feeAmount = _collectIncentiveFee(token, amount);
incentive.amountRemaining = amountRemainingBefore + amount - feeAmount;
```

### 2. Fee Collection

The `_collectIncentiveFee` function:

- Calculates fee amount based on incentive fee rate
- Transfers fee to BGTIncentiveFeeCollector
- Emits `IncentiveFeeCollected` event

### 3. Fee Auction and Distribution

When `claimFees` is called:

- Caller transfers WBERA to WBERAStakerVault
- Collected tokens are transferred to recipient
- WBERA is distributed to BERA stakers

## Security Considerations

### Access Control

- `DEFAULT_ADMIN_ROLE`: Can upgrade contract and queue payout changes
- `MANAGER_ROLE`: Can unpause contract and manage PAUSER_ROLE
- `PAUSER_ROLE`: Can pause fee claiming operations

### Payout Requirements

- Caller must transfer exact payout amount to WBERAStakerVault
- Payout amount can be adjusted by governance
- Changes are queued and take effect on next claim

### Emergency Controls

- Contract can be paused in emergency situations
- Payout amounts can be adjusted without immediate effect
- UUPS upgradeable for future improvements

## Error Codes

| Error                | Description                                |
| -------------------- | ------------------------------------------ |
| `ZeroAddress`        | Governance or vault address cannot be zero |
| `PayoutAmountIsZero` | Payout amount cannot be zero               |

## Related Contracts

- [WBERAStakerVault](./wbera-staker-vault.md): Receives WBERA payouts
- [RewardVaultFactory](./reward-vault-factory.md): Manages incentive fee rates
- [RewardVault](./reward-vault.md): Collects incentive fees

## Resources

- [PoL Migration Guide](/learn/guides/pol-migration)
- [Incentive Fee Collection](/learn/pol/blockrewards#incentive-fee-collection-pol)
- [BERA Staking Guide](/learn/guides/bera-staking)
