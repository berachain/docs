# Bend Overview

## What Is Bend?

## Why Does Bend Exist?

Bend is berachain’s native lending platform. It allows for users to gain exposure to honey while using their other blue chip assets as collateral.

### Capital Efficiency

We allow users to optimize their assets supplied to Bend in terms of yield generation and borrowing power.

### Risk Management

Bend brings a greatly improved set risk parameters and new features to protect the protocol from insolvency.
​​

### Supply and Borrow Caps

Bend governance can now configure Borrow and Supply Caps.

- **Borrow Caps**: allow modulating how much of each asset can be borrowed, which reduces insolvency risk.
- **Supply Caps**: allow limiting how much of a certain asset is supplied to Bend. This helps reducing exposure to a certain asset and mitigate attacks like infinite minting or price oracle manipulation.

### Granular Borrowing Power Control

In Bend, it will be possible to lower the borrowing power of any asset to as low as 0% without any impact on existing borrowers (it's still possible to use the old approach - liquidating existing users - if deemed necessary)

### Price Oracle Sentinel

The Sentinel feature introduces a grace period for liquidations and disables borrowing under specific circumstances.

This feature has been specifically designed for L2s to handle eventual downtime of the sequencer (but can be extended to handle other cases, even on L1s, in the future).

### Variable Liquidation Close Factor

In Bend, the liquidation mechanism has been improved to allow the position to be fully liquidated when it approaches insolvency i.e. HF < 0.95 (previously only half of the position could be liquidated at any point).

:::warning
<b>Warning</b><br />
Most of the features above are under constant improvement and might change as the we get close to public testnet. Please make sure to check latest feature announcements for up to date information.
:::
