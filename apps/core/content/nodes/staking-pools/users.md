---
head:
  - - meta
    - property: og:title
      content: Staking Pools User Guide
  - - meta
    - name: description
      content: How to stake BERA through validator staking pools
  - - meta
    - property: og:description
      content: How to stake BERA through validator staking pools
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Staking Pools User Guide

This guide explains how to stake BERA through validator-operated staking pools, enabling you to participate in network security while earning rewards. Staking pools represent a user-friendly approach to participating in Berachain's consensus mechanism while maintaining flexibility and transparency.

## What Are Staking Pools?

Staking pools allow you to stake BERA with specific validators through smart contracts, creating a more accessible and flexible staking experience. When you deposit BERA into a staking pool, you receive shares representing your stake in that validator's pool. These shares automatically increase in value as the validator earns rewards, providing you with a liquid representation of your staking position.

### How Validators Work

Validators in Berachain follow a specific lifecycle that affects your staking experience:

1. **Deposited**: Validator makes initial deposit and establishes identity
2. **Eligible**: After 1 epoch, validator becomes eligible for activation
3. **Active**: Validator joins the active set and can propose blocks (earning rewards)
4. **Exited**: If network capacity is reached, validators with lower priority are exited
5. **Withdrawn**: After 1 epoch in exited state, validator funds are returned

Your staking pool automatically manages this lifecycle, ensuring your stake remains active and earning rewards as long as the validator is operational.

The key benefits of staking pools include lower barriers to entry, as you can stake any amount without worrying about validator minimums. The auto-compounding feature ensures that all rewards are automatically reinvested, maximizing your returns over time. Professional management by validators handles the technical operations, allowing you to focus on your investment strategy. The liquid staking nature means you receive shares representing your position, and you have flexible withdrawal options that let you exit your position at any time.

## Find a Staking Pool

### Available Pools

Staking pools are operated by individual validators, each offering their own unique approach to staking services. You can find pools through validator websites, community channels like Discord and Telegram, DeFi platforms with staking integrations, and community-maintained validator directories. Each pool provides information about the commission rate charged on your rewards (0-20%), total pool size and capacity limits, historical performance and uptime metrics, and active support channels and community engagement.

### Choosing a Pool

Selecting the right staking pool requires careful consideration of several factors that can significantly impact your staking experience and returns. Validator reputation is perhaps the most important factor, as you'll want to research the validator's history and community standing to ensure they're reliable and trustworthy. Commission rates directly affect your returns, with lower rates meaning more rewards stay in your pocket.

Pool performance metrics provide insights into historical returns and consistency, helping you understand what to expect from your investment. Community engagement is another important consideration, as active communities often provide better support and communication. Finally, transparency in operations ensures you have clear visibility into how your funds are being managed and how decisions are made.

:::tip
Look for validators with strong community engagement and transparent operations. Many validators maintain active Discord channels or other community spaces where you can ask questions and stay updated.
:::

## Deposit BERA

### Step 1: Connect Your Wallet

The first step in staking through a pool is ensuring your wallet is properly connected to the Berachain network. You'll need to have sufficient BERA for both your intended stake and gas fees to cover the transaction costs. Most wallets will automatically detect Berachain if it's configured in your network settings.

### Step 2: Approve the Transaction

With your wallet connected, open the validator's staking pool interface (typically a web application or dApp), choose Deposit, enter your amount, and confirm in your wallet.

**Example Transaction:**
A typical deposit might involve 1,000 BERA with a gas fee of approximately 0.001 BERA. The minimum deposit is 1 gwei, though capacity limits may apply based on pool configuration. Note that when deposits are staked to the consensus layer, amounts are rounded down to the nearest 1 gwei, as the consensus layer only accepts deposits in multiples of 1 gwei.

### Step 3: Receive Shares

After a successful deposit, you'll receive shares representing your proportional ownership in the pool. These shares automatically increase in value as the pool earns rewards.

**Example Share Calculation:**
If a pool has 100,000 BERA in total assets and you deposit 1,000 BERA, you'll receive 1,000 stBERA shares representing 1% of the pool. Initially, each share is worth 1 BERA, but this value increases as the pool earns rewards.

### Share Accounting

The share system provides a transparent and fair way to track your stake and rewards. Your initial shares are calculated based on your deposit amount and the current share price at the time of deposit. As rewards accrue to the pool, your shares maintain the same quantity but increase in BERA value, reflecting the growth of your investment. The auto-compounding feature ensures that all rewards are automatically reinvested, maximizing your returns over time.

