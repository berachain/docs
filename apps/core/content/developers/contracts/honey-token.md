<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Honey

> <small><a target="_blank" :href="config.testnet.dapps.beratrail.url + 'address/' + config.contracts.honey.address">{{config.contracts.honey.address}}</a><span v-if="config.contracts.honey.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.honey.abi">ABI JSON</a></span></small>

This is the ERC20 token representation of Berachain's native stablecoin, Honey.

## State Variables

### vaultAdmin

```solidity
address public vaultAdmin;
```

### NAME

```solidity
string private constant NAME = "Honey";
```

### SYMBOL

```solidity
string private constant SYMBOL = "HONEY";
```

## Functions

### constructor

```solidity
constructor();
```

### initialize

```solidity
function initialize(address _governance, address _vaultAdmin) external initializer;
```

### onlyVaultAdmin

```solidity
modifier onlyVaultAdmin();
```

### \_authorizeUpgrade

```solidity
function _authorizeUpgrade(address) internal override onlyOwner;
```

### mint

_Mint Honey to the receiver. Only VaultAdmin can call this function._

```solidity
function mint(address to, uint256 amount) external onlyVaultAdmin;
```

**Parameters**

| Name     | Type      | Description                  |
| -------- | --------- | ---------------------------- |
| `to`     | `address` | The receiver address.        |
| `amount` | `uint256` | The amount of Honey to mint. |

### burn

_Burn Honey from an account. Only VaultAdmin can call this function._

```solidity
function burn(address from, uint256 amount) external onlyVaultAdmin;
```

**Parameters**

| Name     | Type      | Description                     |
| -------- | --------- | ------------------------------- |
| `from`   | `address` | The account to burn Honey from. |
| `amount` | `uint256` | The amount of Honey to burn.    |

### name

```solidity
function name() public pure override returns (string memory);
```

### symbol

```solidity
function symbol() public pure override returns (string memory);
```
