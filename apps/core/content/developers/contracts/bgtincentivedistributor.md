---
head:
  - - meta
    - property: og:title
      content: BGTIncentiveDistributor Contract Reference
  - - meta
    - name: description
      content: Developer reference for the BGTIncentiveDistributor contract in PoL
  - - meta
    - property: og:description
      content: Developer reference for the BGTIncentiveDistributor contract in PoL
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# BGTIncentiveDistributor

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.pol.bgtIncentiveDistributor['mainnet-address']">{{config.contracts.pol.bgtIncentiveDistributor['mainnet-address']}}</a><span v-if="config.contracts.pol.bgtIncentiveDistributor.abi && config.contracts.pol.bgtIncentiveDistributor.abi.length > 0">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.pol.bgtIncentiveDistributor.abi">ABI JSON</a></span></small>

The BGTIncentiveDistributor contract is used to distribute the POL incentives to the BGT boosters. BGT boosters share of incentive from the rewardVault is transferred to the BGTIncentiveDistributor contract. The rewards are then distributed to the BGT boosters based on the merkle root computed off-chain.

**Inherits:**
[IBGTIncentiveDistributor](/src/pol/interfaces/IBGTIncentiveDistributor.sol/interface.IBGTIncentiveDistributor.md), AccessControlUpgradeable, ReentrancyGuardUpgradeable, PausableUpgradeable, UUPSUpgradeable

_forked from Hidden Hand RewardDistributor Contract: https://github.com/dinero-protocol/hidden-hand-contracts/blob/master/contracts/RewardDistributor.sol_

## Constants

### MANAGER_ROLE

```solidity
bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");
```

### MAX_REWARD_CLAIM_DELAY

Maximum value of delay to claim the rewards after an update of rewards metadata.

```solidity
uint64 public constant MAX_REWARD_CLAIM_DELAY = 3 hours;
```

### PAUSER_ROLE

```solidity
bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
```

## Structs

### Claim

The claim struct for claiming rewards.

```solidity
struct Claim {
    bytes32 identifier;
    address account;
    uint256 amount;
    bytes32[] merkleProof;
}
```

**Properties**

| Name          | Type        | Description               |
| ------------- | ----------- | ------------------------- |
| `identifier`  | `bytes32`   | The merkle identifier     |
| `account`     | `address`   | The eligible user account |
| `amount`      | `uint256`   | The reward amount         |
| `merkleProof` | `bytes32[]` | The merkle proof          |

### Distribution

The distribution struct for reward metadata.

```solidity
struct Distribution {
    bytes32 identifier;
    address token;
    bytes32 merkleRoot;
    bytes proof;
}
```

**Properties**

| Name         | Type      | Description              |
| ------------ | --------- | ------------------------ |
| `identifier` | `bytes32` | The merkle identifier    |
| `token`      | `address` | The reward token address |
| `merkleRoot` | `bytes32` | The merkle root          |
| `proof`      | `bytes`   | The proof data           |

### Reward

The reward struct for reward metadata.

```solidity
struct Reward {
    address token;
    bytes32 merkleRoot;
    bytes proof;
    uint64 updateTime;
}
```

**Properties**

| Name         | Type      | Description              |
| ------------ | --------- | ------------------------ |
| `token`      | `address` | The reward token address |
| `merkleRoot` | `bytes32` | The merkle root          |
| `proof`      | `bytes`   | The proof data           |
| `updateTime` | `uint64`  | The update timestamp     |

## State Variables

### claimed

Tracks the amount of claimed reward for the specified identifier+account.

```solidity
mapping(bytes32 => mapping(address => uint256)) public claimed;
```

### incentiveTokensPerValidator

Tracks the amount of incentive tokens currently held by the contract for each validator.

```solidity
mapping(bytes => mapping(address => uint256)) public incentiveTokensPerValidator;
```

### rewardClaimDelay

Delay after which rewards can be claimed after an update of rewards metadata.

```solidity
uint64 public rewardClaimDelay;
```

### rewards

Maps each of the identifiers to its reward metadata.

```solidity
mapping(bytes32 => Reward) public rewards;
```

## View Functions

### paused

```solidity
function paused() public view virtual override returns (bool);
```

## Functions

### claim

Claim rewards based on the specified metadata

**Emits:**

