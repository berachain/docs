---
head:
  - - meta
    - property: og:title
      content: EIP-2935 Historical Block Hashes
  - - meta
    - name: description
      content: Set up a quick demo showcasing gas comparisons on blockhash related methods before and after EIP-2935
  - - meta
    - property: og:description
      content: Set up a quick demo showcasing gas comparisons on blockhash related methods before and after EIP-2935
---

# EIP-2935: Gas-Efficient Blockhash Access for Berachain Developers

This guide covers [EIP-2935, _an EIP focused on historical block hashes from state_,](https://eips.ethereum.org/EIPS/eip-2935) and how it enables gas optimizations for applications building on Berachain. It is part of the [Bectra upgrade](https://x.com/berachain/status/1930326162577776655), which brings Ethereum’s Pectra-era EIPs to Berachain.

EIP-2935 introduces a system contract that stores the last 8,191 block hashes in a ring buffer, making them readily available onchain. This dramatically improves the developer experience for use cases that rely on historical blockhashes, without requiring manual storage or trusted offchain sources.

This guide specifically shows obtaining a historic blockhash using the power of EIP-2935 and its system contracts, all on Bepolia. This can be done on Berachain as well.

## Before vs After EIP-2935

Before EIP-2935, smart contracts could access only the last 256 block hashes using the `BLOCKHASH` opcode. This process raised challenges though:

- Accessing a hash outside that window, returned `0x0`, silently,
- You couldn’t fetch a blockhash using dynamic inputs (e.g. calldata or computation),
- If you needed a blockhash later, you had to store it manually using `SSTORE` (~20,000 gas),
- Or emit it in an event and recover it offchain, which breaks onchain determinism

This led to dApps implementing expensive or complex workarounds, especially in cases like:

- Randomness
- Voting snapshot validation
- Rollup L1 to L2 anchors
- zk-proof verification
- Timestamp anchoring
- Evidence-based slashing

## What EIP-2935 Enables

EIP-2935 solves this by creating a system contract at a fixed address on the respective network, that stores block hashes for the last 8,191 blocks (approximately 1 day), aka the `HISTORY_SERVE_WINDOW,` in protocol-maintained storage. It should be noted that there are no changes made to the `BLOCKHASH` opcode.

Smart contracts can now:

- Access historical blockhashes using arbitrary block numbers within the window referred to as `HISTORY_SERVE_WINDOW`,
- Avoid `SSTORE` overhead by not needing to manually persist hashes, unless they need blockhashes outside of the new `HISTORY_SERVE_WINDOW`
- Ensure reliable behavior where the system contract will revert if a block is out of range, rather than returning 'silent' values not indicative of the failed call
- Support calldata-driven logic, dynamic access, and composable designs

Anyone can later call `get(blockNumber)` to retrieve a blockhash from that range.

## What This Looks Like in Code

Before EIP-2935, developers would do something like:

```solidity
bytes32 hash = blockhash(blockNumber); // Only works if blockNumber is within 256-block window
storedHash = hash; // Costly SSTORE just to remember it
```

With EIP2935, they can just do something like:

```solidity
bytes32 blockNumberBigEndian = bytes32(uint256(blockNumber));
bytes memory rawCallData = abi.encodePacked(blockNumberBigEndian);
(bool ok, bytes memory data) = systemContract.staticcall(rawCallData);
```

This saves at least one SSTORE per use case, which can reduce total gas by 20,000+ per user interaction. Within an application, this of course can add up to massive savings over time.

> It is very important to note that the system contract only receives the `calldata`, and there is no specification of the function signature or anything. See the explaination below.

**Why the EIP-2935 System Contract Uses Raw Bytes**

It might seem strange that the system contract is not verified and easily readible when looking on a block explorer. There are some key things to note in regards to this. The EIP-2935 system contract is a precompiled system contract inserted directly by the client at a fixed address. It does not follow standard Solidity conventions:

- It has no function selectors or ABI encoding
- It was not deployed via a transaction, so there is no verified source code
- It accepts a raw 32-byte uint256 block number as input
- It returns a raw 32-byte bytes32 blockhash as output

This low-level design avoids ABI overhead and enables efficient access to blockhashes, but requires manually encoding inputs when calling the contract.

Now that you have an understanding of EIP-2935 and what it brings to Berachain's developer experience, let's get into the guide and code itself for this guide.

## Guide

This guide primarily revolves around the following files:

- `eip2935GasComparison.sol` - A simple implementation showcasing the methods for obtaining a blockhash, including storing them pre-EIP-2935.
- `gasComparison.t.sol` - A simple test suite to showcase unit testing with the `eip2935GasComparison.sol` contract.
- `DeployGasComparison.s.sol` - A solidity script used to deploy the `eip2935GasComparison.sol` and make calls to it to simulate different blockhash reading methods.
- `run_gas_comparison.sh` - A bash script created to deploy `eip2935GasComparison.sol` and tabulate the gas expenditure results.

### Prerequisites

Make sure you have the Foundry toolchain installed.

```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup  # Ensures you have the latest version (with solc auto-install support)
```

If you've already installed Foundry, just run:

```bash
foundryup
```

> This guide requires Solidity ^0.8.29. `forge build` will automatically download the right version if you're using a modern `forge` via `foundryup`.

Go through the following steps:

### Step 1 - Install Deps

```bash
cd apps/eip-2935-gas-comparison
```

```bash
# From apps/eip-2935-gas-comparison
pnpm install && cp .env.example .env
```

> ℹ️ forge install pulls in required dependencies like forge-std. Don’t skip it.

```bash
forge install && forge build
```

### Step 2 - Update Your `.env` and Start Your Anvil Fork

Update your `.env` with your `EOA_PRIVATE_KEY` and `BEPOLIA_RPC_URL`

```bash
# From apps/eip-2935-gas-comparison
source .env && anvil --fork-url $BEPOLIA_RPC_URL --chain-id 80069 --hardfork prague --port 8545
source .env && anvil --fork-url $BEPOLIA_RPC_URL --chain-id 80069 --port 8545 # TODO - remove: try this to see if it does it at current block and thus has Bectra in play
```

### Step 3 - Deploy `eip2935GasComparison.sol` Implementation

This script works on a local Bepolia Anvil fork. Make sure your `.env` has the right test keys and enough $tBERA.

```bash
# From apps/eip-2935-gas-comparison
./script/run_gas-comparison.sh
```

### Step 4 - Understanding What the Script Does

The bash script, `run_gas_comparison.sh` deploys the `eip2935GasComparison.sol` contract on the locally ran anvil fork of Bepolia. It then goes through the results and tabulates the total gas expenses for each blockhashing method, including storing the blockhash or replicating the usage of an oracle.

#### Step 6 - Highlevel Review of the Solidity File

This project demonstrates and benchmarks different blockhash access patterns:

1. Manual SSTORE of blockhash (pre-EIP-2935 workaround) and direct SLOAD readback of stored hash
2. EIP-2935-style .get() call to a mock system contract
3. Oracle-submitted blockhash pattern simulating offchain access

You can see the details of the code in `eip2935GasComparison.sol`.

## Step 7 - Assessing the Results

The table is output in `gas_comparison.md` at the root of this subdirectory, where we can see the gas savings when comparing one method to the next.

Below is an example output that you ought to see when running the bash script:

| Pattern                         | Methods Involved                                | Total Gas |
| ------------------------------- | ----------------------------------------------- | --------- |
| Before EIP-2935: SSTORE pattern | storeWithSSTORE(...), readWithSLOAD(...)        | 46210     |
| After EIP-2935: .get() access   | readWithGet(...)                                | 6494      |
| Before EIP-2935: Oracle pattern | submitOracleBlockhash(...), readFromOracle(...) | 46338     |

Simply reading the blockhash from the system contract resulted in significantly less gas expenditure compared to the other methods typically used before EIP-2935. A table showcasing the savings can be seen below when comparing against the new method of just reading from the system contract.

| Pattern                         | Total Gas | Savings vs. `.get()` | % Saved Compared to `.get()` |
| ------------------------------- | --------- | -------------------- | ---------------------------- |
| Before EIP-2935: SSTORE pattern | 46,210    | 39,716               | 85.95%                       |
| Before EIP-2935: Oracle pattern | 46,338    | 39,844               | 86.00%                       |
| After EIP-2935: .get() access   | 6,494     | —                    | —                            |

> It should be noted that if carrying out any of these calls cold results in the gas expenditures above, and warm calls will be less. The comparative analysis still stands even with this in mind.

🐻🎉 Congrats! You have finished the guide and have now seen the gas savings that come about with EIP-2935 when accessing historical blockhashes.
