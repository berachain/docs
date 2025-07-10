---
head:
  - - meta
    - property: og:title
      content: Staking Pools Operator Guide
  - - meta
    - name: description
      content: Complete guide for validator operators managing Berachain staking pools, including deployment, operations, and emergency procedures
  - - meta
    - property: og:description
      content: Complete guide for validator operators managing Berachain staking pools, including deployment, operations, and emergency procedures
---

# Staking Pools Operator Guide

This guide covers everything validator operators need to know about deploying, managing, and operating Berachain staking pools.

## Prerequisites

Before setting up a staking pool, ensure you have:

### Technical Requirements

- **Validator Node**: Operational Berachain validator
- **Ethereum Wallet**: For contract deployment and management transactions
- **Beacon API Access**: Running beacon-kit node with HTTP API enabled (`[beacon-kit.node-api]` in `app.toml`)
- **Command Line Tools**: `curl`, `jq` for API interactions and JSON parsing

### Knowledge Requirements

- **Smart Contract Interactions**: Experience with blockchain transactions
- **Validator Operations**: Understanding of Berachain consensus
- **Key Management**: Secure handling of validator and admin keys
- **Monitoring Setup**: Operational monitoring and alerting systems

### Financial Requirements

- **Initial Deposit**: Minimum 10k BERA for pool activation
- **Gas Funds**: ETH for contract deployment and operations
- **Emergency Reserves**: Additional BERA for potential issues

## Staking Pool Deployment

### Step 1: Deploy Pool Contracts

Use the `StakingPoolContractsFactory` to deploy all required contracts:

```solidity
// Call factory.deployStakingPoolContracts()
function deployStakingPoolContracts(
    bytes memory pubkey,           // Your validator pubkey
    address validatorAdmin,        // Admin address for pool management
    address defaultSharesRecipient // Initial shares recipient (typically you)
) external returns (
    address smartOperator,
    address stakingPool,
    address stakingRewardsVault,
    address withdrawalRequestERC721,
    address withdrawalVault,
    address incentiveCollector
)
```

**Important**: Save all returned contract addresses for future operations.

### Step 2: Verify Contract Deployment

Confirm contracts were deployed correctly:

```javascript
// Check that contracts are deployed
const contracts = await factory.getCoreContracts(pubkey);
console.log("Smart Operator:", contracts.smartOperator);
console.log("Staking Pool:", contracts.stakingPool);
// ... verify all addresses are non-zero
```

### Step 3: Configure Validator with Pool Contracts

**BEFORE** activating the pool, you must register your validator with the pool contracts as operator and withdrawal credentials:

```bash
# Set up environment variables from your deployed contracts
SMART_OPERATOR_ADDRESS=<from_step_1_deployment>
WITHDRAWAL_VAULT_ADDRESS=<from_step_1_deployment>
VALIDATOR_PUBKEY=<your_cometbft_pubkey>  # From: beacond deposit validator-keys
BEACON_DEPOSIT_ADDR="0x4242424242424242424242424242424242424242"  # BeaconDeposit contract
GENESIS_ROOT=<your_genesis_root>  # From: beacond genesis validator-root

# Create withdrawal credentials (0x01 prefix + 11 zero bytes + withdrawal vault address)
WITHDRAWAL_CREDENTIALS="0x010000000000000000000000${WITHDRAWAL_VAULT_ADDRESS#0x}"

# Generate deposit signature using beacond
STAKE_AMOUNT_ETH="10000"
STAKE_AMOUNT_GWEI="${STAKE_AMOUNT_ETH}000000000"

beacond deposit create-validator \
    $WITHDRAWAL_CREDENTIALS \
    $STAKE_AMOUNT_GWEI \
    -g $GENESIS_ROOT

# Extract signature from output
DEPOSIT_SIGNATURE="0x..." # from beacond output

# Register validator with pool contracts
cast send $BEACON_DEPOSIT_ADDR 'deposit(bytes,bytes,bytes,address)' \
    "$VALIDATOR_PUBKEY" \
    "$WITHDRAWAL_CREDENTIALS" \
    "$DEPOSIT_SIGNATURE" \
    "$SMART_OPERATOR_ADDRESS" \
    --value "${STAKE_AMOUNT_ETH}ether" \
    --private-key $PRIVATE_KEY
```

