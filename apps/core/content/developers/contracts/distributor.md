---
head:
  - - meta
    - property: og:title
      content: Distributor Contract Reference
  - - meta
    - name: description
      content: Developer reference for the Distributor contract in PoL
  - - meta
    - property: og:description
      content: Developer reference for the Distributor contract in PoL
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Distributor

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.pol.distributor['mainnet-address']">{{config.contracts.pol.distributor['mainnet-address']}}</a><span v-if="config.contracts.pol.distributor.abi && config.contracts.pol.distributor.abi.length > 0">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.pol.distributor.abi">ABI JSON</a></span></small>

The Distributor contract is responsible for distributing the block rewards from the reward controller and the reward allocation weights, to the reward allocation receivers. Each validator has its own reward allocation, if it does not exist, a default reward allocation is used. And if governance has not set the default reward allocation, the rewards are not minted and distributed.

**Inherits:**
IDistributor, OwnableUpgradeable, UUPSUpgradeable

## State Variables

### MANAGER_ROLE

The MANAGER role.

```solidity
bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");
```

### ONE_HUNDRED_PERCENT

_Represents 100%. Chosen to be less granular._

```solidity
uint96 internal constant ONE_HUNDRED_PERCENT = 1e4;
```

### beraChef

The BeraChef contract that we are getting the reward allocation from.

```solidity
IBeraChef public beraChef;
```

### blockRewardController

The rewards controller contract that we are getting the rewards rate from.

_And is responsible for minting the BGT token._

```solidity
IBlockRewardController public blockRewardController;
```

### bgt

The BGT token contract that we are distributing to the reward allocation receivers.

```solidity
address public bgt;
```

## Functions

### constructor

**Note:**
oz-upgrades-unsafe-allow: constructor

```solidity
constructor();
```

### initialize

```solidity
function initialize(
    address _berachef,
    address _bgt,
    address _blockRewardController,
    address _governance,
    uint64 _zeroValidatorPubkeyGIndex,
    uint64 _proposerIndexGIndex
)
    external
    initializer;
```

### \_authorizeUpgrade

```solidity
function _authorizeUpgrade(address newImplementation) internal override onlyRole(DEFAULT_ADMIN_ROLE);
```

### setZeroValidatorPubkeyGIndex

_This is necessary to call when the beacon chain hard forks (and specifically the underlying structure of
beacon state is modified)._

```solidity
function setZeroValidatorPubkeyGIndex(uint64 _zeroValidatorPubkeyGIndex) public override onlyRole(MANAGER_ROLE);
```

### setProposerIndexGIndex

_This is necessary to call when the beacon chain hard forks (and specifically the underlying structure of
beacon state is modified)._

```solidity
function setProposerIndexGIndex(uint64 _proposerIndexGIndex) public override onlyRole(MANAGER_ROLE);
```

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
    external
    nonReentrant;
```

**Parameters**

| Name                 | Type        | Description                                                                                                                                                                          |
| -------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `nextTimestamp`      | `uint64`    | The timestamp of the next beacon block to distribute for. The EIP-4788 Beacon Roots contract is queried by this key, returning the parent beacon block root from the next timestamp. |
| `proposerIndex`      | `uint64`    | The proposer index of the beacon block. This should be the validator index corresponding to the pubkey in the validator registry in the beacon state.                                |
| `pubkey`             | `bytes`     | The validator pubkey of the proposer.                                                                                                                                                |
| `proposerIndexProof` | `bytes32[]` | The Merkle proof of the proposer index in the beacon block.                                                                                                                          |
| `pubkeyProof`        | `bytes32[]` | The Merkle proof of the validator pubkey of the proposer in the beacon block.                                                                                                        |

### \_distributeFor

_Distributes the rewards for the given validator for the given timestamp's parent block._

```solidity
function _distributeFor(bytes calldata pubkey, uint64 nextTimestamp) internal;
```
