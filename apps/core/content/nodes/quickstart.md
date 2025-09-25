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

This guide walks you through setting up a Berachain node on Linux. It guides you through platform selection, virtual machine config, and offers two approaches to setting up a system - "just do it for me" and "help me understand how this works".

Kubernetes environments are also perfectly viable, but require extensive expertise to produce a reliable result, and are thus beyond the scope of this guide.

## 🔥📄🔥 TL;DR

1. Launch a new machine based on Debian or Ubuntu:
- an AWS `is4gen.medium` instance ($60/mo cheapest option that works)
- a [Hetzner AX102](https://www.hetzner.com/dedicated-rootserver/ax102/) ($130/mo monster dedicated machine)
2. Configure the security rules to allow traffic on all ports from all sources.
3. Login in, then fetch and run our all-in-one script:

```
wget https://raw.githubusercontent.com/berachain/guides/refs/heads/main/apps/node-scripts/mkberanode.sh
chmod +x mkberanode.sh
sudo ./mkberanode.sh  --chain mainnet --el geth --mode pruned
# snapshots download for a couple hours
sudo systemctl start berachain-el
sudo systemctl start berachain-cl
```

Give it a few minutes to warm up, then test it:

```
EXT_IP="$(curl -sf ipv4.canhazip.com)"
RPC="http://$EXT_IP:8545"
curl -s -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","method":"eth_blockNumber", \
  "params":[],"id":1}' "http://$RPC:8545"
```

In the US-EAST region, this costs ~ $820 USD per year and should be fine for a few years until our chain state outgrows the storage volume of 937 GB.

## Choosing Your Hardware

Selecting appropriate hardware significantly impacts both node performance and operational costs. Blockchain nodes typically need a large amount of committed storage space, since the chain state is generally growing about 500gb per year. Network-based storage, such as AWS EBS volumes, charge for the maximum size of the volume. So if you reserve 4 TB, you are paying for 4 TB, even if you currenly only use 300 GB. Costs for network storage are also high: a 4TB volume at AWS is $400/mo. In contrast, a 4TB disk attached to a dedicated server costs $25/mo.

Therefore we recommend **dedicated servers** for Berachain instances. Here are some we recommend as of October 2025:

1. In Europe, Hetzner [is a popular choice](https://www.hetzner.com/dedicated-rootserver/).
2. In North America, Interserver [has a number of offerings](https://www.interserver.net/dedicated/buy-now-servers.html).

3. OVH has several data centres [on every continent](https://www.ovhcloud.com/en/bare-metal/regions-availability/).

Should you prefer to use _cloud compute_ such as AWS, we recommend instances that come with instance storage. The scripts in this guide will automatically detect the instance storage and put it to use. You can [research your instance options](https://ec2instances.info). The tradeoff with on-instance storage is that the storage will be wiped if the instance is ever stopped (but it does survive reboots). Further, we recommend ARM instances as these are generally 15-20% cheaper.

### Hardware Sizing Guide

| Use Case                                       | CPU Cores  | RAM      | Storage | Example CPU          |
| ---------------------------------------------- | ---------- | -------- | ------- | -------------------- |
| **Development/Testing**                        | 4-8 cores  | 16-32GB  | 1 TB    | XEON, AMD 5600X      |
| **Production Pruned**                          | 8-16 cores | 32-48GB  | 1-2TB   | XEON, 5900X          |
| **High-Traffic RPC**                           | 8-16 cores | 48-64GB  | 1-2 TB  | Xeon E5, AMD 7950X3D |
| **Archive Node with both testnet and mainnet** | 16 cores   | 64-128GB | 4 TB   | Xeon E5, AMD 7950X3D |

## Quick Start with mkberanode.sh

The `mkberanode.sh` script automates the entire node setup process. This is the recommended approach for most users.

### 1. Download the Script

```bash
curl -fsSL https://raw.githubusercontent.com/berachain/guides/main/apps/node-scripts/mkberanode.sh -o mkberanode.sh
chmod +x mkberanode.sh
sudo ./mkberanode.sh --help
```

### 2. Basic Installation

For a standard mainnet node with snapshots:

```bash
sudo ./mkberanode.sh --chain mainnet --el reth --mode pruned
```

For a Bepolia archive node based on bera-get synced from scratch from the first block:

```bash
sudo ./mkberanode.sh --chain bepolia --el geth \
  --mode archive --no-snapshot
```

### 3. Configuration Options

The script supports various configuration options:

| Option                 | Values               | Description                                         |
| ---------------------- | -------------------- | --------------------------------------------------- |
| `--chain`              | `mainnet`, `bepolia` | Target network                                      |
| `--el`                 | `reth`, `geth`       | Execution client                 |
| `--mode`               | `archive`, `pruned`  | Node type                                           |
| `--no-snapshot`        | (flag)               | Do not fetch a snapshot |
| `--snapshot-geography` | `na`, `eu`, `as`     | Snapshot download region                            |
| `--cl-version`         | `vX.Y.Z`             | Specific consensus client version                   |
| `--el-version`         | `vX.Y.Z`             | Specific execution client version                   |

### 4. What the Script Does

The automated installation:

1. **System Dependencies**: Installs required packages (curl, tar, lz4, etc.)
2. **Binary Installation**: Downloads and installs beacond and execution client
3. **Network Configuration**: Fetches genesis files and network parameters
4. **Database Initialization**: Sets up blockchain databases
5. **Snapshot Download**: Downloads and installs snapshots (optional)
6. **Service Creation**: Creates and enables systemd services
7. **Security Setup**: Generates JWT secrets and sets proper permissions

After installation, you will be given commands to launch the chains.  The services have been set up to provide RPC and websocket service of standard ETH RPCs, and use our recommended settings in the CL and EL.

### 5. Start Services

After installation with `mkberanode.sh`, services are automatically enabled but not started:

```bash
# Start execution layer first
sudo systemctl start berachain-el.service
sudo systemctl start berachain-cl.service

# Check status
sudo systemctl status berachain-el.service
sudo systemctl status berachain-cl.service
```

## Understanding the Berachain Node Setup

The `mkberanode.sh` script orchestrates a complete Berachain node deployment. Understanding how it works provides insight into the node architecture and can help with troubleshooting and customization.

### Chain Parameters and Genesis Files

Berachain nodes require specific genesis files and network parameters that define the initial state and rules of the blockchain:

#### Network Configuration Sources

The script downloads network parameters from the beacon-kit repository:

```
https://raw.githubusercontent.com/berachain/beacon-kit/main/testing/networks/{CHAIN_ID}/
```

Where `CHAIN_ID` is:
- `80094` for mainnet
- `80069` for bepolia (testnet)

#### Critical Genesis Files

**Execution Layer Genesis** (`eth-genesis.json`)
- Defines initial account balances, contract deployments, and EVM parameters
- Sets the chain ID, gas limits, and consensus algorithm parameters
- Contains the genesis block hash that all nodes must agree upon
- Used by both bera-reth and bera-geth to initialize their databases

**Consensus Layer Genesis** (`genesis.json`)
- Defines initial validator set and staking parameters
- Contains BeaconKit-specific configuration for proof-of-stake consensus
- Sets epoch timing, slot duration, and validator rewards
- Used by beacond to initialize the consensus state

**KZG Trusted Setup** (`kzg-trusted-setup.json`)
- Cryptographic parameters for EIP-4844 blob transactions
- Required for data availability and rollup functionality
- Ensures all nodes use the same cryptographic assumptions

#### Network Configuration Files

Additional configuration files are downloaded when available:

- `config.toml`: P2P networking, RPC endpoints, and node behavior
- `app.toml`: Application-specific settings like pruning, API endpoints
- `el-bootnodes.txt`: Bootstrap nodes for execution layer peer discovery
- `el-peers.txt`: Static peers for execution layer networking

### Directory Structure: `/opt/berachain`

The script creates a standardized directory layout under `/opt/berachain`:

```
/opt/berachain/
├── bin/                    # Executable binaries
│   ├── beacond            # Consensus layer client
│   └── bera-reth          # Execution layer client (or bera-geth)
├── var/                   # Runtime data
│   ├── beacond/           # Consensus layer data
│   │   ├── config/        # Configuration files
│   │   │   ├── genesis.json
│   │   │   ├── config.toml
│   │   │   ├── app.toml
│   │   │   ├── kzg-trusted-setup.json
│   │   │   └── jwt.hex    # Shared secret for EL-CL communication
│   │   └── data/          # Blockchain state and blocks
│   └── el/                # Execution layer data
│       ├── bera-reth/     # Reth database (or bera-geth/)
│       └── config/        # EL configuration
├── chainspec/             # Network parameters
│   ├── el/
│   │   └── genesis.json   # EL genesis file
│   ├── cl/
│   │   ├── genesis.json   # CL genesis file
│   │   ├── config.toml    # Network config
│   │   └── app.toml       # App config
│   └── kzg-trusted-setup.json
└── runtime/               # Shared runtime files
    └── jwt.hex           # Engine API authentication
```

#### Directory Purpose and Ownership

All directories are owned by the `berachain` system user for security isolation. Key purposes:

- **`bin/`**: Contains the node software binaries downloaded from GitHub releases
- **`var/beacond/`**: Consensus layer home directory with configuration and blockchain data
- **`var/el/`**: Execution layer data directory with state databases
- **`chainspec/`**: Network parameter templates used during initialization
- **`runtime/`**: Shared secrets and runtime configuration

### Database Initialization Process

#### Execution Layer Initialization

The script initializes the execution layer database using the network genesis file:

**For bera-reth:**
```bash
bera-reth init --datadir /opt/berachain/var/el --chain /opt/berachain/chainspec/el/genesis.json
```

**For bera-geth:**
```bash
bera-geth init --state.scheme=path --datadir /opt/berachain/var/el/bera-geth/ /opt/berachain/chainspec/el/genesis.json
```

This process:
- Creates the database schema
- Inserts the genesis block and initial state
- Sets up account balances and smart contract code
- Establishes the starting point for blockchain synchronization

#### Consensus Layer Initialization

The consensus layer is initialized using beacond:

```bash
beacond init "berachain-node" --chain-id {CHAIN_ID} --home /opt/berachain/var/beacond --beacon-kit.chain-spec {mainnet|testnet}
```

This creates the consensus data directory and reads network-specific files:
- Genesis state for proof-of-stake consensus
- Network configuration for P2P and API settings
- KZG trusted setup for data availability

### Snapshot Integration

When snapshots are enabled, the script streams compressed blockchain data directly into the database directories:

**Process Flow:**
1. Fetch snapshot metadata from Google Cloud Storage buckets
2. Identify latest snapshots for the specified client and mode
3. Stream download and decompress directly to target directories:
   - Beacon snapshots → `/opt/berachain/var/beacond/data/`
   - Execution snapshots → `/opt/berachain/var/el/`

**Benefits:**
- Reduces initial sync time from hours/days to minutes
- No intermediate storage required (streams directly)

### systemd Service Architecture

The script creates two interconnected systemd services:

#### Execution Layer Service (`berachain-el.service`)

```ini
[Unit]
Description=Berachain Execution Layer (reth/geth)
Wants=network-online.target
After=network-online.target

[Service]
User=berachain
Group=berachain
ExecStart=/opt/berachain/bin/bera-reth node --datadir /opt/berachain/var/el \
  --http --http.addr 0.0.0.0 --http.port 8545 \
  --ws --ws.addr 0.0.0.0 --ws.port 8546 \
  --authrpc.addr 127.0.0.1 --authrpc.port 8551 --authrpc.jwtsecret /opt/berachain/runtime/jwt.hex \
  --port 30303 --chain /opt/berachain/var/el/config/genesis.json
Restart=always
RestartSec=3
LimitNOFILE=1048576

[Install]
WantedBy=multi-user.target
```

#### Consensus Layer Service (`berachain-cl.service`)

```ini
[Unit]
Description=Berachain Consensus Layer (beacond)
Requires=berachain-el.service
After=berachain-el.service

[Service]
User=berachain
Group=berachain
ExecStart=/opt/berachain/bin/beacond start --home /opt/berachain/var/beacond 
Restart=always
RestartSec=3
LimitNOFILE=1048576

[Install]
WantedBy=multi-user.target
```

#### Service Dependencies and Communication

The service dependency chain ensures `berachain-el.service` starts first to establish the execution layer, followed by `berachain-cl.service` starting after the EL is running. Inter-client communication occurs through the Engine API on port 8551, facilitating CL ↔ EL communication for block proposals and validation. JWT authentication using a shared secret (`jwt.hex`) secures Engine API communications, while external applications connect via JSON-RPC on port 8545 (HTTP) or 8546 (WebSocket).

#### Service Management and Monitoring

**Standard Operations:**
```bash
# Start services in correct order
sudo systemctl start berachain-el.service
sudo systemctl start berachain-cl.service

# Check service status
sudo systemctl status berachain-*.service

# View logs
sudo journalctl -u berachain-el.service -f
sudo journalctl -u berachain-cl.service -f

# Restart for upgrades
sudo systemctl restart berachain-el.service
sudo systemctl restart berachain-cl.service
```

### Network Integration and P2P Discovery

#### Execution Layer Networking

The execution layer client connects to the network using bootstrap nodes from `el-bootnodes.txt` for initial peer discovery, P2P port 30303 for ongoing peer communication, and external IP detection for NAT traversal and peer advertisement.

#### Consensus Layer Networking

The CL client establishes connectivity through:
- **P2P port 26656** for validator and node communication
- **External address configuration** using detected public IP
- **Beacon network participation** for consensus message propagation

## Post-Installation Checks

### Check Consensus Layer Sync

```bash
# Check if still syncing
curl -s http://localhost:26658/status | jq '.result.sync_info.catching_up'
```

### Check Execution Layer Sync

```bash
# Get current block number
curl -X POST -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' \
  http://localhost:8545

# Check sync status
curl -X POST -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}' \
  http://localhost:8545
```

### Network Information

```bash
# Get network information
curl -X POST -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":1}' \
  http://localhost:8545

# Mainnet returns: "80094"
# Bepolia returns: "80069"
```

### Consensus Layer Status

```bash
# Get consensus client status
curl -s http://localhost:26658/status | jq '{
  latest_block_height: .result.sync_info.latest_block_height,
  catching_up: .result.sync_info.catching_up,
  latest_block_time: .result.sync_info.latest_block_time
}'
```

### View Logs

```bash
# Execution layer logs
sudo journalctl -u berachain-el.service -f

# Consensus layer logs
sudo journalctl -u berachain-cl.service -f

# Both services
sudo journalctl -u berachain-*.service -f
```

### Upgrades for hardforks

Re-run `mkberanode.sh` specifying the same chain and clients. Alternatively, you can edit your copy of mkberanode.sh to provide defaults for these values.

`mkberanode.sh` will display the version numbers that are installed and produce an md5 siganture of the genesis files. These should agree with the upgrade instructions.

After the upgrade has completed, restart the `berachain-el` and `bearchain-cl` services or reboot your node.

## Troubleshooting

### Common Issues

#### Services Won't Start

```bash
# Check service status
sudo systemctl status berachain-el.service berachain-cl.service

# Check logs for errors
sudo journalctl -u berachain-el.service -n 50
sudo journalctl -u berachain-cl.service -n 50
```

#### Sync Issues

```bash
# Restart services to resume sync
sudo systemctl restart berachain-el.service
sudo systemctl restart berachain-cl.service

# Check disk space
df -h /opt/berachain
```

#### Port Conflicts

```bash
# Check if ports are in use
sudo netstat -tulpn | grep -E ':(8545|8546|8551|30303|26656|26657|26658)'

# Default ports used:
# 8545: HTTP RPC
# 8546: WebSocket RPC
# 8551: Engine API
# 30303: P2P execution
# 26656: P2P consensus
# 26657: Consensus RPC
# 26658: Node API
```

#### Permission Issues

```bash
# Fix ownership if needed
sudo chown -R berachain:berachain /opt/berachain
```

## Next Steps

Consider setting up monitoring using our [monitoring guide](/nodes/monitoring) to track your node's performance and health. If you're interested in participating in consensus, review our [validator guide](/nodes/guides/validator) to learn about becoming a validator. For production deployments, carefully review our [production checklist](/nodes/production-checklist) to ensure your setup meets enterprise requirements.

### Firewall Configuration

```bash
# Install UFW firewall
sudo ufw allow ssh

# RPC access (be careful with public exposure)
sudo ufw allow 8545/tcp comment "Berachain RPC"
sudo ufw allow 8546/tcp comment "Berachain WebSocket"

# P2P networking (required for sync)
sudo ufw allow 30303 comment "Execution P2P"
sudo ufw allow 26656 comment "Consensus P2P"

# Enable firewall
sudo ufw --force enable
```

### Getting Help

For assistance with your node setup, check our [FAQ](/nodes/faq) for answers to common questions. Join our Discord community for peer support and real-time discussion with other node operators. Report technical issues or contribute improvements through our [GitHub repository](https://github.com/berachain/).
