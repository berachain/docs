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
forge init
```

Next, install the required dependencies:

```bash
forge install https://github.com/berachain/contracts-monorepo
```

Install the dependencies for the Berachain's contracts:

```bash
cd lib/contracts-monorepo
npm install
cd ../
```

Add `evm_version = "cancun"` to your `foundry.toml` file.
```txt
[profile.default]
src = "src"
out = "out"
libs = ["lib"]

# Add this line
evm_version = "cancun"
```

Create a `remappings.txt` file for these imports:

```bash
@openzeppelin/contracts-upgradeable/=lib/contracts-monorepo/node_modules/@openzeppelin/contracts-upgradeable/
@openzeppelin/contracts/=lib/contracts-monorepo/node_modules/@openzeppelin/contracts/
contracts-monorepo/=lib/contracts-monorepo/
ds-test/=lib/forge-std/lib/ds-test/src/
forge-std/=lib/forge-std/src/
solady/src/=lib/contracts-monorepo/lib/solady/src/
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

import {ERC20} from "solady/src/tokens/ERC20.sol";
import {HoneyFactory} from "../lib/contracts-monorepo/src/honey/HoneyFactory.sol";
import {Honey} from "../lib/contracts-monorepo/src/honey/Honey.sol";
/// @title HoneyMinter
/// @notice A simple contract demonstrating how to interact with Berachain's Honey stablecoin
/// @dev This is for educational purposes only not for production use
contract HoneyMinter {
    HoneyFactory public immutable FACTORY;
    Honey public immutable HONEY;

    error InsufficientAllowance();
    error InsufficientBalance();
    error TransferFailed();

    constructor(address _factory, address _honey) {
        FACTORY = HoneyFactory(_factory);
        HONEY = Honey(_honey);
    }

    /// @notice Mints Honey tokens using a single collateral (non-basket mode)
    /// @param collateral The collateral token address
    /// @param amount The amount of collateral to use
    /// @return mintedAmount The amount of Honey minted
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
        ERC20(collateral).approve(address(FACTORY), amount);

        // Mint Honey - note: we expect non-basket mode (false)
        mintedAmount = FACTORY.mint(collateral, amount, msg.sender, false);
    }

    /// @notice Redeems Honey tokens for a single collateral (non-basket mode)
    /// @param collateral The collateral token to receive
    /// @param honeyAmount The amount of Honey to redeem
    /// @return redeemedAmount The amount of collateral received
    function redeemBasicMode(address collateral, uint256 honeyAmount) 
        external 
        returns (uint256[] memory redeemedAmount) 
    {
        // Check allowance
        if (HONEY.allowance(msg.sender, address(this)) < honeyAmount) {
            revert InsufficientAllowance();
        }

        // Check balance
        if (HONEY.balanceOf(msg.sender) < honeyAmount) {
            revert InsufficientBalance();
        }

        // Transfer Honey to this contract
        bool success = HONEY.transferFrom(msg.sender, address(this), honeyAmount);
        if (!success) revert TransferFailed();

        // Approve factory to spend Honey
        HONEY.approve(address(FACTORY), honeyAmount);

        // Redeem Honey - note: we expect non-basket mode (false)
        redeemedAmount = FACTORY.redeem(collateral, honeyAmount, msg.sender, false);
    }

    /// @notice Mints Honey tokens using multiple collaterals (basket mode)
    /// @param collateral The reference collateral token address
    /// @param amount The amount of reference collateral
    /// @return mintedAmount The amount of Honey minted
    function mintBasketMode(address collateral, uint256 amount) external returns (uint256 mintedAmount) {
        // First check if basket mode is enabled for minting
        require(FACTORY.isBasketModeEnabled(true), "Basket mode not enabled");

        // Get all registered assets
        uint256 numAssets = FACTORY.numRegisteredAssets();
        for(uint256 i = 0; i < numAssets; i++) {
            address asset = FACTORY.registeredAssets(i);
            
            // Check allowance for each asset
            if (ERC20(asset).allowance(msg.sender, address(this)) < amount) {
                revert InsufficientAllowance();
            }

            // Transfer asset to this contract
            bool success = ERC20(asset).transferFrom(msg.sender, address(this), amount);
            if (!success) revert TransferFailed();

            // Approve factory to spend asset
            ERC20(asset).approve(address(FACTORY), amount);
        }

        // Mint Honey - note: we expect basket mode (true)
        mintedAmount = FACTORY.mint(collateral, amount, msg.sender, true);
    }

    /// @notice Redeems Honey tokens for multiple collaterals (basket mode)
    /// @param collateral The reference collateral token address
    /// @param honeyAmount The amount of Honey to redeem
    /// @return redeemedAmounts Array of redeemed collateral amounts
    function redeemBasketMode(address collateral, uint256 honeyAmount) 
        external 
        returns (uint256[] memory redeemedAmounts) 
    {
        // First check if basket mode is enabled for redeeming
        require(FACTORY.isBasketModeEnabled(false), "Basket mode not enabled");

        // Check allowance
        if (HONEY.allowance(msg.sender, address(this)) < honeyAmount) {
            revert InsufficientAllowance();
        }

        // Check balance
        if (HONEY.balanceOf(msg.sender) < honeyAmount) {
            revert InsufficientBalance();
        }

        // Transfer Honey to this contract
        bool success = HONEY.transferFrom(msg.sender, address(this), honeyAmount);
        if (!success) revert TransferFailed();

        // Approve factory to spend Honey
        HONEY.approve(address(FACTORY), honeyAmount);

        // Redeem Honey - note: we expect basket mode (true)
        redeemedAmounts = FACTORY.redeem(collateral, honeyAmount, msg.sender, true);
    }

    /// @notice Checks if basket mode is enabled for minting or redeeming
    /// @param isMint True to check mint mode, false to check redeem mode
    /// @return True if basket mode is enabled
    function isBasketMode(bool isMint) external view returns (bool) {
        return FACTORY.isBasketModeEnabled(isMint);
    }
} 
```

## Testing the Integration

Create a test file at `test/HoneyMinterTest.t.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Test, console2} from "forge-std/Test.sol";
import {HoneyMinter} from "../src/HoneyMinter.sol";
import {HoneyFactory} from "../lib/contracts-monorepo/src/honey/HoneyFactory.sol";
import {HoneyFactoryReader} from "../lib/contracts-monorepo/src/honey/HoneyFactoryReader.sol";
import {Honey} from "../lib/contracts-monorepo/src/honey/Honey.sol";
import {ERC20} from "solady/src/tokens/ERC20.sol";

