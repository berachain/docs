# Oracle Contract Interface

Contract to get asset prices, manage price sources and update the fallback oracle

## Functions

### ADDRESSES_PROVIDER

```solidity
contract IPoolAddressesProvider ADDRESSES_PROVIDER
```

Returns the PoolAddressesProvider

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |

### BASE_CURRENCY

```solidity
address BASE_CURRENCY
```

Returns the base currency address

_Address 0x0 is reserved for USD as base currency._

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |

### BASE_CURRENCY_UNIT

```solidity
uint256 BASE_CURRENCY_UNIT
```

Returns the base currency unit

_1 ether for ETH, 1e8 for USD._

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |

### onlyAssetListingOrPoolAdmins

```solidity
modifier onlyAssetListingOrPoolAdmins()
```

_Only asset listing or pool admin can call functions marked by this modifier._

### constructor

```solidity
constructor(contract IPoolAddressesProvider provider, address[] assets, address[] sources, address fallbackOracle, address baseCurrency, uint256 baseCurrencyUnit) public
```

Constructor

#### Parameters

| Name             | Type                            | Description                                                                              |
| ---------------- | ------------------------------- | ---------------------------------------------------------------------------------------- |
| provider         | contract IPoolAddressesProvider | The address of the new PoolAddressesProvider                                             |
| assets           | address[]                       | The addresses of the assets                                                              |
| sources          | address[]                       | The address of the source of each asset                                                  |
| fallbackOracle   | address                         | The address of the fallback oracle to use if the data of an aggregator is not consistent |
| baseCurrency     | address                         | The base currency used for the price quotes. If USD is used, base currency is 0x0        |
| baseCurrencyUnit | uint256                         | The unit of the base currency                                                            |

### setAssetSources

```solidity
function setAssetSources(address[] assets, address[] sources) external
```

Sets or replaces price sources of assets

#### Parameters

| Name    | Type      | Description                        |
| ------- | --------- | ---------------------------------- |
| assets  | address[] | The addresses of the assets        |
| sources | address[] | The addresses of the price sources |

### setFallbackOracle

```solidity
function setFallbackOracle(address fallbackOracle) external
```

Sets the fallback oracle

#### Parameters

| Name           | Type    | Description                        |
| -------------- | ------- | ---------------------------------- |
| fallbackOracle | address | The address of the fallback oracle |

### getAssetPrice

```solidity
function getAssetPrice(address asset) public view returns (uint256)
```

Returns the asset price in the base currency

#### Parameters

| Name  | Type    | Description              |
| ----- | ------- | ------------------------ |
| asset | address | The address of the asset |

#### Return Values

| Name | Type    | Description            |
| ---- | ------- | ---------------------- |
| [0]  | uint256 | The price of the asset |

### getAssetsPrices

```solidity
function getAssetsPrices(address[] assets) external view returns (uint256[])
```

Returns a list of prices from a list of assets addresses

#### Parameters

| Name   | Type      | Description                  |
| ------ | --------- | ---------------------------- |
| assets | address[] | The list of assets addresses |

#### Return Values

| Name | Type      | Description                    |
| ---- | --------- | ------------------------------ |
| [0]  | uint256[] | The prices of the given assets |

### getSourceOfAsset

```solidity
function getSourceOfAsset(address asset) external view returns (address)
```

Returns the address of the source for an asset address

#### Parameters

| Name  | Type    | Description              |
| ----- | ------- | ------------------------ |
| asset | address | The address of the asset |

#### Return Values

| Name | Type    | Description               |
| ---- | ------- | ------------------------- |
| [0]  | address | The address of the source |

### getFallbackOracle

```solidity
function getFallbackOracle() external view returns (address)
```

Returns the address of the fallback oracle

#### Return Values

| Name | Type    | Description                        |
| ---- | ------- | ---------------------------------- |
| [0]  | address | The address of the fallback oracle |
