# PoolConfigurator

## Functions

### getRevision

Returns the revision number of the contract

_Needs to be defined in the inherited class as a constant._

```solidity
function getRevision() internal pure virtual override returns (uint256);
```

**Returns**

| Name     | Type      | Description         |
| -------- | --------- | ------------------- |
| `<none>` | `uint256` | The revision number |

### initReserves

Initializes multiple reserves.

```solidity
function initReserves(ConfiguratorInputTypes.InitReserveInput[] calldata input)
    external
    override
    onlyAssetListingOrPoolAdmins;
```

**Parameters**

| Name    | Type                                        | Description                            |
| ------- | ------------------------------------------- | -------------------------------------- |
| `input` | `ConfiguratorInputTypes.InitReserveInput[]` | The array of initialization parameters |

### dropReserve

Drops a reserve entirely.

```solidity
function dropReserve(address asset) external override onlyPoolAdmin;
```

**Parameters**

| Name    | Type      | Description                        |
| ------- | --------- | ---------------------------------- |
| `asset` | `address` | The address of the reserve to drop |

### updateAToken

_Updates the aToken implementation for the reserve._

```solidity
function updateAToken(ConfiguratorInputTypes.UpdateATokenInput calldata input) external override onlyPoolAdmin;
```

**Parameters**

| Name    | Type                                       | Description                  |
| ------- | ------------------------------------------ | ---------------------------- |
| `input` | `ConfiguratorInputTypes.UpdateATokenInput` | The aToken update parameters |

### updateVariableDebtToken

Updates the variable debt token implementation for the asset.

```solidity
function updateVariableDebtToken(ConfiguratorInputTypes.UpdateDebtTokenInput calldata input)
    external
    override
    onlyPoolAdmin;
```

**Parameters**

| Name    | Type                                          | Description                             |
| ------- | --------------------------------------------- | --------------------------------------- |
| `input` | `ConfiguratorInputTypes.UpdateDebtTokenInput` | The variableDebtToken update parameters |

### setReserveBorrowing

Configures borrowing on a reserve.

_Can only be disabled (set to false) if stable borrowing is disabled_

```solidity
function setReserveBorrowing(address asset, bool enabled) external override onlyRiskOrPoolAdmins;
```

**Parameters**

| Name      | Type      | Description                                            |
| --------- | --------- | ------------------------------------------------------ |
| `asset`   | `address` | The address of the underlying asset of the reserve     |
| `enabled` | `bool`    | True if borrowing needs to be enabled, false otherwise |

### configureReserveAsCollateral

Configures the reserve collateralization parameters.

_All the values are expressed in bps. A value of 10000, results in 100.00%_

```solidity
function configureReserveAsCollateral(
    address asset,
    uint256 ltv,
    uint256 liquidationThreshold,
    uint256 liquidationBonus
) external override onlyRiskOrPoolAdmins;
```

**Parameters**

| Name                   | Type      | Description                                                                                        |
| ---------------------- | --------- | -------------------------------------------------------------------------------------------------- |
| `asset`                | `address` | The address of the underlying asset of the reserve                                                 |
| `ltv`                  | `uint256` | The loan to value of the asset when used as collateral                                             |
| `liquidationThreshold` | `uint256` | The threshold at which loans using this asset as collateral will be considered undercollateralized |
| `liquidationBonus`     | `uint256` | The bonus liquidators receive to liquidate this asset                                              |

### setReserveActive

Activate or deactivate a reserve

```solidity
function setReserveActive(address asset, bool active) external override onlyPoolAdmin;
```

**Parameters**

| Name     | Type      | Description                                             |
| -------- | --------- | ------------------------------------------------------- |
| `asset`  | `address` | The address of the underlying asset of the reserve      |
| `active` | `bool`    | True if the reserve needs to be active, false otherwise |

### setReserveFreeze

Freeze or unfreeze a reserve. A frozen reserve doesn't allow any new supply, borrow
or rate swap but allows repayments, liquidations, rate rebalances and withdrawals.

```solidity
function setReserveFreeze(address asset, bool freeze) external override onlyRiskOrPoolAdmins;
```

**Parameters**

| Name     | Type      | Description                                             |
| -------- | --------- | ------------------------------------------------------- |
| `asset`  | `address` | The address of the underlying asset of the reserve      |
| `freeze` | `bool`    | True if the reserve needs to be frozen, false otherwise |

### setReservePause

Pauses a reserve. A paused reserve does not allow any interaction (supply, borrow, repay,
swap interest rate, liquidate, atoken transfers).

```solidity
function setReservePause(address asset, bool paused) public override onlyEmergencyOrPoolAdmin;
```

**Parameters**

| Name     | Type      | Description                                        |
| -------- | --------- | -------------------------------------------------- |
| `asset`  | `address` | The address of the underlying asset of the reserve |
| `paused` | `bool`    | True if pausing the reserve, false if unpausing    |

### setReserveFactor

Updates the reserve factor of a reserve.

```solidity
function setReserveFactor(address asset, uint256 newReserveFactor) external override onlyRiskOrPoolAdmins;
```

**Parameters**

| Name               | Type      | Description                                        |
| ------------------ | --------- | -------------------------------------------------- |
| `asset`            | `address` | The address of the underlying asset of the reserve |
| `newReserveFactor` | `uint256` | The new reserve factor of the reserve              |

### setDebtCeiling

Sets the debt ceiling for an asset.

```solidity
function setDebtCeiling(address asset, uint256 newDebtCeiling) external override onlyRiskOrPoolAdmins;
```

**Parameters**

| Name             | Type      | Description          |
| ---------------- | --------- | -------------------- |
| `asset`          | `address` |                      |
| `newDebtCeiling` | `uint256` | The new debt ceiling |

### setSupplyCap

Updates the supply cap of a reserve.

```solidity
function setSupplyCap(address asset, uint256 newSupplyCap) external override onlyRiskOrPoolAdmins;
```

**Parameters**

| Name           | Type      | Description                                        |
| -------------- | --------- | -------------------------------------------------- |
| `asset`        | `address` | The address of the underlying asset of the reserve |
| `newSupplyCap` | `uint256` | The new supply cap of the reserve                  |

### setLiquidationProtocolFee

Updates the liquidation protocol fee of reserve.

```solidity
function setLiquidationProtocolFee(address asset, uint256 newFee) external override onlyRiskOrPoolAdmins;
```

**Parameters**

| Name     | Type      | Description                                                       |
| -------- | --------- | ----------------------------------------------------------------- |
| `asset`  | `address` | The address of the underlying asset of the reserve                |
| `newFee` | `uint256` | The new liquidation protocol fee of the reserve, expressed in bps |

### setReserveInterestRateStrategyAddress

Sets the interest rate strategy of a reserve.

```solidity
function setReserveInterestRateStrategyAddress(address asset, address newRateStrategyAddress)
    external
    override
    onlyRiskOrPoolAdmins;
```

**Parameters**

| Name                     | Type      | Description                                        |
| ------------------------ | --------- | -------------------------------------------------- |
| `asset`                  | `address` | The address of the underlying asset of the reserve |
| `newRateStrategyAddress` | `address` | The address of the new interest strategy contract  |

### setPoolPause

Pauses or unpauses all the protocol reserves. In the paused state all the protocol interactions
are suspended.

```solidity
function setPoolPause(bool paused) external override onlyEmergencyAdmin;
```

**Parameters**

| Name     | Type   | Description                                          |
| -------- | ------ | ---------------------------------------------------- |
| `paused` | `bool` | True if protocol needs to be paused, false otherwise |