This establishes:

- **Operator**: `smartOperator` contract manages your validator operations
- **Withdrawal Credentials**: `withdrawalVault` receives consensus layer withdrawals
- **Pubkey**: Links your CometBFT validator node to the staking pool

:::warning Critical Setup Step
You **must** complete this validator registration **before** proceeding to Step 5. The `activateStakingPool()` function will **verify** this setup was done correctly - it does not set up the validator for you.
:::

### Step 4: Verify Validator Registration

Verify that your validator is correctly registered and shows as "pending" status in the beacon validator list:

```bash
# Set your beacon node API endpoint (ensure beacon API is enabled)
BEACON_API_URL="http://localhost:3500"
VALIDATOR_PUBKEY="0x..." # Your validator pubkey from Step 3

# Query the validator list to find your validator
curl -s "${BEACON_API_URL}/eth/v1/beacon/states/head/validators" | \
    jq --arg pubkey "$VALIDATOR_PUBKEY" '.data[] | select(.validator.pubkey == $pubkey)'

# More targeted query - check if validator exists and get its status
VALIDATOR_STATUS=$(curl -s "${BEACON_API_URL}/eth/v1/beacon/states/head/validators" | \
    jq -r --arg pubkey "$VALIDATOR_PUBKEY" '.data[] | select(.validator.pubkey == $pubkey) | .status')

if [ "$VALIDATOR_STATUS" = "pending_initialized" ] || [ "$VALIDATOR_STATUS" = "pending_queued" ]; then
    echo "✅ Validator found with pending status: $VALIDATOR_STATUS"

    # Get validator index for Step 5
    VALIDATOR_INDEX=$(curl -s "${BEACON_API_URL}/eth/v1/beacon/states/head/validators" | \
        jq -r --arg pubkey "$VALIDATOR_PUBKEY" '.data[] | select(.validator.pubkey == $pubkey) | .index')

    echo "Validator index: $VALIDATOR_INDEX"

    # Verify withdrawal credentials match your withdrawal vault
    WITHDRAWAL_CREDS=$(curl -s "${BEACON_API_URL}/eth/v1/beacon/states/head/validators" | \
        jq -r --arg pubkey "$VALIDATOR_PUBKEY" '.data[] | select(.validator.pubkey == $pubkey) | .validator.withdrawal_credentials')

    echo "Withdrawal credentials: $WITHDRAWAL_CREDS"
    echo "Expected: 0x010000000000000000000000${WITHDRAWAL_VAULT_ADDRESS#0x}"

    if [ "$WITHDRAWAL_CREDS" = "0x010000000000000000000000${WITHDRAWAL_VAULT_ADDRESS#0x}" ]; then
        echo "✅ Withdrawal credentials match withdrawal vault"
    else
        echo "❌ Withdrawal credentials mismatch!"
        exit 1
    fi

elif [ "$VALIDATOR_STATUS" = "null" ] || [ -z "$VALIDATOR_STATUS" ]; then
    echo "❌ Validator not found in beacon state. Check your BeaconDeposit transaction."
    exit 1
else
    echo "❌ Validator has unexpected status: $VALIDATOR_STATUS"
    exit 1
fi
```

:::info Expected Validator Status
After completing Step 3 (BeaconDeposit), your validator should appear in the beacon validator list with one of these pending statuses:

- **pending_initialized**: Validator deposit received and queued for activation
- **pending_queued**: Validator is in the activation queue

If the validator shows as "active_ongoing" or other statuses, you may have already activated it previously.
:::

### Step 5: Activate Pool

Activate the staking pool now that your validator is confirmed to be registered with pending status:

```bash
# Using the validator information from Step 4
cast send <FACTORY_ADDRESS> "activateStakingPool(bytes,bytes,uint64,uint256)" \
    $VALIDATOR_PUBKEY \
    $WITHDRAWAL_CREDENTIALS \
    $VALIDATOR_INDEX \
    $INITIAL_DEPOSIT_AMOUNT \
    --private-key $PRIVATE_KEY
```

:::info What Activation Does
The `activateStakingPool()` function verifies that:

