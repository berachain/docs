<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Add Incentives For Reward Vault

The following guide will walk you through the process of adding Incentives to existing Berachain Whitelisted Reward Vault with a Whitelisted Incentive Token. If you'd like to understand additional mechanics, see the [Incentives](/learn/pol/incentives) section for more detials.

## Requirements

- Whitelisted Reward Vault with Whitelisted Incentive Token
- Must be connected with [Token Manager](/learn/pol/incentives#incentive-token-managers) wallet

:::note Commission cap
A validator's commission on incentive tokens is capped at **20 %** (`MAX_COMMISSION_RATE = 0.2e4`).  
Queuing a commission above the cap **reverts**. If an older stored value exceeds 20 %, reads are **clamped** to the cap.
:::

## How To Add Incentives To A Reward Vault

This will walk you through the process of adding Incentive Tokens to a Whitelisted Reward Vault through <a :href="config.mainnet.dapps.hub.url" target="_blank">{{config.mainnet.dapps.hub.name}}</a>.

### Step 1 - Choose Your Reward Vault

Under the **Vaults** section, find and click your Reward Vault.

![Find Reward Vault in Vault Section](/assets/add-incentives-vaults.png)

### Step 2 - Add Incentive

If the wallet you are connected as is the Incentive Token Manager, then you will see a section labeled "Add incentive to this reward vault".
Click the **Add** button.

![Add Incentive sTo Reward Vault](/assets/add-incentives-reward-vault.png)

A modal will appear, with the Incentive Tokens that your account manages.
Choose the **Incentive Token**, specify an **Amount** you would like to supply, and a rate for the **Distribution Per BGT** you would like to offer.

![Add Incentives Reward Vault Modal](/assets/add-incentives-reward-vault-modal.png)

Go through the process of approving the tokens and confirming the supply.

![Add Incentives Success](/assets/add-incentives-reward-vault-success.png)

Once complete, you should the newly reflected Incentive Tokens offered in the **Incentives** section.

![New Incentives Added To Reward Vault](/assets/add-incentives-reward-vault-added.png)
