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

| Endpoint                                                                            | Status | Notes                                                                                                                           |
| ----------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------- |
| [Node Version](#ethv1nodeversion)                                                   | ✅     | Basic node information                                                                                                          |
| [Debug Beacon States](#ethv2debugbeaconstatesstate_id)                              | ✅     | Debug information including validator data                                                                                      |
| [Get State Validators](#get-ethv1beaconstatesstate_idvalidators)                    | ✅     | List validators with filtering                                                                                                  |
| [Get State Validator](#get-ethv1beaconstatesstate_idvalidatorsvalidator_id)         | ✅     | Single validator details                                                                                                        |
| [Get Validator Balances](#get-ethv1beaconstatesstate_idvalidator_balances)          | ✅     | Validator balance information                                                                                                   |
| [Get Attester Duties](#post-ethv1validatordutiesattesterepoch)                      | ❌     | Not implemented - See [Ethereum Beacon API Spec](https://ethereum.github.io/beacon-APIs/#/Validator/getAttesterDuties)          |
| [Get Proposer Duties](#get-ethv1validatordutiesproposerepoch)                       | ❌     | Not implemented - See [Ethereum Beacon API Spec](https://ethereum.github.io/beacon-APIs/#/Validator/getProposerDuties)          |
| [Get Sync Committee Duties](#post-ethv1validatordutiessyncepoch)                    | ❌     | Not implemented - See [Ethereum Beacon API Spec](https://ethereum.github.io/beacon-APIs/#/Validator/getSyncCommitteeDuties)     |
| [Get Attestation Data](#post-ethv1validatorattestation_data)                        | ❌     | Not implemented - See [Ethereum Beacon API Spec](https://ethereum.github.io/beacon-APIs/#/Validator/getAttestationData)         |
| [Get Aggregate Attestation](#get-ethv2validatoraggregate_attestation)               | ❌     | Not implemented - See [Ethereum Beacon API Spec](https://ethereum.github.io/beacon-APIs/#/Validator/getAggregateAttestation)    |
| [Submit Aggregate and Proofs](#post-ethv2validatoraggregate_and_proofs)             | ❌     | Not implemented - See [Ethereum Beacon API Spec](https://ethereum.github.io/beacon-APIs/#/Validator/submitAggregateAndProofs)   |
| [Subscribe to Beacon Committee](#post-ethv1validatorbeacon_committee_subscriptions) | ❌     | Not implemented - See [Ethereum Beacon API Spec](https://ethereum.github.io/beacon-APIs/#/Validator/subscribeToBeaconCommittee) |
| [Subscribe to Sync Committee](#post-ethv1validatorsync_committee_subscriptions)     | ❌     | Not implemented - See [Ethereum Beacon API Spec](https://ethereum.github.io/beacon-APIs/#/Validator/subscribeToSyncCommittee)   |
| [Register Validator](#post-ethv1validatorregister_validator)                        | ❌     | Not implemented - See [Ethereum Beacon API Spec](https://ethereum.github.io/beacon-APIs/#/Validator/registerValidator)          |
| [Get Validator Liveness](#post-ethv1validatorlivenessepoch)                         | ❌     | Not implemented - See [Ethereum Beacon API Spec](https://ethereum.github.io/beacon-APIs/#/Validator/getValidatorLiveness)       |

## Node API

The Node API is default closed. To open it, revise your installation's `app.toml` and review the section `beacon-kit.node-api`.

### /eth/v1/node/version

Returns node version information.

<ApiTester
  endpoint="/eth/v1/node/version"
  method="GET"
  :networks="networks"
/>

### /eth/v2/debug/beacon/states/:state_id

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

#### GET /eth/v1/beacon/states/:state_id/validators

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

#### GET /eth/v1/beacon/states/:state_id/validators/:validator_id

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

#### GET /eth/v1/beacon/states/:state_id/validator_balances

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

### Validator Duties

#### POST /eth/v1/validator/duties/attester/:epoch

FIXME: Implementation details needed for attester duties

<ApiTester
  endpoint="/eth/v1/validator/duties/attester/{epoch}"
  method="POST"
  :pathParams="[
    {
      name: 'epoch',
      description: 'Epoch number'
    }
  ]"
  :networks="networks"
/>

#### GET /eth/v1/validator/duties/proposer/:epoch

FIXME: Implementation details needed for proposer duties

<ApiTester
  endpoint="/eth/v1/validator/duties/proposer/{epoch}"
  method="GET"
  :pathParams="[
    {
      name: 'epoch',
      description: 'Epoch number'
    }
  ]"
  :networks="networks"
/>

#### POST /eth/v1/validator/duties/sync/:epoch

FIXME: Implementation details needed for sync committee duties

<ApiTester
  endpoint="/eth/v1/validator/duties/sync/{epoch}"
  method="POST"
  :pathParams="[
    {
      name: 'epoch',
      description: 'Epoch number'
    }
  ]"
  :networks="networks"
/>

### Validator Operations

#### POST /eth/v1/validator/attestation_data

FIXME: Implementation details needed for attestation data

<ApiTester
  endpoint="/eth/v1/validator/attestation_data"
  method="POST"
  :networks="networks"
/>

#### GET /eth/v2/validator/aggregate_attestation

FIXME: Implementation details needed for aggregate attestation

<ApiTester
  endpoint="/eth/v2/validator/aggregate_attestation"
  method="GET"
  :networks="networks"
/>

#### POST /eth/v2/validator/aggregate_and_proofs

FIXME: Implementation details needed for aggregate and proofs

<ApiTester
  endpoint="/eth/v2/validator/aggregate_and_proofs"
  method="POST"
  :networks="networks"
/>

### Validator Subscriptions

#### POST /eth/v1/validator/beacon_committee_subscriptions

FIXME: Implementation details needed for beacon committee subscriptions

<ApiTester
  endpoint="/eth/v1/validator/beacon_committee_subscriptions"
  method="POST"
  :networks="networks"
/>

#### POST /eth/v1/validator/sync_committee_subscriptions

FIXME: Implementation details needed for sync committee subscriptions

<ApiTester
  endpoint="/eth/v1/validator/sync_committee_subscriptions"
  method="POST"
  :networks="networks"
/>

### Validator Registration

#### POST /eth/v1/validator/register_validator

FIXME: Implementation details needed for validator registration

<ApiTester
  endpoint="/eth/v1/validator/register_validator"
  method="POST"
  :networks="networks"
/>

### Validator Health

#### POST /eth/v1/validator/liveness/:epoch

FIXME: Implementation details needed for validator liveness

<ApiTester
  endpoint="/eth/v1/validator/liveness/{epoch}"
  method="POST"
  :pathParams="[
    {
      name: 'epoch',
      description: 'Epoch number'
    }
  ]"
  :networks="networks"
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
