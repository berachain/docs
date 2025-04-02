# Berachain Node Configuration Reference

## app.toml

### Base Configuration (Top-level Options)

These options appear at the top of the file without a section header.

| Option                  | Description                                                                | Default Value  |
| ----------------------- | -------------------------------------------------------------------------- | -------------- |
| `pruning`               | Pruning strategy for state storage                                         | `"everything"` |
| `pruning-keep-recent`   | Number of recent states to keep when using `custom` pruning                | `"0"`          |
| `pruning-interval`      | Interval for state pruning when using `custom` pruning                     | `"0"`          |
| `halt-height`           | Block height at which to gracefully halt the node                          | `0`            |
| `halt-time`             | Unix timestamp at which to gracefully halt the node                        | `0`            |
| `min-retain-blocks`     | Minimum block height offset from current block for pruning CometBFT blocks | `0`            |
| `inter-block-cache`     | Enables inter-block caching                                                | `true`         |
| `iavl-cache-size`       | Size of the IAVL tree cache (in number of nodes)                           | `2500`         |
| `iavl-disable-fastnode` | Disables the fast node feature of IAVL                                     | `true`         |

#### Pruning Options

- `default`: The last 362880 states are kept, pruning at 10 block intervals
- `nothing`: All historic states will be saved, nothing will be deleted (archiving node)
- `everything`: Only 2 latest states will be kept; pruning at 10 block intervals
- `custom`: Manual specification through `pruning-keep-recent` and `pruning-interval`

### Telemetry Configuration `[telemetry]`

| Option                      | Description                                           | Default Value |
| --------------------------- | ----------------------------------------------------- | ------------- |
| `service-name`              | Prefix for keys to separate services                  | `""`          |
| `enabled`                   | Enables application telemetry functionality           | `true`        |
| `enable-hostname`           | Prefixes gauge values with hostname                   | `false`       |
| `enable-hostname-label`     | Adds hostname to labels                               | `false`       |
| `enable-service-label`      | Adds service to labels                                | `false`       |
| `prometheus-retention-time` | When positive, enables a Prometheus metrics sink      | `0`           |
| `global-labels`             | Global set of name/value label tuples for all metrics | `[]`          |
| `metrics-sink`              | Type of metrics sink to use                           | `""`          |
| `statsd-addr`               | Address of statsd server for metrics                  | `""`          |
| `datadog-hostname`          | Hostname for Datadog metrics                          | `""`          |

### BeaconKit Configuration

BeaconKit settings are organized into several subsections.

#### Engine `[beacon-kit.engine]`

| Option                       | Description                                             | Default Value             |
| ---------------------------- | ------------------------------------------------------- | ------------------------- |
| `rpc-dial-url`               | HTTP URL of the execution client JSON-RPC endpoint      | `"http://localhost:8551"` |
| `rpc-retries`                | Number of retries before shutting down consensus client | `"3"`                     |
| `rpc-timeout`                | RPC timeout for execution client requests               | `"900ms"`                 |
| `rpc-startup-check-interval` | Interval for the startup check                          | `"3s"`                    |
| `rpc-jwt-refresh-interval`   | Interval for the JWT refresh                            | `"30s"`                   |
| `jwt-secret-path`            | Path to the execution client JWT-secret                 | `"./jwt.hex"`             |

#### Logger `[beacon-kit.logger]`

| Option        | Description                      | Default Value |
| ------------- | -------------------------------- | ------------- |
| `time-format` | Format of the time in the logger | `"RFC3339"`   |
| `log-level`   | Level of logging (verbosity)     | `"info"`      |
| `style`       | Style of the logger              | `"pretty"`    |

#### KZG `[beacon-kit.kzg]`

| Option               | Description                    | Default Value                              |
| -------------------- | ------------------------------ | ------------------------------------------ |
| `trusted-setup-path` | Path to the trusted setup file | `"./testing/files/kzg-trusted-setup.json"` |
| `implementation`     | KZG implementation to use      | `"crate-crypto/go-kzg-4844"`               |

**Implementation Options:**

- `crate-crypto/go-kzg-4844`
- `ethereum/c-kzg-4844`

#### Payload Builder `[beacon-kit.payload-builder]`

| Option                    | Description                                        | Default Value                                  |
| ------------------------- | -------------------------------------------------- | ---------------------------------------------- |
| `enabled`                 | Enables the local payload builder (for validators) | `true`                                         |
| `suggested-fee-recipient` | Address to receive transaction fees from blocks    | `"0x0000000000000000000000000000000000000000"` |
| `payload-timeout`         | Timeout for local build payload                    | `"850ms"`                                      |

#### Validator `[beacon-kit.validator]`

| Option                             | Description                                              | Default Value |
| ---------------------------------- | -------------------------------------------------------- | ------------- |
| `graffiti`                         | String included in the graffiti field of beacon blocks   | `""`          |
| `enable-optimistic-payload-builds` | Enables building the next block's payload optimistically | `"true"`      |

