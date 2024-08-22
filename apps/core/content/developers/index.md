# Proof of Liquidity Architecture

![PoL Overview For Devs](/assets/pol-overview-devs.png)

The above diagram gives an overview of how the main Proof of Liquidity (PoL) contracts interact with one another.

## BeraChef.sol

The BeraChef contract is responsible for storing the preferences of validators for distributing `$BGT` emissions to reward vaults. A few key terms are important to understand in the BeraChef contract:

- `CuttingBoard`: Every validator has their own cutting board, which is used to store their preferences and weights for the reward vaults to which `$BGT` is distributed when selected to propose a block.
- `FriendsOfTheChef`: These are addresses that are eligible to receive weights from cutting boards. In other words, this is the set of whitelisted [Reward vaults](/learn/pol/rewardvaults)

### Key Functions

`queueNewCuttingBoard`: This function allows validators to set a cutting board distribution for a future block. This is callable only by the validator. `activateQueuedCuttingBoard` is called by the `Distributor` contract the next time the validator is selected to propose a block, activating it.

`getActiveCuttingBoard`/`getQueuedCuttingBoard`: These functions return the active/queued cutting board for a given validator.

`updateFriendsOfTheChef`: This function updates the status of whether a `$BGT` receiver/Reward Vault is whitelisted or not. This is callable only by the governance module.

## Distributor.sol

The Distributor contract is responsible for distributing the block rewards from the reward controller. Each coinbase has its own cutting board, if it does not exist, a default cutting board is used. And if governance has not set the default cutting board, the rewards are not minted and distributed.

### Key Functions

`distributeFor`: Is called for distributing `$BGT` rewards to the cutting board receivers of the given validator. The prover serves the purpose of proving that the given validator has indeed proposed a given block to the `Distributor` contract to correspondingly distribute rewards.

## BerachainRewardsVault.sol

Colloquially known as _Reward Vaults_. Reward Vaults are contracts in which users can stake their Proof of Liquidity (PoL) eligible assets in order to receive `$BGT` rewards. Reward Vaults additionally store incentives provided by protocols to distribute to validators upon receiving `$BGT`.

### Key Functions

`addIncentive`: This function allows the addition of a specified amount of an incentive token to be distributed at a specified rate per BGT emission. Incentive tokens must first be whitelisted by governance through `whitelistIncentiveToken`, defining a minimum incentive rate for that token.

`stake`: This function allows users to stake their PoL eligible assets in order to receive `$BGT` rewards.

`withdraw`: This function allows users to withdraw their staked assets from the Reward Vault.

## BGT.sol

The BGT contract is responsible for handling all things related for `$BGT` and it is owned by the governance module. `$BGT` can be minted only by the `BlockRewardController` contract. A few key terms are important to understand in the BGT contract:

- `boosts`: `$BGT` holders can boost the rewards of validators, allowing them to direct more `$BGT` emissions for proposed blocks. Boosting is also referred to as "delegation". `$BGT` holders can apply their boosts to more than one validator.
- Sender whitelist: `$BGT` is non-transferrable and can only be sent by whitelisted addresses (such as the `$BGT` -> `$BERA` burner contract). This is to ensure that `$BGT` is only distributed to those who earn it through PoL.

### Key Functions

`queueBoost`: This function allows `$BGT` holders to queue a boost for a validator. This is callable only by the `$BGT` holder.

`activateBoost`: This function brings into effect all of the queued and active boosts for a given validator. Updates to validators' boosts can be applied only after `8191` blocks have passed since the last update. This is to avoid aggressive redelegations.

## BlockRewardController.sol

The main function of the BlockRewardController contract is to manage the reward rate for the Bera Governance Token (`$BGT`) and to handle the minting and distribution of `$BGT` rewards.

### Key Functions

`processRewards`: This function handles the calculation and distribution of rewards for a given block. It calculates the rewards based on the base rate, reward rate, and any boosts provided by validators, then mints and distributes the calculated BGT tokens. This function is called by the `Distributor` contract.
