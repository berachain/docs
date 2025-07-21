<script setup>
  import config from '@berachain/config/constants.json';
</script>

# BerachainGovernance

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.pol.governance['mainnet-address']">{{config.contracts.pol.governance['mainnet-address']}}</a><span v-if="config.contracts.pol.governance.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.pol.governance.abi">ABI JSON</a></span></small>

The Berachain Governance contract extends [OpenZeppelin's governor contracts](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/governance). It uses the `$BGT` token as its governance token, which determines voting power in the governance system. Users must hold `$BGT` tokens to participate in governance activities such as creating proposals and voting.

## State Variables

### VOTING_DELAY

The delay between when a proposal is created and when voting begins.

```solidity
uint48 internal constant VOTING_DELAY = 6 hours;
```

### VOTING_PERIOD

The duration of voting on a proposal.

```solidity
uint32 internal constant VOTING_PERIOD = 6 hours;
```

### BLOCK_INTERVAL

The time interval between blocks.

```solidity
uint32 internal constant BLOCK_INTERVAL = 4 seconds;
```

## Enums

### ProposalState

```solidity
enum ProposalState {
    Pending,    // Proposal is created but not yet active
    Active,     // Proposal is currently being voted on
    Canceled,   // Proposal was canceled
    Defeated,   // Proposal failed to meet quorum or was voted down
    Succeeded,  // Proposal passed but not yet queued/executed
    Queued,     // Proposal passed and waiting in timelock
    Expired,    // Proposal passed but expired before execution
    Executed    // Proposal was successfully executed
}
```

## Events

### ProposalCreated

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

Emitted when a new proposal is created.

### ProposalQueued

```solidity
event ProposalQueued(uint256 proposalId, uint256 etaSeconds);
```

Emitted when a proposal is queued for execution.

### ProposalExecuted

```solidity
event ProposalExecuted(uint256 proposalId);
```

Emitted when a proposal is executed.

### ProposalCanceled

```solidity
event ProposalCanceled(uint256 proposalId);
```

Emitted when a proposal is canceled.

### VoteCast

```solidity
event VoteCast(
    address indexed voter,
    uint256 proposalId,
    uint8 support,
    uint256 weight,
    string reason
);
```

Emitted when a vote is cast without parameters.

### VoteCastWithParams

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

Emitted when a vote is cast with additional parameters.

## Functions

### name

Returns the name of the governor instance.

Initializes the governance contract.

```solidity
function name() external view returns (string memory);
```

**Returns**

| Type     | Description                       |
| -------- | --------------------------------- |
| `string` | The name of the governor instance |

### version

Returns the version of the governor instance.

Initializes the governance contract with the voting token and timelock controller.

```solidity
function version() external view returns (string memory);
```

**Returns**

| Type     | Description                          |
| -------- | ------------------------------------ |
| `string` | The version of the governor instance |

### clock

Returns the current timepoint according to the mode the contract is operating in.

```solidity
function clock() public view returns (uint48);
```

**Returns**

| Type     | Description                        |
| -------- | ---------------------------------- |
| `uint48` | The current timepoint per EIP-6372 |

### CLOCK_MODE

Returns the clock mode of the contract.

```solidity
function CLOCK_MODE() external view returns (string);
```

**Returns**

| Type     | Description                 |
| -------- | --------------------------- |
| `string` | The clock mode per EIP-6372 |

### COUNTING_MODE

Returns a description of the possible vote support values and how they are counted.

```solidity
function COUNTING_MODE() external view returns (string memory);
```

**Returns**

| Type     | Description                                                         |
| -------- | ------------------------------------------------------------------- |
| `string` | URL-encoded string describing vote counting (e.g., "support=bravo") |

### hashProposal

Computes the proposal ID from its components.

```solidity
function hashProposal(
    address[] memory targets,
    uint256[] memory values,
    bytes[] memory calldatas,
    bytes32 descriptionHash
) external pure returns (uint256);
```

**Parameters**

| Name              | Type        | Description                                 |
| ----------------- | ----------- | ------------------------------------------- |
| `targets`         | `address[]` | Array of contract addresses to call         |
| `values`          | `uint256[]` | Array of BERA values to send with each call |
| `calldatas`       | `bytes[]`   | Array of function call data for each target |
| `descriptionHash` | `bytes32`   | Hash of the proposal description            |

**Returns**

| Type      | Description     |
| --------- | --------------- |
| `uint256` | The proposal ID |

I apologize for my previous confusion. Let me provide these three functions with their exact descriptions:

### state

Current state of a proposal, following Compound's convention.

```solidity
function state(uint256 proposalId) public view returns (IGovernor.ProposalState);
```

**Parameters**

| Name         | Type      | Description            |
| ------------ | --------- | ---------------------- |
| `proposalId` | `uint256` | The ID of the proposal |

**Returns**

| Type            | Description                |
| --------------- | -------------------------- |
| `ProposalState` | The current proposal state |

### proposalSnapshot

Timepoint used to retrieve user's votes and quorum. If using block number (as per Compound's Comp), the snapshot is performed at the end of this block. Hence, voting for this proposal starts at the beginning of the following block.

