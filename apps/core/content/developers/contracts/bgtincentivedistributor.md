<script setup>
  import config from '@berachain/config/constants.json';
</script>

# BGTIncentiveDistributor

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.pol.bgtIncentiveDistributor['mainnet-address']">{{config.contracts.pol.bgtIncentiveDistributor['mainnet-address']}}</a><span v-if="config.contracts.pol.bgtIncentiveDistributor.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.pol.bgtIncentiveDistributor.abi">ABI JSON</a></span></small>
>
> forked from Hidden Hand RewardDistributor Contract:
> https://github.com/dinero-protocol/hidden-hand-contracts/blob/master/contracts/RewardDistributor.sol

_This contract is used to distribute the POL incentives to the BGT boosters.
BGT boosters share of incentive from the rewardVault is transferred to the BGTIncentiveDistributor contract.
The rewards are then distributed to the BGT boosters based on the merkle root computed off-chain._

## State Variables

### MAX_REWARD_CLAIM_DELAY

maximum value of delay to claim the rewards after an update of rewards metadata.

```solidity
uint64 public constant MAX_REWARD_CLAIM_DELAY = 3 hours;
```

### PAUSER_ROLE

```solidity
bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
```

### MANAGER_ROLE

```solidity
bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");
```

### rewardClaimDelay

delay after which rewards can be claimed after an update of rewards metadata.

```solidity
uint64 public rewardClaimDelay;
```

### rewards

Maps each of the identifiers to its reward metadata.

```solidity
mapping(bytes32 => Reward) public rewards;
```

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

## Functions

### constructor

**Note:**
oz-upgrades-unsafe-allow: constructor

```solidity
constructor();
```

### initialize

```solidity
function initialize(address _governance) external initializer;
```

### \_authorizeUpgrade

```solidity
function _authorizeUpgrade(address newImplementation) internal override onlyRole(DEFAULT_ADMIN_ROLE);
```

### setRewardClaimDelay

Set the reward claim delay

_Only address with DEFAULT_ADMIN_ROLE can call this function_

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

```solidity
function updateRewardsMetadata(Distribution[] calldata _distributions) external onlyRole(MANAGER_ROLE);
```

**Parameters**

| Name             | Type             | Description                            |
| ---------------- | ---------------- | -------------------------------------- |
| `_distributions` | `Distribution[]` | Distribution[] List of reward metadata |

### setPauseState

Set the contract's pause state.

_Only address with PAUSER_ROLE can call this function_

```solidity
function setPauseState(bool state) external onlyRole(PAUSER_ROLE);
```

**Parameters**

| Name    | Type   | Description |
| ------- | ------ | ----------- |
| `state` | `bool` | Pause state |

### receiveIncentive

Receive incentive tokens from POL reward vaults

_Token approval must be given by the caller to this function before calling it._

```solidity
function receiveIncentive(bytes calldata pubkey, address token, uint256 _amount) external;
```

**Parameters**

| Name      | Type      | Description                        |
| --------- | --------- | ---------------------------------- |
| `pubkey`  | `bytes`   | The pubkey of the validator        |
| `token`   | `address` | The address of the incentive token |
| `_amount` | `uint256` | The amount of tokens received      |

### claim

Claim rewards based on the specified metadata

```solidity
function claim(Claim[] calldata _claims) external nonReentrant whenNotPaused;
```

**Parameters**

| Name      | Type      | Description                    |
| --------- | --------- | ------------------------------ |
| `_claims` | `Claim[]` | Claim[] List of claim metadata |

### \_claim

_Claim a reward_

```solidity
function _claim(bytes32 _identifier, address _account, uint256 _amount, bytes32[] calldata _merkleProof) private;
```

**Parameters**

| Name           | Type        | Description           |
| -------------- | ----------- | --------------------- |
| `_identifier`  | `bytes32`   | Merkle identifier     |
| `_account`     | `address`   | Eligible user account |
| `_amount`      | `uint256`   | Reward amount         |
| `_merkleProof` | `bytes32[]` | Merkle proof          |

### \_setRewardClaimDelay

Set the reward claim delay

_Reverts if the delay is greater than the maximum allowed delay_

```solidity
function _setRewardClaimDelay(uint64 _delay) internal;
```

**Parameters**

| Name     | Type     | Description          |
| -------- | -------- | -------------------- |
| `_delay` | `uint64` | The delay in seconds |
