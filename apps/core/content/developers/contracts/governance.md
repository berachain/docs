<script setup>
  import config from '@berachain/config/constants.json';
</script>

# BerachainGovernance

<small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.governance.address">{{config.contracts.governance.address}}</a><span v-if="config.contracts.governance.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.governance.abi">ABI JSON</a></span></small>

The Berachain Governance contract extends [OpenZeppelin's governor contracts](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/governance).`$BGT` is used as the governance token, which determines voting power in the governance system. Users must hold `$BGT` tokens to participate in governance activities such as creating proposals and voting.

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

## Functions

### constructor

Initializes the governance contract.

```solidity
constructor();
```

### initialize

Initializes the governance contract with the voting token and timelock controller.

```solidity
function initialize(IVotes _token, TimelockControllerUpgradeable _timelock) public initializer;
```

**Parameters**

| Name        | Type                        | Description                                         |
| ----------- | --------------------------- | --------------------------------------------------- |
| `_token`    | `IVotes`                   | The token used for voting power(`$BGT`)                     |
| `_timelock` | `TimelockControllerUpgradeable` | The timelock controller for executing proposals |

### propose

Creates a new proposal in the governance system.

```solidity
function propose(
    address[] memory targets,
    uint256[] memory values,
    bytes[] memory calldatas,
    string memory description
) public returns (uint256);
```

**Parameters**

| Name          | Type        | Description                                        |
| ------------- | ----------- | -------------------------------------------------- |
| `targets`     | `address[]` | Array of contract addresses to call               |
| `values`      | `uint256[]` | Array of BERA values to send with each call      |
| `calldatas`   | `bytes[]`   | Array of function call data for each target      |
| `description` | `string`    | Description of the proposal                       |

**Returns**

| Type      | Description                            |
| --------- | -------------------------------------- |
| `uint256` | The ID of the newly created proposal   |

### castVote

Casts a vote on a proposal.

```solidity
function castVote(uint256 proposalId, uint8 support) public returns (uint256);
```

**Parameters**

| Name         | Type      | Description                                        |
| ------------ | --------- | -------------------------------------------------- |
| `proposalId` | `uint256` | The ID of the proposal to vote on                 |
| `support`    | `uint8`   | The type of vote: 0=Against, 1=For, 2=Abstain     |

**Returns**

| Type      | Description                        |
| --------- | ---------------------------------- |
| `uint256` | The weight of the casted vote     |

### castVoteWithReason

Casts a vote on a proposal with an explanation.

```solidity
function castVoteWithReason(
    uint256 proposalId,
    uint8 support,
    string calldata reason
) public returns (uint256);
```

**Parameters**

| Name         | Type      | Description                                        |
| ------------ | --------- | -------------------------------------------------- |
| `proposalId` | `uint256` | The ID of the proposal to vote on                 |
| `support`    | `uint8`   | The type of vote: 0=Against, 1=For, 2=Abstain     |
| `reason`     | `string`  | The reason for the vote                           |

**Returns**

| Type      | Description                        |
| --------- | ---------------------------------- |
| `uint256` | The weight of the casted vote     |

### execute

Executes a successful proposal.

```solidity
function execute(
    address[] memory targets,
    uint256[] memory values,
    bytes[] memory calldatas,
    bytes32 descriptionHash
) public payable returns (uint256);
```

**Parameters**

| Name              | Type        | Description                                        |
| ----------------- | ----------- | -------------------------------------------------- |
| `targets`         | `address[]` | Array of contract addresses to call               |
| `values`          | `uint256[]` | Array of BERA values to send with each call      |
| `calldatas`       | `bytes[]`   | Array of function call data for each target      |
| `descriptionHash` | `bytes32`   | Hash of the proposal description                  |

**Returns**

| Type      | Description                            |
| --------- | -------------------------------------- |
| `uint256` | The ID of the executed proposal        |

### getVotes

Gets the voting power (in `$BGT`) of an account at a specific timepoint.

```solidity
function getVotes(address account, uint256 timepoint) public view returns (uint256);
```

**Parameters**

| Name         | Type      | Description                                   |
| ------------ | --------- | --------------------------------------------- |
| `account`    | `address` | The address to get voting power for           |
| `timepoint`  | `uint256` | The timepoint to get voting power at         |

**Returns**

| Type      | Description                                                |
| --------- | ---------------------------------------------------------- |
| `uint256` | The voting power of the account in `$BGT` tokens              |

**Note**: Voting power is determined by the amount of `$BGT` tokens held by the account at the specified timepoint.


### _authorizeUpgrade

Authorizes an upgrade to a new implementation of the contract.

```solidity
function _authorizeUpgrade(address newImplementation) internal override onlyOwner;
```

**Parameters**

| Name                | Type      | Description                                    |
| ------------------ | --------- | ---------------------------------------------- |
| `newImplementation` | `address` | The address of the new implementation contract |

### state

Gets the current state of a proposal.

```solidity
function state(uint256 proposalId)
    public
    view
    override(GovernorUpgradeable, GovernorTimelockControlUpgradeable)
    returns (ProposalState);
```

**Parameters**

| Name         | Type      | Description             |
| ------------ | --------- | ----------------------- |
| `proposalId` | `uint256` | The ID of the proposal |

**Returns**

| Type            | Description                   |
| --------------- | ----------------------------- |
| `ProposalState` | The current proposal state   |

### proposalNeedsQueuing

Checks if a proposal needs to be queued before execution.

```solidity
function proposalNeedsQueuing(uint256 proposalId)
    public
    view
    override(GovernorUpgradeable, GovernorTimelockControlUpgradeable)
    returns (bool);
```

**Parameters**

| Name         | Type      | Description             |
| ------------ | --------- | ----------------------- |
| `proposalId` | `uint256` | The ID of the proposal |

**Returns**

| Type    | Description                                          |
| ------- | -------------------------------------------------- |
| `bool`  | True if the proposal needs queuing, false otherwise |

### proposalThreshold

Gets the minimum number of votes required to create a proposal.

```solidity
function proposalThreshold()
    public
    view
    override(GovernorUpgradeable, GovernorSettingsUpgradeable)
    returns (uint256);
```

**Returns**

| Type      | Description                                    |
| --------- | ---------------------------------------------- |
| `uint256` | The minimum number of votes needed to propose |

