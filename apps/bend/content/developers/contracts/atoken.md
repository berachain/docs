# AToken Contract Interface

aTokens are tokens minted and burnt upon supply and withdraw of assets to Bend, which denote the amount of crypto assets supplied and the yield earned on those assets. aTokens’ value is pegged to the value of the corresponding supplied asset at a 1:1 ratio and can be safely stored, transferred or traded. All yield collected by the aTokens' reserves are distributed to aToken holders directly by continuously increasing their wallet balance (i.e. rebasing).

All standard EIP20 methods are implemented for aTokens, such as `balanceOf`, `transfer`, `transferFrom`, `approve`, `totalSupply` etc.

### mint

```solidity
function mint(address caller, address onBehalfOf, uint256 amount, uint256 index) external virtual returns (bool)
```

Mints `amount` aTokens to `user`

#### Parameters

| Name       | Type    | Description                                                  |
| ---------- | ------- | ------------------------------------------------------------ |
| caller     | address | The address performing the mint                              |
| onBehalfOf | address | The address of the user that will receive the minted aTokens |
| amount     | uint256 | The amount of tokens getting minted                          |
| index      | uint256 | The next liquidity index of the reserve                      |

#### Return Values

| Name | Type | Description                                          |
| ---- | ---- | ---------------------------------------------------- |
| [0]  | bool | `true` if the the previous balance of the user was 0 |

### burn

```solidity
function burn(address from, address receiverOfUnderlying, uint256 amount, uint256 index) external virtual
```

Burns aTokens from `user` and sends the equivalent amount of underlying to `receiverOfUnderlying`

_In some instances, the mint event could be emitted from a burn transaction
if the amount to burn is less than the interest that the user accrued_

#### Parameters

| Name                 | Type    | Description                                       |
| -------------------- | ------- | ------------------------------------------------- |
| from                 | address | The address from which the aTokens will be burned |
| receiverOfUnderlying | address | The address that will receive the underlying      |
| amount               | uint256 | The amount being burned                           |
| index                | uint256 | The next liquidity index of the reserve           |

### mintToPOLFeeCollector

```solidity
function mintToPOLFeeCollector(uint256 amount, uint256 index) external virtual
```

Mints aTokens to the reserve POL fee collector

#### Parameters

| Name   | Type    | Description                             |
| ------ | ------- | --------------------------------------- |
| amount | uint256 | The amount of tokens getting minted     |
| index  | uint256 | The next liquidity index of the reserve |

### transferOnLiquidation

```solidity
function transferOnLiquidation(address from, address to, uint256 value) external virtual
```

Transfers aTokens in the event of a borrow being liquidated, in case the liquidators reclaims the aToken

#### Parameters

| Name  | Type    | Description                                                  |
| ----- | ------- | ------------------------------------------------------------ |
| from  | address | The address getting liquidated, current owner of the aTokens |
| to    | address | The recipient                                                |
| value | uint256 | The amount of tokens getting transferred                     |

### balanceOf

```solidity
function balanceOf(address user) public view virtual returns (uint256)
```

_Returns the amount of tokens owned by `account`._

### totalSupply

```solidity
function totalSupply() public view virtual returns (uint256)
```

_Returns the amount of tokens in existence._

### RESERVE_POL_FEE_COLLECTOR

```solidity
function RESERVE_POL_FEE_COLLECTOR() external view returns (address)
```

Returns the address of the POL fee collector, receiving the fees on this aToken.

_The Fee is used to distribute among the BGT delegator._

#### Return Values

| Name | Type    | Description                                      |
| ---- | ------- | ------------------------------------------------ |
| [0]  | address | Address of the Berachain fee collector contract. |

### UNDERLYING_ASSET_ADDRESS

```solidity
function UNDERLYING_ASSET_ADDRESS() external view returns (address)
```

Returns the address of the underlying asset of this aToken (E.g. WETH for aWETH)

#### Return Values

| Name | Type    | Description                         |
| ---- | ------- | ----------------------------------- |
| [0]  | address | The address of the underlying asset |

