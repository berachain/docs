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

The following examples leverage the [`delegateStake`](/developers/contracts/reward-vault#delegatestake) functionality of the RewardVault contract. This [guide](/developers/guides/advanced-pol) explains its use in detail.

### Example #1 - Activity-frequency rewards

In this example, we'll consider a case where an application wants to incentivize users to make trades often while still considering the size of the trades to reduce spam. The core idea is to create a staking token that represents active trading participation.

Here's how it works:

- ERC20 token representing active trading participation
- Tracks trades within a 7-day rolling window
- Awards points based on trading frequency and size

Core Mechanics:

- Minimum 5 trades required in the window for rewards
- Daily cap of 20 trades to prevent gaming
- 24-hour cooling period between score mints
- Score calculation considers both trade frequency and size
- Automatic staking of newly minted tokens in the reward vault
