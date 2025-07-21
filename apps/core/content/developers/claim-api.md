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

const networks = [
  { 
    name: 'Testnet (Bepolia)', 
    url: 'https://bepolia.api-claim.berachain.com', 
    id: 'bepolia' 
  },
  { 
    name: 'Mainnet', 
    url: 'https://api-claim.berachain.com', 
    id: 'mainnet'
  }
];
</script>

# Claim API

The Claim API provides endpoints for learning about available Incentive distributions, providing proofs on demand, and aggregated. This API is useful for developers in the Proof of Liquidity ecosystem.

## Base URL

The base URL for the API endpoints depends on which network you're interacting with:

- **Testnet (Bepolia)**: `https://bepolia.api-claim.berachain.com`
- **Mainnet**: `https://api-claim.berachain.com`

## Rate Limiting, Pagination and Caching

All endpoints are rate-limited to prevent abuse. Responses are also cached for optimal performance. If you receive a rate limit error, please wait before retrying your request or reconsider your software design.

Some endpoints employ pagination, so all queries accept pagination parameters and always provide a response with pagination metadata. The pagination parameters are:

- `page` — the page number beginning from 0
- `per_page` — how many items to have on each page.

APIs endpoints that return paginated results return pagination info with every reply:

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

The Claim API uses Merkle proofs to verify Incentive eligibility. These proofs are cryptographic evidence that a particular wallet address is entitled to specified amount of Incentives from a particular vault.

### What are Merkle Proofs?

Merkle proofs are a cryptographic method that allows for efficient and secure verification of data within a larger dataset without requiring the entire dataset. In the context of Incentive distributions:

1. Each distribution creates a Merkle tree containing all eligible wallet addresses and their corresponding Incentives
2. When a wallet requests their Incentives, the API provides a Merkle proof that cryptographically verifies their inclusion in the distribution
3. This proof can be submitted on-chain to claim the Incentives

### Using Merkle Proofs

When you receive a Merkle proof from the API:

1. Store the proof data securely
2. Submit the proof to the [BGTIncentiveDistributor](https://docs.berachain.com/developers/contracts/bgtincentivedistributor) smart contract when claiming Incentives
3. The contract will verify the proof's validity before releasing the Incentives

## Endpoints

### Health Check

Check if the API is operational.

```http
GET /health
```

<ApiTester 
  endpoint="/health"
  method="GET"
  :networks="networks"
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
  :networks="networks"
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
      validator: '0xa0c673180d97213c1c35fe3bf4e684dd3534baab235a106d1f71b9c8a37e4d37a056d47546964fd075501dff7f76aeaf'
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
  :networks="networks"
/>

### Wallet Operations

#### Get Incentive Distributions for Wallet

```http
GET /api/v1/wallets/{wallet}/reward-distributions
```

Retrieve all incentive distributions associated with a specific wallet.

<ApiTester 
  endpoint="/api/v1/wallets/{wallet}/reward-distributions"
  method="GET"
  :networks="networks"
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
      wallet: '0x0x8E21f3431F8Dcd1fAD8d70F4EbFd8B62F5053bD8'
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
  :networks="networks"
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
      wallet: '0x8E21f3431F8Dcd1fAD8d70F4EbFd8B62F5053bD8'
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
  :networks="networks"
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
      validator: '0xa4e4b63514f54d61da5197359f11ff1fc2930788ba2ffdd30c2fc059cbe0221020197bf9446b16ac347f36c7517a8686'
    },
    mainnet: {
      wallet: '0x8E21f3431F8Dcd1fAD8d70F4EbFd8B62F5053bD8',
      validator: '0x83199315cf36ebcf6a50bab572800d79324835fae832a3da9238f399c39feceb62de41339eab4cc8f79a6d4e6bcb825c'
    }
  }"
/>

#### Get Wallet Incentives

Retrieve all Incentives for a specific wallet.

```http
GET /api/v1/wallets/{wallet}/rewards
```

<ApiTester 
  endpoint="/api/v1/wallets/{wallet}/rewards"
  method="GET"
  :networks="networks"
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
      wallet: '0x8E21f3431F8Dcd1fAD8d70F4EbFd8B62F5053bD8'
    }
  }"
/>

#### Get Aggregated Unclaimed Incentives

Retrieve aggregated unclaimed Incentives grouped by validators for a wallet.

```http
GET /api/v1/wallets/{wallet}/rewards/aggregation
```

<ApiTester 
  endpoint="/api/v1/wallets/{wallet}/rewards/aggregation"
  method="GET"
  :networks="networks"
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
      wallet: '0x8E21f3431F8Dcd1fAD8d70F4EbFd8B62F5053bD8'
    }
  }"
/>

#### Get Aggregated Unclaimed Incentives for Specific Validator

Retrieve aggregated unclaimed Incentives for a specific validator and wallet.

```http
GET /api/v1/wallets/{wallet}/rewards/aggregation/{validator}
```

<ApiTester 
  endpoint="/api/v1/wallets/{wallet}/rewards/aggregation/{validator}"
  method="GET"
  :networks="networks"
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
      validator: '0xa4e4b63514f54d61da5197359f11ff1fc2930788ba2ffdd30c2fc059cbe0221020197bf9446b16ac347f36c7517a8686'
    },
    mainnet: {
      wallet: '0x8E21f3431F8Dcd1fAD8d70F4EbFd8B62F5053bD8',
      validator: '0x83199315cf36ebcf6a50bab572800d79324835fae832a3da9238f399c39feceb62de41339eab4cc8f79a6d4e6bcb825c'
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
  :networks="networks"
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
      vault: '0xe8ed00b1b142e8d84ef773c4fccaa18682d5a401'
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
