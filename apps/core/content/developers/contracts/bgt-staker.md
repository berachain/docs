<script setup>
  import config from '@berachain/config/constants.json';
</script>

# BGTStaker

> <small><a target="_blank" :href="config.testnet.dapps.beratrail.url + 'address/' + config.contracts.bgtStaker.address">{{config.contracts.bgtStaker.address}}</a><span v-if="config.contracts.bgtStaker.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.bgtStaker.abi">ABI JSON</a></span></small>

## State Variables

### FEE_COLLECTOR

The fee collector contract that is allowed to notify rewards.

```solidity
address public FEE_COLLECTOR;
```

## Functions

### constructor

```solidity
constructor();
```

### initialize

```solidity
function initialize(
    address _bgt,
    address _feeCollector,
    address _governance,
    address _rewardToken
)
    external
    initializer;
```

### onlyBGT

```solidity
modifier onlyBGT();
```

### onlyFeeCollector

```solidity
modifier onlyFeeCollector();
```

### \_authorizeUpgrade

```solidity
function _authorizeUpgrade(address newImplementation) internal override onlyOwner;
```

### notifyRewardAmount

```solidity
function notifyRewardAmount(uint256 reward) external onlyFeeCollector;
```

### recoverERC20

```solidity
function recoverERC20(address tokenAddress, uint256 tokenAmount) external onlyOwner;
```

### setRewardsDuration

```solidity
function setRewardsDuration(uint256 _rewardsDuration) external onlyOwner;
```

### stake

```solidity
function stake(address account, uint256 amount) external onlyBGT;
```

### withdraw

```solidity
function withdraw(address account, uint256 amount) external onlyBGT;
```

### getReward

Claim the reward of the caller.

```solidity
function getReward() external returns (uint256);
```

### \_safeTransferFromStakeToken

_Override the internal function to prevent transferring BGT._

```solidity
function _safeTransferFromStakeToken(address from, uint256 amount) internal override;
```

### \_safeTransferStakeToken

_Override the internal function to prevent transferring BGT._

```solidity
function _safeTransferStakeToken(address to, uint256 amount) internal override;
```

## Events

### Recovered

Emitted when a token has been recovered.

```solidity
event Recovered(address token, uint256 amount);
```

**Parameters**

| Name     | Type      | Description                        |
| -------- | --------- | ---------------------------------- |
| `token`  | `address` | The token that has been recovered. |
| `amount` | `uint256` | The amount of token recovered.     |
