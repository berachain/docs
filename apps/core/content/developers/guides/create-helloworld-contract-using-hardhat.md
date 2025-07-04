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

- NVM or Node `v18.18.2`
- `pnpm`, `yarn`, or `npm`
- Wallet that contains `BERA` token _(for deployment)_

## Creating HelloWorld Project Code Setup

Start by creating a new project folder for the project:

```bash
mkdir create-helloworld-contract-using-hardhat;
cd create-helloworld-contract-using-hardhat;
```

Initiate `Hardhat` to build out the `viem` template with the following prompts:

```bash
# FROM ./create-helloworld-contract-using-hardhat;

npx hardhat init;

# [Expected Prompts]:
# 888    888                      888 888               888
# 888    888                      888 888               888
# 888    888                      888 888               888
# 8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
# 888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
# 888    888 .d888888 888    888  888 888  888 .d888888 888
# 888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
# 888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888
#
# 👷 Welcome to Hardhat v2.18.3 👷‍
#
# ✔ What do you want to do? · Create a TypeScript project (with Viem)
# ✔ Hardhat project root: · /path/to/create-helloworld-contract-using-hardhat
# ✔ Do you want to add a .gitignore? (Y/n) · y
# ✔ Do you want to install this sample project's dependencies with npm (hardhat @nomicfoundation/#  hardhat-toolbox-viem)? (Y/n) · y
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

# Renames `Lock.sol` to `HelloWorld.sol`
mv contracts/Lock.sol contracts/HelloWorld.sol;
```

In our new `HelloWorld.sol` file, we'll replace the existing code with the following:

**File:** `./contract/HelloWorld.sol`

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

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

Now that we have our Solidity contract, let's make sure it can compile correctly.

```bash
# FROM ./create-helloworld-contract-using-hardhat;

npx hardhat compile;

# [Expected Output]:
# Compiled 1 Solidity file successfully (evm target: paris).
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
    "@nomicfoundation/hardhat-toolbox-viem": "^1.0.0",
    "dotenv": "^16.3.1",
    "hardhat": "^2.18.3"
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

# Renames `Lock.ts` to `HelloWorld.test.ts`
mv test/Lock.ts test/HellWorld.test.ts;
```

In our new `HelloWorld.test.ts` file, we'll replace the existing code with the following:

**File:** `./test/HelloWorld.test.ts`

```ts
// Imports
// ========================================================
import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

// Tests
// ========================================================
describe("HelloWorld", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.viem.getWalletClients();

    const contract = await hre.viem.deployContract("HelloWorld", ["Test Message"]);
    const publicClient = await hre.viem.getPublicClient();

    return {
      owner,
      otherAccount,
      publicClient,
      contract
    };
  }

  /**
   *
   */
  describe("Deployment", function () {
    /**
     *
     */
    it("Should deploy with original message", async function () {
      // Setup
      const { contract } = await loadFixture(deployFixture);

      // Init + Expectations
      expect(await contract.read.getGreeting()).to.equal("Test Message");
    });

    /**
     *
     */
    it("Should set a new message", async function () {
      // Setup
      const { contract, owner } = await loadFixture(deployFixture);

      // Init
      await contract.write.setGreeting(["Hello There"]);

      // Expectations
      expect(await contract.read.getGreeting()).to.equal("Hello There");
    });
  });
});
```

With our new tests defined, let's run our tests with the following command:

```bash
# FROM ./create-helloworld-contract-using-hardhat;

npx hardhat test;

# [Expected Output]:
#   HelloWorld
#     Deployment
#       ✔ Should deploy with original message (2723ms)
#       ✔ Should set a new message
#
#
#   2 passing (3s)
```

Let's make this step a bit easier again by adding this command to our `package.json` so that we can easily run `pnpm test`,

**File:** `./package.json`

