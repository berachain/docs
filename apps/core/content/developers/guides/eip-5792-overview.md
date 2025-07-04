---
head:
  - - meta
    - property: og:title
      content: EIP-5792 Introduction
  - - meta
    - name: description
      content: Learn about EIP-5792 and how it enables wallet batching capabilities for improved user experience
  - - meta
    - property: og:description
      content: Learn about EIP-5792 and how it enables wallet batching capabilities for improved user experience
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# EIP-5792: Wallet Batching Capabilities

EIP-5792 is a proposed Ethereum Improvement Proposal that enables applications to request wallets to process batches of on-chain write calls and to check their status. This standard introduces a new wallet method, `wallet_sendCalls`, along with supporting methods for status checking and capability discovery.

EIP-5792 represents a significant step forward in improving the user experience of Ethereum applications. By providing a standardized way for applications to request batch operations from wallets, it eliminates the need for complex multi-transaction flows and enables more intuitive user interfaces.

The combination of EIP-5792 (application interface) and EIP-7702 (on-chain execution) creates a powerful foundation for the future of Ethereum transaction batching, making the ecosystem more accessible to both developers and end users.

<!-- ![EIP-5792 Overview](/assets/eip5792-overview.png) -->

:::tip
**Practical Implementation**: For a hands-on guide to implementing EIP-5792 with MetaMask, see our [MetaMask Guide](/developers/guides/eip-5792-metamask-guide).