```solidity
function proposalSnapshot(uint256 proposalId) public view returns (uint256);
```

**Parameters**

| Name         | Type      | Description            |
| ------------ | --------- | ---------------------- |
| `proposalId` | `uint256` | The ID of the proposal |

**Returns**

| Type      | Description            |
| --------- | ---------------------- |
| `uint256` | The snapshot timepoint |

### proposalDeadline

Timepoint at which votes close. If using block number, votes close at the end of this block, so it is possible to cast a vote during this block.

```solidity
function proposalDeadline(uint256 proposalId) public view returns (uint256);
```

**Parameters**

| Name         | Type      | Description            |
| ------------ | --------- | ---------------------- |
| `proposalId` | `uint256` | The ID of the proposal |

**Returns**

| Type      | Description            |
| --------- | ---------------------- |
| `uint256` | The deadline timepoint |

### proposalProposer

The account that created a proposal.

```solidity
function proposalProposer(uint256 proposalId) public view returns (address);
```

**Parameters**

| Name         | Type      | Description            |
| ------------ | --------- | ---------------------- |
| `proposalId` | `uint256` | The ID of the proposal |

**Returns**

| Type      | Description                           |
| --------- | ------------------------------------- |
| `address` | The address that created the proposal |

### votingDelay

Delay between when a proposal is created and the vote starts. The unit this duration is expressed in depends on the clock (see EIP-6372) this contract uses.

```solidity
function votingDelay() public view returns (uint256);
```

**Returns**

| Type      | Description                                       |
| --------- | ------------------------------------------------- |
| `uint256` | The delay in timestamp units before voting starts |

**Note**: This can be increased to leave time for users to buy voting power, or delegate it, before the voting of a proposal starts.

### votingPeriod

Delay between the vote start and vote end. The unit this duration is expressed in depends on the clock (see EIP-6372) this contract uses.

```solidity
function votingPeriod() public view returns (uint256);
```

**Returns**

| Type      | Description                               |
| --------- | ----------------------------------------- |
| `uint256` | The duration of voting in timestamp units |

**Note**: The votingDelay can delay the start of the vote. This must be considered when setting the voting duration compared to the voting delay.

### quorum

Minimum number of cast voted required for a proposal to be successful.

```solidity
function quorum(uint256 timepoint) public view returns (uint256);
```

**Parameters**

| Name        | Type      | Description                               |
| ----------- | --------- | ----------------------------------------- |
| `timepoint` | `uint256` | The timestamp to check quorum requirement |

**Returns**

| Type      | Description                          |
| --------- | ------------------------------------ |
| `uint256` | The minimum number of votes required |

**Note**: The timepoint parameter corresponds to the snapshot used for counting vote. This allows to scale the quorum depending on values such as the totalSupply of a token at this timepoint (see ERC20Votes).

### getVotes

Voting power of an account at a specific timepoint.

```solidity
function getVotes(address account, uint256 timepoint) public view returns (uint256);
```

**Parameters**

| Name        | Type      | Description                            |
| ----------- | --------- | -------------------------------------- |
| `account`   | `address` | The address to check voting power for  |
| `timepoint` | `uint256` | The timestamp to check voting power at |

**Returns**

| Type      | Description                                 |
| --------- | ------------------------------------------- |
| `uint256` | The voting power in BGT tokens at timepoint |

