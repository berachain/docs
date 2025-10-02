# Delegation Guide

The delegation system allows capital providers to fund validators without operating them directly. This enables **capital-light validator operations** where validators can focus on technical operations while delegators provide the required BERA capital.

## How Delegation Works

The delegation system separates **capital provision** from **validator operations** through two distinct roles:

- **Delegators**: Provide BERA capital and can withdraw original delegated funds (in practice, primarily the Berachain Foundation)
- **Validator Admins**: Operate validators and can withdraw staking rewards/yield

This separation allows validators to operate without significant upfront capital while enabling delegators to provide capital for validator operations.

## Delegation Process

### 1. Deploy Delegation Handler

A delegation handler must first be deployed for your validator's public key:

```solidity
// Deploy delegation handler for a specific validator
address delegationHandler = delegationHandlerFactory.deployDelegationHandler(validatorPubkey);
```

### 2. Delegator Sends Funds

The delegator sends BERA to the delegation handler contract:

```solidity
// Delegator sends BERA to the delegation handler
// This is done through a regular ETH transfer to the contract address
```

### 3. Delegate Funds

The delegator calls the delegate function to account for the funds:

```solidity
// Delegator delegates the sent funds
delegationHandler.delegate(250_000 ether);
```

**Requirements:**

- The delegation handler must have sufficient BERA balance
- Only one delegation is allowed per handler

### 4. Grant Validator Admin Role

The delegator must grant the validator admin role to the validator operator:

```solidity
// Grant VALIDATOR_ADMIN_ROLE to the validator operator
bytes32 validatorAdminRole = delegationHandler.VALIDATOR_ADMIN_ROLE();
delegationHandler.grantRole(validatorAdminRole, validatorOperatorAddress);
```

**Important**: The validator admin will also become the VALIDATOR_ADMIN on the staking pool contract.

### 5. Validator Creates Staking Pool

The validator admin creates a staking pool using the delegated funds:

```solidity
// Validator admin creates staking pool with delegated funds
delegationHandler.createStakingPoolWithDelegatedFunds(
    validatorPubkey,
    withdrawalCredentials,
    signature
);
```

This automatically:

- Deploys the core staking pool contracts
- Uses 10,000 BERA from delegated funds for the initial deposit
- Sets the delegation contract as `_defaultShareRecipient`
- Reduces `delegatedAmountAvailable` by 10,000 BERA

**Important**: Staking pool activation must still be done through the StakingPoolContractsFactory.

### 6. Additional Deposits

The validator admin can deposit additional delegated funds to reach the minimum effective balance:

```solidity
// Deposit more delegated funds to reach 250,000 BERA minimum
delegationHandler.depositDelegatedFunds(240_000 ether);
```

## Withdrawal Types

The delegation system supports two distinct withdrawal types:

### Principal Withdrawals (Delegator)

Delegators can withdraw their original delegated funds, but this requires a two-step process:

1. **Validator Admin Redeems Yield**: The validator admin must first redeem the yield to free up the delegated amount
2. **Delegator Requests Withdrawal**: The delegator can then request withdrawal of the original delegated funds

```solidity
// Step 1: Validator admin redeems yield (leaves delegated value redeemable)
delegationHandler.requestYieldWithdrawal{ value: fee }();

// Step 2: Delegator requests withdrawal of original delegated funds
delegationHandler.requestDelegatedFundsWithdrawal{ value: fee }();

// Step 3: Both must complete their respective withdrawal processes
delegationHandler.completeWithdrawal(requestId);
```

**Key Points:**

- Only the delegator (DEFAULT_ADMIN_ROLE) can request principal withdrawals
- Requires validator admin to first redeem yield to free up delegated funds
- Partial undelegations are not supported
- Both delegator and validator admin must complete the withdrawal process
- After withdrawal completion, delegator can undelegate funds

### Yield Withdrawals (Validator Admin)

Validator admins can withdraw staking rewards and yield:

```solidity
// Request withdrawal of staking rewards/yield
delegationHandler.requestYieldWithdrawal{ value: fee }();

// Complete the withdrawal after cooldown period
delegationHandler.completeWithdrawal(requestId);
```

**Key Points:**

- Only the validator admin (VALIDATOR_ADMIN_ROLE) can request yield withdrawals
- Withdrawn yield goes directly to the validator admin
- Calculates yield as total shares minus locked shares (representing delegated principal)

## Role Management

### Delegator Role (DEFAULT_ADMIN_ROLE)

- Delegate and undelegate funds
- Withdraw unused funds
- Request principal withdrawals
- Pause/unpause the delegation handler
- **Access Control**: Role-based access prevents unauthorized fund movements
- **Fund Separation**: Can only withdraw original delegated capital, not earned rewards
- **Withdrawal Cooldowns**: All withdrawals require a cooldown period (129,600 blocks ≈ 3 days) to prevent rapid withdrawal attacks

### Validator Admin Role (VALIDATOR_ADMIN_ROLE)

- Create staking pools with delegated funds
- Deposit additional delegated funds
- Request yield withdrawals
- Complete withdrawal requests
- **Access Control**: Role-based access prevents unauthorized fund movements
- **Fund Separation**: Can only withdraw earned rewards/yield, not original delegated capital
- **Withdrawal Cooldowns**: All withdrawals require a cooldown period (129,600 blocks ≈ 3 days) to prevent rapid withdrawal attacks

## Contract Reference

For detailed technical information, see the [DelegationHandler contract reference](/nodes/staking-pools/contracts/DelegationHandler) and [DelegationHandlerFactory contract reference](/nodes/staking-pools/contracts/DelegationHandlerFactory).
