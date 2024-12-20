<script setup>
  import config from '@berachain/config/constants.json';
</script>

# BerachainGovernance

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.governance.address">{{config.contracts.governance.address}}</a><span v-if="config.contracts.governance.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.governance.abi">ABI JSON</a></span></small>

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

```solidity
function name() external view returns (string memory);
```

**Returns**

| Type     | Description                        |
| -------- | ---------------------------------- |
| `string` | The name of the governor instance |

### version

Returns the version of the governor instance.

```solidity
function version() external view returns (string memory);
```

**Returns**

| Type     | Description                           |
| -------- | ------------------------------------- |
| `string` | The version of the governor instance |

### COUNTING_MODE

Returns a description of the possible vote support values and how they are counted.

```solidity
function COUNTING_MODE() external view returns (string memory);
```

**Returns**

| Type     | Description                                                           |
| -------- | --------------------------------------------------------------------- |
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

| Name              | Type        | Description                                     |
| ----------------- | ----------- | ----------------------------------------------- |
| `targets`         | `address[]` | Array of contract addresses to call            |
| `values`          | `uint256[]` | Array of BERA values to send with each call   |
| `calldatas`       | `bytes[]`   | Array of function call data for each target   |
| `descriptionHash` | `bytes32`   | Hash of the proposal description              |

**Returns**

| Type      | Description          |
| --------- | -------------------- |
| `uint256` | The proposal ID     |

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

| Name          | Type        | Description                                     |
| ------------- | ----------- | ----------------------------------------------- |
| `targets`     | `address[]` | Array of contract addresses to call            |
| `values`      | `uint256[]` | Array of BERA values to send with each call   |
| `calldatas`   | `bytes[]`   | Array of function call data for each target   |
| `description` | `string`    | Description of the proposal                    |

**Returns**

| Type      | Description                           |
| --------- | ------------------------------------- |
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

| Name              | Type        | Description                                     |
| ----------------- | ----------- | ----------------------------------------------- |
| `targets`         | `address[]` | Array of contract addresses to call            |
| `values`          | `uint256[]` | Array of BERA values to send with each call   |
| `calldatas`       | `bytes[]`   | Array of function call data for each target   |
| `descriptionHash` | `bytes32`   | Hash of the proposal description              |

**Returns**

| Type      | Description                           |
| --------- | ------------------------------------- |
| `uint256` | The ID of the queued proposal        |

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

| Name              | Type        | Description                                     |
| ----------------- | ----------- | ----------------------------------------------- |
| `targets`         | `address[]` | Array of contract addresses to call            |
| `values`          | `uint256[]` | Array of BERA values to send with each call   |
| `calldatas`       | `bytes[]`   | Array of function call data for each target   |
| `descriptionHash` | `bytes32`   | Hash of the proposal description              |

**Returns**

| Type      | Description                           |
| --------- | ------------------------------------- |
| `uint256` | The ID of the executed proposal      |

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

| Name              | Type        | Description                                     |
| ----------------- | ----------- | ----------------------------------------------- |
| `targets`         | `address[]` | Array of contract addresses to call            |
| `values`          | `uint256[]` | Array of BERA values to send with each call   |
| `calldatas`       | `bytes[]`   | Array of function call data for each target   |
| `descriptionHash` | `bytes32`   | Hash of the proposal description              |

**Returns**

| Type      | Description                           |
| --------- | ------------------------------------- |
| `uint256` | The ID of the cancelled proposal     |

### castVote

Casts a vote on a proposal.

```solidity
function castVote(uint256 proposalId, uint8 support) external returns (uint256 balance);
```

**Parameters**

| Name         | Type      | Description                                        |
| ------------ | --------- | -------------------------------------------------- |
| `proposalId` | `uint256` | The ID of the proposal to vote on                 |
| `support`    | `uint8`   | The type of vote: 0=Against, 1=For, 2=Abstain     |

**Returns**

| Type      | Description                                    |
| --------- | ---------------------------------------------- |
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

| Name         | Type      | Description                                        |
| ------------ | --------- | -------------------------------------------------- |
| `proposalId` | `uint256` | The ID of the proposal to vote on                 |
| `support`    | `uint8`   | The type of vote: 0=Against, 1=For, 2=Abstain     |
| `reason`     | `string`  | The reason/explanation for the vote               |

**Returns**