**Working Example**: For a complete, working implementation with React and TypeScript, see our [Berachain EIP-5792 Implementation Guide](https://github.com/berachain/guides/tree/main/apps/eip-5792).
:::

:::info
**Status**: EIP-5792 is currently in "Last Call" with a deadline of May 5, 2025. There is significant support from wallets and tools.
:::

:::info
**Get Involved**: Review the EIP, test implementations, and join the conversation on Ethereum Magicians to help shape the future of wallet batching capabilities.
:::

## What is EIP-5792?

EIP-5792 enables applications to request that a wallet process a batch of on-chain write calls and check the status of those calls. These calls can be enhanced by `capabilities` (such as atomic execution or paymasters) if supported by the wallet.

### Key Components

- **`wallet_sendCalls`**: The main method for submitting batch transactions.
- **`wallet_getCallsStatus`**: Checks the status of submitted calls.
- **`wallet_showCallsStatus`**: Displays call information to users.
- **`wallet_getCapabilities`**: Discovers wallet capabilities.
- **Capabilities**: Features such as atomic execution, paymaster support, flow control, and auxiliary funds.

## Relationship with EIP-7702

EIP-5792 and EIP-7702 work together to provide a complete batching solution:

- **EIP-7702**: Enables EOAs to temporarily upgrade to smart contract functionality for batch execution.
- **EIP-5792**: Provides the wallet interface and capability discovery for batch operations.

The Bectra upgrade includes EIP-7702, which enables Externally Owned Accounts (EOAs) to have their address represented by the code of an existing smart contract. This means any account on Berachain will be able to make batched calls, assuming the EOA's designated smart contract supports it.

EIP-5792 provides the application layer interface to access these new capabilities.

## User Benefits

End users will no longer need to manually execute multiple transactions one by one. The canonical example is the "approve and transfer" flow for ERC-20 tokens, which currently requires two transactions and results in a disorienting UI, especially for users who are new to the space.

### Improved User Experience

- **Simplified Interfaces**: User interfaces can be simpler and more intuitive.
- **Reduced Transaction Count**: Multiple operations can be performed in a single transaction.
- **Better Context**: Wallets can provide richer confirmation dialogs with full batch context.
- **Atomic Execution**: All operations either succeed or fail together.

## Developer Benefits

### For Application Developers

- **Simplified Integration**: No need to "guess" what a given wallet is capable of.
- **Capability Discovery**: Clear indication of supported features.
- **Reduced Complexity**: No need to create complex multi-transaction interfaces.
- **Future-Proof**: Provides a foundation for iterative functionality improvements.

### For Wallet Developers

- **Richer Context**: Provides more information about application intent.
- **Better UX**: Allows the display of comprehensive batch information instead of individual transactions.
- **Capability Signaling**: Indicates support for advanced features.
- **Extensible**: Serves as a framework for adding new capabilities over time.

## Atomic Execution Capabilities

Wallets can indicate their support for atomic execution of batches through the `atomic` capability, which can have three possible states:

- **`supported`**: The wallet executes all calls atomically and contiguously.
- **`ready`**: The wallet can be upgraded to `supported`, pending user approval (e.g., via EIP-7702).
- **`unsupported`**: The wallet does not provide any atomicity or contiguity guarantees.

## Core Methods

The following are core methods that can be called by libraries for wallets.

### wallet_getCapabilities

Applications call this method to discover which capabilities the wallet supports:

```typescript
// Example capability discovery
const capabilities = await wallet.request({
  method: "wallet_getCapabilities",
});

console.log(capabilities);
// {
//   atomic: 'supported',
//   paymasterService: 'supported',
//   flowControl: 'supported',
//   auxiliaryFunds: 'unsupported'
// }
```

### wallet_sendCalls

Submit a batch of calls for execution:

```typescript
// Example batch submission
const result = await wallet.request({
  method: "wallet_sendCalls",
  params: {
    calls: [
      // Notice the multiple requests are an array
      {
        to: "0x...",
        data: "0x...",
        value: "0x0",
      },
      {
        to: "0x...",
        data: "0x...",
        value: "0x0",
      },
    ],
    capabilities: {
      atomic: true,
    },
  },
});
```

### wallet_getCallsStatus

Check the status of submitted calls:

```typescript
// Example status check
const status = await wallet.request({
  method: "wallet_getCallsStatus",
  params: {
    callId: "0x...",
  },
});
```

## Use Cases

### 1 - Approve and Transfer

The most common use case is to approve a token and then transfer it in a single operation:

```typescript
const calls = [
  {
    to: tokenAddress,
    data: encodeFunctionData({
      abi: erc20ABI,
      functionName: "approve",
      args: [spender, amount],
    }),
    value: "0x0",
  },
  {
    to: spenderAddress,
    data: encodeFunctionData({
      abi: contractABI,
      functionName: "transfer",
      args: [recipient, amount],
    }),
    value: "0x0",
  },
];
```

### 2 - Complex DeFi Operations

Multi-step DeFi operations, such as swapping tokens and then staking:

```typescript
const calls = [
  // Swap tokens
  {
    to: dexAddress,
    data: encodeSwapData(tokenA, tokenB, amount),
    value: "0x0",
  },
  // Approve staking contract
  {
    to: tokenBAddress,
    data: encodeFunctionData({
      abi: erc20ABI,
      functionName: "approve",
      args: [stakingAddress, swappedAmount],
    }),
    value: "0x0",
  },
  // Stake tokens
  {
    to: stakingAddress,
    data: encodeFunctionData({
      abi: stakingABI,
      functionName: "stake",
      args: [swappedAmount],
    }),
    value: "0x0",
  },
];
```

### 3 - NFT Operations

Batch NFT operations, such as minting and setting metadata:

```typescript
const calls = [
  // Mint NFT
  {
    to: nftContractAddress,
    data: encodeFunctionData({
      abi: nftABI,
      functionName: "mint",
      args: [recipient],
    }),
    value: mintPrice,
  },
  // Set metadata
  {
    to: nftContractAddress,
    data: encodeFunctionData({
      abi: nftABI,
      functionName: "setTokenURI",
      args: [tokenId, metadataURI],
    }),
    value: "0x0",
  },
];
```

## Comparison with Other Solutions

| Feature                  | EIP-5792      | Multicall3 | Permit2    | Meta-tx + Forwarder | EIP-4337 + Bundlers |
| ------------------------ | ------------- | ---------- | ---------- | ------------------- | ------------------- |
| **Wallet Integration**   | ✅ Native     | ❌ Manual  | ✅ Native  | ❌ Manual           | ❌ Complex          |
| **Capability Discovery** | ✅ Built-in   | ❌ None    | ⚠️ Limited | ❌ None             | ❌ None             |
| **Atomic Execution**     | ✅ Guaranteed | ✅ Yes     | ✅ Yes     | ❌ No               | ✅ Yes              |
| **Gas Optimization**     | ✅ High       | ⚠️ Medium  | ✅ High    | ⚠️ Medium           | ⚠️ Medium           |
| **User Experience**      | ✅ Excellent  | ⚠️ Manual  | ✅ Good    | ⚠️ Complex          | ⚠️ Complex          |
| **Implementation**       | ✅ Simple     | ✅ Simple  | ⚠️ Medium  | ❌ Complex          | ❌ Complex          |

## Implementation Example

Here's a complete example demonstrating how to implement EIP-5792 in a web application:

```typescript
// EIP-5792 implementation example
class EIP5792Client {
  private wallet: any;

  constructor(wallet: any) {
    this.wallet = wallet;
  }

  async getCapabilities() {
    return await this.wallet.request({
      method: "wallet_getCapabilities",
    });
  }

  async sendCalls(calls: any[], capabilities?: any) {
    const params: any = { calls };

    if (capabilities) {
      params.capabilities = capabilities;
    }

    return await this.wallet.request({
      method: "wallet_sendCalls",
      params,
    });
  }

  async getCallsStatus(callId: string) {
    return await this.wallet.request({
      method: "wallet_getCallsStatus",
      params: { callId },
    });
  }

  async showCallsStatus(callId: string) {
    return await this.wallet.request({
      method: "wallet_showCallsStatus",
      params: { callId },
    });
  }
}

// Usage example
const client = new EIP5792Client(window.ethereum);

// Check capabilities
const capabilities = await client.getCapabilities();
console.log("Wallet capabilities:", capabilities);

// Prepare batch calls
const calls = [
  {
    to: "0x...",
    data: "0x...",
    value: "0x0",
  },
];

// Send batch with atomic execution if supported
const result = await client.sendCalls(calls, {
  atomic: capabilities.atomic === "supported",
});

// Check status
const status = await client.getCallsStatus(result.callId);
console.log("Batch status:", status);
```

## Migration Guide

### From Multicall3

If you are currently using Multicall3, migrating to EIP-5792 is straightforward:

```typescript
// Before: Multicall3
const multicall = new Multicall3(provider);
const results = await multicall.call([
  { target: contract1, callData: data1 },
  { target: contract2, callData: data2 },
]);

// After: EIP-5792
const calls = [
  { to: contract1, data: data1, value: "0x0" },
  { to: contract2, data: data2, value: "0x0" },
];
const result = await wallet.request({
  method: "wallet_sendCalls",
  params: { calls },
});
```

### From Manual Batching

If you are manually handling multiple transactions:

```typescript
// Before: Manual batching
const tx1 = await contract1.approve(spender, amount);
await tx1.wait();
const tx2 = await contract2.transfer(recipient, amount);
await tx2.wait();

// After: EIP-5792
const calls = [
  {
    to: contract1.address,
    data: contract1.interface.encodeFunctionData("approve", [spender, amount]),
    value: "0x0",
  },
  {
    to: contract2.address,
    data: contract2.interface.encodeFunctionData("transfer", [
      recipient,
      amount,
    ]),
    value: "0x0",
  },
];
await wallet.request({
  method: "wallet_sendCalls",
  params: { calls, capabilities: { atomic: true } },
});
```

## Best Practices

### 1 - Always Check Capabilities

Before sending calls, always check which capabilities the wallet supports:

```typescript
const capabilities = await wallet.request({
  method: "wallet_getCapabilities",
});

// Only request atomic execution if supported
const useAtomic = capabilities.atomic === "supported";
```

### 2 - Handle Errors Gracefully

Implement proper error handling for unsupported capabilities:

```typescript
try {
  const result = await wallet.request({
    method: "wallet_sendCalls",
    params: { calls, capabilities: { atomic: true } },
  });
} catch (error) {
  if (error.code === 4201) {
    // User rejected the request
    console.log("User rejected batch transaction");
  } else if (error.code === 4001) {
    // Wallet doesn't support the requested capability
    console.log("Wallet doesn't support atomic execution");
    // Fall back to individual transactions
  }
}
```

### 3 - Provide Fallbacks

Always provide fallback mechanisms for wallets that do not support EIP-5792:

```typescript
async function executeBatch(calls: any[]) {
  try {
    // Try EIP-5792 first
    return await wallet.request({
      method: "wallet_sendCalls",
      params: { calls },
    });
  } catch (error) {
    // Fall back to individual transactions
    console.log("EIP-5792 not supported, using individual transactions");
    return await executeIndividualTransactions(calls);
  }
}
```

### 4 - Monitor Status

Use the status-checking methods to provide better user feedback:

```typescript
const result = await wallet.request({
  method: "wallet_sendCalls",
  params: { calls },
});

// Monitor status
const checkStatus = async () => {
  const status = await wallet.request({
    method: "wallet_getCallsStatus",
    params: { callId: result.callId },
  });

  if (status.status === "pending") {
    setTimeout(checkStatus, 1000);
  } else {
    console.log("Batch completed:", status);
  }
};

checkStatus();
```

## Future Considerations

### Upcoming Features

- **Paymaster Integration**: Native support for gasless transactions.
- **Flow Control**: Advanced transaction ordering and dependencies.
- **Auxiliary Funds**: Support for complex funding scenarios.
- **Cross-Chain Batching**: Extensions for multi-chain operations.

### Ecosystem Adoption

As EIP-5792 moves toward finalization, you can expect to see:

- **Wallet Integration**: Major wallets adding native support.
- **Framework Updates**: Libraries like ethers.js and viem adding built-in support.
- **Tooling**: Development tools and debugging utilities.
- **Standards**: Additional EIPs building on this foundation.

## Resources

- [EIP-5792 Specification](https://eips.ethereum.org/EIPS/eip-5792)
- [MetaMask EIP-5792 Documentation](https://docs.metamask.io/wallet/reference/json-rpc-methods/wallet_sendcalls/)
- [Official EIP-5792 Documentation](https://www.eip5792.xyz/)
- [GitHub Repository](https://github.com/ethereum/EIPs/pull/5792)
- [Ethereum Magicians Discussion](https://ethereum-magicians.org/t/eip-5792-wallet-send-calls/12345)
- [Berachain EIP-5792 Implementation Guide](https://github.com/berachain/guides/tree/main/apps/eip-5792)
