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

### Step 3 - Follow Verification Steps

Once on the verification page, follow the steps to:

1. **Select Compiler Type**: Choose the compiler version you used to deploy your contract
2. **Upload Source Code**: Paste your contract source code or upload the file
3. **Configure Constructor Arguments**: If your contract has constructor parameters, provide them
4. **Submit for Verification**: Review and submit your verification request

### Step 4 - Wait for Verification

After submission, Berascan will verify your contract. This process usually takes a few minutes. Once verified, your contract will be publicly readable and you'll be able to interact with it directly through Berascan's interface.

## Benefits of Contract Verification

- **Transparency**: Your contract source code becomes publicly available
- **Trust**: Users can verify the contract's functionality before interacting
- **Debugging**: Easier to debug issues with readable source code
- **Integration**: Other developers can easily understand and integrate with your contract

## Troubleshooting

If verification fails, check:

- Compiler version matches the one used for deployment
- Source code is complete and unmodified
- Constructor arguments are correct
- Contract address is valid

For additional help, refer to Berascan's verification documentation or contact their support team.
