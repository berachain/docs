---
head:
  - - meta
    - property: og:title
      content: Node Snapshots for Berachain
  - - meta
    - name: description
      content: How to use node snapshots in Berachain
  - - meta
    - property: og:description
      content: How to use node snapshots in Berachain
---

<script setup>
</script>

# Restoring Berachain Nodes from Snapshots

This guide will walk you through the process of using node snapshots to quickly restore a node.

## Snapshot Providers

Snapshots are provided and managed by the community.

You can find the [latest snapshots for Berachain here](https://github.com/berachain/beacon-kit/blob/main/testing/networks/80084/snapshots.md). Instructions for restoring Berachain Foundation snapshots are available below.

## What are Node Snapshots?

Snapshots are a way to quickly restore a node without having to re-sync the entire chain from scratch. Without them, the node would have to start from the genesis block and download every single block from the network. Instead, snapshots can save days or even weeks of syncing time.

That being said, snapshots will always require some syncing time as they are only a copy of the chain at a specific point in time. Make sure to always check the snapshot's timestamp to ensure it is recent enough to be useful.

## How can Snapshots differ?

### Different Client Types

In the case of Berachain, snapshots can be found for both the Consensus Client and the Execution Client. Only the Consensus Client snapshot is required to run a node, as the Execution Client can rebuild the chain history from its paired Consensus Client, but, when available, the Execution Client snapshot is recommended to skip the rebuilding process & reduce the amount of time syncing.

#### Consensus Client Snapshots

**Consensus Database**

On Beacon-Kit, it's possible to run your node with different databases. The default is `pebbledb`, but it's also possible to use others (the full list can be found in the [config.toml](https://github.com/berachain/beacon-kit/blob/2cc8a07618f51edb228c4ee753bbcb970f28ed35/testing/networks/80084/config.toml#L51) file after you initialize your client with beacond).

#### Execution Client Snapshots

**Chosen Execution Client**

Each [Execution Client](/learn/help/glossary#execution-client) saves their data differently, so it's important to make sure the snapshot you are using was made with the same Execution Client as your node. Remember, if you can't find a snapshot for your Execution Client, you can always sync your execution client from the paired Consensus Client.

### Different Snapshot Size Types

There are two types of snapshot sizes:

| Snapshot Type | History              | Size  | Benefits                       |
| ------------- | -------------------- | ----- | ------------------------------ |
| **Archive**   | Entire chain history | Large | Historical queries             |
| **Pruned**    | Most recent blocks   | Small | Quick syncs & validating chain |

## How To Import Node Snapshots

Different snapshot providers may have different instructions for using their snapshots, however, here we provide an overview for how to use snapshots from the Berachain Foundation.

### Step 1 - Download Snapshots

Select which beacon client snapshot, based on your region and preferred snapshot type, you would like to use from the Berachain Foundation. The following options are available:

| Region            | Snapshot Type    | Link                                                                 |
| ----------------- | ---------------- | -------------------------------------------------------------------- |
| **North America** | Archive / Pruned | [Link](https://storage.googleapis.com/bartio-snapshot/index.html)    |
| **Europe**        | Archive / Pruned | [Link](https://storage.googleapis.com/bartio-snapshot-eu/index.html) |
| **Asia**          | Archive / Pruned | [Link](https://storage.googleapis.com/bartio-snapshot-as/index.html) |

#### Step 1A - Downloading Beacon Client Snapshot

In the snapshot folder, you will find beacon snapshots under the following paths:

- `beacon/pruned/`
- `beacon/full/`

Download the snapshot you would like to use with the following command:

```bash
# $SNAPSHOT_URL example: https://storage.googleapis.com/bartio-snapshot/beacon/full/snapshot_beacond_full_20240913200045.tar.lz4
wget $SNAPSHOT_URL;
```

Where `$SNAPSHOT_URL` is the URL of the snapshot you would like to download.

:::info
`curl`, `aria2c` and other downloaders also work if you prefer to use them for downloading the snapshot.
:::

#### Step 1B - Downloading Execution Client Snapshot

In the snapshot folder, you will find execution snapshots under the following paths:

- `eth/geth/pruned/`
- `eth/geth/archive/`
- etc... for each execution client

::: info
Execution client snapshots coming soon. They are not required to run a node.
:::

### Step 2 - Verify Snapshot (Optional)

You can verify the snapshot against the checksum to ensure the snapshot downloaded is valid. The checksum is a hash of the snapshot file that can be used to verify the snapshot's integrity.

Checksum files are provided by the Berachain Foundation with the file extension `.sha256` added to the end of the snapshot file name. For example, if you would like the sha256sum for the snapshot file example above, it is `https://storage.googleapis.com/bartio-snapshot/beacon%2Ffull%2Fsnapshot_beacond_full_20240913200045.tar.lz4.sha256`.

The following is an example of how to download and verify the checksum for the beacon snapshot:

```bash
# Download the checksum file
# $SNAPSHOT_URL example: https://storage.googleapis.com/bartio-snapshot/beacon/pruned/beacond-pruned-snapshot-202408292106.tar.lz4
wget $SNAPSHOT_URL.sha256;

# Verify the checksum
# The following command will check the hash against the snapshot file as long as the filename matches
# $SNAPSHOT_CHECKSUM_FILE example: beacond-pruned-snapshot-202408292106.tar.lz4.sha256
sha256sum -c $SNAPSHOT_CHECKSUM_FILE;

# [Expected Equivalent Output]:
# beacond-pruned-snapshot-202408292106.tar.lz4: OK
```

Where `$SNAPSHOT_CHECKSUM_FILE` is the name of the checksum file you downloaded.

:::warning
It's important to ensure that the filename of the snapshot file is the same as the filename inside the checksum file, otherwise `sha256sum` will not be able to verify the snapshot. Additionally, the snapshot file and its checksum file must be located in the same directory.
:::

### Step 3 - Extract Snapshot(s)

Your extracted snapshot will look similar to the following folders and files:

```bash
# $EXTRACTED_SNAPSHOT_DIR example: /root/beacon-snapshot
tree $EXTRACTED_SNAPSHOT_DIR;

# [Expected Equivalent Output]:
# /root/beacon-snapshot
# ├── data
#     ├── application.db
#     │   ├── 000056.sst
#     │   ├── ...
#     │   ├── CURRENT
#     │   ├── LOCK
#     │   ├── MANIFEST-014039
#     │   ├── MANIFEST-014065
#     │   └── OPTIONS-014066
#     ├── blockstore.db
#     │   ├── 002506.sst
#     │   ├── ...
#     │   ├── CURRENT
#     │   ├── LOCK
#     │   ├── MANIFEST-047787
#     │   ├── MANIFEST-047831
#     │   └── OPTIONS-047832
#     ├── deposits.db
#     │   ├── 001142.log
#     │   ├── ...
#     │   ├── CURRENT
#     │   ├── LOCK
#     │   ├── MANIFEST-001125
#     │   ├── MANIFEST-001131
#     │   └── OPTIONS-001132
#     ├── evidence.db
#     │   ├── 000075.sst
#     │   ├── 000076.sst
#     │   ├── 000077.log
#     │   ├── CURRENT
#     │   ├── LOCK
#     │   ├── MANIFEST-000073
#     │   ├── MANIFEST-000078
#     │   └── OPTIONS-000079
#     ├── priv_validator_state.json
#     ├── state.db
#         ├── 001750.sst
#         ├── ...
#         ├── CURRENT
#         ├── LOCK
#         ├── MANIFEST-008554
#         ├── MANIFEST-008576
#         └── OPTIONS-008577
#
# 13 directories, 4804 files
```

:::warning
If you are already running a node, make sure to stop the node before extracting the snapshot. Otherwise, you may end up with data corruption.
:::

#### Step 3A - Consensus Client Snapshot Configuration

Let's first extract the Beacon-Kit snapshot. Extracting can be done with the following command:

```bash
# Ensure that you have `lz4` installed on your system
# $BEACOND_SNAPSHOT_FILE example: beacond-pruned-snapshot-202408292106.tar.lz4
# $BEACOND_HOME example: /root/.beacond/
lz4 -d $BEACOND_SNAPSHOT_FILE | tar -xvf - --strip-components=2 -C $BEACOND_HOME;
```

In the above command, the `$BEACOND_SNAPSHOT_FILE` variable points to the name of the beacon snapshot file you downloaded. Make sure that the `$BEACOND_HOME` variable points to the correct directory of your beacond config.

#### Step 3B - Execution Client Snapshot Configuration (Optional)

The steps will differ depending on the Execution Client you are using, however, the general process is the same.

For example, if you are using `geth`, you can expect a command similar to the following:

```bash
# $GETH_SNAPSHOT_FILE example: geth-pruned-snapshot-202408292106.tar.lz4
# $GETH_DATA_DIR example: /root/.ethereum/data/geth
lz4 -c -d $GETH_SNAPSHOT_FILE | tar -x -C $GETH_DATA_DIR;
```

In the above command, the `$GETH_SNAPSHOT_FILE` variable points to the name of the geth snapshot file you downloaded. Make sure that the `$GETH_DATA_DIR` variable points to the correct directory of your geth data.

### Step 4 - Start Your Node

Now you're good to start your node back up! Run the appropriate binary command, systemd service or other custom configuration to start your beacon node back up, as well as the same for your execution client.
