---
head:
  - - meta
    - property: og:title
      content: HoneyFactory Contract Reference
  - - meta
    - name: description
      content: Developer reference for the HoneyFactory contract
  - - meta
    - property: og:description
      content: Developer reference for the HoneyFactory contract
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# HoneyFactory

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.tokens.honeyFactory['mainnet-address']">{{config.contracts.tokens.honeyFactory['mainnet-address']}}</a><span v-if="config.contracts.tokens.honeyFactory.abi && config.contracts.tokens.honeyFactory.abi.length > 0">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.tokens.honeyFactory.abi">ABI JSON</a></span></small>

This is the factory contract for minting and redeeming Honey.

**Inherits:**
IHoneyFactory, OwnableUpgradeable, UUPSUpgradeable

## View Functions

### getHoney

Returns the HONEY token address.

```solidity
function getHoney() external view returns (address);
```

### owner

```solidity
function owner() public view virtual override returns (address);
```

### proxiableUUID

```solidity
function proxiableUUID() external view virtual override notDelegated returns (bytes32);
```

## Functions

### initialize

Initializes the HoneyFactory contract.

```solidity
function initialize(address _honey) external initializer;
```

### mint

Mints HONEY tokens to the specified address.

**Emits:**

- [HoneyMinted](#event-honeyminted)

```solidity
function mint(address to, uint256 amount) external onlyOwner;
```

### redeem

Redeems HONEY tokens from the specified address.

**Emits:**

- [HoneyRedeemed](#event-honeyredeemed)

```solidity
function redeem(address from, uint256 amount) external onlyOwner;
```

### upgradeToAndCall

```solidity
function upgradeToAndCall(address newImplementation, bytes memory data) public payable virtual override onlyOwner;
```

## Events

### HoneyMinted {#event-honeyminted}

Emitted when HONEY tokens are minted.

```solidity
event HoneyMinted(address indexed to, uint256 amount);
```

### HoneyRedeemed {#event-honeyredeemed}

Emitted when HONEY tokens are redeemed.

```solidity
event HoneyRedeemed(address indexed from, uint256 amount);
```

### Initialized {#event-initialized}

Emitted when the contract is initialized.

```solidity
event Initialized(uint64 version);
```

### OwnershipTransferred {#event-ownershiptransferred}

Emitted when ownership is transferred.

```solidity
event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
```

### Upgraded {#event-upgraded}

Emitted when the implementation is upgraded.

```solidity
event Upgraded(address indexed implementation);
```
