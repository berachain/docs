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
mv guides/apps/local-docker-devnet ./devnet;
rm -rf guides;
cd devnet;
```

Review the `env.sh` file, which contains important variables for running the docker-devnet and deposit testing.

**CHAIN_SPEC and CHAIN_ID** Are used to influence the configuration of the deployed `beacond`.
Valid values for **CHAIN_SPEC** are `mainnet`, `testnet` and `file`.
The `file` specification uses the `CHAIN_ID` to look up a chainspec file in `templates/beacond`.

In the provided example, we begin with the [Bepolia configuration](https://github.com/berachain/beacon-kit/blob/main/testing/networks/80069/spec.toml), and modify:

- `chain-id = 87337`
- `slots-per-epoch = 10` from 192
- `min-validator-withdrawability-delay = 4` instead of a 256-epoch delay
- `validator-set-cap = 3` instead of 69, to keep things interesting on our 4-node cluster

**CUSTOM_BIN_BEACOND**: Leave this blank to automatically use the latest released beacond.  
If you want a custom build of Beacon Kit, you need to compile it for Linux. This is easily done in a Vagrant:

```bash
brew install vagrant virtualbox
vagrant init bento/ubuntu-22.04
vagrant up
vagrant ssh
sudo apt update && sudo apt -y install build-essential
wget https://go.dev/dl/go1.23.8.linux-arm64.tar.gz
sudo tar xzvf go1.23.8.linux-arm64.tar.gz  -C /opt/
git clone https://github.com/berachain/beacon-kit && cd beacon-kit
git checkout v1.2.0.rc0
PATH=/opt/go/bin:$PATH && make build
```

**Host Terminal:**

```bash
# FROM: ~/devnet

vagrant plugin install vagrant-scp
vagrant scp default:beacon-kit/build/bin/beacond ./beacond-mine
```

Use this binary for `CUSTOM_BIN_BEACOND`.

Once you are happy with `env.sh`, build the Docker devnet images:

```bash
# FROM: ~/devnet

./build.sh;

# [Expected Result]:
# ...
# *** Build complete
```

### Step 2 - Start Containers & Monitor Chain Activity

Start the devnet:

```bash
# FROM: ~/devnet

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
# FROM: ~/devnet

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
```

Check block height:

```bash
curl -s --location 'http://localhost:3500/eth/v2/debug/beacon/states/head' | jq .data.latest_block_header.slot;

# [Expected Output - actual number will vary]:
# "0x12"
```

Check peering:

```bash
curl -s --location 'http://localhost:26657/net_info' | jq .result.n_peers;

# [Expected Output]:
# "3"
```

Monitor beacond logs for deposit, withdraw, exit requests and block generation:

```bash
docker ps | grep beacond;
# [SAMPLE OUTPUT]
# 0fcebd46b9d8   beacond-docker   Up 20 minutes   0.0.0.0:3500->3500/tcp, 0.0.0.0:26657->26657/tcp   cl-node-rpc-0
# ...

docker logs -f 0fcebd46b9d8 | egrep '(Commit|deposit|withdraw|exit');

# [Expected Output]:
# INFO Committed statee ... height=10
# INFO Building block body ... num_deposits=1
# INFO Processing partial withdrawal ...
```

Show the current status of your validator:

```bash
# FROM: ~/devnet
source env.sh;
COMETBFT_PUB_KEY=$(docker exec $CL_MONIKER-rpc-0 ./beacond deposit validator-keys|tail -1);
curl -s http://localhost:3500/eth/v1/beacon/states/head/validators | jq ".data[] | select(.validator.pubkey == \"$COMETBFT_PUB_KEY\")";
```

This will report the current block number:

```bash
# FROM: ~/devnet

curl -s --location 'http://localhost:3500/eth/v2/debug/beacon/states/head' | jq .data.latest_block_header.slot;

# [Expected Similar Output]:
# "0x10c"
```

Monitor the validator set, reporting every time it changes. Start this while performing the next sections:

**Terminal 2:**

```bash
URL="http://localhost:3500/eth/v1/beacon/states/head/validators"
TEMP_FILE="/tmp/url_content.tmp"
touch $TEMP_FILE

