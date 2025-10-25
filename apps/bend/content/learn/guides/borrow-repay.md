---
head:
  - - meta
    - property: og:title
      content: Berachain Bend - Guides - Borrow & Repay
  - - meta
    - name: description
      content: Berachain Bend - Guides - Borrow & Repay
  - - meta
    - property: og:description
      content: Berachain Bend - Guides - Borrow & Repay
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Borrow & Repay

This guide will walk you through the process of providing collateral to borrow $HONEY, and repaying the loan to avoid liquidation.

## Requirements

- Wallet with collateral (WETH, WBERA, WBTC, etc) listed on <a target="_blank" :href="config.mainnet.dapps.bend.url + 'borrow?utm_source=' + config.websites.docsBend.utmSource">{{config.mainnet.dapps.bend.name}}</a>
- Native $BERA to process transactions

:::tip
If you do not have have any of the collateral listed, you can use <a target="_blank" :href="config.mainnet.dapps.hub.url + 'swap' + '?utm_source=' + config.websites.docsBend.utmSource">{{config.mainnet.dapps.hub.name}}</a>.
:::

## Supplying Collateral & Borrowing

This will walk you through the steps of interacting with {{config.mainnet.dapps.bend.name}} supplying $WBERA as collateral to take out a loan in $HONEY.

### 1. Visit Bend & Connect Wallet

Your first step is to go to <a target="_blank" :href="config.mainnet.dapps.bend.url + 'borrow' + '?utm_source=' + config.websites.docsBend.utmSource">{{config.mainnet.dapps.bend.name}}</a> and connect your wallet.

![Berachain Bend - Borrow & Connect Wallet](/assets/learn-guide-borrow-01.png)

### 2. Choose A Market

Choose a market that you can offer as collateral.

For this guide, we'll be using $WBERA.

![Berachain Bend - Choose Market](/assets/learn-guide-borrow-02.png)

### 3. Configure Borrow

1. Make sure to select **Borrow**,
2. Specify a $WBERA amount you'd like to deposit
3. Click **Review** to bring up a modal to confirm

![Berachain Bend - Configure Borrow](/assets/learn-guide-borrow-03.png)

### 4. Approve & Supply

1. Approve transfer of the $WBERA token to the market
2. Supply the $WBERA to the market as collateral

![Berachain Bend - Approve & Supply](/assets/learn-guide-borrow-04.png)

![Berachain Bend - Successful Approve & Supply](/assets/learn-guide-borrow-05.png)

You should now see the successfully supplied collateral and total value in the market.

![Berachain Bend - Successful Supply](/assets/learn-guide-borrow-06.png)

### 5. Borrow

1. Specify a $HONEY amount to borrow
2. Ensure that the borrow is below the LTV limit to avoid liquidation
3. Click **Review** to bring up a modal to confirm

![Berachain Bend - Borrow](/assets/learn-guide-borrow-07.png)

### 6. Approve & Borrow

Approve the borrow of $HONEY.

![Berachain Bend - Approve Borrow](/assets/learn-guide-borrow-08.png)

![Berachain Bend - Successful Approve Borrow](/assets/learn-guide-borrow-09.png)

You should now see the successfully borrowed $HONEY and its value reflected in the market.

![Berachain Bend - Successful Borrow](/assets/learn-guide-borrow-10.png)

Additionally, you can supply collateral and borrow in the same transaction by specifying amounts for both the $WBERA collateral and the desired $HONEY.

![Berachain Bend - Supply & Borrow](/assets/learn-guide-borrow-11.png)

### 7. Avoid Liquidation

Monitor your position carefully to ensure it is not liquidated if your LTV exceeds the Liquidation Loan-To-Value (LLTV).
You can also view when liquidation would occur if the price of $BERA were to fall to a certain level, which would make your position eligible for liquidation.

![Berachain Bend - Monitor LTV/LLTV](/assets/learn-guide-borrow-12.png)

## Repay & Withdraw

We will now cover the process of repaying your loan with $HONEY and withdrawing your collateral in $WBERA.

### 1. Configure Repay

1. Select the **Repay** section.
2. Specify the amount of $HONEY you wish to repay.
3. Specify the amount of $WBERA collateral you wish to withdraw.
4. Click **Review** to open a confirmation modal.

![Berachain Bend - Configure Repay](/assets/learn-guide-repay-01.png)

### 2. Confirm Repay

Confirm the repayment transaction.

![Berachain Bend - Confirm Repay](/assets/learn-guide-repay-02.png)

![Berachain Bend - Successful Confirm Repay](/assets/learn-guide-repay-03.png)

You should now see the successful repayment showing a zero balance.

![Berachain Bend - Successful Repay](/assets/learn-guide-repay-04.png)

You have now successfully borrowed and repaid a $HONEY loan on Bend.
