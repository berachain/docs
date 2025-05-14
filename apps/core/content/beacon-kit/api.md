# Beacon Kit API Reference

<script setup>
import ApiTester from '../../.vitepress/theme/components/ApiTester.vue';

const networks = [
  { 
    name: 'Custom URL', 
    url: '', 
    id: 'custom',
    allowCustomUrl: true
  }
];
</script>

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

### /bkit/v1/proof/block_proposer/{timestamp_id} {#bkitv1proofblock_proposertimestamp_id}
Returns the block proposer's public key for the given timestamp ID, along with Merkle proofs for the public key and proposer index, verifiable against the beacon block root. Also returns the beacon block header and root.
<ApiTester endpoint="/bkit/v1/proof/block_proposer/{timestamp_id}" method="GET" :pathParams="[{ name: 'timestamp_id', description: 'Timestamp identifier' }]" :networks="networks" />

### /eth/v1/beacon/blob_sidecars/{block_id} {#ethv1beaconblob_sidecarsblock_id}
Retrieves blob sidecars for the specified block ID. Optionally filters by blob indices.
<ApiTester endpoint="/eth/v1/beacon/blob_sidecars/{block_id}" method="GET" :pathParams="[{ name: 'block_id', description: 'Block identifier (head, genesis, finalized, justified, or slot number)' }]" :queryParams="[{ name: 'indices', description: 'Array of blob indices', required: false }]" :networks="networks" :examples="{ custom: { block_id: 'head' } }" />

### /eth/v1/beacon/genesis {#ethv1beacongenesis}
Retrieves details of the chain's genesis, including genesis time, validators root, and fork version.
<ApiTester endpoint="/eth/v1/beacon/genesis" method="GET" :networks="networks" />

### /eth/v1/beacon/headers {#ethv1beaconheaders}
Retrieves block headers matching the specified slot or parent root.
<ApiTester endpoint="/eth/v1/beacon/headers" method="GET" :queryParams="[{ name: 'slot', description: 'Slot number', required: false }, { name: 'parent_root', description: 'Parent root hash', required: false }]" :networks="networks" />

### /eth/v1/beacon/headers/{block_id} {#ethv1beaconheadersblock_id}
Retrieves the block header for the specified block ID.
<ApiTester endpoint="/eth/v1/beacon/headers/{block_id}" method="GET" :pathParams="[{ name: 'block_id', description: 'Block identifier (head, genesis, finalized, justified, or slot number)' }]" :networks="networks" :examples="{ custom: { block_id: 'head' } }" />

### /eth/v1/beacon/rewards/blocks/{block_id} {#ethv1beaconrewardsblocksblock_id}
Retrieves execution layer block rewards for the specified block ID.
<ApiTester endpoint="/eth/v1/beacon/rewards/blocks/{block_id}" method="GET" :pathParams="[{ name: 'block_id', description: 'Block identifier (head, genesis, finalized, justified, or slot number)' }]" :networks="networks" :examples="{ custom: { block_id: 'head' } }" />

### /eth/v1/beacon/states/{state_id}/fork {#ethv1beaconstatesstate_idfork}
Retrieves the fork object for the specified state ID, providing information about past and upcoming forks.
<ApiTester endpoint="/eth/v1/beacon/states/{state_id}/fork" method="GET" :pathParams="[{ name: 'state_id', description: 'State identifier (head, genesis, finalized, justified, or slot number)' }]" :networks="networks" :examples="{ custom: { state_id: 'head' } }" />

### /eth/v1/beacon/states/{state_id}/randao {#ethv1beaconstatesstate_idrandao}
Retrieves the RANDAO mix for the state ID and optionally a specific epoch. Defaults to genesis epoch if not specified.
<ApiTester endpoint="/eth/v1/beacon/states/{state_id}/randao" method="GET" :pathParams="[{ name: 'state_id', description: 'State identifier (head, genesis, finalized, justified, or slot number)' }]" :networks="networks" :examples="{ custom: { state_id: 'head' } }" />

### /eth/v1/beacon/states/{state_id}/root {#ethv1beaconstatesstate_idroot}
Retrieves the hash tree root of the beacon state for the specified state ID.
<ApiTester endpoint="/eth/v1/beacon/states/{state_id}/root" method="GET" :pathParams="[{ name: 'state_id', description: 'State identifier (head, genesis, finalized, justified, or slot number)' }]" :networks="networks" :examples="{ custom: { state_id: 'head' } }" />

### /eth/v1/beacon/states/{state_id}/validator_balances {#ethv1beaconstatesstate_idvalidator_balances}
Retrieves the balances for the specified validators at the given state ID.
<ApiTester endpoint="/eth/v1/beacon/states/{state_id}/validator_balances" method="GET" :pathParams="[{ name: 'state_id', description: 'State identifier (head, genesis, finalized, justified, or slot number)' }]" :queryParams="[{ name: 'id', description: 'Array of validator IDs', required: false }]" :networks="networks" :examples="{ custom: { state_id: 'head' } }" />

### /eth/v1/beacon/states/{state_id}/validators {#ethv1beaconstatesstate_idvalidators}
Retrieves validators, optionally filtered by ID and status, for the specified state ID.
<ApiTester endpoint="/eth/v1/beacon/states/{state_id}/validators" method="GET" :pathParams="[{ name: 'state_id', description: 'State identifier (head, genesis, finalized, justified, or slot number)' }]" :queryParams="[{ name: 'id', description: 'Array of validator IDs', required: false }, { name: 'status', description: 'Array of validator statuses', required: false }]" :networks="networks" :examples="{ custom: { state_id: 'head' } }" />

### /eth/v1/beacon/states/{state_id}/validators/{validator_id} {#ethv1beaconstatesstate_idvalidatorsvalidator_id}
Retrieves a single validator by its ID for the specified state ID.
<ApiTester endpoint="/eth/v1/beacon/states/{state_id}/validators/{validator_id}" method="GET" :pathParams="[{ name: 'state_id', description: 'State identifier (head, genesis, finalized, justified, or slot number)' }, { name: 'validator_id', description: 'Validator ID (public key or index)' }]" :networks="networks" :examples="{ custom: { state_id: 'head' } }" />

### /eth/v1/config/spec {#ethv1configspec}
Retrieves the chain specification, including deposit contract address, network ID, and various fork-specific parameters.
<ApiTester endpoint="/eth/v1/config/spec" method="GET" :networks="networks" />

### /eth/v1/node/syncing {#ethv1nodesyncing}
Retrieves the node's current sync status. (Currently returns placeholder data indicating the node is synced).
<ApiTester endpoint="/eth/v1/node/syncing" method="GET" :networks="networks" />

### /eth/v1/node/version {#ethv1nodeversion}
Retrieves the version of the node software. (Currently returns a placeholder version).
<ApiTester endpoint="/eth/v1/node/version" method="GET" :networks="networks" />

### /eth/v2/debug/beacon/states/{state_id} {#ethv2debugbeaconstatesstate_id}
Retrieves the full beacon state for the specified state ID, including fork version and finality status.
<ApiTester endpoint="/eth/v2/debug/beacon/states/{state_id}" method="GET" :pathParams="[{ name: 'state_id', description: 'State identifier (head, genesis, finalized, justified, or slot number)' }]" :networks="networks" :examples="{ custom: { state_id: 'head' } }" />
