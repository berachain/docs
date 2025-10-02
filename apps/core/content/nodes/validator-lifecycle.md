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

![Validator Lifecycle](/assets/validator-lifecycle.png)

The labeled states are as follows:

- **Deposited**  
  Deposit event captured by Beacon-kit and deposit message signature is verified.

- **Eligible**  
  Validator has been marked as `EligibleForActivationQueue`.

- **Active**  
  The validator is marked as Active after 1 epoch from the Eligible state. Currently, the Active Set consists of `{{constants.mainnet.validatorActiveSetSize}}` Validators, which is the number of Validators that can propose blocks.

- **Exited**  
  The validator is marked for exit if the `ValidatorSetCap` limit is hit and the validator has the lowest effective balance or a lower-order pubKey if it has the same effective balance as another validator.

- **Withdrawn**  
  Once the validator is marked as exited, after a delay of 1 epoch, validator funds are fully withdrawn. All `$BERA` staked to a Validator is returned to the Validator's Withdrawal Credentials Address.

With the states defined, let’s examine each in detail, along with the transitions between them.

## Deposited State

The validator’s journey begins with a deposit transaction on the **Execution Layer** (via the Deposit Contract). Once this deposit transaction is successful and emits an event, it is captured by beacon-kit nodes and processed for signature verification.

The initial deposit transaction establishes a connection between a validator's Consensus Layer identity and its Execution Layer identity and
decides the withdrawal address for the $BERA stake.

Credentials Address,

- **Verification Delay**  
  It takes 2 ETH1 blocks (on the EVM layer) from the event emission to verify the event on the Consensus Layer. If the deposit event is processed at epoch `N`, the validator is then considered in the **Deposited** state, provided the validator’s balance equals (or exceeds) the minimum required for staking.

- **Minimum Requirement**  
  A total of **{{ constants.mainnet.minActivationBalance }} BERA** is required for a validator to reach the Deposited state. (Multiple deposits can accumulate to this amount.)

- **Signature Verification**
  - On the first deposit, the validator’s signature is fully verified (similar to ETH2).
  - Subsequent deposits simply increase the validator’s balance (no additional signature verification is done).

### Potential Failure Points

1. **Deposit Transaction Failure on the EVM Layer**

   > **Note**: Funds are **not lost** if the transaction fails on the EVM layer due to any of these reasons.
   - **Invalid Inputs**
     - Invalid pubKey, signature, or withdrawal credentials (e.g., incorrect lengths).
     - Invalid deposit amount (less than the **minimum deposit amount of {{ constants.mainnet.registrationMinimum }} BERA**, or not a multiple of 1 gwei).
   - **Operator Address Issues**
     - A non-zero operator address **must** be passed on the **first** deposit.
     - A zero address **must** be passed on **subsequent** deposits.
   - **Gas Issues**
     - If the transaction consumes 100% of the provided gas, it may fail; increase gas if necessary.
   - **Front-Running (DOS Attack)**
     - Someone could front-run the deposit transaction, setting an operator address that you did not intend.
     - If your transaction fails with a revert related to the operator address, it might indicate you were front-ran.
     - **Important**: If your transaction is front-ran and sets a different operator address, **do not continue** with that validator. Generate a new set of keys because the attacker could control your POL rewards. [learn more](https://gist.github.com/neverDefined/e9ada58947bf8bd855051c3cf48f2d83)

2. **Deposit Message Signature Verification Failure on the Consensus Layer**
   > **WARNING**: **Funds are lost** if signature verification fails on the Consensus Layer.
   - Mismatch between signed and actual withdrawal credentials.
   - Mismatch between signed and actual pubKey.

After remaining in the **Deposited** state for 1 epoch, the validator automatically moves to the **Eligible** state and becomes eligible for activation.

## Eligible State

Once the validator enters the **Deposited** state at epoch `N`, it is marked as `EligibleForActivationQueue` as soon as epoch `N+1` starts. This is guaranteed because there is no cap on the activation queue size.

The validator remains in this **Eligible** state for 1 epoch. Afterward, it is added to the **Active** set, provided the `ValidatorSetCap` is not exceeded, or if the validator is of higher priority (i.e., higher effective balance or lower-order pubKey among equals).

## Active State

After spending 1 epoch in the **Eligible** state (say at `N+1`), the validator is marked **Active** at the start of epoch `N+2`.

A validator remains active indefinitely until it is forced out by a validator with a higher stake or voluntarily exits.

Once **Active**:

- **CometBFT Consensus** will use the validator for block proposals, validations, and voting.
- The higher a validator’s `EffectiveBalance`, the higher its voting power—and thus, the more frequently it will be polled for block proposals.

## Exited State

A Validator may choose to exit by [withdrawing their complete stake](/nodes/guides/withdraw-stake). Otherwise, the **only** reason for a validator to be evicted from the set (and have its funds returned) is if the `ValidatorSetCap` is reached and another validator with a higher priority enters. Higher priority is determined by:

1. **Larger Effective Balance**
2. **If Equal Effective Balance**, a lower-order pubKey (alphabetically).

When the validator is evicted from the validator set, it is marked **Exited**.

## Withdrawn State

Once the validator is marked **Exited** (say at epoch `M`), its funds are fully withdrawn at epoch `M+1`. Because BeaconKit does not currently enforce a cap on validator churn, this finalizes the validator’s lifecycle.

> **Note**: It is possible for a validator to go directly from **Eligible** to **Exited** if the `ValidatorSetCap` is full and the validator’s balance is too low (or its pubKey is lower in priority order).

## Extended Validator Lifecycle

Putting it all together, we have a complete picture of the Berachain validator lifecycle:

1. **Deposited** → 1 epoch → **Eligible** → 1 epoch → **Active**
2. Potential forced exit due to `ValidatorSetCap` → **Exited** → 1 epoch → **Withdrawn**'
3. **Deposited** → 1 epoch → **Eligible** → 1 epoch → **Exited** due to `ValidatorSetCap` + balance too low → 1 epoch → **Withdrawn**

![Validator Extended Lifecycle](/assets/validator-extended-lifecycle.png)

Note that transitions between states are done via a queue, on a FIFO basis, with a cap on the number of transitions in each state to limit excessive churn in the validator set.
