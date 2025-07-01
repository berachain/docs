---
head:
  - - meta
    - property: og:title
      content: EIP-5792 MetaMask Implementation Guide
  - - meta
    - name: description
      content: Step-by-step guide to implementing EIP-5792 with MetaMask on Berachain
  - - meta
    - property: og:description
      content: Step-by-step guide to implementing EIP-5792 with MetaMask on Berachain
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# EIP-5792 MetaMask Implementation Guide

This guide walks you through implementing EIP-5792 with MetaMask on Berachain, providing hands-on examples and practical code snippets.

:::info
**Prerequisites**: 
- MetaMask extension installed
- Basic knowledge of JavaScript/TypeScript
- Understanding of [EIP-5792 Overview](/developers/guides/eip-5792-overview)
:::

:::tip
**Complete Implementation**: For the full working example with React, TypeScript, and all code, see our [Berachain EIP-5792 Implementation Guide](https://github.com/berachain/guides/tree/main/apps/eip-5792).

**Note**: The actual implementation in the Berachain guides repository includes a complete React application with UI components, error handling, and real-world examples that you can run and test immediately.
:::

## Overview

EIP-5792 enables applications to request MetaMask to process batches of on-chain write calls. This guide shows you how to:

1. Check MetaMask capabilities
2. Send batch transactions
3. Monitor transaction status
4. Handle errors and fallbacks

:::info
**Documentation vs Implementation**: This guide provides the conceptual framework and code examples for EIP-5792. For a complete, working React application with UI components and real examples, see the [Berachain EIP-5792 Implementation Guide](https://github.com/berachain/guides/tree/main/apps/eip-5792).
:::

## MetaMask EIP-5792 Support

MetaMask supports EIP-5792 through the following JSON-RPC methods:

- `wallet_getCapabilities` - Discover supported capabilities
- `wallet_sendCalls` - Submit batch transactions
- `wallet_getCallsStatus` - Check transaction status
- `wallet_showCallsStatus` - Display status to users

For detailed API reference, see the [official MetaMask EIP-5792 documentation](https://docs.metamask.io/wallet/reference/json-rpc-methods/wallet_sendcalls/).

## Setup

### 1. Connect to MetaMask

First, ensure you have a connection to MetaMask:

```typescript
// Check if MetaMask is installed
if (typeof window.ethereum === 'undefined') {
  throw new Error('MetaMask is not installed');
}

// Request account access
const accounts = await window.ethereum.request({
  method: 'eth_requestAccounts'
});

const account = accounts[0];
console.log('Connected account:', account);
```

### 2. Check EIP-5792 Support

Before using EIP-5792 features, check if MetaMask supports them:

```typescript
async function checkEIP5792Support() {
  try {
    const capabilities = await window.ethereum.request({
      method: 'wallet_getCapabilities'
    });
    
    console.log('MetaMask capabilities:', capabilities);
    // Example output:
    // {
    //   wallet_sendCalls: true,
    //   wallet_getCallsStatus: true,
    //   wallet_showCallsStatus: true,
    //   wallet_getCapabilities: true,
    //   atomic: 'supported',
    //   paymasterService: 'supported',
    //   flowControl: 'supported',
    //   auxiliaryFunds: 'unsupported'
    // }
    
    // Check for EIP-5792 support
    if (capabilities.wallet_sendCalls) {
      console.log('✅ EIP-5792 is supported');
      return true;
    } else {
      console.log('❌ EIP-5792 is not supported');
      return false;
    }
  } catch (error) {
    console.log('❌ Error checking capabilities:', error);
    return false;
  }
}
```

## Basic Implementation

### 1. Simple Batch Transaction

Here's a basic example of sending a batch transaction:

```typescript
async function sendBatchTransaction() {
  // Prepare your calls
  const calls = [
    {
      to: '0x...', // Contract address
      data: '0x...', // Encoded function data
      value: '0x0'
    },
    {
      to: '0x...', // Another contract address
      data: '0x...', // Encoded function data
      value: '0x0'
    }
  ];

  try {
    const result = await window.ethereum.request({
      method: 'wallet_sendCalls',
      params: {
        calls,
        capabilities: {
          atomic: true // Request atomic execution
        }
      }
    });

    console.log('Batch transaction submitted:', result);
    return result;
  } catch (error) {
    console.error('Error sending batch transaction:', error);
    throw error;
  }
}
```

### 2. Monitor Transaction Status

After submitting a batch transaction, monitor its status:

```typescript
async function monitorBatchStatus(callId: string) {
  try {
    const status = await window.ethereum.request({
      method: 'wallet_getCallsStatus',
      params: { callId }
    });

    console.log('Batch status:', status);

    switch (status.status) {
      case 'pending':
        console.log('Transaction is pending...');
        // Poll again in a few seconds
        setTimeout(() => monitorBatchStatus(callId), 2000);
        break;
      case 'confirmed':
        console.log('✅ Transaction confirmed!');
        console.log('Transaction hash:', status.transactionHash);
        break;
      case 'failed':
        console.log('❌ Transaction failed:', status.error);
        break;
      default:
        console.log('Unknown status:', status.status);
    }

    return status;
  } catch (error) {
    console.error('Error checking status:', error);
    throw error;
  }
}

// Example usage with proper error handling
async function executeBatchWithMonitoring(calls: any[]) {
  try {
    // Send batch transaction
    const result = await window.ethereum.request({
      method: 'wallet_sendCalls',
      params: { calls, capabilities: { atomic: true } }
    });

    console.log('Batch submitted with callId:', result.callId);
    
    // Monitor the transaction
    await monitorBatchStatus(result.callId);
    
    return result;
  } catch (error) {
    console.error('Failed to execute batch:', error);
    throw error;
  }
}
```

## Real-World Examples

### 1. Approve and Transfer

The most common use case - approve a token and then transfer it:

```typescript
import { encodeFunctionData } from 'viem';

async function approveAndTransfer(
  tokenAddress: string,
  spenderAddress: string,
  recipientAddress: string,
  amount: bigint
) {
  // Encode the approve call
  const approveData = encodeFunctionData({
    abi: [
      {
        name: 'approve',
        type: 'function',
        inputs: [
          { name: 'spender', type: 'address' },
          { name: 'amount', type: 'uint256' }
        ],
        outputs: [{ name: '', type: 'bool' }],
        stateMutability: 'nonpayable'
      }
    ],
    functionName: 'approve',
    args: [spenderAddress, amount]
  });

  // Encode the transfer call
  const transferData = encodeFunctionData({
    abi: [
      {
        name: 'transfer',
        type: 'function',
        inputs: [
          { name: 'to', type: 'address' },
          { name: 'amount', type: 'uint256' }
        ],
        outputs: [{ name: '', type: 'bool' }],
        stateMutability: 'nonpayable'
      }
    ],
    functionName: 'transfer',
    args: [recipientAddress, amount]
  });

  const calls = [
    {
      to: tokenAddress,
      data: approveData,
      value: '0x0'
    },
    {
      to: spenderAddress,
      data: transferData,
      value: '0x0'
    }
  ];

  const result = await window.ethereum.request({
    method: 'wallet_sendCalls',
    params: {
      calls,
      capabilities: { atomic: true }
    }
  });

  return result;
}
```

## Error Handling

### 1. Graceful Fallbacks

Always provide fallbacks for unsupported features:

```typescript
async function executeBatchWithFallback(calls: any[]) {
  try {
    // Try EIP-5792 first
    const result = await window.ethereum.request({
      method: 'wallet_sendCalls',
      params: { calls, capabilities: { atomic: true } }
    });
    
    console.log('✅ EIP-5792 batch executed successfully');
    return result;
  } catch (error) {
    console.log('⚠️ EIP-5792 not supported, falling back to individual transactions');
    
    // Fall back to individual transactions
    const results = [];
    for (const call of calls) {
      const tx = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [call]
      });
      results.push(tx);
    }
    
    return { fallback: true, transactions: results };
  }
}
```

### 2. User Rejection Handling

Handle cases where users reject the transaction:

```typescript
async function sendBatchWithUserHandling(calls: any[]) {
  try {
    const result = await window.ethereum.request({
      method: 'wallet_sendCalls',
      params: { calls }
    });
    
    return result;
  } catch (error) {
    if (error.code === 4001) {
      // User rejected the transaction
      console.log('User rejected the batch transaction');
      throw new Error('Transaction was rejected by user');
    } else if (error.code === 4200) {
      // Method not supported
      console.log('EIP-5792 not supported by this wallet');
      throw new Error('EIP-5792 not supported');
    } else if (error.code === 4201) {
      // Method not supported
      console.log('Method not supported by this wallet');
      throw new Error('Method not supported');
    } else {
      // Other errors
      console.error('Unexpected error:', error);
      throw error;
    }
  }
}
```

## Testing

### 1. Test on Berachain Testnet

Use Berachain's testnet to test your EIP-5792 implementation:

```typescript
// Configure for Berachain testnet
const BERACHAIN_TESTNET = {
  chainId: '0x7a69', // 31337 in hex
  chainName: 'Berachain Testnet',
  nativeCurrency: {
    name: 'BERA',
    symbol: 'BERA',
    decimals: 18
  },
  rpcUrls: ['https://artio.rpc.berachain.com'],
  blockExplorerUrls: ['https://artio.beratrail.io']
};

// Add network to MetaMask
async function addBerachainNetwork() {
  try {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [BERACHAIN_TESTNET]
    });
    console.log('✅ Berachain testnet added to MetaMask');
  } catch (error) {
    console.log('Network already exists or user rejected');
  }
}
```

## Best Practices

### 1. Always Check Capabilities

```typescript
// Good practice
const capabilities = await window.ethereum.request({
  method: 'wallet_getCapabilities'
});

// Check if EIP-5792 is supported
if (capabilities.wallet_sendCalls) {
  console.log('EIP-5792 is supported');
  
  // Check atomic execution capability
  if (capabilities.atomic === 'supported') {
    console.log('Atomic execution is supported');
  } else if (capabilities.atomic === 'ready') {
    console.log('Atomic execution is ready (requires user approval)');
  } else {
    console.log('Atomic execution is not supported');
  }
} else {
  console.log('EIP-5792 is not supported, use fallback');
}
```

### 2. Provide Clear User Feedback

```typescript
// Show transaction status to users
async function showTransactionStatus(callId: string) {
  await window.ethereum.request({
    method: 'wallet_showCallsStatus',
    params: { callId }
  });
}
```

## Integration with Berachain

### 1. Berachain-Specific Considerations

When implementing EIP-5792 on Berachain:

- **Gas Optimization**: Berachain's gas model may differ from Ethereum
- **Network Configuration**: Use Berachain's RPC endpoints
- **Token Standards**: Ensure compatibility with Berachain's token contracts

### 2. Complete Implementation

For a complete, production-ready implementation with:

- Full TypeScript support
- Comprehensive error handling
- Testing suite
- Berachain-specific optimizations

See our [Berachain EIP-5792 Implementation Guide](https://github.com/berachain/guides/tree/main/apps/eip-5792).

### 3. What's in the Actual Implementation

The Berachain guides repository contains a complete React application that demonstrates:

- **React Components**: UI for connecting wallets, checking capabilities, and sending batch transactions
- **TypeScript**: Full type safety and modern development practices
- **Real Examples**: Working examples of approve & transfer, DeFi operations, and NFT operations
- **Error Handling**: Comprehensive error handling and user feedback
- **Status Monitoring**: Real-time transaction status updates
- **Network Support**: Berachain testnet configuration
- **Testing**: Ready-to-run examples you can test immediately

The implementation is designed to be a complete, working example that developers can clone, run, and use as a reference for their own projects.

## Resources

- [MetaMask EIP-5792 Documentation](https://docs.metamask.io/wallet/reference/json-rpc-methods/wallet_sendcalls/)
- [EIP-5792 Specification](https://eips.ethereum.org/EIPS/eip-5792)
- [Berachain EIP-5792 Implementation Guide](https://github.com/berachain/guides/tree/main/apps/eip-5792)
- [EIP-5792 Overview](/developers/guides/eip-5792-overview)

## Next Steps

1. **Test the examples** in this guide
2. **Explore the complete implementation** in our GitHub repository
3. **Integrate EIP-5792** into your dApp
4. **Share your experience** with the community

:::tip
**Need Help?** Join our community discussions or check the troubleshooting section above for common issues.
::: 