```json
{
  "name": "create-helloworld-contract-using-hardhat",
  "scripts": {
    "compile": "./node_modules/.bin/hardhat compile",
    "test": "./node_modules/.bin/hardhat test" // [!code ++]
  },
  "devDependencies": {
    "@nomicfoundation/hardhat-toolbox-viem": "^1.0.0",
    "dotenv": "^16.3.1",
    "hardhat": "^2.18.3"
  }
}
```

## Configuring Hardhat for Berachain Contract Deployment

> <b>NOTE:</b> Hardhat with viem doesn't fully support custom chains out of the box yet, but this will be supported later when Berachain is launched.

In order to get our `hardhat.config.ts` setup correctly, let's take advantage of the `dotenv` package we installed by creating a `.env` file which will allow us to declare environment variables for our configuration to read.

```bash
# FROM ./create-helloworld-contract-using-hardhat;

touch .env;
```

In our new `.env` let's enter the following information:

> <b>NOTE:</b> These values are subject to change, but the overall configuration is the same.

**File:** `./.env`

```bash-vue
# Chain Configurations
CHAIN_ID={{config.mainnet.chainId}}
NETWORK_NAME="{{config.mainnet.name}}"
CURRENCY_DECIMALS={{config.mainnet.decimals}}
CURRENCY_NAME="{{config.mainnet.currencyName}}"
CURRENCY_SYMBOL="{{config.mainnet.currencySymbol}}"

# API key for Beratrail Block Explorer, can be any value for now
BLOCK_EXPLORER_NAME={{config.mainnet.dapps.berascan.name}}
BLOCK_EXPLORER_API_KEY={{config.mainnet.dapps.berascan.apiKey}}
BLOCK_EXPLORER_API_URL={{config.mainnet.dapps.berascan.apiUrl}}
BLOCK_EXPLORER_URL={{config.mainnet.dapps.berascan.url}}

# Wallet + RPC configurations
RPC_URL={{config.mainnet.rpcUrl}}
# Private key generated from Hardhat local - replace with Berachain
# NEVER SHARE THIS WITH ANYONE AND AVOID COMMITTING THIS WITH YOUR GIT REPOSITORY
WALLET_PRIVATE_KEY=0xYOUR_WALLET_PRIVATE_KEY
```

With our environment variable setup, we can now load them into our `hardhat.config.ts` with the following code:

**File:** `./hardhat.config.ts`

```ts
// Imports
// ========================================================
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import dotenv from "dotenv";

// Load Environment Variables
// ========================================================
dotenv.config();

// Main Hardhat Config
// ========================================================
const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    // For localhost network
    hardhat: {
      chainId: 1337
    },
    // NOTE: hardhat viem currently doesn't yet support this method for custom chains through Hardhat config ↴
    berachainTestnet: {
      chainId: parseInt(`${process.env.CHAIN_ID}`),
      url: `${process.env.RPC_URL || ""}`,
      accounts: process.env.WALLET_PRIVATE_KEY ? [`${process.env.WALLET_PRIVATE_KEY}`] : []
    }
  }
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
    "node": "./node_modules/.bin/hardhat node", // [!code ++]
    "deploy:localhost": "./node_modules/.bin/hardhat run scripts/deploy.ts --network localhost", // [!code ++]
    "deploy:berachain": "./node_modules/.bin/hardhat run scripts/deploy.ts --network berachainTestnet", // [!code ++]
    "test": "./node_modules/.bin/hardhat test"
  },
  "devDependencies": {
    "@nomicfoundation/hardhat-toolbox-viem": "^1.0.0",
    "dotenv": "^16.3.1",
    "hardhat": "^2.18.3"
  }
}
```

We'll also need to configure our `./scripts/deploy.ts` script to make sure things are deployed correctly.

**File:** `./scripts/deploy.ts`

