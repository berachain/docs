---
head:
  - - meta
    - property: og:title
      content: Build a Smart Contract On Berachain
  - - meta
    - name: description
      content: Learn How to Build a Smart Contract on Berachain
  - - meta
    - property: og:description
      content: Learn How to Build a Smart Contract on Berachain
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Build a Smart Contract

The [ERC-20 token standard](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) provides a common interface for tokens on Berachain. ERC-20s follow a standard interface such that other applications can easily interact with them on-chain, but can be extended to do much, much more. They power everything from simple value transfers to complex DeFi interactions.

In this guide, we'll walk through how to create an ERC-20 token using Solidity and deploy it to the Berachain Testnet.

## Pre-requisites

Before you start, make sure you have the following:

- [Foundry](https://github.com/foundry-rs/foundry)
- A code editor of your choice

## Initialize Repository

First, we'll create a new project using Forge's `init` command:

```bash
forge init my_token;
```

This will create a new directory called `my_token` with a basic forge project structure and example contracts. If using VS Code as your text editor, you can add the `--vscode` flag like so to initialize some extra defaults.

```bash
forge init my_token --vscode;
```

Now you can `cd` into the directory so you're ready to run commands later:

```bash
cd my_token;
```

Feel free to delete the generated files:

- `src/Counter.sol`
- `test/Counter.t.sol`
- `script/Counter.s.sol`

```bash
# FROM: ./my_token

rm src/Counter.sol test/Counter.t.sol script/Counter.s.sol;
```

They serve as a good example of how to write contracts and tests in Forge Foundry's format, but we won't need them for this guide.

## Install Dependencies

### OpenZeppelin ERC-20

OpenZeppelin provides commonly used interfaces & implementations of various ERC standards, including ERC-20. We'll use their ERC-20 implementation to create our token as these are audited and battle-tested. It also makes it much easier to get up and running quickly without reinventing the wheel.

**Foundry**

If using Foundry, install the OpenZeppelin library using the following command:

```bash
# FROM: ./my_token

forge install openzeppelin/openzeppelin-contracts --no-commit;
```

This pulls the `OpenZeppelin` library, stages the .gitmodules file in git and makes a commit with the message "Installed openzeppelin-contracts".

In order to use the library, edit `remappings.txt` file at the root of your project.

Edit it to include the following line:

**File:** `./remappings.txt`

```txt
ds-test/=lib/forge-std/lib/ds-test/src/
forge-std/=lib/forge-std/src/
@openzeppelin/=lib/openzeppelin-contracts/ // [!code++]
```

This tells Foundry where to find the `@openzeppelin` library when compiling your contracts.

## Create the Token Contract

Now we can start creating our token contract. We'll create a new file called `MyToken.sol` inside the `src/` folder and import the OpenZeppelin ERC-20 contract.

```bash
# FROM: ./my_token

touch src/MyToken.sol;
```

**File:** `./src/MyToken.sol`

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

This imports the `ERC20` contract from the OpenZeppelin library, which includes basic implementations of all of the functions in the ERC-20 standard. We'll use this as the base for our token contract.

Next, we'll create the actual contract which extends the ERC-20 contract we imported.
With this token we will:

- Set the name to "MyToken"
- Set the symbol to "MT"
- Set the initial supply to 1,000,000 tokens

**File:** `./src/MyToken.sol`

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol"; // [!code --]
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol"; // [!code ++:9]

contract MyToken is ERC20 {
    uint256 public constant INITIAL_SUPPLY = 1_000_000 * 1 ether;

    constructor() ERC20("MyToken", "MT"){
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}
```

:::tip
The `1 ether` is an easy way to make a unit conversion. The default `decimals` for the ERC-20 token standard is 18, so this will mint 1 million tokens with 18 decimal places. To learn more, check out [this article on decimals](https://docs.openzeppelin.com/contracts/3.x/erc20#a-note-on-decimals).
:::

Technically, this is all you need to create your own token contract! If satisfied, you could take this contract and deploy it. It would then mint 1 million tokens to your wallet that deployed the contract (`msg.sender`). This would allow you to do whatever with the supply that you want, for example pairing those tokens with another token in the Berachain BeraSwap so others can acquire it.

However, we usually want to make a token that's a little more interesting so it stands out. Let's add some more functionality to our token contract.

Let's make it so our token burns a small fee on every transfer. To do so, we'll add a few more constants and then override the default `_update` function in OpenZeppelin's `ERC20.sol` like so:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    uint256 public constant INITIAL_SUPPLY = 1_000_000 * 1 ether;
    uint256 public constant BURN_PERCENTAGE = 1; // 1% // [!code ++]
    address public constant BURN_ADDRESS = 0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF; // [!code ++]

    constructor() ERC20("MyToken", "MT"){
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    function _update(address sender, address recipient, uint256 amount) internal override { // [!code ++:5]
        uint256 burnAmount = (amount * BURN_PERCENTAGE) / 100;
        super._update(sender, recipient, amount - burnAmount);
        super._update(sender, BURN_ADDRESS, burnAmount);
    }
}
```

As you can see, we override the parent class's `_transfer` function by redefining `_transfer` in our `MyToken` contract with the `override` modifier. We can still call the default `_transfer` function from the parent class using `super._transfer` and do so to handle the actual token transfer logic after the burn has been calculated.

## Deploy Token Contract

Next step is to use forge script to deploy this contract to Berachain.

```bash-vue
# FROM: ./my_token

forge create --rpc-url {{config.mainnet.rpcUrl}} --private-key <YOUR_PRIVATE_KEY> src/MyToken.sol:MyToken --legacy;

# [Expected Output]:
# Deployer: 0x852Fc561Fd842ef1Af923ABfc64acC8A5624fe80
# Deployed to: 0x53E365fE5fDF332dD475E90bA8383B7F9853a49F
# Transaction hash: 0x59254ddcbb8dc1da89c7a1c7e300d8c6bd2f906b816b4497d046c717102d5725
```

## Verifying Contract

The last step is now verify that contract that was successfully deployed.

<!-- https://api.routescan.io/v2/network/testnet/evm/80084/etherscan -->

```bash-vue
forge verify-contract 0x53E365fE5fDF332dD475E90bA8383B7F9853a49F src/MyToken.sol:MyToken --verifier-url '{{config.mainnet.dapps.berascan.apiUrl}}' --etherscan-api-key "verifyContract" --num-of-optimizations 200

# [Expected Output]:
# Start verifying contract `0x53E365fE5fDF332dD475E90bA8383B7F9853a49F` deployed on mainnet
#
# Submitting verification for [src/MyToken.sol:MyToken] 0x53E365fE5fDF332dD475E90bA8383B7F9853a49F.
# Submitted contract for verification:
# Response: `OK`
# GUID: `321091ec-e529-5a11-a75c-cf1ffc6987d7`
# URL: https://etherscan.io/address/0x53e365fe5fdf332dd475e90ba8383b7f9853a49f
#
# !NOTE: Should be {{config.mainnet.dapps.berascan.url}}/address/0x53e365fe5fdf332dd475e90ba8383b7f9853a49f
```

## Next Steps

Now that you understand how to deploy a contract to Berachain with foundry, checkout the [Developer Guides](/developers/guides/community-guides) to start building out other contracts or building other dApps.
