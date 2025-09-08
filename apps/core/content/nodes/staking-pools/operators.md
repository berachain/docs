---
head:
  - - meta
    - property: og:title
      content: Staking Pools Operator Guide
  - - meta
    - name: description
      content: How to set up and manage staking pools as a validator
  - - meta
    - property: og:description
      content: How to set up and manage staking pools as a validator
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Staking Pools Operator Guide

This guide walks validators through setting up and managing staking pools to offer liquid staking services to their communities. Staking pools represent a significant opportunity for validators to build engaged communities while leveraging Berachain's advanced staking infrastructure.

## Prerequisites

Before setting up a staking pool, validators need to ensure they have the necessary foundation in place. A fully operational Berachain validator node is essential, as the staking pool will integrate directly with your existing validator infrastructure. You'll also need at least {{ config.mainnet.minEffectiveBalance.toLocaleString() }} BERA for the initial deposit, which serves as the foundation for your staking pool operations.

Technical knowledge of smart contract interactions is important, as you'll be deploying and managing several contracts. While the system is designed to be user-friendly, understanding the underlying mechanics will help you troubleshoot issues and optimize your pool's performance. Perhaps most importantly, you should have a community of users interested in staking with your validator, as staking pools are most effective when they serve an engaged user base.

:::warning
Staking pools are only available for new validators. Existing validators must perform a full withdrawal and recreate their validator to use staking pools.
:::

## Overview of the Setup Process

The setup process for staking pools follows a logical progression that ensures all components are properly configured before going live. It begins with deploying the staking pool contracts through the factory, which creates all the necessary smart contracts for your pool. Once deployed, you'll register your validator with these pool contracts, setting them as your operator and withdrawal credentials.

The next critical step is verification, where you'll obtain proofs and verify that your configuration is correct. This verification process is essential for ensuring the security and proper operation of your pool. After verification, you can activate the pool, enabling user deposits and beginning operations. Finally, you'll configure operational parameters such as commission rates and reward allocations to optimize your pool's performance.

## Deploy a Staking Pool

### Step 1: Prepare Your Validator Data

The first step in deploying your staking pool is gathering the necessary validator information. You'll need to obtain your validator's public key, which serves as the unique identifier for your staking pool. This public key is used throughout the system to link your validator operations with the staking pool contracts.

```bash
# Get your validator public key
beacond deposit validator-keys --home $BEACOND_HOME

# Example output:
# Eth/Beacon Pubkey (Compressed 48-byte Hex):
# 0x9308360bb1e8c237c2a4b6734782426e6e42bc7a43008ba5e3d9f3c70143227ea1fb2a08b21cbbedf87cebf27e81669d
```

### Step 2: Deploy Contracts via Factory

The deployment process uses the `StakingPoolContractsFactory` to create all necessary contracts in a single transaction. This factory approach ensures that all contracts are properly linked and configured, reducing the complexity of the setup process.

```solidity
// Deploy staking pool contracts
function deployStakingPoolContracts(
    bytes memory pubkey,
    address admin,
    address defaultShareRecipient
) external returns (CoreContracts memory);
```

The deployment function requires three key parameters. Your validator's public key (in 48-byte hex format) serves as the unique identifier for the pool. The admin address will have administrative privileges over the pool, typically a governance multisig for security. The default share recipient address will receive the initial shares in the pool, usually your validator wallet.

Upon successful deployment, the function returns a `CoreContracts` struct containing the addresses of all deployed contracts. This includes the main staking pool contract that users will interact with, the smart operator that manages validator operations, the withdrawal vault that handles withdrawal requests, the staking rewards vault for rewards management, and the incentive collector for incentive token collection.

### Step 3: Verify Contract Deployment

After deployment, it's crucial to verify that all contracts were deployed correctly and that the predicted addresses match the actual deployed addresses. This verification step helps ensure that your staking pool is properly configured and ready for use.

```solidity
// Check predicted addresses match deployed addresses
function predictStakingPoolContractsAddresses(
    bytes memory pubkey
) external view returns (CoreContracts memory);
```

## Initialize the Pool

### Step 1: Register Validator with Pool Contracts

Once your contracts are deployed and verified, the next step is to register your validator with the pool contracts. This process involves using the `BeaconDeposit` contract to establish the connection between your validator and the staking pool infrastructure.

```solidity
// Register validator with pool contracts
function deposit(
    bytes memory pubkey,
    bytes memory withdrawal_credentials,
    bytes memory signature,
    bytes32 deposit_data_root
) external payable;
```

**Critical Configuration:**

- **Withdrawal Credentials**: Must be set to your `withdrawalVault` contract address
  The operator address must be set to your `smartOperator` contract address, which will manage all validator operations on behalf of your staking pool. You'll also need to provide an initial deposit of at least {{ config.mainnet.minEffectiveBalance.toLocaleString() }} BERA, which serves as the foundation for your pool's operations.

### Step 2: Obtain Verification Proofs

After registration, you'll need to obtain proofs from the beacon API to verify that your setup is correct. These proofs are essential for ensuring the security and integrity of your staking pool. The system requires proof of your validator index and proof of your withdrawal credentials to establish the connection between your validator and the staking pool contracts.

```bash
# Get validator index proof
curl "https://beacon-api.berachain.com/eth/v1/beacon/proof/validators/{validator_index}"

# Get withdrawal credentials proof
curl "https://beacon-api.berachain.com/eth/v1/beacon/proof/withdrawal_credentials/{validator_index}"
```

### Step 3: Activate the Pool

Once you have the necessary proofs, you can activate your staking pool using the factory contract. This activation process verifies all the proofs and enables your pool to begin accepting user deposits and managing operations.

