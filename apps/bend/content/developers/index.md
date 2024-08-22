# Bend Contract Overview

This section describes the smart contracts powering the Bend protocol, providing guidance for developers wishing to interact with them programmatically or for those wishing to gain a deeper understanding of the contracts.

Below, we walk through the primary contracts and their purpose in Bend.

## Pool

The [Pool contract](/developers/pool-logic) is the main user-facing contract of the protocol. Most users interactions with Bend will happen through this contract. Developers will mainly interact with the Pool contract through the following functions:

- [`deposit()`](/developers/contracts/pool#deposit)
- [`withdraw()`](/developers/contracts/pool#withdraw)
- [`borrow()`](/developers/contracts/pool#borrow)
- [`repay()`](/developers/contracts/pool#repay)
- [`liquidationCall()`](/developers/contracts/pool#liquidationcall)
- [`getUserAccountData()`](/developers/contracts/pool#getuseraccountdata)

## ATokens

[ATokens](/developers/contracts/atoken) represent the interest-bearing token that users receive when they deposit assets into Bend. ATokens are rebasing, meaning that the balance of ATokens increases over time as interest is accrued. ATokens are redeemable 1:1 with the underlying asset.

All standard ERC20 methods are implemented, such as `transfer`, `approve`, etc. Transfers are subject to health factor checks to ensure that the user's account is not at risk of liquidation (Health Factor < 1).

`mint` and `burn` functions are controlled by the `Pool` contract.

## Debt Tokens

The [VariableDebtToken](/developers/contracts/debttoken) tracks the `HONEY` borrowing positions of users at a variable interest rate.

_Transfer and approve functionalities are disabled since debt positions are non-transferable_
