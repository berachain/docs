---
head:
  - - meta
    - property: og:title
      content: Berachain Docker Node Quickstart
  - - meta
    - name: description
      content: Setup a Berachain testnet node with Docker
  - - meta
    - property: og:description
      content: Setup a Berachain testnet node with Docker
---

# Berachain Run A Node With Docker 🐳

This quickstart guide will walk you through an even easier and faster way to run testnet bArtio RPC node using [Docker](https://docs.docker.com/engine/install/) instead of [Build & Run From Source](../quickstart.md#build-run-from-source-🛠%EF%B8%8F). We'll use [berachain-docker-node](https://github.com/upnodedev/berachain-docker-node) tool for this purpose.

## Requirements

Before we begin, please make sure to have the following installed on your computer:

- [Docker](https://docs.docker.com/engine/install/) `version 27.1.1` or greater
- [Docker Compose](https://docs.docker.com/compose/install/) `v2.29.1` or greater

## Step 1 - Clone Repo & Configure Node

First, start off by cloning the berachain-docker-node repository.

```bash
git clone https://github.com/upnodedev/berachain-docker-node;
cd berachain-docker-node;
```

Then optionally change the configuration in the `.env` file, e.g., change `MONIKER_NAME` to your preferred one. The rest within this quickstart guide we can leave by default.

```bash
#########################################################################
#                          NODE CONFIGURATION                           #
#########################################################################

# Beacond
MONIKER_NAME=YourMonikerName
# ...
```

:::tip
**NOTE:**
Before the next step, we recommend to read the [Using Snapshots](#using-snapshots) section first.
:::

## Step 2 - Run Node

```bash
./run;

# [Expected Output]:
# [+] Running 1/1
#  ✔ beacond Pulled
# [+] Building 1.7s (6/14)
#  => [build internal] load build definition from Dockerfile
#  => => transferring dockerfile: 1.05kB
#  => [build internal] load metadata for docker.io/library/ubuntu:24.04
#  => [build internal] load .dockerignore
#  => => transferring context: 2B
# ...
```

This step may take some time.

After successfully starting the `beacond` and `reth` services, you can find the corresponding config files in `data/beacond/config/` and `/data/reth`.

:::warning
**IMPORTANT:** Make sure to securely backup your `data/beacond/config/priv_validator_key.json` file if running a validator node.
:::

## Using Snapshots

To avoid waiting for the long sync time, we can use `beacond` & `reth` snapshots in one of these two ways. Choose whichever one you like.

### Custom Snapshots

Download and decompress the pruned beacond (pebbledb) and full reth snapshots as described in [Quickstart: Run A Node - Step 4 (Download Snapshot)](../quickstart#step-4-download-snapshot-recommended).

But move the files to the shared `data` directory.

```bash
# FROM: ./berachain-docker-node

# beacond
mv ./snapshots/tmp/beacond/data ./data/beacond/data;

# reth
mv ./snapshots/tmp/reth/blobstore ./data/reth;
mv ./snapshots/tmp/reth/db ./data/reth;
mv ./snapshots/tmp/reth/static_files ./data/reth;
```

Go back to [step 2](#step-2-run-node).

### Auto Snapshots

Just set `true` for `BEACOND_SNAPSHOT_ENABLED` and `RETH_SNAPSHOT_ENABLED` in the `.env` file. In this case, snapshots will be downloaded and decompressed automatically.

```bash
#########################################################################
#                          ↓ SNAPSHOTS ↓                                #
#########################################################################

# Snapshot source configuration (bera-snap)
SNAPSHOT_SOURCE="api" # Possible values: "gcs" or "api"
# SNAPSHOT_METADATA_URL="https://storage.googleapis.com/yourbucket/berachain/snapshots/metadata.json" # EXAMPLE GCS URL!
SNAPSHOT_METADATA_URL="http://bera-api.upnode.org/snapshots"

# Beacond
BEACOND_SNAPSHOT_ENABLED=true
BEACOND_SNAPSHOT_DATADIR_NAME="data/beacond/data"

# Reth
RETH_SNAPSHOT_ENABLED=true
RETH_SNAPSHOT_DATADIR_NAME="data/reth"
# ...
```

Go back to [step 2](#step-2-run-node).

## Check Logs

```bash
# FROM: ./berachain-docker-node

docker compose logs -f --tail 100;
```
