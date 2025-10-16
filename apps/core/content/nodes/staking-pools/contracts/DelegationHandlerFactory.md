---
head:
  - - meta
    - property: og:title
      content: DelegationHandlerFactory Contract Reference
  - - meta
    - name: description
      content: Developer reference for the DelegationHandlerFactory contract
  - - meta
    - property: og:description
      content: Developer reference for the DelegationHandlerFactory contract
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# DelegationHandlerFactory

> <small><span v-if="config.contracts.stakingPoolImplementations.delegationHandlerFactoryImpl['mainnet-address']">Mainnet: <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.stakingPoolImplementations.delegationHandlerFactoryImpl['mainnet-address']">{{config.contracts.stakingPoolImplementations.delegationHandlerFactoryImpl['mainnet-address']}}</a></span><span v-else>Mainnet: Not yet deployed</span><span v-if="config.contracts.stakingPoolImplementations.delegationHandlerFactoryImpl['bepolia-address']">&nbsp;|&nbsp;Bepolia: <a target="_blank" :href="config.bepolia.dapps.berascan.url + 'address/' + config.contracts.stakingPoolImplementations.delegationHandlerFactoryImpl['bepolia-address']">{{config.contracts.stakingPoolImplementations.delegationHandlerFactoryImpl['bepolia-address']}}</a></span><span v-if="config.contracts.stakingPoolImplementations.delegationHandlerFactoryImpl.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.stakingPoolImplementations.delegationHandlerFactoryImpl.abi">ABI JSON</a></span></small>

The DelegationHandlerFactory contract deploys and manages DelegationHandler instances for validators using an upgradeable beacon proxy pattern.

## State Variables

### delegationHandlers

```solidity
mapping(bytes => address) public delegationHandlers;
```

Maps validator pubkeys to their corresponding delegation handler addresses. Validators can use this to check if a delegation handler has been deployed for their pubkey.

## Functions

### deployDelegationHandler

Deploys a delegation handler for a validator.

```solidity
function deployDelegationHandler(bytes memory pubkey) external returns (address);
```

**Parameters**

| Name     | Type    | Description                  |
| -------- | ------- | ---------------------------- |
| `pubkey` | `bytes` | The pubkey of the validator. |

**Returns**

| Name     | Type      | Description                                              |
| -------- | --------- | -------------------------------------------------------- |
| `<none>` | `address` | delegationHandler The address of the delegation handler. |

## Events

### DelegationHandlerDeployed

```solidity
event DelegationHandlerDeployed(bytes indexed pubkey, address indexed delegationHandler);
```

## Errors

### InvalidAddress

```solidity
error InvalidAddress();
```