#### Block Store Service `[beacon-kit.block-store-service]`

| Option                | Description                          | Default Value |
| --------------------- | ------------------------------------ | ------------- |
| `enabled`             | Enables the block store service      | `"false"`     |
| `availability-window` | Number of slots to keep in the store | `"8192"`      |

#### Node API `[beacon-kit.node-api]`

| Option    | Description                     | Default Value      |
| --------- | ------------------------------- | ------------------ |
| `enabled` | Enables the node API            | `"false"`          |
| `address` | Address to bind the node API to | `"127.0.0.1:3500"` |
| `logging` | Enables node API logging        | `"false"`          |

## config.toml

## Berachain Node CometBFT Configuration Reference

This document describes the configuration options available in the `config.toml` file for the CometBFT consensus engine used by Berachain nodes.

Current CometBFT version: `1.0.1`

### Main Base Config Options (Top-level)

| Option                      | Description                                                          | Default Value                      |
| --------------------------- | -------------------------------------------------------------------- | ---------------------------------- |
| `proxy_app`                 | TCP or UNIX socket address of the ABCI application                   | `"tcp://127.0.0.1:26658"`          |
| `moniker`                   | Custom human readable name for this node                             | `"poop"`                           |
| `db_backend`                | Database backend type                                                | `"pebbledb"`                       |
| `db_dir`                    | Database directory                                                   | `"data"`                           |
| `log_level`                 | Output level for logging                                             | `"info"`                           |
| `log_format`                | Output format: 'plain' (colored text) or 'json'                      | `"plain"`                          |
| `genesis_file`              | Path to the JSON file containing the initial validator set           | `"config/genesis.json"`            |
| `priv_validator_key_file`   | Path to the JSON file containing the private validator key           | `"config/priv_validator_key.json"` |
| `priv_validator_state_file` | Path to the JSON file containing the last sign state                 | `"data/priv_validator_state.json"` |
| `priv_validator_laddr`      | TCP or UNIX socket address for external PrivValidator process        | `""`                               |
| `node_key_file`             | Path to the JSON file containing the node authentication private key | `"config/node_key.json"`           |
| `abci`                      | Mechanism to connect to the ABCI application: socket or grpc         | `"socket"`                         |
| `filter_peers`              | If true, query the ABCI app on connecting to new peers               | `false`                            |

#### Database Backend Options

- `badgerdb`: Uses github.com/dgraph-io/badger (stable, pure go)
- `goleveldb`: Uses github.com/syndtr/goleveldb (UNMAINTAINED, stable, pure go)
- `pebbledb`: Uses github.com/cockroachdb/pebble (stable, pure go)
- `rocksdb`: Uses github.com/linxGnu/grocksdb (requires gcc)
- `cleveldb`: Uses levigo wrapper (DEPRECATED, requires gcc)
- `boltdb`: Uses etcd's fork of bolt (DEPRECATED, stable)

### RPC Server Configuration `[rpc]`

| Option                                     | Description                                          | Default Value                                                               |
| ------------------------------------------ | ---------------------------------------------------- | --------------------------------------------------------------------------- |
| `laddr`                                    | TCP or UNIX socket address for the RPC server        | `"tcp://127.0.0.1:26657"`                                                   |
| `cors_allowed_origins`                     | List of origins for cross-domain requests            | `[]`                                                                        |
| `cors_allowed_methods`                     | List of allowed methods for cross-domain requests    | `["HEAD", "GET", "POST"]`                                                   |
| `cors_allowed_headers`                     | List of allowed headers for cross-domain requests    | `["Origin", "Accept", "Content-Type", "X-Requested-With", "X-Server-Time"]` |
| `unsafe`                                   | Enable unsafe RPC commands                           | `false`                                                                     |
| `max_open_connections`                     | Maximum number of simultaneous connections           | `900`                                                                       |
| `max_subscription_clients`                 | Maximum number of unique clients that can /subscribe | `100`                                                                       |
| `max_subscriptions_per_client`             | Maximum subscriptions per client                     | `5`                                                                         |
| `experimental_subscription_buffer_size`    | Maximum events to buffer per subscription            | `200`                                                                       |
| `experimental_websocket_write_buffer_size` | Maximum RPC responses buffered per WebSocket client  | `200`                                                                       |
| `experimental_close_on_slow_client`        | Close WebSocket if client can't read fast enough     | `false`                                                                     |
| `timeout_broadcast_tx_commit`              | How long to wait for tx commit during broadcast      | `"10s"`                                                                     |
| `max_request_batch_size`                   | Maximum number of requests in a batch                | `10`                                                                        |
| `max_body_bytes`                           | Maximum size of request body                         | `1000000`                                                                   |
| `max_header_bytes`                         | Maximum size of request header                       | `1048576`                                                                   |
| `tls_cert_file`                            | Path to TLS certificate file                         | `""`                                                                        |
| `tls_key_file`                             | Path to TLS key file                                 | `""`                                                                        |
| `pprof_laddr`                              | pprof listen address                                 | `""`                                                                        |

