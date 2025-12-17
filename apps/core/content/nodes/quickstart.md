---
head:
  - - meta
    - property: og:title
      content: Berachain Node Quickstart
  - - meta
    - name: description
      content: Setup a Berachain Node
  - - meta
    - property: og:description
      content: Setup a Berachain Node
---

<script setup>
  import CopyToClipboard from '@berachain/ui/CopyToClipboard';
</script>

# Berachain Node Quickstart

This guide will walk you through setting up an RPC node on a Linux or Mac computer. If you want to operate Berachain in a production environment, this guide will help you learn how the final system will operate.

For true production deployments, consider using the docker images accompanying our releases, or [the community-maintained ansible scripts](https://github.com/RhinoStake/ansible-berachain).

## Configurations

This quickstart describes both **mainnet** and **Bepolia** deployments. There are certain scenarios, specifically experimenting with validator and beacon-chain technology, where you're better off with a [local devnet from Beacon-Kit source](/nodes/kurtosis).

The scripts use a number of environment variables, created in `env.sh`, to store configuration preferences. Each execution client has its own approach to configuration, reflected in its `setup` and `run` scripts.

### Hardware Requirements

The following are required to run both the execution and consensus clients:

- **OS**: Linux AMD64, Linux ARM64
- **CPU**: 4 Physical Cores
- **RAM**: 16GB
- **Storage**: 1TB minimum; more for a long-term installation
- **Storage performance:** Local SSD or on-instance storage is best; for network volumes, provision at least 1000 IOPS

### Software Requirements

You need [Beacon Kit](https://github.com/berachain/beacon-kit/releases) and one of either [Bera-Reth](https://github.com/berachain/bera-reth/releases) or [Bera-Geth](https://github.com/berachain/bera-geth/releases). [Consult this page](/nodes/evm-execution) for the recommended versions of Beacon Kit and execution clients.

These clients are easily compiled for experiments on a laptop.
### Community RPC Providers
To interact with the network without running your own full node, you can use community-supported endpoints:

| Provider | Endpoint URL |
| :--- | :--- |
| **dRPC** | `https://berachain.drpc.org` |
## 1 - Download and Configure

Make an area to work in. If you're a Unix traditionalist, choose `/opt/beranode`. Then, clone the berachain node scripts.

```bash
# FROM: $HOME

mkdir beranode;
cd beranode;
git clone https://github.com/berachain/guides;
mv guides/apps/node-scripts/* ./;
rm -r guides;
ls;

# [Expected output, edited for clarity]
# README.md	                  run-geth.sh     setup-geth.sh
# env.sh                      run-reth.sh     setup-reth.sh
# fetch-berachain-params.sh	  run-beacond.sh  setup-beacond.sh
```

The file `env.sh` contains environment variables used in the other scripts.
`fetch-berachain-params.sh` obtains copies of the genesis file and other configuration files.
Then we have `setup-` and `run-` scripts for various execution clients and `beacond`.

**File:** `./env.sh` (simplified)

```bash
#!/bin/bash

# CHANGE THESE VALUES
export CHAIN_SPEC=mainnet   # or "testnet"
export MONIKER_NAME=camembera
export WALLET_ADDRESS_FEE_RECIPIENT=0x8b30eb59e9b2354825503d5e60845eb41d4caf36
export EL_ARCHIVE_NODE=false # set to true if you want to run an archive node on CL and EL
export MY_IP=`curl -s canhazip.com`

# VALUES YOU MIGHT WANT TO CHANGE
export LOG_DIR=$(pwd)/logs
export JWT_PATH=$BEACOND_CONFIG/jwt.hex
export BEACOND_BIN=$(command -v beacond || echo $(pwd)/beacond)
export BEACOND_DATA=$(pwd)/var/beacond
export RETH_BIN=$(command -v bera-reth || echo $(pwd)/bera-reth)
export GETH_BIN=$(command -v bera-geth || echo $(pwd)/bera-geth)
```

You need to set these constants:

1. **CHAIN_SPEC**: Set to `testnet` or `mainnet`.
2. **MONIKER_NAME**: Should be a name of your choice for your node.
3. **WALLET_ADDRESS_FEE_RECIPIENT**: This is the address that will receive the priority fees for blocks sealed by your node. If your node will not be a validator, this won't matter.
4. **EL_ARCHIVE_NODE**: Set to `true` if you want the execution client to be a full archive node.
5. **MY_IP**: This sets the IP address your chain clients advertise to other peers on the network. If you leave it blank, `geth` and `reth` will discover the address with UPnP (if you are behind a NAT gateway) or assign the node's ethernet IP (which is OK if your computer is directly on the internet and has a public IP). In a cloud environment such as AWS or GCP where you are behind a NAT gateway, you **must** specify this address or allow the default `curl canhazip.com` to auto-detect it.

You should verify these constants:

- **LOG_DIR**: This directory stores log files.
- **BEACOND_BIN**: Set this to the full path where you installed `beacond`. The expression provided finds it in your $PATH.
- **BEACOND_DATA**: Set this to where the consensus data and config should be kept. `BEACOND_CONFIG` must be under `BEACOND_PATH` as shown. Don't change it.
- **RETH_BIN** or other chain client: Set this to the full path where you installed the chain client. The expression provided finds it in your $PATH.
- **CL_ETHRPC_PORT and EL_ETHRPC_PORT** are important for the exchange of consensus and transaction activity. We recommend these to be open for incoming connections on the advertised `MY_IP`.

## 2 - Fetch Parameters

The `fetch-berachain-params.sh` script downloads the key network parameters for the chain you have configured. Invoke the script as follows to download the files and verify their integrity:

```bash
# FROM: ~/beranode

./fetch-berachain-params.sh;

# [Expected Output for mainnet - must match]:
# 77bc26d81f1c8c16070d3b641428901f  seed-data-80094/eth-genesis.json
# 2deeecfe9ac40d6a8cced45cca3bf0bc  seed-data-80094/eth-nether-genesis.json
# c66dbea5ee3889e1d0a11f856f1ab9f0  seed-data-80094/genesis.json
# 5d0d482758117af8dfc20e1d52c31eef  seed-data-80094/kzg-trusted-setup.json

# [Expected Output for bepolia - must match]
# 9e32b2a1a5eb434d7b2fbaa27752b751  seed-data-80069/eth-genesis.json
# 04e689193d6506f36abf98c23b75a07e  seed-data-80069/eth-nether-genesis.json
# a24fb9c7ddf3ebd557300e989d44b619  seed-data-80069/genesis.json
# 5d0d482758117af8dfc20e1d52c31eef  seed-data-80069/kzg-trusted-setup.json
```

Check the signatures above against your results. Further confirmation of the consequences of these signatures is below.

## 3 - Set Up Beacon-Kit

The script `setup-beacond.sh` invokes `beacond init` and `beacond jwt generate`. This script:

1. runs `beacond init` to create the file `var/beacond/config/priv_validator_key.json`. This contains your node's private key, and especially if you intend to become a validator, this file should be kept safe. It cannot be regenerated, and losing it means you will not be able to participate in the consensus process.
2. runs `beacond jwt generate` to create the file `jwt.hex`. This contains a secret shared between the consensus client and execution client so they can securely communicate. Protect this file. If you suspect it has been leaked, delete it then generate a new one with `beacond jwt generate -o $JWT_PATH`.
3. rewrites the `beacond` configuration files to reflect settings chosen in `env.sh`.
4. places the mainnet parameters, fetched above, where Beacon-Kit expects them and shows you an important hash from the genesis file.

```bash
# FROM: ~/beranode

./setup-beacond.sh;

# expected output:
# BEACOND_DATA: /.../var/beacond
# BEACOND_BIN: /.../bin/beacond
#   Version: v1.1.3
# ✓ Private validator key generated in .../priv_validator_key.json
# ✓ JWT secret generated at [...]config]/jwt.hex
# ✓ Config files in [...]beacond/config updated
# [BEPOLIA] Genesis validator root: 0x3cbcf75b02fe4750c592f1c1ff8b5500a74406f80f038e9ff250e2e294c5615e
# [MAINNET] Genesis validator root: 0xdf609e3b062842c6425ff716aec2d2092c46455d9b2e1a2c9e32c6ba63ff0bda
# ✓ Beacon-Kit set up. Confirm genesis root is correct.
```

Your validator state root **must** agree with the value shown above for your chosen chain.

## 4 - Set Up the Execution Client

The `setup-reth` and `setup-geth` scripts create a runtime directory and configuration for their respective chain clients. The scripts configure the node with pruning settings according to the `EL_ARCHIVE_NODE` setting in `env.sh`.

Here's an example of `setup-reth`:

```bash
# FROM: ~/beranode

./setup-reth.sh;

# [Expected Output]:
# INFO Initialized tracing
# INFO reth init starting
# INFO Opening storage db_path="/.../reth/db" sf_path="/.../reth/static_files"
# INFO Verifying storage consistency.
# INFO [BEPOLIA] Genesis block written hash=0x0207661de38f0e54ba91c8286096e72486784c79dc6a9681fc486b38335c042f
# INFO [MAINNET] Genesis block written hash=0xd57819422128da1c44339fc7956662378c17e2213e669b427ac91cd11dfcfb38
# ✓ bera-reth set up.
```

Your genesis block hash **must** agree with the above for your chosen chain.

## 5 - Fetch Snapshots (Optional)

Snapshots are collections of files from a node's backend that represent its state at a specific time.

They are useful for fixing nodes that become corrupted, or when spinning up a new node. Restoring a snapshot is much faster than syncing from the network.

Snapshots can be applied to both the consensus (beacond) and execution clients. In fact, syncing can be significantly faster when you restore both snapshots simultaneously.

This tutorial fetches pruned snapshots. The script can fetch archive snapshots, too.

### 5a - Obtain Snapshot

Berachain and the community offer snapshots for Mainnet and Bepolia. You can download snapshots at the following links.

- [Awesome Berachain Validators](https://github.com/chuck-bear/awesome-berachain-validators) is a community-maintained list; all of them have great download speed.

- Or, you can use Berachain official snaps which are capped to 10 Mbyte/sec. Review the script `fetch-berachain-snapshots.js`. The key variables are at [the top](https://github.com/berachain/guides/blob/main/apps/node-scripts/fetch-berachain-snapshot.js):

**File:** `~/beranode/fetch-berachain-snapshots.js`

```nodejs
const snapshot_chain = "bera-testnet-snapshot" || "bera-snapshot";
const el_client = 'reth' || 'geth';
const geography = "na" || 'eu' || 'as';        // North America, EU, Asia
const snapshot_type = "pruned" || "archive";
```

Revise the file as appropriate for your situation and geography, then run it:

```bash
# FROM: ~/beranode

node fetch-berachain-snapshots.js;

# [Expected Output]:
# Fetching bucket contents...
# Found snapshot_beacond_reth_full_v1.1.3_3768872.tar.lz4 in beacon_reth/pruned
# Downloading snapshot_beacond_reth_full_v1.1.3_3768872.tar.lz4
# ...
```

The download may take a while.

### 5b - Stop Clients

Shut down `beacond` and your Execution Layer.

### 5c - Clean Existing Chain Data

To clean the Beacon Kit and — to pick an example — reth data store:

```bash
# FROM: ~/beranode

source env.sh;
$BEACOND_BIN --home $BEACOND_HOME comet unsafe-reset-all;

# [Expected Output]:
# Removed all blockchain history dir=var/beacond/data
# Reset private validator file to genesis state key=..

ls var/reth;

# [Expected Output]:
# data  genesis.json

rm -r var/reth/data;
```

### 5d - Install Beacon-Kit Snapshot

The snapshots distributed by Berachain are designed to be installed in the beacond home directory, which contains both `config` and `data`:

```bash
# FROM: ~/beranode

lz4 -d downloads/snapshot_beacond_reth_...tar.lz4 | tar xv  -C var/beacond/;

# [Expected Output]:
# x data/
# x data/cs.wal/
# x data/cs.wal/wal.10416
# x data/cs.wal/wal.10424
# x data/cs.wal/wal.10398
# ...
```

### 5e - Install Execution Layer Snapshot

The example below uses `reth`:

```bash
# FROM: ~/beranode

lz4 -d downloads/snapshot_reth_pruned...tar.lz4 | tar xv -C var/reth/;

# [Expected Output]:
# x data/
# x data/db/
# x data/db/mdbx.dat
# x data/static_files/
# x data/static_files/static_file_transactions_2500000_2999999
```

## 6 - Fetch Address Book (Optional)

The `beacond` address book contains a list of nodes to communicate with. Starting with one dramatically improves startup time.

```bash
# FROM: ~/beranode

# MAINNET
wget https://storage.googleapis.com/bera-snapshot-na/addrbook.json -O var/beacond/config/addrbook.json

# TESTNET
wget https://storage.googleapis.com/bera-testnet-snapshot-na/addrbook.json -O var/beacond/config/addrbook.json


# [Expected Output]:
#  ‘var/beacond/config/addrbook.json’ saved
```

## 7 - Run Both Clients

The following two scripts run the consensus and execution clients.

**File:** `./run-beacond.sh`

```bash
#!/bin/bash

set -e
. ./env.sh
$BEACOND_BIN start --home $BEACOND_DATA
```

**File:** `./run-reth.sh`

```bash
#!/bin/bash

set -e
. ./env.sh

if [ -f "seed-data/el-bootnodes.txt" ]; then
    export EL_BOOTNODES=$(grep '^enode://' "seed-data/el-bootnodes.txt"| tr '\n' ',' | sed 's/,$//')
fi
if [ -f "seed-data/el-peers.txt" ]; then
    export EL_PEERS=$(grep '^enode://' "seed-data/el-peers.txt"| tr '\n' ',' | sed 's/,$//')
fi

$RETH_BIN node \
--authrpc.jwtsecret=$JWT_PATH \
--chain=$RETH_GENESIS_PATH \
--datadir=$RETH_DATA \
--port=30303 \
--http \
--http.addr=0.0.0.0 \
--http.port=8545 \
--http.corsdomain="*" \
--bootnodes=$EL_BOOTNODES \
--trusted-peers=$EL_PEERS \
--ws \
--ws.addr=0.0.0.0 \
--ws.port=8546 \
--ws.origins="*" \
--authrpc.addr=0.0.0.0 \
--authrpc.port=$EL_AUTHRPC_PORT \
--engine.persistence-threshold 0 \
--engine.memory-block-buffer-target 0 \
--log.file.directory=$LOG_DIR;
```

Launch two terminal windows. In the first, run the consensus client:

```bash
# FROM: ~/beranode

./run-beacond.sh;

# [Expected Output]:
# INFO Starting service type=telemetry
# INFO Starting service type=engine-client
# INFO Initializing connection to the execution client... service=engine.client dial_url=http://localhost:8551
# INFO Waiting for execution client to start... 🍺🕔 service=engine.client dial_url=http://localhost:8551
#
# [AFTER RETH STARTS]
# INFO Connected to execution client service=reporting
# INFO Reporting version service=reporting version=v1.1.3 system=darwin/arm64 eth_version=1.2.0 eth_name=Reth
#
# [AFTER BLOCKS START FLOWING]
# INFO processExecutionPayload ... height=49 ...
# INFO Inserted new payload into execution chain ... payload_parent_block_hash=0x7f9f ...
# INFO Forkchoice updated ... head_block_hash=0xfb2ea... finalized_block_hash=0x7f9f1...
# INFO Finalized block ... height=49 ...
# Committed state ... height=49 ...
```

In the second, run the execution client (corresponding to the one you chose). Here it is for Bera-Reth:

```bash
# FROM: ~/beranode

./run-reth.sh;

# [Expected Output]:
# INFO Transaction pool initialized
# INFO P2P networking initialized
# INFO StaticFileProducer initialized
# INFO Pruner initialized
# INFO Consensus engine initialized
# INFO Engine API handler initialized
# INFO RPC auth server started url=127.0.0.1:8551
# INFO RPC IPC server started path=/tmp/reth.ipc
# INFO RPC HTTP server started url=0.0.0.0:8545
# INFO Starting consensus engine
#
# [AFTER BLOCKS START FLOWING]
# INFO Forkchoice updated head_block_hash=0x7f9f131 ...
# INFO State root task finished ... number: 49, hash: 0xfb2ea8...
# INFO Block added to canonical chain number=49 hash=0xfb2ea...
# INFO Canonical chain committed number=49 hash=0xfb2ea...
```

Initially this will not appear to respond, but within a minute blocks should begin flowing. There should not be a significant number of error messages, except for occasional minor complaints about disconnecting or slow peers.

## 8 - Testing Your Node

### 8a - Check Sync Status

To check on the sync status of the consensus layer, in another terminal run the following which will retrieve the current block height from the consensus client:

```bash
# FROM: ~/beranode

set -e
. ./env.sh

# Don't have jq? `brew install jq`
$BEACOND_BIN --home=$BEACOND_DATA status | jq;

# [Expected Output]:
# {
#   "node_info": {...
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

If `catching_up` is set to `true`, it is still syncing.

### 8b - Testing Local RPC Node

Now that our RPC is running, let's verify that the network is working by performing a few RPC requests.

:::tip
Make sure that your node is fully synced before proceeding with these steps.
:::

### 8c - EL Block Number

```bash
curl --location 'http://localhost:8545' \
--header 'Content-Type: application/json' \
--data '{
	"jsonrpc":"2.0",
	"method":"eth_blockNumber",
	"params":[],
	"id":420
}';


# [Expected Output]:
# {
#     "jsonrpc": "2.0",
#     "result": "0xfae90",   // [!code ++] <---- compare with block explorer
#     "id": 420
# }
```

### 8d - CL Block Number

```bash
curl -s http://localhost:26657/status | jq '.result.sync_info.latest_block_height';

# [Expected Output]:
# 1653733
```
