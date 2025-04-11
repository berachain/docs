---
head:
  - - meta
    - property: og:title
      content: Berachain Local Devnet With Docker
  - - meta
    - name: description
      content: Set up a local Berachain devnet with Docker
  - - meta
    - property: og:description
      content: Set up a local Berachain devnet with Docker
---

<script setup>
  import config from '@berachain/config/constants.json';
  import AddNetwork from '@berachain/ui/AddNetwork';
  import CopyToClipboard from '@berachain/ui/CopyToClipboard';
</script>

# Berachain Local Devnet With Docker

This tutorial will walk you through launching a private local network and promoting one of the nodes in that network to a full validator.

:::tip
Some features like native dApps, contracts, and more are still a work in progress.
:::

## Requirements

Before starting, ensure that you have the following installed on your computer:

- Have read and understood the [validator activation process](/nodes/guides/validator)
- [Docker](https://docs.docker.com/get-docker/) `version 25.0.2` or greater
- [Foundry](https://book.getfoundry.sh/getting-started/installation) `v1.0.0` or greater
- MacOS - This script is made for Mac but can be modified to work with Linux

## Launch Local Devnet

We will now launch multiple Docker containers that contain execution and consensus clients for a test chain initialized from genesis.

### Step 1 - Obtain & Build Source

```bash
# FROM: ~

git clone https://github.com/berachain/guides;
mv guides/apps/local-docker-devnet ./;
rm -rf guides;
cd local-docker-devnet;
./build.sh;

# [Expected Result]:
# ...
# *** Build complete
```

### Step 2 - Start Containers

Review the `env.sh` file, which contains important variables for running the docker-devnet and deposit testing.

Start the devnet:

```bash
# FROM: ~/local-docker-devnet/

./start.sh;

# [Expected Output]:
# Starting Beacond...
# 0 - Creating config folders...
# 1 - Creating node configurations...
# 2 - Creating eth genesis file...
# 3 - Modifying genesis with deposits...
# 4 - Adding configurations files...
# 5 - Creating rpc cl nodes...
# 6 - Creating reth configurations...
# 7 - Starting docker containers...
# 8 - Connecting containers to networks...
# 9 - Connecting EL Peers...
# ...
# Started!
```

Use `docker ps` to view the launched containers and verify that the services are running:

```bash
# FROM: ~/local-docker-devnet/

docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}";

# [Expected Output]:
# NAMES           IMAGE            STATUS         PORTS
# el-node-rpc-0   reth-docker      Up 2 minutes   0.0.0.0:8545-8546->8545-8546/tcp
# el-node-val-2   reth-docker      Up 2 minutes
# el-node-val-1   reth-docker      Up 2 minutes
# el-node-val-0   reth-docker      Up 2 minutes
# cl-node-rpc-0   beacond-docker   Up 2 minutes   0.0.0.0:3500->3500/tcp, 0.0.0.0:26657->26657/tcp
# cl-node-val-2   beacond-docker   Up 2 minutes
# cl-node-val-1   beacond-docker   Up 2 minutes
# cl-node-val-0   beacond-docker   Up 2 minutes

curl -s --location 'http://localhost:3500/eth/v2/debug/beacon/states/head' | jq .data.latest_block_header.slot;

# [Expected Output - actual number will vary]:
# "0x12"

curl -s --location 'http://localhost:26657/net_info' | jq .result.n_peers;

# [Expected Output]:
# "3"
```

Start a log watcher in a separate terminal window to view deposit-related log messages:

**Terminal 1:**

```bash
# FROM: ~/local-docker-devnet

docker logs cl-node-val-2 -f | grep deposit;

# [Expected Output]:
# INFO Building block body ... num_deposits=0
# INFO Building block body ... num_deposits=0
```

### Step 3 - Generate Deposit Scripts

Now invoke the deposit script to generate the deposit transactions (but do not transmit them). The script will provide two `cast` calls and a command to view the current validator set.
Recall that there are two types of deposits: 1) initial registration and 2) top-up. While multiple top-ups are possible, this script only performs one. Once the top-up exceeds the activation threshold of **{{ config.mainnet.minEffectiveBalance }} $BERA**, the validator will be activated at the end of the second epoch after the threshold is met.

