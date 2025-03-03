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
  import config from '@berachain/config/constants.json';
  import AddNetwork from '@berachain/ui/AddNetwork';
  import CopyToClipboard from '@berachain/ui/CopyToClipboard';
</script>

# Berachain Node Quickstart ⚡

This guide will walk you through setting up an RPC node with the `beacond` consensus client and a `reth` execution client.

## Configurations ⚙️

This quickstart describes both **mainnet** and **Bepolia** deployments. There are certain scenarios, specifically experimenting with validator and beacon-chain technology, where you're better off with a [local devnet from Beacon-Kit source](/nodes/kurtosis).

### Hardware Requirements 💻

The following requirements are needed to run both the execution and consensus clients:

- **OS**: Linux AMD64, Linux ARM64, MacOS ARM64
- **CPU**: 8 Physical Cores
- **RAM**: 48GB
- **Storage**: 4TB (SSD with high IOPS)

### Software Requirements 💾
* Latest Beacond from its [GitHub release page](https://github.com/berachain/beacon-kit/tags). This guide was written against v1.1.3.
* One of our recommended [execution clients](/nodes/evm-execution). Take note of the recommended versions on that page.
  * [reth](https://github.com/paradigmxyz/reth/releases) DO NOT USE `op-reth`. Use `reth`.
  * [go-ethereum](https://github.com/ethereum/go-ethereum/releases) 
  * [Nethermind](https://github.com/NethermindEth/nethermind/releases) 

## Getting started

Make an area to work in. If you're a Unix traditionalist, choose `/opt/beranode`.

```bash
# FROM: $HOME

mkdir beranode;
cd beranode;
git clone https://github.com/camembera/bera-quickstart;
ls bera-quickstart;

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
export CHAIN_SPEC="mainnet"
export MONIKER_NAME=camembera
export WALLET_ADDRESS_FEE_RECIPIENT=0x9BcaA41DC32627776b1A4D714Eef627E640b3EF5
export EL_ARCHIVE_NODE=false # set to true if you want to run an archive node on CL and EL
export MY_IPV4=`curl canhazip.com`

# CHAIN CONSTANTS
if [ "$CHAIN_SPEC" == "testnet" ]; then
    export CHAIN=testnet-beacon-80069
    export CHAIN_ID=80069
else
    export CHAIN=mainnet-beacon-80094
    export CHAIN_ID=80094
fi
export SEED_DATA_URL=https://raw.githubusercontent.com/berachain/beacon-kit/refs/heads/main/testing/networks/$CHAIN_ID

export BEACOND_BIN=`/usr/bin/which beacond`
export BEACOND_DATA=$(pwd)/var/beacond
export BEACOND_CONFIG=$BEACOND_DATA/config  # don't change this. sorry.
export EL_AUTHRPC_PORT=8551
export RPC_DIAL_URL=http://localhost:$EL_AUTHRPC_PORT
export JWT_PATH=$BEACOND_CONFIG/jwt.hex
export LOG_DIR=$(pwd)/logs
export RETH_BIN=`/usr/bin/which reth`
export RETH_DATA=$(pwd)/var/reth
export RETH_GENESIS_PATH=$RETH_DATA/genesis.json
```

You need to set these constants:

# CHANGE THESE VALUES
export CHAIN_SPEC="mainnet"
export MONIKER_NAME=camembera
export WALLET_ADDRESS_FEE_RECIPIENT=0x9BcaA41DC32627776b1A4D714Eef627E640b3EF5
export EL_ARCHIVE_NODE=false # set to true if you want to run an archive node on CL and EL
export MY_IPV4=64.34.22.212

1. **CHAIN_SPEC**: Set to `testnet` or `mainnet`.
2. **MONIKER_NAME**: Should be a name of your choice for your node.
3. **WALLET_ADDRESS_FEE_RECIPIENT**: This is the address that will receive the priority fees for blocks sealed by your node. If your node will not be a validator, this won't matter.
4. **EL_ARCHIVE_NODE**: Set to `true` if you want the execution client to be a full archive node.
5. **MY_IPV4**: This is used to correctly advertise your node's address to other peers on the network. The default looks it up on every script run.  If it will never change, you can hard-code it here.  Reth and Geth will attempt to identify your public IP if you have UPNP turned on, which is generally only on home networks. Cloud environments do not have this.

You should verify these constants:

- **BEACOND_BIN**: Set this to the full path where you installed `beacond`. The expression provided finds it in your $PATH.
- **RETH_BIN**: Set this to the full path where you installed `reth`. The expression provided finds it in your $PATH.
- **BEACOND_DATA**: Set this to where the consensus data and config should be kept. BEACOND_CONFIG must be under BEACOND_PATH as shown. Don't change it.
- **RETH_DATA**: Set this to where the execution data and config should be kept.
- **LOG_DIR**: This directory stores log files.

## Fetch Mainnet Parameters 📥

The key network parameters for Berachain mainnet are downloaded by `fetch-berachain-params.sh`. Invoke the script as follows to download the files and verify their integrity:

```bash
# FROM: ~/beranode

./fetch-berachain-params.sh; 

# [Expected Output for mainnet]:
# 6e4179e38e11696f8402cd5f8e872726  seed-data/app.toml
# 1021d186aae506482deb760e63143ae6  seed-data/config.toml
# 3caf21bb2134ed4c1970c904d2128d30  seed-data/el-peers.txt
# cd3a642dc78823aea8d80d5239231557  seed-data/eth-genesis.json
# c66dbea5ee3889e1d0a11f856f1ab9f0  seed-data/genesis.json
# 5d0d482758117af8dfc20e1d52c31eef  seed-data/kzg-trusted-setup.json

# [Expected Output for bepolia]
# 6e4179e38e11696f8402cd5f8e872726  seed-data/app.toml
# 65313bc44bc810da50bf0dac696219fe  seed-data/config.toml
# a14b14eca398d857344d1ce86c848352  seed-data/el-peers.txt
# 7ac0e3756f7e3d0af36d023f9e6cfd0c  seed-data/eth-genesis.json
# ec67ba1beb73cc9042000e5dd21b5f72  seed-data/eth-nether-genesis.json
# a24fb9c7ddf3ebd557300e989d44b619  seed-data/genesis.json
# 5d0d482758117af8dfc20e1d52c31eef  seed-data/kzg-trusted-setup.json

```

Check the signatures above against your results.  Further confirmations of the consequences of these signatures are below. 

## Set up the Consensus Client 🔗

The script `setup-beacond.sh` invokes `beacond init` and `beacond jwt generate`.  This script:
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

## Run Both Clients 🏃

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

