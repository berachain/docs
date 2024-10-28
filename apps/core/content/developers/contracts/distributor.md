<script setup>
  import config from '@berachain/config/constants.json';
</script>

# IDistributor

> <small><a target="_blank" :href="config.testnet.dapps.beratrail.url + 'address/' + config.contracts.distributor.address">{{config.contracts.distributor.address}}</a><span v-if="config.contracts.distributor.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.distributor.abi">ABI JSON</a></span></small>

Interface of the Distributor contract.

## Functions

### distributeFor

Distribute the rewards to the reward allocation receivers.

_This is only callable by the `prover` contract._

```solidity
function distributeFor(address coinbase, uint256 blockNumber) external;
```

**Parameters**

| Name          | Type      | Description                                     |
| ------------- | --------- | ----------------------------------------------- |
| `coinbase`    | `address` | The validator's coinbase address.               |
| `blockNumber` | `uint256` | The block number to distribute the rewards for. |

## Events

### Distributed

```solidity
event Distributed(address indexed valCoinbase, uint256 indexed blockNumber, address indexed receiver, uint256 amount);
```
