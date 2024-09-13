# Single Swap

A single swap in BEX allows users to exchange one token for another within a single liquidity pool by calling the `swap` function on the BEX Vault.

## Swap

```solidity
function swap(
    SingleSwap memory singleSwap,
    FundManagement memory funds,
    uint256 limit,
    uint256 deadline
) returns (uint256 amountCalculated)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| **singleSwap** | SingleSwap | A definition of the swap to be executed |
| **funds** | FundManagement | A definition of where funds are going to/from |
| **limit** | uint256 | The minimum amount to receive (for GIVEN_IN swaps) or the maximum amount to send (for GIVEN_OUT swaps) i.e. slippage tolerance |
| **deadline** | uint256 | The UNIX timestamp by which the swap must be completed |

**Returns**

| Name | Type | Description |
|------|------|-------------|
| amountCalculated | uint256 | The amount of tokens sent (for GIVEN_IN swaps) or received (for GIVEN_OUT swaps) |

## Structs

### SingleSwap

```solidity
struct SingleSwap {
    bytes32 poolId;
    SwapKind kind;
    IAsset assetIn;
    IAsset assetOut;
    uint256 amount;
    bytes userData;
}
```

| Field | Type | Description |
|-------|------|-------------|
| poolId | bytes32 | The id of the pool to swap with |
| kind | SwapKind | The type of swap to perform (GIVEN_IN or GIVEN_OUT) |
| assetIn | IAsset | The address of the token to swap into the pool |
| assetOut | IAsset | The address of the token to receive in return |
| amount | uint256 | The amount of tokens being sent (for GIVEN_IN) or received (for GIVEN_OUT) |
| userData | bytes | Any additional data required by the pool for the swap |

### FundManagement

```solidity
struct FundManagement {
    address sender;
    bool fromInternalBalance;
    address payable recipient;
    bool toInternalBalance;
}
```

| Field | Type | Description |
|-------|------|-------------|
| sender | address | The address from which tokens will be taken to perform the swap |
| fromInternalBalance | bool | Whether to use tokens stored in the Vault |
| recipient | address payable | The address to which tokens will be sent after the swap |
| toInternalBalance | bool | Whether to store tokens in the recipient's internal balance |

## Example

Here's a small example of how to call the swap function in Solidity:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "balancer-v2-monorepo/pkg/interfaces/contracts/vault/IVault.sol";
import "balancer-v2-monorepo/pkg/interfaces/contracts/solidity-utils/openzeppelin/IERC20.sol";

contract BalancerExampleTest is Test {
    IVault public vault;
    address public user;

    address constant VAULT_ADDRESS = 0xBA12222222228d8Ba445958a75a0704d566BF2C8;
    address constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    address constant USDC = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;
    bytes32 constant WETH_USDC_POOL_ID = 0x96646936b91d6b9d7d0c47c496afbf3d6ec7b6f8000200000000000000000019;

    function setUp() public {
        vm.createSelectFork("rpc-url");

        vault = IVault(VAULT_ADDRESS);

        user = makeAddr("user");

        deal(WETH, user, 1 ether);

        vm.startPrank(user);
        IERC20(WETH).approve(VAULT_ADDRESS, type(uint256).max);
        vm.stopPrank();
    }

    function testDirectSwap() public {
        uint256 amountIn = 1 ether;
        uint256 minAmountOut = 1000 * 1e6; // 1000 USDC

        uint256 balanceBefore = IERC20(USDC).balanceOf(user);

        IVault.SingleSwap memory singleSwap = IVault.SingleSwap({
            poolId: WETH_USDC_POOL_ID,
            kind: IVault.SwapKind.GIVEN_IN,
            assetIn: IAsset(WETH),
            assetOut: IAsset(USDC),
            amount: amountIn,
            userData: ""
        });

        IVault.FundManagement memory funds = IVault.FundManagement({
            sender: user,
            fromInternalBalance: false,
            recipient: payable(user),
            toInternalBalance: false
        });

        vm.startPrank(user);
        vault.swap(singleSwap, funds, minAmountOut, block.timestamp);
        vm.stopPrank();

        uint256 balanceAfter = IERC20(USDC).balanceOf(user);
        uint256 amountReceived = balanceAfter - balanceBefore;

        assertGe(amountReceived, minAmountOut, "Received less than minimum amount");
        console.log("USDC received:", amountReceived);
    }
}
```