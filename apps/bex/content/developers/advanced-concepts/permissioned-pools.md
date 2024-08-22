---
head:
  - - meta
    - property: og:title
      content: Permissioned Pools
  - - meta
    - name: description
      content: BEX supports permissioned pools, which allow for customizable restrictions on user actions through the use of external permission oracles.
  - - meta
    - property: og:description
      content: BEX supports permissioned pools, which allow for customizable restrictions on user actions through the use of external permission oracles.
---

# Permissioned Pools

In addition to the standard permissionless pools, BEX supports the creation of _permissioned pools_. While permissionless pools allow any user to mint, burn, or swap without restrictions, permissioned pools introduce the ability to gate these actions based on custom logic defined in an external smart contract known as a _permission oracle_.

## Permission Oracles

A permission oracle is a smart contract that implements a specific interface to control user actions within a permissioned pool. The address of a pool's permission oracle is deterministically fixed based on the value of the pool index number, ensuring that the oracle is set ahead of time.

When a user attempts to perform an action (mint, burn, swap, or initialize) in a permissioned pool, BEX sends a request to the associated permission oracle. The oracle then executes its predefined logic to determine whether the user is allowed to proceed with the action.

Permission oracles may also be set as policy oracles, granting them the ability to dynamically adjust pool parameters such as swap fees.

## Creating Permissioned Pools

At present, permissioned pool types can only be created through the BEX protocol [governance](/learn/concepts/governance) process.

## Use Cases

Permissioned pools open up a variety of possibilities for creating custom AMM experiences on BEX, such as:

- Token-gated pools: Restrict access to a pool based on a user's token holdings, allowing for exclusive liquidity provision or trading opportunities.
- KYC/AML compliant pools: Implement identity verification requirements for users participating in a pool to comply with regulatory obligations.
- Time-limited pools: Create pools that are only accessible during specific time periods, such as a token sale or limited-time trading event.
