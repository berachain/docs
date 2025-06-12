---
head:
  - - meta
    - property: og:title
      content: Distribute Block Rewards on Berachain
  - - meta
    - name: description
      content: How to distribute block rewards on Berachain
  - - meta
    - property: og:description
      content: How to distribute block rewards on Berachain
---

<script setup>
    import config from '@berachain/config/constants.json';
</script>

# Berachain Bepolia Testnet RPC Node On AWS

This guide will walk you through setting up a Berachain Bepolia Testnet RPC node on AWS with and EC2 instance.

## Requirements

- AWS Account

### Configuration Tested

The following configuration has been tested and is known to work, but other configurations may work as well.

#### m5.4xlarge 

| Configuration      | Setting                   |
| ------------------ | ------------------------- |
| Instance Type      | m5.4xlarge                |
| OS                 | Amazon Linux 2023         |
| CPU                | 16 cores                  |
| Memory             | 64GB                      |
| Storage            | 2048GB                    |
| Storage Type       | gp3 (General Purpose SSD) |
| Storage IOPS       | 5000                      |
| Storage Throughput | 128                       |

## AWS Setup

Go to the [EC2 Dashboard](https://console.aws.amazon.com/ec2/) and click on **Launch Instance**.

Fill the out the following information:

### Name and tags

**Name:** `BerachainRPCNode`

### Application and OS Images (Amazon Machine Image)

**Amazon Machine Image (AMI):** `Amazon Linux 2023 AMI`

**Architecture:** `64-bit (x86)`

### Instance type

**Instance type:** `m5.4xlarge`

### Key pair (Login)

Please go through the process of creating a new key pair or use an existing key pair.

For the purposes of this guide, we will assume the key pair `BerachainRPCNode.pem`.

### Network Settings

It's worth noting that we'll make the firewall settings much more open and it is recommended that you configure the firewall settings to best fit your needs.

**Firewall (Security Group):** `Create security group`

**Anywhere:** `0.0.0.0/0`

**Allow SSH traffic:** `Yes`

**Allow HTTPS traffic:** `Yes`

**Allow HTTP traffic:** `Yes`

### Storage

**Size (GiB):** `2048`

**Volume Type:** `gp3`

**IOPS:** `5000`

**Delete on termination:** `No`

**Encrypted:** `Not encrypted`

**Throughput:** `128`

### Summary

**Number of instances:** `1`

Once you have filled out the information, click on **Launch Instances**.

## Connect To Instance

Once you have launched the instance and you have a key pair, find the `Public IPv4 DNS` under **Details** of your newly created instance.

With your key pair, you can now connect to your instance using SSH:

```bash

ssh -i BerachainRPCNode.pem ec2-user@<EC2_PUBLIC_IP>.<EC2_REGION>.compute.amazonaws.com;

# [Example Promot]:
# The authenticity of host '<EC2_PUBLIC_IP>.<EC2_REGION>.compute.amazonaws.com (<EC2_PUBLIC_IP>)' can't be established.
# ED25519 key fingerprint is SHA256:<FINGERPRINT>.
# This key is not known by any other names.
# Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
# Warning: Permanently added '<EC2_PUBLIC_IP>.<EC2_REGION>.compute.amazonaws.com' (ED25519) to the list of known hosts.
# 
# ec2-user@<EC2_PUBLIC_IP>.<EC2_REGION>.compute.internal
# >
```

Make the switch to from `ec2-user` to `root`:

```bash
# ec2-user@<EC2_PUBLIC_IP>.<EC2_REGION>.compute.internal

sudo su;

# [Example Output]:
# [root@<EC2_PUBLIC_IP> ec2-user]#
```

Confirm the OS is Amazon Linux 2023:

```bash
# [root@<EC2_PUBLIC_IP> ec2-user]#

cat /etc/os-release;

# [Expected Output]:
# NAME="Amazon Linux"
# VERSION="2023"
# ID="amzn"
# ID_LIKE="fedora"
# VERSION_ID="2023"
# PLATFORM_ID="platform:al2023"
# PRETTY_NAME="Amazon Linux 2023.6.20250218"
# ANSI_COLOR="0;33"
# CPE_NAME="cpe:2.3:o:amazon:amazon_linux:2023"
# HOME_URL="https://aws.amazon.com/linux/amazon-linux-2023/"
# DOCUMENTATION_URL="https://docs.aws.amazon.com/linux/"
# SUPPORT_URL="https://aws.amazon.com/premiumsupport/"
# BUG_REPORT_URL="https://github.com/amazonlinux/amazon-linux-2023"
# VENDOR_NAME="AWS"
# VENDOR_URL="https://aws.amazon.com/"
# SUPPORT_END="2029-06-30"
```

## Install Dependencies

Update the package index:

```bash
# [root@<EC2_PUBLIC_IP> ec2-user]#

yum update -y;

# [Expected Output]:
# Last metadata expiration check: <TIME> ago on <DATE>.
# Dependencies resolved.
# Nothing to do.
# Complete!
```

## Download BeaconKit and Reth

Make an area to work in:

```bash
# [root@<EC2_PUBLIC_IP> ec2-user]#

cd; # To go root
mkdir -p beranode;
cd beranode;
```

Download the latest BeaconKit AMD64 binary:

```bash
# [root@<EC2_PUBLIC_IP> beranode]#

# Downloads Latest BeaconKit AMD64 Binary
BEACOND_RELEASE_URL=$(curl -s https://api.github.com/repos/berachain/beacon-kit/releases/latest | grep -oP '"browser_download_url": "\K[^"]+' | grep "amd64" | grep -v "\.sig$");
wget $BEACOND_RELEASE_URL;
tar -xzf beacond-v*.tar.gz;
mv beacond-v*-linux-amd64 beacond;
./beacond --version;

# [Example Output]:
# v1.1.2

# Download Latest Reth AMD64 Binary
RETH_RELEASE_URL=$(curl -s https://api.github.com/repos/paradigmxyz/reth/releases/latest | grep -oP '"browser_download_url": "\K[^"]+' | grep "x86_64-unknown-linux-gnu.tar.gz" | grep -v "\.asc$" | grep -v "op-reth");
wget $RETH_RELEASE_URL;
tar -xzf reth-v*.tar.gz;
./reth --version;

# [Example Output]:
# v1.2.0
# reth Version: 1.2.0
# Commit SHA: 1e965caf5fa176f244a31c0d2662ba1b590938db
# Build Timestamp: 2025-02-12T19:51:53.714540350Z
# Build Features: asm_keccak,jemalloc
# Build Profile: maxperf
```

## Configurations ⚙️

Create a environment configuration file:

```bash
# [root@<EC2_PUBLIC_IP> beranode]#

touch env.sh;
```

Edit the environment configuration file with the following:

**File:** `/root/beranode/env.sh`

```bash
#!/bin/sh

# CHANGE THESE TWO VALUES
export MONIKER_NAME=<YOUR_MONIKER_NAME>;
export WALLET_ADDRESS_FEE_RECIPIENT=<YOUR_WALLET_ADDRESS>;

# CHAIN CONSTANTS
export CHAIN=testnet-beacon-80069;
export SEED_DATA_URL=https://raw.githubusercontent.com/berachain/beacon-kit/refs/heads/main/testing/networks/80069;

# THESE DEPEND ON YOUR LOCAL SETUP
export BEACOND_BIN=$(pwd)/beacond;
export BEACOND_DATA=$(pwd)/.beacond;
export BEACOND_CONFIG=$BEACOND_DATA/config;

export EL_AUTHRPC_PORT=8551;
export RPC_DIAL_URL=http://localhost:$EL_AUTHRPC_PORT;
export JWT_PATH=$BEACOND_CONFIG/jwt.hex;

export RETH_BIN=$(pwd)/reth;
export RETH_DATA=$(pwd)/.reth;
export RETH_GENESIS_PATH=$RETH_DATA/genesis.json;

export LOG_DIR=$(pwd)/logs;

# Create required directories
mkdir -p "$BEACOND_DATA";
mkdir -p "$BEACOND_CONFIG";
mkdir -p "$RETH_DATA";
mkdir -p "$LOG_DIR";

# Check executables exist and are executable
if [ ! -x "$BEACOND_BIN" ]; then
  echo "Error: $BEACOND_BIN does not exist or is not executable";
  exit 1;
fi

if [ ! -x "$RETH_BIN" ]; then
  echo "Error: $RETH_BIN does not exist or is not executable";
  exit 1;
fi
```

Run the environment configuration file:

```bash
# [root@<EC2_PUBLIC_IP> beranode]#

source env.sh;
```

## Fetch Testnet Parameters 📥

```bash
# [root@<EC2_PUBLIC_IP> beranode]#

touch fetch-berachain-params.sh;
```

Edit the `fetch-berachain-params.sh` file with the following:

**File:** `fetch-berachain-params.sh`

```bash
#!/bin/bash

set -e;
. ./env.sh;

mkdir -p seed-data;
curl -s -o seed-data/kzg-trusted-setup.json $SEED_DATA_URL/kzg-trusted-setup.json;
curl -s -o seed-data/genesis.json $SEED_DATA_URL/genesis.json;
curl -s -o seed-data/eth-genesis.json $SEED_DATA_URL/eth-genesis.json;
curl -s -o seed-data/el-peers.txt $SEED_DATA_URL/el-peers.txt;
curl -s -o seed-data/app.toml $SEED_DATA_URL/app.toml;
curl -s -o seed-data/config.toml $SEED_DATA_URL/config.toml;

md5sum seed-data/*;
```

Run the `fetch-berachain-params.sh` file:

```bash
# [root@<EC2_PUBLIC_IP> beranode]#

chmod +x fetch-berachain-params.sh;
./fetch-berachain-params.sh;

# [Expected Output]:
# 6e4179e38e11696f8402cd5f8e872726  seed-data/app.toml
# 65313bc44bc810da50bf0dac696219fe  seed-data/config.toml
# 1b2ad016a7bb6fda99643133a07a9c4d  seed-data/el-peers.txt
# 7ac0e3756f7e3d0af36d023f9e6cfd0c  seed-data/eth-genesis.json
# a24fb9c7ddf3ebd557300e989d44b619  seed-data/genesis.json
# 5d0d482758117af8dfc20e1d52c31eef  seed-data/kzg-trusted-setup.json
```

Check the signatures above against your results. If you find any mismatches, contact us in the Discord #bug-reports channel or reach out to your Validator Relations contact.

## Set up the Consensus Client 🔗

The next script puts in place the seed data for the chain downloaded above, updates the configuration files for the consensus client to refer to certain paths correctly, then runs `beacond init` and `beacond jwt generate`.

```bash
# [root@<EC2_PUBLIC_IP> beranode]#

touch setup-beacond.sh;
```

Edit the `setup-beacond.sh` file with the following:

**File:** `setup-beacond.sh`

```bash
#!/bin/bash

set -e
. ./env.sh;
mkdir -p $BEACOND_DATA;
mkdir -p $BEACOND_CONFIG;

if [ -f "$BEACOND_CONFIG/priv_validator_key.json" ]; then
    echo "Error: $BEACOND_CONFIG/priv_validator_key.json already exists";
    exit 1;
fi

$BEACOND_BIN init $MONIKER_NAME --chain-id $CHAIN --home $BEACOND_DATA;

cp seed-data/genesis.json $BEACOND_CONFIG/genesis.json;
cp seed-data/kzg-trusted-setup.json $BEACOND_CONFIG/kzg-trusted-setup.json;
cp seed-data/app.toml $BEACOND_CONFIG/app.toml;
cp seed-data/config.toml $BEACOND_CONFIG/config.toml;

# choose sed options based on OS
if [[ "$OSTYPE" == "darwin"* ]]; then
    SED_OPT="-i ''";
else
    SED_OPT='-i';
fi

sed $SED_OPT 's|^moniker = ".*"|moniker = "'$MONIKER_NAME'"|' $BEACOND_CONFIG/config.toml;
sed $SED_OPT 's|^rpc-dial-url = ".*"|rpc-dial-url = "'$RPC_DIAL_URL'"|' $BEACOND_CONFIG/app.toml;
sed $SED_OPT 's|^jwt-secret-path = ".*"|jwt-secret-path = "'$JWT_PATH'"|' $BEACOND_CONFIG/app.toml;
sed $SED_OPT 's|^trusted-setup-path = ".*"|trusted-setup-path = "'$BEACOND_CONFIG/kzg-trusted-setup.json'"|' $BEACOND_CONFIG/app.toml;
sed $SED_OPT 's|^suggested-fee-recipient = ".*"|suggested-fee-recipient = "'$WALLET_ADDRESS_FEE_RECIPIENT'"|' $BEACOND_CONFIG/app.toml;

$BEACOND_BIN jwt generate -o $JWT_PATH;
```

Run the `setup-beacond.sh` file:

```bash
# [root@<EC2_PUBLIC_IP> beranode]#

chmod +x setup-beacond.sh;
./setup-beacond.sh;

# [Example Output]:
# {
#  "moniker": "<YOUR_MONIKER_NAME>",
#  "chain_id": "testnet-beacon-80069",
#  "node_id": "<NODE_ID>",
#  "gentxs_dir": "",
#  "app_message": {
#   "beacon": {
#    "fork_version": "0x04000000",
#    "deposits": [],
#    "execution_payload_header": {
#     "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
#     "feeRecipient": "0x0000000000000000000000000000000000000000",
#     "stateRoot": "0x12965ab9cbe2d2203f61d23636eb7e998f167cb79d02e452f532535641e35bcc",
#     "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
#     "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
#     "prevRandao": "0x0000000000000000000000000000000000000000000000000000000000000000",
#     "blockNumber": "0x0",
#     "gasLimit": "0x1c9c380",
#     "gasUsed": "0x0",
#     "timestamp": "0x0",
#     "extraData": "0x0000000000000000000000000000000000000000000000000000000000000000",
#     "baseFeePerGas": "3906250",
#     "blockHash": "0xcfff92cd918a186029a847b59aca4f83d3941df5946b06bca8de0861fc5d0850",
#     "transactionsRoot": "0x7ffe241ea60187fdb0187bfa22de35d1f9bed7ab061d9401fd47e34a54fbede1",
#     "withdrawalsRoot": "0x792930bbd5baac43bcc798ee49aa8185ef76bb3b44ba62b91d86ae569e4bb535",
#     "blobGasUsed": "0x0",
#     "excessBlobGas": "0x0"
#    }
#   }
#  }
# }
# Successfully wrote new JSON-RPC authentication secret to: /path/to/jwt.hex
```

Your state root and block hash must agree with the above.

## Set up the Execution Client 🛠️

```bash
# [root@<EC2_PUBLIC_IP> beranode]#

touch setup-reth.sh;
```

Edit the `setup-reth.sh` file with the following:

**File:** `setup-reth.sh`

```bash
#!/bin/bash

set -;
. ./env.sh;
mkdir -p $RETH_DATA;

cp seed-data/eth-genesis.json $RETH_GENESIS_PATH;
$RETH_BIN init --chain $RETH_GENESIS_PATH --datadir $RETH_DATA;
```

Run the `setup-reth.sh` file:

```bash
# [root@<EC2_PUBLIC_IP> beranode]#

chmod +x setup-reth.sh;
./setup-reth.sh;

# [Example Output]:
# 2025-02-23T17:17:35.253956Z  INFO Initialized tracing, debug log directory: /root/.cache/reth/logs/80069
# 2025-02-23T17:17:35.256050Z  INFO reth init starting
# 2025-02-23T17:17:35.262185Z  INFO Opening storage db_path="/root/beranode/.reth/db" sf_path="/root/beranode/.reth/static_files"
# 2025-02-23T17:17:35.281075Z  INFO Verifying storage consistency.
# 2025-02-23T17:17:35.326576Z  INFO Genesis block written hash=0x0207661de38f0e54ba91c8286096e72486784c79dc6a9681fc486b38335c042f
```

## Configure Systemd Service 🔧

This will setup `systemd` services for both the BeaconKit and Reth.

### BeaconKit

Make BeaconKit environment file:

```bash
# [root@<EC2_PUBLIC_IP> beranode]#

# Create BeaconKit Environment File
cat <<EOF > /root/beranode/env.beacond
CHAIN_SPEC=testnet
EOF
```

Create the `beacond.service` file:

**File:** `/etc/systemd/system/beacond.service`

```bash
[Unit]
Description=BeaconKit Node
After=network.target

[Service]
User=root
Group=root
EnvironmentFile=/root/beranode/env.beacond
ExecStart=/root/beranode/beacond start --home /root/beranode/.beacond

# Logging
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

Reload and check if the service has been setup correctly:

```bash
systemctl daemon-reload;
systemctl status beacond --no-pager;

# [Expected Output]:
# ○ beacond.service - BeaconKit Node
#    Loaded: loaded (/etc/systemd/system/beacond.service; disabled; preset: disabled)
#    Active: inactive (dead)
```

### Reth

Make Reth environment file:

```bash
# [root@<EC2_PUBLIC_IP> beranode]#

source env.sh;

# Get EL Peers
EL_PEERS=$(grep '^enode://' "seed-data/el-peers.txt"| tr '\n' ',' | sed 's/,$//');

# Create Reth Environment File
cat <<EOF > /root/beranode/env.reth
EL_AUTHRPC_PORT=8551
RPC_DIAL_URL=http://localhost:$EL_AUTHRPC_PORT
JWT_PATH=$BEACOND_CONFIG/jwt.hex

RETH_BIN=/root/beranode/reth
RETH_DATA=/root/beranode/.reth
RETH_GENESIS_PATH=$RETH_DATA/genesis.json
RETH_PEERS=$EL_PEERS

LOG_DIR=$LOG_DIR
EOF
```

Create the `reth.service` file:

**File:** `/etc/systemd/system/reth.service`

```bash
[Unit]
Description=Reth Node
After=network.target

[Service]
User=root
Group=root
EnvironmentFile=/root/beranode/env.reth
ExecStart=/root/beranode/reth node \
    --authrpc.jwtsecret=${JWT_PATH} \
    --chain=${RETH_GENESIS_PATH} \
    --datadir=${RETH_DATA} \
    --port=30303 \
    --http \
    --http.addr=0.0.0.0 \
    --http.port=8545 \
    --http.corsdomain="*" \
    --bootnodes=${RETH_PEERS} \
    --trusted-peers=${RETH_PEERS} \
    --ws \
    --ws.addr=0.0.0.0 \
    --ws.port=8546 \
    --ws.origins="*" \
    --authrpc.addr=0.0.0.0 \
    --authrpc.port=${EL_AUTHRPC_PORT} \
    --log.file.directory=${LOG_DIR}

# Logging
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

Reload and check if the service has been setup correctly:

```bash
systemctl daemon-reload;
systemctl status reth --no-pager;

# [Expected Output]:
# ○ reth.service - Reth Node
#    Loaded: loaded (/etc/systemd/system/reth.service; disabled; preset: disabled)
#    Active: inactive (dead)
```

## Start the Services 🚀

Start the services:

```bash
systemctl start beacond;
systemctl status beacond --no-pager;
systemctl start reth;
systemctl status reth --no-pager;
```

## Follow Logs

Follow the logs:

```bash
journalctl -u beacond -f;
journalctl -u reth -f;
```













