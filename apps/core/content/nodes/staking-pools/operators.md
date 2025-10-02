---
head:
  - - meta
    - property: og:title
      content: Staking Pools Operator Guide
  - - meta
    - name: description
      content: How to set up and manage staking pools as a validator
  - - meta
    - property: og:description
      content: How to set up and manage staking pools as a validator
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Staking Pools Operator Guide

This guide walks validators through setting up and managing staking pools to offer liquid staking services to their communities. Staking pools represent a significant opportunity for validators to build engaged communities while leveraging Berachain's advanced staking infrastructure.

## Prerequisites

Before setting up a staking pool, validators need to ensure they have the necessary foundation in place. A fully operational Berachain validator node is essential. You'll need at least {{ config.mainnet.votingPowerIncrement }} $BERA to register the pool, though actual activation to the Active state requires at least {{ config.mainnet.minEffectiveBalance }} $BERA.

Technical knowledge of smart contract interactions is important, as you'll be deploying and managing several contracts. While the system is designed to be user-friendly, understanding the underlying mechanics will help you troubleshoot issues and optimize your pool's performance. Perhaps most importantly, you should have a community of users interested in staking with your validator, since staking pools are most effective when they serve an engaged user base.

:::warning
Staking pools follow the standard Berachain validator lifecycle. After deployment, your validator will progress through the Deposited → Eligible states, but activation to the Active state depends on the ValidatorSetCap and your validator's priority relative to other validators.
:::

## Validator Lifecycle Integration

Your staking pool integrates with Berachain's validator lifecycle, which follows these states:

- **Deposited**: Initial deposit establishes your validator identity (minimum 10,000 BERA to reach Deposited state)
- **Eligible**: After 1 epoch, your validator becomes eligible for activation (requires 250,000 BERA minimum effective balance)
- **Active**: After another epoch, your validator joins the active set and can propose blocks
- **Exited**: If capacity limits are reached, validators with lower priority are exited
- **Withdrawn**: After 1 epoch in exited state, funds are returned to your withdrawal address

The staking pool automatically manages your validator's progression through these states, handling deposits, activation, and any necessary exits based on network conditions.

## Overview of the Setup Process

The setup process for staking pools follows a logical progression that ensures all components are properly configured before going live:

1. **Deploy and Initialize Your Staking Pool**: Deploy the staking pool contracts through the factory, obtain verification proofs from the beacon API, and activate your pool for user deposits.

2. **Configure Operations**: Set operational parameters such as commission rates and reward allocations to optimize your pool's performance.

## Deploy and Initialize Your Staking Pool

The deployment and initialization process involves several key steps that must be completed in sequence. This process deploys all necessary contracts, registers your validator with the consensus layer, and activates your pool for user deposits.

**Key Steps:**

1. **Deploy Contracts**: Use the factory to deploy all staking pool contracts with your validator data
2. **Automatic Registration**: The deployment automatically registers your validator with the consensus layer
3. **Obtain Proofs**: Gather verification proofs from the beacon API
4. **Activate Pool**: Verify proofs and activate your pool for operations

The deployment process uses the `StakingPoolContractsFactory` to create all necessary contracts in a single transaction. This factory approach ensures that all contracts are properly linked and configured, reducing the complexity of the setup process. The deployment function automatically performs the first deposit to the consensus layer, registering your validator immediately upon successful deployment.

For detailed step-by-step instructions on deployment, contract verification, proof gathering, and activation, see the [Installation Guide](/nodes/staking-pools/installation).

## Configure Operations

Once your staking pool is active, you'll want to configure various operational parameters to optimize performance and align with your goals. These configurations allow you to customize how your pool operates and how rewards are distributed.

### Business Model and Commission Rates

Staking pools provide validators with a revenue stream through commission on user rewards. You can set commission rates up to a maximum of 100% (10,000 basis points), allowing you to balance profitability with competitive positioning.

**Revenue Calculation Example:**

- Pool size: 1,000,000 BERA
- Annual rewards: 100,000 BERA (10% APY)
- Commission rate: 5%
- Your annual revenue: 5,000 BERA
- Users receive: 95,000 BERA (auto-compounded)

**Commission Strategy Considerations:**

