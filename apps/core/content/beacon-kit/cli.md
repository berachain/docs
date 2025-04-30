# Berachain Node (`beacond`) Reference

`beacond`, is an EVM consensus client implementation used as a basic beacon node for Berachain. See [BeaconKit Consensus Layer](/nodes/beaconkit-consensus) for more details.

## Global Flags

These flags apply to all commands:

| Flag            | Description                                           |
| --------------- | ----------------------------------------------------- |
| `--home string` | Directory for config and data (default: `~/.beacond`) |

## Basic Commands

### `init`

Initialize validator and node configuration files.

```bash
beacond init <moniker> [flags]
```

#### Flags

| Flag                           | Description                                                                                                                       |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `--chain-id string`            | Genesis file chain-id (randomly created if blank)                                                                                 |
| `--beacon-kit.chain-spec`      | Which chain to generate configurations for. This value is also placed in the generated app.toml. `mainnet` or `testnet` or `file` |
| `--beacon-kit.chain-spec-file` | If `chain-spec=file`, which file to use. Should be toml format. This value is also placed in the generated app.toml.              |
| `--default-denom string`       | Genesis file default denomination (default: "stake")                                                                              |
| `--initial-height int`         | Initial block height at genesis (default: 1)                                                                                      |
| `-o, --overwrite`              | Overwrite the genesis.json file                                                                                                   |
| `--recover`                    | Recover existing key using seed phrase instead of creating new one                                                                |

### `start`

Run the node application with CometBFT in process.

```bash
beacond start [flags]
```

#### Flags

The `start` command has numerous configuration flags for networking, consensus, pruning, and more. Key flags include:

| Flag                            | Description                                             |
| ------------------------------- | ------------------------------------------------------- |
| `--abci string`                 | ABCI transport (socket or grpc) (default: "socket")     |
| `--address string`              | Listen address (default: "tcp://127.0.0.1:26658")       |
| `--db_backend string`           | Database backend (default: "pebbledb")                  |
| `--moniker string`              | Node name                                               |
| `--p2p.laddr string`            | Node listen address (default: "tcp://0.0.0.0:26656")    |
| `--p2p.persistent_peers string` | Comma-delimited ID@host:port persistent peers           |
| `--p2p.seeds string`            | Comma-delimited ID@host:port seed nodes                 |
| `--pruning string`              | Pruning strategy (default\|nothing\|everything\|custom) |
| `--rpc.laddr string`            | RPC listen address (default: "tcp://127.0.0.1:26657")   |

Additional flags are available for detailed engine configuration, beacon-kit settings, and consensus parameters.

### `status`

Query remote node for status information.

```bash
beacond status [flags]
```

#### Flags

| Flag                  | Description                                           |
| --------------------- | ----------------------------------------------------- |
| `-n, --node string`   | Node to connect to (default: "tcp://localhost:26657") |
| `-o, --output string` | Output format (text\|json) (default: "json")          |

### `version`

Print the application binary version information.

```bash
beacond version [flags]
```

#### Flags

| Flag                  | Description                                  |
| --------------------- | -------------------------------------------- |
| `--long`              | Print long version information               |
| `-o, --output string` | Output format (text\|json) (default: "text") |

### `rollback`

Recover from an incorrect application state transition by rolling back one height.

```bash
beacond rollback [flags]
```

#### Flags

| Flag     | Description                        |
| -------- | ---------------------------------- |
| `--hard` | Remove last block as well as state |

## CometBFT Commands (`comet`)

Commands for managing the CometBFT consensus engine.

### `comet bootstrap-state`

Bootstrap CometBFT state at an arbitrary block height using a light client.

```bash
beacond comet bootstrap-state [flags]
```

#### Flags

| Flag           | Description                                                                                |
| -------------- | ------------------------------------------------------------------------------------------ |
| `--height int` | Block height to bootstrap state at (uses latest block height in app state if not provided) |

### `comet reset-state`

Remove all data and WAL (Write-Ahead Log).

```bash
beacond comet reset-state [flags]
```

### `comet show-address`

Show this node's CometBFT validator consensus address.

```bash
beacond comet show-address [flags]
```

### `comet show-node-id`

Show this node's ID.

```bash
beacond comet show-node-id [flags]
```

### `comet show-validator`

Show this node's CometBFT validator info.

```bash
beacond comet show-validator [flags]
```

### `comet unsafe-reset-all`

Remove all data and WAL, reset this node's validator to genesis state (unsafe).

```bash
beacond comet unsafe-reset-all [flags]
```

#### Flags

| Flag                    | Description                                                           |
| ----------------------- | --------------------------------------------------------------------- |
| `--keep-addr-book`      | Keep the address book intact                                          |
| `-k, --key-type string` | Private key type (ed25519\|secp256k1\|bls12_381) (default: "ed25519") |

### `comet version`

Print protocols' and libraries' version numbers this app was compiled against.

```bash
beacond comet version [flags]
```

## Deposit Commands (`deposit`)

Commands for managing validator deposits.

### `deposit create-validator`

Create a validator deposit with necessary credentials.

```bash
beacond deposit create-validator [withdrawal-address] [amount] ?[beacond/genesis.json] [flags]
```

#### Flags

| Flag                                  | Description                                                                             |
| ------------------------------------- | --------------------------------------------------------------------------------------- |
| `-g, --genesis-validator-root string` | Use provided genesis validator root (if not set, beacond genesis file must be provided) |
| `-o, --override-node-key`             | Override the node private key                                                           |

### `deposit validate`

Validate a deposit message for creating a new validator.

```bash
beacond deposit validate [pubkey] [withdrawal-credentials] [amount] [signature] ?[beacond/genesis.json] [flags]
```

#### Flags

| Flag                                  | Description                                                                             |
| ------------------------------------- | --------------------------------------------------------------------------------------- |
| `-g, --genesis-validator-root string` | Use provided genesis validator root (if not set, beacond genesis file must be provided) |

### `deposit validator-keys`

Output validator public key in various formats.

```bash
beacond deposit validator-keys [flags]
```

Displays the validator key as Comet address, Comet pubkey, and Eth/Beacon pubkey formats.

## Genesis Commands (`genesis`)

Commands for genesis file management. These are largely only of interest to those of us maintaining Berachain, so we have stuck to the generally useful ones.

### `genesis validator-root`

Get and return the genesis validator root hash.

```bash
beacond genesis validator-root [beacond/genesis.json] [flags]
```

## JWT Commands (`jwt`)

Commands for managing JWT authentication.

### `jwt generate`

Generate a new JWT authentication secret.

```bash
beacond jwt generate [flags]
```

#### Flags

| Flag                       | Description                                                         |
| -------------------------- | ------------------------------------------------------------------- |
| `-o, --output-path string` | Optional output file path for the JWT secret (default: "./jwt.hex") |

### `jwt validate`

Validate a JWT secret by checking if it's formatted properly.

```bash
beacond jwt validate [flags]
```

#### Flags

| Flag                      | Description                                                        |
| ------------------------- | ------------------------------------------------------------------ |
| `-i, --input-path string` | Optional input file path for the JWT secret (default: "./jwt.hex") |
