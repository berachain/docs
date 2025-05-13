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

## API Status Scoreboard

### Standard Beacon Chain API v1 Endpoints

| Endpoint | URI | Status |
|----------|-----|--------|
| [Node Version](#ethv1nodeversion) | `/eth/v1/node/version` | ✅ |
| [Node Syncing](#ethv1nodesyncing) | `/eth/v1/node/syncing` | ✅ |
| [Get Genesis](#ethv1beacongenesis) | `/eth/v1/beacon/genesis` | ✅ |
| [Get State Root](#ethv1beaconstatesstate_idroot) | `/eth/v1/beacon/states/{state_id}/root` | ✅ |
| [Get State Fork](#ethv1beaconstatesstate_idfork) | `/eth/v1/beacon/states/{state_id}/fork` | ✅ |
| [Get State Validators](#get-ethv1beaconstatesstate_idvalidators) | `/eth/v1/beacon/states/{state_id}/validators` | ✅ |
| [Get State Validator](#get-ethv1beaconstatesstate_idvalidatorsvalidator_id) | `/eth/v1/beacon/states/{state_id}/validators/{validator_id}` | ✅ |
| [Get Validator Balances](#get-ethv1beaconstatesstate_idvalidator_balances) | `/eth/v1/beacon/states/{state_id}/validator_balances` | ✅ |
| [Get State Randao](#ethv1beaconstatesstate_idrandao) | `/eth/v1/beacon/states/{state_id}/randao` | ✅ |
| [Get Block Headers](#ethv1beaconheaders) | `/eth/v1/beacon/headers` | ✅ |
| [Get Block Header](#ethv1beaconheadersblock_id) | `/eth/v1/beacon/headers/{block_id}` | ✅ |
| [Get Blob Sidecars](#ethv1beaconblob_sidecarsblock_id) | `/eth/v1/beacon/blob_sidecars/{block_id}` | ✅ |
| [Get Block Rewards](#ethv1beaconrewardsblocksblock_id) | `/eth/v1/beacon/rewards/blocks/{block_id}` | ✅ |
| [Get Config Spec](#ethv1configspec) | `/eth/v1/config/spec` | ✅ |
| [Get Attester Duties](#ethv1validatordutiesattesterepoch) | `/eth/v1/validator/duties/attester/{epoch}` | ❌ |
| [Get Proposer Duties](#ethv1validatordutiesproposerepoch) | `/eth/v1/validator/duties/proposer/{epoch}` | ❌ |
| [Get Sync Committee Duties](#ethv1validatordutiessyncepoch) | `/eth/v1/validator/duties/sync/{epoch}` | ❌ |
| [Get Attestation Data](#ethv1validatorattestation_data) | `/eth/v1/validator/attestation_data` | ❌ |
| [Subscribe to Beacon Committee](#ethv1validatorbeacon_committee_subscriptions) | `/eth/v1/validator/beacon_committee_subscriptions` | ❌ |
| [Subscribe to Sync Committee](#ethv1validatorsync_committee_subscriptions) | `/eth/v1/validator/sync_committee_subscriptions` | ❌ |
| [Register Validator](#ethv1validatorregister_validator) | `/eth/v1/validator/register_validator` | ❌ |
| [Get Validator Liveness](#ethv1validatorlivenessepoch) | `/eth/v1/validator/liveness/{epoch}` | ❌ |

### Standard Beacon Chain API v2 Endpoints

| Endpoint | URI | Status |
|----------|-----|--------|
| [Debug Beacon States](#ethv2debugbeaconstatesstate_id) | `/eth/v2/debug/beacon/states/{state_id}` | ✅ |
| [Get Aggregate Attestation](#ethv2validatoraggregate_attestation) | `/eth/v2/validator/aggregate_attestation` | ❌ |
| [Submit Aggregate and Proofs](#ethv2validatoraggregate_and_proofs) | `/eth/v2/validator/aggregate_and_proofs` | ❌ |

### Beacon Kit Custom Extensions

| Endpoint | URI | Status |
|----------|-----|--------|
| [Get Block Proposer](#bkitv1proofblock_proposertimestamp_id) | `/bkit/v1/proof/block_proposer/{timestamp_id}` | ✅ |

## Node API

The Node API is default closed. To open it, revise your installation's `app.toml` and review the section `beacon-kit.node-api`.

### /eth/v1/node/version {#ethv1nodeversion}

Returns node version information.

<ApiTester
  endpoint="/eth/v1/node/version"
  method="GET"
  :networks="networks"
/>

### /eth/v1/node/syncing {#ethv1nodesyncing}

Returns the current sync status of the node.

<ApiTester
  endpoint="/eth/v1/node/syncing"
  method="GET"
  :networks="networks"
/>

### /eth/v1/beacon/genesis {#ethv1beacongenesis}

Returns genesis information.

<ApiTester
  endpoint="/eth/v1/beacon/genesis"
  method="GET"
  :networks="networks"
/>

### /eth/v1/beacon/states/:state_id/root {#ethv1beaconstatesstate_idroot}

Returns the state root for the specified state.

<ApiTester
  endpoint="/eth/v1/beacon/states/{state_id}/root"
  method="GET"
  :pathParams="[
    {
      name: 'state_id',
      description: 'State identifier (head, genesis, finalized, justified, or slot number)'
    }
  ]"
  :networks="networks"
  :examples="{
    custom: { 
      state_id: 'head'  // Most common use case
    }
  }"
/>

### /eth/v1/beacon/states/:state_id/fork {#ethv1beaconstatesstate_idfork}

Returns the fork information for the specified state.

<ApiTester
  endpoint="/eth/v1/beacon/states/{state_id}/fork"
  method="GET"
  :pathParams="[
    {
      name: 'state_id',
      description: 'State identifier (head, genesis, finalized, justified, or slot number)'
    }
  ]"
  :networks="networks"
  :examples="{
    custom: { 
      state_id: 'head'  // Most common use case
    }
  }"
/>

### /eth/v1/beacon/states/:state_id/randao {#ethv1beaconstatesstate_idrandao}

Returns the RANDAO value for the specified state.

<ApiTester
  endpoint="/eth/v1/beacon/states/{state_id}/randao"
  method="GET"
  :pathParams="[
    {
      name: 'state_id',
      description: 'State identifier (head, genesis, finalized, justified, or slot number)'
    }
  ]"
  :networks="networks"
  :examples="{
    custom: { 
      state_id: 'head'  // Most common use case
    }
  }"
/>

### /eth/v1/beacon/headers {#ethv1beaconheaders}

Returns the block headers matching the specified query parameters.

<ApiTester
  endpoint="/eth/v1/beacon/headers"
  method="GET"
  :queryParams="[
    {
      name: 'slot',
      description: 'Slot number',
      required: false
    },
    {
      name: 'parent_root',
      description: 'Parent root hash',
      required: false
    }
  ]"
  :networks="networks"
/>

### /eth/v1/beacon/headers/:block_id {#ethv1beaconheadersblock_id}

Returns the block header for the specified block.

<ApiTester
  endpoint="/eth/v1/beacon/headers/{block_id}"
  method="GET"
  :pathParams="[
    {
      name: 'block_id',
      description: 'Block identifier (head, genesis, finalized, justified, or slot number)'
    }
  ]"
  :networks="networks"
  :examples="{
    custom: { 
      block_id: 'head'  // Most common use case
    }
  }"
/>

### /eth/v1/beacon/blob_sidecars/:block_id {#ethv1beaconblob_sidecarsblock_id}

Returns the blob sidecars for the specified block.

<ApiTester
  endpoint="/eth/v1/beacon/blob_sidecars/{block_id}"
  method="GET"
  :pathParams="[
    {
      name: 'block_id',
      description: 'Block identifier (head, genesis, finalized, justified, or slot number)'
    }
  ]"
  :queryParams="[
    {
      name: 'indices',
      description: 'Array of blob indices',
      required: false
    }
  ]"
  :networks="networks"
  :examples="{
    custom: { 
      block_id: 'head'  // Most common use case
    }
  }"
/>

### /eth/v1/beacon/rewards/blocks/:block_id {#ethv1beaconrewardsblocksblock_id}

Returns the block rewards for the specified block.

<ApiTester
  endpoint="/eth/v1/beacon/rewards/blocks/{block_id}"
  method="GET"
  :pathParams="[
    {
      name: 'block_id',
      description: 'Block identifier (head, genesis, finalized, justified, or slot number)'
    }
  ]"
  :networks="networks"
  :examples="{
    custom: { 
      block_id: 'head'  // Most common use case
    }
  }"
/>

### /eth/v1/config/spec {#ethv1configspec}

Returns the chain specification.

<ApiTester
  endpoint="/eth/v1/config/spec"
  method="GET"
  :networks="networks"
/>

### /bkit/v1/proof/block_proposer/:timestamp_id {#bkitv1proofblock_proposertimestamp_id}

Returns the block proposer for the specified timestamp.

<ApiTester
  endpoint="/bkit/v1/proof/block_proposer/{timestamp_id}"
  method="GET"
  :pathParams="[
    {
      name: 'timestamp_id',
      description: 'Timestamp identifier'
    }
  ]"
  :networks="networks"
/>

### /eth/v2/debug/beacon/states/:state_id {#ethv2debugbeaconstatesstate_id}

Returns a quantity of debug information, including:
- validator root
- latest beacon and execution chain block headers
- various root hashes
- the node's understanding of the validator set voting power, slashing status

<ApiTester
  endpoint="/eth/v2/debug/beacon/states/{state_id}"
  method="GET"
  :pathParams="[
    {
      name: 'state_id',
      description: 'State identifier (head, genesis, finalized, justified, or slot number)'
    }
  ]"
  :networks="networks"
  :examples="{
    custom: { 
      state_id: 'head'  // Most common use case
    }
  }"
/>

## Validator API

The Validator API provides endpoints for managing and monitoring validators. All endpoints are prefixed with `/eth/v1/validator/`.

### Validator Information

#### GET /eth/v1/beacon/states/:state_id/validators {#get-ethv1beaconstatesstate_idvalidators}

Returns validator information for the specified state.

Query Parameters:
- `id`: Array of validator IDs (public keys or indices)
- `status`: Array of validator statuses to filter by

<ApiTester
  endpoint="/eth/v1/beacon/states/{state_id}/validators"
  method="GET"
  :pathParams="[
    {
      name: 'state_id',
      description: 'State identifier (head, genesis, finalized, justified, or slot number)'
    }
  ]"
  :queryParams="[
    {
      name: 'id',
      description: 'Array of validator IDs',
      required: false
    },
    {
      name: 'status',
      description: 'Array of validator statuses',
      required: false
    }
  ]"
  :networks="networks"
  :examples="{
    custom: { 
      state_id: 'head'  // Most common use case
    }
  }"
/>

#### GET /eth/v1/beacon/states/:state_id/validators/:validator_id {#get-ethv1beaconstatesstate_idvalidatorsvalidator_id}

Returns information about a specific validator.

<ApiTester
  endpoint="/eth/v1/beacon/states/{state_id}/validators/{validator_id}"
  method="GET"
  :pathParams="[
    {
      name: 'state_id',
      description: 'State identifier (head, genesis, finalized, justified, or slot number)'
    },
    {
      name: 'validator_id',
      description: 'Validator ID (public key or index)'
    }
  ]"
  :networks="networks"
  :examples="{
    custom: { 
      state_id: 'head'  // Most common use case
    }
  }"
/>

### Validator Balances

#### GET /eth/v1/beacon/states/:state_id/validator_balances {#get-ethv1beaconstatesstate_idvalidator_balances}

Returns validator balances for the specified state.

<ApiTester
  endpoint="/eth/v1/beacon/states/{state_id}/validator_balances"
  method="GET"
  :pathParams="[
    {
      name: 'state_id',
      description: 'State identifier (head, genesis, finalized, justified, or slot number)'
    }
  ]"
  :queryParams="[
    {
      name: 'id',
      description: 'Array of validator IDs',
      required: false
    }
  ]"
  :networks="networks"
  :examples="{
    custom: { 
      state_id: 'head'  // Most common use case
    }
  }"
/>

## Notes

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