- [Claimed](#event-claimed)

```solidity
function claim(Claim[] calldata _claims) external nonReentrant whenNotPaused;
```

**Parameters**

| Name      | Type      | Description                    |
| --------- | --------- | ------------------------------ |
| `_claims` | `Claim[]` | Claim[] List of claim metadata |

### initialize

```solidity
function initialize(address _governance) external initializer;
```

### receiveIncentive

Receive incentive tokens from POL reward vaults

_Token approval must be given by the caller to this function before calling it._

**Emits:**

- [IncentiveReceived](#event-incentivereceived)

```solidity
function receiveIncentive(bytes calldata pubkey, address token, uint256 _amount) external;
```

**Parameters**

| Name      | Type      | Description                        |
| --------- | --------- | ---------------------------------- |
| `pubkey`  | `bytes`   | The pubkey of the validator        |
| `token`   | `address` | The address of the incentive token |
| `_amount` | `uint256` | The amount of tokens received      |

### setPauseState

Set the contract's pause state.

_Only address with PAUSER_ROLE can call this function_

**Emits:**

- [Paused](#event-paused) or [Unpaused](#event-unpaused)

```solidity
function setPauseState(bool state) external onlyRole(PAUSER_ROLE);
```

**Parameters**

| Name    | Type   | Description |
| ------- | ------ | ----------- |
| `state` | `bool` | Pause state |

### setRewardClaimDelay

Set the reward claim delay

_Only address with DEFAULT_ADMIN_ROLE can call this function_

**Emits:**

- [RewardClaimDelaySet](#event-rewardclaimdelayset)

```solidity
function setRewardClaimDelay(uint64 _delay) external onlyRole(DEFAULT_ADMIN_ROLE);
```

**Parameters**

| Name     | Type     | Description          |
| -------- | -------- | -------------------- |
| `_delay` | `uint64` | The delay in seconds |

### updateRewardsMetadata

Update the rewards metadata

_Only address with MANAGER_ROLE can call this function_

**Emits:**

- [RewardsMetadataUpdated](#event-rewardsmetadataupdated)

```solidity
function updateRewardsMetadata(Distribution[] calldata _distributions) external onlyRole(MANAGER_ROLE);
```

**Parameters**

| Name             | Type             | Description                            |
| ---------------- | ---------------- | -------------------------------------- |
| `_distributions` | `Distribution[]` | Distribution[] List of reward metadata |

### upgradeToAndCall

```solidity
function upgradeToAndCall(address newImplementation, bytes memory data) public payable virtual override;
```

## Events

### Claimed {#event-claimed}

Emitted when rewards are claimed.

```solidity
event Claimed(address indexed account, address indexed token, bytes32 indexed identifier, uint256 amount);
```

**Parameters**

| Name         | Type      | Description                  |
| ------------ | --------- | ---------------------------- |
| `account`    | `address` | The account claiming rewards |
| `token`      | `address` | The reward token             |
| `identifier` | `bytes32` | The merkle identifier        |
| `amount`     | `uint256` | The amount claimed           |

### IncentiveReceived {#event-incentivereceived}

Emitted when incentive tokens are received.

```solidity
event IncentiveReceived(bytes indexed pubkey, address indexed token, uint256 amount);
```

**Parameters**

| Name     | Type      | Description                |
| -------- | --------- | -------------------------- |
| `pubkey` | `bytes`   | The validator's public key |
| `token`  | `address` | The incentive token        |
| `amount` | `uint256` | The amount received        |

### Initialized {#event-initialized}

Emitted when the contract is initialized.

```solidity
event Initialized(uint64 version);
```

**Parameters**

| Name      | Type     | Description                |
| --------- | -------- | -------------------------- |
| `version` | `uint64` | The initialization version |

### Paused {#event-paused}

Emitted when the contract is paused.

```solidity
event Paused(address account);
```

**Parameters**

| Name      | Type      | Description                          |
| --------- | --------- | ------------------------------------ |
| `account` | `address` | The account that paused the contract |

### RewardClaimDelaySet {#event-rewardclaimdelayset}

Emitted when the reward claim delay is set.

```solidity
event RewardClaimDelaySet(uint64 delay);
```

**Parameters**

| Name    | Type     | Description                |
| ------- | -------- | -------------------------- |
| `delay` | `uint64` | The new reward claim delay |

### RewardsMetadataUpdated {#event-rewardsmetadataupdated}

Emitted when rewards metadata is updated.

```solidity
event RewardsMetadataUpdated(bytes32 indexed identifier, address indexed token, bytes32 merkleRoot);
```

**Parameters**

| Name         | Type      | Description           |
| ------------ | --------- | --------------------- |
| `identifier` | `bytes32` | The merkle identifier |
| `token`      | `address` | The reward token      |
| `merkleRoot` | `bytes32` | The merkle root       |

### RoleAdminChanged {#event-roleadminchanged}

Emitted when the admin role for a role is changed.

```solidity
event RoleAdminChanged(bytes32 indexed role, bytes32 indexed previousAdminRole, bytes32 indexed newAdminRole);
```

**Parameters**

| Name                | Type      | Description                      |
| ------------------- | --------- | -------------------------------- |
| `role`              | `bytes32` | The role whose admin was changed |
| `previousAdminRole` | `bytes32` | The previous admin role          |
| `newAdminRole`      | `bytes32` | The new admin role               |

### RoleGranted {#event-rolegranted}

Emitted when a role is granted to an account.

```solidity
event RoleGranted(bytes32 indexed role, address indexed account, address indexed sender);
```

**Parameters**

| Name      | Type      | Description                        |
| --------- | --------- | ---------------------------------- |
| `role`    | `bytes32` | The role that was granted          |
| `account` | `address` | The account that received the role |
| `sender`  | `address` | The account that granted the role  |

### RoleRevoked {#event-rolerevoked}

Emitted when a role is revoked from an account.

```solidity
event RoleRevoked(bytes32 indexed role, address indexed account, address indexed sender);
```

**Parameters**

| Name      | Type      | Description                       |
| --------- | --------- | --------------------------------- |
| `role`    | `bytes32` | The role that was revoked         |
| `account` | `address` | The account that lost the role    |
| `sender`  | `address` | The account that revoked the role |

### Unpaused {#event-unpaused}

Emitted when the contract is unpaused.

```solidity
event Unpaused(address account);
```

**Parameters**

| Name      | Type      | Description                            |
| --------- | --------- | -------------------------------------- |
| `account` | `address` | The account that unpaused the contract |

### Upgraded {#event-upgraded}

Emitted when the implementation is upgraded.

```solidity
event Upgraded(address indexed implementation);
```

**Parameters**

| Name             | Type      | Description                    |
| ---------------- | --------- | ------------------------------ |
| `implementation` | `address` | The new implementation address |
