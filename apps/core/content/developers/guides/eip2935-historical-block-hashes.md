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

- Accessing a hash outside that window returns `0x0` silently
- You couldn’t fetch a blockhash using dynamic inputs (e.g. calldata or computation)
- If you needed a blockhash later, you had to store it manually using `SSTORE` (~20,000 gas)
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

- Access historical blockhashes using arbitrary block numbers within the window referred to as `HISTORY_SERVE_WINDOW`
- Avoid `SSTORE` overhead by not needing to manually persist hashes, unless they need blockhashes outside of the new `HISTORY_SERVE_WINDOW`
- Ensure reliable behavior where the system contract will revert if a block is out of range, rather than returning 'silent' values not indicative of the failed call
- Support calldata-driven logic, dynamic access, and composable designs

Anyone can later call the system contract to retrieve a blockhash from that range.

## How To Obtain BlockHashes & Store Them

This guide primarily revolves around the following files:

- `eip2935GasComparison.sol` - A simple implementation showcasing the methods for obtaining a blockhash, including storing them pre-EIP-2935.
- `eip2935GasComparison.t.sol` - A simple test suite to showcase unit testing with the `eip2935GasComparison.sol` contract.
- `eip2935GasComparison.s.sol` - A solidity script used to deploy the `eip2935GasComparison.sol` and make calls to it to simulate different blockhash reading methods.
- `run_gas_comparison.sh` - A bash script created to deploy `eip2935GasComparison.sol` and tabulate the gas expenditure results.

### Requirementse

Make sure you have the following installed on your computer before we begin:

- Foundry (Foirge & Cast): v1.0.0 or greater
- Solidity: version ^0.8.29

If you have not installed these before, simply follow the commands below:

```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup  # Ensures you have the latest version (with solc auto-install support)
```

If you've already installed Foundry, just run:

```bash
foundryup
```

> This guide requires Solidity ^0.8.29. `forge build` will automatically download the right version if you're using a modern `forge` via `foundryup`.

Next, go through the following steps to setup your dependencies and `.env`.

### Step 1 - Install Dependencies

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

### Step 2 - Run Forge Tests

The majority of this guide will go through running tests against an anvil fork. Of course, running unit tests is important for the development cycle in the beginning. We have provided quick foundry tests to showcase checks that the example implementation contract, `eip2935GasComparison.sol`, is functioning properly before testing against anvil forks or on actual networks.

If you'd like to understand the solidity code first, check it out [here](#step-6---highlevel-review-of-the-solidity-file).

> NOTE: The tests in this guide are setup to test against a Bepolia fork-url because the typical foundry EVM environment does not reflect EIP-2935 (and the needed system contract), and the other Bectra upgrades.

Run tests by running:

```bash-vue
# FROM: ./
source .env && forge test --fork-url $BEPOLIA_RPC_URL --fork-block-number 5045482
```

You should see an ouput showcasing the tests passing:

```bash
[⠊] Compiling...
[⠔] Compiling 1 files with Solc 0.8.29
[⠒] Solc 0.8.29 finished in 426.77ms
Compiler run successful!

Ran 4 tests for test/eip2935GasComparison.t.sol:GasComparisonTest
[PASS] testBlock() (gas: 2515)
[PASS] testGas_OracleSubmission() (gas: 39693)
[PASS] testGas_ReadWithGet() (gas: 41618)
[PASS] testGas_ReadWithSLOAD() (gas: 59398)
Suite result: ok. 4 passed; 0 failed; 0 skipped; finished in 1.05ms (679.63µs CPU time)

Ran 1 test suite in 278.65ms (1.05ms CPU time): 4 tests passed, 0 failed, 0 skipped (4 total tests)
```

The pertinent tests to ensure that `eip2935GasComparison.sol` implementation is functioning properly includes:

- `testGas_OracleSubmission()`: Checking that the oracle-based pattern methods for obtaining blockhash history and inherent historic data functions
- `testGas_ReadWithGet()`: Checking the usage of the system contract as per EIP2935 for obtaining historic blockhashes
- `testGas_ReadWithSLOAD()`: Checking that the SSTORE and SLOAD pattern methods for storing and obtaining blockhash history, respectively, functions properly

Now we can move onto testing with an actual script either against an anvil network or an actual network.

### Step 3 - Start Your Anvil Fork

Run the following command to deploy a local anvil fork via your terminal. You need to specify the block number shown below to ensure that the EIP2935 system contract will function properly to reflect being activated after Bectra upgrades on Bepolia.

```bash-vue
# From apps/eip-2935-gas-comparison
source .env && anvil --fork-url $BEPOLIA_RPC_URL --fork-block-number 4867668 --chain-id 80069 --port 8545
```

### Step 4 - Update Your `.env` and Deploy `eip2935GasComparison.sol` Implementation

This script works on a local Bepolia Anvil fork.

Update your `.env` with your `EOA_PRIVATE_KEY` and make sure it has enough $tBERA for deployment. A single $tBERA should be more than enough.

```bash
# FROM: ./

./script/run_gas_comparison.sh

```

#### Expected Similar Results:

After running `run_gas_comparison.sh` you should see results like the following in your terminal:

