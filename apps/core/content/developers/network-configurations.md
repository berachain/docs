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

# Connecting to Berachain Mainnet

To start using Berachain, join the mainnet below.

## Add the network in One Click

Click the button below to add the network to your MetaMask in one click.

<ClientOnly>
  <AddNetwork
    :chainId="config.mainnet.chainId"
    :chainName="config.mainnet.chainName"
    :nativeCurrencyName="config.mainnet.currencyName"
    :nativeCurrencySymbol="config.mainnet.currencySymbol"
    :nativeCurrencyDecimals="config.mainnet.decimals"
    :rpcUrl="config.mainnet.rpcUrl"
    :blockExplorerUrl="config.mainnet.dapps.berascan.url"
  />
</ClientOnly>

## Add the Network Manually

To add the network manually, insert the network details below into your wallet of choice:

| Key                | Value                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------- |
| Network            | {{config.mainnet.chainName}}                                                           |
| RPC URL            | <ClientOnly><CopyToClipboard :text="config.mainnet.rpcUrl" /></ClientOnly>             |
| Chain ID           | <ClientOnly><CopyToClipboard :text="config.mainnet.chainId" /></ClientOnly>            |
| Currency symbol    | <ClientOnly><CopyToClipboard :text="config.mainnet.currencySymbol" /></ClientOnly>     |
| Block Explorer URL | <ClientOnly><CopyToClipboard :text="config.mainnet.dapps.berascan.url" /></ClientOnly> |

## RPC Providers

See our [RPC partners](/developers/developer-tools#rpc-providers) under Developer Tools.

---

# Connecting to Berachain Testnet

Berachain testnets Artio and Bartio are up, but deprecated. We will publish a new testnet to match mainnet in February 2025.

<!--

### What is a Testnet?

Testnet is an additional blockchain network that runs separately from the Mainnet blockchain and is a test environment that has no economic value associated with the tokens in it

### What is a Testnet Used for?

- Creating your test address and getting test funds
- Developing applications to ensure they work properly prior to deploying them on mainnet
- Testing applications against new upgrades to the Berachain network prior to them being released on mainnet
 -->
