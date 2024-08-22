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

To start using Berachain, join the testnet below.

### Add the network in One Click

Click the button below to add the network to your MetaMask in one click.

<ClientOnly>
  <AddNetwork
    :chainId="config.testnet.chainId"
    :chainName="config.testnet.chainName"
    :nativeCurrencyName="config.testnet.currencyName"
    :nativeCurrencySymbol="config.testnet.currencySymbol"
    :nativeCurrencyDecimals="config.testnet.decimals"
    :rpcUrl="config.testnet.rpcUrl"
    :blockExplorerUrl="config.testnet.dapps.beratrail.url"
  />
</ClientOnly>

### Add the Network Manually

To add the network manually, insert the network details below into your wallet of choice:

| Key                | Value                                                                                   |
| ------------------ | --------------------------------------------------------------------------------------- |
| Network            | {{config.testnet.chainName}}                                                            |
| RPC URL            | <ClientOnly><CopyToClipboard :text="config.testnet.rpcUrl" /></ClientOnly>              |
| Chain ID           | <ClientOnly><CopyToClipboard :text="config.testnet.chainId" /></ClientOnly>             |
| Currency symbol    | <ClientOnly><CopyToClipboard :text="config.testnet.currencySymbol" /></ClientOnly>      |
| Block Explorer URL | <ClientOnly><CopyToClipboard :text="config.testnet.dapps.beratrail.url" /></ClientOnly> |

### RPC Providers

See our [RPC partners](/developers/developer-tools#rpc-providers) under Developer Tools.

:::tip
**NOTE:** Berachain WebSocket connections are available through our [RPC partners](/developers/developer-tools#rpc-providers)
:::

### What is a Testnet?

Testnet is an additional blockchain network that runs separately from the Mainnet blockchain and is a test environment that has no economic value associated with the tokens in it

### What is a Testnet Used for?

- Creating your test address and getting test funds
- Developing applications to ensure they work properly prior to deploying them on mainnet
- Testing applications against new upgrades to the Berachain network prior to them being released on mainnet

## Mainnet

Berachain Mainnet is _NOT_ currently live and its official date is still pending.
