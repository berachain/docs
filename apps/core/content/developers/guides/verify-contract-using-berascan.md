---
head:
  - - meta
    - property: og:title
      content: Verify Contract Using Berascan
  - - meta
    - name: description
      content: Learn How to Verify Your Smart Contract Using Berascan
  - - meta
    - property: og:description
      content: Learn How to Verify Your Smart Contract Using Berascan
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Verify Contract Using Berascan

This guide will walk you through the process of verifying an already deployed ERC-20 contract using Berascan that has not been verified yet.

## Prerequisites

- An already deployed ERC-20 contract
- Access to the contract's source code
- Contract address on Berachain

:::tip Need to deploy an ERC-20 first?
If you haven't deployed an ERC-20 contract yet, please refer to our [Create ERC-20 Contract Using Foundry](/developers/guides/create-erc20-contract-using-foundry) guide first.
:::

## How to Verify Your Contract

### Step 1 - Navigate to Your Contract

Go to your contract's page on Berascan using your contract address. You can find this by searching for your contract address in the search bar.

### Step 2 - Click "Verify and Publish"

On your contract page, look for the **"Verify and Publish"** link and click it.

![Verify Contract on Berascan](/assets/verify-contract-berascan.png)

This will take you to the contract verification page at [https://testnet.berascan.com/verifyContract](https://testnet.berascan.com/verifyContract).

### Step 3 - Enter Contract Details

On the verification page, you'll see a form to enter your contract details:

1. **Contract Address**: Enter your deployed contract address (pre-filled in the example)
2. **Compiler Type**: Select "Solidity (Single file)" for flattened contracts
3. **Compiler Version**: Choose the exact compiler version you used for deployment (e.g., v0.8.28+commit.7893614a)
4. **Open Source License Type**: Select the appropriate license (e.g., MIT License)
5. **Terms of Service**: Check the box to agree to the terms of service
6. **Continue**: Click the "Continue" button to proceed to the next step

![Contract Verification Form](/assets/contract-verification-steps.png)

:::tip Using Flattened Contract Files
For contracts with multiple files or dependencies, you can use a flattened contract file with a single file upload. This combines all dependencies into one file, making verification easier.
:::

### Step 4 - Upload Contract Source Code

After clicking "Continue", you'll reach the "Verify & Publish" stage where you upload your contract source code:

1. **Contract Details**: The page will display your contract address, compiler type (SINGLE FILE / CONCATENATED METHOD), and compiler version
2. **Source Code**: Paste your flattened contract source code in the text area
3. **Advanced Configuration**: Optionally configure optimization settings, runs, and EVM version
4. **Submit**: Click "Verify & Publish" to submit your contract for verification

![Contract Source Code Upload](/assets/contract-verification-step4.png)

:::info Contract Compilation Notes

- If your contract compiles correctly in Remix, it should also compile correctly here
- There's a timeout of up to 45 seconds for each contract compiled
- Limited support is available for contracts created by another contract
  :::

### Step 5 - Wait for Verification

After submission, Berascan will verify your contract. This process usually takes just a few seconds. Once verified, your contract will be publicly readable and you'll be able to interact with it directly through Berascan's interface.

![Contract Verification Success](/assets/contract-verification-success.png)

## Troubleshooting

If verification fails, check:

- Compiler version matches the one used for deployment
- Source code is complete and unmodified
- Constructor arguments are correct
- Contract address is valid

For additional help, refer to Berascan's verification documentation or contact their support team.
