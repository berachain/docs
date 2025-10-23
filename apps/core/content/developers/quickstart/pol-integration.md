---
head:
  - - meta
    - property: og:title
      content: Building with Proof of Liquidity
  - - meta
    - name: description
      content: Learn how to integrate your dApp with Berachain's Proof of Liquidity system for incentivizing user activity
  - - meta
    - property: og:description
      content: Learn how to integrate your dApp with Berachain's Proof of Liquidity system for incentivizing user activity
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Building with Proof of Liquidity

Proof of Liquidity (PoL) is Berachain's innovative consensus mechanism that rewards users for performing actions that protocols desire. This system enables developers to create sophisticated incentive structures that can drive user engagement and protocol growth by rewarding a wide range of activities - from providing liquidity and on-chain interactions to real-world actions that benefit the protocol.

PoL can be implemented in two primary ways: **base-level staking** where ERC20 tokens representing liquidity positions or other protocol interactions are staked to earn BGT rewards, or **direct action incentivization** where specific user behaviors are rewarded without requiring traditional staking mechanisms. This flexibility allows developers to design custom incentive models that align with their protocol's unique value proposition and user engagement goals.

## Incentivizing Your Users

It is easy to incentivize users on-chain performing actions such as providing liquidity to a lending market or an AMM (DEX) or other actions that return a receipt token proportional to the action taken. These actions are easily rewarded with the basic staking implementation of the reward vault and are the traditional use case for Proof of Liquidity.

Below are some examples of activities you can incentivize:

| Activity to incentivize | ERC20 minting logic                                  | Basic PoL |
| ----------------------- | ---------------------------------------------------- | --------- |
| Providing liquidity     | minting LP tokens proportional to liquidity provided | ✅        |
| Lending assets          | minting receipt tokens proportional to assets lent   | ✅        |
| Trading activity        | minting based on trading frequency/volume            | ❌        |
| Content creation        | minting based on post engagement metrics             | ❌        |
| Gaming                  | minting based on playtime/achievements               | ❌        |
| NFT usage               | minting based on time NFTs are actively used         | ❌        |
| Education               | minting based on course completion                   | ❌        |

While the activities marked with ❌ require more complex implementations, they are still fully supported by Berachain's PoL system. These non-basic PoL integrations work through contracts built on top of reward vaults to help facilitate distribution of rewards for more sophisticated incentive patterns. Berachain provides examples of these patterns on the <a target="_blank" :href="config.mainnet.dapps.playground.url">playground</a> if you're interested in understanding how to incentivize more complex actions to reward your users.

## Basic Proof of Liquidity

The following examples show different RewardVault functions that developers commonly use for various integration patterns:

### Basic User Staking (`stake`)

**Use Case**: Users directly stake their own tokens to earn BGT rewards.

```solidity
// User stakes their own tokens
function stakeUserTokens(uint256 amount) external {
    activityToken.transferFrom(msg.sender, address(this), amount);
    activityToken.approve(address(rewardVault), amount);
    rewardVault.stake(amount);
}
```

**When to use**: Simple cases where users manage their own staking positions.

### Protocol Staking for Users (`stakeOnBehalf`)

**Use Case**: Automated staking services where protocols stake tokens for users without requiring delegation setup.

```solidity
// Protocol stakes tokens for user automatically
function autoStakeForUser(address user, uint256 amount) external onlyAuthorized {
    activityToken.transferFrom(user, address(this), amount);
    activityToken.approve(address(rewardVault), amount);
    rewardVault.stakeOnBehalf(user, amount);

    emit AutoStaked(user, amount);
}
```

**When to use**: DeFi protocols, yield aggregators, or automated staking services.

### Delegated Staking (`delegateStake`)

**Use Case**: Protocols that need to stake on behalf of users with more complex delegation logic.

```solidity
// Protocol delegates staking for institutional users
function institutionalStake(address institution, uint256 amount) external {
    require(isApprovedInstitution[institution], "Not approved");

    activityToken.transferFrom(msg.sender, address(this), amount);
    activityToken.approve(address(rewardVault), amount);
    rewardVault.delegateStake(institution, amount);
}
```

**When to use**: Institutional services, custody solutions, or complex delegation patterns. See the [advanced PoL guide](/developers/guides/advanced-pol) for details.

### Streaming Rewards (`getPartialReward`)

**Use Case**: Streaming or vesting protocols that claim BGT gradually over time.

```solidity
// Stream BGT rewards to users over time
function claimStreamedRewards(address user) external {
    uint256 claimable = calculateClaimableAmount(user);
    require(claimable > 0, "No rewards claimable");

    rewardVault.getPartialReward(user, user, claimable);
    updateStreamingState(user, claimable);
}
```

**When to use**: Vesting contracts, streaming protocols, or dollar-cost averaging strategies.

### Activity-frequency rewards

**Use Case**: Incentivizing trading activity with automatic staking of newly minted tokens.

```solidity
// Mint and automatically stake tokens based on trading activity
function rewardTradingActivity(address trader, uint256 tradeVolume) external {
    uint256 tokensToMint = calculateActivityTokens(trader, tradeVolume);

    activityToken.mint(address(this), tokensToMint);
    activityToken.approve(address(rewardVault), tokensToMint);
    rewardVault.stakeOnBehalf(trader, tokensToMint);
}
```

Core Mechanics:

- Tracks trades within a 7-day rolling window
- Awards points based on trading frequency and size
- Automatic staking of newly minted tokens

## Complex Proof of Liquidity Integrations

For more sophisticated incentive patterns, Berachain provides advanced examples on the playground that demonstrate how to build contracts on top of reward vaults to facilitate complex reward distribution. The playground includes live demos and interactive examples for immediate testing.

::: tip Playground Deployment
If you would like to try any of these complex integrations, the playground has wizards for deployment that allow for immediate testing and experimentation.
:::

### Reward Vault Manager with Merkle Proofs

Advanced reward vault manager with Merkle proof-based distribution for efficient and verifiable reward allocation. This system enables gas-efficient distribution of rewards to large numbers of users through cryptographic proofs, making it ideal for airdrops, retroactive rewards, or any scenario requiring precise reward distribution to specific addresses.

<a target="_blank" :href="config.mainnet.dapps.playground.url + 'reward-vault-manager-merkle'">Explore Merkle Manager →</a>

### Reward Vault Loot Boxes

NFT-based loot boxes using Pyth Entropy for provably fair randomness. This integration demonstrates how to create gamified reward mechanisms where users can earn randomized rewards through NFT-based loot boxes, combining the excitement of gaming with the utility of BGT rewards.

<a target="_blank" :href="config.mainnet.dapps.playground.url + 'reward-vault-loot-boxes'">Explore Loot Boxes →</a>

### Real-Time Rewards

Deploy and manage real-time BGT rewards distribution with instant payout system. This system enables immediate reward distribution for actions that require instant gratification, such as gaming achievements, real-time trading rewards, or any activity where delayed rewards would diminish user experience.

<a target="_blank" :href="config.mainnet.dapps.playground.url + 'real-time-rewards'">Explore Real-Time Rewards →</a>
