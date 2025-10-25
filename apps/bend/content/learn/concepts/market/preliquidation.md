# Pre-Liquidation (Auto-Deleveraging)

**Pre-Liquidation**, also known as Auto-Deleveraging, is an optional, opt-in mechanism that offers an additional layer of safety for borrowers on Bend. It allows for small, partial liquidations to occur _before_ a position reaches the standard liquidation threshold, helping to automatically reduce risk and prevent a full, more costly liquidation.

Think of it as a "safety zone" where a position can be gently corrected instead of falling off a cliff.

## How Pre-Liquidation Works

Standard liquidation is an all-or-nothing event triggered when a position's Health Factor hits 1.0. Pre-liquidation introduces a buffer zone.

- **Standard Liquidation**: Triggers when `LTV >= LLTV`.
- **Pre-Liquidation**: Triggers when `preLLTV <= LTV < LLTV`.

A borrower can opt-in to a pre-liquidation contract, defining a `preLLTV` (Pre-Liquidation Loan-to-Value) that is lower than the market's `LLTV`. If their LTV enters this zone, a portion of their debt can be liquidated early.

### Key Benefits for the Borrower

1. **Avoids Full Liquidation:** The primary benefit is preventing a single, large liquidation event. Instead of losing a significant chunk of their collateral at once, the user experiences smaller, incremental deleveraging.
2. **Reduced Losses:** The incentive (bonus) for pre-liquidators is typically lower than the standard Liquidation Incentive Factor (LIF). This means the penalty paid by the borrower during a partial, pre-liquidation is smaller.
3. **Automatic Risk Management:** It acts as an automated safety net. If a user is away from their screen and their position becomes risky, the pre-liquidation mechanism can help bring their position back to a healthier LTV without their manual intervention.

### The Pre-Liquidation Mechanism

When a position enters the pre-liquidation zone, the mechanism works as follows:

- **Partial Repayment:** A pre-liquidator repays a small percentage of the user's debt. The exact percentage is dynamic and increases as the LTV gets closer to the `LLTV`. This is controlled by the **preLCF (Pre-Liquidation Close Factor)**.
- **Smaller Incentive:** The pre-liquidator receives a smaller bonus, defined by the **preLIF (Pre-Liquidation Incentive Factor)**.
- **Position Deleveraged:** After the pre-liquidation, the borrower's debt is lower, and their LTV is brought back down toward the `preLLTV`, returning them to a safer state.

### Example: Standard vs. Pre-Liquidation

Consider a user with a position in a market where `LLTV` is 86% and they've opted into pre-liquidation with a `preLLTV` of 83%.

| Scenario                 | Standard Liquidation (No Pre-liquidation)                                  | With Pre-Liquidation                                                                |
| ------------------------ | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **Trigger**              | The collateral price drops until LTV hits 86%.                             | The collateral price drops until LTV hits 84%.                                      |
| **Liquidation Event**    | A liquidator repays **100%** of the debt.                                  | A pre-liquidator repays **~12%** of the debt.                                       |
| **Penalty (Incentive)**  | The liquidator receives a **~5%** bonus (LIF).                             | The pre-liquidator receives a **~4%** bonus (preLIF).                               |
| **Outcome for Borrower** | Position is fully closed. The borrower incurs a significant one-time loss. | Position remains open, but with less debt and collateral. The loss is much smaller. |

In this case, pre-liquidation acted as a circuit breaker, preventing a more damaging full liquidation.

## Integration Considerations

While pre-liquidation is a powerful safety feature, it is an advanced concept.

- **Opt-In Nature:** As an integrator, you can choose whether to offer this feature to your users. Because it is opt-in, it requires user authorization.
- **Parameter Complexity:** Pre-liquidation introduces additional parameters (`preLLTV`, `preLCF`, etc.) that need to be managed and clearly explained.
- **User Education:** If you integrate this feature, it's essential to educate users on how it works, why it's beneficial, and what they are authorizing.

For most integrations, focusing on a robust and clear implementation of the **standard liquidation** warnings and user flows is the highest priority. Offering pre-liquidation can be a valuable addition for more sophisticated users or as a distinguishing feature of your application.
