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

This will walk you through on setting up a mainnet full node with `beacond` consensus client and a `reth` execution client.

## Requirements ⚙️

The following requirements are needed to run both the execution and consensus client.

- **OS**: Linux AMD64, Linux ARM64, MacOS ARM64
- **CPU**: 8 Physical Cores
- **RAM**: 48GB
- **Storage**: 4TB (SSD with high IOPS)

Ensure you have have [Golang](https://go.dev/dl/) v1.22.0 or greater installed. Recommend to install to `/opt/go/` and add `/opt/go/bin` to your PATH.

## Getting ready

Make an area to work in:

```bash
# FROM: $HOME

mkdir quickstart
cd quickstart
```

Create a file called `env.sh` and add the following:

```env.sh
#!/bin/bash

# CHANGE THESE TWO VALUES
export MONIKER_NAME=camembera
export WALLET_ADDRESS_FEE_RECIPIENT=0x9BcaA41DC32627776b1A4D714Eef627E640b3EF5

# CHAIN CONSTANTS
export CHAIN=mainnet-beacon-80094
export SEED_DATA_URL=https://raw.githubusercontent.com/berachain/ooga-booga/refs/heads/main/80094/

# THESE DEPEND ON YOUR LOCAL SETUP
export BEACOND_BIN=$(pwd)/beacond
export BEACOND_DATA=$(pwd)/var/beacond
export BEACOND_CONFIG=$(pwd)/var/beacond/config

export RPC_DIAL_URL=http://localhost:8551
export JWT_PATH=$BEACOND_CONFIG/jwt.hex

export RETH_BIN=$(pwd)/reth
export RETH_DATA=$(pwd)/var/reth
export RETH_GENESIS_PATH=$RETH_DATA/genesis.json

export LOG_DIR=$(pwd)/var/log/

mkdir -p $LOG_DIR
```

These two constants should be changed:

1. **MONIKER_NAME**: Should be a name of your choice for your node. This is a name presented on the chain to other nodes and is useful for debugging.
2. **WALLET_ADDRESS_FEE_RECIPIENT**: This is the address that will receive the priority fees for blocks sealed by your node.

The following constants should be checked:

- **BEACOND_BIN** should be the full path to where you placed `beacond`. The value shown above would be used if you placed `beacond` in the `quickstart` directory.
- **RETH_BIN** should be the full path to where you placed `reth`. The value shown above would be used if you placed `reth` in the `quickstart` directory.
- **BEACOND_DATA** and **BEACOND_CONFIG** are the directories for the database and configuration files for the consensus client.
- **RPC_DIAL_URL** is the URL of the execution client. If you choose to arrange beacond and reth to run on different machines, you will need to change this value to the RPC URL of reth.
- **LOG_DIR** is the directory for the log files, and should be set up with log rotation when in production.

Test env.sh to make sure it works:

```bash
# FROM: ~/quickstart

source env.sh
env

# [Expected Output]:
# BEACOND_BIN=/Users/camembera/quickstart/beacond
# BEACOND_DATA=/Users/camembera/quickstart/var/beacond
# BEACOND_CONFIG=/Users/camembera/quickstart/var/beacond/config
# RPC_DIAL_URL=http://localhost:8551
# JWT_PATH=/Users/camembera/quickstart/var/beacond/config/jwt.hex
# RETH_BIN=/Users/camembera/quickstart/reth
# RETH_DATA=/Users/camembera/quickstart/var/reth
...
```

## Fetch genesis, bootnodes, etc

The key network parameters for Berachain mainnet are downloaded by the following script. Note the above env.sh defines `SEED_DATA_URL` to point to the `ooga-booga` repo.

If you prefer, you can check out `https://github.com/berachain/ooga-booga.git` into the `quickstart` directory, and the script will copy the files from there instead.

```fetch-berachain-params.sh
#!/bin/bash

set -e
. ./env.sh

if [ ! -d "seed-data" ]; then
    mkdir -p seed-data
    if [ -z "$SEED_DATA_URL" ]; then
        cp -r ooga-booga/80094/* seed-data/
    else
        mkdir -p seed-data
        curl -s -o seed-data/kzg-trusted-setup.json $SEED_DATA_URL/kzg-trusted-setup.json$SEED_DATA_URL_SUFFIX
        curl -s -o seed-data/genesis.json $SEED_DATA_URL/genesis.json$SEED_DATA_URL_SUFFIX
        curl -s -o seed-data/eth-genesis.json $SEED_DATA_URL/eth-genesis.json$SEED_DATA_URL_SUFFIX
        curl -s -o seed-data/el-peers.txt $SEED_DATA_URL/el-peers.txt$SEED_DATA_URL_SUFFIX
        curl -s -o seed-data/app.toml $SEED_DATA_URL/app.toml$SEED_DATA_URL_SUFFIX
        curl -s -o seed-data/config.toml $SEED_DATA_URL/config.toml
    fi
fi

md5sum seed-data/*
```

You can invoke the script as follows. It will print out an md5 hash of the files to verify integrity.

```bash
# FROM: ~/quickstart

./fetch-berachain-params.sh

# [Expected Output]:
# 7578b8b2978d3126b05c7583f7e897cc  app.toml
# bfb4fc9fc42c9c9b1f0f2b3108cd3207  client.toml
# 1021d186aae506482deb760e63143ae6  config.toml
# 3caf21bb2134ed4c1970c904d2128d30  el-peers.txt
# cd3a642dc78823aea8d80d5239231557  eth-genesis.json
# c0b7dc21e089f9074d97957526fcd08f  eth-nether-genesis.json
# c66dbea5ee3889e1d0a11f856f1ab9f0  genesis.json
# 82583b3a373cca89ae404e972b2fd15c  geth-setup
# 5d0d482758117af8dfc20e1d52c31eef  kzg-trusted-setup.json
```

Check the signatures above with your results, and contact Discord: #bug-reports or your Validator Relations contact if you have a mismatch.

## Set up the consensus client

The script puts in place the seed data for the chain downloaded above, and updates the configuration files for the consensus client to refer to certain paths correctly,
then runs runs `beacond init` and `beacond jwt generate`.

```setup-beacond.sh
#!/bin/bash

set -e
. ./env.sh
mkdir -p $BEACOND_DATA
mkdir -p $BEACOND_CONFIG

if [ -f "$BEACOND_CONFIG/priv_validator_key.json" ]; then
    echo "Error: $BEACOND_CONFIG/priv_validator_key.json already exists"
    exit 1
fi

$BEACOND_BIN init $MONIKER_NAME --chain-id $CHAIN --home $BEACOND_DATA

cp seed-data/genesis.json $BEACOND_CONFIG/genesis.json
cp seed-data/kzg-trusted-setup.json $BEACOND_CONFIG/kzg-trusted-setup.json
cp seed-data/app.toml $BEACOND_CONFIG/app.toml
cp seed-data/config.toml $BEACOND_CONFIG/config.toml

# choose sed options based on OS
if [[ "$OSTYPE" == "darwin"* ]]; then
    SED_OPT="-i ''"
else
    SED_OPT='-i'
fi

sed $SED_OPT 's|^moniker = ".*"|moniker = "'$MONIKER_NAME'"|' $BEACOND_CONFIG/config.toml
sed $SED_OPT 's|^rpc-dial-url = ".*"|rpc-dial-url = "'$RPC_DIAL_URL'"|' $BEACOND_CONFIG/app.toml
sed $SED_OPT 's|^jwt-secret-path = ".*"|jwt-secret-path = "'$JWT_PATH'"|' $BEACOND_CONFIG/app.toml
sed $SED_OPT 's|^trusted-setup-path = ".*"|trusted-setup-path = "'$BEACOND_CONFIG/kzg-trusted-setup.json'"|' $BEACOND_CONFIG/app.toml
sed $SED_OPT 's|^suggested-fee-recipient = ".*"|suggested-fee-recipient = "'$WALLET_ADDRESS_FEE_RECIPIENT'"|' $BEACOND_CONFIG/app.toml

$BEACOND_BIN jwt generate -o $JWT_PATH
```

The key result of `beacond init` is the file `var/beacond/config/priv_validator_key.json`. This contains your node's private key, and _especially if you intend
to become a validator_, this file should be kept safe. It cannot be regenerated, and losing it means you will not be able to participate in the consensus process.

The other important file generated is `var/beacond/config/jwt.hex`. This contains a secret shared between the consensus client and the execution client so they can
securely communicate. Protect this file. If you suspect it has been leaked, generate a new one with `beacond jwt generate -o $JWT_PATH`.

Invoke the script:

```bash
# FROM: ~/quickstart

./setup-beacond.sh

# [Expected Output]:
# {
#  "moniker": "<your moniker here>",
#  "chain_id": "mainnet-beacon-80094",
#  "stateRoot": "0x12965ab9cbe2d2203f61d23636eb7e998f167cb79d02e452f532535641e35bcc",
#  "blockHash": "0xcfff92cd918a186029a847b59aca4f83d3941df5946b06bca8de0861fc5d0850",
# }
# Successfully wrote new JSON-RPC authentication secret to: /Users/somebody/quickstart/var/beacond/config/jwt.hex

find var/beacond

# [Expected Output]:
# var/beacond
# var/beacond/config
# var/beacond/config/config.toml
# var/beacond/config/genesis.json
# var/beacond/config/priv_validator_key.json
# var/beacond/config/app.toml
# var/beacond/config/client.toml
# var/beacond/config/node_key.json
# var/beacond/config/kzg-trusted-setup.json
# var/beacond/config/jwt.hex
# var/beacond/config/app.toml
# var/beacond/config/config.toml
# var/beacond/data
# var/beacond/data/priv_validator_state.json
```

Your state root and block hash should agree with the above.

## Set up the execution client

Create the following script:

```setup-reth.sh
#!/bin/bash

set -
. ./env.sh
mkdir -p $RETH_DATA

cp seed-data/eth-genesis.json $RETH_GENESIS_PATH
$RETH_BIN init --chain $RETH_GENESIS_PATH --datadir $RETH_DATA
```

Similar to the consensus client, the script puts in place the seed data for the chain downloaded above, and initializes the reth data store in `var/reth/`. Invoke the script:

```bash
# FROM: ~/quickstart

./setup-reth.sh

# [Expected Output]:
# INFO Initialized tracing, debug log directory: /Users/camembearbera/Library/Caches/reth/logs/80094
# INFO reth init starting
# INFO Opening storage db_path="/Users/camembearbera/src/bera-quickstart/var/reth/db" sf_path="/Users/camembearbera/src/bera-quickstart/var/reth/static_files"
# INFO Verifying storage consistency.
# INFO Genesis block written hash=0xd57819422128da1c44339fc7956662378c17e2213e669b427ac91cd11dfcfb38

find var/beacond

find var/reth
# var/reth
# var/reth/genesis.json
# var/reth/reth.toml
# var/reth/static_files
# var/reth/static_files/static_file_receipts_0_499999.off
# var/reth/static_files/static_file_transactions_0_499999.conf
# var/reth/static_files/static_file_headers_0_499999.conf
# var/reth/static_files/static_file_transactions_0_499999.off
# var/reth/static_files/static_file_receipts_0_499999
# var/reth/static_files/static_file_receipts_0_499999.conf
# var/reth/static_files/static_file_headers_0_499999.off
# var/reth/static_files/static_file_transactions_0_499999
# var/reth/static_files/static_file_headers_0_499999
# var/reth/db
# var/reth/db/mdbx.dat
# var/reth/db/database.version
# var/reth/db/mdbx.lck
```

## Optional: Download snapshots

Though you can choose to sync the chain from scratch, it will take a while. Check out our list of (community-supplied snapshots)[https://github.com/berachain/beacon-kit/blob/main/testing/networks/80094/snapshots.md].

Carefully place the snapshots files under `var/beacond/data` and `var/reth/data` respectively.

## Run both clients

The following two scripts run the consensus and execution clients.

```run-beacond.sh
#!/bin/bash

set -e
. ./env.sh
$BEACOND_BIN start --home $BEACOND_DATA
```

```run-reth.sh
#!/bin/bash

set -e
. ./env.sh

if [ -f "seed-data/el-bootnodes.txt" ]; then
    export EL_SEEDS=$(grep '^enode://' "seed-data/el-bootnodes.txt"| tr '\n' ',' | sed 's/,$//')
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
--http.api="eth,net,web3,txpool,debug" \
--http.port=8545 \
--http.corsdomain="*" \
--bootnodes=$EL_PEERS \
--trusted-peers=$EL_PEERS \
--ws \
--ws.addr=0.0.0.0 \
--ws.port=8546 \
--ws.origins="*" \
--authrpc.addr=0.0.0.0 \
--authrpc.port=$PORT \
--log.file.directory=$LOG_DIR \
--metrics=0.0.0.0:6060;
```

Launch two windows. In the first, run the consensus client:

```bash
# FROM: ~/quickstart

./run-beacond.sh
```

In the second, run the execution client:

```bash
# FROM: ~/quickstart

./run-reth.sh
```

Initially this will not appear to respond, but within a minute blocks should begin flowing. There should be no significant quantity of error messages, except for
minor complaints about disconnecting or slow peers from time to time.

## Testing your node

### Check Sync Status 🔄

To check on the sync status of the consensus layer, in another terminal run the following which will retrieve the current block height from the consensus client:

```bash
# FROM: ~/quickstart

# Don't have jq? `brew install jq`;
./build/bin/beacond --home=./build/bin/config/beacond status | jq;

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
	"id":83
}';


# [Expected Output]:
# {
#     "jsonrpc": "2.0",
#     "result": "0xfae90",   // [!code ++] <---- compare with block explorer
#     "id": 83
# }
```

### Get Current Consensus Block Number

```bash
curl -s http://localhost:26657/status | jq '.result.sync_info.latest_block_height';

# [Expected Output]:
# 1653733
```

## Followup steps

Particularly if you are a validator, consult the guide to [Becoming an Awesome Validator](https://github.com/chuck-bear/awesome-berachain-validators/tree/main).

1. Cause your operating system's startup process to launch beacond and reth at boot.
2. Monitor your node's disk space, memory consumption, and service availability.