**Terminal 2:**

```bash
# FROM: ~/local-docker-devnet

./generate-deposit-tx.sh;

# [Expected Output]:
# Starting Beacon Deposit Txn...
# 0 - Retrieving Validator Pubkey & Verifying Not A Validator...
# 1 - Generating Signature for Parameters:
# Send this command to view validators:
#  curl -s http://localhost:3500/eth/v1/beacon/states/head/validators | jq .data
#
# 2 - Preparing Registration Deposit Transaction...
# Send this command to register the validator:
# cast send ...
#
# Preparing Activation Deposit Transaction...
# Send this command to activate the validator:
# cast send ...
```

:::danger
Do not send these transactions as-is on mainnet, or you will burn your funds. The devnet genesis root differs from mainnet's, and the signature will be invalid on mainnet.
Study the registration and activation process in `generate-deposit-tx` and the [Deposit Guide](/nodes/guides/validator) to understand how to apply this process to mainnet.
:::

To view the current list of validators, invoke the provided command:

**Terminal 2:**

```bash
# FROM: ~/local-docker-devnet

curl -s http://localhost:3500/eth/v1/beacon/states/head/validators | jq .data;

# [Expected Output]:
# [
#  {
#     "index": "0",
#     "balance": "250000000000000",
#     "status": "active_ongoing",
#     "validator": {
#       "effective_balance": "250000000000000",
#       "activation_eligibility_epoch": "0",
#       "activation_epoch": "0",
#     }
#   },
# [ 2 more]
#
```

Key values:

- **Status**: The validator status begins as `pending_initialized` when a deposit is registered. It changes to `pending_queued` when in the activation queue, and finally becomes `active_ongoing` when the validator is in the active set and able to propose blocks.
- **Effective Balance**: The amount of $BERA staked by that validator.
- **Activation Epochs**: The epoch when the validator is eligible to be activated. A value of 0 means it's a genesis validator.

### Step 4 - Run Registration Deposit Transaction

Now transmit the first `cast` call, which calls `deposit()` for the first time with an initial stake of `10,000 $BERA` and view the validator list:

**Terminal 2:**

```bash
# FROM: ~/local-docker-devnet

cast call ...

# [Expected Output]:
# status               1 (success)
# blockNumber          52
# transactionHash      0xe0e8b0...
# status               1 (success)

source env.sh;
COMETBFT_PUB_KEY=$(docker exec $CL_MONIKER-rpc-0 ./beacond deposit validator-keys|tail -1);
curl -s http://localhost:3500/eth/v1/beacon/states/head/validators | jq ".data[] | select(.validator.pubkey == \"$COMETBFT_PUB_KEY\")";

# [Expected Output]:
#  {
#     "index": "0",
#     "balance": "10000000000000",
#     "status": "pending_initialized",
#     "validator": {
#       "effective_balance": "10000000000000",
#       "activation_eligibility_epoch": "0",
#       "activation_epoch": "0",
#       "exit_epoch": "18446744073709551615",
#       "withdrawable_epoch": "18446744073709551615"
#     }
#  }
```

This shows the validator is registered. You will see a successful output in the log watcher:

**Terminal 1:**

```bash
# [LOG OUTPUT - Successful Registration]

INFO Found deposits on execution layer service=blockchain block=0x22 deposits=1
INFO Processed deposit to set Eth 1 deposit index service=state-processor previous=3 new=4
INFO Processed deposit to set Eth 1 deposit index service=state-processor previous=3 new=4
INFO Validator does not exist so creating service=state-processor pubkey=0x9687a... index=0x3 deposit_amount=0x9184e72a000
INFO Processed deposit to create new validator service=state-processor deposit_amount=10000 validator_index=0x3 withdrawal_epoch=0xffffffffffffffff
INFO Building block body with local deposits service=validator start_index=4 num_deposits=0
INFO Building block body with local deposits service=validator start_index=4 num_deposits=0
```

