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

This guide helps validators set up and manage staking pools to offer liquid staking services to their communities.

## Quick Reference

### Key Parameters

| Parameter                 | Range                                           | Purpose                                      |
| ------------------------- | ----------------------------------------------- | -------------------------------------------- |
| Validator Commission      | 0-20%                                           | Commission on incentive token distribution   |
| Protocol Fee              | 0-20%                                           | Fee on BGT balance growth                    |
| Minimum Effective Balance | ≥ {{ config.mainnet.minEffectiveBalance }} BERA | Activation threshold and full exit safeguard |
| Withdrawal Delay          | 129,600 blocks (≈3 days at ~2s block time)      | Time before withdrawals can be finalized     |

### Key Roles

| Role                               | Controls          | Function                               |
| ---------------------------------- | ----------------- | -------------------------------------- |
| `VALIDATOR_ADMIN_ROLE`             | All other roles   | Grant/revoke operational roles         |
| `REWARDS_ALLOCATION_MANAGER_ROLE`  | Reward allocation | Direct PoL incentives to applications  |
| `COMMISSION_MANAGER_ROLE`          | Commission rate   | Adjust validator commission (0-20%)    |
| `PROTOCOL_FEE_MANAGER_ROLE`        | Protocol fee      | Adjust protocol fee percentage (0-20%) |
| `INCENTIVE_COLLECTOR_MANAGER_ROLE` | Payout amount     | Adjust incentive collector payout      |
| `BGT_MANAGER_ROLE`                 | BGT operations    | Queue drop boost, redeem BGT           |

### Essential Functions

| Function                     | Contract      | Purpose                               |
| ---------------------------- | ------------- | ------------------------------------- |
| `setMinEffectiveBalance()`   | SmartOperator | Set activation threshold              |
| `queueValCommission()`       | SmartOperator | Queue commission rate change          |
| `queueRewardsAllocation()`   | SmartOperator | Queue reward allocation               |
| `claimBoostRewards()`        | SmartOperator | Forward rewards to IncentiveCollector |
| `setProtocolFeePercentage()` | SmartOperator | Set protocol fee rate                 |

## Prerequisites

Before setting up a staking pool, ensure you have a fully operational Berachain validator node. You'll need at least {{ config.mainnet.votingPowerIncrement }} $BERA to register the pool, though activation requires at least {{ config.mainnet.minEffectiveBalance }} $BERA.

You'll need technical knowledge of smart contract interactions to deploy and manage contracts. Understanding the underlying mechanics helps troubleshoot issues and optimize performance. You should also have a community of stakers interested in staking with your validator.

:::warning
Staking pools follow the standard Berachain validator lifecycle. After deployment, your validator will progress through the Deposited → Eligible states, but activation to the Active state depends on the ValidatorSetCap and your validator's priority relative to other validators.
:::

## Validator Lifecycle

Your staking pool integrates with Berachain's validator lifecycle. For details on validator states (Deposited, Eligible, Active, Exited, Withdrawn) and transitions, see the [Validator Lifecycle documentation](/nodes/validator-lifecycle).

