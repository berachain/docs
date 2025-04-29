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
</script>

# Claim API

The Claim API provides endpoints for learning about available reward distributions, providing proofs on demand, and aggregated.  This API is useful for developers in the Proof of Liquidity ecosystem.

## Base URL

The base URL for the API endpoints depends on which network you're interacting with:

- **Testnet (Bepolia)**: `https://bepolia.claim-api.berachain.com`
- **Mainnet**: `https://claim-api.berachain.com`

## Rate Limiting and Caching

All endpoints are rate-limited to prevent abuse. Responses are also cached for optimal performance. If you receive a rate limit error, please wait before retrying your request or reconsider your software design. 

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


## Examples

Here's an example of how to fetch rewards for a wallet using curl:

```bash
curl https://bepolia.claim-api.berachain.com/api/v1/wallets/0x1234.../rewards
```

For JavaScript/TypeScript applications:

```typescript
const response = await fetch('https://bepolia.claim-api.berachain.com/api/v1/wallets/0x1234.../rewards');
const data = await response.json();
```

## Endpoints

### Health Check

```http
GET /health
```

Check if the API is operational.

**Response**
```json
{
    "status": "healthy"
}
```

### Validator Yields

#### Get Latest Yield for Specific Validator

```http
GET /api/v1/reward-distributions/validators/yield/{validator}
```

Retrieve the most recent yield information for a specific validator.

**Parameters**
- `validator` (path): The validator address

**Response**
```json
// FIXME: Add example response showing yield data structure 
```

#### Get Latest Yields for All Validators

```http
GET /api/v1/reward-distributions/validators/yield
```

Retrieve the most recent yield information for all validators.

**Response**
```json
// FIXME: Add example response showing array of validator yields with their addresses
```

### Wallet Operations

#### Get Reward Distributions for Wallet

```http
GET /api/v1/wallets/{wallet}/reward-distributions
```

Retrieve all reward distributions associated with a specific wallet.

**Parameters**
- `wallet` (path): The wallet address

**Response**
```json
// FIXME: Add example response showing distribution data structure 
```

#### Get Proofs for Distribution

```http
GET /api/v1/wallets/{wallet}/proofs/distribution/{dist_id}
```

Retrieve proofs for a specific distribution.

**Parameters**
- `wallet` (path): The wallet address
- `dist_id` (path): The distribution ID

**Response**
```json
// FIXME: Add example response showing proof structure including:
// - Merkle proof format
```

#### Get Proofs for Validator

```http
GET /api/v1/wallets/{wallet}/proofs/validator/{validator}
```

Retrieve all proofs associated with a specific validator for a wallet.

**Parameters**
- `wallet` (path): The wallet address
- `validator` (path): The validator address

**Response**
```json
// FIXME: Add example response showing array of proofs with their associated distributions
```

#### Get Wallet Rewards

```http
GET /api/v1/wallets/{wallet}/rewards
```

Retrieve all rewards for a specific wallet.

**Parameters**
- `wallet` (path): The wallet address

**Response**
```json
// FIXME: Add example response showing:
// - Total rewards
// - Breakdown by validator
// - Claim status
// - Timestamps
```

#### Get Aggregated Unclaimed Rewards

```http
GET /api/v1/wallets/{wallet}/rewards/aggregation
```

Retrieve aggregated unclaimed rewards grouped by validators for a wallet.

**Parameters**
- `wallet` (path): The wallet address

**Response**
```json
// FIXME: Add example response showing aggregated rewards structure:
// - Total unclaimed amount
// - Breakdown by validator
// - Time periods
```

#### Get Aggregated Unclaimed Rewards for Specific Validator

```http
GET /api/v1/wallets/{wallet}/rewards/aggregation/{validator}
```

Retrieve aggregated unclaimed rewards for a specific validator and wallet.

**Parameters**
- `wallet` (path): The wallet address
- `validator` (path): The validator address

**Response**
```json
// FIXME: Add example response showing detailed breakdown of unclaimed rewards
```

### Vault Operations

#### Get Vault BGT Rate

```http
GET /api/v1/vaults/{vault}/bgt-rate
```

Retrieve the expected BGT ingestion rate per block for a specific vault.

**Parameters**
- `vault` (path): The vault address

**Response**
```json
// FIXME: Add example response showing:
// - BGT rate per block
// - Any additional vault metrics
```


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




