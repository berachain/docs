# Liquidation

Liquidation is one of the core mechanisms in Bend. It protects lenders' capital by ensuring that undercollateralized loans are repaid, thereby maintaining the solvency of each market. For any developer integrating a borrowing feature, understanding and clearly communicating how liquidation works is paramount.

When a borrower's position becomes too risky, the protocol allows a third party—a **liquidator**—to step in, repay the debt, and seize the borrower's collateral at a discount.

## When Does Liquidation Occur?

A position becomes eligible for liquidation the moment its **Health Factor drops to 1 or below**.

As a reminder, this happens when the Loan-to-Value (LTV) of a position meets or exceeds the market's immutable Liquidation Loan-to-Value (LLTV) threshold.

If Debt Value / Collateral Value ≥ LLTV ⟹ Position is Liquidatable

This can be caused by:

- A decrease in the price of the collateral asset.
- An increase in the value of the debt due to accrued interest.

## The Liquidation Process

Liquidation on Bend is a straightforward, economically-driven process. It is not an auction; it's a direct transaction executed by the first liquidator to act.

#### 1. An Unhealthy Position is Identified

A liquidator (typically an automated bot) detects a position where the Health Factor is ≤ 1.

#### 2. Liquidator Repays the Debt

The liquidator calls the `liquidate` function on the Bend contract, repaying a portion or all of the borrower's debt using the loan asset.

#### 3. Liquidator Seizes Collateral at a Discount

In return for repaying the debt, the liquidator is allowed to seize an equivalent value of the borrower's collateral, plus a bonus. This bonus is the liquidator's incentive and profit.

#### 4. The Borrower's Position is Updated

The borrower's debt is reduced or eliminated, and their collateral is reduced by the amount seized.

### The Liquidation Incentive Factor (LIF)

The "discount" or "bonus" a liquidator receives is determined by the **Liquidation Incentive Factor (LIF)**. This factor is calculated based on the market's LLTV, ensuring that riskier markets (with higher LLTVs) offer a smaller bonus to prevent cascading liquidations.

For a market with an **LLTV of 86%**, the **LIF is approximately 1.05**, meaning the liquidator receives a **5% bonus** on the collateral they seize. This entire incentive goes to the liquidator; the Bend protocol takes no fee.

The formula is calculated as:

$$
\mathrm{LIF} = \min \left( \mathrm{maxLIF},\ \frac{1}{(1 - \beta) \times (1 - \mathrm{LLTV})} \right)
$$

- `LLTV` - Liquidation Loan-to-Value threshold for that market (e.g., 0.86 = 86 %).
- `β` = 0.3 (constant) _cursor_
- `maxLIF` = 1.15 (i.e., 115%)

### Example: A Liquidation Scenario

$$
\mathrm{LIF} = \min \left( 1.15\, \mathrm{maxLIF},\ \frac{1}{(1 - 0.3\, \beta) \times (1 - 0.86, \mathrm{LLTV})} \right)
$$

$$
≈1.0434\, (≈5\%)\, LIF = min(1.15\, maxLIF,\, 1 ⁄ 0.958)
$$

- **Initial State**: A user has a position in a market with an LLTV of 86%. Their debt has grown to **$87,000**, while their collateral value has dropped to **$100,000**.
- **Health Check**: The LTV is 87% (`87k / 100k`), which is greater than the 86% LLTV. The position is liquidatable.
- **Liquidation**: A liquidator repays the full **$87,000** debt.
- **Collateral Seized**: The liquidator seizes `$87,000 * 1.05` (LIF) = **$91,350** worth of the borrower's collateral.
- **Outcome**:
  - **Borrower**: Their debt is cleared, but they lose $91,350 of their $100,000 collateral, incurring a loss of **$4,350**.
  - **Liquidator**: Profits by **$4,350** (minus gas and transaction costs).

### Bad Debt

In extreme cases where the collateral's value drops so fast that it becomes less than the debt (`LTV > 100%`), a liquidation might not cover the full loan. The remaining unpaid debt is known as **bad debt**. This represents a loss for lenders in that market. Bend's design, including its risk-isolated markets and conservative LLTVs, aims to make this a rare event.
