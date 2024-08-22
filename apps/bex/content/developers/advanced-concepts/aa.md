---
head:
  - - meta
    - property: og:title
      content: Account Abstraction
  - - meta
    - name: description
      content: BEX supports account abstraction, allowing users to sign transactions off-chain and have them executed by third-party relayers.
  - - meta
    - property: og:description
      content: BEX supports account abstraction, allowing users to sign transactions off-chain and have them executed by third-party relayers.
---

# Account Abstraction

BEX supports _account abstraction_ for all operations within the DEX, enabling users to sign EIP-712 transactions off-chain and have them executed by third-party relayers. This offers several benefits, such as:

- Avoiding the inconvenience of managing transactions directly
- Paying exact costs with easily manageable tokens (e.g. stablecoins) instead of calculating gas fees
- Saving on execution costs by having relayers bundle actions to amortize gas costs
- Creating pre-signed transactions for later execution

## Types of Account Abstraction

BEX supports two types of account abstraction: _immediate_ and _conditional_.

### Immediate Account Abstraction

Immediate account abstraction occurs when a user signs an intention and sends it to a relayer for imminent and unconditional execution.

### Conditional Account Abstraction

Conditional account abstraction allows users to sign transactions that are only executed when specific conditions are met. These conditions can include time delays or market events like stop-loss orders. BEX enables conditional account abstraction by allowing intentions to be gated with checks to arbitrary oracle contracts with customizable calldata.

For example, to implement a stop-loss order, a user can sign an intention with a call to an oracle that checks if the price of an asset (e.g. from a Chainlink oracle) has exceeded a specified threshold.

## Use Cases

Account abstraction in BEX enables a wide range of use cases, such as:

- Gasless transactions, allowing for users to pay relayers for BEX operations using any token in their wallet
- Scheduled transactions: Users can create pre-signed transactions set to execute at specific times or intervals, such as recurring trades
- Advanced trading strategies: Conditional account abstraction allows for the implementation of complex trading strategies, like stop-loss or take-profit orders

## Usage

BEX implements account abstraction primarily through the [`userCmdRelayer`](/developers/contracts/relayer-calls) function on the DEX contract.

This enables off-chain signing of transactions and on-chain execution by third-party relayers, including optional conditions governing relayer calls.
