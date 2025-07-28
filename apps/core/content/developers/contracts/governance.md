---
head:
  - - meta
    - property: og:title
      content: BerachainGovernance Contract Reference
  - - meta
    - name: description
      content: Developer reference for the BerachainGovernance contract
  - - meta
    - property: og:description
      content: Developer reference for the BerachainGovernance contract
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# BerachainGovernance

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.pol.governance['mainnet-address']">{{config.contracts.pol.governance['mainnet-address']}}</a><span v-if="config.contracts.pol.governance.abi && config.contracts.pol.governance.abi.length > 0">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.pol.governance.abi">ABI JSON</a></span></small>

The BerachainGovernance contract implements the governance system for Berachain, allowing BGT holders to create and vote on proposals.

**Inherits:**
Governor, GovernorSettings, GovernorCountingSimple, GovernorVotes, GovernorVotesQuorumFraction, GovernorTimelockControl, GovernorPreventLateQuorum

*This contract manages the governance process including proposal creation, voting, and execution through a timelock.*

## View Functions

### BALLOT_TYPEHASH

```solidity
function BALLOT_TYPEHASH() public view virtual returns (bytes32);
```

### COUNTING_MODE

```solidity
function COUNTING_MODE() public pure virtual override returns (string memory);
```

### EXTENDED_BALLOT_TYPEHASH

```solidity
function EXTENDED_BALLOT_TYPEHASH() public view virtual returns (bytes32);
```

### clock

```solidity
function clock() public view virtual override returns (uint48);
```

### getVotes

```solidity
function getVotes(address account, uint256 timepoint) public view virtual override returns (uint256);
```

### getVotesWithParams

```solidity
function getVotesWithParams(
    address account,
    uint256 timepoint,
    bytes memory params
) public view virtual override returns (uint256);
```

### hasVoted

```solidity
function hasVoted(uint256 proposalId, address account) public view virtual override returns (bool);
```

### hashProposal

```solidity
function hashProposal(
    address[] memory targets,
    uint256[] memory values,
    bytes[] memory calldatas,
    bytes32 descriptionHash
) public pure virtual override returns (uint256);
```

### name

```solidity
function name() public view virtual override returns (string memory);
```

### proposalDeadline

```solidity
function proposalDeadline(uint256 proposalId) public view virtual override returns (uint256);
```

### proposalEta

```solidity
function proposalEta(uint256 proposalId) public view virtual override returns (uint256);
```

### proposalNeedsQueuing

```solidity
function proposalNeedsQueuing(uint256 proposalId) public view virtual override returns (bool);
```

### proposalProposer

```solidity
function proposalProposer(uint256 proposalId) public view virtual override returns (address);
```

### proposalSnapshot

```solidity
function proposalSnapshot(uint256 proposalId) public view virtual override returns (uint256);
```

### proposalThreshold

```solidity
function proposalThreshold() public view virtual override returns (uint256);
```

### proposalVotes

```solidity
function proposalVotes(uint256 proposalId)
    public
    view
    virtual
    override
    returns (uint256 againstVotes, uint256 forVotes, uint256 abstainVotes);
```

### quorum

```solidity
function quorum(uint256 timepoint) public view virtual override returns (uint256);
```

### quorumDenominator

```solidity
function quorumDenominator() public view virtual override returns (uint256);
```

### quorumNumerator

```solidity
function quorumNumerator() public view virtual override returns (uint256);
```

### state

```solidity
function state(uint256 proposalId) public view virtual override returns (ProposalState);
```

### timelock

```solidity
function timelock() public view virtual override returns (address);
```

### token

```solidity
function token() public view virtual override returns (IERC5805);
```

### version

```solidity
function version() public view virtual override returns (string memory);
```

### votingDelay

```solidity
function votingDelay() public view virtual override returns (uint256);
```

### votingPeriod

```solidity
function votingPeriod() public view virtual override returns (uint256);
```

## Functions

### execute

```solidity
function execute(
    address[] memory targets,
    uint256[] memory values,
    bytes[] memory calldatas,
    bytes32 descriptionHash
) public payable virtual override returns (uint256);
```

### onERC1155Received

```solidity
function onERC1155Received(address, address, uint256, uint256, bytes memory)
    public
    virtual
    override
    returns (bytes4);
```

### relay

```solidity
function relay(address target, uint256 value, bytes calldata data) external payable virtual override;
```

### updateQuorumNumerator

```solidity
function updateQuorumNumerator(uint256 newQuorumNumerator) external virtual override;
```

### updateTimelock

```solidity
function updateTimelock(TimelockController newTimelock) external virtual override;
```

## Events

### EIP712DomainChanged {#event-eip712domainchanged}
Emitted when the EIP712 domain is changed.

```solidity
event EIP712DomainChanged();
```

