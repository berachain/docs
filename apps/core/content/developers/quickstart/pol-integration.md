# Integrating your dApp with Proof of Liquidity

This page showcases creative ways to leverage PoL for incentivizing user activity, illustrated with code samples:

- [Integrating your dApp with Proof of Liquidity](#integrating-your-dapp-with-proof-of-liquidity)
  - [Flexible Design](#flexible-design)
  - [Examples](#examples)
    - [Example #1 - Activity-frequency rewards](#example-1---activity-frequency-rewards)

## Flexible Design

From the perspective of an application on Berachain, the PoL system is fundamentally a mechanism that works in the following way:

1. A [Reward Vault](../../learn/pol/rewardvaults.md) smart contract that targets an ERC20 token
2. Users stake the designated ERC20 in this vault
3. The vault distributes BGT rewards proportionally to its stakers

The development work for all PoL integrations essentially boils down to:

1. Deploying a Reward Vault from the [Factory](../contracts/reward-vault-factory.md)
2. Designing an ERC20 token that is minted when users perform actions you would like to incentivize
3. Having these ERC20 positions staked in your Reward Vault

All `RewardVault` contracts are deployed using the `RewardVaultFactory` contract and therefore follow a standardized implementation. Teams cannot modify the RewardVault logic. This means all reward customization needs to happen at the staking token level, **not the vault level**. Determining allocation of rewards must happen at the staking token level, fully defined by your app. The vault only uses the ERC20 balances of the staking token to distribute BGT proportionally.

Below are some examples of this pattern. If you wanted to incentivize:

| Activity to incentivize | ERC20 minting logic                          |
| ----------------------- | -------------------------------------------- |
| Trading activity        | minting based on trading frequency/volume    |
| Content creation        | minting based on post engagement metrics     |
| Gaming                  | minting based on playtime/achievements       |
| NFT usage               | minting based on time NFTs are actively used |
| Education               | minting based on course completion           |

The creativity comes in:

- What behavior you want to incentivize
- How you design the ERC20's minting logic to accurately capture that behavior
- How you prevent gaming of the system
- How you make the rewards meaningful enough to drive behavior while being sustainable

## Examples

The following examples show different RewardVault functions that developers commonly use for various integration patterns:

### Example #1 - Basic User Staking (`stake`)

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

### Example #2 - Protocol Staking for Users (`stakeOnBehalf`)

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

### Example #3 - Delegated Staking (`delegateStake`)

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

### Example #4 - Streaming Rewards (`getPartialReward`)

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

### Example #5 - Activity-frequency rewards

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
