<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Setup Reward Vault

Participating in Proof of Liquidity on Berachain requires the use of a Reward Vault to allow protocols to reward users for taking certain actions.
Reward Vaults can be created via the <a :href="config.contracts.pol.rewardVaultFactory.docsUrl">{{config.contracts.pol.rewardVaultFactory.name}}</a> permissionlessly, but require some work to become operational.

![Reward Vault Section](/assets/add-incentives-vaults.png)

## Checklist

All of the following items should be completed for a fully featured reward vault:

:::info
Please see the full [Berachain Reward Vault Requirements & Guidelines](/learn/help/reward-vault-guidelines) for the application process.
:::

- [Create a Reward Vault](#create-a-reward-vault)
- [Create a Reward Vault Request](#create-a-reward-vault-request)
- [Configuring Your Reward Vault](#configuring-your-reward-vault)

## Create a Reward Vault

The primary way to create a Reward Vault is through the [Berachain Hub](https://hub.berachain.com/earn/create). This provides a user-friendly interface for deploying Reward Vaults on mainnet.

![Hub Create Reward Vault](/assets/hub-create-reward-vault.png)

### Alternative: Using the Playground

For testing purposes, you can create a Reward Vault using our <a target="_blank" :href="config.bepolia.dapps.playground.url + 'create-reward-vault?utm_source=docsCore'">{{config.bepolia.dapps.playground.name}} Create Reward Vault tool</a>. This provides an easy-to-use interface for deploying a Reward Vault on Bepolia testnet.

![Bepolia Playground Create Reward Vault](/assets/bepolia-playground-create-reward-vault.png)

### Using BeraScan

Alternatively, you can create a Reward Vault directly through <a target="_blank" :href="config.bepolia.dapps.berascan.url + '?utm_source=docsCore''">{{config.bepolia.dapps.berascan.name}}</a> by interacting with the <a target="_blank" :href="config.contracts.pol.rewardVaultFactory.docsUrl + '?utm_source=docsCore'">{{config.contracts.pol.rewardVaultFactory.name}}</a> contract at <a target="_blank" href="https://berascan.com/address/0x94Ad6Ac84f6C6FbA8b8CCbD71d9f4f101def52a8 + '?utm_source=docsCore'">0x94Ad6Ac84f6C6FbA8b8CCbD71d9f4f101def52a8</a>.

![Create Reward Vault on BeraScan](/assets/create-reward-vault-berascan.png)

To create a Reward Vault via BeraScan:

1. **Connect your wallet** to BeraScan
2. **Click the contract link** to go directly to the <a target="_blank" href="https://berascan.com/address/0x94Ad6Ac84f6C6FbA8b8CCbD71d9f4f101def52a8 + '?utm_source=docsCore'">Reward Vault Factory contract</a>
3. **Invoke the `createRewardVault` function** with your staking token address as the parameter
4. **Confirm the transaction** to deploy your Reward Vault

### Using Solidity Scripts

Alternatively, you can create a Reward Vault using a Solidity script with development frameworks such as Forge or Hardhat. This approach is ideal for developers who want to integrate Reward Vault creation into their deployment pipeline or create multiple vaults programmatically.

## Create a Reward Vault Request

Utilizing the Reward Vault functionality is currently a permissioned process and conducted via Governance as part of Phase One.
More information about Phase One is available on the [Berachain Forums](https://hub.forum.berachain.com/t/governance-phase-one-is-here/30).

Creating a reward vault request consists of two parts:

- Request For Reward Vault (RFRV) Form submission
- Governance proposal

An RFRV can be submitted by filling out the [Request For Reward Vault](https://ufdx3v8g7qg.typeform.com/to/yqOvlUrV?typeform-source=docs.berachain.com) form.

A governance proposal may be submitted on the [Berachain Forums](https://hub.forum.berachain.com/c/reward-vaults/6).
Any request submitted should conform to the RFRV format.

## Configuring Your Reward Vault

[The Hub](https://hub.berachain.com) contains information for all Reward Vaults in the Berachain ecosystem.
Users may stake, withdraw, and claim rewards via The Hub - making it important for interacting with Reward Vaults.

As a result, for the best user experience and protocol or project discoverability, the following are suggested:

- [Add Token Metadata](#add-token-metadata)
- [Create Proof of Liquidity adapter](#create-proof-of-liquidity-adapter)

Additionally, the following should be completed:

- [Add Reward Vault Metadata](#add-reward-vault-metadata)

### Add Token Metadata

If your protocol or project has a token associated with it, creating a pull request to the [Berachain Metadata](https://github.com/berachain/metadata) repository will allow it to be displayed as a recognized token.

Follow the instructions provided in the [Contribution Guidelines](https://github.com/berachain/metadata/blob/main/CONTRIBUTING.md#adding-a-token) to add new tokens.

:::tip Additional Token Information
If you want to update your token information on Berascan (the block explorer), see our [Berascan Token Update Guide](/learn/guides/berascan-token-update) for step-by-step instructions on how to verify ownership and submit token updates.
:::

### Create Proof of Liquidity Adapter

A Proof of Liquidity adapter is used to help display a Reward Vault's BGT emission yield.
If your Reward Vault stake token is a plain liquidity pool, you may be able to skip this.

For detailed information on creating adapters, see the [Hub PoL Adapters repository](https://github.com/berachain/hub-pol-adapters).

:::tip
If you are uncertain if you need an adapter, you can read this checklist to help you decide:

[When do I need an adapter?](https://github.com/berachain/hub-pol-adapters/blob/main/README.md#when-you-dont-need-an-adapter)
:::

Stake tokens such as ERC-4626 vaults or other custom implementations will require an adapter to help properly price these tokens.

### Add Reward Vault Metadata

Reward Vault metadata can be submitted via a pull request to the [Berachain Metadata](https://github.com/berachain/metadata) repository.

Follow the instructions provided in the [Contributing Guidelines](https://github.com/berachain/metadata/blob/main/CONTRIBUTING.md#adding-a-vault) to add new reward vaults.
