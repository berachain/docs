# How Does Berps Work?

Perpetual futures contracts allow traders to speculate on the price movements of specific underlying assets.

Perpetuals trading systems typically involve <i>Traders</i>, <i>Liquidity Providers</i>, and a <i>Settlement Layer</i>, which allows for the system to be run.

With respects to Berachain, these are [Traders](#traders), [Vault Providers](#vault-providers), and the [Berachain](#berachain) itself.

![How Berps Works](/assets/how-berps-works.png)

## Traders

Traders put in an initial amount of `$HONEY` and with the liquidity provided in the Berps Honey Vault, use its assets as leverage by any multiple from 2x to 100x.

By placing a trade, they can speculate with a higher amount of leverage if a market pair's token price will go up or down.

Not accounting for stop losses or take profit parameters, the trade can continue to potentially grow or lose value over time.

If the value decreases past a certain threshold determined by their leverage taken, a trader stands to lose their entire initial deposit and have the trade closed automatically. This is called being [liquidated](#toto).

At any time the trader can close an open trade, which would result in profit or a loss, and paying out any fees associated with the trade.

## Vault Providers

Vault providers (or vault stakers), contribute to Berps by depositing `$HONEY` into the Berps Vault. In exchange for that deposited `$HONEY`, a vault provider are given [$bHONEY](/learn/tokens/bhoney) tokens that are equivalent to the value deposited (receipt).

In addition to `$BGT`, the vault provider will be rewarded with any fees generated from trades.

If the vault provider decides to stake their `$bHONEY`, over time they will be rewarded with `$BGT` tokens, whenever a validator who directs their `$BGT` emissions to the Berps bHoney Vault.

## Berachain

Berachain Validators are responsible for distributing `$BGT` emissions to different Rewards Vaults via a smart contract called _Berachef_.

Berps is an eligible Rewards Vault, and when `$BGT` emissions are directed to Berps, Vault Providers that stake their `$bHONEY` are eligible to claim `$BGT`.

See more in [Berps & Proof Of Liquidity](/learn/berps-proof-of-liquidity)
