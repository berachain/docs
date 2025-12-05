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

> <small><a target="_blank" :href="config.websites.berascan.url + 'address/' + config.contracts.pol.distributor.address.berachainMainnet">{{config.contracts.pol.distributor.address.berachainMainnet}}</a><span v-if="config.contracts.pol.distributor.abi && config.contracts.pol.distributor.abi.length > 0">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.pol.distributor.abi">ABI JSON</a></span></small>

[Git Source](https://github.com/berachain/contracts/blob/main/src/pol/rewards/Distributor.sol)

The Distributor contract is responsible for distributing the block rewards from the reward controller and the reward allocation weights, to the reward allocation receivers. Each validator has its own reward allocation, if it does not exist, a default reward allocation is used. And if governance has not set the default reward allocation, the rewards are not minted and distributed.

**Inherits:** IDistributor, BeaconRootsHelper, ReentrancyGuardUpgradeable, AccessControlUpgradeable, UUPSUpgradeable, Multicallable

## Constants

### MANAGER_ROLE

The MANAGER role.

```solidity
bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");
```

## State Variables

### beraChef

The BeraChef contract that we are getting the reward allocation from.

```solidity
IBeraChef public beraChef;
```

### bgt

The BGT token contract that we are distributing to the reward allocation receivers.

```solidity
address public bgt;
```

### blockRewardController

The rewards controller contract that we are getting the rewards rate from.

_And is responsible for minting the BGT token._

```solidity
IBlockRewardController public blockRewardController;
```

## Functions

### distributeFor

Distribute the rewards to the reward allocation receivers.

_Permissionless function to distribute rewards by providing the necessary Merkle proofs. Reverts if the proofs are invalid._

**Emits:**

- [Distributed](#event-distributed)

```solidity
function distributeFor(
    uint64 nextTimestamp,
    uint64 proposerIndex,
    bytes calldata pubkey,
    bytes32[] calldata proposerIndexProof,
    bytes32[] calldata pubkeyProof
) external nonReentrant;
```

**Parameters**

| Name                 | Type        | Description                                                                                                                                                                          |
| -------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `nextTimestamp`      | `uint64`    | The timestamp of the next beacon block to distribute for. The EIP-4788 Beacon Roots contract is queried by this key, returning the parent beacon block root from the next timestamp. |
| `proposerIndex`      | `uint64`    | The proposer index of the beacon block. This should be the validator index corresponding to the pubkey in the validator registry in the beacon state.                                |
| `pubkey`             | `bytes`     | The validator pubkey of the proposer.                                                                                                                                                |
| `proposerIndexProof` | `bytes32[]` | The Merkle proof of the proposer index in the beacon block.                                                                                                                          |
| `pubkeyProof`        | `bytes32[]` | The Merkle proof of the validator pubkey of the proposer in the beacon block.                                                                                                        |

### distributeFor

Distribute the rewards to the reward allocation receivers according to BRIP-0004.

_This will be called for block N at the top of block N+1. Only system calls allowed i.e only the execution layer client can call this function._

**Emits:**

- [Distributed](#event-distributed)

```solidity
function distributeFor(bytes calldata pubkey) external onlySystemCall;
```

**Parameters**

| Name     | Type    | Description                          |
| -------- | ------- | ------------------------------------ |
| `pubkey` | `bytes` | The validator pubkey of the proposer |

### initialize

Initializes the Distributor contract.

```solidity
function initialize(
    address _berachef,
    address _bgt,
    address _blockRewardController,
    address _governance,
    uint64 _zeroValidatorPubkeyGIndex,
    uint64 _proposerIndexGIndex
) external initializer;
```

**Parameters**

| Name                         | Type      | Description                                |
| ---------------------------- | --------- | ------------------------------------------ |
| `_berachef`                  | `address` | The BeraChef contract address              |
| `_bgt`                       | `address` | The BGT token contract address             |
| `_blockRewardController`     | `address` | The BlockRewardController contract address |
| `_governance`                | `address` | The governance address                     |
| `_zeroValidatorPubkeyGIndex` | `uint64`  | The zero validator pubkey general index    |
| `_proposerIndexGIndex`       | `uint64`  | The proposer index general index           |

### setProposerIndexGIndex

Sets the proposer index general index.

_This is necessary to call when the beacon chain hard forks (and specifically the underlying structure of beacon block header is modified)._

```solidity
function setProposerIndexGIndex(uint64 _proposerIndexGIndex) public override onlyRole(MANAGER_ROLE);
```

**Parameters**

| Name                   | Type     | Description                          |
| ---------------------- | -------- | ------------------------------------ |
| `_proposerIndexGIndex` | `uint64` | The new proposer index general index |

### setZeroValidatorPubkeyGIndex

Sets the zero validator pubkey general index.

_This is necessary to call when the beacon chain hard forks (and specifically the underlying structure of beacon block header is modified)._

```solidity
function setZeroValidatorPubkeyGIndex(uint64 _zeroValidatorPubkeyGIndex) public override onlyRole(MANAGER_ROLE);
```

**Parameters**

| Name                         | Type     | Description                                 |
| ---------------------------- | -------- | ------------------------------------------- |
| `_zeroValidatorPubkeyGIndex` | `uint64` | The new zero validator pubkey general index |

## Events

### Distributed {#event-distributed}

Emitted when rewards are distributed to a receiver.

```solidity
event Distributed(bytes indexed valPubkey, uint64 indexed nextTimestamp, address indexed receiver, uint256 amount);
```

**Parameters**

| Name            | Type      | Description                            |
| --------------- | --------- | -------------------------------------- |
| `valPubkey`     | `bytes`   | The validator pubkey                   |
| `nextTimestamp` | `uint64`  | The timestamp of the next beacon block |
| `receiver`      | `address` | The reward receiver address            |
| `amount`        | `uint256` | The amount of rewards distributed      |

## Errors

### NotSystemAddress

Thrown when the caller is not the system address.

```solidity
error NotSystemAddress();
```

### OnlySystemCallAllowed

Thrown when only system calls are allowed but a non-system call was made.

```solidity
error OnlySystemCallAllowed();
```