```bash
./script/run_gas_comparison.sh
🔧 Running eip2935GasComparison.s.sol script...
No files changed, compilation skipped
Warning: EIP-3855 is not supported in one or more of the RPCs used.
Unsupported Chain IDs: 80069.
Contracts deployed with a Solidity version equal or higher than 0.8.20 might not work properly
.                                                                                             For more information, please see https://eips.ethereum.org/EIPS/eip-3855
Traces:
  [507107] eip2935GasComparison::run()
    ├─ [0] VM::startBroadcast()
    │   └─ ← [Return]
    ├─ [412864] → new BlockhashConsumer@0x59ef61D43bdAF8B1257071a2035Ef5789f46463f
    │   └─ ← [Return] 2062 bytes of code
    ├─ [0] console::log("Consumer contract deployed at: %s", BlockhashConsumer: [0x59ef61D43bd
AF8B1257071a2035Ef5789f46463f]) [staticcall]                                                      │   └─ ← [Stop]
    ├─ [0] console::log("Current block: %s", 4867668 [4.867e6]) [staticcall]
    │   └─ ← [Stop]
    ├─ [22677] BlockhashConsumer::storeWithSSTORE(4867666 [4.867e6])
    │   └─ ← [Stop]
    ├─ [6497] BlockhashConsumer::readWithGet(4867666 [4.867e6]) [staticcall]
    │   ├─ [2225] 0x0000F90827F1C53a10cb7A02335B175320002935::00000000(00000000000000000000000
0000000000000000000000000004a4652) [staticcall]                                                   │   │   └─ ← [Return] 0x713825db1a93b11015ba43eb0eea7005c55c7b98375dda1961cc9c3c96d03c0b
    │   └─ ← [Return] 0x713825db1a93b11015ba43eb0eea7005c55c7b98375dda1961cc9c3c96d03c0b
    ├─ [22784] BlockhashConsumer::submitOracleBlockhash(4867666 [4.867e6], 0x713825db1a93b1101
5ba43eb0eea7005c55c7b98375dda1961cc9c3c96d03c0b)                                                  │   └─ ← [Stop]
    ├─ [0] VM::stopBroadcast()
    │   └─ ← [Return]
    └─ ← [Stop]


Script ran successfully.

== Logs ==
  Consumer contract deployed at: 0x59ef61D43bdAF8B1257071a2035Ef5789f46463f
  Current block: 4867668

## Setting up 1 EVM.
==========================
Simulated On-chain Traces:

  [412864] → new BlockhashConsumer@0x59ef61D43bdAF8B1257071a2035Ef5789f46463f
    └─ ← [Return] 2062 bytes of code

  [22677] BlockhashConsumer::storeWithSSTORE(4867666 [4.867e6])
    └─ ← [Stop]

  [22784] BlockhashConsumer::submitOracleBlockhash(4867666 [4.867e6], 0x713825db1a93b11015ba43
eb0eea7005c55c7b98375dda1961cc9c3c96d03c0b)                                                       └─ ← [Stop]


==========================

Chain 80069

Estimated gas price: 20.000000014 gwei

Estimated total gas used for script: 771474

Estimated amount required: 0.015429480010800636 BERA

==========================

##### berachain-bepolia
✅  [Success] Hash: 0x04112af6eee2ec29d1647353a2854e803d360856db00f7e65267bd5640958daa
Contract Address: 0x59ef61D43bdAF8B1257071a2035Ef5789f46463f
Block: 4867669
Paid: 0.009934880003477208 ETH (496744 gas * 20.000000007 gwei)


##### berachain-bepolia
✅  [Success] Hash: 0x08e8aa80c9e97fef47566f56215969536631228ba0f37fecd54bbb44fe5a6bd1
Block: 4867670
Paid: 0.000878100000307335 ETH (43905 gas * 20.000000007 gwei)


##### berachain-bepolia
✅  [Success] Hash: 0xa098ac84c403a04265ba3657a177382957547201eea8360564335e0a6b5fe4af
Block: 4867670
Paid: 0.000890480000311668 ETH (44524 gas * 20.000000007 gwei)

✅ Sequence #1 on berachain-bepolia | Total Paid: 0.011703460004096211 ETH (585173 gas * avg 2
0.000000007 gwei)

==========================

ONCHAIN EXECUTION COMPLETE & SUCCESSFUL.

Transactions saved to: ichiraku/guides/apps/eip-
2935-gas-comparison/broadcast/eip2935GasComparison.s.sol/80069/run-latest.json
Sensitive values saved to: ichiraku/guides/apps/
eip-2935-gas-comparison/cache/eip2935GasComparison.s.sol/80069/run-latest.json
✅ Script execution complete. Parsing gas usage...

📄 Table saved to gas_comparison.md


# EIP-2935 Gas Comparison

| Pattern                             | Methods Involved                         | Total Gas |
|-------------------------------------|------------------------------------------|-----------|
| Before EIP-2935: SSTORE pattern     | storeWithSSTORE(...)                     |     45354 |
| After EIP-2935: .get() access       | readWithGet(...)                         |      6497 |
| Before EIP-2935: Oracle pattern     | submitOracleBlockhash(...)               |     45568 |

```

