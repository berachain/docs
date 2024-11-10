---
head:
  - - meta
    - property: og:title
      content: Create ERC-20 Contract Using Foundry
  - - meta
    - name: description
      content: Learn How to Build an ERC-20 Smart Contract Using Foundry
  - - meta
    - property: og:description
      content: Learn How to Build an ERC-20 Smart Contract Using Foundry
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Create ERC-20 Contract Using Foundry

> See the full [GitHub Project Code Repository](https://github.com/berachain/guides/tree/main/apps/foundry-erc20).

This developer guide will walk you through setting up a new Solidity contract, configuring the Berachain network details, deploying to Berachain, and verifying the contract, all with [Foundry](https://getfoundry.sh).

## Requirements

Before beginning, make sure you have the following installed or setup on your computer before hand.

- [Foundry](https://book.getfoundry.sh/getting-started/installation)

## Creating ERC20 Project Code Setup

Let's start by creating the project folder for the entire code.

```bash
mkdir create-erc20-contract-using-foundry;
cd create-erc20-contract-using-foundry;
```

Next, start by creating the initial template project defined by Foundry by running the following command:

```bash
# FROM: ./create-erc20-contract-using-foundry

forge init; # forge init --force; # if there is already an existing .git repository associated

# [Expected Output]:
# ...
# Resolving deltas: 100% (129/129), done.
#     Installed forge-std v1.7.1
#     Initialized forge project
```

If templated correctly, we should see the following structure:

```bash
# FROM: ./create-erc20-contract-using-foundry
.
├── README.md
├── foundry.toml
├── lib
│   └── forge-std
├── script
│   └── Counter.s.sol
├── src
│   └── Counter.sol
└── test
    └── Counter.t.sol
```

Now that all the code has been setup, install the dependencies needed for an ERC20 contract from [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts), by running the following:

```bash
# FROM: ./create-erc20-contract-using-foundry

forge install OpenZeppelin/openzeppelin-contracts;
# If existing git setup run:
# forge install OpenZeppelin/openzeppelin-contracts --no-commit;

# [Expected Output]:
# ...
# Resolving deltas: 100% (129/129), done.
#     Installed openzeppelin-contracts v5.0.0
```

## Creating the ERC20 Contract

To create our contract, convert the existing `src/Counter.sol` to a new `BingBongToken.sol` and replace the code with the following Solidity code:

```bash
# FROM: ./create-erc20-contract-using-foundry

mv src/Counter.sol src/BingBongToken.sol;
```

**File:** `./src/BingBongToken.sol`

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BingBongToken is ERC20 {
    /**
     * @dev Init constructor for setting token name and symbol
     */
    constructor(string memory name_, string memory symbol_, uint256 mintedTokens_) ERC20(name_, symbol_) {
        _mint(msg.sender, mintedTokens_);
    }
}
```

Confirm that this compile correctly by running the following:

```bash
# FROM: ./create-erc20-contract-using-foundry

forge compile;

# [Expected Error Output]:
# [⠊] Compiling...
# [⠒] Unable to resolve imports:
#       "../src/Counter.sol" in "/path/to/create-erc20-contract-using-foundry/test/Counter.t.sol"
#  ...
```

This error happens because it references a file that no longer exists.
To fix this, we'll rename it to `BingBongToken.t.sol` and replace it some placeholder code.

```bash
# FROM: ./create-erc20-contract-using-foundry

mv test/Counter.t.sol test/BingBongToken.t.sol;
```

**File:** `./test/BingBongToken.t.sol`

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {BingBongToken} from "../src/BingBongToken.sol";

contract BingBongTokenTest is Test {

}
```

Now when running `forge compile` the following results should show up:

```bash
# FROM: ./create-erc20-contract-using-foundry

forge compile;

# [Expected Output]:
# [⠢] Compiling...
# [⠰] Compiling 27 files with 0.8.21
# [⠃] Solc 0.8.21 finished in 6.25s
# Compiler run successful!
```

## Testing the ERC20 Contract

With our newly renamed `BingBongToken.t.sol` file, add the following tests that cover a wide range of ERC20 tests.

Feel free to look at each individual test to get a better idea on how reverts and successful scenarios are handled.

**File:** `./test/BingBongToken.t.sol`

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2, stdError} from "forge-std/Test.sol";
import {BingBongToken} from "../src/BingBongToken.sol";

contract BingBongTokenTest is Test {
    // Variables
    BingBongToken public token;
    address supplyOwnerAddress = makeAddr("BerachainWalletUser"); // 0xE3284cB941608AA9E65F7EDdbb50c461D936622f
    address randomWalletAddress = makeAddr("GiveMeTokens"); // 0x187A660c372Fa04D09C1A71f2927911e62e98a89
    address anotherWalletAddress = makeAddr("AnotherAddress"); // 0x0F3B9cC98eef350B12D5b7a338D8B76c2F9a92CC
    error ERC20InvalidReceiver(address receiver);

    // Initial Read Tests
    // ========================================================
    /**
     * @dev Initial contract setup
     */
    function setUp() public {
        vm.prank(supplyOwnerAddress);
        token = new BingBongToken("BingBong Token", "BBT", 10000);
    }

    /**
     * @dev Test initiatted token name
     */
    function test_name() public {
        assertEq(token.name(), "BingBong Token");
    }

    /**
     * @dev Test initiatted token symbol
     */
    function test_symbol() public {
        assertEq(token.symbol(), "BBT");
    }

    /**
     * @dev Test default decimals
     */
    function test_decimals() public {
        assertEq(token.decimals(), 18);
    }

    /**
     * @dev Test initial total token supply
     */
    function test_totalSupply() public {
        assertEq(token.totalSupply(), 10000);
    }

    /**
     * @dev Test initial random account balance
     */
    function test_balanceOfAddress0() public {
        assertEq(token.balanceOf(address(0)), 0);
    }

    /**
     * @dev Test account balance of original deployer
     */
    function test_balanceOfAddressSupplyOwner() public {
        assertEq(token.balanceOf(supplyOwnerAddress), 10000);
    }

    /**
     * @dev Test Revert transfer to sender as 0x0
     */
    function test_transferRevertInvalidSender() public {
        vm.prank(address(0));
        vm.expectRevert(abi.encodeWithSignature("ERC20InvalidSender(address)", address(0)));
        token.transfer(randomWalletAddress, 100);
    }

    /**
     * @dev Test Revert transfer to receiver as 0x0
     */
    function test_transferRevertInvalidReceiver() public {
        vm.prank(supplyOwnerAddress);
        vm.expectRevert(abi.encodeWithSignature("ERC20InvalidReceiver(address)", address(0)));
        token.transfer(address(0), 100);
    }

    /**
     * @dev Test Revert transfer to sender with insufficient balance
     */
    function test_transferRevertInsufficientBalance() public {
        vm.prank(randomWalletAddress);
        // NOTE: Make sure to keep this string for `encodeWithSignature` free of spaces for the string (" ")
        vm.expectRevert(abi.encodeWithSignature("ERC20InsufficientBalance(address,uint256,uint256)", randomWalletAddress, 0, 100));
        token.transfer(supplyOwnerAddress, 100);
    }

    /**
     * @dev Test transfer to receiver from sender with sufficient balance
     */
    function test_transfer() public {
        vm.prank(supplyOwnerAddress);
        assertEq(token.transfer(randomWalletAddress, 100), true);
        assertEq(token.balanceOf(randomWalletAddress), 100);
        assertEq(token.balanceOf(supplyOwnerAddress), 10000 - 100);
    }

    /**
     * @dev Test allowance of random address for supplyOwner
     */
    function test_allowance() public {
        assertEq(token.allowance(supplyOwnerAddress, randomWalletAddress), 0);
    }

    /**
     * @dev Test Revert approve of owner as 0x0
     */
    function test_approveRevertInvalidApprover() public {
        vm.prank(address(0));
        vm.expectRevert(abi.encodeWithSignature("ERC20InvalidApprover(address)", address(0)));
        token.approve(randomWalletAddress, 100);
    }

    /**
     * @dev Test Revert approve of spender as 0x0
     */
    function test_approveRevertInvalidSpender() public {
        vm.prank(supplyOwnerAddress);
        vm.expectRevert(abi.encodeWithSignature("ERC20InvalidSpender(address)", address(0)));
        token.approve(address(0), 100);
    }

    /**
     * @dev Test approve of spender for 0 and 50
     */
    function test_approve() public {
        vm.prank(supplyOwnerAddress);
        assertEq(token.approve(randomWalletAddress, 0), true);
        assertEq(token.approve(randomWalletAddress, 50), true);
    }

    /**
     * @dev Test Revert transferFrom of spender with 0 approveed
     */
    function test_transferFromRevertInsufficientAllowanceFor0x0() public {
        vm.prank(supplyOwnerAddress);
        vm.expectRevert(abi.encodeWithSignature("ERC20InsufficientAllowance(address,uint256,uint256)", supplyOwnerAddress, 0, 100));
        token.transferFrom(randomWalletAddress, address(0), 100);
    }

    /**
     * @dev Test Revert transferFrom of spender transferring to 0x0
     */
    function test_transferFromRevertInvalidReceiver() public {
        // Setup
        vm.prank(supplyOwnerAddress);
        token.approve(randomWalletAddress, 30);

        // Test
        vm.prank(randomWalletAddress);
        vm.expectRevert(abi.encodeWithSignature("ERC20InvalidReceiver(address)", address(0)));
        token.transferFrom(supplyOwnerAddress, address(0), 30);
    }

    /**
     * @dev Test Revert transferFrom of spender transferring 50/30 approved
     */
    function test_transferFromRevertInsufficientAllowance() public {
        // Setup
        vm.prank(supplyOwnerAddress);
        token.approve(randomWalletAddress, 30);

        // Test
        vm.prank(randomWalletAddress);
        vm.expectRevert(abi.encodeWithSignature("ERC20InsufficientAllowance(address,uint256,uint256)", randomWalletAddress, 30, 50));
        token.transferFrom(supplyOwnerAddress, anotherWalletAddress, 50);
    }

    /**
     * @dev Test transferFrom of spender 10/30 approved
     */
    function test_transferFrom() public {
        // Setup
        vm.prank(supplyOwnerAddress);
        token.approve(randomWalletAddress, 30);

        // Test
        vm.prank(randomWalletAddress);
        assertEq(token.transferFrom(supplyOwnerAddress, anotherWalletAddress, 10), true);
        assertEq(token.balanceOf(anotherWalletAddress), 10);
        assertEq(token.balanceOf(supplyOwnerAddress), 10000 - 10);
        assertEq(token.allowance(supplyOwnerAddress, randomWalletAddress), 30 - 10);
    }
}
```

Compile the code and then run a test to see the different tests pass.

```bash
# FROM: ./create-erc20-contract-using-foundry

forge test -vvv; # v stands for verbose and multiple vvv allow for more details for tests

# [Expected Output]:
# [⠰] Compiling...
# No files changed, compilation skipped
#
# Running 18 tests for test/BingBongToken.t.sol:BingBongTokenTest
# [PASS] test_allowance() (gas: 12341)
# [PASS] test_approve() (gas: 42814)
# [PASS] test_approveRevertInvalidApprover() (gas: 11685)
# [PASS] test_approveRevertInvalidSpender() (gas: 11737)
# [PASS] test_balanceOfAddress0() (gas: 7810)
# [PASS] test_balanceOfAddressSupplyOwner() (gas: 9893)
# [PASS] test_decimals() (gas: 5481)
# [PASS] test_name() (gas: 9541)
# [PASS] test_symbol() (gas: 9650)
# [PASS] test_totalSupply() (gas: 7546)
# [PASS] test_transfer() (gas: 44880)
# [PASS] test_transferFrom() (gas: 75384)
# [PASS] test_transferFromRevertInsufficientAllowance() (gas: 42626)
# [PASS] test_transferFromRevertInsufficientAllowanceFor0x0() (gas: 16597)
# [PASS] test_transferFromRevertInvalidReceiver() (gas: 28334)
# [PASS] test_transferRevertInsufficientBalance() (gas: 16477)
# [PASS] test_transferRevertInvalidReceiver() (gas: 11796)
# [PASS] test_transferRevertInvalidSender() (gas: 11746)
# Test result: ok. 18 passed; 0 failed; 0 skipped; finished in 2.07ms
#
# Ran 1 test suites: 18 tests passed, 0 failed, 0 skipped (18 total tests)
```

## Configuring Foundry for Berachain Contract Deployment

Now that the code and tests have all been defined, the next step is to create the deployment script needed to deploy the `BingBongToken.sol` file. To accomplish this, simply repurpose the script file `Course.s.sol` file as our new `BingBongToken.s.sol`.

```bash
# FROM: ./create-erc20-contract-using-foundry

mv script/Counter.s.sol script/BingBongToken.s.sol;
```

Next, replace the existing code the following to handle importing the wallet's private key, and deploying the contract.

**File:** `./script/BingBongToken.s.sol`

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import "../src/BingBongToken.sol";

contract BingBongTokenScript is Script {
    /**
     * @dev Relevant source part starts here and spans across multiple lines
     */
    function setUp() public {
    }

    /**
     * @dev Main deployment script
     */
    function run() public {
        // Setup
        uint256 deployerPrivateKey = vm.envUint("WALLET_PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Deploy
        BingBongToken bbt = new BingBongToken("BingBongToken", "BBT", 5678);

        // Verify + End
        console2.log(bbt.totalSupply());
        vm.stopBroadcast();
    }
}
```

To verify that the contract can actually be deployed, test it with a local node by running `anvil`.
Take note of the private key.

**Terminal 1:**

```bash
# FROM: ./create-erc20-contract-using-foundry

anvil;

# [Expected Output]:
#
#
#                              _   _
#                             (_) | |
#       __ _   _ __   __   __  _  | |
#      / _` | | '_ \  \ \ / / | | | |
#     | (_| | | | | |  \ V /  | | | |
#      \__,_| |_| |_|   \_/   |_| |_|
#
#     0.2.0 (f5b9c02 2023-10-28T00:16:04.060987000Z)
#     https://github.com/foundry-rs/foundry
#
# Available Accounts
# ==================
#
# (0) "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" (10000.000000000000000000 ETH)
# ...
#
# Private Keys
# ==================
#
# (0) 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 // [!code hl]
# ...
```

With the provided private key, replace the `WALLET_PRIVATE_KEY` in `.env` file.

**File:** `./.env`

```bash
WALLET_PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

**Terminal 2:**

In other terminal window, run the following command to deploy the contract to the local node rpc.

```bash
# FROM ./create-erc20-contract-using-foundry

forge script script/BingBongToken.s.sol --fork-url http://localhost:8545 --broadcast;

# [Expected Output]:
# Compiler run successful!
# Script ran successfully.
#
# == Logs ==
#   5678
# ...
# ✅  [Success]Hash: 0xc2b647051d11d8dbd88d131ff268ada417caa27e423747497b624cc3e9c75db8
# Contract Address: 0x5FbDB2315678afecb367f032d93F642f64180aa3
# Block: 1
# ...
```

Success! Make sure to stop the `anvil` service in **Terminal 1** by using `ctrl + c`.

## Deploying ERC20 Contract

> <b>NOTE:</b> For this step, make sure to have a wallet that contains `BERA` tokens to pay for the transaction and make sure to change the `WALLET_PRIVATE_KEY` the `.env` file.

With a local node configure, the deployment to Berachain Testnet should be the same process, but with a specified RPC URL endpoint.

```bash-vue
# FROM ./create-erc20-contract-using-foundry

forge script script/BingBongToken.s.sol --rpc-url {{config.testnet.rpcUrl}} --broadcast;

# [Expected Output]:
# Compiler run successful!
# Script ran successfully.
#
# == Logs ==
#   5678
# ...
# ✅  [Success]Hash: 0x69aeb8ee5084c44cce00cae2fda3563bd10efb9c8c663ec7b6a6929d6d48a50e
# Contract Address: 0x01870EC5C7656723b31a884259537B183FE15Fa7
# Block: 68764
# ...
```

## Verifying ERC20 Contract

> <b>NOTE:</b> Currently with forge `v0.2.0` there are some issues with verifying contracts that are preventing contract verification.
> As soon as these are up and running, the following command should help with verifying the contract:

```bash-vue
# FROM ./create-erc20-contract-using-foundry

forge verify-contract 0xYOUR_DEPLOYED_CONTRACT_ADDRESS BingBongToken \
    --etherscan-api-key={{config.testnet.dapps.beratrail.apiKey}} \
    --watch \
    --constructor-args $(cast abi-encode "constructor(string,string,uint256)" "BingBongToken" "BBT" 5678) \
    --retries=2 \
    --verifier-url={{config.testnet.dapps.beratrail.apiUrl}};
```

## Full Code Repository

The full github code repository can be found in the [guides section](https://github.com/berachain/guides/) of this repository under [Create ERC20 Contract Using Foundry](https://github.com/berachain/guides/tree/main/apps/foundry-erc20).
