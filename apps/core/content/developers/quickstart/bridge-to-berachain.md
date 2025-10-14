---
head:
  - - meta
    - property: og:title
      content: Bridge to Berachain
  - - meta
    - name: description
      content: Learn How to Bridge Tokens to Berachain Using LayerZero
  - - meta
    - property: og:description
      content: Learn How to Bridge Tokens to Berachain Using LayerZero
---

# Bridge to Berachain

## Overview

Berachain has multiple bridging options and uses LayerZero as its canonical bridge infrastructure for cross-chain token transfers . Using LayerZero, there are two ways to enable bridging between a source chain and Berachain.

## LayerZero Bridging Deployment Options

### 1 - Manual Token Deployment

Token teams can deploy and configure their own bridge contracts using LayerZero's documentation and tooling. This involves deploying your own contract on the source and destination chain, choosing and configuring DVNs (Data Verification Networks), and executors.

::: warning
This process requires ensuring your contract is audited before deployment.
:::

After successful deployment, assets need to be listed on bridge interfaces including Stargate and the Berachain Token Bridge, with Stargate requiring additional whitelisting procedures.

### 2 - Permissionless Deployment

Permissionless deployment allows for easy utilization of the Deploy UI and leveraged the audited [WAB contract](Link to layerzero docs) to deploy ERC20 tokens from Ethereum to Beracahin.

*Other WAB exist on other chains as well

![Berachain Wrapped Asset Bridge](/assets/berachain-wrapped-asset-bridge.png)

...

## How WAB Works

The Wrapped Asset Bridge (WAB) creates wrapped versions of tokens on Berachain that represent locked assets on Ethereum. This enables seamless cross-chain transfers without requiring token issuers to deploy custom contracts.

### Supported Assets

The WAB supports bridging ERC20 tokens and native gas tokens like ETH from Ethereum to Berachain. When bridging tokens, the system maintains the original token's decimal precision - for example, USDC retains its 6 decimal places while WETH maintains 18 decimals.

### Bridging Process

When you bridge tokens using the WAB, the process follows a simple lock-and-mint mechanism:

1. **Lock & Mint** - Your original tokens are locked in a secure contract on Ethereum, and an equivalent amount of wrapped tokens are minted on Berachain
2. **Burn & Unlock** - To return tokens to Ethereum, the wrapped tokens on Berachain are burned, which triggers the release of the original tokens from the lock contract
3. **Fee estimation** - The system automatically calculates bridge fees before each transaction, ensuring you have sufficient funds to complete the transfer

### Security Features

The WAB implements several security measures to protect user funds. All bridge contracts are verified on their respective block explorers for transparency. The system uses trusted remote addresses to establish secure communication channels between Ethereum and Berachain. Access to critical bridge functions is controlled by Berachain's multisig, providing an additional layer of security against unauthorized operations.

For detailed implementation, deployment steps, and advanced configuration, see the [WAB technical documentation](https://github.com/berachain/bera-wrapped-asset-bridge/blob/main/README.md).

For a practical implementation guide, see the [LayerZero OFT guide](/developers/guides/community-guides#bridging) in the community guides section.

## Stargate Listing

To list your OFT on the Stargate frontend, ensure the following requirements are met:

1. **Contracts are deployed & verified** - Pathways are wired and you have contract addresses for all relevant chains. If deployed on Solana, use the OFT store address.

2. **Enforced options are set** - All pathways must have enforced options configured.

3. **Price feed availability** - There must be a price feed for your token(s) on CoinGecko or CoinMarketCap. The token(s) cannot be listed without price feeds.

::: warning
The token(s) cannot be listed without meeting all the above requirements.
:::

4. **Submit the form** - Once the above is complete, fill out the [Stargate listing form](http://tinyurl.com/stargate-oftlisting).

::: tip
Stargate forms must be submitted by midnight Friday UTC for processing.
:::

## Which Method to Use

The WAB (Wrapped Asset Bridge) is the easiest and fastest way to get tokens from Ethereum to Berachain. Token issuers should only consider the manual deployment approach if they need specific customization or control over their bridge contracts. The permissionless method results in assets being controlled by Berachain's multisig, limiting customization options.
