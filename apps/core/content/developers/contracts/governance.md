<script setup>
  import config from '@berachain/config/constants.json';
</script>

# BerachainGovernance

> <small><a target="_blank" :href="config.testnet.dapps.beratrail.url + 'address/' + config.contracts.governance.address">{{config.contracts.governance.address}}</a><span v-if="config.contracts.governance.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.governance.abi">ABI JSON</a></span></small>

The Berachain Governance contract extends [OpenZeppelin's governor contracts](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/governance).

## State Variables

### VOTING_DELAY

```solidity
uint48 internal constant VOTING_DELAY = 6 hours;
```

### VOTING_PERIOD

```solidity
uint32 internal constant VOTING_PERIOD = 6 hours;
```

### BLOCK_INTERVAL

```solidity
uint32 internal constant BLOCK_INTERVAL = 4 seconds;
```

## Functions

### constructor

```solidity
constructor();
```

### initialize

```solidity
function initialize(IVotes _token, TimelockControllerUpgradeable _timelock) public initializer;
```

### \_authorizeUpgrade

Governor name.
Voting delay, voting period, proposal threshold.
Simple counting.
Upgradeable storage.
Token used for voting.
10% quorum.
Timelock controller.

```solidity
function _authorizeUpgrade(address newImplementation) internal override onlyOwner;
```

### state

_Overridden version of the {Governor-state} function that considers the status reported by the timelock._

```solidity
function state(uint256 proposalId)
    public
    view
    override(GovernorUpgradeable, GovernorTimelockControlUpgradeable)
    returns (ProposalState);
```

### proposalNeedsQueuing

_See {IGovernor-proposalNeedsQueuing}._

```solidity
function proposalNeedsQueuing(uint256 proposalId)
    public
    view
    override(GovernorUpgradeable, GovernorTimelockControlUpgradeable)
    returns (bool);
```

### proposalThreshold

_See {Governor-proposalThreshold}._

```solidity
function proposalThreshold()
    public
    view
    override(GovernorUpgradeable, GovernorSettingsUpgradeable)
    returns (uint256);
```

### \_propose

```solidity
function _propose(
    address[] memory targets,
    uint256[] memory values,
    bytes[] memory calldatas,
    string memory description,
    address proposer
)
    internal
    override(GovernorUpgradeable, GovernorStorageUpgradeable)
    returns (uint256);
```

### \_queueOperations

```solidity
function _queueOperations(
    uint256 proposalId,
    address[] memory targets,
    uint256[] memory values,
    bytes[] memory calldatas,
    bytes32 descriptionHash
)
    internal
    override(GovernorUpgradeable, GovernorTimelockControlUpgradeable)
    returns (uint48);
```

### \_executeOperations

```solidity
function _executeOperations(
    uint256 proposalId,
    address[] memory targets,
    uint256[] memory values,
    bytes[] memory calldatas,
    bytes32 descriptionHash
)
    internal
    override(GovernorUpgradeable, GovernorTimelockControlUpgradeable);
```

### \_cancel

```solidity
function _cancel(
    address[] memory targets,
    uint256[] memory values,
    bytes[] memory calldatas,
    bytes32 descriptionHash
)
    internal
    override(GovernorUpgradeable, GovernorTimelockControlUpgradeable)
    returns (uint256);
```

### \_executor

```solidity
function _executor()
    internal
    view
    override(GovernorUpgradeable, GovernorTimelockControlUpgradeable)
    returns (address);
```