**Note**: This can be implemented in a number of ways, for example by reading the delegated balance from one (or multiple), ERC20Votes tokens.

### getVotesWithParams

Voting power of an account at a specific timepoint given additional encoded parameters.

```solidity
function getVotesWithParams(
    address account,
    uint256 timepoint,
    bytes params
) public view returns (uint256);
```

**Parameters**

| Name        | Type      | Description                            |
| ----------- | --------- | -------------------------------------- |
| `account`   | `address` | The address to check voting power for  |
| `timepoint` | `uint256` | The timestamp to check voting power at |
| `params`    | `bytes`   | Additional encoded parameters          |

**Returns**

| Type      | Description                                 |
| --------- | ------------------------------------------- |
| `uint256` | The voting power in BGT tokens at timepoint |

### hasVoted

Returns whether an account has cast a vote on a proposal.

```solidity
function hasVoted(uint256 proposalId, address account) public view returns (bool);
```

**Parameters**

| Name         | Type      | Description                        |
| ------------ | --------- | ---------------------------------- |
| `proposalId` | `uint256` | The ID of the proposal             |
| `account`    | `address` | The address to check voting status |

**Returns**

| Type   | Description                                    |
| ------ | ---------------------------------------------- |
| `bool` | True if the account has voted, false otherwise |

### propose

Creates a new proposal.

```solidity
function propose(
    address[] memory targets,
    uint256[] memory values,
    bytes[] memory calldatas,
    string memory description
) external returns (uint256 proposalId);
```

**Parameters**

| Name          | Type        | Description                                 |
| ------------- | ----------- | ------------------------------------------- |
| `targets`     | `address[]` | Array of contract addresses to call         |
| `values`      | `uint256[]` | Array of BERA values to send with each call |
| `calldatas`   | `bytes[]`   | Array of function call data for each target |
| `description` | `string`    | Description of the proposal                 |

**Returns**

| Type      | Description                          |
| --------- | ------------------------------------ |
| `uint256` | The ID of the newly created proposal |

### queue

Queues a proposal for execution.

```solidity
function queue(
    address[] memory targets,
    uint256[] memory values,
    bytes[] memory calldatas,
    bytes32 descriptionHash
) external returns (uint256 proposalId);
```

**Parameters**

| Name              | Type        | Description                                 |
| ----------------- | ----------- | ------------------------------------------- |
| `targets`         | `address[]` | Array of contract addresses to call         |
| `values`          | `uint256[]` | Array of BERA values to send with each call |
| `calldatas`       | `bytes[]`   | Array of function call data for each target |
| `descriptionHash` | `bytes32`   | Hash of the proposal description            |

**Returns**

| Type      | Description                   |
| --------- | ----------------------------- |
| `uint256` | The ID of the queued proposal |

### execute

Executes a successful proposal.

```solidity
function execute(
    address[] memory targets,
    uint256[] memory values,
    bytes[] memory calldatas,
    bytes32 descriptionHash
) external payable returns (uint256 proposalId);
```

**Parameters**

| Name              | Type        | Description                                 |
| ----------------- | ----------- | ------------------------------------------- |
| `targets`         | `address[]` | Array of contract addresses to call         |
| `values`          | `uint256[]` | Array of BERA values to send with each call |
| `calldatas`       | `bytes[]`   | Array of function call data for each target |
| `descriptionHash` | `bytes32`   | Hash of the proposal description            |

**Returns**

| Type      | Description                     |
| --------- | ------------------------------- |
| `uint256` | The ID of the executed proposal |

### cancel

Cancels a proposal.

```solidity
function cancel(
    address[] memory targets,
    uint256[] memory values,
    bytes[] memory calldatas,
    bytes32 descriptionHash
) external returns (uint256 proposalId);
```

**Parameters**
| Name | Type | Description |
| ----------------- | ----------- | ----------------------------------------------- |
| `targets` | `address[]` | Array of contract addresses to call |
| `values` | `uint256[]` | Array of BERA values to send with each call |
| `calldatas` | `bytes[]` | Array of function call data for each target |
| `descriptionHash` | `bytes32` | Hash of the proposal description |

**Returns**