```ts
// Imports
// ========================================================
import hre from "hardhat";

// Main Deployment Script
// ========================================================
async function main() {
  const contract = await hre.viem.deployContract("HelloWorld", ["Hello from the contract!"]);
  console.log(`HelloWorld deployed to ${contract.address}`);
}

// Init
// ========================================================
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

With our deployment script set, let's run a local node in one Terminal and deploy the contract in another Terminal.

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

Copy the Private Key and paste it our `.env` file for the `WALLET_PRIVATE_KEY`

**File:** `./.env`

```bash
WALLET_PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

**Teminal 2**

```bash
# FROM ./create-helloworld-contract-using-hardhat;

pnpm deploy:localhost;
# [Expected Similar Output]:
# HelloWorld deployed to 0x5fbdb2315678afecb367f032d93f642f64180aa3
```

Now that we can see that the contract can be successfully deployed for a local node, let's configure our deployment script to take advantage of deploying directly to Berachain.

> <b>NOTE:</b> Custom configurations are needed for viem to support custom chains. This will show how set that up with Berachain. When Berachain is public, these extra configurations might not be needed.

**File:** `./scripts/deploy.ts`

```ts
// Imports
// ========================================================
import hre from "hardhat";
import fs from "fs"; // [!code ++]
import { defineChain } from "viem"; // [!code ++]
import { privateKeyToAccount } from "viem/accounts"; // [!code ++]

// Config Needed For Custom Chain  // [!code ++]
// ========================================================  // [!code ++]
const chainConfiguration = defineChain({
  // [!code ++]
  id: parseInt(`${process.env.CHAIN_ID}`), // [!code ++]
  name: `${process.env.NETWORK_NAME}`, // [!code ++]
  network: `${process.env.NETWORK_NAME}`, // [!code ++]
  nativeCurrency: {
    // [!code ++]
    decimals: parseInt(`${process.env.CURRENCY_DECIMALS}`), // [!code ++]
    name: `${process.env.CURRENCY_NAME}`, // [!code ++]
    symbol: `${process.env.CURRENCY_SYMBOL}` // [!code ++]
  }, // [!code ++]
  rpcUrls: {
    // [!code ++]
    default: {
      // [!code ++]
      http: [`${process.env.RPC_URL}`] // [!code ++]
    }, // [!code ++]
    public: {
      // [!code ++]
      http: [`${process.env.RPC_URL}`] // [!code ++]
    } // [!code ++]
  }, // [!code ++]
  blockExplorers: {
    // [!code ++]
    default: {
      name: `${process.env.BLOCK_EXPLORER_NAME}`,
      url: `${process.env.BLOCK_EXPLORER_URL}`
    } // [!code ++]
  } // [!code ++]
}); // [!code ++]

// Main Deployment Script
// ========================================================
async function main() {
  // NOTE: hardhat with viem currently doesn't support custom chains so there needs to be some custom functionality ↴ // [!code ++]
  if (hre.network.name === "berachainTestnet") {
    // [!code ++]
    // Retrieve contract artifact ABI & Bytecode // [!code ++]
    const contractName = "HelloWorld"; // [!code ++]
    const artifactFile = fs.readFileSync(
      `${hre.artifacts._artifactsPath}/contracts/${contractName}.sol/${contractName}.json`
    ); // [!code ++]
    const artifactJSON = JSON.parse(artifactFile.toString()) as any; // [!code ++]

    // Configure wallet client // [!code ++]
    const walletClient = await hre.viem.getWalletClient(
      // [!code ++]
      // wallet account // [!code ++]
      privateKeyToAccount(hre.network.config.accounts?.[0] as `0x${string}`), // [!code ++]
      // configured chain // [!code ++]
      {
        // [!code ++]
        chain: chainConfiguration // [!code ++]
      } // [!code ++]
    ); // [!code ++]

    // Deploy contract // [!code ++]
    const hash = await walletClient.deployContract({
      // [!code ++]
      abi: artifactJSON.abi, // [!code ++]
      bytecode: artifactJSON.bytecode, // [!code ++]
      args: ["Hello From Deployed Contract"] // [!code ++]
    }); // [!code ++]
    console.log({ hash }); // [!code ++]

    // Retrieve deployed contract address // [!code ++]
    const publicClient = await hre.viem.getPublicClient({
      // [!code ++]
      chain: chainConfiguration // [!code ++]
    }); // [!code ++]
    const receipt = await publicClient.waitForTransactionReceipt({ hash }); // [!code ++]
    console.log(`${contractName} deployed to ${receipt?.contractAddress}`); // [!code ++]
  } else {
    // [!code ++]
    const contract = await hre.viem.deployContract("HelloWorld", ["Hello from the contract!"]);
    console.log(`HelloWorld deployed to ${contract.address}`);
  } // [!code ++]
}

// Init
// ========================================================
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

Now replace your `WALLET_PRIVATE_KEY` with a wallet that has BERA tokens.
<template v-if="config.bepolia.dapps?.faucet">
You can also get Testnet BERA tokens from the <a href="{{config.bepolia.dapps.faucet.url}}">{{config.bepolia.dapps.faucet.name}}</a>.
</template>

**File:** `./.env`

```bash
WALLET_PRIVATE_KEY=0xYOUR_WALLET_PRIVATE_KEY
```

Now let's deploy our contract to Berachain directly.

```bash
# FROM ./create-helloworld-contract-using-hardhat;

