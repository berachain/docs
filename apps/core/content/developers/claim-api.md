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
2. Submit the proof to the [BGTIncentiveDistributor](0x92203b1242e536e91159707c2a6bfb3ed1339b07eb35a724e5237b60a55919815505a82199a4a8aa63e4e1daafd37983) smart contract when claiming rewards
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
      description: 'The validator CometBFT public address'
    }
  ]"
  :examples="{
    bepolia: {
      validator: '0x92203b1242e536e91159707c2a6bfb3ed1339b07eb35a724e5237b60a55919815505a82199a4a8aa63e4e1daafd37983'
    },
    mainnet: {
      validator: '0xfixme'
    }
  }"
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
  :examples="{
    bepolia: {
      wallet: '0xEB4A898C0bA5d0cdC5886156408edaea5b0A188d'
    },
    mainnet: {
      wallet: '0xfixme'
    }
  }"
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
  :examples="{
    bepolia: {
      wallet: '0xEB4A898C0bA5d0cdC5886156408edaea5b0A188d'
    },
    mainnet: {
      wallet: '0xfixme'
    }
  }"
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
  :examples="{
    bepolia: {
      wallet: '0xEB4A898C0bA5d0cdC5886156408edaea5b0A188d',
      validator: '0x92203b1242e536e91159707c2a6bfb3ed1339b07eb35a724e5237b60a55919815505a82199a4a8aa63e4e1daafd37983'
    },
    mainnet: {
      wallet: '0xfixme',
      validator: '0xfixme'
    }
  }"
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
  :examples="{
    bepolia: {
      wallet: '0xEB4A898C0bA5d0cdC5886156408edaea5b0A188d'
    },
    mainnet: {
      wallet: '0xfixme'
    }
  }"
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
  :examples="{
    bepolia: {
      wallet: '0xEB4A898C0bA5d0cdC5886156408edaea5b0A188d'
    },
    mainnet: {
      wallet: '0xfixme'
    }
  }"
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
  :examples="{
    bepolia: {
      wallet: '0xEB4A898C0bA5d0cdC5886156408edaea5b0A188d',
      validator: '0xa15875a9e554e446e5fcd463245f4d7bd6863b1a5f51d33ac828d06f9185c5705f1d0a442b52df142ee74f300a01551f'
    },
    mainnet: {
      wallet: '0xfixme',validator: '0xfixme'
    }
  }"
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
  :examples="{
    bepolia: {
      vault: '0x9c84a17467d0f691b4a6fe6c64fa00edb55d9646'
    },
    mainnet: {
      vault: 'fixme'
    }
  }"
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

