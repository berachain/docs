# Pool Contract Interface

Main point of interaction with Bend.

Users can:

- Supply
- Withdraw
- Borrow
- Repay
- Enable/disable their supplied assets as collateral rebalance stable rate borrow positions
- Liquidate positions

### supply

Supplies an `amount` of underlying asset into the reserve, receiving in return overlying aTokens.

- E.g. User supplies 100 `$HONEY` and gets in return 100 `a$HONEY`

```solidity
function supply(address asset, uint256 amount, address onBehalfOf, uint16 referralCode) public virtual override;
```

**Parameters**

| Name           | Type      | Description                                                                                                                                                                                   |
| -------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `asset`        | `address` | The address of the underlying asset to supply                                                                                                                                                 |
| `amount`       | `uint256` | The amount to be supplied                                                                                                                                                                     |
| `onBehalfOf`   | `address` | The address that will receive the aTokens, same as msg.sender if the user wants to receive them on his own wallet, or a different address if the beneficiary of aTokens is a different wallet |
| `referralCode` | `uint16`  | Code used to register the integrator originating the operation, for potential rewards. 0 if the action is executed directly by the user, without any middle-man                               |

### supplyWithPermit

Supply with transfer approval of asset to be supplied done via permit function
see: https://eips.ethereum.org/EIPS/eip-2612 and https://eips.ethereum.org/EIPS/eip-712

```solidity
function supplyWithPermit(
    address asset,
    uint256 amount,
    address onBehalfOf,
    uint16 referralCode,
    uint256 deadline,
    uint8 permitV,
    bytes32 permitR,
    bytes32 permitS
) public virtual override;
```

**Parameters**

| Name           | Type      | Description                                                                                                                                                                                   |
| -------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `asset`        | `address` | The address of the underlying asset to supply                                                                                                                                                 |
| `amount`       | `uint256` | The amount to be supplied                                                                                                                                                                     |
| `onBehalfOf`   | `address` | The address that will receive the aTokens, same as msg.sender if the user wants to receive them on his own wallet, or a different address if the beneficiary of aTokens is a different wallet |
| `referralCode` | `uint16`  | Code used to register the integrator originating the operation, for potential rewards. 0 if the action is executed directly by the user, without any middle-man                               |
| `deadline`     | `uint256` | The deadline timestamp that the permit is valid                                                                                                                                               |
| `permitV`      | `uint8`   | The V parameter of ERC712 permit sig                                                                                                                                                          |
| `permitR`      | `bytes32` | The R parameter of ERC712 permit sig                                                                                                                                                          |
| `permitS`      | `bytes32` | The S parameter of ERC712 permit sig                                                                                                                                                          |

### withdraw

Withdraws an `amount` of underlying asset from the reserve, burning the equivalent aTokens owned
E.g. User has 100 `a$HONEY`, calls withdraw() and receives 100 `$HONEY`, burning the 100 `$aHONEY`

```solidity
function withdraw(address asset, uint256 amount, address to) public virtual override returns (uint256);
```

**Parameters**

| Name     | Type      | Description                                                                                                                                                                         |
| -------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `asset`  | `address` | The address of the underlying asset to withdraw                                                                                                                                     |
| `amount` | `uint256` | The underlying amount to be withdrawn - Send the value type(uint256).max in order to withdraw the whole aToken balance                                                              |
| `to`     | `address` | The address that will receive the underlying, same as msg.sender if the user wants to receive it on his own wallet, or a different address if the beneficiary is a different wallet |

**Returns**

| Name     | Type      | Description                |
| -------- | --------- | -------------------------- |
| `<none>` | `uint256` | The final amount withdrawn |

### borrow

Allows users to borrow a specific `amount` of the reserve underlying asset, provided that the borrower
already supplied enough collateral, or he was given enough allowance by a credit delegator on the
corresponding debt token (StableDebtToken or VariableDebtToken)

- E.g. User borrows 100 `$HONEY` passing as `onBehalfOf` his own address, receiving the 100 `$HONEY` in his wallet
  and 100 stable/variable debt tokens, depending on the `interestRateMode`

```solidity
function borrow(address asset, uint256 amount, uint256 interestRateMode, uint16 referralCode, address onBehalfOf)
    public
    virtual
    override;
```

**Parameters**

