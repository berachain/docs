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

This is the ERC20 token representation of Berachain's native stablecoin, Honey.

**Inherits:**
ERC20, AccessControlUpgradeable, UUPSUpgradeable, IHoneyErrors

## View Functions

### allowance

```solidity
function allowance(address owner, address spender) public view virtual override returns (uint256);
```

### balanceOf

```solidity
function balanceOf(address account) public view virtual override returns (uint256);
```

### decimals

```solidity
function decimals() public view virtual override returns (uint8);
```

### name

```solidity
function name() public view virtual override returns (string memory);
```

### symbol

```solidity
function symbol() public view virtual override returns (string memory);
```

### totalSupply

```solidity
function totalSupply() public view virtual override returns (uint256);
```

## Functions

### burn

Burn Honey from an account.

```solidity
function burn(address from, uint256 amount) external onlyFactory;
```

### mint

Mint Honey to the receiver.

```solidity
function mint(address to, uint256 amount) external onlyFactory;
```
