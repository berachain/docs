---
head:
  - - meta
    - property: og:title
      content: Minting and Redeeming Honey
  - - meta
    - name: description
      content: Learn How to Mint and Redeem Honey Stablecoin on Berachain
  - - meta
    - property: og:description
      content: Learn How to Mint and Redeem Honey Stablecoin on Berachain
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Minting and Redeeming Honey

> See the full [GitHub Project Code Repository](https://github.com/blackbera/honey-guide).

This developer guide will walk you through how to interact with Berachain's HoneySwap for minting and redemption Honey, Berachain's native stablecoin. You'll learn how to set up a test environment, implement the necessary contracts, and handle both basic and basket modes for minting and redeeming Honey.

## Requirements

Before beginning, make sure you have the following installed or setup on your computer:

- [Foundry](https://book.getfoundry.sh/getting-started/installation)

## Project Setup

Let's start by creating the project folder and initializing it with Foundry:

```bash
mkdir honey-minter
cd honey-minter
forge init --no-commit
```

Next, install the required dependencies:

```bash
forge install https://github.com/berachain/contracts-monorepo
```

Create a `remappings.txt` file for imports:

```bash
@berachain/=lib/contracts-monorepo/
honey/=lib/contracts-monorepo/src/honey/
```

## Understanding Honey Modes

Honey supports two minting/redemption modes:

### Basic Mode
- Default mode when at least one collateral asset is pegged and whitelisted
- 1:1 minting/redemption ratio (minus fees)

### Basket Mode
For **Minting**:
- Activates when ALL collateral assets are either:
  - Depegged OR
  - Marked as bad collateral by the Factory Manager
- Requires providing proportional amounts of all collateral assets

For **Redeeming**:
- Activates when AT LEAST ONE asset is depegged
- Exception: Depegged assets that are bad collateral AND fully liquidated are ignored
- Forces redemption of proportional shares of ALL collateral assets

## Implementing the Minter Contract

Create a new file at `src/HoneyMinter.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {HoneyFactory} from "@berachain/src/honey/HoneyFactory.sol";
import {Honey} from "@berachain/src/honey/Honey.sol";
import {ERC20} from "@berachain/lib/solady/src/tokens/ERC20.sol";

/// @title HoneyMinter
/// @notice A simple contract for minting and redeeming Honey stablecoin
/// @dev This contract acts as a wrapper around HoneyFactory to simplify minting and redemption
contract HoneyMinter {
    /// @notice The HoneyFactory contract used for minting and redeeming
    HoneyFactory public immutable factory;
    /// @notice The Honey token contract
    Honey public immutable honey;

    /// @notice Thrown when a token allowance is insufficient for the operation
    error InsufficientAllowance();
    /// @notice Thrown when a token balance is insufficient for the operation
    error InsufficientBalance();
    /// @notice Thrown when a token transfer fails
    error TransferFailed();

    /// @notice Initializes the contract with factory and honey token addresses
    /// @param _factory The address of the HoneyFactory contract
    /// @param _honey The address of the Honey token contract
    constructor(address _factory, address _honey) {
        factory = HoneyFactory(_factory);
        honey = Honey(_honey);
    }

    /// @notice Mints Honey tokens using a single collateral in basic mode
    /// @dev This function will revert if basket mode is enabled in the factory
    /// @param collateral The address of the collateral token to use (e.g., USDT, USDC)
    /// @param amount The amount of collateral tokens to provide
    /// @return mintedAmount The amount of Honey tokens minted
    function mintBasicMode(address collateral, uint256 amount) external returns (uint256 mintedAmount) {
        // Check allowance
        if (ERC20(collateral).allowance(msg.sender, address(this)) < amount) {
            revert InsufficientAllowance();
        }
        
        // Check balance
        if (ERC20(collateral).balanceOf(msg.sender) < amount) {
            revert InsufficientBalance();
        }

        // Transfer collateral to this contract
        bool success = ERC20(collateral).transferFrom(msg.sender, address(this), amount);
        if (!success) revert TransferFailed();

        // Approve factory to spend collateral
        ERC20(collateral).approve(address(factory), amount);

        // Mint Honey - note: we expect non-basket mode (false)
        mintedAmount = factory.mint(collateral, amount, msg.sender, false);
    }

    /// @notice Redeems Honey tokens for a single collateral in basic mode
    /// @dev This function will revert if basket mode is enabled in the factory
    /// @param collateral The address of the collateral token to receive (e.g., USDT, USDC)
    /// @param honeyAmount The amount of Honey tokens to redeem
    /// @return redeemedAmount An array containing the amount of collateral tokens received
    function redeemBasicMode(address collateral, uint256 honeyAmount) external returns (uint256[] memory redeemedAmount) {
        // Check allowance
        if (honey.allowance(msg.sender, address(this)) < honeyAmount) {
            revert InsufficientAllowance();
        }

        // Check balance
        if (honey.balanceOf(msg.sender) < honeyAmount) {
            revert InsufficientBalance();
        }

        // Transfer Honey to this contract
        bool success = honey.transferFrom(msg.sender, address(this), honeyAmount);
        if (!success) revert TransferFailed();

        // Approve factory to spend Honey
        honey.approve(address(factory), honeyAmount);

        // Redeem Honey - note: we expect non-basket mode (false)
        redeemedAmount = factory.redeem(collateral, honeyAmount, msg.sender, false);
    }
}
```

## Testing the Integration

Create a test file at `test/HoneyMinter.t.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Test, console2} from "forge-std/Test.sol";
import {HoneyMinter} from "../src/HoneyMinter.sol";
import {HoneyFactory} from "@berachain/src/honey/HoneyFactory.sol";
import {HoneyFactoryReader} from "@berachain/src/honey/HoneyFactoryReader.sol";
import {Honey} from "@berachain/src/honey/Honey.sol";
import {ERC20} from "@berachain/lib/solady/src/tokens/ERC20.sol";

contract HoneyMinterTest is Test {
    HoneyMinter public minter;
    HoneyFactory public factory;
    HoneyFactoryReader public factoryReader;
    Honey public honey;
    
    address public constant USDT = 0x015fd589F4f1A33ce4487E12714e1B15129c9329;
    address public constant USDC = 0x164A2dE1bc5dc56F329909F7c97Bae929CaE557B;
    address public constant HONEY = 0xd137593CDB341CcC78426c54Fb98435C60Da193c;
    address public constant HONEY_FACTORY = 0xA81F0019d442f19f66880bcf2698B4E5D5Ec249A;
    
    address public user = address(2);

    function setUp() public {
        // Fork Cartio testnet
        vm.createSelectFork("https://rockbeard-eth-cartio.berachain.com");
        
        // Get deployed contracts
        factory = HoneyFactory(HONEY_FACTORY);
        honey = Honey(HONEY);
        
        // Deploy minter contract
        minter = new HoneyMinter(HONEY_FACTORY, HONEY);

        // Deal test tokens
        deal(USDT, user, 1000000 * 1e6);
        deal(USDC, user, 1000000 * 1e6);
    }

    function test_BasicModeMinting() public {
        vm.startPrank(user);
        
        // Check if basket mode is enabled
        bool isBasketMode = factory.isBasketModeEnabled(true);
        console2.log("Basket mode enabled:", isBasketMode);
        
        // Preview mint amount
        uint256 mintAmount = 1000 * 1e6;
        uint256 expectedHoney = factoryReader.previewMint(USDT, mintAmount);
        console2.log("Expected Honey:", expectedHoney);
        
        // Approve and mint
        ERC20(USDT).approve(address(minter), mintAmount);
        uint256 honeyMinted = minter.mintBasicMode(USDT, mintAmount);
        
        assertGt(honeyMinted, 0);
        assertEq(honeyMinted, expectedHoney);
        vm.stopPrank();
    }

    function test_BasicModeRedeeming() public {
        // First mint some Honey
        test_BasicModeMinting();
        
        vm.startPrank(user);
        
        // Check if basket mode is enabled
        bool isBasketMode = factory.isBasketModeEnabled(false);
        console2.log("Basket mode enabled for redeem:", isBasketMode);

        // Get user's Honey balance
        uint256 honeyBalance = honey.balanceOf(user);
        console2.log("User's Honey balance:", honeyBalance);

        // Preview redeem amount
        uint256[] memory expectedAmounts = factoryReader.previewRedeem(USDT, honeyBalance);
        console2.log("Expected USDT from redeem:", expectedAmounts[0]);

        // Approve and redeem
        honey.approve(address(minter), honeyBalance);
        uint256[] memory redeemedAmounts = minter.redeemBasicMode(USDT, honeyBalance);

        assertEq(redeemedAmounts.length, expectedAmounts.length, "Should have received expected number of tokens");
        assertApproxEqRel(redeemedAmounts[0], expectedAmounts[0], 0.01e18, "Redeemed amount should match preview");
        
        vm.stopPrank();
    }
}
```

Run the tests:

```bash
forge test -vvv
```

## Full Code Repository

The full github code repository can be found in the [guides section](https://github.com/berachain/guides/) under [Honey Minter](https://github.com/berachain/guides/tree/main/apps/honey-minter).
