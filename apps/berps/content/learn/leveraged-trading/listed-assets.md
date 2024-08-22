<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Listed Assets

Listed assets are all the approved assets that can be speculated on by traders (ex: ETH-USDC, BTC-USDC, etc) with `$HONEY`.

![Berps Listed Market Assets](/public/assets/markets.png)

> **NOTE:** Current asset price pairs are determined by [Pyth Price Feed Oracles](https://pyth.network).

## Asset Pairs List

Each listed asset pair has a unique index that is used to reference the pair in the Berps contract. Following is a list of the current asset pairs and their specific fee parameters:

| Pair Index | Market    | [Pyth PriceFeed IDs](https://pyth.network/developers/price-feed-ids)                                                                                            | Base Borrow APR % | Open Fee % | Close Fee % | Limit Fee % | 1% Depth |
| ---------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------- | ----------- | ----------- | -------- |
| 0          | BTC-USDC  | BTC-USD: 0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43 <br/> USDC-USD: 0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a  | 500%              | 0.1%       | 0.1%        | 0.05%       | 0        |
| 1          | ETH-USDC  | ETH-USD: 0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace <br/> USDC-USD: 0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a  | 500%              | 0.1%       | 0.1%        | 0.05%       | 0        |
| 3          | ATOM-USDC | ATOM-USD: 0xb00b60f88b03a6a625a8d1c048c3f66653edf217439983d037e7222c4e612819 <br/> USDC-USD: 0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a | 500%              | 0.1%       | 0.1%        | 0.05%       | 0        |

Learn more here about [Fees & Spread](/learn/leveraged-trading/fees-spread).

## How Do Other Assets Get Adopted?

Additional asset pairs can be added based on governance proposals voted and approved through [BGT Station Governance](https://artio.station.berachain.com/governance).

Learn more here about [Berachain Governance](https://docs.berachain.com/learn/governance/)

## Global Trade Parameters

In addition to the asset-specific parameters above, there are global parameters which apply broadly to all trades and users:

| Parameter          | Description                                                       | Value |
| ------------------ | ----------------------------------------------------------------- | ----- |
| Max Positions/Pair | Max # of open positions on a trading pair per account             | 5     |
| Max Leverage       | The max leverage users can obtain on their collateral             | 100x  |
| Liquidation Fee    | The fee charged (on `$HONEY` collateral) for liquidated positions | 5%    |
