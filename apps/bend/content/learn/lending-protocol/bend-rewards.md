# Bend Rewards

In addition to providing a venue for users to seek leverage on crypto positions using `$HONEY`, Bend also provides a variety of ways for users to earn, including:

1. Lending fees for `$HONEY` suppliers
2. `$BGT` rewards for borrowers
3. Liquidation fees for liquidators

## 1. Lending Fees

When borrowers take out `$HONEY` loans using the deposited assets, they pay interest on the borrowed `$HONEY`. This interest is distributed to `$HONEY` lenders, providing them with passive income. The [interest rates](/learn/lending-protocol/interest-rates) are variable and determined by the borrowing utilization of supplied assets.

## 2. Earning `$BGT` on Bend

### What is `$BGT`?

Berachain uses the [Berachain Governance Token](https://docs.berachain.com/learn/protocol/tokens/bgt) (`$BGT`) as the native governance token through which the economic incentives of Berachain are administered. `$BGT` is non-transferrable and can only be acquired by providing liquidity through the [Proof of Liquidity](https://docs.berachain.com/learn/what-is-proof-of-liquidity) system.

### Borrowing to earn `$BGT`

Borrowers with open `$HONEY` loans enjoy `$BGT` as an extra incentive for borrowing. This incentive encourages borrowing activity, which in turn increases the utility and demand for Berachain's native stablecoin `$HONEY`, and which drives fees for `$BGT` holders.

:::tip
Borrowers earn based on the `$HONEY` borrowed, and not the value of supplied collateral. Be mindful of your health factor when trying to maximize `$BGT` earning.
:::

Earning `$BGT` on Bend is unique, because Borrowers can easily claim their `$BGT` rewards on Bend, rather than visiting the portal for depositing in [reward Vaults](https://bartio.station.berachain.com/gauge) (required for BEX deposits, for example).

![Claim $BGT](/assets/claim-bgt.png)

## 3. Liquidations

Liquidators of undercollateralized positions on Bend are entitled to a percentage bonus on liquidated amounts (`$HONEY` is repaid by liquidator, receiving the borrower's collateral in return).

Being the first to liquidate eligible positions is typically very competitive and is mainly done by bots (written by developers). See more details on [Liquidations](/learn/lending-protocol/liquidations).
