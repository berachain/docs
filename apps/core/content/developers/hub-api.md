---
head:
  - - meta
    - property: og:title
      content: Berachain Hub API
  - - meta
    - name: description
      content: Berachain Hub GraphQL API
  - - meta
    - property: og:description
      content: Berachain Hub GraphQL API
---

<script setup>
import config from '@berachain/config/constants.json';
</script>

# Hub API

The Hub API provides GraphQL access to Berachain's exchange and Proof of Liquidity data. This is the same API that powers [hub.berachain.com](https://hub.berachain.com), providing pool information, token prices, swap routing, user balances, and PoL data.

## Base URL

The GraphQL API is available at:

**Mainnet**: `https://api.berachain.com`

## Making Requests

All requests are POST requests to the base URL with a JSON body containing your query. Explore the API interactively at [https://api.berachain.com](https://api.berachain.com).


```bash
curl -X POST https://api.berachain.com \
  -H "Content-Type: application/json" \
  -d '{
    "query": "{ poolGetPools(where: { chainIn: [BERACHAIN] }) { id name type dynamicData { totalLiquidity } } }"
  }'
```

## Core Query Domains

### Pools

Pool queries provide access to liquidity pool data, including token balances, fees, volumes, and APR information.

#### Get a Single Pool

Retrieve detailed information about a specific pool.

```graphql
query GetPool {
  poolGetPool(
    id: "0xf961a8f6d8c69e7321e78d254ecafbcc3a637621000000000000000000000001"
    chain: BERACHAIN
  ) {
    id
    name
    type
    version
    address
    protocolVersion
    allTokens {
      address
      name
      symbol
      decimals
    }
    poolTokens {
      address
      symbol
      balance
      balanceUSD
      weight
    }
    dynamicData {
      totalLiquidity
      volume24h
      fees24h
      swapFee
      aprItems {
        title
        type
        apr
        rewardTokenAddress
        rewardTokenSymbol
      }
    }
  }
}
```

**Example Response:**

```json
{
  "data": {
    "poolGetPool": {
      "id": "0xf961a8f6d8c69e7321e78d254ecafbcc3a637621000000000000000000000001",
      "name": "USDC.e | HONEY",
      "type": "STABLE",
      "version": 3,
      "address": "0xf961a8f6d8c69e7321e78d254ecafbcc3a637621",
      "protocolVersion": 3,
      "allTokens": [
        {
          "address": "0x05D0dD5135E3eF3aDE32a9eF9Cb06e8D37A6795D",
          "name": "USD Coin",
          "symbol": "USDC.e",
          "decimals": 6
        },
        {
          "address": "0x7EeCA4205fF31f947EdBd49195a7A88E6A91161B",
          "name": "Honey",
          "symbol": "HONEY",
          "decimals": 18
        }
      ],
      "poolTokens": [
        {
          "address": "0x05D0dD5135E3eF3aDE32a9eF9Cb06e8D37A6795D",
          "symbol": "USDC.e",
          "balance": "265432.123456",
          "balanceUSD": "265432.12",
          "weight": null
        },
        {
          "address": "0x7EeCA4205fF31f947EdBd49195a7A88E6A91161B",
          "symbol": "HONEY",
          "balance": "264987.456789123456789",
          "balanceUSD": "264987.45",
          "weight": null
        }
      ],
      "dynamicData": {
        "totalLiquidity": "529419.57",
        "volume24h": "159234.82",
        "fees24h": "159.23",
        "swapFee": "0.001",
        "aprItems": [
          {
            "title": "Swap fees APR",
            "type": "SWAP_FEE",
            "apr": 10.98,
            "rewardTokenAddress": null,
            "rewardTokenSymbol": null
          }
        ]
      }
    }
  }
}
```

**Interpretation:** This stable pool holds approximately equal amounts of USDC.e ($265k) and HONEY ($265k) for a total liquidity of $529k. The pool processed $159k in swap volume over 24 hours, generating $159 in fees. With a 0.1% swap fee, the pool offers a 10.98% APR from swap fees alone.

#### Query Multiple Pools

Retrieve pools with filtering, sorting, and pagination.

```graphql
query GetPools {
  poolGetPools(
    where: { chainIn: [BERACHAIN], minTvl: 10000 }
    orderBy: totalLiquidity
    orderDirection: desc
    first: 20
  ) {
    id
    address
    name
    type
    displayTokens {
      address
      name
      symbol
    }
    dynamicData {
      totalLiquidity
      volume24h
      aprItems {
        apr
        type
      }
    }
  }
}
```

**Example Response:**

```json
{
  "data": {
    "poolGetPools": [
      {
        "id": "0x7f2b3b7fbd3226c5be438cde49a519f442ca2eda00020000000000000000067d",
        "address": "0x7f2b3b7fbd3226c5be438cde49a519f442ca2eda",
        "name": "50WBERA-50HONEY",
        "type": "WEIGHTED",
        "displayTokens": [
          {
            "address": "0x7EeCA4205fF31f947EdBd49195a7A88E6A91161B",
            "name": "Honey",
            "symbol": "HONEY"
          },
          {
            "address": "0xF4c8E32EaDEC4BFe97E0F595AdD0f4450a863a11",
            "name": "Wrapped BERA",
            "symbol": "WBERA"
          }
        ],
        "dynamicData": {
          "totalLiquidity": "1245678.90",
          "volume24h": "345678.12",
          "aprItems": [
            {
              "apr": 12.45,
              "type": "SWAP_FEE"
            },
            {
              "apr": 8.32,
              "type": "STAKING"
            }
          ]
        }
      }
    ]
  }
}
```

**Interpretation:** This returns pools sorted by TVL (largest first) with at least $10,000 liquidity. The example shows a 50/50 WBERA-HONEY weighted pool with $1.24M TVL and $345k daily volume. The pool offers 12.45% APR from swap fees plus 8.32% from staking rewards for a combined 20.77% APR.

**Filter options:**
- `poolTypeIn/poolTypeNotIn`: Pool type (WEIGHTED, STABLE, COW_AMM, etc.)
- `tokensIn/tokensNotIn`: Token addresses
- `minTvl`: Minimum TVL
- `tagIn/tagNotIn`: Pool tags

**Ordering options:** `totalLiquidity`, `totalShares`, `volume24h`, `fees24h`, `apr`, `bgtApr`

#### Get Pool Events

Retrieve historical events for a pool including swaps, adds, and removes.

```graphql
query GetPoolEvents {
  poolGetEvents(
    poolId: "0x7f2b3b7fbd3226c5be438cde49a519f442ca2eda00020000000000000000067d"
    chain: BERACHAIN
    range: SEVEN_DAYS
    typeIn: [SWAP, ADD, REMOVE]
  ) {
    id
    type
    timestamp
    tx
    valueUSD
    ... on GqlPoolSwapEventV3 {
      tokenIn {
        address
        amount
        valueUSD
      }
      tokenOut {
        address
        amount
        valueUSD
      }
    }
  }
}
```

**Example Response:**

```json
{
  "data": {
    "poolGetEvents": [
      {
        "id": "0x123...",
        "type": "SWAP",
        "timestamp": 1698765432,
        "tx": "0xabc123def456...",
        "valueUSD": 1234.56,
        "tokenIn": {
          "address": "0xF4c8E32EaDEC4BFe97E0F595AdD0f4450a863a11",
          "amount": "0.65",
          "valueUSD": 1234.56
        },
        "tokenOut": {
          "address": "0x7EeCA4205fF31f947EdBd49195a7A88E6A91161B",
          "amount": "1.234567",
          "valueUSD": 1234.56
        }
      },
      {
        "id": "0x456...",
        "type": "ADD",
        "timestamp": 1698764321,
        "tx": "0xdef789abc012...",
        "valueUSD": 5000.00
      }
    ]
  }
}
```

**Interpretation:** This shows recent pool activity over the past 7 days. The first event is a swap where 0.65 WBERA ($1,234.56) was exchanged for 1.23 HONEY. The second event shows a $5,000 liquidity addition. Use this data to analyze pool trading patterns and liquidity changes.

#### Get Pool Snapshots

Retrieve historical snapshots of pool data for charting and analytics.

```graphql
query GetPoolSnapshots {
  poolGetSnapshots(
    id: "0x7f2b3b7fbd3226c5be438cde49a519f442ca2eda00020000000000000000067d"
    chain: BERACHAIN
    range: THIRTY_DAYS
  ) {
    id
    timestamp
    totalLiquidity
    volume24h
    fees24h
    totalShares
    sharePrice
  }
}
```

**Example Response:**

```json
{
  "data": {
    "poolGetSnapshots": [
      {
        "id": "snapshot-1",
        "timestamp": 1698700800,
        "totalLiquidity": "1200000.00",
        "volume24h": "320000.00",
        "fees24h": "320.00",
        "totalShares": "1095445.012345",
        "sharePrice": "1.095"
      },
      {
        "id": "snapshot-2",
        "timestamp": 1698787200,
        "totalLiquidity": "1245000.00",
        "volume24h": "345000.00",
        "fees24h": "345.00",
        "totalShares": "1098234.567890",
        "sharePrice": "1.134"
      }
    ]
  }
}
```

**Interpretation:** Historical snapshots show pool growth over time. TVL increased from $1.2M to $1.245M, volume grew from $320k to $345k daily, and the share price (BPT value) rose from $1.095 to $1.134, indicating profitable fee accumulation. Use this data for charting TVL trends and analyzing pool performance.

### Tokens

Token queries provide access to token metadata, pricing data, and dynamic market information.

#### Get Token Information

Retrieve metadata and current information for tokens on Berachain.

```graphql
query GetTokens {
  tokenGetTokens(chains: [BERACHAIN]) {
    address
    name
    symbol
    decimals
    logoURI
    tradable
    description
    websiteUrl
    coingeckoId
  }
}
```

**Example Response:**

```json
{
  "data": {
    "tokenGetTokens": [
      {
        "address": "0x7EeCA4205fF31f947EdBd49195a7A88E6A91161B",
        "name": "Honey",
        "symbol": "HONEY",
        "decimals": 18,
        "logoURI": "https://...",
        "tradable": true,
        "description": "Berachain's native stablecoin",
        "websiteUrl": "https://berachain.com",
        "coingeckoId": "honey-berachain"
      },
      {
        "address": "0xF4c8E32EaDEC4BFe97E0F595AdD0f4450a863a11",
        "name": "Wrapped BERA",
        "symbol": "WBERA",
        "decimals": 18,
        "logoURI": "https://...",
        "tradable": true,
        "description": "Wrapped version of BERA",
        "websiteUrl": "https://berachain.com",
        "coingeckoId": null
      }
    ]
  }
}
```

**Interpretation:** This returns all tokens available on Berachain with their metadata. The `decimals` field is crucial for properly formatting token amounts (divide raw amounts by 10^decimals). Use `tradable: true` to filter tokens available for swapping. The `coingeckoId` enables price lookups from external sources.

#### Get Current Token Prices

Retrieve current prices for specified tokens.

```graphql
query GetCurrentPrices {
  tokenGetCurrentPrices(
    chains: [BERACHAIN]
    addressIn: [
      "0x7EeCA4205fF31f947EdBd49195a7A88E6A91161B"
      "0xF4c8E32EaDEC4BFe97E0F595AdD0f4450a863a11"
    ]
  ) {
    address
    chain
    price
    updatedAt
  }
}
```

**Example Response:**

```json
{
  "data": {
    "tokenGetCurrentPrices": [
      {
        "address": "0x7EeCA4205fF31f947EdBd49195a7A88E6A91161B",
        "chain": "BERACHAIN",
        "price": 1.0002,
        "updatedAt": 1698765432
      },
      {
        "address": "0xF4c8E32EaDEC4BFe97E0F595AdD0f4450a863a11",
        "chain": "BERACHAIN",
        "price": 1898.45,
        "updatedAt": 1698765430
      }
    ]
  }
}
```

**Interpretation:** Current USD prices for requested tokens. HONEY trades at $1.0002 (slightly above its $1 peg), while WBERA is at $1,898.45. The `updatedAt` timestamp (Unix epoch) shows when the price was last refreshed. Prices update frequently during high trading activity.

#### Get Token Dynamic Data

Retrieve market data including price changes, market cap, and trading statistics.

```graphql
query GetTokenDynamicData {
  tokenGetTokensDynamicData(
    addresses: ["0x7EeCA4205fF31f947EdBd49195a7A88E6A91161B"]
    chain: BERACHAIN
  ) {
    tokenAddress
    price
    priceChange24h
    priceChangePercent24h
    priceChangePercent7d
    high24h
    low24h
    marketCap
    fdv
  }
}
```

**Example Response:**

```json
{
  "data": {
    "tokenGetTokensDynamicData": [
      {
        "tokenAddress": "0x7EeCA4205fF31f947EdBd49195a7A88E6A91161B",
        "price": 1.0002,
        "priceChange24h": 0.0001,
        "priceChangePercent24h": 0.01,
        "priceChangePercent7d": 0.05,
        "high24h": 1.0015,
        "low24h": 0.9998,
        "marketCap": "12500000",
        "fdv": "15000000"
      }
    ]
  }
}
```

**Interpretation:** Market data shows HONEY's price stability at $1.0002 with only 0.01% daily change and 0.05% weekly change. The 24-hour range ($0.9998 to $1.0015) demonstrates tight peg maintenance. Market cap of $12.5M reflects circulating supply, while FDV (fully diluted valuation) of $15M accounts for total supply.

#### Get Historical Token Prices

Retrieve historical price data for charting and analysis.

```graphql
query GetHistoricalPrices {
  tokenGetHistoricalPrices(
    addresses: ["0x7EeCA4205fF31f947EdBd49195a7A88E6A91161B"]
    chain: BERACHAIN
    range: SEVEN_DAY
  ) {
    address
    chain
    prices {
      timestamp
      price
    }
  }
}
```

**Example Response:**

```json
{
  "data": {
    "tokenGetHistoricalPrices": [
      {
        "address": "0x7EeCA4205fF31f947EdBd49195a7A88E6A91161B",
        "chain": "BERACHAIN",
        "prices": [
          {
            "timestamp": "2024-01-01T00:00:00.000Z",
            "price": 0.9998
          },
          {
            "timestamp": "2024-01-02T00:00:00.000Z",
            "price": 1.0001
          },
          {
            "timestamp": "2024-01-03T00:00:00.000Z",
            "price": 1.0002
          }
        ]
      }
    ]
  }
}
```

**Interpretation:** Historical price data for charting HONEY's performance over 7 days. Each data point includes an ISO 8601 timestamp and USD price. This shows HONEY maintaining its $1 peg with minimal deviation (0.9998 to 1.0002). Plot these points to create price charts for your application.

### Smart Order Router (SOR)

The SOR queries calculate optimal swap routes across multiple pools to achieve the best execution price.

#### Get Swap Paths

Query the smart order router to find the best swap route for a given token pair.

```graphql
query GetSwapPaths {
  sorGetSwapPaths(
    chain: BERACHAIN
    tokenIn: "0xF4c8E32EaDEC4BFe97E0F595AdD0f4450a863a11"
    tokenOut: "0x7EeCA4205fF31f947EdBd49195a7A88E6A91161B"
    swapType: EXACT_IN
    swapAmount: "1"
  ) {
    tokenIn
    tokenOut
    swapAmount
    returnAmount
    swapAmountRaw
    returnAmountRaw
    routes {
      tokenIn
      tokenInAmount
      tokenOut
      tokenOutAmount
      share
      hops {
        poolId
        tokenIn
        tokenOut
        tokenInAmount
        tokenOutAmount
      }
    }
    priceImpact {
      priceImpact
      error
    }
    effectivePrice
    effectivePriceReversed
  }
}
```

**Example Response:**

```json
{
  "data": {
    "sorGetSwapPaths": {
      "tokenIn": "0xF4c8E32EaDEC4BFe97E0F595AdD0f4450a863a11",
      "tokenOut": "0x7EeCA4205fF31f947EdBd49195a7A88E6A91161B",
      "swapAmount": "1",
      "returnAmount": "1.897654",
      "swapAmountRaw": "1000000000000000000",
      "returnAmountRaw": "1897654321098765432",
      "routes": [
        {
          "tokenIn": "0xF4c8E32EaDEC4BFe97E0F595AdD0f4450a863a11",
          "tokenInAmount": "1",
          "tokenOut": "0x7EeCA4205fF31f947EdBd49195a7A88E6A91161B",
          "tokenOutAmount": "1.897654",
          "share": 1.0,
          "hops": [
            {
              "poolId": "0x7f2b3b7fbd3226c5be438cde49a519f442ca2eda00020000000000000000067d",
              "tokenIn": "0xF4c8E32EaDEC4BFe97E0F595AdD0f4450a863a11",
              "tokenOut": "0x7EeCA4205fF31f947EdBd49195a7A88E6A91161B",
              "tokenInAmount": "1",
              "tokenOutAmount": "1.897654"
            }
          ]
        }
      ],
      "priceImpact": {
        "priceImpact": "0.003",
        "error": null
      },
      "effectivePrice": "1.897654",
      "effectivePriceReversed": "0.527007"
    }
  }
}
```

**Interpretation:** Swapping 1 WBERA yields 1.897654 HONEY with only 0.3% price impact. The SOR found a direct route through a single pool (share: 1.0 means 100% of the swap uses this route). The effective price of 1.897654 HONEY per WBERA, or conversely 0.527007 WBERA per HONEY. Use `returnAmountRaw` for transaction calls.

#### Get Swap Paths with Transaction Data

Include transaction call data in the response for immediate execution.

```graphql
query GetSwapPathsWithCallData {
  sorGetSwapPaths(
    chain: BERACHAIN
    tokenIn: "0xF4c8E32EaDEC4BFe97E0F595AdD0f4450a863a11"
    tokenOut: "0x7EeCA4205fF31f947EdBd49195a7A88E6A91161B"
    swapType: EXACT_IN
    swapAmount: "1"
    callDataInput: {
      slippagePercentage: "0.5"
      sender: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
      receiver: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
      deadline: 999999999999
    }
  ) {
    returnAmount
    priceImpact {
      priceImpact
    }
    callData {
      to
      callData
      value
      minAmountOutRaw
    }
  }
}
```

**Example Response:**

```json
{
  "data": {
    "sorGetSwapPaths": {
      "returnAmount": "1.897654",
      "priceImpact": {
        "priceImpact": "0.003"
      },
      "callData": {
        "to": "0xBA12222222228d8Ba445958a75a0704d566BF2C8",
        "callData": "0x52bbbe2900000000000000000000000000000000000000000000...",
        "value": "0",
        "minAmountOutRaw": "1888175824543210987"
      }
    }
  }
}
```

**Interpretation:** Ready-to-execute transaction data for swapping 1 WBERA to HONEY. Send the transaction to address `to` with the encoded `callData`. The `minAmountOutRaw` (1.888175... HONEY) accounts for 0.5% slippage protection—the transaction reverts if output falls below this. Use `value` field for ETH/BERA amount to send with native token swaps.

The `swapType` can be either:

- **EXACT_IN**: Specify the exact amount to swap in
- **EXACT_OUT**: Specify the exact amount to receive

### User Balances

User queries provide information about a user's pool positions and transaction history.

#### Get User Pool Balances

Retrieve a user's balances across all pools.

```graphql
query GetUserPoolBalances {
  userGetPoolBalances(
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
    chains: [BERACHAIN]
  ) {
    poolId
    tokenAddress
    totalBalance
    walletBalance
    tokenPrice
    chain
  }
}
```

**Example Response:**

```json
{
  "data": {
    "userGetPoolBalances": [
      {
        "poolId": "0x7f2b3b7fbd3226c5be438cde49a519f442ca2eda00020000000000000000067d",
        "tokenAddress": "0x7f2b3b7fbd3226c5be438cde49a519f442ca2eda",
        "totalBalance": "125.456789",
        "walletBalance": "125.456789",
        "tokenPrice": 1.134,
        "chain": "BERACHAIN"
      }
    ]
  }
}
```

**Interpretation:** This user holds 125.456789 BPT (pool tokens) from the WBERA-HONEY pool, all in their wallet (not staked). At $1.134 per BPT, their position is worth approximately $142.27. Use `totalBalance` for display (includes staked + wallet), `walletBalance` for available-to-withdraw amounts.

### Proof of Liquidity (PoL)

PoL queries provide access to Berachain's unique Proof of Liquidity system, including reward vaults, validators, and BGT emissions.

#### Get Reward Vaults

Retrieve reward vault information with filtering and pagination.

```graphql
query GetRewardVaults {
  polGetRewardVaults(chain: BERACHAIN, orderBy: apr, orderDirection: desc, first: 20) {
    vaults {
      vaultAddress
      stakingTokenAddress
      stakingToken {
        symbol
        name
      }
      dynamicData {
        tvl
        apr
        projectedApr
        activeIncentivesValueUsd
        bgtCapturePercentage
      }
      activeIncentives {
        tokenAddress
        token {
          symbol
        }
        incentiveRate
        incentiveRateUsd
        remainingAmount
      }
      metadata {
        name
        description
        logoURI
        protocolName
      }
    }
    pagination {
      totalCount
      totalPages
      currentPage
    }
  }
}
```

**Example Response:**

```json
{
  "data": {
    "polGetRewardVaults": {
      "vaults": [
        {
          "vaultAddress": "0xe8ed00b1b142e8d84ef773c4fccaa18682d5a401",
          "stakingTokenAddress": "0x7f2b3b7fbd3226c5be438cde49a519f442ca2eda",
          "stakingToken": {
            "symbol": "BPT",
            "name": "50WBERA-50HONEY"
          },
          "dynamicData": {
            "tvl": 1245678.90,
            "apr": 45.67,
            "projectedApr": 48.23,
            "activeIncentivesValueUsd": "125000.50",
            "bgtCapturePercentage": "12.5"
          },
          "activeIncentives": [
            {
              "tokenAddress": "0x1234...",
              "token": {
                "symbol": "REWARD"
              },
              "incentiveRate": "100000000000000000",
              "incentiveRateUsd": "1898.45",
              "remainingAmount": "50000000000000000000"
            }
          ],
          "metadata": {
            "name": "WBERA-HONEY Vault",
            "description": "Stake BPT to earn BGT and incentives",
            "logoURI": "https://...",
            "protocolName": "BEX"
          }
        }
      ],
      "pagination": {
        "totalCount": 189,
        "totalPages": 10,
        "currentPage": 0
      }
    }
  }
}
```

**Interpretation:** The top vault by APR holds $1.24M TVL and offers 45.67% APR (projected 48.23%). It captures 12.5% of all BGT emissions. The vault has $125k in active incentives, distributing REWARD tokens at $1,898.45/day with 50 tokens remaining. Stake the pool's BPT tokens to earn both BGT and incentive rewards.

Available ordering options: `apr`, `projectedApr`, `bgtCapturePercentage`, `activeIncentivesValueUsd`, `last24hBGTReceived`, `allTimeBGTReceived`

#### Get a Single Reward Vault

Retrieve detailed information about a specific reward vault.

```graphql
query GetRewardVault {
  polGetRewardVault(
    chain: BERACHAIN
    vaultAddress: "0xe8ed00b1b142e8d84ef773c4fccaa18682d5a401"
  ) {
    vaultAddress
    stakingTokenAddress
    stakingToken {
      name
      symbol
      decimals
    }
    dynamicData {
      tvl
      apr
      projectedApr
      bgtCapturePercentage
      activeIncentivesRateUsd
    }
    activeIncentives {
      tokenAddress
      token {
        symbol
        name
      }
      incentiveRate
      remainingAmount
    }
  }
}
```

**Example Response:**

```json
{
  "data": {
    "polGetRewardVault": {
      "vaultAddress": "0xe8ed00b1b142e8d84ef773c4fccaa18682d5a401",
      "stakingTokenAddress": "0x7f2b3b7fbd3226c5be438cde49a519f442ca2eda",
      "stakingToken": {
        "name": "50WBERA-50HONEY",
        "symbol": "BPT",
        "decimals": 18
      },
      "dynamicData": {
        "tvl": 1245678.90,
        "apr": 45.67,
        "projectedApr": 48.23,
        "bgtCapturePercentage": "12.5",
        "activeIncentivesRateUsd": "1898.45"
      },
      "activeIncentives": [
        {
          "tokenAddress": "0x1234...",
          "token": {
            "symbol": "REWARD",
            "name": "Reward Token"
          },
          "incentiveRate": "100000000000000000",
          "remainingAmount": "50000000000000000000"
        }
      ]
    }
  }
}
```

**Interpretation:** Detailed vault information shows it accepts 50WBERA-50HONEY BPT tokens (18 decimals) with $1.24M staked. Current APR is 45.67%, projected to reach 48.23%. The vault captures 12.5% of system BGT emissions and distributes $1,898.45/day in incentives (0.1 REWARD tokens/second, 50 tokens remaining).

#### Get Validators

Retrieve validator information including delegation statistics and BGT emissions.

```graphql
query GetValidators {
  polGetValidators(
    chain: BERACHAIN
    orderBy: activeBoostAmount
    orderDirection: desc
    first: 100
  ) {
    validators {
      id
      pubkey
      operator
      metadata {
        name
        description
        logoURI
        website
      }
      dynamicData {
        activeBoostAmount
        queuedBoostAmount
        stakedBeraAmount
        apy
        bgtCapturePercentage
        allTimeDistributedBGTAmount
        lastDayDistributedBGTAmount
        rewardRate
        boostApr
        commissionOnIncentives
      }
      rewardAllocationWeights {
        receiver
        percentageNumerator
      }
    }
    pagination {
      totalCount
    }
  }
}
```

**Example Response:**

```json
{
  "data": {
    "polGetValidators": {
      "validators": [
        {
          "id": "1",
          "pubkey": "0xa0c673180d97213c1c35fe3bf4e684dd3534baab235a106d1f71b9c8a37e4d37...",
          "operator": "0x1234567890abcdef...",
          "metadata": {
            "name": "Berachain Validator",
            "description": "Securing the network",
            "logoURI": "https://...",
            "website": "https://validator.example"
          },
          "dynamicData": {
            "activeBoostAmount": "125000000000000000000000",
            "queuedBoostAmount": "5000000000000000000000",
            "stakedBeraAmount": "1000000000000000000000",
            "apy": "18.5",
            "bgtCapturePercentage": "15.2",
            "allTimeDistributedBGTAmount": "450000000000000000000000",
            "lastDayDistributedBGTAmount": "1250000000000000000000",
            "rewardRate": "14467592592592592",
            "boostApr": 12.3,
            "commissionOnIncentives": 5
          },
          "rewardAllocationWeights": [
            {
              "receiver": "0xe8ed00b1b142e8d84ef773c4fccaa18682d5a401",
              "percentageNumerator": 5000
            },
            {
              "receiver": "0xabcd...",
              "percentageNumerator": 5000
            }
          ]
        }
      ],
      "pagination": {
        "totalCount": 66
      }
    }
  }
}
```

**Interpretation:** The top validator (by BGT boosts) has 125,000 BGT actively boosted and 5,000 queued, with 1,000 BERA self-staked. It offers 18.5% APY (including 12.3% from boosts) and captures 15.2% of system BGT. The validator distributed 450,000 BGT lifetime (1,250 yesterday) and takes 5% commission on incentives. Reward allocations split 50/50 between two vaults (5000/10000 = 50%).

Available ordering options: `apy`, `activeBoostAmount`, `stakedBeraAmount`, `bgtCapturePercentage`, `allTimeDistributedBGTAmount`, `boostApr`, `commissionOnIncentives`

#### Get User Validator Boosts

Retrieve a user's BGT boost positions across validators.

```graphql
query GetUserValidatorBoosts {
  polGetValidatorBoosts(
    chain: BERACHAIN
    userAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
  ) {
    boosts {
      validatorId
      validator {
        metadata {
          name
        }
      }
      activeBoostAmount
      queuedBoostAmount
      queuedDropBoostAmount
    }
    pagination {
      totalCount
    }
  }
}
```

**Example Response:**

```json
{
  "data": {
    "polGetValidatorBoosts": {
      "boosts": [
        {
          "validatorId": "1",
          "validator": {
            "metadata": {
              "name": "Berachain Validator"
            }
          },
          "activeBoostAmount": "5000000000000000000",
          "queuedBoostAmount": "2000000000000000000",
          "queuedDropBoostAmount": "0"
        },
        {
          "validatorId": "5",
          "validator": {
            "metadata": {
              "name": "Another Validator"
            }
          },
          "activeBoostAmount": "10000000000000000000",
          "queuedBoostAmount": "0",
          "queuedDropBoostAmount": "1000000000000000000"
        }
      ],
      "pagination": {
        "totalCount": 2
      }
    }
  }
}
```

**Interpretation:** This user has boosted two validators with their BGT. Validator #1 has 5 BGT actively boosting with 2 more BGT queued to activate. Validator #5 has 10 BGT active with 1 BGT queued to be removed. Boosts take time to activate/deactivate—use queued amounts to show pending changes.

#### Get User Vault Deposits

Retrieve a user's deposits across all reward vaults.

```graphql
query GetUserVaultDeposits {
  polGetUserVaultDeposits(
    chain: BERACHAIN
    userAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
    orderBy: amount
    orderDirection: desc
  ) {
    deposits {
      vaultAddress
      amount
      vault {
        stakingToken {
          symbol
          name
        }
        dynamicData {
          tvl
          apr
        }
      }
    }
    pagination {
      totalCount
    }
  }
}
```

**Example Response:**

```json
{
  "data": {
    "polGetUserVaultDeposits": {
      "deposits": [
        {
          "vaultAddress": "0xe8ed00b1b142e8d84ef773c4fccaa18682d5a401",
          "amount": "125456789000000000000",
          "vault": {
            "stakingToken": {
              "symbol": "BPT",
              "name": "50WBERA-50HONEY"
            },
            "dynamicData": {
              "tvl": 1245678.90,
              "apr": 45.67
            }
          }
        },
        {
          "vaultAddress": "0xabcd...",
          "amount": "50000000000000000000",
          "vault": {
            "stakingToken": {
              "symbol": "BPT",
              "name": "HONEY-USDC"
            },
            "dynamicData": {
              "tvl": 530000.00,
              "apr": 32.15
            }
          }
        }
      ],
      "pagination": {
        "totalCount": 2
      }
    }
  }
}
```

**Interpretation:** The user has deposits in two vaults. Their largest position is 125.456... BPT in the WBERA-HONEY vault (45.67% APR, $1.24M TVL). They also have 50 BPT in the HONEY-USDC vault (32.15% APR, $530k TVL). Amounts are in wei (divide by 10^18 for human-readable values).

#### Get Global PoL Information

Retrieve system-wide Proof of Liquidity statistics.

```graphql
query GetGlobalInfo {
  polGetGlobalInfo(chain: BERACHAIN) {
    baseRewardRate
    rewardRate
    totalWhitelistedRewardVaults
    totalBGTEarnedByValidators
    totalActiveIncentives
    totalActiveIncentivesValueUSD
    totalActiveRewardVaults
    totalStakedBeraAmount
    totalDistributedBGTAmount
    totalActiveBoostAmount
    totalValidatorsCount
    annualizedBGTEmission
    annualizedBGTInflation
  }
}
```

**Example Response:**

```json
{
  "data": {
    "polGetGlobalInfo": {
      "baseRewardRate": "3168808781402895",
      "rewardRate": "3168808781402895",
      "totalWhitelistedRewardVaults": 189,
      "totalBGTEarnedByValidators": "125000000000000000000000",
      "totalActiveIncentives": 47,
      "totalActiveIncentivesValueUSD": "2500000.00",
      "totalActiveRewardVaults": 156,
      "totalStakedBeraAmount": "253000000000000000000000000",
      "totalDistributedBGTAmount": "450000000000000000000000",
      "totalActiveBoostAmount": "1250000000000000000000000",
      "totalValidatorsCount": 66,
      "annualizedBGTEmission": "100000000000000000000000000",
      "annualizedBGTInflation": "8.5"
    }
  }
}
```

**Interpretation:** System-wide statistics show 189 whitelisted vaults (156 active) with $2.5M in incentives across 47 programs. Total of 253M BERA is staked, with 1.25M BGT actively boosting 66 validators. The system emits ~0.0000032 BGT/second (base rate), totaling 100M BGT/year for 8.5% inflation. Validators have earned 125k BGT, with 450k distributed to stakers.

### Protocol Metrics

Protocol queries provide aggregate statistics across the entire protocol.

#### Get Chain Metrics

Retrieve protocol-level metrics for a specific chain.

```graphql
query GetChainMetrics {
  protocolMetricsChain(chain: BERACHAIN) {
    totalLiquidity
    totalSwapVolume
    totalSwapFee
    poolCount
    swapVolume24h
    swapFee24h
    numLiquidityProviders
  }
}
```

**Example Response:**

```json
{
  "data": {
    "protocolMetricsChain": {
      "totalLiquidity": "125000000.00",
      "totalSwapVolume": "850000000.00",
      "totalSwapFee": "850000.00",
      "poolCount": "234",
      "swapVolume24h": "2500000.00",
      "swapFee24h": "2500.00",
      "numLiquidityProviders": "12500"
    }
  }
}
```

**Interpretation:** The Berachain DEX has $125M in total liquidity across 234 pools with 12,500 liquidity providers. All-time trading volume reached $850M, generating $850k in fees. Daily metrics show $2.5M swap volume producing $2,500 in fees, indicating healthy trading activity.

#### Get Aggregated Metrics

Retrieve aggregated metrics across all supported chains.

```graphql
query GetAggregatedMetrics {
  protocolMetricsAggregated(chains: [BERACHAIN]) {
    totalLiquidity
    totalSwapVolume
    poolCount
    swapVolume24h
    swapFee24h
    numLiquidityProviders
    chains {
      chainId
      totalLiquidity
      poolCount
    }
  }
}
```

**Example Response:**

```json
{
  "data": {
    "protocolMetricsAggregated": {
      "totalLiquidity": "125000000.00",
      "totalSwapVolume": "850000000.00",
      "poolCount": "234",
      "swapVolume24h": "2500000.00",
      "swapFee24h": "2500.00",
      "numLiquidityProviders": "12500",
      "chains": [
        {
          "chainId": "80084",
          "totalLiquidity": "125000000.00",
          "poolCount": "234"
        }
      ]
    }
  }
}
```

**Interpretation:** Aggregated metrics across all requested chains (currently just BERACHAIN with chainId 80084). Shows the same data as chain-specific query but allows multi-chain aggregation when additional chains are supported. Use this for displaying total protocol statistics.

## Common Patterns

### Pagination

Many queries support pagination with `first` and `skip` parameters. Paginated responses include a `pagination` object with `totalCount`, `totalPages`, `currentPage`, and `pageSize`.

### Filtering by Chain

Most queries require `chain: BERACHAIN`.

### Error Handling

Errors appear in the `errors` array:

```json
{
  "errors": [
    {
      "message": "Pool not found",
      "path": ["poolGetPool"]
    }
  ]
}
```

### Rate Limiting

The API is rate-limited and responses are cached. If you hit rate limits, wait before retrying. For high-volume applications, query data from contracts directly.

### Token Pricing

Tokens must be added to the [Berachain metadata repository](https://github.com/berachain/metadata) to have pricing data. Tokens are priced using:

1. **Pyth**: Real-time price feeds
2. **Coingecko**: Coingecko API
3. **BPT Pricing**: Pool tokens (TVL ÷ total shares)
4. **Swap-based Pricing**: Inferred from swaps with priced tokens

---

# API Schema Reference

## Query Reference

The Hub API exposes 50+ GraphQL queries:

### Pool Queries (9 queries)

| Query | Description | Key Parameters | Returns |
|-------|-------------|----------------|---------|
| `poolGetPool` | Get a single pool by ID | `id`, `chain`, `userAddress?` | `GqlPoolBase` |
| `poolGetPools` | Get multiple pools with filtering | `first?`, `orderBy?`, `where?` | `[GqlPoolBase]` |
| `poolGetPoolsCount` | Count pools matching filter | `where?` | `Int` |
| `poolGetEvents` | Get pool events (swaps, adds, removes) | `poolId`, `chain`, `range`, `typeIn?` | `[GqlPoolEvent]` |
| `poolGetSnapshots` | Get historical pool snapshots | `id`, `chain`, `range` | `[GqlPoolSnapshot]` |
| `poolGetFeaturedPools` | Get featured pools | `chains` | `[GqlPoolBase]` |
| `poolGetAggregatorPools` | Get pools for aggregators | `first?`, `orderBy?`, `where?` | `[GqlPoolBase]` |
| `poolGetUserBalances` | Get user balances for a pool | `chain`, `poolId`, `top?` | `[GqlUserBalance]` |

**Additional Pool Ordering Options:**
- `combinedApr` - Sort by combined APR
- `userbalanceUsd` - Sort by user balance (when user address provided)

### Token Queries (8 queries)

| Query | Description | Key Parameters | Returns |
|-------|-------------|----------------|---------|
| `tokenGetToken` | Get single token metadata | `address`, `chain` | `GqlToken` |
| `tokenGetTokens` | Get all allowed tokens | `chains`, `addressIn?` | `[GqlToken]` |
| `tokenGetCurrentPrice` | Get current price for a token | `address`, `chain` | `GqlTokenPrice` |
| `tokenGetCurrentPrices` | Get current prices for multiple tokens | `chains`, `addressIn?` | `[GqlTokenPrice]` |
| `tokenGetTokenDynamicData` | Get token market data | `address`, `chain` | `GqlTokenDynamicData` |
| `tokenGetTokensDynamicData` | Get market data for multiple tokens | `addresses`, `chain` | `[GqlTokenDynamicData]` |
| `tokenGetHistoricalPrices` | Get historical price data | `addresses`, `chain`, `range` | `[GqlHistoricalPrice]` |
| `tokenGetRelativePriceChartData` | Get relative price between two tokens | `tokenIn`, `tokenOut`, `chain`, `range` | `[GqlPriceData]` |

### Proof of Liquidity (PoL) Queries (18 queries)

| Query | Description | Key Parameters | Returns |
|-------|-------------|----------------|---------|
| `polGetGlobalInfo` | Get global PoL statistics | `chain` | `GqlGlobalInfo` |
| `polGetRewardVaults` | Get reward vaults with filtering | `chain`, `first?`, `orderBy?`, `where?` | `PaginatedRewardVaultsResponse` |
| `polGetRewardVault` | Get single reward vault | `chain`, `vaultAddress` | `GqlRewardVault` |
| `polGetRewardVaultSnapshots` | Get vault historical data | `chain`, `vaultAddress`, `range` | `[GqlSnapshot]` |
| `polGetActiveIncentives` | Get active incentives | `chain`, `first?`, `orderBy?` | `PaginatedRewardVaultIncentivesResponse` |
| `polGetValidators` | Get validators with filtering | `chain`, `first?`, `orderBy?`, `where?` | `PaginatedValidatorsResponse` |
| `polGetValidator` | Get single validator | `chain`, `validatorId` or `operator` | `GqlValidator` |
| `polGetValidatorBoosts` | Get user's validator boosts | `chain`, `userAddress`, `first?` | `PaginatedValidatorBoostsResponse` |
| `polGetUserVaultDeposits` | Get user's vault deposits | `chain`, `userAddress`, `first?`, `orderBy?` | `PaginatedUserVaultDepositsResponse` |
| `polGetDefaultRewardAllocations` | Get default reward allocations | `chain` | `GqlDefaultRewardAllocation` |
| `polGetValidatorBlockUptimes` | Get validator uptime data | `chain`, `validatorId` | `[GqlBlockUptime]` |
| `polGetValidatorBoostDelay` | Get boost activation delay | - | `GqlValidatorBoostDelay` |
| `polGetValidatorCommissionDelay` | Get commission change delay | - | `GqlValidatorCommissionDelay` |
| `polGetTopVaultDeposits` | Get top depositors for a vault | `chain`, `vaultAddress`, `top?` | `[GqlVaultDeposit]` |
| `polGetVaultDurations` | Get stake duration options | - | `GqlVaultDurations` |
| `polGetSWberaVaultMetadata` | Get staked WBERA vault metadata | `chain`, `resolution?` | `GqlSWberaVaultMetadata` |
| `polGetSWberaVaultSnapshots` | Get staked WBERA vault snapshots | `chain`, `range` | `[GqlSnapshot]` |
| `polGetStakeBeraVaultEarningsByOwner` | Get vault earnings for an owner | `owner` | `GqlStakeBeraVaultEarnings` |
| `polGetStakeBeraVaultEventsByOwner` | Get vault events for an owner | `owner` | `[GqlVaultEvent]` |

**Reward Vault Ordering Options:**
- `apr` - Sort by APR
- `apy` - Sort by APY
- `projectedApr` - Sort by projected APR
- `bgtCapturePercentage` - Sort by BGT capture percentage
- `activeIncentivesValueUsd` - Sort by total incentive value
- `activeIncentivesRateUsd` - Sort by incentive rate
- `allTimeBGTReceived` - Sort by total BGT received
- `last24hBGTReceived` - Sort by recent BGT

**Validator Ordering Options:**
- `activeBoostAmount` - Sort by active BGT boosts
- `queuedBoostAmount` - Sort by queued boosts
- `queuedDropBoostAmount` - Sort by queued drops
- `stakedBeraAmount` - Sort by staked BERA
- `apy` - Sort by APY
- `bgtCapturePercentage` - Sort by BGT capture percentage
- `allTimeDistributedBGTAmount` - Sort by total BGT distributed
- `allTimeEarnedBGTAmount` - Sort by total BGT earned
- `lastDayDistributedBGTAmount` - Sort by recent BGT distributed
- `lastDayEarnedBGTAmount` - Sort by recent BGT earned
- `boostApr` - Sort by boost APR
- `commissionOnIncentives` - Sort by commission rate
- `rewardRate` - Sort by reward rate
- `usersActiveBoostCount` - Sort by number of active boosters
- `usersQueuedBoostCount` - Sort by number of queued boosters

### Smart Order Router (SOR) Queries (2 queries)

| Query | Description | Key Parameters | Returns |
|-------|-------------|----------------|---------|
| `sorGetSwapPaths` | Get optimal swap route (V2) | `chain`, `tokenIn`, `tokenOut`, `swapType`, `swapAmount`, `callDataInput?` | `GqlSorGetSwapPaths` |
| `sorGetSwaps` | Get swap quote (legacy + V2) | `chain`, `tokenIn`, `tokenOut`, `swapType`, `swapAmount`, `swapOptions?` | `GqlSorGetSwapsResponse` |

**SOR Response Includes:**
- `routes[]` - Array of route options with individual hops
- `returnAmount` - Expected output amount
- `effectivePrice` - Effective exchange rate
- `priceImpact` - Price impact percentage
- `callData` - Transaction data for execution (optional)

### User Queries (4 queries)

| Query | Description | Key Parameters | Returns |
|-------|-------------|----------------|---------|
| `userGetPoolBalances` | Get user's pool balances | `address`, `chains` | `[GqlUserPoolBalance]` |
| `userGetPoolJoinExits` | Get user's add/remove history (deprecated) | `address`, `chain`, `first?` | `[GqlJoinExit]` |
| `userGetSwaps` | Get user's swap history (deprecated) | `address`, `chain`, `first?` | `[GqlSwap]` |
| `userGetTopBGTBalance` | Get users with most BGT | `chain` | `[GqlUserBalance]` |

::: info
`userGetPoolJoinExits` and `userGetSwaps` are deprecated. Use `poolGetEvents` with appropriate filters instead.
:::

### Protocol Metrics Queries (2 queries)

| Query | Description | Key Parameters | Returns |
|-------|-------------|----------------|---------|
| `protocolMetricsChain` | Get metrics for a chain | `chain` | `GqlProtocolMetricsChain` |
| `protocolMetricsAggregated` | Get aggregated metrics | `chains` | `GqlProtocolMetricsAggregated` |

**Protocol Metrics Include:**
- `totalLiquidity` - Total value locked across all pools
- `totalSwapVolume` - All-time swap volume
- `totalSwapFee` - All-time fees collected
- `swapVolume24h` - 24-hour swap volume
- `swapFee24h` - 24-hour fees collected
- `poolCount` - Number of active pools
- `numLiquidityProviders` - Number of unique LPs

### Blocks Queries (4 queries)

| Query | Description | Returns |
|-------|-------------|---------|
| `blocksGetAverageBlockTime` | Get average block time | `Float` (seconds) |
| `blocksGetBlocksPerDay` | Get blocks per day | `Float` |
| `blocksGetBlocksPerSecond` | Get blocks per second | `Float` |
| `blocksGetBlocksPerYear` | Get blocks per year | `Float` |

### Additional Queries (4 queries)

| Query | Description | Key Parameters | Returns |
|-------|-------------|----------------|---------|
| `latestSyncedBlocks` | Get latest synced block numbers | - | `GqlLatestSyncedBlocks` |
| `hooks` | Get pool hooks list | `chain` | `[GqlHook]` |
| `contentGetNewsItems` | Get news items | `chain` | `[GqlNewsItem]` |
| `bendVaults` | Get Bend protocol vaults | - | `BendVaultsResponse` |

## Enum Reference

### Pool Types (GqlPoolType)

- `WEIGHTED` - Weighted pools (e.g., 80/20)
- `COMPOSABLE_STABLE` - Stable pools supporting nested tokens
- `STABLE` - Stable pools for assets trading near parity
- `COW_AMM` - CoW AMM pools
- `LIQUIDITY_BOOTSTRAPPING` - Token launch pools
- `GYRO`, `GYRO3`, `GYROE` - Gyroscope pools
- `FX` - Foreign exchange pools
- `META_STABLE`, `PHANTOM_STABLE`, `ELEMENT`, `INVESTMENT`, `UNKNOWN`

### Data Range Options

**GqlPoolEventsDataRange:**
- `SEVEN_DAYS` - 7 days of event history
- `THIRTY_DAYS` - 30 days of event history
- `NINETY_DAYS` - 90 days of event history

**GqlTokenChartDataRange:**
- `SEVEN_DAY` - 7 days of price history
- `THIRTY_DAY` - 30 days of price history

**GqlPoolSnapshotDataRange:**
- `THIRTY_DAYS`, `NINETY_DAYS`, `ONE_HUNDRED_EIGHTY_DAYS`, `ONE_YEAR`, `ALL_TIME`

### Event Types (GqlPoolEventType)

- `SWAP` - Token swap events
- `ADD` - Add liquidity events
- `REMOVE` - Remove liquidity events

## Related Resources

- [Berachain Documentation](https://docs.berachain.com)
- [Hub Smart Contracts](https://docs.berachain.com/developers/contracts)
- [Proof of Liquidity](https://docs.berachain.com/learn/what-is-proof-of-liquidity)
- [Token Metadata Repository](https://github.com/berachain/metadata)
- [GraphQL Playground](https://api.berachain.com)
