<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Setup Reward Vault

Participating in Proof of Liquidity on Berachain requires the use of a Reward Vault to allow protocol users to earn BGT.
Reward Vaults can be created via the <a :href="config.contracts.pol.rewardVaultFactory.docsUrl">{{config.contracts.pol.rewardVaultFactory.name}}</a> permissionlessly, but require some work to become operational.

![Reward Vault Section](/assets/add-incentives-vaults.png)

## Checklist

All of the following items should be completed for a fully featured reward vault:

:::info
Please see the full [Berachain Reward Vault Requirements & Guidelines](/learn/help/reward-vault-guidelines) for the application process.
:::

- [Create a Reward Vault Request](#create-a-reward-vault-request)
- [Configuring Your Reward Vault](#configuring-your-reward-vault)

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

Additionally, one of the following should be completed:

- [Submit Beradata Form](#submit-beradata-form) **or** [Add Reward Vault Metadata](#add-reward-vault-metadata)

### Add Token Metadata

If your protocol or project has a token associated with it, creating a pull request to the [Berachain Metadata](https://github.com/berachain/metadata) repository will allow it to be displayed as a recognized token.

Follow the instructions provided in the [Contribution Guidelines](https://github.com/berachain/metadata/blob/main/CONTRIBUTING.md#adding-a-token) to add new tokens.

### Create Proof of Liquidity Adapter

A Proof of Liquidity adapter is used to help display a Reward Vault's BGT emission yield.
If your Reward Vault stake token is a plain liquidity pool, you may be able to skip this.

:::tip
If you are uncertain if you need an adapter, you can read this checklist to help you decide:

[When do I need an adapter?](https://github.com/berachain/hub-pol-adapters/blob/main/README.md#when-you-dont-need-an-adapter)
:::

Stake tokens such as ERC-4626 vaults or other custom implementations will require an adapter to help properly price these tokens.

### Submit Beradata Form

Submitting the [Beradata Form](http://betadata-form-webform.vercel.app/) is the simplest and easiest way to set the details of your new Reward Vault in the Hub.

Filling out this form ensures the following information is available so that users can find your Reward Vault:

- Protocol
- Vault Name
- Description
- Logos
- Links

Using the form allows you to skip manually adding the Reward Vault metadata via a pull request.

![Missing Metadata](/assets/add-incentives-reward-vault.png)

:::warning
If you do not submit Reward Vault metadata, The Hub will display only contract addresses and make your Reward Vault harder to find.
:::

### Add Reward Vault Metadata

Alternatively, if you are unable to or do not wish to use the form, Reward Vault metadata can be submitted via a pull request to the [Berachain Metadata](https://github.com/berachain/metadata) repository.

Follow the instructions provided in the [Contributing Guidelines](https://github.com/berachain/metadata/blob/main/CONTRIBUTING.md#adding-a-vault) to add new reward vaults.
