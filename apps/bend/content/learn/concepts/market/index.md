---
head:
  - - meta
    - property: og:title
      content: Bend Concepts - Market - Overview
  - - meta
    - name: description
      content: What is a Bend Market?
  - - meta
    - property: og:description
      content: What is a Bend Market?
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Market

A market in lending protocols represents a fundamental lending pool that pairs one collateral asset with one loan asset, creating a venue for lenders and borrowers to interact. Bend leverage's [**Morpho Market V1**](https://docs.morpho.org/learn/concepts/market/#what-is-a-morpho-market-v1) as a base for its functionality.

## What is a Market?

A market is a primitive lending pool that enables users to:

- **Lend assets** and earn interest on their deposits
- **Borrow assets** by providing collateral
- **Trade positions** through various market mechanisms

Each market operates independently with its own parameters, ensuring that risks are contained within individual markets rather than spreading across the entire protocol.

<a target="_blank" :href="config.websites.bend.url + 'borrow' + '?utm_source=' + config.websites.docsBend.utmSource">

![Bend - Markets Overview](/assets/learn-concept-market-overview.png)

</a>

> <a target="_blank" :href="config.websites.bend.url + 'borrow' + '?utm_source=' + config.websites.docsBend.utmSource">{{config.websites.bend.url  + 'borrow'}}</a>

## Key Characteristics

### Isolated Risk

- Each market operates independently
- Risks are contained within individual markets
- No cross-market contamination of losses

### Immutable Parameters

- Market rules are set at creation and cannot be changed
- Provides predictable behavior for participants
- Eliminates systematic risks from parameter changes

### Asset Pairing

- One collateral asset paired with one loan asset
- Clear separation of lending and borrowing activities
- Simplified risk assessment and management

## Market Components

### Core Assets

1. **Collateral Asset**: The asset users deposit to borrow against
2. **Loan Asset**: The asset users can borrow from the market

### Market Parameters

1. [**Loan-to-Value (LTV) Ratio**](/learn/concepts/market/ltv): Value of loan against collateral
2. **Liquidation Loan-to-Value (LLTV)**: The LTV at which positions become eligible for liquidation
3. [**Interest Rate Model**](/learn/concepts/irm): Formula determining borrowing costs and lending yields
4. [**Oracle**](/learn/concepts/oracle): Price feed for collateral valuation
5. **Market Cap**: Maximum capacity for lending and borrowing

## Market Operations

### For Lenders

:::info
**NOTE:** Users cannot directly supply to a market. Instread they supply to a Vault that is managed by a [Curator](/learn/concepts/curator) that distributes assets among different markets. See [Vault](/learn/concepts/vault) for more information.
:::

- **Supply**: Deposit loan assets to earn interest
- **Withdraw**: Remove supplied assets and accrued interest

### For Borrowers

- **Borrow**: Take out loans against deposited collateral
- **Repay**: Return borrowed assets to reclaim collateral
- **Manage Position**: Monitor health ratio and add/remove collateral

### For Liquidators

- **Liquidate**: Repay debt in exchange for discounted collateral
- **Maintain Market Health**: Ensure borrowers maintain adequate collateralization

## Market Creation

### Permissionless Market Creation

A distinctive feature of Bend is permissionless market creation: the protocol enables users to create isolated markets, each defined by the five key parameters outlined above.

This approach differs from traditional lending platforms, which typically:

- Require governance approval\* for listing new assets or changing market parameters.
- Pool assets into a single lending pool, resulting in shared risk across the protocol.

In Bend, each market is created with its own immutable parameters—selected at the time of creation and persisting for the lifetime of the market. Specifically, the loan-to-value (LTV) ratio and interest rate model must be chosen from a set of options approved by Bend governance. This design ensures risk isolation, flexibility, and the ability to quickly support new asset integrations while maintaining protocol standards.

:::info
**NOTE:** For a market to appear on the Bend UI, applicants must submit a proposal to whitelist a vault that include its allocation via <a target="_blank" :href="config.websites.bend.formUrl + '?utm_source=' + config.websites.docsBend.utmSource">{{config.websites.bend.formUrl}}</a>.
:::
