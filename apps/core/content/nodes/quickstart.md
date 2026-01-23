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

A Berachain node consists of two clients running together: a **consensus client** (Beacon-Kit) and an **execution client** (Bera-Reth or Bera-Geth). This guide walks you through setting up both on a Linux or Mac computer.

## Prerequisites

### Hardware

| Component | Requirement |
|-----------|-------------|
| **OS** | Linux AMD64, Linux ARM64 |
| **CPU / RAM** | 4 Physical Cores, 16GB RAM |
| **Storage** | 1TB minimum (more for long-term); Local SSD or on-instance storage preferred; network volumes require at least 1000 IOPS |

### Software

Install the required binaries before starting:

1. **Beacon-Kit**: Download the appropriate binary from the [releases page](https://github.com/berachain/beacon-kit/releases) for your OS and architecture. Make it executable and place it in your PATH (e.g., `~/.local/bin/`).
2. **Execution client**: Choose either [Bera-Reth](https://github.com/berachain/bera-reth/releases) or [Bera-Geth](https://github.com/berachain/bera-geth/releases). Download the binary for your OS and architecture, make it executable, and place it in your PATH.

See [EVM Execution Clients](/nodes/evm-execution) for recommended versions.

Verify installation:
```bash
beacond version
bera-reth --version  # or bera-geth version
```

## What You'll Do

1. **Download scripts** — clone helper scripts that automate configuration
2. **Configure environment** — set environment variables for your network (mainnet or Bepolia) and node identity
3. **Fetch parameters** — download genesis files and network configuration
4. **Set up Beacon-Kit** — initialize the consensus client and generate keys
5. **Set up execution client** — initialize Reth or Geth with the genesis state
6. **Fetch snapshots (optional)** — restore snapshots to speed up initial sync
7. **Fetch address book (optional)** — download peer list for faster startup
8. **Run both clients** — launch them in separate terminals; they communicate via JWT auth

Optional step 9 covers testing your node's RPC endpoints.

:::tip Other deployment methods
For production deployments, consider [docker images](https://github.com/berachain/beacon-kit/pkgs/container/beacon-kit) or [community-maintained Ansible playbooks](https://github.com/RhinoStake/ansible-berachain) that deploy docker containers. For local experimentation with validator mechanics, see [Local Devnet with Kurtosis](/nodes/guides/kurtosis).
:::

## 1 - Download Scripts

Make an area to work in, then clone the Berachain node scripts. These scripts handle configuration, parameter fetching, and client startup.

:::info
If you're a Unix traditionalist, use `/opt/beranode` as your working directory.
:::

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

## 2 - Configure Environment

Edit `env.sh` to set your node's configuration. Open the file and modify these values:

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

## 3 - Fetch Parameters

The `fetch-berachain-params.sh` script downloads the key network parameters for the chain you have configured. Invoke the script as follows to download the files and verify their integrity:

```bash
# FROM: ~/beranode

./fetch-berachain-params.sh;

# [Expected Output for mainnet - verify these checksums]:
# c66dbea5ee3889e1d0a11f856f1ab9f0  seed-data-80094/genesis.json
# 6b333924b81a1935e51ac70e7d9d7cb0  seed-data-80094/eth-genesis.json
# 5d0d482758117af8dfc20e1d52c31eef  seed-data-80094/kzg-trusted-setup.json

# [Expected Output for bepolia - verify these checksums]:
# a24fb9c7ddf3ebd557300e989d44b619  seed-data-80069/genesis.json
# c27c1162af33f7f5401bcef974a64454  seed-data-80069/eth-genesis.json
# 5d0d482758117af8dfc20e1d52c31eef  seed-data-80069/kzg-trusted-setup.json
```

Verify that the checksums for `genesis.json`, `eth-genesis.json`, and `kzg-trusted-setup.json` match the values above for your chosen network.

## 4 - Set Up Beacon-Kit

The script `setup-beacond.sh` invokes `beacond init` and `beacond jwt generate`. This script:

1. runs `beacond init` to create the file `var/beacond/config/priv_validator_key.json`. This contains your node's private key, and especially if you intend to become a validator, this file should be kept safe. It cannot be regenerated, and losing it means you will not be able to participate in the consensus process.
2. runs `beacond jwt generate` to create the file `jwt.hex`. This contains a secret shared between the consensus client and execution client so they can securely communicate. Protect this file. If you suspect it has been leaked, delete it then generate a new one with `beacond jwt generate -o $JWT_PATH`.
3. rewrites the `beacond` configuration files to reflect settings chosen in `env.sh`.
4. places the mainnet parameters, fetched above, where Beacon-Kit expects them and shows you an important hash from the genesis file.

```bash
# FROM: ~/beranode

./setup-beacond.sh;

# [Expected Output]:
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

## 5 - Set Up the Execution Client

The `setup-reth` and `setup-geth` scripts create a runtime directory and configuration for their respective chain clients. The scripts configure the node with pruning settings according to the `EL_ARCHIVE_NODE` setting in `env.sh`.

**If you're using Bera-Reth**, run `setup-reth.sh`. **If you're using Bera-Geth**, run `setup-geth.sh` instead.

Here's an example using `setup-reth`:

```bash
# FROM: ~/beranode

./setup-reth.sh;

# [Expected Output]:
# INFO [BEPOLIA] Genesis block written hash=0x0207661de38f0e54ba91c8286096e72486784c79dc6a9681fc486b38335c042f
# INFO [MAINNET] Genesis block written hash=0xd57819422128da1c44339fc7956662378c17e2213e669b427ac91cd11dfcfb38
# ✓ bera-reth set up.
```

Your genesis block hash **must** agree with the above for your chosen chain.

## 6 - Fetch Snapshots (Optional)

Snapshots are collections of files from a node's backend that represent its state at a specific time. Restoring a snapshot is much faster than syncing from the network, so this step can dramatically speed up your initial sync on a new node.

:::info
Do this step **before** starting your clients (Step 8). If you've already started syncing, you'll need to stop the clients, clean the data directories, then restore snapshots.
:::

Snapshots can be applied to both the consensus (beacond) and execution clients. Restoring both snapshots simultaneously provides the fastest sync.

This tutorial fetches pruned snapshots. The script can fetch archive snapshots, too.

### 6a - Obtain Snapshot

Berachain and the community offer snapshots for Mainnet and Bepolia. You can download snapshots at the following links.

- [Awesome Berachain Validators](https://github.com/chuck-bear/awesome-berachain-validators) is a community-maintained list; all of them have great download speed.

- Or, use the `fetch-berachain-snapshot.js` script to download official Berachain snapshots. The script fetches the latest snapshots from `snapshots.berachain.com` and automatically downloads both the beacon-kit and execution layer snapshots matching your configuration.

The script uses command-line arguments. Run it with options:

```bash
# FROM: ~/beranode

# Default: reth, mainnet, pruned
node fetch-berachain-snapshot.js

# Or specify options:
node fetch-berachain-snapshot.js --client geth --network testnet --type archive

# [Expected Output]:
# Bera Snapshot Downloader
# Network: mainnet | Client: reth | Type: pruned
# Fetching snapshot index...
# Will download: snapshot_beacon-kit-pruned_*.tar.lz4, snapshot_reth-pruned_*.tar.lz4
# Downloading...
# ✓ All downloads completed!
```

The script downloads snapshots to the `downloads/` directory. Both beacon-kit and execution layer snapshots are downloaded automatically. The download may take a while depending on your connection speed.

Available options:
- `--client` or `-c`: Execution client (`reth` or `geth`, default: `reth`)
- `--network` or `-n`: Network (`mainnet` or `testnet`, default: `mainnet`)
- `--type` or `-t`: Snapshot type (`pruned` or `archive`, default: `pruned`)
- `--help` or `-h`: Show help message

### 6b - Stop Clients

If you've already started your clients, shut down `beacond` and your execution client now. Otherwise, skip to 6c.

### 6c - Clean Existing Chain Data

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

### 6d - Install Beacon-Kit Snapshot

The snapshots distributed by Berachain are designed to be installed in the beacond home directory, which contains both `config` and `data`:

```bash
# FROM: ~/beranode

# Find the beacon-kit snapshot file (filename pattern: snapshot_beacon-kit-*)
BEACON_SNAPSHOT=$(ls downloads/snapshot_beacon-kit-*.tar.lz4 | head -1)
lz4 -d "$BEACON_SNAPSHOT" | tar xv -C var/beacond/;

# [Expected Output]:
# x data/
# x data/cs.wal/
# x data/cs.wal/wal.10416
# x data/cs.wal/wal.10424
# x data/cs.wal/wal.10398
# ...
```

### 6e - Install Execution Layer Snapshot

Extract the execution layer snapshot. The example below uses `reth` (for `geth`, use `var/geth/` or `var/bera-geth/`):

```bash
# FROM: ~/beranode

# Find the execution layer snapshot (filename pattern: snapshot_reth-* or snapshot_geth-*)
EL_SNAPSHOT=$(ls downloads/snapshot_reth-*.tar.lz4 downloads/snapshot_geth-*.tar.lz4 2>/dev/null | head -1)
lz4 -d "$EL_SNAPSHOT" | tar xv -C var/reth/;

# [Expected Output]:
# x data/
# x data/db/
# x data/db/mdbx.dat
# x data/static_files/
# x data/static_files/static_file_transactions_2500000_2999999
```

## 7 - Fetch Address Book (Optional)

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

## 8 - Run Both Clients

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
# INFO Waiting for execution client to start... 🍺🕔
# INFO Connected to execution client
# INFO Reporting version v1.1.3
# [AFTER BLOCKS START FLOWING]
# INFO processExecutionPayload ... height=49 ...
# INFO Finalized block ... height=49 ...
```

In the second, run the execution client (corresponding to the one you chose). Here it is for Bera-Reth:

```bash
# FROM: ~/beranode

./run-reth.sh;

# [Expected Output]:
# INFO RPC HTTP server started url=0.0.0.0:8545
# INFO Starting consensus engine
# [AFTER BLOCKS START FLOWING]
# INFO Block added to canonical chain number=49 hash=0xfb2ea...
```

Initially this will not appear to respond, but within a minute blocks should begin flowing. There should not be a significant number of error messages, except for occasional minor complaints about disconnecting or slow peers.

:::tip Your node is now running
Both clients are running and will begin syncing with the network. The node will continue syncing in the background. You can proceed to the optional testing steps below, or leave the clients running to complete their sync.
:::

## 9 - Testing Your Node (Optional)

Now that your RPC is running, verify that the network is working by performing a few RPC requests.

:::tip
Make sure that your node is fully synced before proceeding with these steps.
:::

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
#   "sync_info": {
#     "latest_block_height": "1126228",  // [!code ++] <---- CURRENT NETWORK BLOCK
#     "catching_up": false               // [!code ++] <---- IF `true` = STILL SYNCING
#   }
# }
```

If `catching_up` is set to `true`, it is still syncing.

### 8b - EL Block Number

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

### 8c - CL Block Number

```bash
curl -s http://localhost:26657/status | jq '.result.sync_info.latest_block_height';

# [Expected Output]:
# 1653733
```

## Next Steps

Your node is now running and syncing. For production deployments, see:

- **[Production Checklist](/nodes/production-checklist)** — Best practices for running nodes in production
- **[Monitoring](/nodes/monitoring)** — Set up monitoring and alerts for your node
- **[Become a Validator](/nodes/guides/validator)** — Guide to becoming a validator on Berachain
