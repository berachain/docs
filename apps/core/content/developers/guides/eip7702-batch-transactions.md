---
head:
  - - meta
    - property: og:title
      content: EIP-7702 Batch Transactions
  - - meta
    - name: description
      content: Guide to batch transactions using EIP-7702 on Berachain.
  - - meta
    - property: og:description
      content: Guide to batch transactions using EIP-7702 on Berachain.
---

# EIP-7702 Batch Transactions

This guide covers how to perform batch transactions using EIP-7702 on Berachain, focusing on direct user-submitted transactions. Sponsorship (where a third party submits the transaction) is not implemented here, but is possible with EIP-7702.

> **Note:** The main guide and code examples will be maintained at [https://github.com/berachain/guides/tree/main/apps/batch-transactions](https://github.com/berachain/guides/tree/main/apps/batch-transactions).
>
> For a deeper understanding of EIP-7702 and temporary smart account upgrades, see [EIP-7702 Basics](/developers/guides/eip7702-basics).

## Overview

_Batch transactions_ allow you to execute multiple operations in a single EIP-7702 session, improving efficiency and reducing gas costs. This guide walks through the concepts, use cases, and implementation patterns for batch transactions with EIP-7702.

## Key Benefits

- Significantly reduced gas costs
- Atomic transaction execution
- Improved user experience
- Reduced network load

## What is EIP-7702?

EIP-7702 is a proposed Ethereum Improvement Proposal that introduces a new transaction type for batching multiple operations. It enables users to combine multiple transactions into a single transaction, reducing gas costs and improving efficiency. The proposal is designed to be backward compatible with existing Ethereum infrastructure while providing enhanced functionality for batch operations.

## Comparison Table

| Feature                   | EIP-7702 Batch Transactions | Traditional Transactions | EIP-5792 (Account Abstraction) |
| ------------------------- | --------------------------- | ------------------------ | ------------------------------ |
| Transaction Batching      | ✅ Yes                      | ❌ No                    | ⚠️ Partial                     |
| Gas Optimization          | ✅ High                     | ❌ Low                   | ⚠️ Medium                      |
| Atomic Execution          | ✅ Yes                      | ❌ No                    | ✅ Yes                         |
| Backward Compatibility    | ✅ Yes                      | N/A                      | ⚠️ Limited                     |
| Implementation Complexity | ⚠️ Medium                   | ✅ Low                   | ⚠️ High                        |
| Gas Cost per Operation    | ✅ Lowest                   | ❌ Highest               | ⚠️ Medium                      |

## Why These Ratings?

- **Transaction Batching:** EIP-7702 natively supports batching, while traditional transactions do not. EIP-5792 allows some batching via account abstraction, but it's not as seamless or native as EIP-7702.
- **Gas Optimization:** EIP-7702 is designed for gas efficiency by reducing overhead per operation. Traditional transactions incur full overhead for each transaction. EIP-5792 can optimize gas, but not to the same extent as EIP-7702 due to additional abstraction layers.
- **Atomic Execution:** EIP-7702 and EIP-5792 both support atomic execution (all succeed or all fail). Traditional transactions are independent and not atomic as a group.
- **Backward Compatibility:** EIP-7702 is designed to be backward compatible with existing infrastructure. EIP-5792 may require changes to wallets and tooling. Traditional transactions are the baseline.
- **Implementation Complexity:** EIP-7702 requires some new logic but is less complex than EIP-5792, which introduces full account abstraction. Traditional transactions are the simplest to implement.
- **Gas Cost per Operation:** EIP-7702 offers the lowest per-operation cost due to batching. Traditional transactions are the most expensive. EIP-5792 is in between due to abstraction overhead.

## Architecture

The architecture diagram below shows the high-level flow of batch transactions. Each component plays a crucial role in ensuring atomic execution and proper error handling.

```mermaid
flowchart TD
    A[User] -->|Submit Batch Transaction| B[EIP-7702 Contract]
    B -->|Process Batch| C[Transaction Executor]
    C -->|Execute| D[Transaction 1]
    C -->|Execute| E[Transaction 2]
    C -->|Execute| F[Transaction N]
    D -->|Result| G[Batch Result]
    E -->|Result| G
    F -->|Result| G
    G -->|Return| A
```

## Transaction Flow

The sequence diagram below illustrates how batch transactions are processed, from submission to final result. Each step is crucial for maintaining atomicity and proper error handling. **Sponsorship is not implemented in this guide, but is possible with EIP-7702.**

```mermaid
sequenceDiagram
    actor User
    participant BatchContract
    participant Executor
    participant Blockchain

    User->>BatchContract: Submit Batch Transaction
    BatchContract->>Executor: Process Batch
    loop Each Transaction
        Executor->>Blockchain: Execute Transaction
        Blockchain-->>Executor: Transaction Result
    end
    Executor-->>BatchContract: Batch Results
    BatchContract-->>User: Final Result
```

## Implementation

::: code-group

```solidity [BatchTransaction.sol]
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BatchTransaction {
    struct Call {
        address to;
        uint256 value;
        bytes data;
    }

    function execute(Call[] calldata calls) external payable {
        require(msg.sender == address(this), "EIP-7702: only self-call allowed");
        for (uint256 i = 0; i < calls.length; i++) {
            (bool success, ) = calls[i].to.call{value: calls[i].value}(calls[i].data);
            require(success, "Call failed");
        }
    }
}
// See the full contract at: https://github.com/berachain/guides/blob/main/apps/batch-transactions/src/BatchTransaction.sol
```

```typescript [usage.ts]
// Example usage with viem and EIP-7702 signing
import { createWalletClient, http, parseEther, encodeFunctionData } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { eip7702Actions } from "viem/experimental";
import { batchABI, batchContractAddress } from "./abi";

const account = privateKeyToAccount("0xYOUR_PRIVATE_KEY");
const client = createWalletClient({
  account,
  chain: {
    id: 1337,
    name: "Local",
    rpcUrls: { default: { http: ["http://localhost:8545"] } },
  },
  transport: http(),
}).extend(eip7702Actions());

// Prepare your batch of calls
const calls = [
  {
    to: "0xContract1",
    value: parseEther("0"),
    data: "0x...", // encoded function data
  },
  // ... more calls
];

// Sign EIP-7702 authorization
const authorization = await client.signAuthorization({
  account,
  contractAddress: batchContractAddress,
  executor: "self", // for direct execution
});

// Encode the batch call
const data = encodeFunctionData({
  abi: batchABI,
  functionName: "execute",
  args: [calls],
});

// Send the EIP-7702 transaction to the EOA address
await client.sendTransaction({
  authorizationList: [authorization],
  data,
  to: account.address,
});

// For a full working script, see:
// https://github.com/berachain/guides/blob/main/apps/batch-transactions/script/deploy-and-execute.js
```

:::

## Benefits

1. **Gas Efficiency**: Significantly reduces gas costs by combining multiple transactions into one
2. **Atomic Execution**: All transactions in a batch either succeed or fail together
3. **Improved User Experience**: Users can perform multiple operations in a single transaction
4. **Reduced Network Load**: Fewer transactions on the network means better overall performance

## Use Cases

- DeFi operations requiring multiple steps
- NFT batch minting and transfers
- Complex smart contract interactions
- Multi-step protocol operations

## Security Considerations

1. **Gas Limits**: Ensure batch size doesn't exceed block gas limits
2. **Transaction Ordering**: Maintain proper transaction ordering for dependent operations
3. **Error Handling**: Implement proper error handling for failed transactions
4. **Access Control**: Implement appropriate access control mechanisms

## Best Practices

1. Validate all transaction parameters before execution
2. Implement proper error handling and rollback mechanisms
3. Consider gas costs when determining batch size
4. Test thoroughly with different batch sizes and transaction types
5. Monitor and optimize gas usage

## Next Steps

To get started with EIP-7702 batch transactions:

1. Review the implementation example above
2. Test the batch transaction functionality in a development environment
3. Consider the security implications and best practices
4. Integrate batch transactions into your application where appropriate

## Related Resources

- [EIP-7702 Specification](https://eips.ethereum.org/EIPS/eip-7702)
- [EIP-5792 (Account Abstraction)](https://eips.ethereum.org/EIPS/eip-5792)
- [EIP-7702 Basics Guide](/developers/guides/eip7702-basics)
- [BatchTransaction.sol on GitHub](https://github.com/berachain/guides/blob/main/apps/batch-transactions/src/BatchTransaction.sol)
- [deploy-and-execute.js on GitHub](https://github.com/berachain/guides/blob/main/apps/batch-transactions/script/deploy-and-execute.js)
