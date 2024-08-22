<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Berps Leveraged Trading Overview📈

Leveraged trading is a strategy that involves using borrowed money to increase the potential rewards. In the case of Berps, traders use leverage to amplify their buying power, allowing them to make larger trades than their own capital would normally permit. However, while it can magnify rewards, it also increases the potential for significant losses, making it a high-risk trading strategy.

<a target="_blank" :href="config.testnet.dapps.berps.url">![Berchain Native Perps](/assets/berachain-berps-dashboard.png)</a>

> {{config.testnet.dapps.berps.name}} can be found at <a target="_blank" :href="config.testnet.dapps.berps.url">{{config.testnet.dapps.berps.url}}</a>

## Berps User Interface Overview

The Berps UI is split up into the folowing section.

![Berps UI Sections](/assets/berps-ui-sections.png)

### 1. Market Key Pair

Different key pairs that a user can choose to speculate on that is always paired against `$USDC` to get at an anchored value.

### 2. Market Orders and Limit Orders

**(Market)** orders are executed immediately at the current market price.
**(Limit)** orders allow users to specify a price at which they want to buy or sell.

### 3. Trade Parameters

Based othe quantity of `$HONEY` they want to use, a trader can increase their leverage from 2x-100x using the **Leverage Slider**.

Optionally, a trader can also decrease their risk of losing their entire deposit by putting in parameters where a given threshold would be met for it sell off a trade when it reaches a certain profit **(Take Profit)** or sell off a trade when it reaches a certain loss percentage **(Stop Loss)**.

### 4. Trade Estimate & Fees

When the market key pair, trade type, and trade parameters are defined, it will calculate an estimate for projection on profit, loss, and fees.

### 5. Market Details

Based on the key pair chosen, this section will given additional insights for both long and short trades into what the trade volume looks for the given token, the estimated interest for keeping a trade open, and the potential borrow fee.

### 6. One Click Trading

Allows for users to generate a local EOA wallet that can be funded and allow for one click confirmation for trades, versus having an EOA wallet approve every single transaction. This expedites trading and can enhance the user experience.

Learn more here about [One-Click Trading](/learn/leveraged-trading/one-click-trading)

### 7. Trading Graph

Data for the current pair price of the chosen market over time. Note that the charts show the price in terms of `$USD` and not `$USDC`.

### 8. Active & Historical Trades

Where a trader can see a list of active trades open, historical trades completed, and the ability to modify existing trades by increasing their position and/or closing them.
