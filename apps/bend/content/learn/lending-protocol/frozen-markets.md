# Frozen Markets and Reserves

## How is a reserve or market frozen?

A reserve on the Bend Protocol can be frozen by calling the `setReserveFreeze` function on the PoolConfigurator contract, which is deployed for each Bend market. This function is callable by addresses with the `RiskAdmin` or `PoolAdmin` role, which is owned by Bend Governance, and can also be granted this role.

## What is a frozen reserve?

A frozen reserve does not allow any new supply, borrow, or rate switch (variable/stable). A frozen reserve does allow for repay, withdraw, liquidations, and interest accrual (stable rate rebalances).

## Can a reserve or market be unfrozen?

Yes, the unfreezing process, along with the smart contract function, can be applied in the same manner if the conditions are favorable for reestablishing reserves for both supply and borrow.
