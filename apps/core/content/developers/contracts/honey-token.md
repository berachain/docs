---
head:
  - - meta
    - property: og:title
      content: Honey Token Contract Reference
  - - meta
    - name: description
      content: Developer reference for the Honey stablecoin token contract
  - - meta
    - property: og:description
      content: Developer reference for the Honey stablecoin token contract
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Honey

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.tokens.honey['mainnet-address']">{{config.contracts.tokens.honey['mainnet-address']}}</a><span v-if="config.contracts.tokens.honey.abi && config.contracts.tokens.honey.abi.length > 0">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.tokens.honey.abi">ABI JSON</a></span></small>

[Git Source](https://github.com/berachain/contracts/blob/main/src/honey/Honey.sol)

This is the ERC20 token representation of Berachain's native stablecoin, Honey. The contract is upgradeable and access-controlled, with minting and burning restricted to the HoneyFactory contract.

**Inherits:**
ERC20, AccessControlUpgradeable, UUPSUpgradeable, IHoneyErrors

## State Variables

### factory

The factory contract address that has exclusive permission to mint and burn Honey.

```solidity
address public factory;
```

## View Functions

### name

Returns the name of the token: "Honey"

```solidity
function name() public pure override returns (string memory);
```

### symbol

Returns the symbol of the token: "HONEY"

```solidity
function symbol() public pure override returns (string memory);
```



## Functions

### initialize

Initializes the contract with governance and factory addresses. Can only be called once.

**Access:** Only during deployment
**Errors:**
- `ZeroAddress`: If either `_governance` or `_factory` is the zero address

```solidity
function initialize(address _governance, address _factory) external initializer;
```

### mint

Mints Honey tokens to a specified address.

**Access:** Only HoneyFactory
**Errors:**
- `NotFactory`: If called by any address other than the factory

```solidity
function mint(address to, uint256 amount) external onlyFactory;
```

### burn

Burns Honey tokens from a specified address.

**Access:** Only HoneyFactory
**Errors:**
- `NotFactory`: If called by any address other than the factory

```solidity
function burn(address from, uint256 amount) external onlyFactory;
```

## Events

### Transfer {#event-transfer}

Emitted when tokens are transferred between accounts.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

### Approval {#event-approval}

Emitted when an account approves another account to spend tokens on their behalf.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

## Errors

### ZeroAddress
```solidity
error ZeroAddress();
```
Thrown when attempting to initialize with a zero address.

### NotFactory
```solidity
error NotFactory();
```
Thrown when a restricted function is called by an address other than the factory.

### Other Errors
The contract inherits additional errors from IHoneyErrors that may be relevant in the broader system context.