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

# Berachain Node Quickstart ⚡

This guide will walk you through setting up an RPC node on a Linux or Mac computer. If you want to operate Berachain in a production environment, it will provide a guide to the layout and configuration of these services, that you can apply to your kubernetes- or systemd-based deployments.

## Configurations ⚙️

This quickstart describes both **mainnet** and **Bepolia** deployments. There are certain scenarios, specifically experimenting with validator and beacon-chain technology, where you're better off with a [local devnet from Beacon-Kit source](/nodes/kurtosis).

The scripts employ a number of environment variables created in `env.sh` to store configuration preferences. Each execution layer client has its own approach to configuration, reflected in its `setup` and `run` scripts. However, `beacond` relies only upon the `CHAIN_SPEC` variable, which you should make sure is properly set in your environment.

### Hardware Requirements 💻

The following requirements are needed to run both the execution and consensus clients:

- **OS**: Linux AMD64, Linux ARM64, MacOS ARM64
- **CPU**: 8 Physical Cores
- **RAM**: 48GB
- **Storage**: 4TB (SSD with high IOPS)

### Software Requirements 💾

- Latest Beacond from its [GitHub release page](https://github.com/berachain/beacon-kit/tags). This guide was written against v1.1.3.
- One of our recommended [execution clients](/nodes/evm-execution). Take note of the recommended versions on that page.
  - [reth](https://github.com/paradigmxyz/reth/releases) DO NOT USE `op-reth`. Use `reth`.
  - [go-ethereum](https://github.com/ethereum/go-ethereum/releases)
  - [Nethermind](https://github.com/NethermindEth/nethermind/releases)
  - [Erigon](https://github.com/erigontech/erigon/releases)

## Getting started

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
# env.sh                      run-nether.sh   setup-nether.sh
# fetch-berachain-params.sh	  run-reth.sh     setup-reth.sh
#                             run-beacond.sh  setup-beacond.sh
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
export WALLET_ADDRESS_FEE_RECIPIENT=0x9BcaA41DC32627776b1A4D714Eef627E640b3EF5
export EL_ARCHIVE_NODE=false # set to true if you want to run an archive node on CL and EL
export MY_IP=`curl -s canhazip.com`

# VALUES YOU MIGHT WANT TO CHANGE
export LOG_DIR=$(pwd)/logs
export JWT_PATH=$BEACOND_CONFIG/jwt.hex
export BEACOND_BIN=$(command -v beacond || echo $(pwd)/beacond)
export BEACOND_DATA=$(pwd)/var/beacond
export RETH_BIN=$(command -v reth || echo $(pwd)/reth)
export GETH_BIN=$(command -v geth || echo $(pwd)/geth)
export NETHERMIND_BIN=$(command -v Nethermind.Runner || echo $(pwd)/Nethermind.Runner)
export ERIGON_BIN=$(command -v erigon || echo $(pwd)/erigon)
```

You need to set these constants:

1. **CHAIN_SPEC**: Set to `testnet` or `mainnet`.
2. **MONIKER_NAME**: Should be a name of your choice for your node.
3. **WALLET_ADDRESS_FEE_RECIPIENT**: This is the address that will receive the priority fees for blocks sealed by your node. If your node will not be a validator, this won't matter.
4. **EL_ARCHIVE_NODE**: Set to `true` if you want the execution client to be a full archive node.
5. **MY_IP**: This is used to set the IP address your chain clients advertise to other peers on the network. If you leave it blank, `geth` and `reth` will discover the address with UPnP (if you are behind a NAT gateway) or assign the node's ethernet IP (which is OK if your computer is directly on the internet and has a public IP). In a cloud environment such as AWS or GCP where you are behind a NAT gateway, you **must** specify this address or allow the default `curl canhazip.com` to auto-detect it, if connections to that address lead back to your instance.

You should verify these constants:

- **LOG_DIR**: This directory stores log files.
- **BEACOND_BIN**: Set this to the full path where you installed `beacond`. The expression provided finds it in your $PATH.
- **BEACOND_DATA**: Set this to where the consensus data and config should be kept. BEACOND_CONFIG must be under BEACOND_PATH as shown. Don't change it.
- **RETH_BIN** or other chain client: Set this to the full path where you installed `reth`. The expression provided finds it in your $PATH.

## Fetch Mainnet Parameters 📥

The key network parameters for Berachain mainnet are downloaded by `fetch-berachain-params.sh`. Invoke the script as follows to download the files and verify their integrity:

```bash
# FROM: ~/beranode

./fetch-berachain-params.sh;

# [Expected Output for mainnet]:
# cd3a642dc78823aea8d80d5239231557  seed-data-80094/eth-genesis.json
# c0b7dc21e089f9074d97957526fcd08f  seed-data-80094/eth-nether-genesis.json
# c66dbea5ee3889e1d0a11f856f1ab9f0  seed-data-80094/genesis.json
# 5d0d482758117af8dfc20e1d52c31eef  seed-data-80094/kzg-trusted-setup.json

# [Expected Output for bepolia]
# 7ac0e3756f7e3d0af36d023f9e6cfd0c  seed-data-80069/eth-genesis.json
# ec67ba1beb73cc9042000e5dd21b5f72  seed-data-80069/eth-nether-genesis.json
# a24fb9c7ddf3ebd557300e989d44b619  seed-data-80069/genesis.json
# 5d0d482758117af8dfc20e1d52c31eef  seed-data-80069/kzg-trusted-setup.json

```

Check the signatures above against your results. Further confirmations of the consequences of these signatures are below.

## Set up the Consensus Client 🔗

The script `setup-beacond.sh` invokes `beacond init` and `beacond jwt generate`. This script:

1. Runs `beacond init` to create the file `var/beacond/config/priv_validator_key.json`. This contains your node's private key, and especially if you intend to become a validator, this file should be kept safe. It cannot be regenerated, and losing it means you will not be able to participate in the consensus process.
2. Runs `beacond jwt generate` to create the file `jwt.hex`. This contains a secret shared between the consensus client and execution client so they can securely communicate. Protect this file. If you suspect it has been leaked, generate a new one with `beacond jwt generate -o $JWT_PATH`.
3. Rewrites the beacond configuration files to reflect settings chosen in `env.sh`.
4. Places the mainnet parameters fetched above where Beacon-Kit expects them, and shows you an important hash from the genesis file.

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

Your validator state root **must** agree with the value shown above.

## Set up the Execution Client 🛠️

The provided scripts `setup-reth`, `setup-geth` and `setup-nether` create a runtime directory and configuration for those respective chain clients. The node is configured with pruning settings according to the `EL_ARCHIVE_NODE` setting in `config.sh`.

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
# ✓ Reth set up.
```

Your genesis block hash **must** agree with the above.

## Fetch snapshots (optional)

Snapshots are a collection of files from a node's backend, representing its state at the point of time when it was captured.

Useful as backups, for syncing nodes that have failed, corrupted, slowed down, or even spinning up a new node. It's much faster to restore a snapshot than letting it sync from the network.

Snapshots can be applied to both the consensus (beacond) and execution (geth, reth, etc.) clients. In fact, syncing can be a lot faster when both snapshots are simultaneously restored. For other chains, such as Nethermind, using only a beacond snapshot will improve the initial chain sync.

This tutorial fetches pruned snapshots. If you plan to run an archive node, we recommend a beginning-to-end sync from empty state.

1. **Obtain a snapshot.** Berachain and the community offer snapshots for mainnet and Bepolia. You can download snapshots at the following links.

   - [Awesome Berachain Validators]() is a community-maintained list; all of them have great download speed.

   - Or, you can use Berachain official snaps which are capped to 10 Mbyte/sec. Review the script `fetch-berachain-snapshots.js`. Key are the variables at the top:

   **FILE:** `~/beranode/fetch-berachain-snapshots.js`

   ```bash
   const el_node_type = 'reth' || 'geth';
   const snapshot_type = "bera-snapshot" || "bera-testnet-snapshot";
   const geography = "na" || 'eu' || 'as'; // North America, EU, Asia
   ...
   ```

   Revise the file to choose an EL listed in our snapshots, to indicate whether you want mainnet or Bepolia snapshots, and to choose your geographically nearest Google Storage endpoint. Run the file to fetch the latest snapshot.

   ```bash
   # FROM: ~/beranode

   node fetch-berachain-snapshots.js

   # [EXPECTED OUTPUT]
   # Fetching bucket contents...
   # Found snapshot_beacond_reth_full_v1.1.3_3768872.tar in beacon_reth/pruned
   # Downloading snapshot_beacond_reth_full_v1.1.3_3768872.tar
   # ...
   ```

2. **Ensure the clients are stopped.** Shut down `beacond` and your Execution Layer, if they are running.

3. **Clean out old chain data.** To clean the Beacon Kit and — to pick an example — reth data store:

```bash
# FROM: ~/beranode

source env.sh
$BEACOND_BIN --home $BEACOND_HOME comet unsafe-reset-all

# [ EXPECTED OUTPUT ]
# Removed all blockchain history dir=var/beacond/data
# Reset private validator file to genesis state key=..

ls var/reth

# [EXPECTED OUTPUT]
# data  genesis.json

rm -r var/reth/data
```

4. **Install the beacond snapshot.** The ones distributed by Berachain are designed to be installed in the beacond home directory, which contains both `config` and `data`:

```bash
# FROM: ~/beranode

tar xzvf downloads/snapshot_beacond_reth_...tgz -C var/beacond/

# [ EXPECTED OUTPUT ]
# x data/
# x data/cs.wal/
# x data/cs.wal/wal.10416
# x data/cs.wal/wal.10424
# x data/cs.wal/wal.10398
# ...
```

5. **Install the Execution Layer snapshot.** The example shown below again for `reth` as an example.

```bash
# FROM: ~/beranode

tar xzvf downloads/snapshot_reth_pruned...tgz -C var/reth/

# [ EXPECTED OUTPUT ]
# x data/
# x data/db/
# x data/db/mdbx.dat
# x data/static_files/
# x data/static_files/static_file_transactions_2500000_2999999
```

6. **Start (or restart) both chain clients.** Described in the next section.

## Run Both Clients 🏃

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

Launch two windows. In the first, run the consensus client:

```bash
# FROM: ~/beranode

./run-beacond.sh;

# [EXPECTED OUTPUT]
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

In the second, run the execution client (corresponding to the one you chose). Here it is for Reth:

```bash
# FROM: ~/beranode

./run-reth.sh;

# [EXPECTED OUTPUT]
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

## Testing Your Node 🧪

### Check Sync Status 🔄

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

### Testing Local RPC Node ✅

Now that we have our RPC running, let's go through a few steps to verify that the network is working currently but performing a few RPC requests.

:::tip
Make sure that your node is fully synced before proceeding with these steps.
:::

### Get current execution block number

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

### Get Current Consensus Block Number

```bash
curl -s http://localhost:26657/status | jq '.result.sync_info.latest_block_height';

# [Expected Output]:
# 1653733
```