### transferUnderlyingTo

```solidity
function transferUnderlyingTo(address target, uint256 amount) external virtual
```

Transfers the underlying asset to `target`.

_Used by the Pool to transfer assets in borrow(), withdraw() and flashLoan()_

#### Parameters

| Name   | Type    | Description                     |
| ------ | ------- | ------------------------------- |
| target | address | The recipient of the underlying |
| amount | uint256 | The amount getting transferred  |

### handleRepayment

```solidity
function handleRepayment(address user, address onBehalfOf, uint256 amount) external virtual
```

Handles the underlying received by the aToken after the transfer has been completed.

_The default implementation is empty as with standard ERC20 tokens, nothing needs to be done after the
transfer is concluded. However in the future there may be aTokens that allow for example to stake the underlying
to receive LM rewards. In that case, `handleRepayment()` would perform the staking of the underlying asset._

#### Parameters

| Name       | Type    | Description                                                   |
| ---------- | ------- | ------------------------------------------------------------- |
| user       | address | The user executing the repayment                              |
| onBehalfOf | address | The address of the user who will get his debt reduced/removed |
| amount     | uint256 | The amount getting repaid                                     |

### permit

```solidity
function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s) external
```

Allow passing a signed message to approve spending

_implements the permit function as for
https://github.com/ethereum/EIPs/blob/8a34d644aacf0f9f8f00815307fd7dd5da07655f/EIPS/eip-2612.md_

#### Parameters

| Name     | Type    | Description                                                |
| -------- | ------- | ---------------------------------------------------------- |
| owner    | address | The owner of the funds                                     |
| spender  | address | The spender                                                |
| value    | uint256 | The amount                                                 |
| deadline | uint256 | The deadline timestamp, type(uint256).max for max deadline |
| v        | uint8   | Signature param                                            |
| r        | bytes32 | Signature param                                            |
| s        | bytes32 | Signature param                                            |

### \_transfer

```solidity
function _transfer(address from, address to, uint256 amount, bool validate) internal virtual
```

Transfers the aTokens between two users. Validates the transfer
(ie checks for valid HF after the transfer) if required

#### Parameters

| Name     | Type    | Description                                                 |
| -------- | ------- | ----------------------------------------------------------- |
| from     | address | The source address                                          |
| to       | address | The destination address                                     |
| amount   | uint256 | The amount getting transferred                              |
| validate | bool    | True if the transfer needs to be validated, false otherwise |

### \_transfer

```solidity
function _transfer(address from, address to, uint128 amount) internal virtual
```

Overrides the parent \_transfer to force validated transfer() and transferFrom()

#### Parameters

| Name   | Type    | Description                    |
| ------ | ------- | ------------------------------ |
| from   | address | The source address             |
| to     | address | The destination address        |
| amount | uint128 | The amount getting transferred |

### DOMAIN_SEPARATOR

```solidity
function DOMAIN_SEPARATOR() public view returns (bytes32)
```

_Overrides the base function to fully implement IAToken
see `EIP712Base.DOMAIN_SEPARATOR()` for more detailed documentation_

### nonces

```solidity
function nonces(address owner) public view returns (uint256)
```

_Overrides the base function to fully implement IAToken
see `EIP712Base.nonces()` for more detailed documentation_

### \_EIP712BaseId

```solidity
function _EIP712BaseId() internal view returns (string)
```

Returns the user readable name of signing domain (e.g. token name)

#### Return Values

| Name | Type   | Description                    |
| ---- | ------ | ------------------------------ |
| [0]  | string | The name of the signing domain |

### rescueTokens

```solidity
function rescueTokens(address token, address to, uint256 amount) external
```

Rescue and transfer tokens locked in this contract

#### Parameters

| Name   | Type    | Description                     |
| ------ | ------- | ------------------------------- |
| token  | address | The address of the token        |
| to     | address | The address of the recipient    |
| amount | uint256 | The amount of token to transfer |

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
