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

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.other.create2['mainnet-address']">{{config.contracts.other.create2['mainnet-address']}}</a><span v-if="config.contracts.other.create2.abi && config.contracts.other.create2.abi.length > 0">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.other.create2.abi">ABI JSON</a></span></small>

The Create2Deployer contract enables deterministic contract deployment using CREATE2 opcode, allowing for predictable contract addresses.

**Inherits:**
ICreate2Deployer

_This contract facilitates deterministic contract deployment across different networks._

## State Variables

### CREATE2_FACTORY

_Used by default when deploying with create2, https://github.com/Arachnid/deterministic-deployment-proxy._

```solidity
address public constant _CREATE2_FACTORY = 0x4e59b44847b379578588920cA78FbF26c0B4956C;
```

## Functions

### deployWithCreate2

_Deploys a contract using the \_CREATE2_FACTORY._

_The call data is encoded as `abi.encodePacked(salt, initCode)`._

_The return data is `abi.encodePacked(addr)`._

```solidity
function deployWithCreate2(uint256 salt, bytes memory initCode) internal returns (address addr);
```

**Parameters**

| Name       | Type      | Description                              |
| ---------- | --------- | ---------------------------------------- |
| `salt`     | `uint256` | The salt to use for the deployment.      |
| `initCode` | `bytes`   | The init code of the contract to deploy. |

**Returns**

| Name   | Type      | Description                           |
| ------ | --------- | ------------------------------------- |
| `addr` | `address` | The address of the deployed contract. |

### deployWithCreate2IfNecessary

_Deploys a contract using the \_CREATE2_FACTORY if it hasn't been deployed yet._

```solidity
function deployWithCreate2IfNecessary(uint256 salt, bytes memory initCode) internal returns (address addr);
```

### getCreate2Address

Returns the deterministic address of a contract for the given salt and init code.

_Assumes that the contract will be deployed using `deployWithCreate2`._

```solidity
function getCreate2Address(uint256 salt, bytes memory initCode) internal pure returns (address);
```

**Parameters**

| Name       | Type      | Description                              |
| ---------- | --------- | ---------------------------------------- |
| `salt`     | `uint256` | The salt to use for the deployment.      |
| `initCode` | `bytes`   | The init code of the contract to deploy. |

**Returns**

| Name     | Type      | Description                                |
| -------- | --------- | ------------------------------------------ |
| `<none>` | `address` | addr The address of the deployed contract. |

### getCreate2Address

Returns the deterministic address of a contract for the given salt and init code.

_Assumes that the contract will be deployed using `deployWithCreate2`._

```solidity
function getCreate2Address(uint256 salt, bytes32 initCodeHash) internal pure returns (address);
```

**Parameters**

| Name           | Type      | Description                                  |
| -------------- | --------- | -------------------------------------------- |
| `salt`         | `uint256` | The salt to use for the deployment.          |
| `initCodeHash` | `bytes32` | The init codehash of the contract to deploy. |

**Returns**

| Name     | Type      | Description                                |
| -------- | --------- | ------------------------------------------ |
| `<none>` | `address` | addr The address of the deployed contract. |

### deployProxyWithCreate2

Deploys a ERC1967 Proxy for the already deployed implementation contract.

```solidity
function deployProxyWithCreate2(address implementation, uint256 salt) internal returns (address);
```

**Parameters**

| Name             | Type      | Description                                                 |
| ---------------- | --------- | ----------------------------------------------------------- |
| `implementation` | `address` | The implementation contract address.                        |
| `salt`           | `uint256` | The salt that will be used for the deployment of the proxy. |

**Returns**

| Name     | Type      | Description                                                       |
| -------- | --------- | ----------------------------------------------------------------- |
| `<none>` | `address` | instance The determinitic address of the deployed proxy contract. |

### deployProxyWithCreate2IfNecessary

Deploys a ERC1967 Proxy for the already deployed implementation contract if it hasn't been deployed
yet.

```solidity
function deployProxyWithCreate2IfNecessary(address implementation, uint256 salt) internal returns (address);
```

### getCreate2ProxyAddress

Returns the deterministic address of a ERC1967 proxy for the given implementation and salt.

_Assumes that the proxy is deployed using `deployProxyWithCreate2`._

```solidity
function getCreate2ProxyAddress(address implementation, uint256 salt) internal pure returns (address);
```

**Parameters**

| Name             | Type      | Description                                                 |
| ---------------- | --------- | ----------------------------------------------------------- |
| `implementation` | `address` | The implementation contract address.                        |
| `salt`           | `uint256` | The salt that will be used for the deployment of the proxy. |

**Returns**

| Name     | Type      | Description                                          |
| -------- | --------- | ---------------------------------------------------- |
| `<none>` | `address` | instance The address of the deployed proxy contract. |
