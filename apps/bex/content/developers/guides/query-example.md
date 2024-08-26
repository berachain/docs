---
head:
  - - meta
    - property: og:title
      content: Query contract example
  - - meta
    - name: description
      content: Example showing use of the CrocQuery contract
  - - meta
    - property: og:description
      content: Example showing use of the CrocQuery contract
---

<script setup>
    import config from '@berachain/config/constants.json';
</script>

# CrocQuery Example

Say for example you wanted to query the price of `WBERA` relative to `HONEY` in this pool: <a :href="config.testnet.dapps.bex.url + 'pool/0xd28d852cbcc68dcec922f6d5c7a8185dbaa104b7'">{{config.testnet.dapps.bex.url}}pool/0xd28d852cbcc68dcec922f6d5c7a8185dbaa104b7</a>.

Let's walk through the steps to accomplish this using the [CrocQuery](/developers/query-contracts/query) contract, using [Foundry's](https://book.getfoundry.sh/getting-started/installation) `cast` CLI. Specifically, we will be calling the `queryPrice` method.

### 1. Get the `poolIdx`

```bash-vue
cast call --rpc-url {{config.testnet.rpcUrl}} 0xd28d852cbcc68DCEC922f6d5C7a8185dBaa104B7 "poolType()"

# [Example Output]:
# 0x0000000000000000000000000000000000000000000000000000000000008ca0
# (Equals 36000 in decimals)
```

### 2. Get `base` and `quote` tokens (shortened to the 20-byte address standard)

```bash-vue
cast call --rpc-url {{config.testnet.rpcUrl}} 0xd28d852cbcc68DCEC922f6d5C7a8185dBaa104B7 "baseToken()" | sed 's/^0x//' | sed 's/^.\{24\}/0x/'

# [Example Output]:
# 0x0e4aaf1351de4c0264c5c7056ef3777b41bd8e03
# (HONEY)
```

```bash-vue
cast call --rpc-url {{config.testnet.rpcUrl}} 0xd28d852cbcc68DCEC922f6d5C7a8185dBaa104B7 "quoteToken()" | sed 's/^0x//' | sed 's/^.\{24\}/0x/'

# [Example Output]:
# 0x7507c1dc16935b82698e4c63f2746a2fcf994df8
# (WBERA)
```

### 3. Call queryPrice on CrocQuery contract

Now, we have the arguments we need to call the `queryPrice` function:

```bash-vue
cast call --rpc-url {{config.testnet.rpcUrl}} 0x8685CE9Db06D40CBa73e3d09e6868FE476B5dC89 'queryPrice(address,address,uint256)' 0x0e4aaf1351de4c0264c5c7056ef3777b41bd8e03 0x7507c1dc16935b82698e4c63f2746a2fcf994df8 36000

# [Example Output]:
# 0x00000000000000000000000000000000000000000000000791d612f8eb363f2a
# (Equals 139635816156789882666 in decimals)
```

This returns the square root price which we may wish to decode to a more human-readable format.

### 4. Decode the Q64.64 square root price

Any appropriate method could be used to decode the Q64.64 square root price. The general formula is as follows:

```javascript
const sq = x / 2 ** 64;
const price = sq * sq;
```

where `x` is the Q64.64 square root price.

Thus, in our example, we have:

sq = `139635816156789882666 / 2 ** 64 = 7.56967276`

price = `7.56967276 * 7.56967276 = 57.3 HONEY/WBERA`
