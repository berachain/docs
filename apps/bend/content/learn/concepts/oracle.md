---
head:
  - - meta
    - property: og:title
      content: Berachain Bend - Concepts - Oracle
  - - meta
    - name: description
      content: Berachain Bend - Concepts - Oracle
  - - meta
    - property: og:description
      content: Berachain Bend - Concepts - Oracle
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Oracle

Oracles are smart contracts that provide external data, particularly price information, to blockchain applications. In lending protocols like Bend, oracles provide price data needed to determine what one token is worth relative to another. For example, the oracle of a market is designed to answer the question: "How many $USD is 1 \$BERA/\$WBERA worth right now?"

## Oracles in Lending Markets

Traditional lending protocols rely on oracles to:

- Determine the value of collateral assets
- Calculate borrowing capacity
- Trigger liquidations when positions become undercollateralized
- Enable accurate interest rate calculations

## Oracle Implementation in Bend

Bend takes an **oracle-agnostic approach**, allowing market creators to select the most appropriate price feed mechanisms based on specific market requirements. Each Bend market specifies its oracle in the market parameters, ensuring that oracle implementations can be tailored to specific asset pairs.

## Types of Oracles Compatible with Bend

Various oracle implementations can be used with Bend markets:

1. **Price Feed Oracles**: Utilize external price feeds (like Chainlink, Redstone, API3, Pyth, Chronicle) to calculate asset exchange rates.
2. **Exchange Rate Oracles**: Specialized for wrapped tokens or rebasing tokens where the exchange rate is deterministic (like wstETH/stETH).
3. **Fixed-Price Oracles**: Used for assets with known or predefined exchange rates, such as stablecoins pegged to the same value.

## How To Get Price Data

This will walk you through the process of getting the current price of a collateral ($WBERA).

### 1. Get Market Id

The Market Id can be found on <a target="_blank" :href="config.mainnet.dapps.bend.url + 'borrow?utm_source=' + config.websites.docsBend.utmSource">{{config.mainnet.dapps.bend.name}}</a>.

![Bend - Find Market Id](/assets/learn-concepts-oracle-marketid.png)

### 2. Find Oracle Address

In <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.bend.morpho.address + '?utm_source=' + config.websites.docsBend.utmSource">{{config.mainnet.dapps.berascan.name}}</a> look up the following `Morpho` address and click the address.

```bash-vue
# {{config.mainnet.contracts.bend.morpho.name}}
{{config.mainnet.contracts.bend.morpho.address}}
```

![Berascan - Find Oracle Address](/assets/learn-concepts-oracle-morpho.png)

### 3. Get Base Feed Address

In the oracle address, read the contract, select the **BASE_FEED_1** and click the address.

![Berascan - Find Base Feed Address](/assets/learn-concepts-oracle-feed.png)

### 4. Get Latest Answer

In the base feed address, read the contract (or read proxy contract), and click `latestAnswer`.

![Berascan - Latest Price Answer](/assets/learn-concepts-oracle-latestanswer.png)

How many decimal places is this? The value returned by `latestAnswer` (for example, `202675951`) should be divided by `100000000`, which means the price uses 8 decimal places.

Resulting in:

```bash
# $BERA/$WBERA Price
2.02675951 USD
```

## Oracle Security Considerations

The security of an oracle is critical to the safety of a Bend Market. Users should:

- Verify the oracle implementation for any market they interact with
- Understand the price sources being used
- Consider potential manipulation vectors or failure modes

The immutable nature of Bend Markets means oracle selection is a permanent decision that defines the market's risk profile.