| Type      | Description                      |
| --------- | -------------------------------- |
| `uint256` | The ID of the cancelled proposal |

### castVote

Casts a vote on a proposal.

```solidity
function castVote(uint256 proposalId, uint8 support) external returns (uint256 balance);
```

**Parameters**

| Name         | Type      | Description                                   |
| ------------ | --------- | --------------------------------------------- |
| `proposalId` | `uint256` | The ID of the proposal to vote on             |
| `support`    | `uint8`   | The type of vote: 0=Against, 1=For, 2=Abstain |

**Returns**

| Type      | Description                                      |
| --------- | ------------------------------------------------ |
| `uint256` | The voting power (in `$BGT` tokens) used to vote |

### castVoteWithReason

Casts a vote on a proposal with an explanation.

```solidity
function castVoteWithReason(
    uint256 proposalId,
    uint8 support,
    string calldata reason
) external returns (uint256 balance);
```

**Parameters**

| Name         | Type      | Description                                   |
| ------------ | --------- | --------------------------------------------- |
| `proposalId` | `uint256` | The ID of the proposal to vote on             |
| `support`    | `uint8`   | The type of vote: 0=Against, 1=For, 2=Abstain |
| `reason`     | `string`  | The reason/explanation for the vote           |

**Returns**

| Type      | Description                                      |
| --------- | ------------------------------------------------ |
| `uint256` | The voting power (in `$BGT` tokens) used to vote |

### castVoteWithReasonAndParams

Casts a vote on a proposal with an explanation and additional parameters.

```solidity
function castVoteWithReasonAndParams(
    uint256 proposalId,
    uint8 support,
    string calldata reason,
    bytes memory params
) external returns (uint256 balance);
```

**Parameters**

| Name         | Type      | Description                                   |
| ------------ | --------- | --------------------------------------------- |
| `proposalId` | `uint256` | The ID of the proposal to vote on             |
| `support`    | `uint8`   | The type of vote: 0=Against, 1=For, 2=Abstain |
| `reason`     | `string`  | The reason/explanation for the vote           |
| `params`     | `bytes`   | Additional encoded parameters for the vote    |

**Returns**

| Type      | Description                                      |
| --------- | ------------------------------------------------ |
| `uint256` | The voting power (in `$BGT` tokens) used to vote |

### castVoteBySig

Casts a vote using the voter's cryptographic signature.

```solidity
function castVoteBySig(
    uint256 proposalId,
    uint8 support,
    address voter,
    bytes memory signature
) external returns (uint256 balance);
```

**Parameters**

| Name         | Type      | Description                                   |
| ------------ | --------- | --------------------------------------------- |
| `proposalId` | `uint256` | The ID of the proposal to vote on             |
| `support`    | `uint8`   | The type of vote: 0=Against, 1=For, 2=Abstain |
| `voter`      | `address` | The address of the voter                      |
| `signature`  | `bytes`   | The cryptographic signature of the vote       |

**Returns**

| Type      | Description                                      |
| --------- | ------------------------------------------------ |
| `uint256` | The voting power (in `$BGT` tokens) used to vote |

**Note**: This function supports ERC-1271 signatures for smart contract wallets.

### castVoteWithReasonAndParamsBySig

Casts a vote with reason and parameters using the voter's cryptographic signature.

```solidity
function castVoteWithReasonAndParamsBySig(
    uint256 proposalId,
    uint8 support,
    address voter,
    string calldata reason,
    bytes memory params,
    bytes memory signature
) external returns (uint256 balance);
```

**Parameters**

| Name         | Type      | Description                                   |
| ------------ | --------- | --------------------------------------------- |
| `proposalId` | `uint256` | The ID of the proposal to vote on             |
| `support`    | `uint8`   | The type of vote: 0=Against, 1=For, 2=Abstain |
| `voter`      | `address` | The address of the voter                      |
| `reason`     | `string`  | The reason for the vote                       |
| `params`     | `bytes`   | Additional parameters for the vote            |
| `signature`  | `bytes`   | The cryptographic signature of the vote       |

**Returns**

| Type      | Description                                      |
| --------- | ------------------------------------------------ |
| `uint256` | The voting power (in `$BGT` tokens) used to vote |

**Note**: This function supports ERC-1271 signatures for smart contract wallets.