Here is an example of a failed deposit:

:::danger
If you receive the error message `signer returned an invalid signature invalid deposit message`, DO NOT continue making deposits with the same pubkey as it will result in loss of funds. You will need to create an entirely new node pubkey and go through the process again.
:::

**Terminal 1:**

```bash
# [LOG OUTPUT - Failed Registration]

INFO Found deposits on execution layer service=blockchain block=0xf deposits=1
INFO Processed deposit to set Eth 1 deposit index service=state-processor previous=3 new=4
INFO Validator does not exist so creating service=state-processor pubkey=0xa4bd74c3705152c8022800e0728f0a8083c0672e957f19947a69435563b56e324643a9cb46adbc0afd9b4851ba2ea0ac index=0x3 deposit_amount=0x9188a0d6a00
WARN failed deposit signature verification service=state-processor pubkey=0xa4bd74c3705152c8022800e0728f0a8083c0672e957f19947a69435563b56e324643a9cb46adbc0afd9b4851ba2ea0ac deposit_index=0x3 amount_gwei=10001000000000 error=signer returned an invalid signature
invalid deposit message
INFO Processed deposit to set Eth 1 deposit index service=state-processor previous=3 new=4
INFO Validator does not exist so creating service=state-processor pubkey=0xa4bd74c3705152c8022800e0728f0a8083c0672e957f19947a69435563b56e324643a9cb46adbc0afd9b4851ba2ea0ac index=0x3 deposit_amount=0x9188a0d6a00
WARN failed deposit signature verification service=state-processor pubkey=0xa4bd74c3705152c8022800e0728f0a8083c0672e957f19947a69435563b56e324643a9cb46adbc0afd9b4851ba2ea0ac deposit_index=0x3 amount_gwei=10001000000000 error=signer returned an invalid signature
invalid deposit message
```

### Step 5 - Run Activation Deposit Transaction

Now send the second suggested `cast` call, which stakes an additional 240,000 $BERA, sufficient to put the validator into the activation queue.

**Terminal 2:**

```bash
# FROM: ~/local-docker-devnet

cast call ...

# [Expected Output]:
# blockNumber          55
# transactionHash      0xdeadbeef...
# status               1 (success)

source env.sh;
COMETBFT_PUB_KEY=$(docker exec $CL_MONIKER-rpc-0 ./beacond deposit validator-keys|tail -1);
curl -s http://localhost:3500/eth/v1/beacon/states/head/validators | jq ".data[] | select(.validator.pubkey == \"$COMETBFT_PUB_KEY\")";

# [Expected Output]:
#   {
#     "index": "3",
#     "balance": "250000000000000",
#     "status": "pending_initialized",
#     "validator": {
#       "effective_balance": "250000000000000",
#       "activation_eligibility_epoch": "18446744073709551615",
```

### Step 6 - Monitor Activation Status

Note that the chain has selected an activation epoch for the validator.

Continue to monitor the chain's progress. Epochs on mainnet, testnet, and this devnet consist of 192 blocks, or 0xc0 in hex.

**Terminal 2:**

```bash
# FROM: ~/devnet

curl -s --location 'http://localhost:3500/eth/v2/debug/beacon/states/head' | jq .data.latest_block_header.slot;

# [Expected Similar Output]:
# "0x10c"
```

Provided you have activated before block 0xc0, at block 0x180, the validator will change status to `pending_queued` and at block 0x240 will change to `active_ongoing`.

The estimated time for changing states is as follows:

- After ~7 minutes: `pending_initialized` → `pending_queued`
- After ~12 minutes: `pending_queued` → `active_ongoing` (Validator becomes fully activated and begins proposing blocks)

## Cleanup

This action will destroy all running Docker containers on your system when executed.

:::tip
Cleaning removes the built Docker images, so you will have to run `build.sh` before `start.sh`.
:::

**Terminal 2:**

```bash
# FROM: ~/docker/devnet

./clean.sh

# [Example Similiar Output]:
# Shutting down docker containers:
# el-node-val-0
# cl-node-val-0
# el-node-val-1
# ...
```
