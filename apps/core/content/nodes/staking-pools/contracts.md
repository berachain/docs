---
head:
  - - meta
    - property: og:title
      content: Staking Pools Smart Contract Reference
  - - meta
    - name: description
      content: Smart contract reference for Berachain staking pools
  - - meta
    - property: og:description
      content: Smart contract reference for Berachain staking pools
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Staking Pools Smart Contract Reference

This reference provides detailed information about the smart contracts that power Berachain's staking pools system. These contracts enable validators to offer liquid staking services to their communities.

## Contract Architecture

The staking pools system consists of several interconnected smart contracts:

### Core Contracts

- **[StakingPoolContractsFactory](./StakingPoolContractsFactory.sol/README.md)**: Deploys and manages all staking pool contracts
- **[StakingPool](./core/StakingPool.sol/README.md)**: Core contract for user deposits, share management, and pool operations
- **[SmartOperator](./core/SmartOperator.sol/README.md)**: Manages validator operations and PoL integration
- **[WithdrawalVault](./WithdrawalVault.sol/README.md)**: Handles withdrawal requests and processing
- **[StakingRewardsVault](./core/StakingRewardsVault.sol/README.md)**: Manages rewards and auto-compounding
- **[IncentiveCollector](./core/IncentiveCollector.sol/README.md)**: Handles incentive token collection and conversion
- **[AccountingOracle](./AccountingOracle.sol/README.md)**: Provides off-chain data validation

### Supporting Contracts

- **[WithdrawalRequestERC721](./core/WithdrawalRequestERC721.sol/README.md)**: ERC-721 contract for withdrawal request NFTs
- **[Deployer](./Deployer.sol/README.md)**: Contract deployment utilities
- **[Base Contracts](./base/)**: Shared base contracts and interfaces

## Key Features

### For Validators

- **Easy Deployment**: Factory contract deploys all necessary contracts
- **Automated Operations**: Smart contracts handle validator operations
- **Reward Management**: Automatic reward collection and distribution
- **Commission Control**: Configurable commission rates on user rewards

### For Users

- **Liquid Staking**: Stake BERA and receive shares representing your position
- **Auto-Compounding**: All rewards automatically reinvested
- **Flexible Withdrawals**: Request withdrawals at any time
- **Transparent Operations**: All operations are on-chain and verifiable

## Contract Interactions

### User Interactions

Users primarily interact with the `StakingPool` contract:

```solidity
// Deposit BERA to receive shares
function submit() external payable;

// Request withdrawal of shares
function requestWithdrawal(uint256 amountOfShares) external;

// Check share balance
function sharesOf(address account) external view returns (uint256);

// Check BERA balance (including rewards)
function balanceOf(address account) external view returns (uint256);
```

### Validator Interactions

Validators interact with multiple contracts:

```solidity
// Deploy staking pool contracts
StakingPoolContractsFactory.deployStakingPoolContracts(
    bytes memory pubkey,
    address admin,
    address defaultShareRecipient
);

// Set commission rate
SmartOperator.setValidatorCommissionRate(uint256 commissionRate);

// Configure reward allocation
SmartOperator.setRewardAllocation(
    address[] memory rewardVaults,
    uint256[] memory weights
);
```

### Oracle Interactions

The `AccountingOracle` provides off-chain data:

```solidity
// Update oracle data
function updateData(
    uint256 totalStakedBalance,
    uint256 effectiveBalance,
    uint256 withdrawalAmount,
    uint256 bgtToUnboostAndBurn
) external;

// Trigger funds management
function triggerFundsManagement() external;
```

## Security Model

### Access Control

Contracts use role-based access control (RBAC):

- **DEFAULT_ADMIN_ROLE**: Governance control (upgrades, emergency actions)
- **VALIDATOR_ADMIN_ROLE**: Validator operational control
- **REWARD_ALLOCATION_MANAGER_ROLE**: BGT reward management
- **COMMISSION_MANAGER_ROLE**: Fee management
- **BOOST_MANAGER_ROLE**: BGT boost operations
- **INCENTIVE_MANAGER_BOT_ROLE**: Incentive collection
- **REDEEM_BOT_ROLE**: BGT redemption operations

### Emergency Controls

