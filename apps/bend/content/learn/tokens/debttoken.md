# $debtToken Overview

$debtTokens are issued when users borrow assets from the lending pools. These tokens represent the users’ debt obligation to the protocol.

$debtTokens are also associated with interest and are required to be repaid to the protocol to close out the borrowing position.

Note that there are 2 kinds of debt tokens — StableDebtToken.sol and VariableDebtToken.sol.

:::warning
<b>Warning</b><br/>
Debt tokens are not transferable.
:::

Currently we support `Variable Debt` tokens, which represent a debt to the protocol with variable interest rate.
