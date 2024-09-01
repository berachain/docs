# Glossary

## APY

Annual Percentage Yield, which is the yield/interest accrued after a year, which includes compounding interest. It is a standardized way of comparing the yield of different financial products & opportunities.

## Insolvency

Solvency, in a DeFi lending context, describes the state where all of the protocol's outstanding loans are backed by an equal or greater amount of collateral. Insolvency in Bend therefore describes a state where the value of the protocol's collateral is less than the outstanding `$HONEY` debt, meaning that `$HONEY` suppliers may experience a shortfall until solvency is restored.

## Over-Collateralized

Over-Collateralized describes a situation where the value of the collateral provided for a loan exceeds the value of the loan itself. This is a common practice in DeFi lending to reduce the risk of default and ensure that the lender can recover their funds even if the value of the collateral decreases.

## Under-Collateralized

Under-Collateralized refers to a scenario where the value of the collateral is less than the value of the loan it secures. At an individual user's level, if the ratio of the value of the collateral to the value of the loan falls below the Loan-to-Value ratio (e.g., `80%` for `WETH`), then the loan is eligible for liquidation.

## Loan-To-Value (LTV)

The maximum borrowing power of specific collateral. If `WETH` has an LTV of 80%, for every 1 `WETH` worth of collateral, the user will be able to borrow a maximum of 0.8 `WETH` worth of `$HONEY`.

## Flash Loans

Flash Loans are a type of uncollateralized loan in DeFi that must be borrowed and repaid within the same transaction. They allow developers to leverage significant amounts of capital without needing collateral, often used for arbitrage or liquidations.

Flash loans are currently disabled on Bend.

## Liquidation

Liquidation in a lending protocol occurs when a borrower's collateral is sold off to repay their loan due to the collateral value dropping below a required threshold. This process ensures that lenders recover their funds and the protocol's solvency is maintained.

## Searcher Bot

Liquidations are typically run by "Searcher Bots", which are automated systems used to identify and execute liquidation opportunities. These bots monitor the blockchain for under-collateralized loans and trigger the liquidation process to repay the loan and collect the collateral, with the goal of profiting from the liquidation bonus.

## Liquidation Bonus

The bonus received by liquidators to incentivize the purchase of users' collateral that have borrowing positions with a health factor below 1. The Liquidation Bonus is currently `5%`.