- Your validator exists in the beacon state with pending status
- Your validator's withdrawal credentials match the `withdrawalVault` contract
- The initial deposit amount matches your Step 3 BeaconDeposit transaction

Once activated, users can begin depositing BERA to your staking pool and receive stBERA tokens in return.
:::

## Pool Management

### Role-Based Access Control

Your staking pool uses multiple administrative roles:

#### Governance (DEFAULT_ADMIN_ROLE)

- **Scope**: Ultimate admin control
- **Capabilities**:
  - Upgrade contracts
  - Pause/unpause pools (emergency controls)
  - Change manager roles
  - Trigger full withdrawals
  - Force BGT unboost and burn

#### Validator Admin (VALIDATOR_ADMIN_ROLE)

- **Scope**: Your operational control
- **Capabilities**:
  - Manage reward allocation
  - Set commission rates
  - Assign sub-roles

#### Reward Allocation Manager

- **Scope**: BGT reward management
- **Capabilities**:
  - Configure reward allocation weights
  - Update cutting board settings

#### Commission Manager

- **Scope**: Fee management
- **Capabilities**:
  - Set validator commission rates
  - Adjust staker fee percentages

### Operational Tasks

#### Managing BGT Rewards

Your `SmartOperator` contract automatically handles BGT operations:

```solidity
// Queue BGT boost (called automatically)
smartOperator.queueBoost();

// Activate boost (permissionless)
smartOperator.activateBoost();

// Check BGT balance
uint256 bgtBalance = smartOperator.balanceOfBGT();
```

#### Setting Reward Allocations

Configure how block rewards are distributed:

```solidity
// Set reward allocation weights
IBeraChef.Weight[] memory weights = new IBeraChef.Weight[](2);
weights[0] = IBeraChef.Weight(vaultAddress1, 5000); // 50%
weights[1] = IBeraChef.Weight(vaultAddress2, 5000); // 50%

smartOperator.queueRewardsAllocation(startBlock, weights);
```

#### Managing Commission Rates

Set your validator commission:

```solidity
// Set 5% commission (500 basis points)
smartOperator.queueValCommission(500);
```

#### Claiming Incentives

Harvest incentive rewards from BGT boosting:

```solidity
// Get rewards from BGT staker
uint256 rewards = smartOperator.getStakerRewards();
// Rewards automatically transferred to incentive collector
```

## Emergency Procedures

### Manual Pause Controls

:::tip Enhanced Pausability Feature
The upcoming admin pausability feature provides governance with enhanced emergency controls.
:::

Governance can manually pause your staking pool during emergency situations:

```solidity
// Emergency pause (governance only)
stakingPool.pause();

// Resume operations (governance only)
stakingPool.unpause();
```

#### When Pause May Be Triggered

- Smart contract vulnerabilities discovered
- Oracle system malfunctions
- Consensus layer issues affecting validators
- Extreme market conditions requiring investigation
- Security incidents requiring immediate response

#### Impact of Pause

- **New Deposits**: Temporarily disabled via `submit()` function
- **Existing Stakes**: Remain active and continue earning rewards
- **Withdrawals**: Continue to process normally
- **BGT Operations**: Continue as normal
- **Reward Collection**: Continues automatically

#### Recovery Process

1. **Investigation**: Governance and validator operators investigate issue
2. **Resolution**: Address underlying problem
3. **Testing**: Verify systems are functioning correctly
4. **Communication**: Update users on status
5. **Unpause**: Governance executes unpause transaction

### Automatic Emergency Triggers

#### Full Exit Scenarios

Your pool will automatically trigger a full exit when:

1. **Below Minimum Balance**: Total deposits fall below 250k BERA
2. **Large Withdrawal**: Single withdrawal would bring pool below minimum

#### Full Exit Process

When triggered, the system automatically:

1. **Queue Drop Boost**: All BGT boost positions are queued for dropping
2. **Freeze Assets**: Total assets frozen at current value
3. **Transfer Buffers**: Buffered assets moved to withdrawal vault
4. **Transfer Rewards**: Staking rewards moved to withdrawal vault
5. **Pause Pool**: New deposits disabled
6. **Enable Withdrawals**: Users can finalize withdrawal requests

### Manual Emergency Actions

