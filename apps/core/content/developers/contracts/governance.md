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

> <small><a target="_blank" :href="config.websites.berascan.url + 'address/' + config.contracts.pol.governance.address.berachainMainnet">{{config.contracts.pol.governance.address.berachainMainnet}}</a><span v-if="config.contracts.pol.governance.abi && config.contracts.pol.governance.abi.length > 0">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.pol.governance.abi">ABI JSON</a></span></small>

The Berachain Governance contract extends OpenZeppelin's governor contracts. It uses the $BGT token as its governance token, which determines voting power in the governance system. Users must hold $BGT tokens to participate in governance activities such as creating proposals and voting.

:::tip
Governance proposals, to be executed by this contract, should be submitted on the [Berachain Forums](https://hub.forum.berachain.com/c/reward-vaults/6).
:::

**Inherits:**
Governor, GovernorSettings, GovernorCountingSimple, GovernorVotes, GovernorVotesQuorumFraction, GovernorTimelockControl, GovernorPreventLateQuorum

## Structs

### InitialGovernorParameters

Parameters used to initialize the governor contract.

```solidity
struct InitialGovernorParameters {
    uint256 proposalThreshold;
    uint256 quorumNumeratorValue;
    uint48 votingDelay;
    uint32 votingPeriod;
}
```

**Properties**
| Name | Type | Description |
| ---------------------- | --------- | --------------------------------------------------------- |
| `proposalThreshold` | `uint256` | The minimum number of votes required to create a proposal |
| `quorumNumeratorValue` | `uint256` | The numerator of the quorum fraction |
| `votingDelay` | `uint48` | The delay before voting begins |
| `votingPeriod` | `uint32` | The duration of the voting period |

## View Functions

### BALLOT_TYPEHASH

Returns the type hash used for ballot signatures in EIP-712.

```solidity
function BALLOT_TYPEHASH() public view virtual returns (bytes32);
```

### COUNTING_MODE

Returns a string describing the vote counting mode. For this contract, returns "support=bravo&quorum=for,abstain".

```solidity
function COUNTING_MODE() public pure virtual override returns (string memory);
```

### EXTENDED_BALLOT_TYPEHASH

Returns the type hash used for extended ballot signatures in EIP-712.

```solidity
function EXTENDED_BALLOT_TYPEHASH() public view virtual returns (bytes32);
```

### clock

Returns the current timepoint according to the mode the contract is operating on.

```solidity
function clock() public view virtual override returns (uint48);
```

### getVotes

Returns the voting power of an account at a specific timepoint.

```solidity
function getVotes(address account, uint256 timepoint) public view virtual override returns (uint256);
```

### getVotesWithParams

Returns the voting power of an account at a specific timepoint, with additional parameters.

```solidity
function getVotesWithParams(
    address account,
    uint256 timepoint,
    bytes memory params
) public view virtual override returns (uint256);
```

### hasVoted

Returns whether an account has cast a vote on a specific proposal.

```solidity
function hasVoted(uint256 proposalId, address account) public view virtual override returns (bool);
```

### hashProposal

Hashes the proposal parameters to get a unique proposal ID.

```solidity
function hashProposal(
    address[] memory targets,
    uint256[] memory values,
    bytes[] memory calldatas,
    bytes32 descriptionHash
) public pure virtual override returns (uint256);
```

### name

Returns the name of the governor instance.

```solidity
function name() public view virtual override returns (string memory);
```

### proposalDeadline

Returns the deadline timepoint for a proposal.

```solidity
function proposalDeadline(uint256 proposalId) public view virtual override returns (uint256);
```

### proposalEta

Returns the timestamp at which a proposal will be executable, if in queued state.

```solidity
function proposalEta(uint256 proposalId) public view virtual override returns (uint256);
```

### proposalNeedsQueuing

Returns whether a proposal needs to be queued before execution.

```solidity
function proposalNeedsQueuing(uint256 proposalId) public view virtual override returns (bool);
```

### proposalProposer

Returns the account that created a proposal.

```solidity
function proposalProposer(uint256 proposalId) public view virtual override returns (address);
```

### proposalSnapshot

Returns the snapshot timepoint for a proposal.

```solidity
function proposalSnapshot(uint256 proposalId) public view virtual override returns (uint256);
```

### proposalThreshold

Returns the number of votes required to create a proposal.

```solidity
function proposalThreshold() public view virtual override returns (uint256);
```

### proposalVotes

Returns the current votes for a proposal.

```solidity
function proposalVotes(uint256 proposalId)
    public
    view
    virtual
    override
    returns (uint256 againstVotes, uint256 forVotes, uint256 abstainVotes);
```

### quorum

Returns the minimum number of votes required for a timepoint to be valid.

```solidity
function quorum(uint256 timepoint) public view virtual override returns (uint256);
```

### quorumDenominator

Returns the denominator used to calculate quorum.

```solidity
function quorumDenominator() public view virtual override returns (uint256);
```

### quorumNumerator

Returns the numerator used to calculate quorum.

```solidity
function quorumNumerator() public view virtual override returns (uint256);
```

### state

Returns the state of a proposal.

```solidity
function state(uint256 proposalId) public view virtual override returns (ProposalState);
```

### timelock

Returns the timelock contract address.

```solidity
function timelock() public view virtual override returns (address);
```

### token

Returns the governance token contract.

```solidity
function token() public view virtual override returns (IERC5805);
```

### version

Returns the version of the governor instance.

```solidity
function version() public view virtual override returns (string memory);
```

### votingDelay

Returns the delay before voting on a proposal may take place, in blocks.

```solidity
function votingDelay() public view virtual override returns (uint256);
```

### votingPeriod

Returns the voting period duration, in blocks.

```solidity
function votingPeriod() public view virtual override returns (uint256);
```

## Functions

### execute

Executes a successful proposal. Can only be called when a proposal is in the Succeeded state.

**Parameters:**

- `targets`: List of target addresses for proposal calls
- `values`: List of ETH values for proposal calls
- `calldatas`: List of calldata for proposal calls
- `descriptionHash`: Hash of the proposal description

```solidity
function execute(
    address[] memory targets,
    uint256[] memory values,
    bytes[] memory calldatas,
    bytes32 descriptionHash
) public payable virtual override returns (uint256);
```

### onERC1155Received

Handles the receipt of a single ERC1155 token type. Required for the contract to receive ERC1155 tokens.

```solidity
function onERC1155Received(address, address, uint256, uint256, bytes memory)
    public
    virtual
    override
    returns (bytes4);
```

### relay

Relays a transaction or function call to a target contract. Can only be called by the governance executor.

```solidity
function relay(address target, uint256 value, bytes calldata data) external payable virtual override;
```

### updateQuorumNumerator

Updates the quorum numerator. Can only be called through governance.

```solidity
function updateQuorumNumerator(uint256 newQuorumNumerator) external virtual override;
```

### updateTimelock

Updates the timelock contract. Can only be called through governance.

```solidity
function updateTimelock(TimelockController newTimelock) external virtual override;
```

## Events

### EIP712DomainChanged {#event-eip712domainchanged}

Emitted when the EIP712 domain is changed. This is used for vote signature verification.

```solidity
event EIP712DomainChanged();
```

### LateQuorumVoteExtensionSet {#event-latequorumvoteextensionset}

Emitted when the late quorum vote extension duration is changed. This extension helps prevent last-minute quorum manipulations.

```solidity
event LateQuorumVoteExtensionSet(uint64 oldVoteExtension, uint64 newVoteExtension);
```

**Parameters**
| Name | Type | Description |
| ------------------ | -------- | ---------------------------------------------- |
| `oldVoteExtension` | `uint64` | Previous duration of the vote extension period |
| `newVoteExtension` | `uint64` | New duration of the vote extension period |

### ProposalCanceled {#event-proposalcanceled}

Emitted when a proposal is canceled.

```solidity
event ProposalCanceled(uint256 proposalId);
```

**Parameters**
| Name | Type | Description |
| ------------ | --------- | ------------------------------- |
| `proposalId` | `uint256` | ID of the canceled proposal |

### ProposalCreated {#event-proposalcreated}

Emitted when a new proposal is created.

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
| Name | Type | Description |
| ------------- | ----------- | ---------------------------------------------------- |
| `proposalId` | `uint256` | Unique identifier of the proposal |
| `proposer` | `address` | Address of the account that created the proposal |
| `targets` | `address[]` | Target addresses for proposal calls |
| `values` | `uint256[]` | ETH values for proposal calls |
| `signatures` | `string[]` | Function signatures for proposal calls |
| `calldatas` | `bytes[]` | Encoded function data for proposal calls |
| `voteStart` | `uint256` | Timestamp when voting begins |
| `voteEnd` | `uint256` | Timestamp when voting ends |
| `description` | `string` | Description of the proposal |

### ProposalExecuted {#event-proposalexecuted}

Emitted when a proposal is executed.

```solidity
event ProposalExecuted(uint256 proposalId);
```

**Parameters**
| Name | Type | Description |
| ------------ | --------- | ------------------------------- |
| `proposalId` | `uint256` | ID of the executed proposal |

### ProposalExtended {#event-proposalextended}

Emitted when a proposal's voting period is extended due to late quorum.

```solidity
event ProposalExtended(uint256 indexed proposalId, uint64 extendedDeadline);
```

**Parameters**
| Name | Type | Description |
| ------------------ | --------- | ------------------------------------------ |
| `proposalId` | `uint256` | ID of the proposal being extended |
| `extendedDeadline` | `uint64` | New deadline timestamp for the proposal |

### ProposalQueued {#event-proposalqueued}

Emitted when a proposal is queued in the timelock.

```solidity
event ProposalQueued(uint256 proposalId, uint256 etaSeconds);
```

**Parameters**
| Name | Type | Description |
| ------------ | --------- | ----------------------------------------------- |
| `proposalId` | `uint256` | ID of the queued proposal |
| `etaSeconds` | `uint256` | Timestamp when the proposal can be executed |

### ProposalThresholdSet {#event-proposalthresholdset}

Emitted when the proposal threshold is updated.

```solidity
event ProposalThresholdSet(uint256 oldProposalThreshold, uint256 newProposalThreshold);
```

**Parameters**
| Name | Type | Description |
| ---------------------- | --------- | ----------------------------------------------------- |
| `oldProposalThreshold` | `uint256` | Previous number of votes required to create proposal |
| `newProposalThreshold` | `uint256` | New number of votes required to create proposal |

### QuorumNumeratorUpdated {#event-quorumnumeratorupdated}

Emitted when the quorum numerator is updated.

```solidity
event QuorumNumeratorUpdated(uint256 oldQuorumNumerator, uint256 newQuorumNumerator);
```

**Parameters**
| Name | Type | Description |
| -------------------- | --------- | ---------------------------------------------- |
| `oldQuorumNumerator` | `uint256` | Previous numerator of the quorum fraction |
| `newQuorumNumerator` | `uint256` | New numerator of the quorum fraction |

### TimelockChange {#event-timelockchange}

Emitted when the timelock controller contract is changed.

```solidity
event TimelockChange(address oldTimelock, address newTimelock);
```

**Parameters**
| Name | Type | Description |
| ------------- | --------- | ------------------------------------ |
| `oldTimelock` | `address` | Previous timelock contract address |
| `newTimelock` | `address` | New timelock contract address |

### VoteCast {#event-votecast}

Emitted when a vote is cast on a proposal.

```solidity
event VoteCast(address indexed voter, uint256 proposalId, uint8 support, uint256 weight, string reason);
```

**Parameters**
| Name | Type | Description |
| ------------ | --------- | ----------------------------------------------------- |
| `voter` | `address` | Address of the account casting the vote |
| `proposalId` | `uint256` | ID of the proposal being voted on |
| `support` | `uint8` | Support value: 0=against, 1=for, 2=abstain |
| `weight` | `uint256` | Number of votes cast |
| `reason` | `string` | Optional reason for the vote |

### VoteCastWithParams {#event-votecastwithparams}

Emitted when a vote with parameters is cast on a proposal.

```solidity
event VoteCastWithParams(
    address indexed voter,
    uint256 proposalId,
    uint8 support,
    uint256 weight,
    string reason,
    bytes params
);
```

**Parameters**
| Name | Type | Description |
| ------------ | --------- | ----------------------------------------------------- |
| `voter` | `address` | Address of the account casting the vote |
| `proposalId` | `uint256` | ID of the proposal being voted on |
| `support` | `uint8` | Support value: 0=against, 1=for, 2=abstain |
| `weight` | `uint256` | Number of votes cast |
| `reason` | `string` | Optional reason for the vote |
| `params` | `bytes` | Additional parameters for the vote |

### VotingDelaySet {#event-votingdelayset}

Emitted when the voting delay is updated.

```solidity
event VotingDelaySet(uint256 oldVotingDelay, uint256 newVotingDelay);
```

**Parameters**
| Name | Type | Description |
| ---------------- | --------- | ---------------------------------------------- |
| `oldVotingDelay` | `uint256` | Previous delay before voting starts |
| `newVotingDelay` | `uint256` | New delay before voting starts |

### VotingPeriodSet {#event-votingperiodset}

Emitted when the voting period duration is updated.

```solidity
event VotingPeriodSet(uint256 oldVotingPeriod, uint256 newVotingPeriod);
```

**Parameters**
| Name | Type | Description |
| ----------------- | --------- | ---------------------------------------------- |
| `oldVotingPeriod` | `uint256` | Previous duration of the voting period |
| `newVotingPeriod` | `uint256` | New duration of the voting period |