| Name               | Type      | Description                                                                                                                                                                                                                                                    |
| ------------------ | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `asset`            | `address` | The address of the underlying asset to borrow                                                                                                                                                                                                                  |
| `amount`           | `uint256` | The amount to be borrowed                                                                                                                                                                                                                                      |
| `interestRateMode` | `uint256` | The interest rate mode at which the user wants to borrow: 1 for Stable, 2 for Variable                                                                                                                                                                         |
| `referralCode`     | `uint16`  | The code used to register the integrator originating the operation, for potential rewards. 0 if the action is executed directly by the user, without any middle-man                                                                                            |
| `onBehalfOf`       | `address` | The address of the user who will receive the debt. Should be the address of the borrower itself calling the function if he wants to borrow against his own collateral, or the address of the credit delegator if he has been given credit delegation allowance |

### repay

Repays a borrowed `amount` on a specific reserve, burning the equivalent debt tokens owned

- E.g. User repays 100 `$HONEY`, burning 100 variable/stable debt tokens of the `onBehalfOf` address

```solidity
function repay(address asset, uint256 amount, uint256 interestRateMode, address onBehalfOf)
    public
    virtual
    override
    returns (uint256);
```

**Parameters**

| Name               | Type      | Description                                                                                                                                                                                                                        |
| ------------------ | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `asset`            | `address` | The address of the borrowed underlying asset previously borrowed                                                                                                                                                                   |
| `amount`           | `uint256` | The amount to repay - Send the value type(uint256).max in order to repay the whole debt for `asset` on the specific `debtMode`                                                                                                     |
| `interestRateMode` | `uint256` | The interest rate mode at of the debt the user wants to repay: 1 for Stable, 2 for Variable                                                                                                                                        |
| `onBehalfOf`       | `address` | The address of the user who will get his debt reduced/removed. Should be the address of the user calling the function if he wants to reduce/remove his own debt, or the address of any other borrower whose debt should be removed |

**Returns**

| Name     | Type      | Description             |
| -------- | --------- | ----------------------- |
| `<none>` | `uint256` | The final amount repaid |

### repayWithPermit

Repay with transfer approval of asset to be repaid done via permit function
see: https://eips.ethereum.org/EIPS/eip-2612 and https://eips.ethereum.org/EIPS/eip-713

```solidity
function repayWithPermit(
    address asset,
    uint256 amount,
    uint256 interestRateMode,
    address onBehalfOf,
    uint256 deadline,
    uint8 permitV,
    bytes32 permitR,
    bytes32 permitS
) public virtual override returns (uint256);
```

**Parameters**

| Name               | Type      | Description                                                                                                                                                                                                                    |
| ------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `asset`            | `address` | The address of the borrowed underlying asset previously borrowed                                                                                                                                                               |
| `amount`           | `uint256` | The amount to repay - Send the value type(uint256).max in order to repay the whole debt for `asset` on the specific `debtMode`                                                                                                 |
| `interestRateMode` | `uint256` | The interest rate mode at of the debt the user wants to repay: 1 for Stable, 2 for Variable                                                                                                                                    |
| `onBehalfOf`       | `address` | Address of the user who will get his debt reduced/removed. Should be the address of the user calling the function if he wants to reduce/remove his own debt, or the address of any other borrower whose debt should be removed |
| `deadline`         | `uint256` | The deadline timestamp that the permit is valid                                                                                                                                                                                |
| `permitV`          | `uint8`   | The V parameter of ERC712 permit sig                                                                                                                                                                                           |
| `permitR`          | `bytes32` | The R parameter of ERC712 permit sig                                                                                                                                                                                           |
| `permitS`          | `bytes32` | The S parameter of ERC712 permit sig                                                                                                                                                                                           |

**Returns**

| Name     | Type      | Description             |
| -------- | --------- | ----------------------- |
| `<none>` | `uint256` | The final amount repaid |

### repayWithATokens

Repays a borrowed `amount` on a specific reserve using the reserve aTokens, burning the
equivalent debt tokens

- E.g. User repays 100 `$HONEY` using 100 `a$HONEY`, burning 100 variable/stable debt tokens

_Passing uint256.max as amount will clean up any residual aToken dust balance, if the user aToken
balance is not enough to cover the whole debt_

```solidity
function repayWithATokens(address asset, uint256 amount, uint256 interestRateMode)
    public
    virtual
    override
    returns (uint256);
```