- **Pause Mechanisms**: Contracts can be paused in emergency situations
- **Full Exit Triggers**: Automatic full exit if minimum balance breached
- **Upgradeable Contracts**: Governance can upgrade contracts if needed

## Integration Points

### Proof of Liquidity (PoL)

Contracts integrate with Berachain's PoL system:

- **BGT Management**: Automatic boost and unboost operations
- **Incentive Collection**: Claim and distribute PoL incentives
- **Reward Allocation**: Direct rewards to specific applications
- **Commission Management**: Validator fees on user rewards

### Consensus Layer

Contracts interact with the consensus layer:

- **Validator Registration**: Set operator and withdrawal credentials
- **Staking Operations**: Deposit and withdraw from consensus layer
- **Oracle Data**: Verify validator state and balances

## Contract Documentation

Detailed documentation for each contract is available in the following sections:

### Core Contracts

- [StakingPoolContractsFactory](./StakingPoolContractsFactory.sol/README.md) - Factory for deploying staking pool contracts
- [StakingPool](./core/StakingPool.sol/README.md) - Main staking pool contract
- [SmartOperator](./core/SmartOperator.sol/README.md) - Validator operations manager
- [WithdrawalVault](./WithdrawalVault.sol/README.md) - Withdrawal request handler
- [StakingRewardsVault](./core/StakingRewardsVault.sol/README.md) - Rewards management
- [IncentiveCollector](./core/IncentiveCollector.sol/README.md) - Incentive token collector
- [AccountingOracle](./AccountingOracle.sol/README.md) - Off-chain data validation

### Supporting Contracts

- [WithdrawalRequestERC721](./core/WithdrawalRequestERC721.sol/README.md) - Withdrawal request NFTs
- [Deployer](./Deployer.sol/README.md) - Deployment utilities
- [Base Contracts](./base/) - Shared interfaces and base contracts

### Interfaces

- [Interfaces](./interfaces/) - Contract interfaces and types
- [Libraries](./libraries/) - Shared libraries and utilities
- [Helpers](./helpers/) - Helper contracts and utilities

## Development Guidelines

### Contract Standards

All contracts follow established standards:

- **OpenZeppelin**: Use OpenZeppelin contracts for security
- **Solidity**: Latest stable Solidity version
- **Testing**: Comprehensive test coverage
- **Documentation**: NatSpec comments for all public functions

### Security Considerations

- **Access Control**: Granular role-based permissions
- **Input Validation**: Comprehensive parameter validation
- **Emergency Controls**: Pause and emergency exit mechanisms
- **Upgradeability**: Beacon proxy pattern for upgrades

### Integration Guidelines

- **Event Monitoring**: Monitor contract events for state changes
- **Error Handling**: Proper error handling for failed transactions
- **Gas Optimization**: Efficient gas usage for user operations
- **Oracle Dependencies**: Handle oracle failures gracefully

## Getting Started

### For Developers

1. **Review Contracts**: Start with the [StakingPool](./core/StakingPool.sol/README.md) contract
2. **Understand Architecture**: Study the contract interactions and data flow
3. **Test Integration**: Use test contracts to understand interactions
4. **Monitor Events**: Track contract events for state changes

### For Validators

1. **Deploy Contracts**: Use the [StakingPoolContractsFactory](./StakingPoolContractsFactory.sol/README.md)
2. **Configure Operations**: Set up commission rates and reward allocation
3. **Monitor Performance**: Track pool performance and user activity
4. **Manage Risk**: Understand emergency procedures and controls

### For Users

1. **Choose Pool**: Research validator reputation and pool performance
2. **Deposit BERA**: Use the `submit()` function to stake
3. **Monitor Position**: Track your share balance and rewards
4. **Request Withdrawal**: Use `requestWithdrawal()` when ready to exit

## Support and Resources

- **Documentation**: This reference and related guides
- **Community**: Berachain Discord and forums
- **Technical Support**: GitHub issues for technical problems
- **Security**: Official security channels for urgent matters

:::tip
When integrating with staking pool contracts, always verify contract addresses and test thoroughly on testnets before mainnet deployment.
:::

:::note
The off-chain oracle and incentive management bot components are required for full functionality but are not yet implemented. These will be deployed separately and integrated with the staking pools system.
:::