### gRPC Server Configuration `[grpc]`

| Option  | Description                                    | Default Value |
| ------- | ---------------------------------------------- | ------------- |
| `laddr` | TCP or UNIX socket address for the gRPC server | `""`          |

#### gRPC Service Configurations

| Service                        | Configuration                  | Enabled |
| ------------------------------ | ------------------------------ | ------- |
| `[grpc.version_service]`       | The gRPC version service       | `true`  |
| `[grpc.block_service]`         | The gRPC block service         | `true`  |
| `[grpc.block_results_service]` | The gRPC block results service | `true`  |

#### Privileged gRPC Endpoints `[grpc.privileged]`

| Option  | Description                             | Default Value |
| ------- | --------------------------------------- | ------------- |
| `laddr` | Host/port for privileged gRPC endpoints | `""`          |

##### Pruning Service `[grpc.privileged.pruning_service]`

| Option    | Description                                     | Default Value |
| --------- | ----------------------------------------------- | ------------- |
| `enabled` | Controls access to pruning service via gRPC API | `false`       |

### P2P Configuration `[p2p]`

| Option                             | Description                                        | Default Value            |
| ---------------------------------- | -------------------------------------------------- | ------------------------ |
| `laddr`                            | Address to listen for incoming connections         | `"tcp://0.0.0.0:26656"`  |
| `external_address`                 | Address to advertise to peers                      | `""`                     |
| `seeds`                            | Comma separated list of seed nodes                 | `""`                     |
| `persistent_peers`                 | Comma separated list of persistent peer nodes      | `""`                     |
| `addr_book_file`                   | Path to address book                               | `"config/addrbook.json"` |
| `addr_book_strict`                 | Set true for strict address routability rules      | `true`                   |
| `max_num_inbound_peers`            | Maximum number of inbound peers                    | `120`                    |
| `max_num_outbound_peers`           | Maximum number of outbound peers                   | `40`                     |
| `unconditional_peer_ids`           | List of node IDs to connect to ignoring limits     | `""`                     |
| `persistent_peers_max_dial_period` | Maximum pause when redialing persistent peers      | `"0s"`                   |
| `flush_throttle_timeout`           | Time to wait before flushing messages              | `"10ms"`                 |
| `max_packet_msg_payload_size`      | Maximum size of a message packet payload           | `1024`                   |
| `send_rate`                        | Rate at which packets can be sent                  | `5120000`                |
| `recv_rate`                        | Rate at which packets can be received              | `5120000`                |
| `pex`                              | Set true to enable the peer-exchange reactor       | `true`                   |
| `seed_mode`                        | Seed mode for network crawling                     | `false`                  |
| `private_peer_ids`                 | List of peer IDs to keep private                   | `""`                     |
| `allow_duplicate_ip`               | Toggle to disable guard against peers from same IP | `false`                  |
| `handshake_timeout`                | Peer connection handshake timeout                  | `"20s"`                  |
| `dial_timeout`                     | Peer connection dial timeout                       | `"3s"`                   |

### Mempool Configuration `[mempool]`

| Option                                                        | Description                                     | Default Value |
| ------------------------------------------------------------- | ----------------------------------------------- | ------------- |
| `type`                                                        | Type of mempool for this node                   | `"nop"`       |
| `recheck`                                                     | Whether to recheck transactions after a block   | `false`       |
| `recheck_timeout`                                             | Timeout for rechecking process                  | `"0s"`        |
| `broadcast`                                                   | Whether to relay transactions to other peers    | `false`       |
| `wal_dir`                                                     | Location of the Write Ahead Log for the mempool | `""`          |
| `size`                                                        | Maximum number of transactions in the mempool   | `0`           |
| `max_tx_bytes`                                                | Maximum size of a single transaction            | `0`           |
| `max_txs_bytes`                                               | Maximum size of all transactions in mempool     | `0`           |
| `cache_size`                                                  | Size of the transaction cache                   | `0`           |
| `keep-invalid-txs-in-cache`                                   | Whether to keep invalid transactions in cache   | `false`       |
| `experimental_max_gossip_connections_to_persistent_peers`     | Limit gossip to number of persistent peers      | `0`           |
| `experimental_max_gossip_connections_to_non_persistent_peers` | Limit gossip to number of non-persistent peers  | `0`           |

#### Mempool Types

- `"flood"`: Concurrent linked list mempool with flooding gossip protocol (default)
- `"nop"`: No-operation mempool where the ABCI app handles transactions

