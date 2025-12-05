<script setup>
  import config from '@berachain/config/constants.json';
</script>

# WeightedPoolFactory

> <small><a target="_blank" :href="config.websites.berascan.url + 'address/' + config.contracts.bex.weightedPoolFactory.address.berachainMainnet">{{config.contracts.bex.weightedPoolFactory.address.berachainMainnet}}</a><span v-if="config.contracts.bex.weightedPoolFactory.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.bex.weightedPoolFactory.abi">ABI JSON</a></span></small>

## Functions

### create

_Deploys a new `WeightedPool`._

```solidity
function create(
    string memory name,
    string memory symbol,
    IERC20[] memory tokens,
    uint256[] memory normalizedWeights,
    IRateProvider[] memory rateProviders,
    uint256 swapFeePercentage,
    address owner,
    bytes32 salt
) external returns (address);
```

**Parameters**

| Name              | Type            | Description                                         |
| ----------------- | --------------- | --------------------------------------------------- |
| name              | string          | The name of the pool token                          |
| symbol            | string          | The symbol of the pool token                        |
| tokens            | IERC20[]        | Array of token addresses in the pool                |
| normalizedWeights | uint256[]       | Array of normalized weights for each token          |
| rateProviders     | IRateProvider[] | Array of rate provider addresses for each token     |
| swapFeePercentage | uint256         | The swap fee percentage for the pool                |
| owner             | address         | The owner address of the pool                       |
| salt              | bytes32         | Unique salt for deterministic pool address creation |

### isPoolFromFactory

_Returns true if `pool` was created by this factory._

```solidity
function isPoolFromFactory(address pool) external view returns (bool);
```

### isDisabled

_Check whether the derived factory has been disabled._

```solidity
function isDisabled() external view returns (bool);
```

### disable

_Disable the factory, preventing the creation of more pools. Already existing pools are unaffected.
Once a factory is disabled, it cannot be re-enabled._

```solidity
function disable() external;
```
