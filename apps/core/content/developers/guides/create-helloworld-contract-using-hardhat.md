---
head:
  - - meta
    - property: og:title
      content: Create HelloWorld Contract Using Hardhat
  - - meta
    - name: description
      content: Learn How to Build a HelloWorld Smart Contract Using Hardhat
  - - meta
    - property: og:description
      content: Learn How to Build a HelloWorld Smart Contract Using Hardhat
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Create HelloWorld Contract Using Hardhat

> See the full [GitHub Project Code Repository](https://github.com/berachain/guides/tree/main/apps/hardhat-viem-helloworld).

This developer guide will walk you through setting up a new Solidity contract, configuring the Berachain network details, deploying to Berachain, and verifying the contract, all with [Hardhat](https://hardhat.org).

## Requirements

Before beginning, make sure you have the following installed or setup on your computer before hand.

- NVM or Node `v22.14.0` or greater
- `pnpm` `v10.15.0` or greater
- Wallet that contains `BERA` token _(for deployment)_

:::warning
Hardhat v3.0.0 or greater is needed to be installed for verification.
:::

## Creating HelloWorld Project Code Setup

Start by creating a new project folder for the project:

```bash
mkdir create-helloworld-contract-using-hardhat;
cd create-helloworld-contract-using-hardhat;
```

Initiate `Hardhat` to build out the `viem` template with the following prompts:

```bash
# FROM ./create-helloworld-contract-using-hardhat;

pnpm dlx hardhat --init;

# [Expected Prompts]:
# 
#  █████  █████                         ███  ███                  ███      ██████
# ░░███  ░░███                         ░███ ░███                 ░███     ███░░███
#  ░███   ░███   ██████  ████████   ███████ ░███████    ██████  ███████  ░░░  ░███
#  ░██████████  ░░░░░███░░███░░███ ███░░███ ░███░░███  ░░░░░███░░░███░      ████░
#  ░███░░░░███   ███████ ░███ ░░░ ░███ ░███ ░███ ░███   ███████  ░███      ░░░░███
#  ░███   ░███  ███░░███ ░███     ░███ ░███ ░███ ░███  ███░░███  ░███ ███ ███ ░███
#  █████  █████░░███████ █████    ░░███████ ████ █████░░███████  ░░█████ ░░██████
# ░░░░░  ░░░░░  ░░░░░░░ ░░░░░      ░░░░░░░ ░░░░ ░░░░░  ░░░░░░░    ░░░░░   ░░░░░░
#  
# 👷 Welcome to Hardhat v3.0.6 👷
#
# ✔ Which version of Hardhat would you like to use? · hardhat-3
# ✔ Where would you like to initialize the project? · /path/to/create-helloworld-contract-using-hardhat
# Please provide either a relative or an absolute path: · .
# ✔ What type of project would you like to initialize? · node-test-runner-viem
# ✨ Template files copied ✨
# ✔ You need to install the necessary dependencies using the following command:
# pnpm add --save-dev "hardhat@^3.0.6" "@nomicfoundation/hardhat-toolbox-viem@^5.0.0" "@nomicfoundation/hardhat-ignition@^3.0.0" "@types/node@^22.8.5" "forge-std@foundry-rs/forge-std#v1.9.4" "typescript@~5.8.0" "viem@^2.30.0"
# 
# Do you want to run it now? (Y/n) · true
```

We'll need one more dependency for our project, which is `dotenv` to take advantage of environment variables.

```bash
# FROM ./create-helloworld-contract-using-hardhat;

pnpm add -D dotenv;
```

## Creating the HelloWorld Contract

Now that we have everything, there should be some existing files that were created by Hardhat.

We'll start by creating a new Solidity contract by renaming the existing to the following:

```bash
# FROM ./create-helloworld-contract-using-hardhat;

# Renames `Counter.sol` to `HelloWorld.sol`
mv contracts/Counter.sol contracts/HelloWorld.sol;
```

In our new `HelloWorld.sol` file, we'll replace the existing code with the following:

**File:** `./contract/HelloWorld.sol`

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract HelloWorld {
    // Events that allows for emitting a message
    event NewGreeting(address sender, string message);

    // Variables
    string greeting;

    // Main constructor run at deployment
    constructor(string memory _greeting) {
        greeting = _greeting;
        emit NewGreeting(msg.sender, _greeting);
    }

    // Get function
    function getGreeting() public view returns (string memory) {
        return greeting;
    }

    // Set function
    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
        emit NewGreeting(msg.sender, _greeting);
    }
}
```

We'll also modify the default `Counter.t.sol` file that's used for foundry tests.

```bash
# FROM ./create-helloworld-contract-using-hardhat;

# Renames `Counter..t.sol` to `HelloWorld.t.sol`
mv contracts/Counter.t.sol contracts/HelloWorld.t.sol;
```

We'll also modify the file with the following contents:

**File:** `./contracts/HelloWorld.t.sol`

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {HelloWorld} from "./HelloWorld.sol";
import {Test} from "forge-std/Test.sol";

contract HelloWorldTest is Test {
  HelloWorld helloWorld;

  function setUp() public {
    helloWorld = new HelloWorld("Hello World");
  }

  function test_InitialValue() public view {
    require(helloWorld.getGreeting() == "Hello World", "Initial value should be 'Hello World'");
  }

  function test_SetGreet() public {
    helloWorld.setGreeting("Hello There");
    require(helloWorld.getGreeting() == "Hello There", "Value should be 'Hello There'");
  }
}
```

Now that we have our Solidity contract, let's make sure it can compile correctly.

```bash
# FROM ./create-helloworld-contract-using-hardhat;

./node_modules/.bin/hardhat compile;

# [Expected Output]:
# Compiling your Solidity contracts...
# Compiled 1 Solidity file with solc 0.8.28 (evm target: cancun)
```

Let's make this step a bit easier by adding this command to our `package.json`

**File:** `./package.json`

```json
{
  "name": "create-helloworld-contract-using-hardhat",
  "scripts": {
    // [!code ++]
    "compile": "./node_modules/.bin/hardhat compile" // [!code ++]
  }, // [!code ++]
  "devDependencies": {
    "@nomicfoundation/hardhat-ignition": "^3.0.3",
    "@nomicfoundation/hardhat-toolbox-viem": "^5.0.0",
    "@types/node": "^22.18.1",
    "dotenv": "^17.2.2",
    "forge-std": "github:foundry-rs/forge-std#v1.9.4",
    "hardhat": "^3.0.6",
    "typescript": "~5.8.3",
    "viem": "^2.37.5"
  }
}
```

We can take advantage of compiling with the following command:

```bash
# FROM ./create-helloworld-contract-using-hardhat;

pnpm compile; # npm run compile or yarn run compil;

# [Expected Output]:
# Nothing to compile
```

## Testing the HelloWorld Contract

Now that we have our contract, let's make sure it's working correctly by writting some tests.

Hardhat already created a test file in our `/test` directory, and we're going to rename it.

```bash
# FROM ./create-helloworld-contract-using-hardhat;

# Renames `Counter.ts` to `HelloWorld.test.ts`
mv test/Counter.ts test/HellWorld.test.ts;
```

In our new `HelloWorld.test.ts` file, we'll replace the existing code with the following:

**File:** `./test/HelloWorld.test.ts`

```ts
// Imports
// ========================================================
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { network } from "hardhat";

// Tests
// ========================================================
describe("HelloWorld", async () => {
  const { viem } = await network.connect();

  /**
   * Deployment tests
   */
  describe("Deployment", async () => {
    /**
     * Contract setup
     */
    const contract = await viem.deployContract("HelloWorld", ["Hello World"]);

    /**
     * Test initial deployment
     */
    it("Should deploy with original message", async () => {  
      // Init + Expectations
      assert.equal(await contract.read.getGreeting(), "Hello World");
    });

    /**
     * Test modifying the message
     */
    it("Should set a new message", async function () {
      // Init
      await contract.write.setGreeting(["Hello There"]);

      // Expectations
      assert.equal(await contract.read.getGreeting(), "Hello There");
    });
  });
});
```

With our new tests defined, let's run our tests with the following command:

```bash
# FROM ./create-helloworld-contract-using-hardhat;

./node_modules/.bin/hardhat test;

# [Expected Output]:
# Compiling your Solidity contracts...
# 
# Nothing to compile
# 
# Running Solidity tests
# 
#   0 passing
# 
# Running node:test tests
# 
#   HelloWorld
#     Deployment
#       ✔ Should deploy with original message
#       ✔ Should set a new message
#   2 passing (860ms)
```

Let's make this step a bit easier again by adding this command to our `package.json` so that we can easily run `pnpm test`,

**File:** `./package.json`

```json
{
  "name": "create-helloworld-contract-using-hardhat",
  "scripts": {
    "compile": "./node_modules/.bin/hardhat compile",
    "test": "./node_modules/.bin/hardhat test", // [!code ++]
    "keystore:set": "./node_modules/.bin/hardhat keystore set --" // [!code ++]
  },
  "devDependencies": {
    "@nomicfoundation/hardhat-ignition": "^3.0.3",
    "@nomicfoundation/hardhat-toolbox-viem": "^5.0.0",
    "@types/node": "^22.18.1",
    "dotenv": "^17.2.2",
    "forge-std": "github:foundry-rs/forge-std#v1.9.4",
    "hardhat": "^3.0.6",
    "typescript": "~5.8.3",
    "viem": "^2.37.5"
  }
}
```

## Configuring Hardhat for Berachain Contract Deployment

In order to get our `hardhat.config.ts` setup correctly, let's take advantage of key store built into hardhat.

Set the RPC.

```bash
# FROM ./create-helloworld-contract-using-hardhat;

pnpm keystore:set BERACHAIN_RPC_URL;

# 👷🔐 Hardhat Production Keystore 🔐👷
# 
# This is the first time you are using the production keystore, please set a password.
# The password must have at least 8 characters.
# 
# [hardhat-keystore] Enter the password: **********
# [hardhat-keystore] Please confirm your password: **********
# [hardhat-keystore] Enter secret to store in the production keystore: **********************************
# Key "BERACHAIN_RPC_URL" set in the production keystore
```

Set your wallet private key.

```bash
# FROM ./create-helloworld-contract-using-hardhat;

pnpm keystore:set WALLET_PRIVATE_KEY;

# [hardhat-keystore] Enter the password: **********
# [hardhat-keystore] Enter secret to store in the production keystore: ****************************************************************
# Key "WALLET_PRIVATE_KEY" set in the production keystore
```

With our environment variable setup, we can now load them into our `hardhat.config.ts` with the following code:

**File:** `./hardhat.config.ts`

```ts
// Imports
// ========================================================
import type { HardhatUserConfig } from "hardhat/config";
import hardhatToolboxViemPlugin from "@nomicfoundation/hardhat-toolbox-viem";
import { configVariable } from "hardhat/config";

// Main Hardhat Config
// ========================================================
const config: HardhatUserConfig = {
  plugins: [hardhatToolboxViemPlugin],
  solidity: {
    profiles: {
      default: {
        version: "0.8.28",
      },
      production: {
        version: "0.8.28",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    },
  },
  networks: {
    berachainTestnet: {
      type: "http",
      chainType: "l1",
      url: configVariable("BERACHAIN_RPC_URL"),
      accounts: [configVariable("WALLET_PRIVATE_KEY")],
    },
    hardhatMainnet: {
      type: "edr-simulated",
      chainType: "l1",
    },
    hardhatOp: {
      type: "edr-simulated",
      chainType: "op",
    },
    sepolia: {
      type: "http",
      chainType: "l1",
      url: configVariable("SEPOLIA_RPC_URL"),
      accounts: [configVariable("WALLET_PRIVATE_KEY")],
    },
  },
};

// Exports
// ========================================================
export default config;
```

## Deploying HelloWorld Contract

Now that we have the configuration setup, let's try running a local node and deploying it there.

But first, let's make it a bit easier by making some modifications to our `package.json` to make these commands a bit easier to run.

**File:** `./package.json`

```json
{
  "name": "create-helloworld-contract-using-hardhat",
  "scripts": {
    "compile": "./node_modules/.bin/hardhat compile",
    "test": "./node_modules/.bin/hardhat test",
    "keystore:set": "./node_modules/.bin/hardhat keystore set --",
    "node": "./node_modules/.bin/hardhat node", // [!code ++]
    "deploy:localhost": "./node_modules/.bin/hardhat ignition deploy --network localhost ignition/modules/HelloWorld.ts", // [!code ++]
    "deploy:berachain": "./node_modules/.bin/hardhat ignition deploy --network berachainTestnet ignition/modules/HelloWorld.ts", // [!code ++]
  },
  "devDependencies": {
    "@nomicfoundation/hardhat-toolbox-viem": "^1.0.0",
    "dotenv": "^16.3.1",
    "hardhat": "^2.18.3"
  }
}
```

Let's modify the existing ignition module.

```bash
# FROM: /

mv ignition/modules/Counter.ts ignition/modules/HelloWorld.ts;
```

We'll also need to configure our `./ignition/modules/HelloWorld.ts` script to make sure things are deployed correctly.

**File:** `./ignition/modules/HelloWorld.ts`

```ts
// Imports
// ========================================================
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// Main Module
// ========================================================
export default buildModule("HelloWorldModule", (m) => {
  const helloWorld = m.contract("HelloWorld", ["Hello World"]);

  m.call(helloWorld, "setGreet", ["Hello There"]);

  return { helloWorld };
});
```

With our deployment script set, let's run a local node in one T$$erminal and deploy the contract in another Terminal.

**Terminal 1**

```bash
# FROM ./create-helloworld-contract-using-hardhat;

pnpm node;

# [Expected Output]:
# Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/
#
# Accounts
# ========
#
# WARNING: These accounts, and their private keys, are publicly known.
# Any funds sent to them on Mainnet or any other live network WILL BE LOST.
#
# Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
# Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

**Teminal 2**

```bash
# FROM ./create-helloworld-contract-using-hardhat;

pnpm deploy:localhost;
# [Expected Similar Output]:
# Hardhat Ignition starting for [ HelloWorldModule
# Hardhat Ignition 🚀
# 
# Deploying [ HelloWorldModule ]
# 
# Batch #1
#   Executed HelloWorldModule#HelloWorld
# 
# Batch #2
# Batch #2
# Batch #2
#   Executed HelloWorldModule#HelloWorld.setGreet
# 
# [ HelloWorldModule ] successfully deployed 🚀
# 
# Deployed Addresses
# 
# HelloWorldModule#HelloWorld - 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

Now that we can see that the contract can be successfully deployed for a local node, let's deploy directly to Berachain.

```bash
# FROM ./create-helloworld-contract-using-hardhat;

pnpm deploy:berachain;

# [Expected Similar Output]:
# [hardhat-keystore] Enter the password: **********
# ✔ Confirm deploy to network berachainTestnet (80069)? … yes
# Hardhat Ignition 🚀
# 
# Deploying [ HelloWorldModule ]
# 
# Batch #1
#   Executed HelloWorldModule#HelloWorld
# 
# Batch #2
#   Executed HelloWorldModule#HelloWorld.setGreet
# 
# [ HelloWorldModule ] successfully deployed 🚀
# 
# Deployed Addresses
# 
# HelloWorldModule#HelloWorld - 0x2ACD9577B57Ff043F0203730683e8c7C881DcB21  // [!code hl]
```

We can also see our deployed contract in the Berachain Block Explorer by going to the following address:

```bash-vue
open {{config.bepolia.dapps.berascan.url}}address/0x2ACD9577B57Ff043F0203730683e8c7C881DcB21

# [Expected Result Should Open Your Browser]
```

You'll see that our contract has been successfully deployed but not verified as it still shows the contract bytecode.

## Verifying HelloWorld Contract

To verify our contract, we'll need to install one depencency and configuration to our `hardhat.config.ts` file.

```bash
# FROM: /

pnpm add -D @nomicfoundation/hardhat-verify;            
```

Then modify your hardhat to add your Etherscan API Key

:::note
Etherscan API V2 now let's you use any Etherscan API key across multiple platforms at https://etherscan.io/login.
:::

**File:** `./hardhat.config.ts`

```ts
// Imports
// ========================================================
import type { HardhatUserConfig } from "hardhat/config";
import hardhatToolboxViemPlugin from "@nomicfoundation/hardhat-toolbox-viem";
import { configVariable } from "hardhat/config";

// Main Hardhat Config
// ========================================================
const config: HardhatUserConfig = {
  plugins: [hardhatToolboxViemPlugin],
  solidity: {
    profiles: {
      default: {
        version: "0.8.28",
      },
      production: {
        version: "0.8.28",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    },
  },
  networks: {
    berachainTestnet: {
      type: "http",
      chainType: "l1",
      url: configVariable("BERACHAIN_RPC_URL"),
      accounts: [configVariable("WALLET_PRIVATE_KEY")],
    },
    hardhatMainnet: {
      type: "edr-simulated",
      chainType: "l1",
    },
    hardhatOp: {
      type: "edr-simulated",
      chainType: "op",
    },
    sepolia: {
      type: "http",
      chainType: "l1",
      url: configVariable("SEPOLIA_RPC_URL"),
      accounts: [configVariable("WALLET_PRIVATE_KEY")],
    },
  },
  verify: { // [!code ++]
    etherscan: { // [!code ++]
      apiKey: configVariable("ETHERSCAN_API_KEY"), // [!code ++]
    }, // [!code ++]
  } // [!code ++]
};

// Exports
// ========================================================
export default config;
```

Now that we have the configuration setup, let's add another run command to our `package.json`

**File:** `./package.json`

```json
{
  "name": "create-helloworld-contract-using-hardhat",
  "scripts": {
    "compile": "./node_modules/.bin/hardhat compile",
    "test": "./node_modules/.bin/hardhat test",
    "keystore:set": "./node_modules/.bin/hardhat keystore set --",
    "node": "./node_modules/.bin/hardhat node",
    "deploy:localhost": "./node_modules/.bin/hardhat ignition deploy --network localhost ignition/modules/HelloWorld.ts",
    "deploy:berachain": "./node_modules/.bin/hardhat ignition deploy --network berachainTestnet ignition/modules/HelloWorld.ts",
    "verify:berachain": "./node_modules/.bin/hardhat verify --network berachainTestnet --" // [!code ++]
  },
  "devDependencies": {
    "@nomicfoundation/hardhat-toolbox-viem": "^1.0.0",
    "dotenv": "^16.3.1",
    "hardhat": "^2.18.3"
  }
}
```

With our previously deploy contract address and taking into account that we deployed our contract with the initial argument of `"Hello From Deployed Contract"`, let's run the following to confirm our contract.

```bash-vue
# FROM ./create-helloworld-contract-using-hardhat;

# Equivalent to: npx hardhat verify 0x38f8423cc4390938c01616d7a9f761972e7f116a "Hello From Deployed Contract"
pnpm verify 0x38f8423cc4390938c01616d7a9f761972e7f116a "Hello From Deployed Contract";

# [Expected Output]:
#
# Successfully submitted source code for contract
# contracts/HelloWorld.sol:HelloWorld at 0x38f8423cc4390938c01616d7a9f761972e7f116a
# for verification on the block explorer. Waiting for verification result...
#
# Successfully verified contract HelloWorld on the block explorer.
# {{config.mainnet.dapps.berascan.url}}address/0x38f8423cc4390938c01616d7a9f761972e7f116a#code
```

We should now see on Beratail that the contract is verified and that the Solidity code is now showing.

## Full Code Repository

The full github code repository can be found in the [guides section](https://github.com/berachain/guides/) of this repository under [Create HelloWorld Contract Using Hardhat](https://github.com/berachain/guides/tree/main/apps/hardhat-viem-helloworld).
