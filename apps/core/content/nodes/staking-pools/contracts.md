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

The staking pools system consists of several interconnected smart contracts that work together to provide liquid staking functionality. At the heart of the system is the **StakingPoolContractsFactory**, which serves as the deployment mechanism for all other contracts. This factory creates and manages the complete suite of contracts needed for each validator's staking pool.

The core functionality revolves around the **StakingPool** contract, which handles user deposits, share management, and the fundamental operations of the staking pool. Users interact primarily with this contract to stake their BERA tokens and receive stBERA shares in return. The StakingPool contract maintains the accounting for user positions and manages the conversion between BERA and stBERA shares.

Validator operations are coordinated through the **SmartOperator** contract, which manages the integration with Berachain's Proof of Liquidity system. This contract handles BGT boosting, reward allocation, commission management, and other validator-specific operations that require coordination with the broader Berachain ecosystem.

Supporting these core contracts are additional utilities such as the **StBERA** base contract for token implementation and the **ELWithdrawHelper** for execution layer withdrawal utilities, which define the common patterns used throughout the system.

## Contract Interactions

The staking pools system involves two main types of interactions, each serving different participants in the ecosystem.

Users primarily interact with the `StakingPool` contract for their staking activities. The most fundamental interaction is the `submit` function, which allows users to deposit BERA tokens and receive stBERA shares in return. Users can check their share balance using the `sharesOf` function, which returns the number of stBERA shares they hold. To see their total BERA balance including accumulated rewards, users can call the `balanceOf` function, which converts their shares back to the equivalent BERA amount.

Validators interact with multiple contracts to manage their staking pools. The initial setup begins with the `StakingPoolContractsFactory.deployStakingPoolContracts` function, which deploys all necessary contracts for a new validator. This function requires the validator's public key, withdrawal credentials, deposit signature, and administrative addresses. Once deployed, validators use the `SmartOperator` contract to manage ongoing operations, such as queuing commission rate changes with `queueValCommission` and setting up reward allocations through `queueRewardsAllocation`.

## Security Model

The staking pools system implements a comprehensive security model designed to protect user funds while maintaining operational flexibility for validators and administrators.

Access control is managed through a role-based system that provides granular permissions for different types of operations. The `DEFAULT_ADMIN_ROLE` provides governance control over contract upgrades and emergency actions, ensuring that the system can be maintained and updated as needed. Validators receive the `VALIDATOR_ADMIN_ROLE`, which grants them operational control over their specific staking pool while preventing interference with other validators' operations.

Specialized roles handle specific aspects of the system. The `REWARD_ALLOCATION_MANAGER_ROLE` manages BGT reward distribution, while the `COMMISSION_MANAGER_ROLE` handles fee management. BGT boost operations are controlled by the `BOOST_MANAGER_ROLE`, and incentive collection is managed by the `INCENTIVE_MANAGER_BOT_ROLE`. The `REDEEM_BOT_ROLE` handles BGT redemption operations, ensuring that these critical functions are properly isolated and controlled.

Emergency controls provide additional layers of protection. Contracts can be paused in emergency situations, allowing administrators to halt operations while issues are resolved. The system includes automatic full exit triggers that activate if the minimum balance threshold is breached, protecting users from potential losses. All contracts are upgradeable through a beacon proxy pattern, allowing governance to upgrade contracts if security issues are discovered or improvements are needed.

## Contract Documentation

Detailed documentation for each contract is available through the following reference materials. Each contract documentation provides comprehensive information about functions, events, errors, and usage patterns.

| Contract                        | Description                                             | Documentation                                          |
| ------------------------------- | ------------------------------------------------------- | ------------------------------------------------------ |
| **StakingPoolContractsFactory** | Deployment mechanism for all staking pool contracts     | [View Documentation](./StakingPoolContractsFactory.md) |
| **StakingPool**                 | Main staking functionality and user interactions        | [View Documentation](./core/StakingPool.md)            |
| **SmartOperator**               | Validator operations and Proof of Liquidity integration | [View Documentation](./core/SmartOperator.md)          |
| **WithdrawalVault**             | Withdrawal request processing and NFT-based tracking    | [View Documentation](./WithdrawalVault.md)             |
| **AccountingOracle**            | Consensus layer data validation and updates             | [View Documentation](./AccountingOracle.md)            |
| **StBERA**                      | Base contract for stBERA token implementation           | [View Documentation](./base/StBERA.md)                 |
| **ELWithdrawHelper**            | Execution layer withdrawal utilities (EIP-7002)         | [View Documentation](./helpers/ELWithdrawHelper.md)    |

## Support and Resources

The staking pools system is supported by comprehensive documentation, an active community, and dedicated technical support channels. This reference and related guides provide detailed information about using and integrating with the system. The Berachain community maintains active Discord channels and forums where users can ask questions and share experiences. Technical problems can be reported through GitHub issues, while urgent security matters should be directed to official security channels.

:::tip
When integrating with staking pool contracts, always verify contract addresses and test thoroughly on testnets before mainnet deployment.
:::

:::warning
The off-chain oracle and incentive management bot components are required for full functionality but are not yet implemented. These will be deployed separately and integrated with the staking pools system.
:::
