# Fees & Spread (WIP)

Fees and spread are essential components of a perpetual trading platform to ensure the protocol stays healthy/liquid.
Fees are taken from traders, charged on the total position size (collateral \* leverage) and used to compensate liquidity providers for their loaned collateral.
Spread is enforced on oracle prices to ensure the protocol does not get into unsafe scenarios. Since the protocol settles positions at a single execution price, it is very important to consider the oracle's sources and uncertainty in any individual price data.

## Fee Types

1. Open
2. Close
3. Borrowing
4. Limit Fee

:::tip
You can save on limit fees if you close the orders yourself instread of a liquidation bot doing it for you via TP or SL.
:::

### Opening Fees

Opening fees are charged upon opening any market position. Depending on the pair, the opening fee varies between 0.05% - 0.15% on the total position size (the fee is fixed for a single pair). It is taken before opening, so the trader's resulting position will reflect a slightly smaller size after accounting for the opening fee. Any limit order that is converted into a position will incur the opening fee at that point in time.

### Closing Fees

Closing fees are charged upon closing any market position. Depending on the pair, the opening fee varies between 0.05% - 0.15% on the total position size (the fee is fixed for a single pair). It is taken before closing, so the trader's resulting PnL will reflect this.

### Borrowing Fees

Borrowing fees serve to charge a trader for "borrowing" collateral from the liquidity vault. Trader's provide their own collateral, but as long as a position is open, they "borrow" from the vault as there is always a possibility of closing a position with a positive PnL, causing collateral to be withdrawn from the vault. Borrowing fee is the "interest" paid for this scenario.
Borrowing fees are charged on any open market position and increase in amount as a function of time that the position is open. I.e. the longer a position is open, the higher the borrowing fee.
Borrowing fees treat open trades of the dominant side as vault borrowers. The fee is determined by a pair's (or the group the pair is part of) net OI relative to the overall vault TVL, meaning pairs (or groups) with more lopsided OI will charge more than pairs with balanced OI.

### Limit Fees

Limit fees are charged upon executing a open limit order into a market position and closing any market position using limit execution (using TP or SL). Depending on the pair, the limit fee varies between 0.02% - 0.1% on the total position size (the fee is fixed for a single pair). If opening a position, the trader's resulting position size will reflect this fee. If used for closing a position with TP or SL, the trader's resulting PnL will reflect this.

> **NOTE:** Liquidations send 5% of the trade's collateral to the bot that performs the liquidation.

## Spread Types

1. Confidence Interval
2. Dynamic Spread

### Confidence Interval

A price oracle aggregates prices from multiple sources. In this process, the returned & aggregated price estimate has some uncertainty associated with it. To account for this uncertainty and ensure the protocol does not get into unsafe scenarios due to a single outlier price, a [confidence interval](https://docs.pyth.network/price-feeds/best-practices#confidence-intervals) is applied on top of the oracle price. The spread is applied on top of the aggregate price returned from the oracle and positions will settle on the boundary of the interval that protects the protocol from unusual price volatility.

For most pairs, Pyth generally returns a confidence interval / spread of around 0.05 - 0.15% deviation from the aggregate price. This means if the returned price of ETH is $3000 with a confidence range of 0.1%, and you are opening a position to go long on ETH, the position will open at $3000 + ($3000 \* 0.001) = $3003.

### Dynamic Spread

Dynamic Spread, is added on top of the confidence interval. It depends on the open interest of the pair, the position size of the trade being opened, and on the direction of the trade (long / short).

Dynamic Spread (%) = (Open interest `long/short` + New trade position size / 2) / 1% depth `above/below`.

Some pairs do not have a 1% depth set which means they do not charge a dynamic spread.