### LateQuorumVoteExtensionSet {#event-latequorumvoteextensionset}
Emitted when the late quorum vote extension is set.

```solidity
event LateQuorumVoteExtensionSet(uint64 oldVoteExtension, uint64 newVoteExtension);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`oldVoteExtension`|`uint64`|The previous vote extension|
|`newVoteExtension`|`uint64`|The new vote extension|

### ProposalCanceled {#event-proposalcanceled}
Emitted when a proposal is canceled.

```solidity
event ProposalCanceled(uint256 proposalId);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`proposalId`|`uint256`|The ID of the canceled proposal|

### ProposalCreated {#event-proposalcreated}
Emitted when a proposal is created.

```solidity
event ProposalCreated(
    uint256 proposalId,
    address proposer,
    address[] targets,
    uint256[] values,
    string[] signatures,
    bytes[] calldatas,
    uint256 voteStart,
    uint256 voteEnd,
    string description
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`proposalId`|`uint256`|The ID of the created proposal|
|`proposer`|`address`|The address of the proposer|
|`targets`|`address[]`|The target addresses|
|`values`|`uint256[]`|The values for each call|
|`signatures`|`string[]`|The function signatures|
|`calldatas`|`bytes[]`|The call data|
|`voteStart`|`uint256`|The voting start time|
|`voteEnd`|`uint256`|The voting end time|
|`description`|`string`|The proposal description|

### ProposalExecuted {#event-proposalexecuted}
Emitted when a proposal is executed.

```solidity
event ProposalExecuted(uint256 proposalId);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`proposalId`|`uint256`|The ID of the executed proposal|

### ProposalExtended {#event-proposalextended}
Emitted when a proposal is extended.

```solidity
event ProposalExtended(uint256 indexed proposalId, uint64 extendedDeadline);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`proposalId`|`uint256`|The ID of the extended proposal|
|`extendedDeadline`|`uint64`|The new extended deadline|

### ProposalQueued {#event-proposalqueued}
Emitted when a proposal is queued.

```solidity
event ProposalQueued(uint256 proposalId, uint256 etaSeconds);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`proposalId`|`uint256`|The ID of the queued proposal|
|`etaSeconds`|`uint256`|The execution time in seconds|

### ProposalThresholdSet {#event-proposalthresholdset}
Emitted when the proposal threshold is set.

```solidity
event ProposalThresholdSet(uint256 oldProposalThreshold, uint256 newProposalThreshold);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`oldProposalThreshold`|`uint256`|The previous proposal threshold|
|`newProposalThreshold`|`uint256`|The new proposal threshold|

### QuorumNumeratorUpdated {#event-quorumnumeratorupdated}
Emitted when the quorum numerator is updated.

```solidity
event QuorumNumeratorUpdated(uint256 oldQuorumNumerator, uint256 newQuorumNumerator);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`oldQuorumNumerator`|`uint256`|The previous quorum numerator|
|`newQuorumNumerator`|`uint256`|The new quorum numerator|

### TimelockChange {#event-timelockchange}
Emitted when the timelock is changed.

```solidity
event TimelockChange(address oldTimelock, address newTimelock);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`oldTimelock`|`address`|The previous timelock address|
|`newTimelock`|`address`|The new timelock address|

### VoteCast {#event-votecast}
Emitted when a vote is cast.

```solidity
event VoteCast(address indexed voter, uint256 proposalId, uint8 support, uint256 weight, string reason);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`voter`|`address`|The voter address|
|`proposalId`|`uint256`|The proposal ID|
|`support`|`uint8`|The vote support|
|`weight`|`uint256`|The vote weight|
|`reason`|`string`|The vote reason|

### VoteCastWithParams {#event-votecastwithparams}
Emitted when a vote with parameters is cast.

```solidity
event VoteCastWithParams(
    address indexed voter, uint256 proposalId, uint8 support, uint256 weight, string reason, bytes params
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`voter`|`address`|The voter address|
|`proposalId`|`uint256`|The proposal ID|
|`support`|`uint8`|The vote support|
|`weight`|`uint256`|The vote weight|
|`reason`|`string`|The vote reason|
|`params`|`bytes`|The vote parameters|

### VotingDelaySet {#event-votingdelayset}
Emitted when the voting delay is set.

```solidity
event VotingDelaySet(uint256 oldVotingDelay, uint256 newVotingDelay);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`oldVotingDelay`|`uint256`|The previous voting delay|
|`newVotingDelay`|`uint256`|The new voting delay|

### VotingPeriodSet {#event-votingperiodset}
Emitted when the voting period is set.

```solidity
event VotingPeriodSet(uint256 oldVotingPeriod, uint256 newVotingPeriod);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`oldVotingPeriod`|`uint256`|The previous voting period|
|`newVotingPeriod`|`uint256`|The new voting period|
