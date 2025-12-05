# Flash Loans

Flash loans are a powerful DeFi primitive that allow users to borrow assets without collateral, as long as the borrowed amount is returned within the same transaction block.

## What Are Flash Loans in Bend?

Bend's flash loans are similar to other DeFi protocols where these:

- Allow borrowing without prior collateral
- Require repayment within the same transaction
- Execute in a single block
- Are primarily meant for developers and advanced users

## How Bend Flash Loans Work

The core flash loan functionality is implemented through the `flashLoan` function in the Morpho contract with a corresponding callback mechanism.

### The Flash Loan Flow in Bend

1. **Initiation**: A user contract calls `morpho.flashLoan(token, amount, data)`
2. **Asset Transfer**: Bend (Morpho) transfers the requested token amount to the calling contract
3. **Callback Execution**: Bend (Morpho) calls `onMorphoFlashLoan(amount, data)` on the caller contract
4. **Execution of Logic**: The user's contract executes its intended operations
5. **Repayment**: The user's contract must approve Bend (Morpho) to pull back the borrowed amount
6. **Completion**: Bend (Morpho) pulls the funds back from the caller contract

If at any point the flow fails (especially if the repayment fails), the entire transaction reverts.

## Implementing a Flash Loan in Bend

To use a flash loan with Bend, you need to:

1. Create a contract that implements the `IMorphoFlashLoanCallback` interface
2. Implement the `onMorphoFlashLoan` function that will handle your logic
3. Ensure your callback function approves the Bend contract to pull back the borrowed amount

## Flash Loan Use Cases with Bend

1. **Arbitrage**: Execute trades across different protocols to profit from price discrepancies
2. **Collateral Swaps**: Replace one collateral type with another in a single transaction
3. **Self-Liquidation**: Liquidate your own position to avoid liquidation penalties
4. **Flash Actions**: Combine multiple Bend operations in a single transaction

## Security Considerations for Bend Flash Loans

1. **Transaction Atomicity**: If your callback fails to approve the repayment, the entire transaction will revert
2. **Contract Security**: Never leave funds in your flash loan contract permanently
3. **Reentrancy**: Be careful about calling external contracts within your flash loan logic
4. **Gas Management**: Flash loans are complex operations that consume significant gas

## Bend-Specific Callbacks

Bend implements a broader callback system:

- `IMorphoLiquidateCallback`: For liquidation operations
- `IMorphoRepayCallback`: For repayment operations
- `IMorphoSupplyCallback`: For supply operations
- `IMorphoSupplyCollateralCallback`: For supplying collateral

This comprehensive callback system allows for more complex transaction patterns beyond simple flash loans, such as combining supply, borrow, repay, and withdraw operations in a single transaction flow.
