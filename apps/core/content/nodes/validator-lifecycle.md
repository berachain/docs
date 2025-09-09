<script setup>
    import constants from '@berachain/config/constants.json';
</script>

# Berachain Validator Lifecycle

## Overview

A validator in Berachain is a participant responsible for proposing and attesting to new blocks, helping secure the network and maintain consensus. Validators stake a required amount of the network's native token ($BERA) as collateral, which serves both as an economic incentive to behave honestly and as a mechanism for penalizing malicious behavior.

Validators have several key responsibilities:

- Proposing new blocks when selected
- Attesting to blocks proposed by other validators
- Participating in consensus by voting on the canonical chain
- Maintaining network security through their staked tokens

The Validator's Voting Power is the amount of `$BERA` they have deposited, rounded down to the nearest `{{ constants.mainnet.stakeMinimumIncrement }}`. Their Voting Power, as a proportion of the total Voting Power among all validators, is their probability of being selected to propose a block.

The limit on the number of active validators, termed in this document the `ValidatorSetCap`, is set in Beacon-Kit, and can only be affected
by Berachain governance actions followed by an update to Beacon-Kit.

## Validator Lifecycle

This diagram illustrates the life cycle of a validator:

![Validator Lifecycle](/assets/validator-lifecycle.png)

The labelled states:

- **Deposited**  
  Deposit event captured by Beacon-Kit and deposit message signature verified.

- **Eligible**  
  Validator marked as `EligibleForActivationQueue`.

- **Active**  
  Validator becomes Active after 1 epoch in Eligible. The Active Set has `{{constants.mainnet.validatorActiveSetSize}}` validators (the block proposers).

- **Exited**  
  Validator is marked for exit if the `VSC` is hit and it has the lowest effective balance or a lower-order pubKey among equals.

- **Withdrawn**  
  After being marked Exited and a 1-epoch delay, funds are fully withdrawn. All $BERA staked is returned to the validator’s withdrawal address.

With the states defined, let's look at each in detail and how you move between them.

### Deposited State

The validator’s journey starts with a deposit on the **Execution Layer** (via the Deposit Contract). Once the deposit is successful and emits an event, beacon-kit nodes pick it up and verify the signature.

The deposit links your Consensus Layer and Execution Layer identities and sets the withdrawal address for your $BERA.

- **Verification Delay**  
  It takes 2 ETH1 blocks (on the EVM layer) from event emission to verification on the Consensus Layer. If processed at epoch `N`, the validator is in **Deposited** if the balance meets the minimum.

- **Minimum Requirement**  
  **{{ constants.mainnet.minEffectiveBalance }} BERA** is needed to reach Deposited. (Multiple deposits can add up.)

- **Signature Verification**
  - First deposit: full signature check (like ETH2).
  - Later deposits: just increase balance (no extra signature check).

#### Potential Failure Points

1. **Deposit Transaction Failure on the EVM Layer**

   > **Note**: Funds are **not lost** if the transaction fails on the EVM layer for these reasons.
   - **Invalid Inputs**
     - Bad pubKey, signature, or withdrawal credentials (wrong lengths).
     - Deposit amount too low (**minimum {{ constants.mainnet.registrationMinimum }} BERA**) or not a multiple of 1 gwei.
   - **Operator Address Issues**
     - Non-zero operator address **required** on the **first** deposit.
   - **Front-Running (DOS Attack)**
     - Someone could front-run the deposit transaction, setting an operator address that you did not intend.
     - If your transaction fails with a revert related to the operator address, it might indicate you were front-ran.
     - **Important**: If your transaction is front-ran and [`BeaconDeposit:getOperator`](https://docs.berachain.com/developers/contracts/beacondeposit#getoperator) shows a different pubkey than yours, **do not continue** with that validator. Generate a new set of keys because the attacker could control your POL rewards. [learn more](https://gist.github.com/neverDefined/e9ada58947bf8bd855051c3cf48f2d83)

2. **Deposit Message Signature Verification Failure on the Consensus Layer**
   > **WARNING**: **Funds are lost** if signature verification fails on the Consensus Layer.
   - Mismatch between signed and actual withdrawal credentials, pubkey, or deposit amount.

After remaining in the **Deposited** state for 1 epoch, the validator automatically moves to the **Eligible** state and becomes eligible for activation.

### Eligible State

Once the validator enters the **Deposited** state at epoch `N`, it is marked as `EligibleForActivationQueue` as soon as epoch `N+1` starts. This is guaranteed because there is no cap on the activation queue size.

The validator remains in this **Eligible** state for 1 epoch. Afterward, it is added to the **Active** set, provided the `ValidatorSetCap` is not exceeded, or if the validator is of higher priority (i.e., higher effective balance or lower-order pubKey among equals).

### Active State

After spending 1 epoch in the **Eligible** state (say at `N+1`), the validator is marked **Active** at the start of epoch `N+2`.

Because BeaconKit (the Berachain beacon client) does not currently support voluntary withdrawals, slashing, or inactivity leaks, a validator remains active indefinitely until it is forced out by a validator with higher priority.

Once **Active**:

- **CometBFT Consensus** will use the validator for block proposals, validations, and voting.
- The higher a validator’s `EffectiveBalance`, the higher its voting power—and thus, the more frequently it will be polled for block proposals.

### Exited State

A Validator may choose to exit by [withdrawing their complete stake](/nodes/guides/withdraw-stake). Otherwise, the **only** reason for a validator to be evicted from the set (and have its funds returned) is if the `ValidatorSetCap` is reached and another validator with a higher priority enters. Higher priority is determined by:

1. **Larger Effective Balance**
2. **If Equal Effective Balance**, a lower-order pubKey (alphabetically).

When the validator is evicted from the validator set, it is marked **Exited**.

### Withdrawn State

Once the validator is marked **Exited** (say at epoch `M`), its funds are fully withdrawn at epoch `M+1`. Because BeaconKit does not currently enforce a cap on validator churn, this finalizes the validator’s lifecycle.

> **Note**: It is possible for a validator to go directly from **Eligible** to **Exited** if the `ValidatorSetCap` is full and the validator’s balance is too low (or its pubKey is lower in priority order).

## Extended Validator Lifecycle

Putting it all together, we have a complete picture of the Berachain validator lifecycle:

1. **Deposited** → 1 epoch → **Eligible** → 1 epoch → **Active**
2. Potential forced exit due to `ValidatorSetCap` → **Exited** → 1 epoch → **Withdrawn**'
3. **Deposited** → 1 epoch → **Eligible** → 1 epoch → **Exited** due to `ValidatorSetCap` + balance too low → 1 epoch → **Withdrawn**

![Validator Extended Lifecycle](/assets/validator-extended-lifecycle.png)

Note that transitions between states are done via a queue, on a FIFO basis, with a cap on the number of transitions in each state to limit excessive churn in the validator set.