### State Sync Configuration `[statesync]`

| Option                  | Description                                                 | Default Value |
| ----------------------- | ----------------------------------------------------------- | ------------- |
| `enable`                | Enable state sync for rapid node bootstrapping              | `false`       |
| `rpc_servers`           | RPC servers for light client verification                   | `""`          |
| `trust_height`          | Trusted block height for state sync                         | `0`           |
| `trust_hash`            | Trusted block hash for state sync                           | `""`          |
| `trust_period`          | Trust period for validators (usually 2/3 of unbonding time) | `"168h0m0s"`  |
| `discovery_time`        | Time for discovering snapshots                              | `"15s"`       |
| `temp_dir`              | Temporary directory for state sync chunks                   | `""`          |
| `chunk_request_timeout` | Timeout before re-requesting a chunk                        | `"10s"`       |
| `chunk_fetchers`        | Number of concurrent chunk fetchers                         | `"4"`         |

### Block Sync Configuration `[blocksync]`

| Option    | Description               | Default Value |
| --------- | ------------------------- | ------------- |
| `version` | Block Sync version to use | `"v0"`        |

### Consensus Configuration `[consensus]`

| Option                                 | Description                                      | Default Value       |
| -------------------------------------- | ------------------------------------------------ | ------------------- |
| `wal_file`                             | Path to the consensus WAL file                   | `"data/cs.wal/wal"` |
| `timeout_propose`                      | How long to wait for a proposal block            | `"2s"`              |
| `timeout_propose_delta`                | How much timeout_propose increases per round     | `"500ms"`           |
| `timeout_prevote`                      | How long to wait after receiving +2/3 prevotes   | `"2s"`              |
| `timeout_prevote_delta`                | How much timeout_prevote increases per round     | `"500ms"`           |
| `timeout_precommit`                    | How long to wait after receiving +2/3 precommits | `"2s"`              |
| `timeout_precommit_delta`              | How much timeout_precommit increases per round   | `"500ms"`           |
| `timeout_commit`                       | How long to wait after committing a block        | `"500ms"`           |
| `skip_timeout_commit`                  | Deprecated: set timeout_commit to 0 instead      | `false`             |
| `double_sign_check_height`             | How many blocks to check for double signing      | `0`                 |
| `create_empty_blocks`                  | Whether to create empty blocks                   | `true`              |
| `create_empty_blocks_interval`         | Interval between empty blocks                    | `"0s"`              |
| `peer_gossip_sleep_duration`           | Sleep duration for peer gossip                   | `"100ms"`           |
| `peer_gossip_intraloop_sleep_duration` | Intraloop sleep duration for peer gossip         | `"0s"`              |
| `peer_query_maj23_sleep_duration`      | Sleep duration for peer query                    | `"2s"`              |

### Storage Configuration `[storage]`

| Option                       | Description                                           | Default Value |
| ---------------------------- | ----------------------------------------------------- | ------------- |
| `discard_abci_responses`     | Whether to discard ABCI responses from state store    | `true`        |
| `experimental_db_key_layout` | Representation of keys in the database                | `"v1"`        |
| `compact`                    | Force compaction for databases that support it        | `false`       |
| `compaction_interval`        | Number of blocks to wait before triggering compaction | `"1000"`      |

#### Pruning Configuration `[storage.pruning]`

| Option     | Description                                      | Default Value |
| ---------- | ------------------------------------------------ | ------------- |
| `interval` | Time period between automated pruning operations | `"10s"`       |

##### Data Companion Configuration `[storage.pruning.data_companion]`

| Option                                | Description                                      | Default Value |
| ------------------------------------- | ------------------------------------------------ | ------------- |
| `enabled`                             | Whether pruning respects data companion settings | `false`       |
| `initial_block_retain_height`         | Initial value for block retain height            | `0`           |
| `initial_block_results_retain_height` | Initial value for block results retain height    | `0`           |

### Transaction Indexer Configuration `[tx_index]`

| Option      | Description                          | Default Value |
| ----------- | ------------------------------------ | ------------- |
| `indexer`   | What indexer to use for transactions | `"null"`      |
| `psql-conn` | PostgreSQL connection string         | `""`          |

#### Indexer Options

- `"null"`: No indexer
- `"kv"`: Simple key-value storage indexer (default)
- `"psql"`: PostgreSQL-backed indexer

### Instrumentation Configuration `[instrumentation]`

| Option                   | Description                                  | Default Value |
| ------------------------ | -------------------------------------------- | ------------- |
| `prometheus`             | Enable Prometheus metrics                    | `true`        |
| `prometheus_listen_addr` | Address for Prometheus collector connections | `":26660"`    |
| `max_open_connections`   | Maximum number of simultaneous connections   | `800`         |
| `namespace`              | Instrumentation namespace                    | `"cometbft"`  |
