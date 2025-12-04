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

## Validator Lifecycle

Your staking pool integrates with Berachain's validator lifecycle, which follows these states:

- **Deposited**: Initial deposit establishes your validator identity (minimum 10,000 BERA to reach Deposited state)
- **Eligible**: After 1 epoch, your validator becomes eligible for activation (requires 250,000 BERA minimum effective balance)
- **Active**: After another epoch, your validator joins the active set and can propose blocks
- **Exited**: If capacity limits are reached, validators with lower priority are exited
- **Withdrawn**: Funds become withdrawable when `withdrawable_epoch = exit_epoch + MIN_VALIDATOR_WITHDRAWABILITY_DELAY` (256 epochs). With 192 slots per epoch at ~2s block time, this is roughly 27 hours under normal conditions. After this delay, funds are returned to the withdrawal contract for eventual redemption.

## Getting Started

### Deployment and Installation

The setup process for staking pools follows this progression:

1. **Deploy and Initialize Your Staking Pool**: See the [Installation Guide](/nodes/staking-pools/installation).
   Deploy the staking pool contracts through the factory, obtain verification proofs from the beacon API, and activate your pool for user deposits.

2. **Configure Operations**: Set operational parameters such as commission rates and reward allocations to optimize your pool's performance.

### Business Model and Commission Rates

Staking pools provide validators with a revenue stream through commission on incentive token distribution. You can set commission rates within the range defined by the BeraChef contract (0-20%), allowing you to balance profitability with competitive positioning.

**Commission on Incentive Tokens:**

Commission applies to the distribution of incentive tokens from Proof of Liquidity rewards, with a range of 0-20% as set by BeraChef. Setting commission greater than 0% guarantees users a yield, even if the validator maintains minimal boost and burns BGT to increase voting power. Incentive tokens are automatically sent to the SmartOperator when `distributeFor` runs for your validator.

```solidity
// Queue validator commission rate change (in basis points, max 2000 = 20%)
function queueValCommission(uint96 commission) external;
```

