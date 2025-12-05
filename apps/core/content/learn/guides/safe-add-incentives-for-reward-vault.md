<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Add Incentives For Reward Vault

The following guide will walk you through the process of adding incentives to an existing Berachain whitelisted reward vault with a whitelisted incentive token. If you'd like to understand additional mechanics, see the [Incentives](/learn/pol/incentives) section for more details.

## Requirements

- Whitelisted Reward Vault with Whitelisted Incentive Token
- Token Manager [Safe Multisig Wallet](https://safe.berachain.com)

:::tip Commission cap
A validator's commission on incentive tokens is capped at **20 %** (`MAX_COMMISSION_RATE = 0.2e4`).  
Queuing a commission above the cap **reverts**. If an older stored value exceeds 20 %, reads are **clamped** to the cap.
:::

## How To Add Incentives To A Reward Vault

This guide will walk you through the process of adding incentive tokens to a whitelisted reward vault using <a :href="config.websites.safe.url" target="_blank">{{config.websites.safe.name}}</a>.

### Step 1 - Start a New Transaction

Click the button **New transaction** in the top left from the homepage.

![Start a New Transaction](/assets/new-transaction.png)

### Step 2 - Add the Reward Vault Address

Add the Reward Vault address into the input and click **Use Implementation ABI**.

![Add Address](/assets/add-address.png)

### Step 3 - Provide Add Incentive Inputs

Select `addIncentive` from the drop down. Add the incentive token address, the amount, and the reward rate.
The amount and reward rate should be provided in wei.

For example, to add 100 WBERA at a rate of 0.7 WBERA per BGT:

| Parameter      | Value                                      |
| -------------- | ------------------------------------------ |
| Token          | 0x6969696969696969696969696969696969696969 |
| Amount         | 100000000000000000000                      |
| Incentive Rate | 700000000000000000                         |

:::tip
Your reward vault will need to be whitelisted before any `addIncentive` calls can be made.
:::

![Add Incentives Params](/assets/add-incentive-params.png)

Once the inputs are supplied, click **Add transaction**. Then click **Create Batch** on the right.

### Step 4 - Submit and Execute the Transaction

Send the batch to prepare to execute the transaction.

![Send Batch](/assets/send-batch.png)

Depending on your SAFE configuration you may only be able to sign the transaction.
If you are the last required signer you may execute the transaction.

![Execute Transaction](/assets/execute-transaction.png)
