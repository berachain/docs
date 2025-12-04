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

- **Deposited**: Validator makes initial deposit and establishes identity
- **Eligible**: After 1 epoch, validator becomes eligible for activation
- **Active**: Validator joins the active set and can propose blocks (earning rewards)
- **Exited**: If network capacity is reached, validators with lower priority are exited
- **Withdrawn**: After 1 epoch in exited state, validator funds are returned

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
A typical deposit might involve 1,000 BERA with a gas fee of approximately 0.001 BERA. The minimum deposit is 1 gwei, though capacity limits may apply based on pool configuration.

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

Monitor your pool's performance:

- **Share Price**: Your shares' value in BERA
- **Total Rewards**: Accumulated rewards since deposit
- **Pool Growth**: Total assets under management
- **Validator Performance**: Uptime and reward generation

### Reward Distribution

Rewards accrue automatically and are reflected in your share value:

- **Block Rewards**: BERA from consensus participation
- **BGT Rewards**: Used by the operator to boost validator rewards
- **Incentive Tokens**: Converted to BERA by the operator
- **Auto-Compounding**: Reflected in rising share value

## Request Withdrawal

### Withdrawal Processing

The withdrawal system provides two processing paths depending on the pool's current state and available funds. When you request a withdrawal, the system first checks if sufficient funds are available in the pool's buffer. If the pool has enough buffered BERA and hasn't reached the active threshold, your withdrawal is processed immediately through the short-circuit path, transferring BERA directly to your wallet without any waiting period.

However, if the pool has reached its active threshold or doesn't have sufficient buffered funds, your withdrawal follows the standard path through the consensus layer. This process requires approximately 3 days (129,600 blocks) to complete, as the withdrawal must be processed by the consensus layer before the BERA becomes available in your wallet. Additionally, there is a cooldown period of approximately 3 days (129,600 blocks) after a validator reaches its active threshold, during which withdrawals are disabled to ensure network stability. The system automatically determines which path your withdrawal will take based on the pool's current state and available liquidity.

### Step 1: Initiate Withdrawal Request

When you want to exit your position, open the pool interface and choose Withdraw. You can withdraw by amount (BERA) or redeem by shares. Confirm in your wallet. Any required fees are shown before confirmation.

**Example Withdrawal Request:**
A typical withdrawal might involve 1,050 BERA (your original 1,000 BERA plus 50 BERA in rewards) with a withdrawal fee of 0.001 BERA for gas. Processing time is approximately 3 days (129,600 blocks) if consensus layer processing is required.

### Step 2: Receive Withdrawal NFT

After requesting withdrawal, the system issues you a withdrawal receipt (NFT) representing your request. This NFT serves as proof of your withdrawal request and allows you to track its status.

**Withdrawal NFT Details:**
Each withdrawal request receives a unique token ID and the NFT cannot be transferred to other addresses. The NFT shows whether your withdrawal is pending or ready for finalization, serving as on-chain proof of your withdrawal request.

### Step 3: Complete Withdrawal

After the processing period, click Finalize Withdrawal in the UI to claim BERA back to your wallet.

**Parameters:**

- `requestId`: Your withdrawal request ID (from the NFT)
- `requestIds`: Array of withdrawal request IDs to finalize

## Understanding Fees

### Withdrawal Fees

Withdrawals may incur fees:

- **Network Fees**: Gas costs for transactions
- **Withdrawal Fees**: Dynamic fees based on network congestion
- **Processing Time**: Longer delays during high withdrawal volume

### Validator Commission

Validators may charge commission on your rewards. Commission is set and managed by the operator and is capped at 20% (2,000 basis points) as defined by BeraChef. You can view the current commission rate in the pool UI. 

## Pool Limits and Restrictions

### Capacity Limits

Each staking pool has limits configured by the operator:

- **Maximum Capacity**: e.g., 10,000,000 BERA per validator
- **Minimum Balance**: 250,000 BERA effective balance threshold (affects validator lifecycle)
- **Pool Pausing**: Pools may pause deposits when capacity is reached

### Full Exit Scenarios

Pools may trigger full exit when:

- **Below Minimum**: Effective balance falls below 250,000 BERA
- **Large Withdrawal**: A withdrawal would breach the minimum threshold
- **Emergency**: Governance or validator triggers full exit

### Impact of Full Exit

During full exit:

- **New Deposits**: Disabled
- **Existing Stakes**: Continue earning rewards until exit completes
- **Withdrawals**: Process normally
- **BGT Management**: Automatic unboost and burn of BGT rewards