## Monitor Your Position

### Check Your Balance

Use the pool UI or supported dApp to view your BERA balance (including rewards), share balance, and total pool assets.

### Track Performance

Monitor your pool's performance by tracking your shares' value in BERA, which reflects the current share price. You can also monitor your total rewards accumulated since deposit, giving you insight into your returns over time. Pool growth metrics show total assets under management, indicating how the pool is expanding. Validator performance metrics including uptime and reward generation help you understand how effectively your chosen validator is operating.

### Reward Distribution

Rewards accrue automatically and are reflected in your share value. Block rewards in BERA come from consensus participation, providing a steady stream of rewards as the validator proposes blocks. BGT rewards are used by the operator to boost validator rewards, enhancing the pool's overall performance. Incentive tokens from Proof of Liquidity programs are converted to BERA by the operator and added to the pool. All of these rewards are automatically compounded, reflected in the rising value of your shares without requiring any manual action on your part.

## Request Withdrawal

### Withdrawal Processing

When you request a withdrawal, the system creates a withdrawal request that you can track in the pool interface. The withdrawal process takes approximately 3 days to complete, regardless of the pool's current state. During this time, your withdrawal request is processed and prepared for finalization.

The pool interface will show you the status of your withdrawal request, including when it will be ready to finalize. Some withdrawals may be processed faster if the pool has sufficient buffered funds available, but you'll still need to wait the full processing period before you can complete the withdrawal. If a validator has recently reached its active threshold, there may be a brief cooldown period during which new withdrawal requests are temporarily disabled to ensure network stability.

### Step 1: Initiate Withdrawal Request

When you want to exit your position, open the pool interface and choose Withdraw. You can withdraw by amount (BERA) or redeem by shares. Confirm in your wallet. Any required fees are shown before confirmation.

**Example Withdrawal Request:**
A typical withdrawal might involve 1,050 BERA (your original 1,000 BERA plus 50 BERA in rewards) with a withdrawal fee of 0.001 BERA for gas. Processing time is approximately 3 days (129,600 blocks) if consensus layer processing is required.

### Step 2: Track Your Withdrawal

After requesting withdrawal, you'll see your withdrawal request appear in the pool interface. The interface will show you the withdrawal amount, when it was requested, and when it will be ready to finalize. You can check back at any time to see the status of your withdrawal request.

### Step 3: Complete Withdrawal

After approximately 3 days, your withdrawal will be ready to finalize. The pool interface will clearly indicate when your withdrawal is ready, typically showing a countdown timer or status indicator. When ready, simply click the "Complete Withdrawal" or "Finalize" button in the interface. If you have multiple pending withdrawals, you can finalize them all at once if the interface supports batch finalization. Once finalized, your BERA will be transferred to your wallet and the withdrawal process is complete.

## Understanding Fees

### Withdrawal Fees

Most withdrawals require a fee, which can be as little as 1 wei. A higher fee will prioritize that withdrawal, as only a limited number can be in flight at any time.

### Validator Commission

Validators may charge commission on your rewards. Commission is set and managed by the operator and is capped at 20%. You can view the current commission rate in the pool UI.

## Pool Limits and Restrictions

### Capacity Limits

Each staking pool has limits configured by the operator. The maximum capacity is typically 10,000,000 BERA per validator, though this can vary. The minimum balance threshold is 250,000 BERA effective balance, and if the pool falls below this threshold, the validator will exit. Pools may pause deposits when capacity is reached to prevent over-subscription.

### Full Exit Scenarios

Pools may trigger full exit in several situations. If the effective balance falls below 250,000 BERA, the pool will exit to protect users. A large withdrawal can also trigger full exit if it would breach the minimum threshold or if the withdrawal amount exceeds total deposits, which can occur when share values have appreciated significantly from accumulated rewards. Finally, governance or the validator operator can trigger a full exit in emergency situations.

### Impact of Full Exit

When a pool triggers full exit, new deposits are disabled to prevent further stake accumulation. However, existing stakes continue earning rewards until the exit process completes, ensuring that current stakers are not penalized. Withdrawals continue to process normally throughout the exit period, allowing users to exit their positions as needed. The system automatically handles BGT management by unboosting and burning BGT rewards as part of the exit process, ensuring a clean transition out of the active validator set.