The key consideration for staking pools is ensuring sufficient stake for activation. See [Setting Minimum Effective Balance](#setting-minimum-effective-balance) for details on how to configure this.

## Key Terms and Concepts

**Active Threshold**: The point at which your pool has sufficient stake (`totalDeposits >= minEffectiveBalance`) to activate the validator. When `activeThresholdReached()` returns `true`, your validator enters a cooldown period before activation. This is separate from the consensus layer's activation queue.

**Minimum Effective Balance (`minEffectiveBalance`)**: The minimum stake amount required for validator activation and a safeguard that triggers full exit if deposits fall below it. This must match or exceed the current consensus layer minimum, which increases when the validator set is full.

**Short-Circuit Withdrawal**: A withdrawal path where funds are immediately transferred from the pool's buffer to WithdrawalVault, but stakers still must wait the full withdrawal delay (129,600 blocks ≈ 3 days) before finalization. This occurs when the pool hasn't reached the active threshold and has sufficient buffered funds.

**Withdrawal Delay**: The time period (129,600 blocks ≈ 3 days at ~2s block time) that must pass after a withdrawal request before it can be finalized. This delay applies regardless of whether the withdrawal uses the short-circuit or standard path.

**Cooldown Period**: After `activeThresholdReached()` becomes `true`, there is a cooldown period before the validator activates. During this time, withdrawals are still allowed, but the validator is not yet active on the consensus layer.

**Relationship between `minEffectiveBalance` and `activeThresholdReached`**:

- `minEffectiveBalance` is the threshold you set (must match consensus layer requirements)
- `activeThresholdReached()` returns `true` when `totalDeposits >= minEffectiveBalance()`
- Once `activeThresholdReached()` is `true`, the validator enters cooldown and will activate after the delay
- If `totalDeposits` later falls below `minEffectiveBalance()`, the pool triggers full exit

## Configuration

After deploying your staking pool, configure these essential parameters before accepting staker deposits.

### Commission Rates

Staking pools provide validators with a revenue stream through commission on incentive token distribution. You can set commission rates within the range defined by the BeraChef contract (0-20%), allowing you to balance profitability with competitive positioning.

Commission applies to the distribution of incentive tokens from Proof of Liquidity rewards. Setting commission greater than 0% guarantees stakers a yield, even if the validator maintains minimal boost and burns BGT to increase voting power. Incentive tokens are automatically sent to the SmartOperator when `distributeFor` runs for your validator.

For detailed instructions on managing validator commission rates, including how to queue and activate changes, see the [Manage Validator Incentives Commission Rate](/nodes/guides/manage-incentives-commission) guide.

```solidity
// Queue validator commission rate change (in basis points, max 2000 = 20%)
function queueValCommission(uint96 commission) external;
```

See: [SmartOperator.queueValCommission](/nodes/staking-pools/contracts/SmartOperator.md#queuevalcommission)

### Reward Allocations

The reward allocation system lets you direct Proof of Liquidity incentives to specific applications or use cases, supporting ecosystem initiatives or community projects to differentiate your pool.

For detailed instructions on managing reward allocations, including how to queue and activate changes, see the [Managing Validator Reward Allocations](/nodes/guides/reward-allocation) guide.

```solidity
// Queue reward allocation for specific applications
function queueRewardsAllocation(
    uint64 startBlock,
    IBeraChef.Weight[] calldata weights
) external;
```

See: [SmartOperator.queueRewardsAllocation](/nodes/staking-pools/contracts/SmartOperator.md#queuerewardsallocation)

### Reward Allocator

You can set a reward allocator address for your validator on the BeraChef contract. This allows you to delegate reward allocation management to a specific address or smart contract.

```solidity
// Set reward allocator for validator
function setRewardAllocator(address rewardAllocator) external;
```

See: [SmartOperator.setRewardAllocator](/nodes/staking-pools/contracts/SmartOperator.md#setrewardallocator)

### Role Management

The SmartOperator contract uses role-based access control to delegate operational responsibilities. When you deploy your staking pool, you receive the `VALIDATOR_ADMIN_ROLE`, which allows you to grant and revoke operational roles to other addresses.

| Role                               | Controls                | Key Functions                                 |
| ---------------------------------- | ----------------------- | --------------------------------------------- |
| `REWARDS_ALLOCATION_MANAGER_ROLE`  | Reward allocation       | `queueRewardsAllocation()`                    |
| `COMMISSION_MANAGER_ROLE`          | Commission rate (0-20%) | `queueValCommission()`                        |
| `INCENTIVE_COLLECTOR_MANAGER_ROLE` | Payout amounts          | `queueIncentiveCollectorPayoutAmountChange()` |
| `PROTOCOL_FEE_MANAGER_ROLE`        | Protocol fee (0-20%)    | `setProtocolFeePercentage()`                  |
| `BGT_MANAGER_ROLE`                 | BGT operations          | `queueDropBoost()`, `redeemBGT()`             |

**Role Assignment Strategy:** Assign roles based on your operational needs. For simplicity, grant all roles to your main validator wallet. Alternatively, grant specific roles to different team members, automated systems, or smart contracts for distributed management. This keeps validator keys secure and separate from day-to-day management.

### Setting Minimum Effective Balance

The `minEffectiveBalance` parameter is critical for validator activation and maintaining active status. This value determines when your staking pool becomes eligible to activate its validator on the consensus layer and serves as a safeguard that triggers full exit if your pool's deposits fall below it.

**How the Consensus Layer Minimum Works:**

The consensus layer enforces a base minimum of {{ config.mainnet.minEffectiveBalance }} BERA for validator activation. However, when the validator set is full (all {{ config.mainnet.validatorActiveSetSize }} validator slots are occupied), the actual minimum stake required increases in increments of {{ config.mainnet.stakeMinimumIncrement }} BERA. This dynamic adjustment ensures that validators must compete for entry into the active set when capacity is reached.

You must set `minEffectiveBalance` to match the current minimum stake required on the consensus layer if it exceeds {{ config.mainnet.minEffectiveBalance }} BERA. To determine the current requirement:

1. Check the current number of validators on [Berachain Hub](https://hub.berachain.com/boost/)
2. If the validator set is full ({{ config.mainnet.validatorActiveSetSize }} validators), identify the lowest stake amount among active validators
3. The minimum required stake will be that lowest amount, rounded up to the nearest {{ config.mainnet.stakeMinimumIncrement }} BERA increment
4. You may, of course, choose to go higher

Once your validator reaches the activation threshold (when `activeThresholdReached()` becomes `true`), a cooldown period begins. However, if withdrawals later cause `totalDeposits` to fall below `minEffectiveBalance()`, the pool automatically triggers a full exit (see [Full Exit Management](#full-exit-management)). Setting `minEffectiveBalance` correctly from the start prevents your pool from exiting prematurely while ensuring activation occurs when sufficient stake is available.

```solidity
// Set minimum effective balance (can only be called by SmartOperator)
function setMinEffectiveBalance(uint256 newMinEffectiveBalance) external;
```

See: [SmartOperator.setMinEffectiveBalance](/nodes/staking-pools/contracts/SmartOperator.md#setmineffectivebalance)

## Routine Operations

### Monitor Pool Status

Check key metrics regularly: whether the pool is active, total assets under management, and buffered assets not yet staked.

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

See: [StakingPool.isActive](/nodes/staking-pools/contracts/StakingPool.md#isactive), [StakingPool.bufferedAssets](/nodes/staking-pools/contracts/StakingPool.md#bufferedassets), [StakingPool.isFullyExited](/nodes/staking-pools/contracts/StakingPool.md#isfullyexited), [StakingPool.minEffectiveBalance](/nodes/staking-pools/contracts/StakingPool.md#mineffectivebalance), and [StakingPool.activeThresholdReached](/nodes/staking-pools/contracts/StakingPool.md#activethresholdreached)

### BGT Operations and Protocol Fees

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
3. **Accumulation**: Tokens accumulate in SmartOperator until you manually forward them by calling `claimBoostRewards()`. This function claims any accumulated rewards and transfers all tokens from SmartOperator to IncentiveCollector, where they become available for stakers to claim via the incentive auction mechanism.

**Type 2: BGT Staking Rewards (HONEY)**

1. **Source**: Protocol fees collected from Berachain dApps (such as BEX trading fees) are auctioned for HONEY via the FeeCollector contract. Anyone can claim accumulated protocol fees by paying a fixed amount of HONEY (the payout amount).
2. **Distribution**: When protocol fees are claimed, the HONEY payment is sent to BGTStaker, which distributes it proportionally to all BGT stakers based on their staked BGT balance.
3. **Accumulation**: HONEY rewards accumulate in BGTStaker for your SmartOperator address (since SmartOperator holds BGT)
4. **Claiming**: Handled automatically by `claimBoostRewards()`

**Forwarding to IncentiveCollector:**

Tokens accumulate in SmartOperator and must be manually forwarded to IncentiveCollector before stakers can claim them. Use `claimBoostRewards()` to forward both HONEY rewards from BGT staking and incentive tokens from the boost program to IncentiveCollector in a single operation.

**Incentive Auction Mechanism (Permissionless Claiming):**

1. **Accumulation**: Tokens accumulate in IncentiveCollector from SmartOperator forwarding operations
2. **Permissionless Incentive Auction**: Anyone can call `claim()` with the payout amount (default 100 BERA) to claim **all** accumulated tokens. The buyer may be you (the operator), an arbitrageur monitoring the network, or any other address that finds the pool profitable
3. **Distribution**: The net payout amount (payoutAmount - protocol fee) is sent to StakingRewardsVault for distribution to shareholders and auto-compounded
4. **Protocol Fee**: A fee (based on `protocolFeePercentage`) is deducted from the payout amount and minted as shares to your validator's `defaultShareRecipient`

**Key Points:**

Tokens do not automatically flow to IncentiveCollector, so manual forwarding is required before they can be claimed. The incentive auction mechanism is winner-takes-all, meaning the first buyer to pay the payout amount receives all accumulated tokens. There is no partial claiming available. See [Incentive Collector Payout Requirements](#incentive-collector-payout-requirements) for details on managing payout amounts and checking available balances.

**Validator Commission vs Protocol Fee:**

These are two separate fee mechanisms that work independently:

| Fee Type                 | Range | Where Set                                          | What It Applies To                            | Controlled By                                                |
| ------------------------ | ----- | -------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------ |
| **Validator Commission** | 0-20% | Configured via SmartOperator, enforced by BeraChef | Incentive token distribution from PoL rewards | `COMMISSION_MANAGER_ROLE` via `queueValCommission()`         |
| **Protocol Fee**         | 0-20% | SmartOperator                                      | BGT balance growth                            | `PROTOCOL_FEE_MANAGER_ROLE` via `setProtocolFeePercentage()` |

Both fee structures can be configured independently based on your operational needs.

### Reward Management

The pool automatically handles reward collection and distribution:

```solidity
// Receive rewards from staking rewards vault
function receiveRewards() external payable;

// Mint fee shares for validator
function mintFeeShares(uint256 amount) external;
```

Rewards are collected automatically from the consensus layer as they accrue. Validator fees are minted as shares to the default recipient. All rewards are automatically reinvested through auto-compounding, maximizing returns without manual intervention.

### Incentive Collector Payout Requirements

The IncentiveCollector contract requires buyers to pay a specific amount (default: 100 BERA) when claiming incentive tokens. This mechanism ensures buyers contribute to the pool's rewards while retrieving accumulated incentives.

**How It Works:**

1. Tokens accumulate in IncentiveCollector from SmartOperator forwarding operations
2. Anyone can call `claim()` with the payout amount to claim **all** accumulated tokens
3. Protocol fees are deducted from the payout and minted as shares to your validator
4. The net payout amount is sent to StakingRewardsVault for distribution and auto-compounding

**Managing Payout Amounts:**

```solidity
// Queue a new payout amount (requires INCENTIVE_COLLECTOR_MANAGER_ROLE)
function queueIncentiveCollectorPayoutAmountChange(uint256 newPayoutAmount) external;
```

**Key Considerations:** Balance your emissions versus `payoutAmount` to avoid selling valuable incentives for too little. Higher voting power produces more blocks and emissions. If `payoutAmount` is too low relative to emissions, you may sell valuable tokens below market value. Higher amounts may discourage buyers but contribute more to pool rewards.

**Helper Scripts:**

Additional helper scripts are available in the [install-helpers directory](https://github.com/berachain/guides/tree/main/apps/staking-pools/install-helpers) for operations like requesting withdrawals (`unstake.sh`), managing SmartOperator contracts interactively, and other utilities. See the [install-helpers README](https://github.com/berachain/guides/blob/main/apps/staking-pools/install-helpers/README.md) for complete documentation of all available scripts, including detailed usage instructions for the Smart Operator Manager Python tool.

## Advanced Topics

### Full Exit Management

When your validator fully exits, the withdrawal system handles the transition:

```solidity
// Notify of full exit from consensus layer
function notifyFullExitFromCL(bytes memory pubkey) external;
```

The full exit process operates automatically once triggered. When your validator fully exits from the consensus layer, BGT tokens are automatically redeemed, queued boost operations are cancelled, and pending withdrawals continue processing normally. Once complete, the pool is marked as fully exited, preventing new deposits while allowing existing withdrawals to conclude.

The system automatically triggers a full exit in two scenarios:

- When a withdrawal would cause `totalDeposits` to fall below `minEffectiveBalance()`
- When the withdrawal amount exceeds total deposits (which can occur when share values have appreciated significantly from accumulated rewards)

### Withdrawal System

The centralized WithdrawalVault contract handles all withdrawal operations for all staking pools. The withdrawal system provides two processing paths:

| Path              | When It Occurs                                                         | Processing Time                                                                                     |
| ----------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| **Short-Circuit** | Pool hasn't reached active threshold and has sufficient buffered funds | Funds immediately transferred to WithdrawalVault, but still requires full delay before finalization |
| **Standard**      | Pool has reached active threshold or lacks sufficient buffered funds   | Requires consensus layer processing (256 epochs ≈ 27 hours)                                         |

**Important:** Regardless of which path is taken, stakers must wait the full withdrawal delay (129,600 blocks ≈ 3 days at ~2s block time) before finalization.

**Withdrawal Functions:**

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

// Finalize a single withdrawal request
function finalizeWithdrawalRequest(uint256 requestId) external;

// Finalize multiple withdrawal requests
function finalizeWithdrawalRequests(uint256[] calldata requestIds) external;
```

**Withdrawal Request NFTs:** Each withdrawal request is represented by an ERC721Enumerable NFT ("Berachain Staking Pool Withdrawal Request", symbol "BSPWR"). The request ID returned from withdrawal functions is the same as the NFT token ID. These NFTs are non-transferable and serve as proof of the withdrawal request throughout its lifecycle.

### Building Your Front-End

Your front-end should provide a seamless staking experience, abstracting technical details while clearly showing each staker's position and withdrawal status. The sections below describe the requirements your front-end must meet. Berachain provides a React-based example template in the [guides repository](https://github.com/berachain/guides/tree/main/apps/staking-pools/frontend) that you can use as a starting point, but you should customize it for your needs.

#### Withdrawal Request Management

When stakers request a withdrawal, they receive an ERC721 NFT (token name "Berachain Staking Pool Withdrawal Request", symbol "BSPWR") representing their withdrawal request. The withdrawal request ID returned from `requestWithdrawal()` or `requestRedeem()` is the same as the NFT token ID. Your front-end should:

**Display Withdrawal Status:**

- Show all pending withdrawal requests for the connected wallet
- Display the withdrawal amount and request timestamp
- Calculate and display when each withdrawal will be ready to finalize
- Use `getWithdrawalRequest(requestId)` to retrieve withdrawal details including the `requestBlock` field
- Calculate readiness by checking if `block.number >= (request.requestBlock + 129600)` (129,600 blocks ≈ 3 days at ~2s block time)
- Show a countdown timer or status indicator for pending withdrawals

**Handle Withdrawal Finalization:**

- Automatically detect when withdrawals are ready to finalize
- Provide a clear "Complete Withdrawal" or "Finalize" button when ready
- Support batch finalization using `finalizeWithdrawalRequests([requestId1, requestId2, ...])` for stakers with multiple pending withdrawals
- Show confirmation dialogs before finalizing
- Display transaction status and completion

**NFT Integration:**

- Use standard ERC721Enumerable functions to query staker's withdrawal NFTs:
  - `balanceOf(stakerAddress)` to get the count of pending withdrawals
  - `tokenOfOwnerByIndex(stakerAddress, index)` to enumerate withdrawal request IDs
  - `ownerOf(requestId)` to verify ownership
- Display withdrawal NFTs in the staker's wallet if they use NFT-aware wallets
- Note that these NFTs are non-transferable (they revert on transfer attempts)

Your front-end should handle both withdrawal processing paths transparently. See [Withdrawal System](#withdrawal-system) for details on short-circuit vs standard paths. Regardless of which path is taken, stakers must wait the full withdrawal delay (129,600 blocks ≈ 3 days at ~2s block time) before finalization.

#### Staker Balance and Position Display

Your front-end should clearly display:

- Current BERA balance (including accrued rewards)
- Share balance (stBERA tokens)
- Current share price/value
- Total rewards earned since deposit
- Pool performance metrics (total assets, validator uptime, etc.)

Use `previewRedeem(shares)` and `previewWithdraw(assets)` to show stakers what they'll receive before they initiate withdrawals.

**Calculating Total Rewards Earned:**

Since rewards are automatically compounded into share price, calculate total rewards by comparing the current value of shares to original deposits. Track each deposit amount (which you'll need for transaction history anyway), then: `totalRewardsEarned = previewRedeem(currentShares) - sumOfAllDeposits`.

#### Error Handling and Staker Communication

Your front-end should handle and clearly communicate:

| Error                   | Condition                                                                                   | Front-End Action                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `RequestNotReady`       | Staker tries to finalize before delay completes (129,600 blocks ≈ 3 days at ~2s block time) | Check `request.requestBlock + 129600 <= block.number` before allowing finalization |
| `NotEnoughFunds`        | WithdrawalVault doesn't have enough funds for finalization                                  | Check vault balance before attempting finalization                                 |
| `MaxCapacityReached`    | Pool has reached maximum capacity                                                           | Check if deposits are paused before allowing new deposits                          |
| `StakingPoolFullExited` | Pool has triggered full exit                                                                | Deposits disabled, withdrawals continue normally                                   |

**Note**: Withdrawals are not disabled during the cooldown period after activation. Stakers can request withdrawals at any time, but they cannot finalize them until the delay period completes (129,600 blocks ≈ 3 days after the request was made).

#### Using the Frontend Template

Berachain provides a React-based example template to help you get started building your staking pool front-end. This template is a **starting point and example**—not a production-ready solution. You should customize it to match your branding, add additional features, and ensure it meets your security and UX requirements.

The template is available in the [Berachain guides repository](https://github.com/berachain/guides/tree/main/apps/staking-pools/frontend). For detailed setup instructions, see the [frontend README](https://github.com/berachain/guides/blob/main/apps/staking-pools/frontend/README.md).

**Quick Start:**

1. Clone the repository and navigate to the frontend directory:

   ```bash
   git clone https://github.com/berachain/guides.git
   cd guides/apps/staking-pools/frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the frontend by editing `config.json` or using the helper script (see below).

**Configuration:**

The frontend requires a `config.json` file that specifies:

- **Network settings**: `rpcUrl`, `chainId`, `explorerUrl`
- **Contract addresses**: `withdrawalVault` (required), `stakingPoolFactory` (optional)
- **Pool configuration**: One or more pools with `name`, `validatorPubkey`, `stakingPool`, `enabled`

**Generate Configuration Automatically:**

Use `generate-frontend-config.sh` from the `install-helpers` directory to automatically generate `config.json` from your environment and factory contract lookups:

```bash
cd ../install-helpers
./generate-frontend-config.sh
```

This script reads your `env.sh` configuration and queries the factory contract to generate a complete `config.json` file for your frontend.

**Development and Deployment:**

- Start development server: `npm run dev`
- Build for production: `npm run build`
- Preview production build: `npm run preview`

For external access, run: `npm run dev -- --host 0.0.0.0 --port 3000`

**Tech Stack:**

The template uses React 18, Vite, Viem, and MetaMask for wallet connections. You can modify or replace any of these components based on your needs.

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

**Problem: Stakers reporting withdrawal problems**

**Debug Steps:**

1. **Check Withdrawal Requests**: Use `getWithdrawalRequest(requestId)` to examine specific requests
2. **Verify Processing Time**: Confirm the finalization window has passed for standard withdrawals (256 epochs × 192 blocks/epoch ≈ 27 hours, or 129,600 blocks ≈ 3 days at ~2s block time total delay)
3. **Check Pool Buffer**: Verify sufficient funds available for short-circuit withdrawals
4. **Monitor Withdrawal Events**: Watch for `WithdrawalRequested` and `WithdrawalRequestFinalized` events

**Debugging Commands:**

```solidity
// Get withdrawal request details
WithdrawalRequest memory request = withdrawalVault.getWithdrawalRequest(requestId);
```

For detailed technical information about the smart contracts, see the [Smart Contract Reference](/nodes/staking-pools/contracts).

## Going to Market

Before launching your staking pool to stakers, ensure you have completed the following checklist items to provide a smooth and reliable staking experience.

### Initial Configuration

Configure essential parameters before accepting staker deposits:

- **Set Minimum Effective Balance**: Call `setMinEffectiveBalance()` on your SmartOperator contract to match the current consensus layer requirements. This ensures your pool activates correctly and doesn't exit prematurely. See the [Setting Minimum Effective Balance](/nodes/staking-pools/operators#setting-minimum-effective-balance) section for details on determining the correct value.

- **Set Protocol Fee Percentage**: Call `setProtocolFeePercentage()` on your SmartOperator contract to configure the protocol fee charged on BGT balance growth. This fee is minted as shares to your validator and can be set up to 20%.

### Reward Claiming Automation

Set up automated bots to forward accumulated rewards to IncentiveCollector:

- **Reward Claiming Bot**: Deploy a bot that calls `claimBoostRewards()` on your SmartOperator contract at least once daily. This function forwards both HONEY rewards from BGT staking and incentive tokens from the boost program to IncentiveCollector, where they become available for stakers to claim via the incentive auction mechanism. Regular forwarding ensures stakers have access to accumulated rewards.

### Front-End Interface

Develop or deploy a staker-facing interface that supports:

- **Deposits**: Allow stakers to deposit BERA and receive stBERA shares
- **Position Display**: Show stakers their current BERA balance (including accrued rewards), share balance, share price, and total rewards earned
- **Withdrawal Requests**: Enable stakers to request withdrawals by amount or by shares
- **Withdrawal Finalization**: Display pending withdrawal requests, calculate when they're ready to finalize (after 129,600 blocks ≈ 3 days at ~2s block time), and allow stakers to complete withdrawals

For detailed front-end requirements, see the [Building Your Front-End](/nodes/staking-pools/operators#building-your-front-end) section.

### Cutting Board Updates

If you're participating in the cutting board system, deploy bots that update your cutting board information weekly to keep your validator information current for stakers.

### Foundation Delegation

If you have received a delegation from the Berachain Foundation, you need to manually call the yield harvester function to process delegation-related operations. This is not an automated bot operation and should be handled by the validator admin when needed.

## Delegation System

Some validators are issued a delegation of funds from the Berachain Foundation. For detailed information about working with delegated funds, see the [Delegators Guide](/nodes/staking-pools/delegators) and the [DelegationHandler contract reference](/nodes/staking-pools/contracts/DelegationHandler).
