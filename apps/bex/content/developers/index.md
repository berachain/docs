---
head:
  - - meta
    - property: og:title
      content: Deployed Contracts
  - - meta
    - name: description
      content: Registry of deployed BEX contract addresses.
  - - meta
    - property: og:description
      content: Registry of deployed BEX contract addresses.
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# BEX Deployed Contracts

:::warning ⚠️ Security Notice

On January 21st, 2025, Balancer disclosed a long-standing vulnerability in their V2 Vault implementation. BEX incorporates contract logic from Balancer V2 and shares the same vulnerability. We advise users creating new pools to assess the vulnerability and exercise additional caution, particularly when including **untrusted or newly-created tokens**.

**Funds currently deposited in BEX are safe, and no action from LPs is needed.** The issue only (potentially) affects tokens that are not live on-chain today. Frontend warnings are displayed on BEX for potentially vulnerable tokens.

Future plans include integrating the Balancer V3 codebase, which mitigates this vulnerability and is cross-compatible with current BEX pools.

For more information, see the [Balancer disclosure](https://forum.balancer.fi/t/balancer-v2-token-frontrun-vulnerability-disclosure/6309).
:::

The following is a list of contract address in order to interact with Berachain BEX.

> A full list of Contract ABIs can be found at https://github.com/berachain/doc-abis

## Mainnet Contracts

<table>
  <thead><tr><th>Name</th><th>Bepolia</th><th>ABI</th></tr></thead>
  <tbody>
    <template v-for="(contract, name) in config.contracts.bex">
      <template v-if="contract['mainnet-address']">
        <tr>
          <td><template v-if="contract['docsUrl']"><a :href="contract.docsUrl">{{ contract.name }}</a></template><template v-else><b>{{ contract.name }}</b></template></td>
          <td>
            <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + contract['mainnet-address']">{{contract['mainnet-address']}}</a>
          </td> 
          <td><template v-if="contract?.abi"><a :href="contract.abi">ABI</a></template></td>
        </tr>
      </template>
    </template>
  </tbody>
</table>

## Bepolia Testnet Contracts

<table>
  <thead><tr><th>Name</th><th>Bepolia</th><th>ABI</th></tr></thead>
  <tbody>
    <template v-for="(contract, name) in config.contracts.bex">
      <template v-if="contract['bepolia-address']">
        <tr>
          <td><template v-if="contract['docsUrl']"><a :href="contract.docsUrl">{{ contract.name }}</a></template><template v-else><b>{{ contract.name }}</b></template></td>
          <td>
            <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + contract['bepolia-address']">{{contract['bepolia-address']}}</a>
          </td> 
          <td><template v-if="contract?.abi"><a :href="contract.abi">ABI</a></template></td>
        </tr>
      </template>
    </template>
  </tbody>
</table>
