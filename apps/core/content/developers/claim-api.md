---
head:
  - - meta
    - property: og:title
      content: Berachain Claim API
  - - meta
    - name: description
      content: Berachain Claim JSON-RPC API
  - - meta
    - property: og:description
      content: Berachain Claim JSON-RPC API
---

<script setup>
import config from '@berachain/config/constants.json';
import ApiTester from '../../.vitepress/theme/components/ApiTester.vue';
</script>

# Claim API

The Claim API provides endpoints for learning about available reward distributions, providing proofs on demand, and aggregated. This API is useful for developers in the Proof of Liquidity ecosystem.

## Base URL

The base URL for the API endpoints depends on which network you're interacting with:

- **Testnet (Bepolia)**: `https://bepolia.api-claim.berachain.com`
- **Mainnet**: `https://api-claim.berachain.com`

## Rate Limiting, Pagination and Caching

All endpoints are rate-limited to prevent abuse. Responses are also cached for optimal performance. If you receive a rate limit error, please wait before retrying your request or reconsider your software design.

Some endpoints employ pagination, so all queries accept pagination parameters and always provide a response with pagination metadata. The pagination parameters:, being `page` - the page number beginning from 0 -- and `per_page` values. APIs that return paginated results return pagination info with every reply:

```json
{
  "pagination": {
    "next": 2,
    "previous": 0,
    "record_per_page": 10,
    "current_page": 1,
    "total_page": 4
  },
  ... remainder of response here
}
```

## Merkle Proofs

The Claim API uses Merkle proofs to verify reward eligibility. These proofs are cryptographic evidence that a particular wallet address is entitled to specific rewards from a distribution.

### What are Merkle Proofs?

Merkle proofs are a cryptographic method that allows for efficient and secure verification of data within a larger dataset without requiring the entire dataset. In the context of reward distributions:

1. Each distribution creates a Merkle tree containing all eligible wallet addresses and their corresponding rewards
2. When a wallet requests their rewards, the API provides a Merkle proof that cryptographically verifies their inclusion in the distribution
3. This proof can be submitted on-chain to claim the rewards

### Using Merkle Proofs

When you receive a Merkle proof from the API:

1. Store the proof data securely
2. Submit the proof to the (FIXME which) smart contract when claiming rewards
3. The contract will verify the proof's validity before releasing the rewards

## Endpoints

### Health Check

Check if the API is operational.

```http
GET /health
```

<ApiTester 
  endpoint="/health"
  method="GET"
/>

### Validator Yields

#### Get Latest Yield for Specific Validator

Retrieve the most recent yield information for a specific validator.

```http
GET /api/v1/reward-distributions/validators/yield/{validator}
```

<ApiTester 
  endpoint="/api/v1/reward-distributions/validators/yield/{validator}"
  method="GET"
  :pathParams="[
    {
      name: 'validator',
      description: 'The validator address'
    }
  ]"
/>

#### Get Latest Yields for All Validators

```http
GET /api/v1/reward-distributions/validators/yield
```

<ApiTester 
  endpoint="/api/v1/reward-distributions/validators/yield"
  method="GET"
/>

### Wallet Operations

#### Get Reward Distributions for Wallet

```http
GET /api/v1/wallets/{wallet}/reward-distributions
```

Retrieve all reward distributions associated with a specific wallet.

<ApiTester 
  endpoint="/api/v1/wallets/{wallet}/reward-distributions"
  method="GET"
  :pathParams="[
    {
      name: 'wallet',
      description: 'The wallet address to query'
    }
  ]"
/>

#### Get Proofs for Distribution

Retrieve proofs for a specific distribution.

```http
GET /api/v1/wallets/{wallet}/proofs/distribution/{dist_id}
```

<ApiTester 
  endpoint="/api/v1/wallets/{wallet}/proofs/distribution/{dist_id}"
  method="GET"
  :pathParams="[
    {
      name: 'wallet',
      description: 'The wallet address'
    },
    {
      name: 'dist_id',
      description: 'The distribution ID'
    }
  ]"
/>

#### Get Proofs for Validator

Retrieve all proofs associated with a specific validator for a wallet.

```http
GET /api/v1/wallets/{wallet}/proofs/validator/{validator}
```

<ApiTester 
  endpoint="/api/v1/wallets/{wallet}/proofs/validator/{validator}"
  method="GET"
  :pathParams="[
    {
      name: 'wallet',
      description: 'The wallet address'
    },
    {
      name: 'validator',
      description: 'The validator address'
    }
  ]"
/>

#### Get Wallet Rewards

Retrieve all rewards for a specific wallet.

```http
GET /api/v1/wallets/{wallet}/rewards
```

<ApiTester 
  endpoint="/api/v1/wallets/{wallet}/rewards"
  method="GET"
  :pathParams="[
    {
      name: 'wallet',
      description: 'The wallet address'
    }
  ]"
/>

#### Get Aggregated Unclaimed Rewards

Retrieve aggregated unclaimed rewards grouped by validators for a wallet.

```http
GET /api/v1/wallets/{wallet}/rewards/aggregation
```

<ApiTester 
  endpoint="/api/v1/wallets/{wallet}/rewards/aggregation"
  method="GET"
  :pathParams="[
    {
      name: 'wallet',
      description: 'The wallet address'
    }
  ]"
/>

#### Get Aggregated Unclaimed Rewards for Specific Validator

Retrieve aggregated unclaimed rewards for a specific validator and wallet.

```http
GET /api/v1/wallets/{wallet}/rewards/aggregation/{validator}
```

<ApiTester 
  endpoint="/api/v1/wallets/{wallet}/rewards/aggregation/{validator}"
  method="GET"
  :pathParams="[
    {
      name: 'wallet',
      description: 'The wallet address'
    },
    {
      name: 'validator',
      description: 'The validator address'
    }
  ]"
/>

### Vault Operations

#### Get Vault BGT Rate

Retrieve the expected BGT ingestion rate per block for a specific vault.

```http
GET /api/v1/vaults/{vault}/bgt-rate
```

<ApiTester 
  endpoint="/api/v1/vaults/{vault}/bgt-rate"
  method="GET"
  :pathParams="[
    {
      name: 'vault',
      description: 'The vault address'
    }
  ]"
/>

## Error Handling

The API uses standard HTTP status codes:

- `200`: Success
- `400`: Bad Request
- `404`: Not Found
- `429`: Too Many Requests (Rate Limit Exceeded)
- `500`: Internal Server Error

Error responses will include a message explaining what went wrong:

```json
{
  "error": "Error message description"
}
```

Common error scenarios:
// FIXME: Document specific error cases for each endpoint, such as:
// - Invalid wallet address format
// - Non-existent validator
// - Invalid distribution ID
// - Missing proofs
// - System maintenance states
