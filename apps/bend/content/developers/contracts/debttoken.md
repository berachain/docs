# VariableDebtToken Contract Interface

Implements a variable debt token to track the borrowing positions of users at a variable interest rate.

_Transfer and approve functionalities are disabled since debt positions are non-transferable_

Although debt tokens are modelled on the ERC20/EIP20 standard, they are non-transferrable. Therefore they do not implement any of the standard ERC20/EIP20 functions relating to `transfer()` and `allowance()`.

### balanceOf

```solidity
function balanceOf(address user) public view virtual returns (uint256)
```

### mint

```solidity
function mint(address user, address onBehalfOf, uint256 amount, uint256 index) external virtual returns (bool, uint256)
```

Mints debt token to the `onBehalfOf` address

#### Parameters

| Name       | Type    | Description                                                                                                                      |
| ---------- | ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| user       | address | The address receiving the borrowed underlying, being the delegatee in case of credit delegate, or same as `onBehalfOf` otherwise |
| onBehalfOf | address | The address receiving the debt tokens                                                                                            |
| amount     | uint256 | The amount of debt being minted                                                                                                  |
| index      | uint256 | The variable debt index of the reserve                                                                                           |

#### Return Values

| Name | Type    | Description                                                    |
| ---- | ------- | -------------------------------------------------------------- |
| [0]  | bool    | True if the previous balance of the user is 0, false otherwise |
| [1]  | uint256 | The scaled total debt of the reserve                           |

### burn

```solidity
function burn(address from, uint256 amount, uint256 index) external virtual returns (uint256)
```

Burns user variable debt

_In some instances, a burn transaction will emit a mint event
if the amount to burn is less than the interest that the user accrued_

#### Parameters

| Name   | Type    | Description                                    |
| ------ | ------- | ---------------------------------------------- |
| from   | address | The address from which the debt will be burned |
| amount | uint256 | The amount getting burned                      |
| index  | uint256 | The variable debt index of the reserve         |

#### Return Values

| Name | Type    | Description                          |
| ---- | ------- | ------------------------------------ |
| [0]  | uint256 | The scaled total debt of the reserve |

### totalSupply

```solidity
function totalSupply() public view virtual returns (uint256)
```

### \_EIP712BaseId

```solidity
function _EIP712BaseId() internal view returns (string)
```

Returns the user readable name of signing domain (e.g. token name)

#### Return Values

| Name | Type   | Description                    |
| ---- | ------ | ------------------------------ |
| [0]  | string | The name of the signing domain |

### transfer

```solidity
function transfer(address, uint256) external virtual returns (bool)
```

_Being non transferrable, the debt token does not implement any of the
standard ERC20 functions for transfer and allowance._

### allowance

```solidity
function allowance(address, address) external view virtual returns (uint256)
```

### approve

```solidity
function approve(address, uint256) external virtual returns (bool)
```

### transferFrom

```solidity
function transferFrom(address, address, uint256) external virtual returns (bool)
```

### increaseAllowance

```solidity
function increaseAllowance(address, uint256) external virtual returns (bool)
```

### decreaseAllowance

```solidity
function decreaseAllowance(address, uint256) external virtual returns (bool)
```

### UNDERLYING_ASSET_ADDRESS

```solidity
function UNDERLYING_ASSET_ADDRESS() external view returns (address)
```

Returns the address of the underlying asset of this debtToken (E.g. WETH for variableDebtWETH)

#### Return Values

| Name | Type    | Description                         |
| ---- | ------- | ----------------------------------- |
| [0]  | address | The address of the underlying asset |

### approveDelegation

```solidity
function approveDelegation(address delegatee, uint256 amount) external
```

Delegates borrowing power to a user on the specific debt token.
Delegation will still respect the liquidation constraints (even if delegated, a
delegatee cannot force a delegator HF to go below 1)

#### Parameters

| Name      | Type    | Description                                         |
| --------- | ------- | --------------------------------------------------- |
| delegatee | address | The address receiving the delegated borrowing power |
| amount    | uint256 | The maximum amount being delegated.                 |

### delegationWithSig

```solidity
function delegationWithSig(address delegator, address delegatee, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s) external
```

Delegates borrowing power to a user on the specific debt token via ERC712 signature

#### Parameters

| Name      | Type    | Description                                                |
| --------- | ------- | ---------------------------------------------------------- |
| delegator | address | The delegator of the credit                                |
| delegatee | address | The delegatee that can use the credit                      |
| value     | uint256 | The amount to be delegated                                 |
| deadline  | uint256 | The deadline timestamp, type(uint256).max for max deadline |
| v         | uint8   | The V signature param                                      |
| r         | bytes32 | The R signature param                                      |
| s         | bytes32 | The S signature param                                      |

### borrowAllowance

```solidity
function borrowAllowance(address fromUser, address toUser) external view returns (uint256)
```

Returns the borrow allowance of the user

#### Parameters

| Name     | Type    | Description                   |
| -------- | ------- | ----------------------------- |
| fromUser | address | The user to giving allowance  |
| toUser   | address | The user to give allowance to |

#### Return Values

| Name | Type    | Description                       |
| ---- | ------- | --------------------------------- |
| [0]  | uint256 | The current allowance of `toUser` |

### scaledBalanceOf

```solidity
function scaledBalanceOf(address user) external view returns (uint256)
```

Returns the scaled balance of the user.

_The scaled balance is the sum of all the updated stored balance divided by the reserve's liquidity index
at the moment of the update_

#### Parameters

| Name | Type    | Description                          |
| ---- | ------- | ------------------------------------ |
| user | address | The user whose balance is calculated |

#### Return Values

| Name | Type    | Description                    |
| ---- | ------- | ------------------------------ |
| [0]  | uint256 | The scaled balance of the user |

### getScaledUserBalanceAndSupply

```solidity
function getScaledUserBalanceAndSupply(address user) external view returns (uint256, uint256)
```

Returns the scaled balance of the user and the scaled total supply.

#### Parameters

| Name | Type    | Description             |
| ---- | ------- | ----------------------- |
| user | address | The address of the user |

#### Return Values

| Name | Type    | Description                    |
| ---- | ------- | ------------------------------ |
| [0]  | uint256 | The scaled balance of the user |
| [1]  | uint256 | The scaled total supply        |

### scaledTotalSupply

```solidity
function scaledTotalSupply() public view virtual returns (uint256)
```

Returns the scaled total supply of the scaled balance token. Represents sum(debt/index)

#### Return Values

| Name | Type    | Description             |
| ---- | ------- | ----------------------- |
| [0]  | uint256 | The scaled total supply |

### getPreviousIndex

```solidity
function getPreviousIndex(address user) external view virtual returns (uint256)
```

Returns last index interest was accrued to the user's balance

#### Parameters

| Name | Type    | Description             |
| ---- | ------- | ----------------------- |
| user | address | The address of the user |

#### Return Values

| Name | Type    | Description                                                                 |
| ---- | ------- | --------------------------------------------------------------------------- |
| [0]  | uint256 | The last index interest was accrued to the user's balance, expressed in ray |