### Step 5 - Understanding What the Script Does

The bash script, `run_gas_comparison.sh` deploys the `eip2935GasComparison.sol` contract on the locally ran anvil fork of Bepolia. It then goes through the results and tabulates the total gas expenses for each blockhashing method, including storing the blockhash or replicating the usage of an oracle.

### Step 6 - Highlevel Review of the Solidity File

This project demonstrates and benchmarks different blockhash access patterns. Below are categories we'll refer to and their details:

1. "Manual Method:" Manual SSTORE of blockhash (pre-EIP-2935 workaround) and direct SLOAD readback of stored hash
2. "2935 Method:" .get() call to a system contract as per EIP-2935
3. "Oracle Method:" Oracle-submitted blockhash pattern simulating offchain access

We'll go over a quick comparison of these methods that are in the file `eip2935GasComparison.sol`.

**Different Blockhash Access Patterns**

<!-- Outline the different methods and how they work. -->

_Manual Method_

Manual Method implementation simply involves storing a variable and calling upon it later. The key thing to note about this method is that it requires storing information onchain. Below is an example of carrying out this method:

```solidity
function storeWithSSTORE(uint256 blockNumber) external {
    stored[blockNumber] = blockhash(blockNumber);
}

function readWithSLOAD(uint256 blockNumber) external view returns (bytes32) {
    return stored[blockNumber];
}
```

In the example code used, the mapping `mapping(uint256 => bytes32) public stored;` is simply updated and queried for historic data.

_Oracle Method_

The Oracle Method implementation involves storing data onchain, where an onchain oracle passes data to a receiver. Similar to the "Manual Method," storage of the respective data is needed and is paid for / instigated by a user or contract.

```solidity
function submitOracleBlockhash(uint256 blockNumber, bytes32 hash) external {
    oracleHashes[blockNumber] = hash;
}

function readFromOracle(uint256 blockNumber) external view returns (bytes32) {
    return oracleHashes[blockNumber];
}
```

The example "Oracle Method" code shows a mapping `mapping(uint256 => bytes32) public oracleHashes` get updated and queried for historic data as well.

_The 2935 Method_

The 2935 Method is the new one that is the focus of this guide. There ought to only be one `systemContract` contract that is referred to on a network that has upgrades like Pectra or Bectra.

For Bepolia, it is at:

```solidity
address public constant systemContract = 0x0000F90827F1C53a10cb7A02335B175320002935;
```

The example implementation of it is shown below:

```solidity
function readWithGet(uint256 blockNumber) external view returns (bytes32 result) {
    if (blockNumber < (block.number - HISTORIC_SERVE_WINDOW)) revert PAST_HISTORY_SERVE_WINDOW();
    if ((blockNumber) > block.number) revert BEYOND_HISTORY_SERVE_WINDOW();

    bytes32 blockNumberBigEndian = bytes32(uint256(blockNumber));
    bytes memory rawCallData = abi.encodePacked(blockNumberBigEndian);
    (bool ok, bytes memory data) = systemContract.staticcall(rawCallData);
    require(ok, "EIP-2935 system contract call failed");
    require(data.length >= 32, "Input too short");
    assembly {
        result := mload(add(data, 32)) // skip length prefix
    }

    return result;
}
```

Let's break down what's happening and how it differs from the other methods:

1. `blockNumber` is checked because EIP-2935 only allows access to block hashes for the last 8,191 blocks (approximately 1 day), aka the `HISTORY_SERVE_WINDOW,` in protocol-maintained storage.

- If it is older or newer than block numbers outside of this range, then the returned blockHash will not be correct.

2. The `systemContract` requires a raw 32-byte uint256 block number as input. It needs to be prepared accordingly using typical solidity practices.
3. The `data.length` is checked because if that value does not make sense, it must be caught. This only occurs if querying blockHashes at blockNumbers outside of the `HISTORY_SERVE_WINDOW`

Overall, this method saves at least one SSTORE per use case, which can reduce total gas by 20,000+ per user interaction. Within an application, this of course can add up to massive savings over time.

> It is very important to note that the system contract only receives the `calldata`, and there is no specification of the function signature or anything. See the explaination below.

**Why the EIP-2935 System Contract Uses Raw Bytes**

It might seem strange that [the system contract is not verified and easily readible when looking on a block explorer.](https://bepolia.beratrail.io/address/0x0000F90827F1C53a10cb7A02335B175320002935/contract/80069/code) There are some key things to note in regards to this. The EIP-2935 system contract is a precompiled system contract inserted directly by the client at a fixed address. It does not follow standard Solidity conventions:

- It has no function selectors or ABI encoding
- It was not deployed via a transaction, so there is no verified source code
- It accepts a raw 32-byte uint256 block number as input
- It returns a raw 32-byte bytes32 blockhash as output

This low-level design avoids ABI overhead and enables efficient access to blockhashes, but requires manually encoding inputs when calling the contract.

Now that you have an understanding of EIP-2935 and what it brings to Berachain's developer experience, let's get into the guide and code itself for this guide.

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
