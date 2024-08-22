# Liquidations

Liquidation is initiated when a **borrower's health factor falls below 1**, indicating that their collateral value inadequately covers the loan/debt value. This situation can arise from a decline in collateral value or an increase in the borrowed debt value relative to each other. During liquidation, up to 50% of the borrower's debt is settled, with that amount, along with a liquidation fee, being deducted from the available collateral. Consequently, the liquidation process ensures that the liquidated debt is repaid.

To avoid liquidation, users should seek to maintain a high health factor. Users may raise their health factor by either:

1. depositing more collateral; or
2. repaying part of their debt

The Bend UI provides a visual health factor indicator to help users monitor their health factor and take appropriate action.

![Health Factor](/assets/health-factor.png)

## Liquidation Triggers

### Health Factor

$$H_f = \frac{\sum (Collateral_i \text{ in HONEY} \times Liquidation Threshold_i)}{Total Borrows \text{ in HONEY}}$$
Where:

- $H_f$ represents the health factor (HF)

- $i$ denotes each individual collateral asset

- $\sum$ represents the sum over all collateral assets

The condition for potential liquidation is:
When $H_f < 1$, the position becomes eligible for liquidation to maintain solvency.

## Liquidators

Whenever there is a lending position with an `HF < 1`, liquidators can repay 50% of the user's `$HONEY` debt, and collect the equivalent value of collateral. An additional 5% bonus on liquidated amounts is deducted from the borrower's collateral and given to the liquidator, as incentive for maintaining the protocol's solvency.

Liquidations are open to anyone, but there is a lot of competition. Normally liquidators develop their own solutions and bots to be the first ones liquidating loans to get the liquidation bonus. You can find more details in the [developers section](/developers/guides/liquidate-loan).

## Example

Suppose Bob deposits 1000 `$HONEY` worth of ETH and borrows 700 `$HONEY`. Assume the liquidation threshold is 80% for ETH collateral.

This means that Bob's current health factor is:
$$H_f = \frac{1000 \times 0.8}{700} = 1.143$$

If the price of ETH drops by 13%, such that Bob's health factor falls below 1, his loan will be eligible for liquidation (`HF = 0.994`). A liquidator can repay up to 50% of the borrowed `$HONEY`. In return, the liquidator can claim the equivalent ETH collateral plus the liquidation bonus (5%). For the full 50% liquidation, the liquidator claims `350 + 17.5 = 367.5 HONEY` worth of ETH for repaying 350 `$HONEY`.
