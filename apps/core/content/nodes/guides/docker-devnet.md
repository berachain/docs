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

This tutorial will walk you through launching a private network, and promoting one of the nodes in that network to a full validator.

:::tip
Some features like native dApps, contracts, and more may still be a work in progress.
:::

## Requirements

Before starting, ensure that you have the following installed on your computer.

- You should have read and understood the [validator activation process](/nodes/guides/validator)
- [Docker](https://docs.docker.com/get-docker/) `version 25.0.2` or greater
- [Foundry](https://book.getfoundry.sh/getting-started/installation) `v0.2.0` or greater

## Launch Local Devnet

We will now launch multiple Docker containers containing execution clients and consensus clients for a test chain initialized from genesis.

### Obtain the source and build

```bash
# FROM: ~

git clone https://github.com/berachain/guides;
mv guides/apps/docker-devnet ./
cd docker-devnet;
./build.sh;

# [EXPECTED OUTPUT]
# [DOCKER BUILD NOISES]
# *** Build complete
```

Review `env.sh`, which contains important variables for running the docker-devnet and deposit testing.

Start the devnet:

```bash
# FROM: ~/docker-devnet/

./start.sh

# [EXPECTED OUTPUT]
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

You can use `docker ps` to view the launched containers and verify the services are running:

```bash
# FROM: ~/docker-devnet/

docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}"

# [EXPECTED OUTPUT]
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

# [EXPECTED OUTPUT - actual number will vary]
# "0x12"

curl -s --location 'http://localhost:26657/net_info' | jq .result.n_peers;

# [EXPECTED OUTPUT]
# "3"
```

Start a log watcher in a separate window to view the deposit-related log messages:

```bash
# FROM: ~/docker-devnet

docker logs cl-node-val-2 -f | grep deposit

# [EXPECTED OUTPUT]
# INFO Building block body ... num_deposits=0
# INFO Building block body ... num_deposits=0
```

Now invoke the deposit script to generate the deposit transactions (but not transmit them). The script will provide two `cast` calls and a command to view the current validator set. 
Recall that there are two types of deposits: 1. initial registration and 2. top-up. While multiple top-ups are possible, this script only performs one. Once the top-up exceeds the activation threshold of **{{ config.mainnet.minEffectiveBalance }} $BERA**, the validator will be activated at the end of the second epoch after the threshold is met.

```bash
# FROM: ~/docker-devnet

./generate-deposit-tx.sh

# [EXPECTED OUTPUT]
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
Do not send these transactions as-is on mainnet, or you will burn your funds. The devnet genesis root is different from mainnet's, and the signature will be invalid on mainnet.
Study the registration and activation process in `generate-deposit-tx` and the [Deposit Guide](/nodes/guides/validator) to understand how to apply this process to mainnet.
:::

To view the current list of validators, invoke the provided command:

```bash
# FROM: ~/docker-devnet

curl -s http://localhost:3500/eth/v1/beacon/states/head/validators | jq .data
# [EXPECTED OUTPUT]
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

- **Status**: The validator status begins as `pending_initialized` when a deposit is registered. It changes to `pending_queued` when in the activation queue, and finally becomes `active_ongoing` when in the active set and able to propose blocks.
- **Effective Balance**: the amount staked to that validator
- **Activation Epochs**: when the validator is eligible to be activated. 0 means it's a genesis validator.

Now transmit the first `cast` call, which calls `deposit()` for the first time with an initial stake of `10,000 $BERA`, and view the validator list:

```bash
# FROM: ~/docker-devnet

cast call ...

# [EXPECTED OUTPUT]
# status               1 (success)
# blockNumber          52
# transactionHash      0xe0e8b0...
# status               1 (success)

curl -s http://localhost:3500/eth/v1/beacon/states/head/validators | jq .data

# [EXPECTED OUTPUT]
# [
#  {
#     "index": "0",
#     "balance": "10000000000000",
#     "status": "pending_initialized",
#     "validator": {
#       "effective_balance": "10000000000000",
#       "activation_eligibility_epoch": "0",
#       "activation_epoch": "0",
#     }
```

This shows the validator is registered. You will see output like this in the log watcher:

```bash
# [LOG OUTPUT]

INFO Found deposits on execution layer service=blockchain block=0x22 deposits=1
INFO Processed deposit to set Eth 1 deposit index service=state-processor previous=3 new=4
INFO Processed deposit to set Eth 1 deposit index service=state-processor previous=3 new=4
INFO Validator does not exist so creating service=state-processor pubkey=0x9687a... index=0x3 deposit_amount=0x9184e72a000
INFO Processed deposit to create new validator service=state-processor deposit_amount=10000 validator_index=0x3 withdrawal_epoch=0xffffffffffffffff
INFO Building block body with local deposits service=validator start_index=4 num_deposits=0
INFO Building block body with local deposits service=validator start_index=4 num_deposits=0
```

Now send the second suggested `cast` call which stakes an additional 240,000 $BERA, sufficient to put the validator into the activation queue.

```bash
# FROM: ~/docker-devnet

cast call ...

# [EXPECTED OUTPUT]
# blockNumber          55
# transactionHash      0xdeadbeef...
# status               1 (success)

curl -s http://localhost:3500/eth/v1/beacon/states/head/validators | jq .data

# [EXPECTED OUTPUT]
#   {
#     "index": "3",
#     "balance": "250000000000000",
#     "status": "pending_initialized",
#     "validator": {
#       "effective_balance": "250000000000000",
#       "activation_eligibility_epoch": "18446744073709551615",
```

Note the chain has selected an activation epoch for the validator.

Continue to monitor the chain's progress. Epochs on mainnet, testnet, and this devnet are 192 blocks, or 0xc0 hex.

```bash
# FROM: ~/devnet

curl -s --location 'http://localhost:3500/eth/v2/debug/beacon/states/head' | jq .data.latest_block_header.slot;
# [SAMPLE OUTPUT]
# "0x10c"
```

Provided you have activated before block 0xc0, at block 0x180, the validator will become status `pending_queued` and at block 0x240 will become `active_ongoing`.

## Cleanup

This action will destroy all running Docker containers on your system.

```bash
# FROM: ~/docker/devnet

./clean.sh

# [SAMPLE OUTPUT]
# Total reclaimed space: 644.1MB
```

:::tip
Cleaning removes the built Docker images, so you have to run `build.sh` before `start.sh`
:::
