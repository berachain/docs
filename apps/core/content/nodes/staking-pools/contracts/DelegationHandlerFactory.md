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

> <small><a target="_blank" :href="config.websites.berascan.url + 'address/' + config.contracts.stakingPools.delegationHandlerFactory.address.berachainMainnet">{{config.contracts.stakingPools.delegationHandlerFactory.address.berachainMainnet}}</a><span v-if="config.contracts.stakingPools.delegationHandlerFactory.address?.berachainBepolia"><br>Bepolia: <a target="_blank" :href="config.websites.berascanBepolia.url + 'address/' + config.contracts.stakingPools.delegationHandlerFactory.address.berachainBepolia">{{config.contracts.stakingPools.delegationHandlerFactory.address.berachainBepolia}}</a></span><span v-if="config.contracts.stakingPools.delegationHandlerFactory.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.stakingPools.delegationHandlerFactory.abi">ABI JSON</a></span></small>

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
