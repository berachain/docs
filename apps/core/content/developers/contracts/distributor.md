<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Distributor

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.distributor.address">{{config.mainnet.contracts.distributor.address}}</a><span v-if="config.mainnet.contracts.distributor.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.mainnet.contracts.distributor.abi">ABI JSON</a></span></small>

The Distributor contract is responsible for distributing the block rewards from the reward controller
and the reward allocation weights, to the reward allocation receivers.

_Each validator has its own reward allocation, if it does not exist, a default reward allocation is used.
And if governance has not set the default reward allocation, the rewards are not minted and distributed._

## Functions

### distributeFor

Distribute the rewards to the reward allocation receivers.

_Permissionless function to distribute rewards by providing the necessary Merkle proofs. Reverts if the
proofs are invalid._

```solidity
function distributeFor(
    uint64 nextTimestamp,
    uint64 proposerIndex,
    bytes calldata pubkey,
    bytes32[] calldata proposerIndexProof,
    bytes32[] calldata pubkeyProof
)
    external;
```

**Parameters**

| Name                 | Type        | Description                                                                                                                                                                          |
| -------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `nextTimestamp`      | `uint64`    | The timestamp of the next beacon block to distribute for. The EIP-4788 Beacon Roots contract is queried by this key, returning the parent beacon block root from the next timestamp. |
| `proposerIndex`      | `uint64`    | The proposer index of the beacon block. This should be the validator index corresponding to the pubkey in the validator registry in the beacon state.                                |
| `pubkey`             | `bytes`     | The validator pubkey of the proposer.                                                                                                                                                |
| `proposerIndexProof` | `bytes32[]` | The Merkle proof of the proposer index in the beacon block.                                                                                                                          |
| `pubkeyProof`        | `bytes32[]` | The Merkle proof of the validator pubkey of the proposer in the beacon block.                                                                                                        |

## Events

### Distributed

```solidity
event Distributed(bytes indexed valPubkey, uint64 indexed nextTimestamp, address indexed receiver, uint256 amount);
```
