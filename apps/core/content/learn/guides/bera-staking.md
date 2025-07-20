---
head:
  - - meta
    - property: og:title
      content: BERA Staking Guide
  - - meta
    - name: description
      content: Learn how to stake BERA and earn yield through the PoL V2 BERA Yield Module
  - - meta
    - property: og:description
      content: Learn how to stake BERA and earn yield through the PoL V2 BERA Yield Module
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# BERA Staking Guide 🐻

The PoL V2 BERA Yield Module lets you stake `$BERA` directly and earn yield from Proof-of-Liquidity incentives. It's a simple way to earn yield on your BERA without diving into complex DeFi protocols.

## Overview

The BERA Yield Module uses the **WBERAStakerVault**, an ERC4626-compliant vault that:

- Takes both native `$BERA` and wrapped `$WBERA` deposits
- Earns yield from redirected PoL incentives (33% of protocol incentives)
- Has a 7-day unbonding period for withdrawals
- Automatically compounds your rewards for better yields

## How to Stake BERA

### Option 1: Native BERA Staking (Recommended)

1. **Connect your wallet** to the Berachain network
2. **Navigate to the WBERAStakerVault** interface
3. **Select "Deposit Native"** and enter the amount of BERA you want to stake
4. **Confirm the transaction** - your BERA will be automatically wrapped to WBERA and deposited
5. **Receive sWBERA tokens** representing your staked position

### Option 2: WBERA Staking

1. **Wrap your BERA** to WBERA first using the WBERA contract
2. **Approve WBERA** for the WBERAStakerVault
3. **Deposit WBERA** into the vault
4. **Receive sWBERA tokens** representing your staked position

## Understanding Your Position

### sWBERA Tokens

When you stake BERA, you receive **sWBERA** (Staked WBERA) tokens:

- **Name**: "POL Staked WBERA"
- **Symbol**: "sWBERA"
- **Decimals**: 18
- **Value**: Each sWBERA represents your share of the vault's total assets

### Yield Calculation

Your yield depends on:

1. **Your share** of the total vault assets
2. **The amount of WBERA** distributed to the vault from incentive fees
3. **Auto-compounding** of rewards over time

The more sWBERA you have compared to the total supply, the bigger your share of the distributed rewards.

## Withdrawal Process

### 7-Day Unbonding Period

To withdraw your staked BERA:

1. **Initiate withdrawal** by calling `withdraw()` or `redeem()` on the vault
2. **Wait 7 days** for the unbonding period to complete
3. **Complete withdrawal** by calling `completeWithdrawal()`
4. **Choose format**: Receive either native BERA or WBERA

### Important Notes

- **Only one withdrawal request** can be active per address at a time
- **No rewards earned** during the unbonding period
- **Cannot cancel** a withdrawal request once initiated
- **Withdrawal requests expire** after 7 days if not completed

## Security Features

### Inflation Attack Protection

The vault includes protection against inflation attacks through:

- **Initial deposit mechanism** to establish proper exchange rates
- **Reserved assets tracking** for pending withdrawals
- **Careful accounting** of total assets vs. available assets

### Emergency Controls

The vault can be paused by authorized roles in emergency situations:

- **PAUSER_ROLE**: Can pause the vault
- **MANAGER_ROLE**: Can unpause the vault
- **DEFAULT_ADMIN_ROLE**: Can upgrade the vault implementation

## Yield Sources

### PoL Incentive Redirection

Your yield comes from the **33% incentive tax** collected from PoL protocols:

1. **Protocols pay incentives** to validators for directing BGT emissions
2. **33% fee collected** and sent to BGTIncentiveFeeCollector
3. **Fees auctioned** for WBERA
4. **WBERA distributed** to WBERAStakerVault stakers

### Auto-Compounding

Your rewards automatically compound:

- **No manual claiming** needed
- **Continuous yield growth** as more incentives come in
- **Your share value keeps growing** over time

## Integration with LSTs

Future versions will support **Liquid Staking Tokens (LSTs)**:

- **Dual yield**: Earn from both validator staking and PoL incentives
- **Enhanced security**: Help secure the network while earning PoL yield
- **Flexible liquidity**: Use LSTs in other DeFi protocols

## Best Practices

### Staking Strategy

- **Long-term holding**: The 7-day unbonding period works best for long-term staking
- **Regular deposits**: Consider dollar-cost averaging your BERA deposits
- **Monitor yield**: Keep track of how your position grows over time

### Risk Management

- **Plan withdrawals**: The unbonding period means you need to plan ahead
- **Diversify**: Don't put all your BERA in one place
- **Stay informed**: Keep up with governance changes that might affect parameters

## Technical Details

### Contract Addresses

- **WBERAStakerVault**: `0x...` (TBD)
- **WBERA Token**: `0x6969696969696969696969696969696969696969`
- **BGTIncentiveFeeCollector**: `0x...` (TBD)

### Key Functions

```solidity
// Deposit native BERA
function depositNative(uint256 assets, address receiver) external payable returns (uint256 shares)

// Deposit WBERA
function deposit(uint256 assets, address receiver) external returns (uint256 shares)

// Initiate withdrawal
function withdraw(uint256 assets, address receiver, address owner) external returns (uint256 shares)

// Complete withdrawal
function completeWithdrawal(bool isNative) external
```

## Related Resources

- [Proof-of-Liquidity Overview](/learn/pol/)
- [BGT Staking Guide](/learn/guides/boost-a-validator)
- [Reward Vaults](/learn/pol/rewardvaults)
