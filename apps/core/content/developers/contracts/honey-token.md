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

The Honey token (HONEY) is Berachain's native stablecoin, designed to maintain a stable value.

**Inherits:**
ERC20, ERC20Permit, AccessControl

*HONEY is a decentralized stablecoin backed by collateral assets.*

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

Burns tokens from the caller's account.

```solidity
function burn(uint256 amount) external;
```

### mint

Mints new tokens to the specified address.

*Only addresses with MINTER_ROLE can call this function.*

```solidity
function mint(address to, uint256 amount) external;
```