```solidity
// Activate staking pool
function activateStakingPool(
    bytes memory pubkey,
    bytes memory indexProof,
    bytes memory withdrawalCredentialsProof,
    bytes memory initialBalanceProof,
    uint256 initialDepositAmount
) external;
```

The activation function requires several key parameters. Your validator's public key serves as the unique identifier, while the various proofs verify that your validator is properly configured. The index proof confirms your validator's position in the consensus layer, the withdrawal credentials proof verifies that your pool contracts are properly linked, and the initial balance proof confirms your deposit amount. Finally, you'll specify the exact amount of your initial deposit.

## Configure Operations

Once your staking pool is active, you'll want to configure various operational parameters to optimize performance and align with your goals. These configurations allow you to customize how your pool operates and how rewards are distributed.

### Set Commission Rates

Commission rates determine how much of the user rewards you retain as the validator. This is a key parameter that affects both your revenue and the attractiveness of your pool to potential stakers. You can set commission rates up to a maximum of 10% (1000 basis points), allowing you to balance profitability with competitive positioning.

```solidity
// Set validator commission rate (in basis points, max 1000 = 10%)
function setValidatorCommissionRate(uint256 commissionRate) external;
```

### Configure Reward Allocations

The reward allocation system allows you to direct Proof of Liquidity incentives to specific applications or use cases. This flexibility enables you to support particular ecosystem initiatives or community projects, creating opportunities to differentiate your pool and build stronger relationships with your staking community.

```solidity
// Set reward allocation for specific applications
function setRewardAllocation(
    address[] memory rewardVaults,
    uint256[] memory weights
) external;
```

### Manage BGT Operations

BGT (Berachain Governance Token) operations are crucial for maximizing your Proof of Liquidity performance. The boost system allows you to queue BGT boosts for your validator and activate them strategically to enhance your position in the network's incentive structure.

```solidity
// Queue BGT boost for validator
function queueBoost(uint256 amount) external;

// Activate queued boost
function activateBoost() external;
```

## Pool Management

Effective pool management requires ongoing monitoring and proactive decision-making. Regular oversight ensures your pool operates smoothly and helps you identify opportunities for optimization or potential issues before they become problems.

### Monitor Pool Status

Regular monitoring of your pool's status is essential for maintaining optimal performance. You should check key metrics such as whether the pool is active, the total assets under management, and the amount of buffered assets that haven't been staked yet. These metrics provide insights into your pool's health and performance.

```solidity
// Check if pool is active
function isActive() external view returns (bool);

// Get total assets under management
function totalAssets() external view returns (uint256);

// Get buffered assets (not yet staked)
function bufferedAssets() external view returns (uint256);
```

### Handle Capacity Limits

Understanding and managing capacity limits is crucial for maintaining a healthy staking pool. Your pool has a maximum capacity of 10,000,000 BERA per validator, which prevents any single validator from becoming too dominant in the system. The minimum balance requirement of 250,000 BERA serves as a safety threshold, and if breached, the system automatically triggers a full exit to protect user funds. Additionally, the pool automatically pauses when maximum capacity is reached, ensuring system stability.

### Emergency Operations

In emergency situations, you have several options to protect your pool and your users:

```solidity
// Pause pool operations (admin only)
function pause() external;

// Trigger full exit (admin only)
function triggerFullExit() external;
```

## User Experience Considerations

### Provide Clear Information

Help users understand your pool:

- **Commission Rate**: Clearly display your commission rate
- **Performance History**: Share your validator's uptime and performance
- **Community**: Build and maintain an active community
- **Support**: Provide support channels for users

### Monitor and Optimize

Regularly monitor and optimize your operations:

- **BGT Management**: Optimize BGT boost for maximum rewards
- **Reward Allocation**: Direct rewards to high-performing applications
- **Commission Rates**: Adjust rates based on market conditions
- **Community Engagement**: Maintain active communication with users

## Security Best Practices

### Access Control

- **Admin Role**: Keep admin keys secure (typically governance multisig)
- **Manager Role**: Use a dedicated wallet for validator operations
- **Role Separation**: Don't use admin wallet for daily operations

### Monitoring

- **Oracle Data**: Monitor oracle updates for accuracy
- **Contract Events**: Watch for important events and anomalies
- **User Deposits**: Monitor deposit patterns for unusual activity

### Emergency Procedures

- **Pause Mechanisms**: Know how to pause operations if needed
- **Full Exit**: Understand when and how to trigger full exit
- **Communication**: Have plans for communicating with users during emergencies

## Troubleshooting

### Common Issues

**Pool Not Activating**

- Verify all proofs are correct and recent
- Ensure withdrawal credentials match contract address
- Check that initial deposit meets minimum requirements

**Oracle Issues**

- Monitor oracle update frequency
- Verify oracle data accuracy
- Contact support if oracle appears stuck

**Capacity Issues**

- Monitor pool capacity regularly
- Consider adjusting commission rates to manage growth
- Plan for capacity expansion if needed

### Getting Help

- **Technical Support**: Contact Berachain technical support
- **Community**: Join validator community channels
- **Documentation**: Refer to smart contract documentation for technical details

## Next Steps

After setting up your staking pool:

1. **Market Your Pool**: Build awareness in your community
2. **Optimize Operations**: Fine-tune BGT management and reward allocation
3. **Grow Your Community**: Attract and retain users
4. **Monitor Performance**: Track your pool's performance and user satisfaction

For detailed technical information about the smart contracts, see the [Smart Contract Reference](/nodes/staking-pools-contracts).

:::tip
Successful staking pools often have strong community engagement and transparent operations. Focus on building trust with your users through clear communication and reliable performance.
:::

:::note
The off-chain oracle and incentive management bot components are required for full functionality but are not yet implemented. These will be deployed separately and integrated with the staking pools system.
:::