**Parameters**

| Name               | Type      | Description                                                                                                                    |
| ------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `asset`            | `address` | The address of the borrowed underlying asset previously borrowed                                                               |
| `amount`           | `uint256` | The amount to repay - Send the value type(uint256).max in order to repay the whole debt for `asset` on the specific `debtMode` |
| `interestRateMode` | `uint256` | The interest rate mode at of the debt the user wants to repay: 1 for Stable, 2 for Variable                                    |

**Returns**

| Name     | Type      | Description             |
| -------- | --------- | ----------------------- |
| `<none>` | `uint256` | The final amount repaid |

### setUserUseReserveAsCollateral

Allows suppliers to enable/disable a specific supplied asset as collateral

```solidity
function setUserUseReserveAsCollateral(address asset, bool useAsCollateral) public virtual override;
```

**Parameters**

| Name              | Type      | Description                                                             |
| ----------------- | --------- | ----------------------------------------------------------------------- |
| `asset`           | `address` | The address of the underlying asset supplied                            |
| `useAsCollateral` | `bool`    | True if the user wants to use the supply as collateral, false otherwise |

### liquidationCall

Function to liquidate a non-healthy position collateral-wise, with Health Factor below 1

- The caller (liquidator) covers `debtToCover` amount of debt of the user getting liquidated, and receives
  a proportionally amount of the `collateralAsset` plus a bonus to cover market risk

```solidity
function liquidationCall(
    address collateralAsset,
    address debtAsset,
    address user,
    uint256 debtToCover,
    bool receiveAToken
) public virtual override;
```

**Parameters**

| Name              | Type      | Description                                                                                                                              |
| ----------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `collateralAsset` | `address` | The address of the underlying asset used as collateral, to receive as result of the liquidation                                          |
| `debtAsset`       | `address` | The address of the underlying borrowed asset to be repaid with the liquidation                                                           |
| `user`            | `address` | The address of the borrower getting liquidated                                                                                           |
| `debtToCover`     | `uint256` | The debt amount of borrowed `asset` the liquidator wants to cover                                                                        |
| `receiveAToken`   | `bool`    | True if the liquidators wants to receive the collateral aTokens, `false` if he wants to receive the underlying collateral asset directly |

### getReserveData

Returns the state and configuration of the reserve

```solidity
function getReserveData(address asset) external view virtual override returns (DataTypes.ReserveData memory);
```

**Parameters**

| Name    | Type      | Description                                        |
| ------- | --------- | -------------------------------------------------- |
| `asset` | `address` | The address of the underlying asset of the reserve |

**Returns**

| Name     | Type                    | Description                                     |
| -------- | ----------------------- | ----------------------------------------------- |
| `<none>` | `DataTypes.ReserveData` | The state and configuration data of the reserve |

### getUserAccountData

Returns the user account data across all the reserves

```solidity
function getUserAccountData(address user)
    external
    view
    virtual
    override
    returns (
        uint256 totalCollateralBase,
        uint256 totalDebtBase,
        uint256 availableBorrowsBase,
        uint256 currentLiquidationThreshold,
        uint256 ltv,
        uint256 healthFactor
    );
```

**Parameters**

| Name   | Type      | Description             |
| ------ | --------- | ----------------------- |
| `user` | `address` | The address of the user |

**Returns**

| Name                          | Type      | Description                                                                      |
| ----------------------------- | --------- | -------------------------------------------------------------------------------- |
| `totalCollateralBase`         | `uint256` | The total collateral of the user in the base currency used by the price feed     |
| `totalDebtBase`               | `uint256` | The total debt of the user in the base currency used by the price feed           |
| `availableBorrowsBase`        | `uint256` | The borrowing power left of the user in the base currency used by the price feed |
| `currentLiquidationThreshold` | `uint256` | The liquidation threshold of the user                                            |
| `ltv`                         | `uint256` | The loan to value of The user                                                    |
| `healthFactor`                | `uint256` | The current health factor of the user                                            |

### getConfiguration

Returns the configuration of the reserve

```solidity
function getConfiguration(address asset)
    external
    view
    virtual
    override
    returns (DataTypes.ReserveConfigurationMap memory);
```

**Parameters**

| Name    | Type      | Description                                        |
| ------- | --------- | -------------------------------------------------- |
| `asset` | `address` | The address of the underlying asset of the reserve |

