---
head:
  - - meta
    - property: og:title
      content: Berachain Node Quickstart
  - - meta
    - name: description
      content: Setup a Berachain testnet node
  - - meta
    - property: og:description
      content: Setup a Berachain testnet node
---

<script setup>
  import config from '@berachain/config/constants.json';
  import AddNetwork from '@berachain/ui/AddNetwork';
  import CopyToClipboard from '@berachain/ui/CopyToClipboard';
</script>

# Berachain Run A Node Quickstart ⚡

This will walk you through on setting up a testnet `bArtio` RPC archive node with `beacond` consensus client and a `reth` execution client.

:::tip
**NOTE:**
At this time, testnet validator nodes need to be whitelisted and are onboarded when needed.
:::

## Requirements ⚙️

Before we begin, please make sure to have the following installed on your computer:

1. [Golang](https://go.dev/dl/) `v1.22.0` or greater
2. Meet the minimum system requirements
3. [Foundry](https://book.getfoundry.sh/getting-started/installation) (For Tests)

**Minimum Requirements:**

The following requirements are needed to run both the execution and consensus client.
It's recommended to run both clients on one machine for low latency communication between the two clients.

```
OS: Linux / MacOS
CPU Architecture: AMD64 or ARM64 / ARM64 Darwin
CPU: 8 Physical Cores
RAM: 48GB
Storage: 1TB
```

:::tip
If running as docker containers, make sure each docker container sufficient resources to add up to this total requirement
:::

## Build & Run From Source 🛠️

For this quickstart, we'll be building the consensus client from source.

:::tip
**NOTE:** Avoid running the execution client and/or consensus client in Vscode as it will be prone to crash. Please use a dedicated shell terminal.
:::

### Clone Repo & Verify Built Binary

First, start off by cloning the BeaconKit repository and then building it.

```bash
git clone https://github.com/berachain/beacon-kit;
cd beacon-kit;
make build;

# [Expected Output]:
# mkdir -p /path/to/beacon-kit/build/bin/
# Variables
# Building beacond/cmd
# ...
# go: downloading github.com/berachain/cosmos-sdk v0.46.0-beta2.0.20240624014538-75ba469b1881
```

This will build a local binary located in `./build/bin/beacond`.

Test that it's working correctly, with the following command:

```bash
# FROM: ./beacon-kit

./build/bin/beacond version;

# [Expected Output]:
# v0.2.0-alpha.1-172-g071b95a5
```

## Configure Consensus Client 🤝

This will walk the steps for setting up a `BeaconKit` consensus client.

### Step 1 - Initializing Beacon Node

Let's start by creating a temporary directory for our configurations. This can be custom, but to make it simple, we're going to create these folders to hold all our configuration and database data.

```bash
# FROM: ./beacon-kit

mkdir build/bin/config;
mkdir build/bin/config/beacond;
mkdir build/bin/config/reth;
```

Next, initialize your node with all the standard data.

```bash
# FROM: ./beacon-kit

# Replace <YOUR_MONIKER_NAME> with a name of your choice.
MONIKER_NAME=<YOUR_NODE_MONIKER>; # Ex: MONIKER_NAME=BingBongNode
./build/bin/beacond init $MONIKER_NAME --chain-id bartio-beacon-80084 --consensus-key-algo bls12_381 --home ./build/bin/config/beacond;
# Ex: ./build/bin/beacond init BingBongNode --chain-id bartio-beacon-80084 --consensus-key-algo bls12_381 --home ./build/bin/config/beacond;

# [Expected Output]:
# {
#  "moniker": "BingBongNode", // <YOUR_MONIKER_NAME>
#  "chain_id": "bartio-beacon-80084",
#  "node_id": "72e2e6f9d667898d32ede54de9b9299eb567f692",
#  "gentxs_dir": "",
# ...
```

You should be able to see the newly created files in the `./build/bin/config` folder:

:::warning
**IMPORTANT:** Make sure to securely backup your `priv_validator_key.json` file if running a **validator** node. This is the file that contains your validator's private key and is needed to sign blocks as your validator. If you lose this file, WE CANNOT HELP and you will have issues recovering your validator and its funds.
:::

```bash
# FROM: ./beacon-kit

tree build/bin/config/beacond;

# [Expected Output]:
# build/bin/config/beacond
# ├── config
# │   ├── app.toml
# │   ├── client.toml
# │   ├── config.toml
# │   ├── genesis.json
# │   ├── node_key.json
# │   └── priv_validator_key.json <---- BACK THIS UP
# └── data
#     └── priv_validator_state.json
```

### Step 2 - Add Configuration Files

Retrieve the genesis file by downloading it into the `config` folder:

```bash
# FROM: ./beacon-kit

curl -o "./build/bin/config/beacond/config/genesis.json" "https://raw.githubusercontent.com/berachain/beacon-kit/main/testing/networks/80084/genesis.json";

# [Expected Output]:
# % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
#                                  Dload  Upload   Total   Spent    Left  Speed
# 100 46860  100 46860    0     0   295k      0 --:--:-- --:--:-- --:--:--  293k
```

Double check the genesis file to make sure it resembles the following:

```bash
# FROM: ./beacon-kit

cat ./build/bin/config/beacond/genesis.json;

# [Expected Output]:
# {
#   "app_name": "beacond",
#   "app_version": "v0.2.0-alpha.0",
#   "genesis_time": "2024-06-05T14:00:00Z",
#   "chain_id": "bartio-beacon-80084",
#   "initial_height": 1,
#   "app_hash": null,
#   "app_state": {
# ...
```

Retrieve the kzg trusted setup:

```bash
# FROM: ./beacon-kit

curl -o "./build/bin/config/beacond/kzg-trusted-setup.json" "https://raw.githubusercontent.com/berachain/beacon-kit/main/testing/networks/80084/kzg-trusted-setup.json";

# [Expected Output]:
#   % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
#                                  Dload  Upload   Total   Spent    Left  Speed
# 100  436k  100  436k    0     0  2744k      0 --:--:-- --:--:-- --:--:-- 2747k
```

Retrieve up to data `app.toml` and `config.toml` from the [BeaconKit testnet repo](https://github.com/berachain/beacon-kit/tree/main/testing/networks/80084):

```bash
# FROM: ./beacon-kit

# app.toml
curl -o "./build/bin/config/beacond/config/app.toml" "https://raw.githubusercontent.com/berachain/beacon-kit/main/testing/networks/80084/app.toml";

# config.toml
curl -o "./build/bin/config/beacond/config/config.toml" "https://raw.githubusercontent.com/berachain/beacon-kit/main/testing/networks/80084/config.toml";
```

Modify the configurations by adding back the moniker name and peers.

```bash
# FROM: ./beacon-kit

# Rename the moniker
MONIKER_NAME=<YOUR_NODE_MONIKER>; # Ex: MONIKER_NAME=BingBongNode
sed -i '' "s/^moniker = \".*\"/moniker = \"$MONIKER_NAME\"/" "$PWD/build/bin/config/beacond/config/config.toml";

# set jwt.hex path
JWT_PATH=$PWD/build/bin/config/beacond/jwt.hex; # generating in next step
sed -i '' "s|^jwt-secret-path = \".*\"|jwt-secret-path = \"$JWT_PATH\"|" "$PWD/build/bin/config/beacond/config/app.toml";

# seeds
# - Comma separated list of seeds
seeds_url="https://raw.githubusercontent.com/berachain/beacon-kit/main/testing/networks/80084/cl-seeds.txt";
seeds=$(curl -s "$seeds_url" | tail -n +2 | tr '\n' ',' | sed 's/,$//');
sed -i '' "s/^seeds = \".*\"/seeds = \"$seeds\"/" "$PWD/build/bin/config/beacond/config/config.toml";

# persistent peers
# - Comma separated list of nodes to keep persistent connections to
sed -i '' "s/^persistent_peers = \".*\"/persistent_peers = \"$seeds\"/" "$PWD/build/bin/config/beacond/config/config.toml";
```

### Step 3 - Generate JWT Token

This will create a JSON Web Token that will allow the BeaconKit consensus client to communicate with EVM Execution Client.

To create a jwt token, run the following command:

```bash
# FROM: ./beacon-kit

./build/bin/beacond jwt generate -o ./build/bin/config/beacond/jwt.hex;

# [Expected Output]:
# Successfully wrote new JSON-RPC authentication secret to: ./build/bin/config/jwt.hex
```

This will create a jwt.hex. You can specify an optional path using the -o flag. If you do not specify the output location, it will be generated in your beacond config directory. For example like `/root/.beacond/config/jwt.hex`.

<!--
Download configuration files:

```bash
# FROM: ./beacon-kit

MONIKER_NAME=<YOUR_NODE_MONIKER>; # Ex: MONIKER_NAME=BingBongNode

# app.toml
curl -o "./build/bin/config/beacond/config/app.toml" "https://raw.githubusercontent.com/berachain/beacon-kit/main/testing/networks/80084/app.toml";

# config.toml
curl -o "./build/bin/config/beacond/config/config.toml" "https://raw.githubusercontent.com/berachain/beacon-kit/main/testing/networks/80084/config.toml";

# set jwt.hex path
JWT_PATH=$PWD/build/bin/config/beacond/jwt.hex;
sed -i '' "s|^jwt-secret-path = \".*\"|jwt-secret-path = \"$JWT_PATH\"|" "$PWD/build/bin/config/beacond/config/app.toml";

# Rename the moniker
sed -i '' "s/^moniker = \".*\"/moniker = \"$MONIKER_NAME\"/" "$PWD/build/bin/config/beacond/config/config.toml";

# seeds
# - Comma separated list of seeds
seeds_url="https://raw.githubusercontent.com/berachain/beacon-kit/main/testing/networks/80084/cl-seeds.txt";
seeds=$(curl -s "$seeds_url" | tail -n +2 | tr '\n' ',' | sed 's/,$//');
sed -i '' "s/^seeds = \".*\"/seeds = \"$seeds\"/" "$PWD/build/bin/config/beacond/config/config.toml";

# persistent peers
# - Comma separated list of nodes to keep persistent connections to
sed -i '' "s/^persistent_peers = \".*\"/persistent_peers = \"$seeds\"/" "$PWD/build/bin/config/beacond/config/config.toml";
``` -->

### Step 4 - Download Snapshot (Recommended)

This step is highly recommended to avoid waiting long sync times.

:::warning
Syncing from genesis can take multiple hours (potentially a few days), depending on your connection speed and number of peers.
:::

See the following for a list of snapshot links.

[Berachain Snapshots Repo](https://github.com/berachain/beacon-kit/blob/main/testing/networks/80084/snapshots.md)

To download a snapshot, create a directory and run the following:

```bash
# FROM: ./beacon-kit

mkdir snapshots;
curl -L EXAMPLE_SNAPSHOT_FILE.tar.lz4 > ./snapshots/EXAMPLE_SNAPSHOT_FILE.tar.lz4;

# [Example Output]:
#   % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
#                                  Dload  Upload   Total   Spent    Left  Speed
#   0 43.0G    0 78.1M    0     0  18.7M      0  0:39:07  0:00:04  0:39:03 18.7M
```

Once downloaded, decompress the file and verify the data.

```bash
# FROM: ./beacon-kit

# make a directory and download snapshots
mkdir snapshots/tmp;
mkdir snapshots/tmp/beacond;
mkdir snapshots/tmp/reth;
# curl ...

# unzip
# - beacond
lz4 -dc < ./snapshots/EXAMPLE_SNAPSHOT_BEACOND.tar.lz4 | tar xvf - -C ./snapshots/tmp/beacond;
# [Expected Output]:
# ...
# x data/application.db/012580.sst
# x data/application.db/012780.sst
# x data/application.db/012421.sst
# x data/application.db/012420.sst

# - reth
lz4 -dc < ./snapshots/EXAMPLE_SNAPSHOT_RETH.tar.lz4 | tar xvf - -C ./snapshots/tmp/reth;
# [Expected Output]:
# ...
# x static_files/static_file_transactions_0_499999
# x static_files/static_file_receipts_1000000_1499999.off
# x static_files/static_file_headers_0_499999
```

Snapshots should aim to have the following for both the `beacond` and `reth` (or equivalent for the respective evm execution client):

```bash
# ./snapshots/tmp/beacond - (needed folders & files)
# └── data
#     ├── application.db
#     ├── blobs
#     ├── blockstore.db
#     ├── cs.wal
#     ├── deposits.db
#     ├── evidence.db
#     ├── snapshots.db
#     ├── state.db
#     ├── tx_index.db
#     └── priv_validator_state.json
#
# ./snapshots/tmp/reth - (needed folders & files)
# ├── blobstore
# ├── db
# └── static_files
```

Once the folders and files have been verified move the snapshot data into the respective config folders.

```bash
# FROM: ./beacon-kit

# beacond
mv ./snapshots/tmp/beacond/data ./build/bin/config/beacond/data;

# reth
mv ./snapshots/tmp/reth/blobstore ./build/bin/config/reth/blobstore;
mv ./snapshots/tmp/reth/db ./build/bin/config/reth/db;
mv ./snapshots/tmp/reth/static_files ./build/bin/config/reth/static_files;
```

### Step 5 - Run Beacond

With the `config.toml` and `app.toml` files configured, run the following:

```bash
# FROM: ./beacon-kit

./build/bin/beacond start --home ./build/bin/config/beacond;

# [Expected Output]:
# ...
# INFO Starting service type=validator-updates-broker
# INFO Starting service type=engine-client
# INFO Initializing connection to the execution client... service=engine.client dial_url=http://localhost:8551
# INFO Waiting for execution client to start... 🍺🕔 service=engine.client dial_url=http://localhost:8551
# INFO Waiting for execution client to start... 🍺🕔 service=engine.client dial_url=http://localhost:8551
```

Your BeaconKit consensus client is configured and just need the execution client to start running.

## Configure Execution Client ⟠

Next up, we need pair an execution client with `beacond`.

:::details
**NOTE:** All ETH Execution Clients Are Supported!

However, some may require more configuration and fine tweaking than others to target our blocktime. For that reason, we currently most recommend the following:

- [Reth](https://github.com/paradigmxyz/reth)
- [Geth](https://github.com/ethereum/go-ethereum)
- [Erigon](https://github.com/ledgerwatch/erigon)
- [Besu](https://github.com/hyperledger/besu)
- [Nethermind](https://github.com/NethermindEth/nethermind)
- [EthereumJS](https://github.com/ethereumjs/ethereumjs-monorepo)
  :::

For the execution client, we'll be using [Reth](https://reth.rs).

In a new Terminal sessions, start by downloading the binary for MacOS (Apple Silicon):

:::warning
**NOTE:** While this quickstart demonstrates how to run on Apple Silicon, we do not recommend running a node on Apple Silicon for production.
:::

```bash
# FROM: ./beacon-kit

curl -L https://github.com/paradigmxyz/reth/releases/download/v1.0.3/reth-v1.0.3-x86_64-apple-darwin.tar.gz > reth-v1.0.3-x86_64-apple-darwin.tar.gz;
tar -xzvf reth-v1.0.3-x86_64-apple-darwin.tar.gz;

# # [Expected Output]:
#   % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
#                                  Dload  Upload   Total   Spent    Left  Speed
#   0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
# 100 20.6M  100 20.6M    0     0  47.5M      0 --:--:-- --:--:-- --:--:-- 47.5M
# x reth
```

Double check that `reth` is working correctly by running the following:

```bash
# FROM: ./beacon-kit

./reth --version;

# [Expected Output]:
# reth Version: 1.0.0
# Commit SHA: 31e2470
# Build Timestamp: 2024-06-24T10:26:24.880668000Z
# Build Features: jemalloc
# Build Profile: maxperf
```

### Step 1 - Configure Genesis

To start, download the eth genesis file from BeaconKit repository.

```bash
# FROM: ./beacon-kit

curl -o "./build/bin/config/reth/eth-genesis.json" "https://raw.githubusercontent.com/berachain/beacon-kit/main/testing/networks/80084/eth-genesis.json";

# [Expected Output]:
#   % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
#                                  Dload  Upload   Total   Spent    Left  Speed
# 100  7232  100  7232    0     0  42532      0 --:--:-- --:--:-- --:--:-- 42792
```

Double check the file resembles the following:

```bash
# FROM: ./beacon-kit

cat ./build/bin/config/reth/eth-genesis.json;

# [Expected Output]:
# {
#   "config": {
#     "chainId": 80084,
#     "homesteadBlock": 0,
#     "daoForkBlock": 0,
#     "daoForkSupport": true,
# ...
```

### Step 2 - Initiate Reth

Generate the remaining reth configuration files with the following:

```bash
# FROM: ./beacon-kit

./reth init --datadir ./build/bin/config/reth --chain=./build/bin/config/reth/eth-genesis.json;
```

### Step 3 - Run Reth Client

```bash
# retrieve bootnode
bootnodes_url="https://raw.githubusercontent.com/berachain/beacon-kit/main/testing/networks/80084/el-bootnodes.txt";
bootnodes=$(curl -s "$bootnodes_url" | grep '^enode://' | tr '\n' ',' | sed 's/,$//');

# run reth
./reth node --authrpc.jwtsecret=./build/bin/config/beacond/jwt.hex \
--chain=./build/bin/config/reth/eth-genesis.json \
--datadir=./build/bin/config/reth \
--port=30303 \
--http \
--http.addr=0.0.0.0 \
--http.api="eth,net,web3,txpool,debug" \
--http.port=8545 \
--http.corsdomain="*" \
--bootnodes=$bootnodes \
--trusted-peers=$bootnodes \
--ws \
--ws.addr=0.0.0.0 \
--ws.port=8546 \
--ws.origins="*" \
--authrpc.addr=0.0.0.0 \
--authrpc.port=8551 \
--log.file.directory=./build/bin/config/reth/logs \
--metrics=0.0.0.0:6060;

# [Expected Output]:
# INFO Initialized tracing, debug log directory: ./build/bin/config/reth/logs/80084
# INFO Starting reth version="1.0.0 (31e2470)"
# INFO Opening database path="./build/bin/config/reth/db"
# INFO Configuration loaded path="./build/bin/config/reth/reth.toml"
# INFO Adding trusted nodes
# INFO Verifying storage consistency.
# INFO Database opened
# INFO Starting metrics endpoint addr=0.0.0.0:6060
# ...
```

## Check Sync Status 🔄

To check on the sync status, in another terminal run the following:

```bash
# Don't have jq? `brew install jq`;
./build/bin/beacond --home=./build/bin/config/beacond status | jq;

# [Expected Output]:
# {
#   "node_info": {
#     "protocol_version": {
#       "p2p": "9",
#       "block": "11",
#       "app": "0"
#     },
#     "id": "3078798f76b4db03aca9c71dd3264c252e06dfbf",
#     "listen_addr": "tcp://0.0.0.0:26656",
#     "network": "bartio-beacon-80084",
#     "version": "1.0.0-rc1",
#     "channels": "40202122233038606100",
#     "moniker": "BingBongNode",
#     "other": {
#       "tx_index": "off",
#       "rpc_address": "tcp://127.0.0.1:26657"
#     }
#   },
#   "sync_info": {
#     "latest_block_hash": "A72E1C5BD31B0E14604BB6DBA5A313F5B17F78FEE482453D9ED703E49D0C059B",
#     "latest_app_hash": "FC649179895650C9B6EB4320A096F46D8882CAD3AAFEE1B0D997B338BDF31618",
#     "latest_block_height": "1126228", // [!code ++] <---- CURRENT NETWORK BLOCK
#     "latest_block_time": "2024-07-05T03:50:15.349853738Z",
#     "earliest_block_hash": "F10DEBCEF3E370F813E93BD8BBFA3DAC0392E6C3E9A8A63871E932ACDE44EE1F",
#     "earliest_app_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
#     "earliest_block_height": "1",
#     "earliest_block_time": "2024-06-05T14:00:00Z",
#     "catching_up": false  // [!code ++] <---- IF `true` = STILL SYNCING
#   },
#   "validator_info": {
#     "address": "74F0F7AC6C37306E765487F8C43F01059EE28391",
#     "pub_key": {
#       "type": "cometbft/PubKeyBls12_381",
#       "value": "i/z8e0Fz1+EiW1YGe9wdqCuAM9sny3r8s4gpjLlDHGFQfv36Vffq/+KoCJKuGRT8"
#     },
#     "voting_power": "0"
#   }
# }
```

## Testing Local RPC Node ✅

Now that we have our now, let's go through a few steps to verify that the network is working currently but performing a few RPC requests, and deploying a contract.

:::info
Make sure that your node is fully synced before proceeding with these steps.
:::

### Get Current Block Number

```bash
curl --location 'http://localhost:8545' \
--header 'Content-Type: application/json' \
--data '{
	"jsonrpc":"2.0",
	"method":"eth_blockNumber",
	"params":[],
	"id":83
}';

# [Expected Output]:
# {
#     "jsonrpc": "2.0",
#     "result": "0xfae90",
#     "id": 83
# }
```
