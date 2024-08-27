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

# Restoring Nodes from Snapshots

This guide will walk you through the process of using node snapshots to quickly restore a node.

## Snapshot Providers

You can find the [latest snapshots for Berachain here](https://github.com/berachain/beacon-kit/blob/main/testing/networks/80084/snapshots.md).

## What are Node Snapshots?

Snapshots are a way to quickly restore a node without having to re-sync the entire chain from scratch. Without them, the node would have to start from the genesis block and download every single block from the network. Instead, snapshots can save days or even weeks of syncing time.

That being said, snapshots will always require some syncing time as they are only a copy of the chain at a specific point in time. Make sure to always check the snapshot's timestamp to ensure it is recent enough to be useful.

## How can Snapshots differ?

### Different Client Types

In the case of Berachain, snapshots can be found for both the Consensus Client and the Execution Client. Only the Consensus Client snapshot is required to run a node, as the Execution Client can rebuild the chain history from its paired Consensus Client, but, when available, the Execution Client snapshot is recommended to skip the rebuilding process & reduce the amount of time syncing.

#### Consensus Client Snapshot Differences

- **Consensus Database**

On Beacon-Kit, it's possible to run your node with different databases. The default is `pebbledb`, but it's also possible to use others (the full list can be found in the config.toml file after you initialize your client with beacond).

#### Execution Client Snapshot Differences

- **Chosen Execution Client**

Each Execution Client saves their data differently, so it's important to make sure the snapshot you are using was made with the same Execution Client as your node. Remember, if you can't find a snapshot for your Execution Client, you can always sync your execution client from the paired Consensus Client.

### Different Snapshot Size Types

There are two types of snapshot sizes:

- **Archive Snapshot**
  - Contains the entire chain history
  - Larger in size
  - Useful for performing historical queries
- **Pruned Snapshot**
  - Contains only the most recent blocks
  - Smaller in size
  - Useful for quickly syncing a node, validating the chain, and performing common transactions / queries

## How to use Node Snapshots

Different snapshot providers may have different instructions for using their snapshots, however, here is an overview on the general process for using snapshots:

### Step 1 - Backup your Beacon-Kit Config Folder

Some snapshots may include the config folder in their zip file, so it's important to backup your current config folder before using a snapshot. This ensures that you can easily keep your node's configuration settings and, most importantly, _your validator keys_.

An example of this is as follows:

```bash
cp -r $BEACOND_HOME/config $HOME/beacond-config-backup
```

Where `$BEACOND_HOME` is the directory of your beacond config and `$HOME` is your home directory (or some other directory you choose to backup to).

### Step 2 - Download the Snapshot

Select which [snapshot provider](https://github.com/berachain/beacon-kit/blob/main/testing/networks/80084/snapshots.md) you would like to use and download the snapshot. Then run the following command to download the snapshot:

```bash
wget -O $CUSTOM_SNAPSHOT_NAME $SNAPSHOT_URL
```

Where `$CUSTOM_SNAPSHOT_NAME` is the name you would like to give to the snapshot file (with file extension) and `$SNAPSHOT_URL` is the URL of the snapshot you would like to download.

:::info
`curl` also works if you prefer to use it for downloading the snapshot.
:::

Don't forget to do this for both the Consensus Client and the Execution Client if you are restoring both, otherwise, just the Consensus Client snapshot is fine.

### Step 3 - Verify the Snapshot (Optional)

You can verify the snapshot against the checksum (if provided by the snapshot provider) to ensure the snapshot downloaded is valid.

```bash
sha256sum $CUSTOM_SNAPSHOT_NAME
```

The result will be a hash that you can compare to the checksum provided by the snapshot provider. If the hashes match, the snapshot is valid meaning it was not corrupted during the download process.

### Step 4 - Extract the Snapshot(s)

Your extracted snapshot will look something like this:

:::info
The config folder may or may not be included in the snapshot, depending on the snapshot provider. This is why it's important to backup your config folder before using a snapshot.
:::

```bash
> tree $EXTRACTED_SNAPSHOT_DIR

/root/tmp_snapshot_extraction
├── config
│   ├── addrbook.json
│   ├── app.toml
│   ├── client.toml
│   ├── config.toml
│   ├── genesis.json
│   ├── kzg-trusted-setup.json
│   ├── node_key.json
│   └── priv_validator_key.json
├── data
    ├── application.db
    │   ├── 000056.sst
    │   ├── ...
    │   ├── CURRENT
    │   ├── LOCK
    │   ├── MANIFEST-014039
    │   ├── MANIFEST-014065
    │   └── OPTIONS-014066
    ├── blockstore.db
    │   ├── 002506.sst
    │   ├── ...
    │   ├── CURRENT
    │   ├── LOCK
    │   ├── MANIFEST-047787
    │   ├── MANIFEST-047831
    │   └── OPTIONS-047832
    ├── cs.wal
    │   ├── wal
    │   ├── wal.3565
    │   ├── ...
    ├── deposits.db
    │   ├── 001142.log
    │   ├── ...
    │   ├── CURRENT
    │   ├── LOCK
    │   ├── MANIFEST-001125
    │   ├── MANIFEST-001131
    │   └── OPTIONS-001132
    ├── evidence.db
    │   ├── 000075.sst
    │   ├── 000076.sst
    │   ├── 000077.log
    │   ├── CURRENT
    │   ├── LOCK
    │   ├── MANIFEST-000073
    │   ├── MANIFEST-000078
    │   └── OPTIONS-000079
    ├── priv_validator_state.json
    ├── snapshots
    │   └── metadata.db
    │       ├── 000052.log
    │       ├── CURRENT
    │       ├── LOCK
    │       ├── MANIFEST-000050
    │       ├── MANIFEST-000053
    │       └── OPTIONS-000054
    ├── state.db
    │   ├── 001750.sst
    │   ├── ...
    │   ├── CURRENT
    │   ├── LOCK
    │   ├── MANIFEST-008554
    │   ├── MANIFEST-008576
    │   └── OPTIONS-008577
    └── tx_index.db
        ├── 002680.sst
        ├── ...
        ├── CURRENT
        ├── LOCK
        ├── MANIFEST-018865
        ├── MANIFEST-018892
        └── OPTIONS-018893

13 directories, 4804 files
```

:::warning
If you are already running a node, make sure to stop the node before extracting the snapshot. Otherwise, you may end up with data corruption.
:::

### Consensus Client Snapshot Configuration

Let's first extract the Beacon-Kit snapshot. This can be done with the following command:

```bash
lz4 -c -d $CUSTOM_SNAPSHOT_NAME | tar -x -C $BEACOND_HOME
```

Make sure that the `$BEACOND_HOME` variable points to the correct directory of your beacond config. Something like `/root/.beacond/` on Linux, unless you've configured it differently.

### Execution Client Snapshot Configuration

The steps will differ depending on the Execution Client you are using, however, the general process is the same.

For example, if you are using `geth`, you can expect a command similar to the following:

```bash
lz4 -c -d $CUSTOM_SNAPSHOT_NAME | tar -x -C $GETH_DATA_DIR
```

Make sure that the `$GETH_DATA_DIR` variable points to the correct directory of your geth data. Something like `/root/.ethereum/data/geth`.


### Step 5 - Restore your Validator Config

Now that you have extracted the snapshot, you can restore your validator config by copying the backup you created in Step 1.

```bash
cp -r $HOME/beacond-config-backup $BEACOND_HOME/config
```

### Step 6 - Start your Node

Now you're good to start your node back up!