See: [SmartOperator.queueValCommission](/nodes/staking-pools/contracts/SmartOperator.md#queuevalcommission)

### Configure Reward Allocations

The reward allocation system allows you to direct Proof of Liquidity incentives to specific applications or use cases. This flexibility enables you to support particular ecosystem initiatives or community projects, creating opportunities to differentiate your pool and build stronger relationships with your staking community.

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

This role controls where your Proof of Liquidity rewards are directed. Addresses with this role can call `queueRewardsAllocation()` to support specific DeFi protocols or applications, making it useful for supporting ecosystem initiatives or community projects.

**COMMISSION_MANAGER_ROLE:**

This role controls your validator commission rate (0-20% as set by BeraChef). Addresses with this role can call `queueValCommission()` to adjust how much you earn from user rewards, making it essential for managing your revenue model.

**INCENTIVE_COLLECTOR_MANAGER_ROLE:**

This role controls incentive collector payout amounts. Addresses with this role can call `queueIncentiveCollectorPayoutAmountChange()` to adjust user incentive payouts, which is useful for optimizing user experience and retention.

**PROTOCOL_FEE_MANAGER_ROLE:**

This role controls the protocol fee percentage (up to 20%) charged on BGT balance growth. Addresses with this role can call `setProtocolFeePercentage()` to adjust fee rates, which is important for managing operational costs.

**BGT_MANAGER_ROLE:**

This role controls BGT boost and redemption operations. Addresses with this role can call `queueDropBoost()` and `redeemBGT()` for BGT management. This role can be granted by validator admins for BGT management operations.

**Role Assignment Strategy:**

You can assign these roles to different addresses based on your operational needs. For simplicity, you can grant all roles to your main validator wallet, centralizing all management functions in one address. Alternatively, you can implement distributed management by granting specific roles to different team members or automated systems, allowing for separation of concerns and specialized access control. You can also grant roles to smart contracts for automated operations, enabling programmatic management of certain functions without manual intervention. This role system allows you to maintain operational flexibility while keeping your validator keys secure and separate from day-to-day management functions.

## Operations

### BGT Operations and Protocol Fees

### Withdrawal Request Management

When users request a withdrawal, they receive an ERC721 NFT (token name "Berachain Staking Pool Withdrawal Request", symbol "BSPWR") representing their withdrawal request. The withdrawal request ID returned from `requestWithdrawal()` or `requestRedeem()` is the same as the NFT token ID. Your front-end should:

**Display Withdrawal Status:**

- Show all pending withdrawal requests for the connected wallet
- Display the withdrawal amount and request timestamp
- Calculate and display when each withdrawal will be ready to finalize
- Use `getWithdrawalRequest(requestId)` to retrieve withdrawal details including the `requestBlock` field
- Calculate readiness by checking if `block.number >= (request.requestBlock + 129600)` (129,600 blocks ≈ 3 days)
- Show a countdown timer or status indicator for pending withdrawals

**Handle Withdrawal Finalization:**

- Automatically detect when withdrawals are ready to finalize
- Provide a clear "Complete Withdrawal" or "Finalize" button when ready
- Support batch finalization using `finalizeWithdrawalRequests([requestId1, requestId2, ...])` for users with multiple pending withdrawals
- Show confirmation dialogs before finalizing
- Display transaction status and completion

**NFT Integration:**

- Use standard ERC721Enumerable functions to query user's withdrawal NFTs:
  - `balanceOf(userAddress)` to get the count of pending withdrawals
  - `tokenOfOwnerByIndex(userAddress, index)` to enumerate withdrawal request IDs
  - `ownerOf(requestId)` to verify ownership
- Display withdrawal NFTs in the user's wallet if they use NFT-aware wallets
- Note that these NFTs are non-transferable (they revert on transfer attempts)

### Withdrawal Processing Paths

Your front-end should handle two withdrawal processing paths transparently:

**Short-Circuit Path:**

- Occurs when the pool hasn't reached the active threshold and has sufficient buffered funds
- Funds are immediately transferred to the WithdrawalVault contract
- Users still must wait the full 3-day delay period before finalization
- The front-end should not indicate "instant" withdrawal, but can show that funds are already secured

**Standard Path:**

- Occurs when the pool has reached its active threshold or lacks sufficient buffered funds
- Requires consensus layer processing
- Takes approximately 3 days (129,600 blocks) to complete
- Front-end should clearly communicate the processing time

Regardless of which path is taken, users must wait the full delay period before finalization. Your interface should set appropriate expectations about timing.

### User Balance and Position Display

Your front-end should clearly display:

- Current BERA balance (including accrued rewards)
- Share balance (stBERA tokens)
- Current share price/value
- Total rewards earned since deposit
- Pool performance metrics (total assets, validator uptime, etc.)

Use `previewRedeem(shares)` and `previewWithdraw(assets)` to show users what they'll receive before they initiate withdrawals.

### Error Handling and User Communication

Your front-end should handle and clearly communicate:

- **Withdrawal Cooldown**: If withdrawals are disabled due to the validator recently reaching active threshold (cooldown period of ~3 days after activation)
- **Insufficient Funds**: If the WithdrawalVault doesn't have enough funds when finalization is attempted
- **Request Not Ready**: If a user tries to finalize before the delay period completes
- **Pool Capacity**: If deposits are paused due to capacity limits
- **Full Exit Status**: If the pool has triggered full exit and what that means for users

The SmartOperator contract manages BGT (Berachain Governance Token) operations through role-based access controls. As a validator operator, you or your designated BGT manager will need to actively manage BGT operations to optimize your Proof of Liquidity performance.

**BGT Management Operations:**

BGT operations require the `BGT_MANAGER_ROLE` (which you as VALIDATOR_ADMIN can grant):

- **Queue Drop Boost**: Enqueue a request to unboost a specific amount of BGT using `queueDropBoost()`
- **Redeem BGT**: Convert BGT to BERA and send it to the staking rewards vault using `redeemBGT()`

Public BGT operations (anyone can call):

- **Queue Boost**: Any address can call `queueBoost()` to queue unboosted BGT for boosting to your validator
- **Activate Boost**: Any address can call `activateBoost()` to activate a queued boost
- **Drop Boost**: Any address can call `dropBoost()` to execute a queued drop boost

**Protocol Fee on BGT Balance:**

The `protocolFeePercentage` (up to 20% maximum) is charged on the SmartOperator's chargeable BGT balance. This fee is separate from your validator commission.

- Controlled by addresses with `PROTOCOL_FEE_MANAGER_ROLE` (managed by VALIDATOR_ADMIN)
- Charged on new BGT earned since last fee calculation
- Fees are minted as stBERA shares to your validator (the default share recipient)
- Call `accrueEarnedBGTFees()` to trigger fee calculation and minting

**Incentive Token Flow:**

The incentive token system involves multiple steps and two types of rewards:

**Type 1: Validator Commission on Incentive Tokens**

1. **Distribution**: When `distributeFor` runs for your validator, RewardVault processes incentives and calculates your commission share (based on your validator commission rate, 0-20%)
2. **Receipt**: Your commission share of incentive tokens is automatically sent to SmartOperator
3. **Accumulation**: Tokens accumulate in SmartOperator until you manually forward them by calling `claimBgtStakerReward()` or `claimBoostRewards()`. These functions claim any accumulated rewards and transfer all tokens from SmartOperator to IncentiveCollector, where they become available for users to claim via the auction mechanism.

**Type 2: BGT Staking Rewards (HONEY)**

1. **Source**: Protocol fees collected from Berachain dApps (such as BEX trading fees) are auctioned for HONEY via the FeeCollector contract. Anyone can claim accumulated protocol fees by paying a fixed amount of HONEY (the payout amount).
2. **Distribution**: When protocol fees are claimed, the HONEY payment is sent to BGTStaker, which distributes it proportionally to all BGT stakers based on their staked BGT balance.
3. **Accumulation**: HONEY rewards accumulate in BGTStaker for your SmartOperator address (since SmartOperator holds BGT)
4. **Claiming**: Must be manually claimed via `claimBgtStakerReward()`

**Forwarding to IncentiveCollector:**

Tokens accumulate in SmartOperator and must be manually forwarded to IncentiveCollector before users can claim them. You can use `claimBgtStakerReward()` to claim HONEY rewards from BGT staking and forward them to IncentiveCollector, or use `claimBoostRewards()` to claim both HONEY rewards and boost program incentive tokens, then forward all accumulated tokens to IncentiveCollector in a single operation.

**User Claiming (Auction Mechanism):**

1. **Accumulation**: Tokens accumulate in IncentiveCollector from SmartOperator forwarding operations
2. **Auction**: Anyone can call `claim()` with the payout amount (default 100 BERA) to claim **all** accumulated tokens
3. **Distribution**: The payout amount (minus protocol fee) goes to StakingRewardsVault for distribution to stakers
4. **Protocol Fee**: A fee (based on `protocolFeePercentage`) is minted as shares to your validator

**Key Points:**

Tokens do not automatically flow to IncentiveCollector, so manual forwarding is required before users can claim them. The auction mechanism is winner-takes-all, meaning the first caller to pay the payout amount receives all accumulated tokens. Users should only claim when the value of tokens they'll receive exceeds the payout cost, as there's no partial claiming available. The payout amount contributes to your pool's rewards, creating a sustainable cycle where incentive collection benefits both users and your pool.

**Validator Commission vs Protocol Fee:**

These are two separate fee mechanisms that work independently:

**Validator Commission (0-20%):**

Validator commission is set on BeraChef, not SmartOperator, and is applied to incentive token distribution from Proof of Liquidity rewards. This commission is controlled by addresses with `COMMISSION_MANAGER_ROLE`, who can use `queueValCommission()` to change commission rates.

**Protocol Fee (0-20%):**

The protocol fee is set on SmartOperator via `setProtocolFeePercentage()` and is applied to the SmartOperator's BGT balance growth. This fee is controlled by addresses with `PROTOCOL_FEE_MANAGER_ROLE` and is minted as shares to your validator rather than being deducted from user rewards.

Both fee structures can be configured independently based on your operational needs.

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

### Setting Minimum Effective Balance

The `minEffectiveBalance` parameter is critical for validator activation and maintaining active status. This value determines when your staking pool becomes eligible to activate its validator on the consensus layer and serves as a safeguard that triggers full exit if your pool's deposits fall below it.

**How the Consensus Layer Minimum Works:**

The consensus layer enforces a base minimum of {{ config.mainnet.minEffectiveBalance }} BERA for validator activation. However, when the validator set is full (all {{ config.mainnet.validatorActiveSetSize }} validator slots are occupied), the actual minimum stake required increases in increments of {{ config.mainnet.stakeMinimumIncrement }} BERA. This dynamic adjustment ensures that validators must compete for entry into the active set when capacity is reached.

You must set `minEffectiveBalance` to match the current minimum stake required on the consensus layer if it exceeds {{ config.mainnet.minEffectiveBalance }} BERA. To determine the current requirement:

1. Check the current number of validators on [Berachain Hub](https://hub.berachain.com/boost/)
2. If the validator set is full ({{ config.mainnet.validatorActiveSetSize }} validators), identify the lowest stake amount among active validators
3. The minimum required stake will be that lowest amount, rounded up to the nearest {{ config.mainnet.stakeMinimumIncrement }} BERA increment
4. You may, of course, choose to go higher

Once your validator reaches the activation threshold (when `activeThresholdReached` becomes true), a cooldown period begins during which withdrawals are disabled. This protection ensures commitment to staking operations. However, if withdrawals later cause `totalDeposits` to fall below `minEffectiveBalance()`, the pool automatically triggers a full exit. Setting `minEffectiveBalance` correctly from the start prevents your pool from exiting prematurely while ensuring activation occurs when sufficient stake is available.

```solidity
// Set minimum effective balance (can only be called by SmartOperator)
function setMinEffectiveBalance(uint256 newMinEffectiveBalance) external;
```

See: [SmartOperator.setMinEffectiveBalance](/nodes/staking-pools/contracts/SmartOperator.md#setmineffectivebalance)

### Understanding Pool Operations

The StakingPool contract manages several critical operational aspects that directly impact your pool's performance and user experience.

#### Deposit Processing

When users deposit BERA into your pool, the contract automatically handles several processes:

1. **Share Minting**: Users receive stBERA shares proportional to their deposit
2. **Buffer Management**: Deposits are added to the buffer until sufficient for consensus layer deposits
3. **Reward Collection**: Rewards from incentive auctions are collected and added to the buffer if the total capacity is not reached
4. **Automatic Staking**: When the buffer reaches the minimum deposit amount (10,000 BERA), funds are automatically staked to the consensus layer

The pool uses a sophisticated deposit calculation system that handles user deposits, automatic collection of earned rewards, refund handling for any excess amounts, and maintaining the optimal buffer size for consensus layer deposits. When funds are deposited to the consensus layer, amounts are rounded down to the nearest 1 gwei, as the consensus layer deposit contract only accepts multiples of 1 gwei. Any remainder stays in the buffer for future deposits. This system ensures that deposits are processed efficiently while maximizing the pool's ability to stake funds to the consensus layer as soon as thresholds are met.

#### Withdrawal Management

The withdrawal system provides both immediate and delayed withdrawal options depending on the pool's current state. If the pool's `bufferedAssets()` can cover the withdrawal request and the active threshold hasn't been reached, the withdrawal short-circuits and pays out immediately from the buffer, providing users with instant access to their funds. However, if these conditions aren't met, withdrawals follow the standard consensus layer processing path. The system automatically triggers a full exit in two scenarios: when a withdrawal would cause total deposits to fall below the minimum effective balance, or when the withdrawal amount exceeds total deposits (which can occur when share values have appreciated significantly from accumulated rewards). This protects users from potential issues while ensuring orderly pool shutdown.

### Reward Management

The pool automatically handles reward collection and distribution:

```solidity
// Receive rewards from staking rewards vault
function receiveRewards() external payable;

// Mint fee shares for validator
function mintFeeShares(uint256 amount) external;
```

Reward management operates automatically throughout the pool's lifecycle. Rewards are automatically collected from the consensus layer as they accrue, ensuring that all earned rewards are captured without manual intervention. Validator fees are minted as shares to the default recipient, providing you with your commission share in a liquid format. All rewards are automatically reinvested in the pool through auto-compounding, maximizing returns for both you and your stakers without requiring any manual claim or reinvestment steps.

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

Higher payout amounts may discourage small claims from your users, potentially reducing engagement with the incentive system. However, the payout amount contributes to your pool's rewards, creating a balance between user accessibility and pool sustainability. Your validator fees are calculated on the payout amount, so adjusting the payout amount affects both user experience and your revenue. Users should only claim when the incentive value exceeds the payout cost, so consider providing guidance to help users understand when claiming makes economic sense.

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

In normal network conditions, requests that cannot be short‑circuited by the pool buffer will be eligible to be exchanged for $BERA at the end of the 256th epoch after the withdrawal transaction.

#### Full Exit Management

When your validator fully exits, the withdrawal system handles the transition:

```solidity
// Notify of full exit from consensus layer
function notifyFullExitFromCL(bytes memory pubkey) external;
```

The full exit process operates automatically once triggered. The system detects when your validator has fully exited from the consensus layer and initiates automatic redemption of BGT tokens as part of the exit process. Any queued boost or drop boost operations are automatically cancelled during full exit to prevent edge cases. After BGT redemption completes, the BGT charged balance accounting is reset to zero, ensuring that view functions and helper functions operate correctly after the exit. Throughout the exit period, all pending withdrawals continue to process normally, ensuring users can still access their funds. Once the exit completes, the pool state is updated to mark it as fully exited, preventing new deposits while allowing existing operations to conclude.

#### Withdrawal Request NFTs

Each withdrawal request is represented by an ERC721Enumerable NFT that provides transparent tracking and proof of withdrawal requests. When users request a withdrawal, the system mints an NFT named "Berachain Staking Pool Withdrawal Request" (BSPWR) to their address. The request ID returned from withdrawal functions is the same as the NFT token ID, creating a direct link between the withdrawal request and its on-chain representation.

These NFTs are non-transferable, meaning they cannot be moved to other addresses, which ensures that only the original requester can finalize their withdrawal. Each NFT has a unique token ID that serves as both the withdrawal request identifier and the ERC721 token identifier. You can verify NFT ownership using `ownerOf(requestId)` to confirm which address owns a specific withdrawal request, which is useful for troubleshooting or verifying user claims about their withdrawal status.

The NFT system supports standard ERC721Enumerable functionality, allowing users to query how many withdrawal NFTs they own using `balanceOf` and enumerate them using `tokenOfOwnerByIndex`. This provides users with transparent access to all their pending withdrawal requests. The NFT serves as proof of the withdrawal request throughout the entire lifecycle, from initial request through processing to finalization, and is required when users finalize their withdrawals.

These functions are part of the centralized withdrawal system that handles all withdrawal operations for staking pools.

## Front-End Requirements and User Expectations

Your staking pool front-end interface should provide a seamless experience for users while handling the underlying technical complexity. Users expect to interact with your pool through a web interface, not by calling smart contract functions directly. Your front-end should abstract away the technical details while providing clear visibility into the user's staking position and withdrawal status.

:::tip
For a complete understanding of what users expect from your staking pool interface, see the [User Guide](/nodes/staking-pools/users), which describes the user experience from their perspective.
:::

### Withdrawal Request Management

When users request a withdrawal, they receive an ERC721 NFT (token name "Berachain Staking Pool Withdrawal Request", symbol "BSPWR") representing their withdrawal request. The withdrawal request ID returned from `requestWithdrawal()` or `requestRedeem()` is the same as the NFT token ID. Your front-end should:

**Display Withdrawal Status:**

- Show all pending withdrawal requests for the connected wallet
- Display the withdrawal amount and request timestamp
- Calculate and display when each withdrawal will be ready to finalize
- Use `getWithdrawalRequest(requestId)` to retrieve withdrawal details including the `requestBlock` field
- Calculate readiness by checking if `block.number >= (request.requestBlock + 129600)` (129,600 blocks ≈ 3 days)
- Show a countdown timer or status indicator for pending withdrawals

**Handle Withdrawal Finalization:**

- Automatically detect when withdrawals are ready to finalize
- Provide a clear "Complete Withdrawal" or "Finalize" button when ready
- Support batch finalization using `finalizeWithdrawalRequests([requestId1, requestId2, ...])` for users with multiple pending withdrawals
- Show confirmation dialogs before finalizing
- Display transaction status and completion

**NFT Integration:**

- Use standard ERC721Enumerable functions to query user's withdrawal NFTs:
  - `balanceOf(userAddress)` to get the count of pending withdrawals
  - `tokenOfOwnerByIndex(userAddress, index)` to enumerate withdrawal request IDs
  - `ownerOf(requestId)` to verify ownership
- Display withdrawal NFTs in the user's wallet if they use NFT-aware wallets
- Note that these NFTs are non-transferable (they revert on transfer attempts)

### Withdrawal Processing Paths

Your front-end should handle two withdrawal processing paths transparently:

**Short-Circuit Path:**

- Occurs when the pool hasn't reached the active threshold and has sufficient buffered funds
- Funds are immediately transferred to the WithdrawalVault contract
- Users still must wait the full 3-day delay period before finalization
- The front-end should not indicate "instant" withdrawal, but can show that funds are already secured

**Standard Path:**

- Occurs when the pool has reached its active threshold or lacks sufficient buffered funds
- Requires consensus layer processing
- Takes approximately 3 days (129,600 blocks) to complete
- Front-end should clearly communicate the processing time

Regardless of which path is taken, users must wait the full delay period before finalization. Your interface should set appropriate expectations about timing.

### User Balance and Position Display

Your front-end should clearly display:

- Current BERA balance (including accrued rewards)
- Share balance (stBERA tokens)
- Current share price/value
- Total rewards earned since deposit
- Pool performance metrics (total assets, validator uptime, etc.)

Use `previewRedeem(shares)` and `previewWithdraw(assets)` to show users what they'll receive before they initiate withdrawals.

### Error Handling and User Communication

Your front-end should handle and clearly communicate:

- **Withdrawal Cooldown**: If withdrawals are disabled due to the validator recently reaching active threshold (cooldown period of ~3 days after activation)
- **Insufficient Funds**: If the WithdrawalVault doesn't have enough funds when finalization is attempted
- **Request Not Ready**: If a user tries to finalize before the delay period completes
- **Pool Capacity**: If deposits are paused due to capacity limits
- **Full Exit Status**: If the pool has triggered full exit and what that means for users

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
4. **Activate your boosts**: Nobody else will
5. **Verify Protocol Fees**: Ensure protocol fee percentage is set correctly

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

### Withdrawal Issues

**Problem: Users reporting withdrawal problems**

**Debug Steps:**

1. **Check Withdrawal Requests**: Use `getWithdrawalRequest(requestId)` to examine specific requests
2. **Verify Processing Time**: Confirm the finalization window has passed for standard withdrawals - 256 x 192 block complete epochs
3. **Check Pool Buffer**: Verify sufficient funds available for short-circuit withdrawals
4. **Monitor Withdrawal Events**: Watch for `WithdrawalRequested` and `WithdrawalRequestFinalized` events

**Debugging Commands:**

```solidity
// Get withdrawal request details
WithdrawalRequest memory request = withdrawalVault.getWithdrawalRequest(requestId);
```

For detailed technical information about the smart contracts, see the [Smart Contract Reference](/nodes/staking-pools/contracts).

## Delegation System

Some validators are issued a delegation of funds from the Berachain Foundation. For detailed information about working with delegated funds, see the [Delegators Guide](/nodes/staking-pools/delegators) and the [DelegationHandler contract reference](/nodes/staking-pools/contracts/DelegationHandler).
