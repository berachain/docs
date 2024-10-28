---
head:
  - - meta
    - property: og:title
      content: Advanced PoL Integration
  - - meta
    - name: description
      content: Proof of Liquidity Integration Guide for Non-ERC20 Protocols
  - - meta
    - property: og:description
      content: Proof of Liquidity Integration Guide for Non-ERC20 Protocols
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Proof of Liquidity Integration Guide for Non-ERC20 Protocols

## Introduction

Users typically engage with Proof of Liquidity by staking ERC20 receipt tokens into [Reward Vaults](/learn/pol/rewardvaults) to earn `$BGT`. However, this approach may not be suitable for all protocols.

This guide demonstrates how to integrate Berachain's Proof of Liquidity (PoL) system for protocols who don't naturally produce stakeable ERC20 receipt tokens or otherwise need to track balances internally. For example, a perpetual futures exchange may wish to reward users who open trading positions with `$BGT`, and cease rewards when the position is closed.

By implementing this approach, such protocols can still participate in PoL, benefiting from the improved incentive efficiencies it provides.

:::warning
Note that this article provides only one possible workaround for integrating PoL with non-ERC20 protocols. The solution is not exhaustive and may not be suitable for all use cases.
:::

## Description of Approach

The described approach involves the creation of a dummy `StakingToken` that is staked in a PoL vault on behalf of users by a protocol. This dummy token is used to track the staked balances of users and is minted and burned by the protocol (operating through `ProtocolContract`) as users provide/withdraw their liquidity from the protocol.

The staked dummy token balance entitles users to earn `$BGT` as if they had staked an ERC20 receipt token in a PoL vault themselves. This approach is enabled by the `delegateStake` and `delegateWithdraw` methods in the [RewardVault](/developers/contracts/rewards-vault) contract.

## Requirements

Before beginning, make sure you have Foundry installed beforehand.

- [Foundry](https://book.getfoundry.sh/getting-started/installation)

## Project Setup

1. Initialize a new Forge project and install dependencies:

```bash
forge init pol-smart-stake --no-commit --no-git;
cd pol-smart-stake;
forge install OpenZeppelin/openzeppelin-contracts --no-commit --no-git;
```

2. Create a `remappings.txt` file for OpenZeppelin imports:

```bash
# FROM: ./pol-smart-stake

echo "@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/" > remappings.txt;
```

## Implement Contracts

#### 1. Create the dummy token contract at `src/StakingToken.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StakingToken is ERC20, Ownable {
    constructor() ERC20("StakingToken", "STK") Ownable(msg.sender) {}

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external onlyOwner {
        _burn(from, amount);
    }
}
```

This contract creates a dummy ERC20 token that will be used for staking in PoL vaults. Only the owner (`ProtocolContract`) can mint and burn tokens.

#### 2. Create a mock protocol contract at `src/ProtocolContract.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./StakingToken.sol";
import {IRewardVault, IRewardVaultFactory} from "./interfaces/IRewardVaults.sol";

contract ProtocolContract {
    StakingToken public stakingToken;
    IRewardVault public rewardVault;

    mapping(address => uint256) public userActivity;

    constructor(address _vaultFactory) {
        // Create new staking token
        stakingToken = new StakingToken();

        // Create vault for newly created token
        address vaultAddress = IRewardVaultFactory(_vaultFactory)
            .createRewardsVault(address(stakingToken));

        rewardVault = IRewardVault(vaultAddress);
    }

    function addActivity(address user, uint256 amount) external {
        // Protocol actions/logic here
        userActivity[user] += amount;

        // Mint StakingTokens
        stakingToken.mint(address(this), amount);

        // Stake tokens in RewardVault on behalf of user
        stakingToken.approve(address(rewardVault), amount);
        rewardVault.delegateStake(user, amount);
    }

    function removeActivity(address user, uint256 amount) external {
        // Protocol actions/logic here
        require(userActivity[user] >= amount, "Insufficient user activity");
        userActivity[user] -= amount;

        // Withdraw tokens from the RewardVault
        rewardVault.delegateWithdraw(user, amount);

        // Burn the withdrawn StakingTokens
        stakingToken.burn(address(this), amount);
    }
}
```

This contract is a simple representation of an arbitrary protocol's contract:

- `userActivity` represents the internal accounting and logic specific to that protocol
- The remainder of the `addActivity` and `removeActivity` methods mint and burn `StakingTokens`, and interacts with the relevant RewardVault to stake/unstake on behalf of users

#### 3. Add the PoL Interfaces at `src/interfaces/IRewardVaults.sol`:

```solidity
pragma solidity ^0.8.19;

interface IRewardVault {
    function delegateStake(address account, uint256 amount) external;

    function delegateWithdraw(address account, uint256 amount) external;

    function getTotalDelegateStaked(
        address account
    ) external view returns (uint256);

    function balanceOf(address account) external returns (uint256);
}

interface IRewardVaultFactory {
    function createRewardsVault(
        address stakingToken
    ) external returns (address);
}
```

These interfaces define the methods for spinning up a new RewardVault from the Factory contract, and for subsequently interacting with it.

## Testing the Integration

Now, we wire everything together with tests to ensure that the integration works as expected. Below is an example test suite for the `ProtocolContract` contract.

Feel free to look at each individual test to get a better idea on how successful scenarios are handled.

```solidity

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/ProtocolContract.sol";
import {IRewardVault, IRewardVaultFactory} from "../src/interfaces/IRewardVaults.sol";

contract ProtocolContractTest is Test {
    ProtocolContract public protocol;
    IRewardVault public rewardVault;

    address public user1 = address(0x1);
    address public user2 = address(0x2);

    function setUp() public {
        IRewardVaultFactory vaultFactory = IRewardVaultFactory(
                0x2B6e40f65D82A0cB98795bC7587a71bfa49fBB2B
            );
        protocol = new ProtocolContract(address(vaultFactory));
        rewardVault = protocol.rewardVault();
    }

    function testAddActivity() public {
        protocol.addActivity(user1, 1);
        assertEq(protocol.userActivity(user1), 1);
        assertEq(rewardVault.balanceOf(user1), 1);
    }

    function testRemoveActivity() public {
        protocol.addActivity(user1, 2);
        protocol.removeActivity(user1, 1);
        assertEq(protocol.userActivity(user1), 1);
        assertEq(rewardVault.balanceOf(user1), 1);
    }

    function testMultipleUsers() public {
        protocol.addActivity(user1, 1);
        protocol.addActivity(user2, 2);
        assertEq(rewardVault.balanceOf(user1), 1);
        assertEq(rewardVault.balanceOf(user2), 2);
    }
}
```

### Run the Test

Finally, we run the test to check that the integration works as expected:

```bash-vue
# FROM: ./pol-smart-stake

forge test --rpc-url {{config.testnet.rpcUrl}};

# [Expected Output]:
# [⠊] Compiling...x
# No files changed, compilation skipped

# Ran 3 tests for test/StakingToken.t.sol:ProtocolContractTest
# [PASS] testAddActivity() (gas: 252067)
# [PASS] testMultipleUsers() (gas: 371503)
# [PASS] testRemoveActivity() (gas: 272693)
# Suite result: ok. 3 passed; 0 failed; 0 skipped; finished in 1.73s (1.22ms CPU time)
```
