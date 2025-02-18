# Reward Vault Governance

> **NOTE:** For a detailed guide on creating reward vaults and associated governance proposals, see this [blog post](https://blog.berachain.com/blog/creating-a-governance-proposal-for-berachain-reward-vaults).

While creating a [Reward Vault](/learn/pol/rewardvaults) is permissionless, for it to receive `$BGT` emissions from validators, it must be whitelisted through a governance proposal. This process ensures community oversight and alignment over projects joining the Proof-of-Liquidity (PoL) ecosystem.

There are two components to whitelisting a new Reward Vault:

1. Whitelisting the Reward Vault
2. Whitelisting incentive token(s)

These components are typically handled concurrently through a single governance proposal.

## Reward Vault Whitelisting

Reward Vaults are whitelisted on the [BeraChef](/developers/contracts/berachef) contract to make them eligible for receiving `$BGT` emissions:

1. Deploy a reward vault using the [Reward Vault Factory](/developers/contracts/reward-vault-factory), specifying the staking token. This produces a new vault address.

2. Submit and pass a governance proposal for whitelisting the vault, using the vault address obtained from the factory deployment:

```solidity
function setVaultWhitelistedStatus(address receiver, bool isWhitelisted, string memory metadata) external;
```

## Token Whitelisting

Protocols can supply [Incentives](/learn/pol/incentives) to entice validators to direct emissions to their vaults. Incentive tokens must first be whitelisted on the **particular Reward Vault** being incentivized:

1. Prepare the following parameters:

   - Incentive token address
   - Minimum incentive rate - lowest exchange rate between incentive token and `$BGT`
     - Incentive rates below this floor are not accepted
   - Token manager address
     - Account that will control incentive parameters
     - Only one entitled to add incentives to a vault

2. Submit and pass a governance proposal for whitelisting the incentive token, using the vault address obtained from the factory deployment:

```solidity
function whitelistIncentiveToken(address token, uint256 minIncentiveRate, address manager) external
```

:::tip
Each reward vault maintains separate incentive token whitelists
:::

### Governance Process

The above whitelisting procedures are performed through [BGT Governance](/learn/governance/).
