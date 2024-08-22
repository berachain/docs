# Berps Trades

The following are the different types of trades that a trader can make with Berps.

## Long

![Berps Trade Long](/assets/berps-trade-long.png)

A **Long** trade is when a trader speculates that the price of token (ex: ETH-USDC) will go up in value in relation to the underlying base token (USDC) over time.

## Short

![Berps Trade Short](/assets/berps-trade-short.png)

A **Short** trade is when a trader believes that the price of a token will go down in value over time.

## Market Orders

![Berps Trade Market](/assets/berps-trade-market.png)

Regardless if a trade is Long or Short, a **Market** are executed immediately at the current market price.

## Limit Orders

![Berps Trade Limit](/assets/berps-trade-limit.png)

For **Limit** trades, a trader will typically specify price parameters which will either buy or sell a trade at the point where that limit has been reached.

The difference between Limit and Market is Limit order may not execute right away and allows users to specify a price at which they want to buy or sell.

## Take Profit

![Berps Trade Take Profit](/assets/berps-trade-take-profit.png)

An additional parameter that traders can put in place to ensure that their trade sells at a certain profit threshold automatically.

> **NOTE:** Automatically means that the community of liquidition bots will execute the trade for a fee.

## Stop Loss

![Berps Trade Stop Loss](/assets/berps-trade-stop-loss.png)

In addition to Take Profit, a **Stop Loss** can be an additional parameter put in place to prevent the trader from losing their total initial investment and sell off the trade when it reaches a certain threshold for loss automatically.

**NOTE:** Similar to **Limit** orders, only reversal limit orders are supported currently. This means that if a trader wants to go long, they must enter at a price lower than the current price. Similarly if a trader wants to go short, they must enter at a price higher than the current price. This also guarantees a more favorable entry price than the current price.
