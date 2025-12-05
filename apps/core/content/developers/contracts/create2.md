---
head:
  - - meta
    - property: og:title
      content: Create2Deployer Contract Reference
  - - meta
    - name: description
      content: Developer reference for the Create2Deployer contract
  - - meta
    - property: og:description
      content: Developer reference for the Create2Deployer contract
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Create2Deployer

> <small><a target="_blank" :href="config.websites.berascan.url + 'address/' + config.contracts.other.create2.address.berachainMainnet">{{config.contracts.other.create2.address.berachainMainnet}}</a><span v-if="config.contracts.other.create2.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.other.create2.abi">ABI JSON</a></span></small>

[Git Source](https://github.com/berachain/contracts/blob/main/src/base/Create2Deployer.sol)

The Create2Deployer contract enables deterministic contract deployment using CREATE2 opcode, allowing for predictable contract addresses.

## Constants

### \_CREATE2_FACTORY

Used by default when deploying with create2, https://github.com/Arachnid/deterministic-deployment-proxy.

```solidity
address public constant _CREATE2_FACTORY = 0x4e59b44847b379578588920cA78FbF26c0B4956C;
```

## View Functions

### getCreate2Address

Returns the deterministic address of a contract for the given salt and init code.

```solidity
function getCreate2Address(uint256 salt, bytes memory initCode) internal pure returns (address)
```

### getCreate2Address

Returns the deterministic address of a contract for the given salt and init code.

```solidity
function getCreate2Address(uint256 salt, bytes32 initCodeHash) internal pure returns (address)
```

### getCreate2AddressWithArgs

Returns the deterministic address of a contract for the given salt, init code and constructor arguments.

```solidity
function getCreate2AddressWithArgs(
    uint256 salt,
    bytes memory initCode,
    bytes memory args
) internal pure returns (address)
```

### getCreate2ProxyAddress

Returns the deterministic address of a ERC1967 proxy for the given implementation and salt.

```solidity
function getCreate2ProxyAddress(address implementation, uint256 salt) internal pure returns (address)
```

### initCodeERC1967

Returns the init code for a ERC1967 proxy with the given implementation.

```solidity
function initCodeERC1967(address implementation) internal pure returns (bytes memory)
```

## Functions

### deployWithCreate2

Deploys a contract using the \_CREATE2_FACTORY.

```solidity
function deployWithCreate2(uint256 salt, bytes memory initCode) internal returns (address addr)
```

### deployWithCreate2WithArgs

Deploys a contract using the \_CREATE2_FACTORY with constructor arguments.

```solidity
function deployWithCreate2WithArgs(
    uint256 salt,
    bytes memory initCode,
    bytes memory args
) internal returns (address addr)
```

### deployProxyWithCreate2

Deploys a ERC1967 Proxy for the already deployed implementation contract.

```solidity
function deployProxyWithCreate2(address implementation, uint256 salt) internal returns (address)
```

## Errors

### DeploymentFailed

```solidity
error DeploymentFailed();
```

Thrown when contract deployment fails.
