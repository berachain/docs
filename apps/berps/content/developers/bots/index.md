---
head:
  - - meta
    - property: og:title
      content: Bots Overview
  - - meta
    - name: description
      content: Explanation of role of bots on Berps.
  - - meta
    - property: og:description
      content: Explanation of role of bots on Berps.
---

# Berps Bots Overview

Bots play a crucial role in Berps by automating various trading tasks and ensuring the upkeep of the platform.

Bots are very flexible in terms of their purpose, possible users and executors. Different incentives and operating models exist between bots of the different categories. In many cases, bots primarily interact with the `Entrypoint` contract via `executeLimitOrder`:

```solidity
function executeLimitOrder(
    uint256 index,
    bytes[] calldata priceUpdateData
) external payable
```

## Types of Bots

There are several types of bots on Berps. There are many different possible classifications of trading bots, but an example classification based on their purpose is as follows:

1. **Limit Order Bots**: These bots are responsible for executing limit orders placed by users. When the market price reaches the specified limit price, the bot triggers the execution of the order through `executeLimitOrder`. Limit order bots ensure users' trades (both opening and closing positions) are executed at desired prices without need for constant monitoring.
2. **Liquidation Bots**: These bots monitor the health of open positions and liquidate positions when necessary (when PnL > -90%). They play a vital role in maintaining the stability and solvency of the Berps protocol by closing losing positions and forwarding the trader's `$HONEY` collateral to the vault.
3. **Trading Bots**: These bots are designed to automate trading strategies and execute trades based on predefined algorithms and/or market conditions. For example, they can monitor price movements, analyze market data, and make trading decisions in lieu of manual user action/intervention.

## Bot Execution Criteria

:::warning
Berps contracts currently have a `nonContract` modifier active, meaning bots will have to be run through EOAs, rather than smart contracts. This may change in the future.
:::

Bot operators have to consider the execution criteria that determine and constrain when certain designated actions can be taken. In general, the logic for evaluating execution criteria is found in `Settlement.sol`. A number of checks are also performed in the `Entrypoint.validateTrade()` function. Below is a non-exhaustive list of some execution criteria to consider.

| Criteria                  | Description                                                                                                                                                                                                                    |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Price Conditions**      | Execution criteria can include price thresholds, such as executing a limit order when the market price reaches a specific level or when the price moves by a certain percentage (for liquidations).                            |
| **Execution Delays**      | Berps imposes execution delays on limit orders to avoid issues such as stale oracle price manipulation. Bot operators should ensure that orders of interest have passed such delays by evaluating against `canExecuteTimeout`. |
| **Slippage Tolerance**    | When executing trades, bots should configure an acceptable level of slippage to prevent unexpected or unfavorable price movements.                                                                                             |
| **Exposure Limits**       | Berps imposes exposure limits to manage market risk. Bot operators should incorporate checks to ensure that their trades comply with these limits to avoid the `BerpsErrors.PastExposureLimits` error.                         |
| **Price Impact**          | Berps imposes price impact restrictions on single orders. Bot operators should ensure the price impact of their trades is low enough to avoid the `BerpsErrors.PriceImpactTooHigh` error.                                      |
| **Leverage Restrictions** | Berps enforces leverage restrictions to manage risk. Bot operators should adhere to the allowed leverage ranges before executing trades to prevent the `BerpsErrors.LeverageIncorrect` error.                                  |