while true; do
  NEW=$(curl -s "$URL" | jq '.data')
  if ! cmp -s <(echo "$NEW") "$TEMP_FILE"; then
    date
    echo "$NEW" | tee "$TEMP_FILE"
  fi
  sleep 2
done
```

### Step 3 - Generate Deposit Scripts

Now invoke the deposit script to generate the deposit transactions (but do not transmit them). The script will provide two `cast` calls and a command to view the current validator set.
Recall that there are two types of deposits: 1) initial registration and 2) top-up. While multiple top-ups are possible, this script only performs one. Once the top-up exceeds the activation threshold of **{{ config.mainnet.minEffectiveBalance }} $BERA**, the validator will be activated at the end of the second epoch after the threshold is met.

**Terminal 1:**

```bash
# FROM: ~/devnet

./generate-deposit-tx.sh;

# [Expected Output]:
#Generating Signature for Parameters: ...
# ..	pubkey = 0xaee37b7ed9814aaa01c917484e2f5bb60583ff5ec5402611de6fd5c226007d4aead7e88a55b86cff61fb2cd17f405949

# Send this command to register the validator + deposit 10000 BERA:
# cast send ..
#
# Send this command to activate the validator by depositing 240000 BERA:
# cast send..
```

:::danger
Do not send these transactions as-is on mainnet, or you will burn your funds. The devnet genesis root differs from mainnet's, and the signature will be invalid on mainnet.
Study the registration and activation process in `generate-deposit-tx` and the [Deposit Guide](/nodes/guides/validator) to understand how to apply this process to mainnet.
:::

Your validator status monitor should show:

**Validator Watcher:**

```bash
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

**Terminal 1:**

```bash
# FROM: ~/devnet

cast call ...

# [Expected Output]:
# status               1 (success)
# blockNumber          52
# transactionHash      0xe0e8b0...
# status               1 (success)
```

**Log Watcher:**

```bash
INFO Found deposits on execution layer service=blockchain block=0x22 deposits=1
INFO Processed deposit to set Eth 1 deposit index service=state-processor previous=3 new=4
INFO Validator does not exist so creating service=state-processor pubkey=0x9687a... index=0x3 deposit_amount=0x9184e72a000
INFO Processed deposit to create new validator service=state-processor deposit_amount=10000 validator_index=0x3 withdrawal_epoch=0xffffffffffffffff
```

**Validator Watcher:**

```
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

Here is an example of a failed deposit, for instance by modifying the signed data before sending it:

:::danger
If you receive the error message `signer returned an invalid signature invalid deposit message`, DO NOT continue making deposits with the same pubkey as it will result in loss of funds. You will need to create an entirely new node pubkey and go through the process again.
:::

**Log Watcher:**

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

**Host Terminal:**

```bash
# FROM: ~/devnet

cast call ...

# [Expected Output]:
# blockNumber          55
# transactionHash      0xdeadbeef...
# status               1 (success)
```

**Validator State Watcher:**

```
#   {
#     "index": "3",
#     "balance": "250000000000000",
#     "status": "pending_initialized",
#     "validator": {
#       "effective_balance": "250000000000000",
#       "activation_eligibility_epoch": "18446744073709551615",
```

### Step 6 - Observe Activation

Note that in the above output, the chain has selected an activation epoch for the validator.

Continue to monitor the chain's progress. Over three complete 10-block epochs.

Upon activation, the validator status will change to `active_ongoing - which is fully active, and eligible to propose blocks. Note that one of the other validators will have been selected for eviction,
since the active set is limited to 3 validators.

### Step 7 - Send Withdrawal Transaction

Generate the withdrawal transactions similar to the way you generated deposit transactions:

```bash
# FROM: ~/devnet

./generate-withdraw-tx.sh

# [ EXPECTED OUTPUT ]
# RPC validator pubkey is 0xaee37...
# Determined withdrawal fee: 1
#
# To send withdrawal request for 10000 BERA:
# cast send ...
#
# To exit the validator and return BERA stake:
# cast send ...
```

You can now send the provided cast calls to, respectively, withdraw `10,000 $BERA`, or force the validator to exit.

### Step 8 - Send Exit Transaction

Using the provided call to exit the validator, you will see the validator state immediately changes to `exited_unslashed` state, meaning the validator
can no longer produce blocks.

After the required delay in epochs, the validator's remaining stake is returned at the status then rests at `withdrawal_done`.

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
