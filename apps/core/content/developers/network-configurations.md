---
head:
  - - meta
    - property: og:title
      content: Connecting to Berachain
  - - meta
    - name: description
      content: Berachain API Node Requests
  - - meta
    - property: og:description
      content: Berachain API Node Requests
---

<script setup>
  import config from '@berachain/config/constants.json';
  import AddNetwork from '@berachain/ui/AddNetwork';
  import CopyToClipboard from '@berachain/ui/CopyToClipboard';
</script>

# Connecting to Berachain

## Mainnet Network Configuration

Click the button below to add the network to your MetaMask.

<ClientOnly>
  <AddNetwork
    :chainId="config.mainnet.chainId"
    :chainName="config.mainnet.chainName"
    :nativeCurrencyName="config.mainnet.currencyName"
    :nativeCurrencySymbol="config.mainnet.currencySymbol"
    :nativeCurrencyDecimals="config.mainnet.decimals"
    :rpcUrl="config.mainnet.rpcUrl"
    :blockExplorerUrl="config.websites.berascan.url"
  />
</ClientOnly>

### Mainnet Connection Parameters

To add the network manually, enter the network details below into your wallet of choice:

| Key                | Value                                                                              |
| ------------------ | ---------------------------------------------------------------------------------- |
| Network Name       | {{config.mainnet.chainName}}                                                       |
| RPC URL            | <ClientOnly><CopyToClipboard :text="config.mainnet.rpcUrl" /></ClientOnly>         |
| Chain ID           | <ClientOnly><CopyToClipboard :text="config.mainnet.chainId" /></ClientOnly>        |
| Currency symbol    | <ClientOnly><CopyToClipboard :text="config.mainnet.currencySymbol" /></ClientOnly> |
| Block Explorer URL | <ClientOnly><CopyToClipboard :text="config.websites.berascan.url" /></ClientOnly>  |

### Mainnet RPC Providers

See our [RPC partners](/developers/developer-tools#rpc-providers) under Developer Tools.

## Bepolia Testnet Network Configuration

<ClientOnly>
  <AddNetwork
    :chainId="config.bepolia.chainId"
    :chainName="config.bepolia.chainName"
    :nativeCurrencyName="config.bepolia.currencyName"
    :nativeCurrencySymbol="config.bepolia.currencySymbol"
    :nativeCurrencyDecimals="config.bepolia.decimals"
    :rpcUrl="config.bepolia.rpcUrl"
    :blockExplorerUrl="config.websites.berascanBepolia.url"
    :testnet="true"
  />
</ClientOnly>

### What is the Bepolia Testnet?

A testnet is an additional blockchain network that runs separately from the mainnet blockchain and serves as a test environment, with no economic value associated with its tokens.

With the testnet, you can:

- Use the faucet to obtain testnet $BERA.
- Develop applications and contracts to ensure they work properly prior to deploying them on mainnet. The complete Proof of Liquidity stack is available on testnet.
- Experiment with proposed upgrades to mainnet.

### Testnet Connection Parameters

| Key             | Value                                                                              |
| --------------- | ---------------------------------------------------------------------------------- |
| Network         | {{config.bepolia.chainName}}                                                       |
| RPC URL         | <ClientOnly><CopyToClipboard :text="config.bepolia.rpcUrl" /></ClientOnly>         |
| Chain ID        | <ClientOnly><CopyToClipboard :text="config.bepolia.chainId" /></ClientOnly>        |
| Currency symbol | <ClientOnly><CopyToClipboard :text="config.bepolia.currencySymbol" /></ClientOnly> |

### Bepolia Testnet dApps

<template v-for="(item) in config['bepolia']['dapps']">
  <table>
    <thead><tr><th>Name</th><th>URL</th></tr></thead>
    <tbody>
          <tr>
            <td><a :href="item.url">{{ item.name }}</a></td>
            <td>{{ item.url }}</td>
          </tr>
    </tbody>
  </table>
</template>