| Type      | Description                                    |
| --------- | ---------------------------------------------- |
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

| Name         | Type      | Description                                        |
| ------------ | --------- | -------------------------------------------------- |
| `proposalId` | `uint256` | The ID of the proposal to vote on                 |
| `support`    | `uint8`   | The type of vote: 0=Against, 1=For, 2=Abstain     |
| `reason`     | `string`  | The reason/explanation for the vote               |
| `params`     | `bytes`   | Additional encoded parameters for the vote        |

**Returns**

| Type      | Description                                    |
| --------- | ---------------------------------------------- |
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

| Name         | Type      | Description                                        |
| ------------ | --------- | -------------------------------------------------- |
| `proposalId` | `uint256` | The ID of the proposal to vote on                 |
| `support`    | `uint8`   | The type of vote: 0=Against, 1=For, 2=Abstain     |
| `voter`      | `address` | The address of the voter                          |
| `signature`  | `bytes`   | The cryptographic signature of the vote           |

**Returns**

| Type      | Description                                    |
| --------- | ---------------------------------------------- |
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

| Name         | Type      | Description                                        |
| ------------ | --------- | -------------------------------------------------- |
| `proposalId` | `uint256` | The ID of the proposal to vote on                 |
| `support`    | `uint8`   | The type of vote: 0=Against, 1=For, 2=Abstain     |
| `voter`      | `address` | The address of the voter                          |
| `reason`     | `string`  | The reason for the vote                           |
| `params`     | `bytes`   | Additional parameters for the vote                |
| `signature`  | `bytes`   | The cryptographic signature of the vote           |

**Returns**

| Type      | Description                                    |
| --------- | ---------------------------------------------- |
| `uint256` | The voting power (in `$BGT` tokens) used to vote |

**Note**: This function supports ERC-1271 signatures for smart contract wallets.

### hasVoted

Checks if an account has voted on a proposal.

```solidity
function hasVoted(uint256 proposalId, address account) external view returns (bool);
```

**Parameters**

| Name         | Type      | Description                         |
| ------------ | --------- | ----------------------------------- |
| `proposalId` | `uint256` | The ID of the proposal            |
| `account`    | `address` | The address to check voting status |

**Returns**

| Type   | Description                                     |
| ------ | ----------------------------------------------- |
| `bool` | True if the account has voted, false otherwise |

### getVotes

Returns the voting power in `$BGT` tokens of an account at a specific timestamp.

```solidity
function getVotes(address account, uint256 timepoint) external view returns (uint256);
```

**Parameters**

| Name        | Type      | Description                            |
| ----------- | --------- | -------------------------------------- |
| `account`   | `address` | The address to check voting power for |
| `timepoint` | `uint256` | The timestamp to check voting power at |

**Returns**

| Type      | Description                                    |
| --------- | ---------------------------------------------- |
| `uint256` | The voting power in `$BGT` tokens at timepoint   |

### getVotesWithParams

Returns the voting power with additional parameters.

```solidity
function getVotesWithParams(
    address account,
    uint256 timepoint,
    bytes memory params
) external view returns (uint256);
```

**Parameters**

| Name        | Type      | Description                             |
| ----------- | --------- | --------------------------------------- |
| `account`   | `address` | The address to check voting power for  |
| `timepoint` | `uint256` | The timestamp to check voting power at |
| `params`    | `bytes`   | Additional parameters for calculation  |

**Returns**

| Type      | Description                                    |
| --------- | ---------------------------------------------- |
| `uint256` | The voting power in `$BGT` tokens at timepoint   |

### hasVoted

Checks if an account has voted on a proposal.

```solidity
function hasVoted(uint256 proposalId, address account) external view returns (bool);
```

**Parameters**

| Name         | Type      | Description                         |
| ------------ | --------- | ----------------------------------- |
| `proposalId` | `uint256` | The ID of the proposal            |
| `account`    | `address` | The address to check voting status |

**Returns**

| Type   | Description                                     |
| ------ | ----------------------------------------------- |
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

| Name          | Type        | Description                                     |
| ------------- | ----------- | ----------------------------------------------- |
| `targets`     | `address[]` | Array of contract addresses to call            |
| `values`      | `uint256[]` | Array of BERA values to send with each call   |
| `calldatas`   | `bytes[]`   | Array of function call data for each target   |
| `description` | `string`    | Description of the proposal                    |

**Returns**