contract HoneyTutorialTest is Test {
    HoneyMinter public minter;
    HoneyFactory public factory;
    HoneyFactoryReader public factoryReader;
    Honey public honey;
    
    address public constant USDT = 0x015fd589F4f1A33ce4487E12714e1B15129c9329;
    address public constant USDC = 0x164A2dE1bc5dc56F329909F7c97Bae929CaE557B;
    address public constant HONEY = 0xd137593CDB341CcC78426c54Fb98435C60Da193c;
    address public constant HONEY_FACTORY = 0xA81F0019d442f19f66880bcf2698B4E5D5Ec249A;
    address public constant FACTORY_READER = 0x8C4A67395d60D235827F5edE446941E84d30a5B1;
    
    address public user = address(2);

    // Fork setup
    uint256 forkId;

    function setUp() public {
        // Cartio fork
        forkId = vm.createFork("https://rockbeard-eth-cartio.berachain.com");
        vm.selectFork(forkId);
        
        // Get the deployed contracts
        factory = HoneyFactory(HONEY_FACTORY);
        factoryReader = HoneyFactoryReader(FACTORY_READER);
        honey = Honey(HONEY);
        
        // Deploy our minter contract
        minter = new HoneyMinter(HONEY_FACTORY, HONEY);

        // Deal some tokens to our test user
        deal(USDT, user, 1000000 * 1e6);  // 1M USDT
        deal(USDC, user, 1000000 * 1e6);  // 1M USDC
    }

    function test_BasicModeMinting() public {
        vm.startPrank(user);
        
        // Check if we're in basket mode
        bool isBasketMode = factory.isBasketModeEnabled(true);
        console2.log("Is basket mode enabled:", isBasketMode);

        // Preview the mint amount
        uint256 mintAmount = 1000 * 1e6; // 1000 USDT
        uint256 expectedHoney = factoryReader.previewMint(USDT, mintAmount);
        console2.log("Expected Honey from mint:", expectedHoney);
        
        // Approve the minter contract to spend both USDT and USDC
        ERC20(USDT).approve(address(minter), mintAmount);
        ERC20(USDC).approve(address(minter), mintAmount);

        // Mint Honey using appropriate mode
        uint256 honeyMinted;
        if (isBasketMode) {
            honeyMinted = minter.mintBasketMode(USDT, mintAmount);
        } else {
            honeyMinted = minter.mintBasicMode(USDT, mintAmount);
        }
        
        // Verify Honey was minted
        assertGt(honeyMinted, 0, "Should have minted some Honey");
        assertEq(honey.balanceOf(user), honeyMinted, "User should have received Honey");
        
        vm.stopPrank();
    }

    function test_BasicModeRedeeming() public {
        // First mint some Honey
        test_BasicModeMinting();
        
        vm.startPrank(user);
        
        // Check if we're in basket mode
        bool isBasketMode = factory.isBasketModeEnabled(false);
        console2.log("Is basket mode enabled for redeem:", isBasketMode);

        // Get user's Honey balance
        uint256 honeyBalance = honey.balanceOf(user);
        console2.log("User's Honey balance:", honeyBalance);

        // Preview redeem amount
        uint256[] memory expectedRedeemAmounts;
        if (isBasketMode) {
            expectedRedeemAmounts = factoryReader.previewRedeemBasketMode(honeyBalance);
            console2.log("Expected USDT from redeem:", expectedRedeemAmounts[0]);
            console2.log("Expected USDC from redeem:", expectedRedeemAmounts[1]);
        } else {
            expectedRedeemAmounts = new uint256[](1);
            expectedRedeemAmounts[0] = factoryReader.previewRedeem(USDT, honeyBalance);
            console2.log("Expected USDT from redeem:", expectedRedeemAmounts[0]);
        }

        // Approve minter to spend Honey
        honey.approve(address(minter), honeyBalance);

        // Redeem Honey
        uint256[] memory redeemedAmounts;
        if (isBasketMode) {
            redeemedAmounts = minter.redeemBasketMode(USDT, honeyBalance);
        } else {
            redeemedAmounts = minter.redeemBasicMode(USDT, honeyBalance);
        }

        // Verify redemption
        assertEq(redeemedAmounts.length, 
            expectedRedeemAmounts.length, 
            "Should have received expected number of tokens");

        for (uint256 i = 0; i < redeemedAmounts.length; i++) {
            assertApproxEqRel(redeemedAmounts[i], 
                expectedRedeemAmounts[i], 
                0.01e18, 
                "Redeemed amount should match preview");
        }
        
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
