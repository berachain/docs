# PoolAddressesProvider Contract Interface

The registry of addresses which comprises the Bend logic.

### getMarketId

```solidity
function getMarketId() external view returns (string)
```

Returns the id of the Bend market to which this contract points to.

#### Return Values

| Name | Type   | Description   |
| ---- | ------ | ------------- |
| [0]  | string | The market id |

### getAddress

```solidity
function getAddress(bytes32 id) external view returns (address)
```

Returns an address by its identifier.

_The returned address might be an EOA or a contract, potentially proxied
It returns ZERO if there is no registered address with the given id_

#### Parameters

| Name | Type    | Description |
| ---- | ------- | ----------- |
| id   | bytes32 | The id      |

#### Return Values

| Name | Type    | Description                                        |
| ---- | ------- | -------------------------------------------------- |
| [0]  | address | The address of the registered for the specified id |

### getPool

```solidity
function getPool() external view returns (address)
```

Returns the address of the Pool proxy.

#### Return Values

| Name | Type    | Description            |
| ---- | ------- | ---------------------- |
| [0]  | address | The Pool proxy address |

### getPoolConfigurator

```solidity
function getPoolConfigurator() external view returns (address)
```

Returns the address of the PoolConfigurator proxy.

#### Return Values

| Name | Type    | Description                        |
| ---- | ------- | ---------------------------------- |
| [0]  | address | The PoolConfigurator proxy address |

### getPriceOracle

```solidity
function getPriceOracle() external view returns (address)
```

Returns the address of the price oracle.

#### Return Values

| Name | Type    | Description                    |
| ---- | ------- | ------------------------------ |
| [0]  | address | The address of the PriceOracle |

### getACLManager

```solidity
function getACLManager() external view returns (address)
```

Returns the address of the ACL manager.

#### Return Values

| Name | Type    | Description                   |
| ---- | ------- | ----------------------------- |
| [0]  | address | The address of the ACLManager |

### getACLAdmin

```solidity
function getACLAdmin() external view returns (address)
```

Returns the address of the ACL admin.

#### Return Values

| Name | Type    | Description                  |
| ---- | ------- | ---------------------------- |
| [0]  | address | The address of the ACL admin |

### getPriceOracleSentinel

```solidity
function getPriceOracleSentinel() external view returns (address)
```

Returns the address of the price oracle sentinel.

#### Return Values

| Name | Type    | Description                            |
| ---- | ------- | -------------------------------------- |
| [0]  | address | The address of the PriceOracleSentinel |

### getPoolDataProvider

```solidity
function getPoolDataProvider() external view returns (address)
```

Returns the address of the data provider.

#### Return Values

| Name | Type    | Description                     |
| ---- | ------- | ------------------------------- |
| [0]  | address | The address of the DataProvider |

### getVariableDebtPOLRewardsVault

```solidity
function getVariableDebtPOLRewardsVault() external view returns (address)
```

Returns the address of the variable debt POL rewards vault.

### getVariableDebtPeripheryToken

```solidity
function getVariableDebtPeripheryToken() external view returns (address)
```

Returns the address of the variable debt periphery token.

_This token is used to stake/withdraw in POL vault to incentivize variable borrowing._
