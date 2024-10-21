---
head:
  - - meta
    - property: og:title
      content: Berps & $HONEY
  - - meta
    - name: description
      content: What the relationship between Berps & $HONEY
  - - meta
    - property: og:description
      content: What the relationship between Berps & $HONEY
---

<script setup>
  import Token from '@berachain/ui/Token';
  import config from '@berachain/config/constants.json';
</script>

# Berps & `$HONEY`

> <a target="_blank" :href="config.testnet.dapps.beratrail.url + '/address/' + config.contracts.honey.address">{{config.contracts.honey.address}}</a>

$HONEY is Berachain's native stablecoin. It is an standard <a target="_blank" :href="config.testnet.dapps.beratrail.url + '/address/' + config.contracts.honey.address">ERC20 Token</a> and represents the equivalent of 1 `$USDC`.

<ClientOnly>
  <Token title="$HONEY" image="/assets/HONEY.png" />
</ClientOnly>

## How Does Berps Use `$HONEY`?

Vault Liquidity Providers deposit `$HONEY`, which stores the cumulative sum in the Berps Vault. This allows traders to borrow from the Vault to create and settle trades.

For users that deposit their `$HONEY`, they receive a corresponding token amount of [`$bHONEY`](/learn/tokens/bhoney).

If a trader gets liquidated in `$HONEY`, that amount is distributed to the `$bHONEY` Vault (minus a small fee to the liquidator) and a small percentage of that liquidation goes to the foundation.

$HONEY is the only asset that Berps accepts to place a trade.

## Where Can I Get `$HONEY`?

`$HONEY` can be swapped for other assets through [Berachain Honey Swap](https://artio.honey.berachain.com) or the [Beracahin BEX](https://artio.bex.berachain.com).

![Berachain Honey Swap](/assets/berachain-honey-swap.png)

> <small><a target="_blank" :href="config.testnet.dapps.honeySwap.url">{{config.testnet.dapps.honeySwap.url}}/</a></small>

![Berachain BEX Swap](/assets/berachain-bex-swap.png)

> <small><a target="_blank" :href="config.testnet.dapps.bex.url">{{config.testnet.dapps.bex.url}}/</a></small>

Additional means to buy `$HONEY` are coming soon, and users can use Berachain's canonical bridge ([LayerZero](https://layerzero.network)) to bridge over assets.
