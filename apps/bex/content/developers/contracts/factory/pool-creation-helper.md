<script setup>
  import config from '@berachain/config/constants.json';
</script>

# PoolCreationHelper

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.bex.poolCreationHelper['mainnet-address']">{{config.contracts.bex.poolCreationHelper['mainnet-address']}}</a><span v-if="config.contracts.bex.poolCreationHelper.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.bex.poolCreationHelper.abi">ABI JSON</a></span></small>

Helper contract to create and join pools in a single transaction. Supports joining `WBERA` pools with `BERA`. Non-standard ERC20 tokens and double-entrypoint tokens are not supported.

> Note: This contract must be approved as a relayer by the pool creator inside the vault contract to join pools (using `setRelayerApproval`).

## Functions

### createAndJoinWeightedPool

_Creates a weighted pool and joins it in a single transaction. Allows users to create a WBERA weighted pool and join it with either WBERA or BERA._

```solidity
function createAndJoinWeightedPool(
    string memory name,
    string memory symbol,
    IERC20[] memory createPoolTokens,
    IERC20[] memory joinPoolTokens,
    uint256[] memory normalizedWeights,
    IRateProvider[] memory rateProviders,
    uint256 swapFeePercentage,
    uint256[] memory amountsIn,
    address owner,
    bytes32 salt
) external payable returns (address pool)
```

**Parameters**

| Name              | Type            | Description                                         |
| ----------------- | --------------- | --------------------------------------------------- |
| name              | string          | Name of the pool                                    |
| symbol            | string          | Symbol of the pool                                  |
| createPoolTokens  | IERC20[]        | Tokens to create the pool with                      |
| joinPoolTokens    | IERC20[]        | Tokens to join the pool with                        |
| normalizedWeights | uint256[]       | Normalized weights for the pool                     |
| rateProviders     | IRateProvider[] | Rate providers for the pool                         |
| swapFeePercentage | uint256         | Swap fee percentage for the pool                    |
| amountsIn         | uint256[]       | Amounts to join the pool with                       |
| owner             | address         | Owner of the pool                                   |
| salt              | bytes32         | Unique salt for deterministic pool address creation |

:::info Pools with BERA
Pools created with `WBERA` should use the `WBERA` token address in the `createPoolTokens` array

`joinPoolTokens` should use `address(0)` at the `WBERA` index if joining a pool with `BERA` (with `msg.value` equal to the `WBERA` amount in the `amountsIn` array)
:::

### createAndJoinStablePool

_Creates a stable pool and joins it in a single transaction. Allows users to create a WBERA stable pool and join it with either WBERA or BERA._

```solidity
function createAndJoinStablePool(
    string memory name,
    string memory symbol,
    IERC20[] memory createPoolTokens,
    uint256 amplificationParameter,
    IRateProvider[] memory rateProviders,
    uint256[] memory tokenRateCacheDurations,
    bool exemptFromYieldProtocolFeeFlag,
    uint256 swapFeePercentage,
    uint256[] memory amountsIn,
    address owner,
    bytes32 salt,
    bool joinWBERAPoolWithBERA
) external payable returns (address pool)
```

**Parameters**

| Name                           | Type            | Description                                                                                |
| ------------------------------ | --------------- | ------------------------------------------------------------------------------------------ |
| name                           | string          | Name of the pool                                                                           |
| symbol                         | string          | Symbol of the pool                                                                         |
| createPoolTokens               | IERC20[]        | Tokens to create the pool with                                                             |
| amplificationParameter         | uint256         | Amplification parameter for the pool                                                       |
| rateProviders                  | IRateProvider[] | Rate providers for the pool                                                                |
| tokenRateCacheDurations        | uint256[]       | Cache durations for the pool tokens                                                        |
| exemptFromYieldProtocolFeeFlag | bool            | If true, exempt from yield protocol fee                                                    |
| swapFeePercentage              | uint256         | Swap fee percentage for the pool                                                           |
| amountsIn                      | uint256[]       | Amounts to join the pool with                                                              |
| owner                          | address         | Owner of the pool                                                                          |
| salt                           | bytes32         | Unique salt for deterministic pool address creation                                        |
| joinWBERAPoolWithBERA          | bool            | If true, join the WBERA pool with BERA (`msg.value` corresponds to `WBERA` in `amountsIn`) |

## Events

### WeightedPoolCreated

_Emitted when a weighted pool is created._

```solidity
event WeightedPoolCreated(string name, string symbol, address indexed pool)
```

### ComposableStablePoolCreated

_Emitted when a composable stable pool is created._

```solidity
event ComposableStablePoolCreated(string name, string symbol, address indexed pool)
```
