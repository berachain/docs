---
head:
  - - meta
    - property: og:title
      content: Run A Validator Node on Berachain
  - - meta
    - name: description
      content: How to run a validator node on Berachain
  - - meta
    - property: og:description
      content: How to run a validator node on Berachain
---

# Run A Validator Node On Berachain

This guide will walk you through the process of running a validator node on Berachain.

## Requirements

- Run Full Node & Fully Synced - See [Quickstart](/nodes/quickstart)
- [Foundry](https://book.getfoundry.sh/getting-started/installation)
- Berachain Wallet Address with a minimum of 250,000 $BERA (or the current minimum to meet the Active Set) + gas to process the transaction

## Becoming A Validator

These are the steps to perform to become a validator.

:::warning
You must have a node that is fully synced prior to running these steps.
:::

### Step 1 - Configuration File

Create a configuration file with a set of environment variables.

```bash
# FROM: / (The same directory as your `beacond` binary)

touch env;
```

Replace the correct values in this new `env` file.

**File:** `./env`

```bash
# Wallet Configuration
YOUR_ETH_WALLET_PRIVATE_KEY="<YOUR_ETH_WALLET_PRIVATE_KEY>"

# BeaconKit Configuration - Example `$HOME/.beacond` or `/.beacond`
YOUR_BEACOND_HOME_DIR="<YOUR_BEACOND_HOME_DIRECTORY>"

# Your RPC URL - typically localhost if in the same instance / environment
YOUR_ETH_RPC_URL="http://localhost:8545"

# Wallet address - Can be the same from private key
YOUR_VALIDATOR_OPERATOR_ADDRESS="<0xYOUR_ETH_WALLET_ADDRESS>"

# This can be the same as your wallet address for the VALIDATOR_OPERATOR_ADDRESS
YOUR_VALIDATOR_WITHDRAW_CRED_ADDRESS="<0xYOUR_VALIDATOR_WITHDRAW_CRED_ADDRESS>"

# Genesis Configurations - DO NOT CHANGE THESE
GENESIS_VALIDATORS_ROOT="0x053397d1ddb01f3910e91ef762070a075e4b17ba3472c3c4dd391a68bd5d95a1"
GENESIS_FORK_VERSION="0x04000000"
VAL_DEPOSIT_GWEI_AMOUNT=32000000000 # Adjust this amount to be the minimum amount of $BERA mentioned in Requirements
DEPOSIT_CONTRACT_ADDRESS="0x4242424242424242424242424242424242424242"

# Validator Configuration - DO NOT CHANGE THESE
OUTPUT=$(./beacond deposit create-validator $YOUR_VALIDATOR_WITHDRAW_CRED_ADDRESS $VAL_DEPOSIT_GWEI_AMOUNT $GENESIS_FORK_VERSION $GENESIS_VALIDATORS_ROOT --home $YOUR_BEACOND_HOME_DIR);
VAL_PUB_KEY=$(echo "$OUTPUT" | awk -F'pubkey=' '{print $2}' | awk '{print $1}' |
 sed -r 's/\x1B\[[0-9;]*[mK]//g');
SEND_DEPOSIT_SIGNATURE=$(echo "$output" | awk -F'signature=' '{print $2}' | awk '{print $1}' | sed -r 's/\x1B\[[0-9;]*[mK]//g');
VAL_WITHDRAW_CREDENTIAL=$(echo "$OUTPUT" | awk -F'credentials=' '{print $2}' | awk '{print $1}' | sed -r 's/\x1B\[[0-9;]*[mK]//g');
```

### Step 2 - Perform Deposit To Become Active Validator

```bash
# FROM: / (The same directory as your `beacond` binary)

# Load values into environment variables
source env;

# Perform deposit
cast send "$DEPOSIT_CONTRACT_ADDRESS" \
'deposit(bytes,bytes,bytes,address)' \
"$VAL_PUB_KEY" \
"$VAL_WITHDRAW_CREDENTIAL" \
"$SEND_DEPOSIT_SIGNATURE" \
"$YOUR_VALIDATOR_OPERATOR_ADDRESS" \
--private-key "$YOUR_ETH_WALLET_PRIVATE_KEY" \
--value 32ether \
-r $YOUR_ETH_RPC_URL;

# [Expected Successful Output]:
# blockHash               0xf70...
# blockNumber             1542...
# contractAddress
# cumulativeGasUsed       1817228
# effectiveGasPrice       5247018757
# from                    0xYOUR_VALIDATOR_OPERATOR_ADDRESS
# gasUsed                 69241
# logs                    [{"address":"0x4242424242424242424242424242424242424242","topics":
# # ...
# root
# status                  1 (success)
# transactionHash         0x...
# transactionIndex        4
# type                    2
# blobGasPrice
# blobGasUsed
# authorizationList
# to                      0x4242424242424242424242424242424242424242
```

You can double check that your validator has become an operator by running the following command:

```bash
# FROM: /

cast call 0x4242424242424242424242424242424242424242 "getOperator(bytes calldata pubkey)" "$VAL_PUB_KEY" --rpc-url $YOUR_BERA_RPC_URL;

# [Expected Similar Output]:
# 0xYOUR_VALIDATOR_OPERATOR_ADDRESS
```

Additionally, monitor your validator operator address to see $BGT that has been accrued.

## Steps After Becoming A Validator

Perform the following steps after becoming a validator.

### Step 1 - Add To Default Validator List

Make a PR to the following Github repository to add your validator to the default validator list.

[https://github.com/berachain/default-lists](https://github.com/berachain/default-lists)

```json
{
  "id": "<YOUR_VALIDATOR_PUBKEY>",
  "logoURI": "<PNG_OR_JPG_URL_OF_YOUR_VALIDATOR>",
  "name": "<VALIDATOR_NAME>",
  "description": "<VALIDATOR_DESCRIPTION>",
  "website": "<VALIDATOR_WEBSITE_URL>",
  "twitter": "<VALIDATOR_TWITTER_URL>"
}
```

### Step 2 - Send Berachain Team Wallet Addresses

Reach out to the Berachain team with your `YOUR_VALIDATOR_OPERATOR_ADDRESS` and `YOUR_VALIDATOR_WITHDRAW_CRED_ADDRESS` to aid with better metrics.

### Step 3 - Send Berachain Your CometBFT Address

Reach out to the Berachain team with your CometBFT address found in your `priv_validator_key.json` file.

This is the 40 character address found in your `priv_validator_key.json` file.

You can get this by looking at the file or running the following:

```bash
# FROM: /

# OR /path/to/$HOME/config/priv_validator_key.json
cat ./.beacond/config/priv_validator_key.json | jq -r ".address";

# [Expected Similat Address]
# A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0
```
