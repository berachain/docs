---
head:
  - - meta
    - property: og:title
      content: Errors
  - - meta
    - name: description
      content: Explanation Berps Error Codes.
  - - meta
    - property: og:description
      content: Explanation Berps Error Codes.
---

# Error Codes

If you receive numbered errors upon making calls to the Berps protocol, you can use the reference below to decipher the error.

| Signature  | Error Name              | Error Description                                                          |
| ---------- | ----------------------- | -------------------------------------------------------------------------- |
| 0x5863f789 | WrongParams             | The input parameters are incorrect or invalid.                             |
| 0x82b42900 | Unauthorized            | The caller is not authorized to perform the action.                        |
| 0x39c733d8 | InvalidExpo             | The Pyth price has an invalid exponent value.                              |
| 0xe7cd821c | InvalidConfidence       | The Pyth price confidence interval is wider than the desired threshold.    |
| 0x9f9fb434 | Done                    | The contract is in a "done" state and no further interactions are allowed. |
| 0x9e87fac8 | Paused                  | The contract is paused and certain actions are not allowed.                |
| 0xa3b36525 | NoTrade                 | The specified trade does not exist.                                        |
| 0xe6803dc4 | NoLimit                 | The specified limit order does not exist.                                  |
| 0x3577cd46 | WrongLimitPrice         | The provided limit price is incorrect or invalid.                          |
| 0x7f527065 | WrongTp                 | The provided take profit price is incorrect or invalid.                    |
| 0x62dd5ee3 | WrongSl                 | The provided stop loss price is incorrect or invalid.                      |
| 0x506bf1a8 | InTimeout               | The action is performed within a timeout period.                           |
| 0xfb30d03a | PriceImpactTooHigh      | The price impact of a trade is higher than the allowed threshold.          |
| 0xa1c00d42 | PairNotListed           | The specified trading pair is not listed.                                  |
| 0xa38355c0 | MaxTradesPerPair        | The maximum number of trades per pair is exceeded.                         |
| 0xb4503281 | AboveMaxPos             | The position size is above the maximum allowed limit.                      |
| 0x7061e4f8 | AboveMaxGroupCollateral | The collateral amount is above the maximum allowed limit for a group.      |
| 0x7061fe95 | LeverageIncorrect       | The provided leverage is incorrect or invalid.                             |
| 0x8d5543b1 | BelowMinPos             | The position size is below the minimum allowed limit.                      |
| 0x742087f6 | PriceNotHit             | The target price is not hit for a limit order.                             |
| 0x8199f5f3 | SlippageExceeded        | The slippage tolerance is exceeded for a trade.                            |
| 0x40305e8d | TpReached               | The take profit price is reached for a trade.                              |
| 0xfa0789e0 | SlReached               | The stop loss price is reached for a trade.                                |
| 0x0c26d69e | PastExposureLimits      | The exposure limits are exceeded for a trade.                              |
| 0x0b5f6bf0 | MarketClosed            | The market is closed and trading is not allowed.                           |
| 0xe528e11e | PriceZero               | The price is zero, which is an invalid value.                              |
| 0x423023f1 | PendingWithdrawal       | A withdrawal is already pending for an address.                            |
| 0x4e00e1c0 | MoreThanWithdrawAmount  | The requested withdrawal amount is more than the available balance.        |
| 0x3786fdd4 | NotEnoughAssets         | There are not enough assets available for the operation.                   |
| 0xb2ac7c0c | MaxDailyPnL             | The maximum daily profit and loss limit is exceeded.                       |
| 0x3b8698ab | MaxDeposit              | The deposit amount exceeds the maximum allowed limit.                      |
| 0x3ae3d0cf | MaxWithdraw             | The withdrawal amount exceeds the maximum allowed limit.                   |
| 0xf4d678b8 | InsufficientBalance     | The balance is insufficient for the operation.                             |
| 0x085de625 | TooEarly                | An action is performed too early before the allowed time.                  |
| 0x61104228 | InvalidReferrer         | The provided referrer address is invalid.                                  |
| 0x7aabdfe3 | AlreadyReferred         | The user has already been referred by someone.                             |
| 0x8f6f8611 | ReferralCycle           | There is a referral cycle detected, i.e., a user referring themselves.     |
