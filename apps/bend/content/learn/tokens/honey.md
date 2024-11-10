<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Bend & $HONEY

$HONEY is Berachain's native stablecoin. It is a standard [ERC20 Token](#contract-address) and represents the equivalent of 1 USDC.

## How Does Bend Use $HONEY?

Bend lets $HONEY suppliers earn interest on it. It's the only asset on Bend that can earn interest by supplying.

Note: Other assets deposited into bend act only as a collateral.

## Where Can I Get $HONEY?

`$HONEY` can be swapped for other assets through <a :href="config.testnet.dapps.honeySwap.url">{{config.testnet.dapps.honeySwap.name}} dApp</a> or the <a :href="config.testnet.dapps.bex.url">{{config.testnet.dapps.bex.name}}</a>.

Additional means to buy $HONEY are coming soon, and users can use Berachain's canonical bridge ([LayerZero](https://layerzero.network)) to bridge over assets.
