# Borrowing $HONEY

On Bend, the primary asset you can borrow is `$HONEY`, the native stablecoin of the Berachain ecosystem. The borrowing process involves providing collateral, typically blue-chip assets, to secure the loan.

Check out [Borrowing](/learn/guides/borrowing-and-repaying-honey#how-do-i-borrow) guide to learn more.

## Borrow Logic

### **Borrowing Assets**

![Adding Liquidity](/assets/borrowLogic-borrowingAssets.png)

Overview of **borrowing** from Bend.

The diagram above captures the sequence of function calls that occurs when a user borrows from Bend:

1. User initiates the borrow process by calling Pool.sol’s `borrow()` function. Let’s say the user wants to borrow some `$HONEY` from the protocol.
2. Pool.sol then checks to see if the user has sufficient collateral in the protocol. Recall that users can only borrow in an over-collateralized fashion e.g. if the user wants to borrow $80 worth of `$HONEY`, they would need to have $100 worth of pre-existing liquidity in the protocol (the numbers here are arbitrary).
3. If the user has sufficient collateral, HONEY-VariableDebtToken.sol will mint debt`$HONEY` tokens to the user as well as send `$HONEY` tokens to the user.

Debt tokens are interest-accruing tokens that are minted and burned through `borrow()` and `repay()`, representing the debt owed by the token holder.

There are 2 types of debt tokens — Stable Debt Tokens (stable interest rate) and Variable Debt Tokens (variable interest rate). Although debt tokens are modelled on the ERC20/EIP20 standard, they are non-transferrable. Therefore they do not implement any of the standard ERC20/EIP20 functions relating to `transfer()` and `allowance()`. ("transfer()" function is not accessible/usable)

:::warning
<b>Warning</b><br/>
Currently we support `Variable Debt` tokens, which represent a debt to the protocol with variable interest rate.
:::

### **Returning Assets**

![Adding Liquidity](/assets/borrowLogic-returningAssets.png)

Overview of **repaying** to Bend.

The diagram above captures the sequence of function calls that occurs when a user borrows from Bend:

1. The user repays their loan by calling Pool.sol’s `repay()` function and transferring the repayment amount along with the transaction. Note that the repayment amount = principal amount borrowed + interest.
2. After the repayment is made, HONEY-VariableDebtToken.sol will `burn()` the amount of debt tokens that belongs to this user. This makes sense since the user has cleared this particular debt with the protocol.

Note that the debt tokens aren’t transferred from the user to Pool.sol since these tokens aren’t transferrable. They are instead burned directly from the debt token smart contract.

## Length of Loan & Repayment

The length of the loan on Bend is flexible and determined by the borrower. There is no fixed loan term; instead, the loan remains active until the borrower decides to repay it. To repay a loan, you must return the borrowed asset plus any accrued interest. Repayments can be made at any time through the Bend dashboard.

## Loan Health

The health of your loan on Bend is measured by the Health Factor (HF). This metric represents the security of your loan based on the value of your collateral relative to the borrowed amount. A Health Factor above 1 indicates a safe position, while an HF below 1 means the loan is undercollateralized and at risk of liquidation. To maintain a healthy loan, you should monitor your HF and adjust your collateral or repayments as needed.

## Liquidation

If your Health Factor falls below 1, your loan becomes eligible for liquidation. This means liquidators can repay part of your debt and, in return, claim your collateral plus a liquidation bonus. This process ensures the protocol remains solvent by addressing undercollateralized loans promptly. For more details please check [Liquidations](/learn/lending-protocol/liquidations).

## Rewards: $BGT

Borrowers on Bend can earn Berachain Governance Tokens (BGT) as a reward for their borrowing activities. BGT is a non-transferable token that can be earned through actions such as borrowing `$HONEY`. For more info please check [Bend Rewards](/learn/lending-protocol/bend-rewards).
