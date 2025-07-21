# Beacon Kit API Reference

## Enabling the API

Beacon Kit offers an API that follows the [Beacon Node API](https://ethereum.github.io/beacon-APIs/). This API is **default off** and must be enabled by revising your installation's `app.toml` file, in the `beacon-kit.node-api` section. When enabled, the suggested port is 3500.

Note that this is different from CometBFT API endpoint, typically exposed from

## API Values

1. All balance values are returned in Gwei (1 ETH = 10^9 Gwei)
2. Validator statuses include:
   - `active_ongoing`
   - `active_exiting`
   - `active_slashed`
   - `exited_unslashed`
   - `exited_slashed`
   - `pending_initialized`
   - `pending_queued`
   - `withdrawal_possible`
   - `withdrawal_done`

3. State IDs can be:
   - `head`
   - `genesis`
   - `finalized`
   - `justified`
   - A specific slot number

## API Methods

### Get Block Proposer Proof {#bkitv1proofblock_proposertimestamp_id}

Returns the block proposer's public key for the given timestamp ID, along with Merkle proofs for the public key and proposer index, verifiable against the beacon block root. Also returns the beacon block header and root.

```http
GET /bkit/v1/proof/block_proposer/{timestamp_id}
```

```bash
curl -s http://localhost:3500/bkit/v1/proof/block_proposer/{timestamp_id}
```

### Get Blob Sidecars {#ethv1beaconblob_sidecarsblock_id}

Retrieves blob sidecars for the specified block ID. Optionally filters by blob indices.

```http
GET /eth/v1/beacon/blob_sidecars/{block_id}
```

```bash
# Get all blob sidecars for a block
curl -s http://localhost:3500/eth/v1/beacon/blob_sidecars/head

# Get specific blob sidecars by indices
curl -s "http://localhost:3500/eth/v1/beacon/blob_sidecars/head?indices=0,1"
```

### Get Chain Genesis Details {#ethv1beacongenesis}

Retrieves details of the chain's genesis, including genesis time, validators root, and fork version.

```http
GET /eth/v1/beacon/genesis
```

```bash
curl -s http://localhost:3500/eth/v1/beacon/genesis
```

### Get Block Headers {#ethv1beaconheaders}

Retrieves block headers matching the specified slot or parent root.

```http
GET /eth/v1/beacon/headers
```

```bash
# Get headers by slot
curl -s "http://localhost:3500/eth/v1/beacon/headers?slot=12345"

# Get headers by parent root
curl -s "http://localhost:3500/eth/v1/beacon/headers?parent_root=0x..."
```

### Get Block Header by ID {#ethv1beaconheadersblock_id}

Retrieves the block header for the specified block ID.

```http
GET /eth/v1/beacon/headers/{block_id}
```

```bash
curl -s http://localhost:3500/eth/v1/beacon/headers/head
```

### Get Block Rewards {#ethv1beaconrewardsblocksblock_id}

Retrieves execution layer block rewards for the specified block ID.

```http
GET /eth/v1/beacon/rewards/blocks/{block_id}
```

```bash
curl -s http://localhost:3500/eth/v1/beacon/rewards/blocks/head
```

### Get Fork Information {#ethv1beaconstatesstate_idfork}

Retrieves the fork object for the specified state ID, providing information about past and upcoming forks.

```http
GET /eth/v1/beacon/states/{state_id}/fork
```

```bash
curl -s http://localhost:3500/eth/v1/beacon/states/head/fork
```

### Get RANDAO Mix {#ethv1beaconstatesstate_idrandao}

Retrieves the RANDAO mix for the state ID and optionally a specific epoch. Defaults to genesis epoch if not specified.

```http
GET /eth/v1/beacon/states/{state_id}/randao
```

```bash
curl -s http://localhost:3500/eth/v1/beacon/states/head/randao
```

### Get State Root {#ethv1beaconstatesstate_idroot}

Retrieves the hash tree root of the beacon state for the specified state ID.

```http
GET /eth/v1/beacon/states/{state_id}/root
```

```bash
curl -s http://localhost:3500/eth/v1/beacon/states/head/root
```

### Get Validator Balances {#ethv1beaconstatesstate_idvalidator_balances}

Retrieves the balances for the specified validators at the given state ID.

```http
GET /eth/v1/beacon/states/{state_id}/validator_balances
```

```bash
# Get all validator balances
curl -s http://localhost:3500/eth/v1/beacon/states/head/validator_balances

# Get specific validator balances
curl -s "http://localhost:3500/eth/v1/beacon/states/head/validator_balances?id=1,2,3"
```

### Get Validators {#ethv1beaconstatesstate_idvalidators}

Retrieves validators, optionally filtered by ID and status, for the specified state ID.

```http
GET /eth/v1/beacon/states/{state_id}/validators
```

```bash
# Get all validators
curl -s http://localhost:3500/eth/v1/beacon/states/head/validators

# Get specific validators by ID and status
curl -s "http://localhost:3500/eth/v1/beacon/states/head/validators?id=1,2,3&status=active_ongoing"
```

### Get Validator by ID {#ethv1beaconstatesstate_idvalidatorsvalidator_id}

Retrieves a single validator by its ID for the specified state ID.

```http
GET /eth/v1/beacon/states/{state_id}/validators/{validator_id}
```

```bash
curl -s http://localhost:3500/eth/v1/beacon/states/head/validators/1
```

### Get Chain Specification {#ethv1configspec}

Retrieves the chain specification, including deposit contract address, network ID, and various fork-specific parameters.

```http
GET /eth/v1/config/spec
```

```bash
curl -s http://localhost:3500/eth/v1/config/spec
```

### Get Node Syncing Status {#ethv1nodesyncing}

Retrieves the node's current sync status. (Currently returns placeholder data indicating the node is synced).

```http
GET /eth/v1/node/syncing
```

```bash
curl -s http://localhost:3500/eth/v1/node/syncing
```

### Get Node Version {#ethv1nodeversion}

Retrieves the version of the node software. (Currently returns a placeholder version).

```http
GET /eth/v1/node/version
```

```bash
curl -s http://localhost:3500/eth/v1/node/version
```

### Get Full Beacon State {#ethv2debugbeaconstatesstate_id}

Retrieves the full beacon state for the specified state ID, including fork version and finality status.

```http
GET /eth/v2/debug/beacon/states/{state_id}
```

```bash
curl -s http://localhost:3500/eth/v2/debug/beacon/states/head
```
