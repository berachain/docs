---
head:
  - - meta
    - property: og:title
      content: Berachain Bend - Guides - Deposit & Withdraw
  - - meta
    - name: description
      content: Berachain Bend - Guides - Deposit & Withdraw
  - - meta
    - property: og:description
      content: Berachain Bend - Guides - Deposit & Withdraw
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Deposit & Withdraw

This guide will walk you through the process of contributing to a Bend Vault.

See [Vault](/learn/concepts/vault/) for more context on how they work.

## Requirements

- Wallet with $HONEY
- Native $BERA to process transactions

:::tip
If you do not have have $HONEY, you can use <a target="_blank" :href="config.mainnet.dapps.hub.url + 'swap' + '?utm_source=' + config.websites.docsBend.utmSource">{{config.mainnet.dapps.hub.name}}</a> or <a target="_blank" :href="config.mainnet.dapps.honeySwap.url + '?utm_source=' + config.websites.docsBend.utmSource">{{config.mainnet.dapps.honeySwap.name}}</a>.
:::

## Depositing Into Bend Vaults

This will walk you through the steps of interacting with {{config.mainnet.dapps.bend.name}} and depositing $HONEY to gain native lending yields and additionally PoL $BGT yields.

### 1. Visit Bend & Connect Wallet

Your first step is to go to <a target="_blank" :href="config.mainnet.dapps.bend.url + 'lend' + '?utm_source=' + config.websites.docsBend.utmSource">{{config.mainnet.dapps.bend.name}}</a> and connect your wallet.

![Berachain Bend - Connect Wallet](/assets/learn-guide-deposit-01.png)

### 2. Choose A Vault

Choose a Vault that you would like to deposit your $HONEY with.

![Berachain Bend - Choose Vault](/assets/learn-guide-deposit-02.png)

### 3. Configure Deposit

1. Make sure to select **Supply**,
2. Specify a $HONEY amount you'd like to deposit
3. Choose if you'd like to **Stake** or **Supply & Stake** (recommended for PoL $BGT yields)
4. Click **Review** to bring up a modal to confirm

:::tip
If you do not enable **Supply & Stake** now, you can still do so later.
:::

![Berachain Bend - Configure Deposit](/assets/learn-guide-deposit-03.png)

### 4. Approve, Supply, & Stake

Your wallet will be prompted to:

1. Approve transfer of the $HONEY token for the Vault
2. Supply the $HONEY to the Vault
3. Receive receipt token
4. Stake receipt to a Berachain PoL Reward Vault for additional $BGT yields

![Berachain Bend - Supply & Stake](/assets/learn-guide-deposit-04.png)

![Berachain Bend - Successful Supply & Stake](/assets/learn-guide-deposit-05.png)

You should now see the successfully deposited total value, both supplied and staked, along with the corresponding amount in receipt tokens.

![Berachain Bend - Staked Receipt Tokens](/assets/learn-guide-deposit-06.png)

With your current deposit staked, this now makes your account eligible to claim $BGT yields.
You can also hover over the APY to see a breakdown of those yields.

![Berachain Bend - Yields](/assets/learn-guide-deposit-07.png)

## Withdrawing From Bend Vaults

This will walk you through the steps of withdrawing your deposited and staked tokens with {{config.mainnet.dapps.bend.name}}.

### 1. Configure Withdrawal

While in the Vault you'd like to withdraw from:

1. Make sure to select **Withdraw**
2. Specify a $HONEY amount you'd like to withdraw

:::tip
You will notice that your balance is showing 0, that is because your current deposit is staked and will require it being unstaked before withdrawing.
:::

![Berachain Bend - Configure Withdraw](/assets/learn-guide-withdraw-01.png)

### 2. Unstake Deposit

Where your current balance of stake is shown click the **Unstake** button.

![Berachain Bend - Unstake](/assets/learn-guide-withdraw-02.png)

You will be prompted to specify the amount you want to unstake and confirm.

![Berachain Bend - Confirm Unstake](/assets/learn-guide-withdraw-03.png)

![Berachain Bend - Successfully Unstaked](/assets/learn-guide-withdraw-04.png)

### 3. Withdraw Deposit

Now with your deposit unstaked, it is now shown in the **Deposited** section which allows you to withdraw your deposit.

1. Specify a $HONEY amount you'd like to withdraw
2. Make sure to select **Withdraw**

![Berachain Bend - Configure Withdraw](/assets/learn-guide-withdraw-05.png)

You'll be prompted to confirm the withdrawal with your wallet.

![Berachain Bend - Successful Deposit Withdraw](/assets/learn-guide-withdraw-06.png)

Once complete, you will have successfully withdrawn your deposit.

![Berachain Bend - Successful Deposit Withdraw](/assets/learn-guide-withdraw-07.png)