| Type      | Description                           |
| --------- | ------------------------------------- |
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

| Name              | Type        | Description                                     |
| ----------------- | ----------- | ----------------------------------------------- |
| `targets`         | `address[]` | Array of contract addresses to call            |
| `values`          | `uint256[]` | Array of BERA values to send with each call   |
| `calldatas`       | `bytes[]`   | Array of function call data for each target   |
| `descriptionHash` | `bytes32`   | Hash of the proposal description              |

**Returns**

| Type      | Description                           |
| --------- | ------------------------------------- |
| `uint256` | The ID of the queued proposal        |

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

| Name              | Type        | Description                                     |
| ----------------- | ----------- | ----------------------------------------------- |
| `targets`         | `address[]` | Array of contract addresses to call            |
| `values`          | `uint256[]` | Array of BERA values to send with each call   |
| `calldatas`       | `bytes[]`   | Array of function call data for each target   |
| `descriptionHash` | `bytes32`   | Hash of the proposal description              |

**Returns**

| Type      | Description                           |
| --------- | ------------------------------------- |
| `uint256` | The ID of the executed proposal      |

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

| Name              | Type        | Description                                     |
| ----------------- | ----------- | ----------------------------------------------- |
| `targets`         | `address[]` | Array of contract addresses to call            |
| `values`          | `uint256[]` | Array of BERA values to send with each call   |
| `calldatas`       | `bytes[]`   | Array of function call data for each target   |
| `descriptionHash` | `bytes32`   | Hash of the proposal description              |

**Returns**

| Type      | Description                           |
| --------- | ------------------------------------- |
| `uint256` | The ID of the cancelled proposal     |

### castVote

Casts a vote on a proposal.

```solidity
function castVote(uint256 proposalId, uint8 support) external returns (uint256 balance);
```

**Parameters**

| Name         | Type      | Description                                        |
| ------------ | --------- | -------------------------------------------------- |
| `proposalId` | `uint256` | The ID of the proposal to vote on                 |
| `support`    | `uint8`   | The type of vote: 0=Against, 1=For, 2=Abstain     |

**Returns**

| Type      | Description                                    |
| --------- | ---------------------------------------------- |
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

| Name         | Type      | Description                                        |
| ------------ | --------- | -------------------------------------------------- |
| `proposalId` | `uint256` | The ID of the proposal to vote on                 |
| `support`    | `uint8`   | The type of vote: 0=Against, 1=For, 2=Abstain     |
| `reason`     | `string`  | The reason/explanation for the vote               |

**Returns**

| Type      | Description                                    |
| --------- | ---------------------------------------------- |
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

| Name         | Type      | Description                                        |
| ------------ | --------- | -------------------------------------------------- |
| `proposalId` | `uint256` | The ID of the proposal to vote on                 |
| `support`    | `uint8`   | The type of vote: 0=Against, 1=For, 2=Abstain     |
| `reason`     | `string`  | The reason/explanation for the vote               |
| `params`     | `bytes`   | Additional encoded parameters for the vote        |

**Returns**

| Type      | Description                                    |
| --------- | ---------------------------------------------- |
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

| Name         | Type      | Description                                        |
| ------------ | --------- | -------------------------------------------------- |
| `proposalId` | `uint256` | The ID of the proposal to vote on                 |
| `support`    | `uint8`   | The type of vote: 0=Against, 1=For, 2=Abstain     |
| `voter`      | `address` | The address of the voter                          |
| `signature`  | `bytes`   | The cryptographic signature of the vote           |

**Returns**

| Type      | Description                                    |
| --------- | ---------------------------------------------- |
| `uint256` | The voting power (in `$BGT` tokens) used to vote |

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

| Name         | Type      | Description                                        |
| ------------ | --------- | -------------------------------------------------- |
| `proposalId` | `uint256` | The ID of the proposal to vote on                 |
| `support`    | `uint8`   | The type of vote: 0=Against, 1=For, 2=Abstain     |
| `voter`      | `address` | The address of the voter                          |
| `reason`     | `string`  | The reason for the vote                           |
| `params`     | `bytes`   | Additional parameters for the vote                |
| `signature`  | `bytes`   | The cryptographic signature of the vote           |

**Returns**

| Type      | Description                                    |
| --------- | ---------------------------------------------- |
| `uint256` | The voting power (in `$BGT` tokens) used to vote |
