# Reward vaults

Reward vaults are smart contracts in which users can stake their Proof of Liquidity (PoL) eligible assets in order to receive `$BGT` rewards. Reward vaults are the only way in which anyone can earn `$BGT` rewards, and therefore serve the important function of gating entry into the PoL ecosystem.

Reward vaults are as a key piece of infrastructure that allows protocols to leverage PoL, allowing teams to incentivize users' actions in exchange for BGT. A protocol can have multple reward vaults, each with its own PoL-eligible asset to be staked. For example, BEX can have multiple pools earning BGT, each with its own reward vault and respective PoL-eligible asset.

:::tip
A different reward vault contract exists for each PoL-eligible asset
:::

## User Interactions

**Staking in a Reward Vault**

![Reward Vaults](/assets/reward-vaults.png)

In order to recieve BGT, a user must be staking the PoL-eligible asset in its reward vault. The protocol that deployed the reward vault is able to decide how the user acquires the PoL-eligible asset to stake. The idea is that protocols would leverage this to attract liquidity or stimulate activity, and in return award users with the asset they can stake in their vault. 

1. The user takes some action that results in reciving a PoL-eligible asset, generally referred to as a receipt token.
2. The user stakes the PoL-eligible asset in the corresponding vault.
3. The user earns a portion of all the BGT emitted to that vault.


**Earning BGT**

![Reward Vaults](/assets/reward-vault-staking.jpg)

The amount of `$BGT` rewards a user earns from a reward vault is a function of:

1. The user's share of total assets staked in the reward vault
2. The amount of `$BGT` rewards emitted to the reward vault

After staking assets in a reward vault, users are free to claim the earned rewards, add to their deposits, or withdraw their assets whenever they wish.

$BGT farming with reward vaults is meant to resemble familiar DeFi actions, providing a low barrier to entry for regular users.

## How `$BGT` Ends up in Reward Vaults

![Reward Vaults](/assets/cuttingboard.png)

Validators direct some portion of their `$BGT` emissions to specific reward vaults of their choice.

To understand why validators would choose to emit `$BGT` to a particular reward vault over another, refer to [Incentives in PoL](/learn/pol/incentives), which discusses how protocols can influence validator behavior with economic incentives.

## Creation of New Reward Vaults

New Reward Vaults can be created permissionlessely, but must go through the Reward Vaults Whitelisting process, conducted by `$BGT` governance in order to be eligible to recieve `$BGT` from validators. Developers or protocols can submit a proposal to whitelist a new reward vault for a specific PoL-eligible asset. If the proposal passes, the vault address is added to the list of approved reward vaults that validators can direct `$BGT` emissions to.

More information will be provided on how to submit a proposal for whitelisting in the near future.