**Returns**

| Name     | Type                                | Description                      |
| -------- | ----------------------------------- | -------------------------------- |
| `<none>` | `DataTypes.ReserveConfigurationMap` | The configuration of the reserve |

### getUserConfiguration

Returns the configuration of the user across all the reserves

```solidity
function getUserConfiguration(address user)
    external
    view
    virtual
    override
    returns (DataTypes.UserConfigurationMap memory);
```

**Parameters**

| Name   | Type      | Description      |
| ------ | --------- | ---------------- |
| `user` | `address` | The user address |

**Returns**

| Name     | Type                             | Description                   |
| -------- | -------------------------------- | ----------------------------- |
| `<none>` | `DataTypes.UserConfigurationMap` | The configuration of the user |

### getReserveNormalizedIncome

Returns the normalized income of the reserve

```solidity
function getReserveNormalizedIncome(address asset) external view virtual override returns (uint256);
```

**Parameters**

| Name    | Type      | Description                                        |
| ------- | --------- | -------------------------------------------------- |
| `asset` | `address` | The address of the underlying asset of the reserve |

**Returns**

| Name     | Type      | Description                     |
| -------- | --------- | ------------------------------- |
| `<none>` | `uint256` | The reserve's normalized income |

### getReserveNormalizedVariableDebt

Returns the normalized variable debt per unit of asset

_WARNING: This function is intended to be used primarily by the protocol itself to get a
"dynamic" variable index based on time, current stored index and virtual rate at the current
moment (approx. a borrower would get if opening a position). This means that is always used in
combination with variable debt supply/balances.
If using this function externally, consider that is possible to have an increasing normalized
variable debt that is not equivalent to how the variable debt index would be updated in storage
(e.g. only updates with non-zero variable debt supply)_

```solidity
function getReserveNormalizedVariableDebt(address asset) external view virtual override returns (uint256);
```

**Parameters**

| Name    | Type      | Description                                        |
| ------- | --------- | -------------------------------------------------- |
| `asset` | `address` | The address of the underlying asset of the reserve |

**Returns**

| Name     | Type      | Description                          |
| -------- | --------- | ------------------------------------ |
| `<none>` | `uint256` | The reserve normalized variable debt |

### getReservesList

Returns the list of the underlying assets of all the initialized reserves

_It does not include dropped reserves_

```solidity
function getReservesList() external view virtual override returns (address[] memory);
```

**Returns**

| Name     | Type        | Description                                                        |
| -------- | ----------- | ------------------------------------------------------------------ |
| `<none>` | `address[]` | The addresses of the underlying assets of the initialized reserves |

### getReserveAddressById

Returns the address of the underlying asset of a reserve by the reserve id as stored in the DataTypes.ReserveData struct

```solidity
function getReserveAddressById(uint16 id) external view returns (address);
```

**Parameters**

| Name | Type     | Description                                                         |
| ---- | -------- | ------------------------------------------------------------------- |
| `id` | `uint16` | The id of the reserve as stored in the DataTypes.ReserveData struct |

**Returns**

| Name     | Type      | Description                                   |
| -------- | --------- | --------------------------------------------- |
| `<none>` | `address` | The address of the reserve associated with id |

### MAX_STABLE_RATE_BORROW_SIZE_PERCENT

Returns the percentage of available liquidity that can be borrowed at once at stable rate

```solidity
function MAX_STABLE_RATE_BORROW_SIZE_PERCENT() public view virtual override returns (uint256);
```

**Returns**

| Name     | Type      | Description                                                       |
| -------- | --------- | ----------------------------------------------------------------- |
| `<none>` | `uint256` | The percentage of available liquidity to borrow, expressed in bps |

### MAX_NUMBER_RESERVES

Returns the maximum number of reserves supported to be listed in this Pool

```solidity
function MAX_NUMBER_RESERVES() public view virtual override returns (uint16);
```

**Returns**

| Name     | Type     | Description                              |
| -------- | -------- | ---------------------------------------- |
| `<none>` | `uint16` | The maximum number of reserves supported |

### finalizeTransfer

Validates and finalizes an aToken transfer

_Only callable by the overlying aToken of the `asset`_

```solidity
function finalizeTransfer(
    address asset,
    address from,
    address to,
    uint256 amount,
    uint256 balanceFromBefore,
    uint256 balanceToBefore
) external virtual override;
```

