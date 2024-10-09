# ComposableStablePoolFactory

## Functions

### create

_Deploys a new `ComposableStablePool`._

```solidity
function create(
    string memory name,
    string memory symbol,
    IERC20[] memory tokens,
    uint256 amplificationParameter,
    IRateProvider[] memory rateProviders,
    uint256[] memory tokenRateCacheDurations,
    bool[] memory exemptFromYieldProtocolFeeFlags,
    uint256 swapFeePercentage,
    address owner,
    bytes32 salt
) external returns (ComposableStablePool)
```

**Parameters**

| Name                            | Type            | Description                                                             |
| ------------------------------- | --------------- | ----------------------------------------------------------------------- |
| name                            | string          | The name of the pool token                                              |
| symbol                          | string          | The symbol of the pool token                                            |
| tokens                          | IERC20[]        | Array of token addresses in the pool                                    |
| amplificationParameter          | uint256         | The amplification parameter (A factor) for the pool                     |
| rateProviders                   | IRateProvider[] | Array of rate provider addresses for each token                         |
| tokenRateCacheDurations         | uint256[]       | Array of cache durations for each token's rate                          |
| exemptFromYieldProtocolFeeFlags | bool[]          | Array of flags indicating if tokens are exempt from yield protocol fees |
| swapFeePercentage               | uint256         | The swap fee percentage for the pool                                    |
| owner                           | address         | The owner address of the pool                                           |
| salt                            | bytes32         | Unique salt for deterministic pool address creation                     |

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
