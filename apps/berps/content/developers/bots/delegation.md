---
head:
  - - meta
    - property: og:title
      content: Delegation
  - - meta
    - name: description
      content: Explanation of delegation on Berps.
  - - meta
    - property: og:description
      content: Explanation of delegation on Berps.
---

# Delegation

Berps' main `Entrypoint` contract extends the `Delegatable` contract. This enables users to delegate calls to another address, enabling the delegate to perform actions on behalf of the original user. This functionality is particularly useful in the context of Berps bots, where trades are executed through smart contracts.

## Functions

To set a delegate:

```solidity
function setDelegate(address delegate) external
```

To remove a delegate:

```solidity
function removeDelegate() external
```

To execute a delegated action:

```solidity
function delegatedAction(
    address trader,
    bytes calldata data
) external payable returns (bytes memory)
```

## Delegation Uses

Bots which act through smart contracts can be designated as delegates for user accounts, allowing bots to perform automated actions, such as executing limit orders, performing liquidations, or managing positions. Scripting trading actions through a smart contract can offer efficiency improvements over making individual calls from an EOA.

Delegation can also be used to enable social trading, whereby one delegate can manage trades for multiple accounts. Even though trades are all performed at the level of individual accounts, delegated calls can leverage can access Berps' [multicall](/developers/bots/multicall) functionality to batch trades on behalf of multiple accounts.

:::warning
The original delegator is recognized as the `trader` to the Berps protocol,
and the delegate is only able to perform actions on their behalf. As an
example, `$HONEY` required for opening trades is taken from the delegator's
account, and the delegate (e.g. bot) is unable to withdraw any funds from the
delegator's account or from any open positions.
:::
