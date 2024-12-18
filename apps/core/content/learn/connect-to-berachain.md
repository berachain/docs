---
head:
  - - meta
    - property: og:title
      content: How to Connect a Wallet With Berachain
  - - meta
    - name: description
      content: Learn to quickly configure your crypto wallet With Berachain
    - property: og:description
      content: Learn to quickly configure your crypto wallet With Berachain
---

<script setup>
  import config from '@berachain/config/constants.json';
  import AddNetwork from '@berachain/ui/AddNetwork';
  import CopyToClipboard from '@berachain/ui/CopyToClipboard';
</script>

# How To Connect A Wallet With Berachain 🔌

Blockchain wallets are what allow you, and only you, to access your assets on Berachain. Wallets enable this by allowing you to create and store your private keys, which can then be used to prove that you can access the assets in the wallet to do things such as trade tokens, buy NFTs, play games, and more.

## Berachain Mainnet RPC 🌐

Copy and paste these values into any wallet that supports importing RPCs.

Quickly add Berachain's network to your wallet with one-click.

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

| Key                | Value                                                                                   |
| ------------------ | --------------------------------------------------------------------------------------- |
| Network            | <ClientOnly><CopyToClipboard :text="config.mainnet.chainName" /></ClientOnly>           |
| RPC URL            | <ClientOnly><CopyToClipboard :text="config.mainnet.rpcUrl" /></ClientOnly>              |
| Chain ID           | <ClientOnly><CopyToClipboard :text="'' + config.mainnet.chainId + ''" /></ClientOnly>   |
| Currency symbol    | <ClientOnly><CopyToClipboard :text="config.mainnet.currencySymbol" /></ClientOnly>      |
| Block explorer URL | <ClientOnly><CopyToClipboard :text="config.mainnet.dapps.berascan.url" /></ClientOnly> |

## Supported Wallets 👛

Currently, any [EVM-based wallet](https://ethereum.org/en/wallets/find-wallet/) that allows `RPC importing` can be configured to work with Berachain.

Compatible Wallets:

- [MetaMask](https://metamask.io)
- [Coinbase Wallet](https://www.coinbase.com/wallet)
- [Brave Wallet](https://brave.com/wallet/)
- [Frame](https://frame.sh)

## How To Setup A MetaMask Wallet With Berachain 🦊

This will walk you through the steps of setting up and configure a MetaMask wallet with Berachain.

**NOTE:** Recommended that you set this up through Chrome.

### Step 1 - Install MetaMask

Go to Metamask's [website](https://metamask.io/) and click to download the browser extension for your browser of choice. Make sure the extension is being offered by `metamask.io`.

![Metamask Chrome Store](/assets/metamask-chrome-store.png)

### Step 2 - Create Your Wallet in MetaMask

Once MetaMask finishes installing as a Chrome extension, the initial prompt still show up. Click the `Create a new wallet` button to start the process.

![Metamask Get Started](/assets/metamask-get-started.png)

This will ask you to first set a password. This is the password you will enter when you open up the MetaMask extension:

![Metamask Create Password](/assets/metamask-create-password.png)

Next, follow the instructions to secure your wallet phrase. This step is very important as the wallet phrase is what is used to prove that you own the assets in your wallet.

![Metamask Recovery Phrase](/assets/metamask-recovery-phrase.png)

🎉 Congratulations! You've setup your MetaMask wallet!

## Add Berachain Network To Your Wallet 🐻

Wallets can connect to various blockchains, with MetaMask setting Ethereum as its default blockchain. In order to connect to Berachain, we'll need to add the network to MetaMask and select it.

### Add Berachain Network in One Click

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

### Add Berachain Network Manually

To add the network manually, click the drop-down in the top-left of MetaMask.

![Metamask Add Network Step 1](/assets/metamask-add-network-01.png)

When the modal appears, click `Add network` button.

![Metamask Add Network Step 2](/assets/metamask-add-network-02.png)

At the bottom of the existing list, click `Add network manually`.

![Metamask Add Network Step 3](/assets/metamask-add-network-03.png)

Enter the following details into MetaMask to configure the network and connect to Berachain Testnet.

Once the data is entered correctly, click `Save`.

![Metamask Add Network Step 4](/assets/metamask-add-network-04.png)

After saving the network configuration, you should be connected to the Berachain Testnet!

![Metamask Testnet](/assets/metamask-testnet.png)