- **Competitive Rates**: Lower commissions attract more users but reduce revenue per user
- **Premium Positioning**: Higher commissions can work with strong community and performance
- **Market Conditions**: Adjust rates based on network conditions and competition

```solidity
// Queue validator commission rate change (in basis points, max 10000 = 100%)
function queueValCommission(uint96 commission) external;
```

See: [SmartOperator.queueValCommission](/nodes/staking-pools/contracts/SmartOperator.md#queuevalcommission)

### Configure Reward Allocations

The reward allocation system allows you to direct Proof of Liquidity incentives to specific applications or use cases. This flexibility enables you to support particular ecosystem initiatives or community projects, creating opportunities to differentiate your pool and build stronger relationships with your staking community. These operator‑level settings power the user experience shown in the [User Guide](/nodes/staking-pools/users).

```solidity
// Queue reward allocation for specific applications
function queueRewardsAllocation(
    uint64 startBlock,
    IBeraChef.Weight[] calldata weights
) external;
```

See: [SmartOperator.queueRewardsAllocation](/nodes/staking-pools/contracts/SmartOperator.md#queuerewardsallocation)

### Set Reward Allocator

You can set a reward allocator address for your validator on the BeraChef contract. This allows you to delegate reward allocation management to a specific address or smart contract.

```solidity
// Set reward allocator for validator
function setRewardAllocator(address rewardAllocator) external;
```

See: [SmartOperator.setRewardAllocator](/nodes/staking-pools/contracts/SmartOperator.md#setrewardallocator)

### Role Management and Access Control

The SmartOperator contract uses a role-based access control system that allows you to delegate specific operational responsibilities to different addresses. This provides flexibility in managing your staking pool operations while maintaining security through separation of concerns.

**Your Role as Validator Admin:**

When you deploy your staking pool, you receive the `VALIDATOR_ADMIN_ROLE`, which gives you the ability to grant and revoke the following operational roles to other addresses:

**REWARDS_ALLOCATION_MANAGER_ROLE:**

- Controls where your Proof of Liquidity rewards are directed
- Can call `queueRewardsAllocation()` to support specific DeFi protocols or applications
- Useful for supporting ecosystem initiatives or community projects

**COMMISSION_MANAGER_ROLE:**

- Controls your validator commission rate (up to 100%)
- Can call `queueValCommission()` to adjust how much you earn from user rewards
- Essential for managing your revenue model

**INCENTIVE_COLLECTOR_MANAGER_ROLE:**

- Controls incentive collector payout amounts
- Can call `queueIncentiveCollectorPayoutAmountChange()` to adjust user incentive payouts
- Useful for optimizing user experience and retention

**PROTOCOL_FEE_MANAGER_ROLE:**

- Controls the protocol fee percentage (up to 20%) charged on BGT operations
- Can call `setProtocolFeePercentage()` to adjust fee rates
- Important for managing operational costs

**BGT_MANAGER_ROLE:**

- Controls BGT boost and redemption operations
- Can call `queueDropBoost()` and `redeemBGT()` for BGT management
- Can be granted by validator admins for BGT management operations

**Role Assignment Strategy:**

You can assign these roles to different addresses based on your operational needs:

- **Single Address**: Grant all roles to your main validator wallet for simplicity
- **Distributed Management**: Grant specific roles to different team members or automated systems
- **Automated Systems**: Grant roles to smart contracts for automated operations

This role system allows you to maintain operational flexibility while keeping your validator keys secure and separate from day-to-day management functions.

### BGT Operations and Protocol Fees

The SmartOperator contract automatically manages BGT (Berachain Governance Token) operations to maximize your Proof of Liquidity performance. These operations are handled automatically based on the BGT balance in the contract - you don't need to manually manage BGT boosts or redemptions.

**Protocol Fee System:**
The protocol charges a fee on BGT boosts (up to 20% maximum). This fee is set by the protocol governance and applies specifically when BGT is boosted to enhance validator performance. The fee helps fund protocol development and maintenance.

**Automatic BGT Management:**
The system automatically:

- Queues BGT boosts when unboosted BGT is available
- Activates queued boosts to enhance your validator's position
- Manages boost drops and BGT redemptions as needed
- Collects and distributes BGT-related rewards and fees

While you can monitor these operations through various view functions, the actual BGT management is handled automatically by the smart contracts to ensure optimal performance without requiring manual intervention.

## Pool Management

Effective pool management requires ongoing monitoring and proactive decision-making. Regular oversight ensures your pool operates smoothly and helps you identify opportunities for optimization or potential issues before they become problems.

### Monitor Pool Status

Regular monitoring of your pool's status is essential for maintaining optimal performance. You should check key metrics such as whether the pool is active, the total assets under management, and the amount of buffered assets that haven't been staked yet. These metrics provide insights into your pool's health and performance.

```solidity
// Check if pool is active
function isActive() external view returns (bool);

// Get total assets under management
function totalAssets() external view returns (uint256);

// Get buffered assets (not yet staked)
function bufferedAssets() external view returns (uint256);

// Check if pool has fully exited
function isFullyExited() external view returns (bool);

// Get minimum effective balance threshold
function minEffectiveBalance() external view returns (uint256);

// Check if active threshold is reached
function activeThresholdReached() external view returns (bool);
```

See: [StakingPool.isActive](/nodes/staking-pools/contracts/StakingPool.md#isactive), [StakingPool.totalAssets](/nodes/staking-pools/contracts/StakingPool.md#totalassets), [StakingPool.bufferedAssets](/nodes/staking-pools/contracts/StakingPool.md#bufferedassets), [StakingPool.isFullyExited](/nodes/staking-pools/contracts/StakingPool.md#isfullyexited), [StakingPool.minEffectiveBalance](/nodes/staking-pools/contracts/StakingPool.md#minEffectiveBalance), and [StakingPool.activeThresholdReached](/nodes/staking-pools/contracts/StakingPool.md#activethresholdreached)

### Understanding Pool Operations

The StakingPool contract manages several critical operational aspects that directly impact your pool's performance and user experience.

#### Deposit Processing

When users deposit BERA into your pool, the contract automatically handles several processes:

1. **Share Minting**: Users receive stBERA shares proportional to their deposit
2. **Buffer Management**: Deposits are added to the buffer until sufficient for consensus layer deposits
3. **Reward Collection**: Rewards from incentive auctions are collected and added to the buffer if the total capacity is not reached
4. **Automatic Staking**: When the buffer reaches the minimum deposit amount (10,000 BERA), funds are automatically staked to the consensus layer

The pool uses a sophisticated deposit calculation system that handles:

- **User Deposits**: The actual amount users are depositing
- **Reward Collection**: Automatic collection of earned rewards
- **Refund Handling**: Any excess amounts are refunded to users
- **Buffer Updates**: Maintaining the optimal buffer for consensus layer deposits

#### Withdrawal Management

The withdrawal system provides both immediate and delayed withdrawal options:

1. **Short Circuit Withdrawals**: If sufficient buffered assets are available and the active threshold hasn't been reached, withdrawals are processed immediately
2. **Standard Withdrawals**: Larger withdrawals or those after the active threshold require consensus layer processing
3. **Full Exit Triggers**: Automatic full exit when the pool falls below the minimum effective balance

### Reward Management

The pool automatically handles reward collection and distribution:

```solidity
// Receive rewards from staking rewards vault
function receiveRewards() external payable;

// Mint fee shares for validator
function mintFeeShares(uint256 amount) external;
```

Reward management includes:

- **Automatic Collection**: Rewards are automatically collected from the consensus layer
- **Fee Distribution**: Validator fees are minted as shares to the default recipient
- **Auto-Compounding**: All rewards are automatically reinvested in the pool

#### Incentive Collector Payout Requirements

The IncentiveCollector contract requires users to pay a specific amount when claiming incentive tokens. This mechanism ensures that users contribute to the pool's rewards while retrieving their earned incentives.

**Initial Payout Amount**: 100 BERA (set during deployment)

**How It Works**:
1. **Users** call `claim()` with the required payout amount (100 BERA)
2. The contract transfers all ERC20 incentive tokens to the user
3. The payout amount is distributed to the staking rewards vault (minus validator fees)
4. This creates a sustainable reward cycle for the pool

**Managing Payout Amounts**:
```solidity
// Queue a new payout amount (requires INCENTIVE_COLLECTOR_MANAGER_ROLE)
function queueIncentiveCollectorPayoutAmountChange(uint256 newPayoutAmount) external;
```

**Key Considerations for Operators**:
- **User Experience**: Higher payout amounts may discourage small claims from your users
- **Pool Sustainability**: The payout amount contributes to your pool's rewards
- **Fee Structure**: Your validator fees are calculated on the payout amount
- **User Guidance**: Users should only claim when the incentive value exceeds the payout cost

This payout mechanism ensures that incentive collection benefits both users (who receive their tokens) and your pool (which receives additional rewards from the payout amount). As an operator, you can adjust the payout amount to optimize the balance between user experience and pool sustainability.

### Withdrawal Management

The centralized WithdrawalVault contract handles all withdrawal operations for all staking pools. Understanding its operations helps you manage user expectations and troubleshoot withdrawal issues.

#### Withdrawal Processing

The withdrawal system provides two types of withdrawal requests:

```solidity
// Request withdrawal of specific BERA amount
function requestWithdrawal(
    bytes memory pubkey,
    uint64 assetsInGWei,
    uint256 maxFeeToPay
) external payable returns (uint256);

// Request redemption of specific share amount
function requestRedeem(
    bytes memory pubkey,
    uint256 shares,
    uint256 maxFeeToPay
) external payable returns (uint256);
```

#### Withdrawal Finalization

Withdrawals are finalized through the consensus layer:

```solidity
// Finalize a single withdrawal request
function finalizeWithdrawalRequest(uint256 requestId) external;

// Finalize multiple withdrawal requests
function finalizeWithdrawalRequests(uint256[] calldata requestIds) external;
```

#### Full Exit Management

When your validator fully exits, the withdrawal system handles the transition:

```solidity
// Notify of full exit from consensus layer
function notifyFullExitFromCL(bytes memory pubkey) external;
```

The full exit process includes:

- **Automatic Detection**: The system detects when your validator has fully exited
- **BGT Redemption**: Automatic redemption of BGT tokens during full exit
- **Withdrawal Processing**: All pending withdrawals are processed normally
- **Pool State Update**: The pool is marked as fully exited

#### Withdrawal Request NFTs

Each withdrawal request is represented by an ERC-721 NFT that users can track:

- **Non-Transferable**: Withdrawal request NFTs cannot be transferred
- **Unique Identification**: Each request has a unique ID for tracking
- **Status Tracking**: Users can monitor their withdrawal status through the NFT
- **Finalization Proof**: The NFT serves as proof of the withdrawal request

These functions are part of the centralized withdrawal system that handles all withdrawal operations for staking pools.

## Troubleshooting

### Pool Activation Issues

**Problem: Pool won't activate after deployment**

**Debug Steps:**

1. **Check Pool Status**: Call `isActive()` on your StakingPool contract
2. **Verify Proofs**: Ensure all proofs are recent (within 10 minutes) and from correct validator index
3. **Check Withdrawal Credentials**: Verify they match the expected withdrawal system address
4. **Validate Initial Deposit**: Confirm exactly 10,000 BERA was sent with deployment

**Debugging Commands:**

```solidity
// Check if pool is active
bool active = stakingPool.isActive();

// Get validator pubkey
bytes memory pubkey = stakingPool.getValidatorPubkey();

// Check minimum effective balance
uint256 minBalance = stakingPool.minEffectiveBalance();
```

### BGT and Rewards Issues

**Problem: BGT operations not working or rewards not accruing**

**Debug Steps:**

1. **Check BGT Balance**: Call `unboostedBalance()` on SmartOperator
2. **Verify Fee State**: Use `getEarnedBGTFeeState()` to check fee calculations
3. **Monitor Boost Status**: Check if boosts are queued or active
4. **Verify Protocol Fees**: Ensure protocol fee percentage is set correctly

**Debugging Commands:**

```solidity
// Check BGT fee state
(uint256 currentBalance, uint256 alreadyCharged, uint256 chargeable, uint96 feePercent) =
    smartOperator.getEarnedBGTFeeState();

// Check unboosted BGT balance
uint256 unboosted = smartOperator.unboostedBalance();

// Check rebaseable BGT amount
uint256 rebaseable = smartOperator.rebaseableBgtAmount();
```

### Capacity and Performance Issues

**Problem: Pool hitting capacity limits or performance issues**

**Debug Steps:**

1. **Check Capacity Status**: Monitor `activeThresholdReached()` and total assets
2. **Verify Commission Rates**: Ensure rates are competitive and sustainable
3. **Monitor User Deposits**: Track deposit patterns and user behavior
4. **Check Pool Health**: Verify all contracts are functioning properly

**Debugging Commands:**

```solidity
// Check if active threshold reached
bool thresholdReached = stakingPool.activeThresholdReached();

// Get total assets under management
uint256 totalAssets = stakingPool.totalAssets();

// Check minimum effective balance
uint256 minBalance = stakingPool.minEffectiveBalance();
```

### Withdrawal Issues

**Problem: Users reporting withdrawal problems**

**Debug Steps:**

1. **Check Withdrawal Requests**: Use `getWithdrawalRequest(requestId)` to examine specific requests
2. **Verify Processing Time**: Confirm 27-hour delay has passed for standard withdrawals
3. **Check Pool Buffer**: Verify sufficient funds available for short-circuit withdrawals
4. **Monitor Withdrawal Events**: Watch for `WithdrawalRequested` and `WithdrawalRequestFinalized` events

**Debugging Commands:**

```solidity
// Get withdrawal request details
WithdrawalRequest memory request = withdrawalVault.getWithdrawalRequest(requestId);

// Check if request is ready (27 hours passed)
bool ready = block.number >= (request.requestBlock + 49152);
```

### Getting Help

When technical issues require assistance:

- **Contract Issues**: Use the debugging commands above to gather specific information
- **Protocol Issues**: Contact Berachain technical support with contract addresses and transaction hashes
- **Community Support**: Join validator Discord channels with specific error messages and contract states

For detailed technical information about the smart contracts, see the [Smart Contract Reference](/nodes/staking-pools/contracts).

## Delegation System

The staking pools system includes a delegation mechanism that enables **capital-light validator operations** by separating capital provision from validator operations. This allows validators to operate without significant upfront capital while enabling passive staking for capital providers.

### How Delegation Works

Through the delegation system, capital providers (delegators) can fund validators directly, while validator operators maintain control over technical operations. This creates opportunities for both parties: validators can focus on operational excellence without capital constraints, while delegators can earn staking rewards through passive investment.

The system maintains clear separation between principal (delegated capital) and yield (staking rewards), ensuring that delegators can withdraw their original funds while validator operators retain earned rewards.

### For Validator Operators

As a validator operator, you can work with delegators to fund your staking pool operations:

1. **Deploy Delegation Handler**: A delegation handler is deployed for your validator's public key
2. **Receive Delegated Funds**: Delegators provide BERA capital to the delegation handler
3. **Create Staking Pool**: Use delegated funds to create your staking pool (requires 10,000 BERA minimum)
4. **Manage Operations**: Deposit additional delegated funds and manage validator operations
5. **Withdraw Yield**: You can withdraw staking rewards and yield earned from operations

### Key Benefits

- **Capital Efficiency**: Operate validators without significant upfront capital requirements
- **Focus on Operations**: Concentrate on technical excellence rather than capital management
- **Revenue Generation**: Earn commission on user rewards while delegators provide capital
- **Clear Separation**: Distinct roles ensure proper fund management and accountability

For detailed information about working with delegators, see the [Delegators Guide](/nodes/staking-pools/delegators) and the [DelegationHandler contract reference](/nodes/staking-pools/contracts/DelegationHandler).

## Getting Started as a Validator

Validators interested in operating staking pools should start by using the [StakingPoolContractsFactory](/nodes/staking-pools/contracts/StakingPoolContractsFactory.md) to deploy their contracts. Once deployed, validators need to configure their operations by setting up commission rates and reward allocation strategies. Ongoing management requires monitoring pool performance and user activity to ensure optimal operation. Understanding emergency procedures and controls is crucial for managing risk and protecting user funds.

For developers looking to integrate with the staking pools, begin by reviewing the [StakingPool](/nodes/staking-pools/contracts/StakingPool.md) contract, which contains the core functionality that most applications will interact with. Understanding the overall architecture requires studying how the contracts interact and how data flows through the system. Testing integration through test contracts provides hands-on experience with the system's behavior, while monitoring contract events is essential for tracking state changes and building responsive applications.