#### Triggering Full Exit

Governance can manually trigger full exit:

```solidity
// Force full exit (governance only)
stakingPool.triggerFullExit();
```

#### BGT Emergency Management

In emergencies, governance can:

```solidity
// Drop all BGT boost
smartOperator.queueDropBoost();

// Redeem BGT for BERA
smartOperator.redeem(receiver, amount);
```

## Pool Monitoring

### Key Metrics

Monitor these key metrics for your pool:

#### Pool Health

- **Total Deposits**: Current deposits vs minimum/maximum limits
- **Buffered Assets**: Pending deposits awaiting consensus layer
- **Active Status**: Pool activation and operational status
- **Pause Status**: Emergency pause state

#### Validator Performance

- **BGT Balance**: Accumulated BGT rewards
- **Boost Status**: BGT boost queue and activation status
- **Commission Earnings**: Validator revenue from pool operations
- **Reward Allocation**: Distribution across reward vaults

#### User Activity

- **Deposit Volume**: User engagement and growth
- **Withdrawal Requests**: Exit demand and processing
- **stBERA Price**: Validator staking share price appreciation over time

### Pool Status Dashboard

Monitor your pool status through:

```javascript
// Check pool operational status
const isPaused = await stakingPool.paused();
const totalDeposits = await stakingPool.totalDeposits();
const isFullExited = await stakingPool.isFullExited();

// Verify BGT operations
const bgtBalance = await smartOperator.balanceOfBGT();
const unboostedBalance = await smartOperator.unboostedBalance();
```

## Troubleshooting

### Common Issues

#### Pool Deployment Fails

- **Cause**: Insufficient gas or incorrect parameters
- **Solution**: Verify parameters and increase gas limit

#### Activation Fails

- **Cause**: Invalid proofs or validator not properly registered with pool contracts
- **Solution**:
  - Verify you completed Step 3 validator registration with BeaconDeposit
  - Check that operator is set to smartOperator: `cast call $BEACON_DEPOSIT_ADDR 'getOperator(bytes)' $VALIDATOR_PUBKEY`
  - Regenerate proofs using the beacon API
  - Ensure initialDepositAmount matches your Step 3 deposit

#### Proof Generation Fails

- **Cause**: Beacon API not accessible or validator index not found
- **Solution**:
  - Check beacon API is enabled in `app.toml`: `[beacon-kit.node-api]`
  - Verify node is synced: `curl http://localhost:3500/eth/v1/beacon/states/head/finality_checkpoints`
  - Confirm validator index exists: `curl http://localhost:3500/eth/v1/beacon/states/head/validators/${YOUR_VALIDATOR_INDEX}`

#### BGT Boost Not Working

- **Cause**: Insufficient BGT balance or queue issues
- **Solution**: Check BGT balance and queue status

#### Beacon API Unavailable

- **Cause**: Node API not configured or node not running
- **Solution**:
  - Enable beacon API in `app.toml`
  - Restart beacon node
  - Check firewall/port configuration (default port 3500)

### Getting Help

#### Documentation

- [Berachain Discord](https://discord.gg/berachain) - Community support
- [GitHub Issues](https://github.com/berachain) - Technical issues
- [Validator FAQ](/nodes/faq) - Common validator questions

#### Emergency Contacts

- **Governance**: For emergency pause/unpause requests
- **Community**: For operational questions and best practices

## Best Practices

### Security

- **Key Management**: Use hardware wallets for admin keys
- **Multi-Sig**: Consider multi-sig for validator admin operations
- **Regular Audits**: Monitor contract interactions
- **Backup Plans**: Maintain emergency response procedures

### Operations

- **Pool Management**: Regularly review pool settings and performance
- **User Communication**: Keep stakers informed of any changes
- **Documentation**: Maintain records of pool configuration
- **Emergency Preparedness**: Understand emergency procedures and contacts

### User Relations

- **Transparency**: Communicate operational changes clearly
- **Performance**: Maintain high validator performance
- **Responsiveness**: Address user concerns promptly
- **Education**: Help users understand pool mechanics

This comprehensive guide provides the foundation for successfully operating a Berachain staking pool. As the system evolves, stay updated with the latest documentation and community best practices.