pnpm deploy:berachain;

# [Expected Similar Output]:
# {
#   hash: '0x3ff0120c126b20d9f286657521c9d2d1edbb38f60dcd5fc6b95638a192588182'
# }
# HelloWorld deployed to 0x38f8423cc4390938c01616d7a9f761972e7f116a  // [!code hl]
```

We can also see our deployed contract in the Berachain Beratrail Block Explorer by going to the following address:

```bash-vue
open {{config.mainnet.dapps.berascan.url}}address/0x38f8423cc4390938c01616d7a9f761972e7f116a

# [Expected Result Should Open Your Browser]
```

You'll see that our contract has been successfully deployed but not verified as it still shows the contract bytecode.

## Verifying HelloWorld Contract

To verify our contract, we just need add an additional configuration to our `hardhat.config.ts` file.

**File:** `./hardhat.config.ts`

```ts
// Imports
// ========================================================
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import dotenv from "dotenv";

// Load Environment Variables
// ========================================================
dotenv.config();

// Main Hardhat Config
// ========================================================
const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      chainId: 1337
    },
    // NOTE: hardhat viem currently doesn't yet support this method for custom chains through Hardhat config ↴
    berachainTestnet: {
      chainId: parseInt(`${process.env.CHAIN_ID}`),
      url: `${process.env.RPC_URL || ""}`,
      accounts: process.env.WALLET_PRIVATE_KEY ? [`${process.env.WALLET_PRIVATE_KEY}`] : []
    }
  }, // [!code ++]
  // For Contract Verification // [!code ++]
  etherscan: {
    // [!code ++]
    apiKey: `${process.env.BLOCK_EXPLORER_API_KEY}`, // [!code ++]
    customChains: [
      // [!code ++]
      {
        // [!code ++]
        network: "Berachain Testnet", // [!code ++]
        chainId: parseInt(`${process.env.CHAIN_ID}`), // [!code ++]
        urls: {
          // [!code ++]
          apiURL: `${process.env.BLOCK_EXPLORER_API_URL}`, // [!code ++]
          browserURL: `${process.env.BLOCK_EXPLORER_URL}` // [!code ++]
        } // [!code ++]
      } // [!code ++]
    ] // [!code ++]
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
    "node": "./node_modules/.bin/hardhat node",
    "deploy:localhost": "./node_modules/.bin/hardhat run scripts/deploy.ts --network localhost",
    "deploy:berachain": "./node_modules/.bin/hardhat run scripts/deploy.ts --network berachainTestnet",
    "test": "./node_modules/.bin/hardhat test",
    "verify": "./node_modules/.bin/hardhat verify --network berachainTestnet" // [!code ++]
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
