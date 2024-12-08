<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Honey

> <small><a target="_blank" :href="config.testnet.dapps.beratrail.url + 'address/' + config.contracts.honey.address">{{config.contracts.honey.address}}</a><span v-if="config.contracts.honey.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.honey.abi">ABI JSON</a></span></small>

This is the ERC20 token representation of Berachain's native stablecoin, Honey. The contract implements upgradeable ERC20 functionality with access control and error handling.

## Inheritance

- ERC20 (Solady implementation)
- AccessControlUpgradeable
- UUPSUpgradeable
- IHoneyErrors

## Interfaces

### IHoneyErrors

```solidity
error ZeroAddress();
error NotFactory();
```

## State Variables

### factory

The factory contract address that has permission to mint and burn Honey tokens.

```solidity
address public factory;
```

### NAME

The constant name of the token.

```solidity
string private constant NAME = "Honey";
```

### SYMBOL

The constant symbol of the token.

```solidity
string private constant SYMBOL = "HONEY";
```

## Functions

### constructor

Disables initializers to prevent implementation contract from being initialized.

```solidity
constructor();
```

### initialize

Initializes the contract with governance and factory addresses. Can only be called once.
Reverts with `ZeroAddress` if either address is zero.

```solidity
function initialize(address _governance, address _factory) external initializer;
```

**Parameters**

| Name         | Type      | Description                                           |
| ------------ | --------- | ----------------------------------------------------- |
| `_governance` | `address` | The address to be granted the DEFAULT_ADMIN_ROLE      |
| `_factory`    | `address` | The factory address that can mint and burn Honey      |

### onlyFactory

Ensures the caller is the factory contract address.
Reverts with `NotFactory` if caller isn't the factory.

```solidity
modifier onlyFactory();
```

### _authorizeUpgrade

Authorizes an upgrade to a new implementation. Can only be called by addresses with DEFAULT_ADMIN_ROLE.

```solidity
function _authorizeUpgrade(address) internal override onlyRole(DEFAULT_ADMIN_ROLE);
```

### mint

Mints Honey to the receiver. Only the factory can call this function.

```solidity
function mint(address to, uint256 amount) external onlyFactory;
```

**Parameters**

| Name     | Type      | Description                  |
| -------- | --------- | ---------------------------- |
| `to`     | `address` | The receiver address         |
| `amount` | `uint256` | The amount of Honey to mint  |

### burn

Burns Honey from an account. Only the factory can call this function.

```solidity
function burn(address from, uint256 amount) external onlyFactory;
```

**Parameters**

| Name     | Type      | Description                     |
| -------- | --------- | ------------------------------- |
| `from`   | `address` | The account to burn Honey from  |
| `amount` | `uint256` | The amount of Honey to burn     |

### name

Returns the name of the token: "Honey"

```solidity
function name() public pure override returns (string memory);
```

**Returns**

| Name     | Type     | Description        |
| -------- | -------- | ------------------ |
| `<none>` | `string` | The token name     |

### symbol

Returns the symbol of the token: "HONEY"

```solidity
function symbol() public pure override returns (string memory);
```

**Returns**

| Name     | Type     | Description         |
| -------- | -------- | ------------------- |
| `<none>` | `string` | The token symbol    |