**Parameters**

| Name                | Type      | Description                                               |
| ------------------- | --------- | --------------------------------------------------------- |
| `asset`             | `address` | The address of the underlying asset of the aToken         |
| `from`              | `address` | The user from which the aTokens are transferred           |
| `to`                | `address` | The user receiving the aTokens                            |
| `amount`            | `uint256` | The amount being transferred/withdrawn                    |
| `balanceFromBefore` | `uint256` | The aToken balance of the `from` user before the transfer |
| `balanceToBefore`   | `uint256` | The aToken balance of the `to` user before the transfer   |

### initReserve

Initializes a reserve, activating it, assigning an aToken and debt tokens and an
interest rate strategy

_Only callable by the PoolConfigurator contract_

```solidity
function initReserve(
    address asset,
    address aTokenAddress,
    address stableDebtAddress,
    address variableDebtAddress,
    address interestRateStrategyAddress
) external virtual override onlyPoolConfigurator;
```

**Parameters**

| Name                          | Type      | Description                                                               |
| ----------------------------- | --------- | ------------------------------------------------------------------------- |
| `asset`                       | `address` | The address of the underlying asset of the reserve                        |
| `aTokenAddress`               | `address` | The address of the aToken that will be assigned to the reserve            |
| `stableDebtAddress`           | `address` | The address of the StableDebtToken that will be assigned to the reserve   |
| `variableDebtAddress`         | `address` | The address of the VariableDebtToken that will be assigned to the reserve |
| `interestRateStrategyAddress` | `address` | The address of the interest rate strategy contract                        |

### dropReserve

Drop a reserve

_Only callable by the PoolConfigurator contract_

```solidity
function dropReserve(address asset) external virtual override onlyPoolConfigurator;
```

**Parameters**

| Name    | Type      | Description                                        |
| ------- | --------- | -------------------------------------------------- |
| `asset` | `address` | The address of the underlying asset of the reserve |

### setConfiguration

Sets the configuration bitmap of the reserve as a whole

_Only callable by the PoolConfigurator contract_

```solidity
function setConfiguration(address asset, DataTypes.ReserveConfigurationMap calldata configuration)
    external
    virtual
    override
    onlyPoolConfigurator;
```

**Parameters**

| Name            | Type                                | Description                                        |
| --------------- | ----------------------------------- | -------------------------------------------------- |
| `asset`         | `address`                           | The address of the underlying asset of the reserve |
| `configuration` | `DataTypes.ReserveConfigurationMap` | The new configuration bitmap                       |

### rescueTokens

Rescue and transfer tokens locked in this contract

```solidity
function rescueTokens(address token, address to, uint256 amount) external virtual override onlyPoolAdmin;
```

**Parameters**

| Name     | Type      | Description                     |
| -------- | --------- | ------------------------------- |
| `token`  | `address` | The address of the token        |
| `to`     | `address` | The address of the recipient    |
| `amount` | `uint256` | The amount of token to transfer |

### deposit

Supplies an `amount` of underlying asset into the reserve, receiving in return overlying aTokens.

- E.g. User supplies 100 `$HONEY` and gets in return 100 `a$HONEY`

_Deprecated: maintained for compatibility purposes_

```solidity
function deposit(address asset, uint256 amount, address onBehalfOf, uint16 referralCode) external virtual override;
```

**Parameters**

| Name           | Type      | Description                                                                                                                                                                                   |
| -------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `asset`        | `address` | The address of the underlying asset to supply                                                                                                                                                 |
| `amount`       | `uint256` | The amount to be supplied                                                                                                                                                                     |
| `onBehalfOf`   | `address` | The address that will receive the aTokens, same as msg.sender if the user wants to receive them on his own wallet, or a different address if the beneficiary of aTokens is a different wallet |
| `referralCode` | `uint16`  | Code used to register the integrator originating the operation, for potential rewards. 0 if the action is executed directly by the user, without any middle-man                               |

### mintToPOLFeeCollector

```solidity
function mintToPOLFeeCollector(address[] assets) external virtual
```

Mints the assets accrued through the reserve factor to the POL fee collector in the form of aTokens

**Parameters**

| Name   | Type      | Description                                                     |
| ------ | --------- | --------------------------------------------------------------- |
| assets | address[] | The list of reserves for which the minting needs to be executed |
