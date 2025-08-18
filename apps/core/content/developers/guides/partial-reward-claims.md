---
head:
  - - meta
    - property: og:title
      content: Partial Reward Claims
  - - meta
    - name: description
      content: Guide to using getPartialReward functionality for BGT splitting in Berachain Reward Vaults
  - - meta
    - property: og:description
      content: Guide to using getPartialReward functionality for BGT splitting in Berachain Reward Vaults
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Partial Reward Claims (BGT Splitting)

## Introduction

The `getPartialReward` function in [Reward Vaults](/developers/contracts/reward-vault) allows users to claim specific amounts of their earned BGT rewards instead of claiming all accumulated rewards at once. This enables more granular reward management and opens up new strategies for BGT utilization.

::: tip User Guide Available
For end users wanting to understand BGT claiming options, see our [user guide on claiming BGT rewards](/learn/guides/claim-bgt).
:::

## Key Differences from Full Reward Claims

### `getReward()` vs `getPartialReward()`

| Method               | Amount Claimed   | Remaining Rewards     | Use Case              |
| -------------------- | ---------------- | --------------------- | --------------------- |
| `getReward()`        | All accumulated  | 0                     | Full withdrawal       |
| `getPartialReward()` | Specified amount | Remaining after claim | Controlled withdrawal |

**Key Benefits**:

- Fine-grained control over reward timing
- Enables streaming and vesting strategies
- Supports dollar-cost averaging patterns
- Reduces gas costs for large reward balances

## Use Cases

### 1. Streaming Reward Systems

Protocols can implement reward streaming by claiming partial amounts over time:

```solidity
contract RewardStreamer {
    struct Stream {
        uint256 totalAmount;
        uint256 claimedAmount;
        uint256 startTime;
        uint256 duration;
        address recipient;
    }

    mapping(address => Stream) public streams;
    IRewardVault public rewardVault;

    function createStream(
        address user,
        uint256 duration,
        address recipient
    ) external {
        uint256 totalRewards = rewardVault.earned(user);
        require(totalRewards > 0, "No rewards to stream");

        streams[user] = Stream({
            totalAmount: totalRewards,
            claimedAmount: 0,
            startTime: block.timestamp,
            duration: duration,
            recipient: recipient
        });
    }

    function claimStreamedRewards(address user) external {
        Stream storage stream = streams[user];
        require(stream.totalAmount > 0, "No active stream");

        uint256 elapsed = block.timestamp - stream.startTime;
        uint256 claimable = (stream.totalAmount * elapsed) / stream.duration;
        claimable = claimable > stream.totalAmount ? stream.totalAmount : claimable;

        uint256 toClaim = claimable - stream.claimedAmount;
        if (toClaim > 0) {
            stream.claimedAmount += toClaim;
            rewardVault.getPartialReward(user, stream.recipient, toClaim);
        }
    }
}
```

### 2. Dollar-Cost Averaging (DCA) BGT Management

Automatically convert BGT to BERA over time to reduce price impact:

```solidity
contract BGTDCAManager {
    struct DCAConfig {
        uint256 intervalSeconds;
        uint256 amountPerInterval;
        uint256 lastClaim;
        bool active;
    }

    mapping(address => DCAConfig) public dcaConfigs;
    IRewardVault public rewardVault;

    function setupDCA(
        uint256 intervalSeconds,
        uint256 amountPerInterval
    ) external {
        dcaConfigs[msg.sender] = DCAConfig({
            intervalSeconds: intervalSeconds,
            amountPerInterval: amountPerInterval,
            lastClaim: block.timestamp,
            active: true
        });
    }

    function executeDCA(address user) external {
        DCAConfig storage config = dcaConfigs[user];
        require(config.active, "DCA not active");
        require(
            block.timestamp >= config.lastClaim + config.intervalSeconds,
            "Too early"
        );

        uint256 available = rewardVault.earned(user);
        uint256 toClaim = available < config.amountPerInterval
            ? available
            : config.amountPerInterval;

        if (toClaim > 0) {
            config.lastClaim = block.timestamp;
            rewardVault.getPartialReward(user, address(this), toClaim);

            // Convert BGT to BERA and send back to user
            _convertBGTToBERA(toClaim, user);
        }
    }
}
```

### 3. Threshold-Based Reward Management

Claim rewards only when they reach certain thresholds:

```solidity
contract ThresholdRewardManager {
    mapping(address => uint256) public thresholds;
    IRewardVault public rewardVault;

    event RewardsClaimed(address indexed user, uint256 amount);

    function setThreshold(uint256 _threshold) external {
        thresholds[msg.sender] = _threshold;
    }

    function claimIfThresholdMet(address user) external {
        uint256 threshold = thresholds[user];
        require(threshold > 0, "No threshold set");

        uint256 earned = rewardVault.earned(user);
        if (earned >= threshold) {
            rewardVault.getPartialReward(user, user, threshold);
            emit RewardsClaimed(user, threshold);
        }
    }

    function claimMultipleThresholds(address user, uint256 count) external {
        uint256 threshold = thresholds[user];
        require(threshold > 0, "No threshold set");

        uint256 totalToClaim = threshold * count;
        uint256 earned = rewardVault.earned(user);
        require(earned >= totalToClaim, "Insufficient rewards");

        rewardVault.getPartialReward(user, user, totalToClaim);
        emit RewardsClaimed(user, totalToClaim);
    }
}
```

## Implementation Examples

### Basic Partial Reward Claiming

```solidity
pragma solidity ^0.8.26;

import {IRewardVault} from "./interfaces/IRewardVault.sol";

contract PartialRewardManager {
    IRewardVault public immutable rewardVault;

    constructor(address _rewardVault) {
        rewardVault = IRewardVault(_rewardVault);
    }

    /// @notice Claim a specific amount of rewards
    /// @param amount The amount of BGT to claim
    /// @param recipient The address to receive the BGT
    function claimPartialReward(uint256 amount, address recipient) external {
        uint256 available = rewardVault.earned(msg.sender);
        require(amount <= available, "Amount exceeds available rewards");

        rewardVault.getPartialReward(msg.sender, recipient, amount);
    }

    /// @notice Claim a percentage of available rewards
    /// @param percentage The percentage to claim (in basis points, e.g., 1000 = 10%)
    /// @param recipient The address to receive the BGT
    function claimPercentageReward(
        uint256 percentage,
        address recipient
    ) external {
        require(percentage <= 10000, "Percentage too high"); // Max 100%

        uint256 available = rewardVault.earned(msg.sender);
        uint256 amount = (available * percentage) / 10000;

        if (amount > 0) {
            rewardVault.getPartialReward(msg.sender, recipient, amount);
        }
    }
}
```

### Advanced Vesting Contract

```solidity
pragma solidity ^0.8.26;

import {IRewardVault} from "./interfaces/IRewardVault.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract BGTVestingManager is Ownable {
    struct VestingSchedule {
        uint256 totalAmount;        // Total BGT to vest
        uint256 claimedAmount;      // Amount already claimed
        uint256 startTime;          // When vesting starts
        uint256 duration;           // Vesting duration in seconds
        uint256 cliffDuration;      // Cliff period in seconds
        address beneficiary;        // Who receives the vested BGT
        bool revocable;            // Can the vesting be revoked
        bool revoked;              // Has the vesting been revoked
    }

    mapping(address => VestingSchedule) public vestingSchedules;
    IRewardVault public immutable rewardVault;

    event VestingCreated(address indexed user, uint256 amount, uint256 duration);
    event VestingClaimed(address indexed user, uint256 amount);
    event VestingRevoked(address indexed user);

    constructor(address _rewardVault) {
        rewardVault = IRewardVault(_rewardVault);
    }

    function createVestingSchedule(
        address user,
        uint256 duration,
        uint256 cliffDuration,
        address beneficiary,
        bool revocable
    ) external onlyOwner {
        require(vestingSchedules[user].totalAmount == 0, "Vesting already exists");

        uint256 totalRewards = rewardVault.earned(user);
        require(totalRewards > 0, "No rewards to vest");

        vestingSchedules[user] = VestingSchedule({
            totalAmount: totalRewards,
            claimedAmount: 0,
            startTime: block.timestamp,
            duration: duration,
            cliffDuration: cliffDuration,
            beneficiary: beneficiary,
            revocable: revocable,
            revoked: false
        });

        emit VestingCreated(user, totalRewards, duration);
    }

    function claimVestedRewards(address user) external {
        VestingSchedule storage schedule = vestingSchedules[user];
        require(schedule.totalAmount > 0, "No vesting schedule");
        require(!schedule.revoked, "Vesting revoked");
        require(
            block.timestamp >= schedule.startTime + schedule.cliffDuration,
            "Cliff period not ended"
        );

        uint256 vestedAmount = _getVestedAmount(schedule);
        uint256 claimableAmount = vestedAmount - schedule.claimedAmount;

        if (claimableAmount > 0) {
            schedule.claimedAmount += claimableAmount;
            rewardVault.getPartialReward(user, schedule.beneficiary, claimableAmount);
            emit VestingClaimed(user, claimableAmount);
        }
    }

    function revokeVesting(address user) external onlyOwner {
        VestingSchedule storage schedule = vestingSchedules[user];
        require(schedule.revocable, "Vesting not revocable");
        require(!schedule.revoked, "Already revoked");

        // Claim any vested amount up to this point
        uint256 vestedAmount = _getVestedAmount(schedule);
        uint256 claimableAmount = vestedAmount - schedule.claimedAmount;

        if (claimableAmount > 0) {
            schedule.claimedAmount += claimableAmount;
            rewardVault.getPartialReward(user, schedule.beneficiary, claimableAmount);
        }

        schedule.revoked = true;
        emit VestingRevoked(user);
    }

    function _getVestedAmount(
        VestingSchedule memory schedule
    ) internal view returns (uint256) {
        if (schedule.revoked) {
            return schedule.claimedAmount;
        }

        uint256 elapsed = block.timestamp - schedule.startTime;
        if (elapsed < schedule.cliffDuration) {
            return 0;
        }

        if (elapsed >= schedule.duration) {
            return schedule.totalAmount;
        }

        return (schedule.totalAmount * elapsed) / schedule.duration;
    }

    function getVestingInfo(address user) external view returns (
        uint256 totalAmount,
        uint256 claimedAmount,
        uint256 vestedAmount,
        uint256 claimableAmount
    ) {
        VestingSchedule memory schedule = vestingSchedules[user];
        totalAmount = schedule.totalAmount;
        claimedAmount = schedule.claimedAmount;
        vestedAmount = _getVestedAmount(schedule);
        claimableAmount = vestedAmount - claimedAmount;
    }
}
```

## Error Handling

The `getPartialReward` function can revert with `AmountGreaterThanReward` if the requested amount exceeds available rewards:

```solidity
contract SafePartialClaimer {
    IRewardVault public rewardVault;

    function safeClaimPartial(
        address user,
        uint256 amount,
        address recipient
    ) external returns (bool success) {
        uint256 available = rewardVault.earned(user);

        // Check if amount is available
        if (amount > available) {
            return false;
        }

        try rewardVault.getPartialReward(user, recipient, amount) {
            return true;
        } catch {
            return false;
        }
    }

    function claimMaxAvailable(
        address user,
        uint256 maxAmount,
        address recipient
    ) external returns (uint256 claimed) {
        uint256 available = rewardVault.earned(user);
        uint256 toClaim = available < maxAmount ? available : maxAmount;

        if (toClaim > 0) {
            rewardVault.getPartialReward(user, recipient, toClaim);
            return toClaim;
        }
        return 0;
    }
}
```

## Gas Optimization Considerations

### Batch Partial Claims

For users with multiple reward positions, batch operations can save gas:

```solidity
contract BatchPartialClaimer {
    struct ClaimRequest {
        address user;
        uint256 amount;
        address recipient;
    }

    function batchClaimPartial(ClaimRequest[] calldata requests) external {
        for (uint256 i = 0; i < requests.length; i++) {
            ClaimRequest memory req = requests[i];
            // Verify caller has permission (operator or user)
            require(
                msg.sender == req.user ||
                rewardVault.operator(req.user) == msg.sender,
                "Not authorized"
            );

            uint256 available = rewardVault.earned(req.user);
            if (req.amount <= available) {
                rewardVault.getPartialReward(req.user, req.recipient, req.amount);
            }
        }
    }
}
```

### Operator Integration

Operators can manage partial rewards on behalf of users:

```solidity
contract OperatorRewardManager {
    mapping(address => mapping(address => bool)) public operatorApprovals;

    modifier onlyApprovedOperator(address user) {
        require(
            msg.sender == user ||
            operatorApprovals[user][msg.sender] ||
            rewardVault.operator(user) == msg.sender,
            "Not authorized"
        );
        _;
    }

    function approveOperator(address operator) external {
        operatorApprovals[msg.sender][operator] = true;
    }

    function claimPartialForUser(
        address user,
        uint256 amount,
        address recipient
    ) external onlyApprovedOperator(user) {
        rewardVault.getPartialReward(user, recipient, amount);
    }
}
```

## Interface Definition

```solidity
interface IRewardVault {
    /// @notice Claim a partial reward amount
    /// @param account The account to get the reward for
    /// @param recipient The address to send the reward to
    /// @param amount The amount of the reward to claim
    function getPartialReward(
        address account,
        address recipient,
        uint256 amount
    ) external;

    /// @notice Get the total earned rewards for an account
    /// @param account The account to check
    /// @return The amount of earned rewards
    function earned(address account) external view returns (uint256);

    /// @notice Get the operator for an account
    /// @param account The account to check
    /// @return The operator address
    function operator(address account) external view returns (address);
}
```

## Testing Example

```solidity
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import {IRewardVault} from "../src/interfaces/IRewardVault.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PartialRewardTest is Test {
    IRewardVault rewardVault;
    IERC20 bgt;
    address user = makeAddr("user");
    address recipient = makeAddr("recipient");

    function setUp() public {
        // Setup contracts (implementation specific)
        rewardVault = IRewardVault(/* deployed address */);
        bgt = IERC20(/* BGT address */);
    }

    function testPartialRewardClaim() public {
        // Setup: user has earned rewards
        uint256 totalEarned = 1000e18;
        uint256 partialAmount = 300e18;

        // Verify user has rewards
        assertEq(rewardVault.earned(user), totalEarned);

        // Claim partial amount
        vm.prank(user);
        rewardVault.getPartialReward(user, recipient, partialAmount);

        // Verify recipient received BGT
        assertEq(bgt.balanceOf(recipient), partialAmount);

        // Verify remaining rewards
        assertEq(rewardVault.earned(user), totalEarned - partialAmount);
    }

    function testPartialRewardFailsIfAmountTooHigh() public {
        uint256 totalEarned = 1000e18;
        uint256 excessiveAmount = 1500e18;

        vm.prank(user);
        vm.expectRevert("AmountGreaterThanReward");
        rewardVault.getPartialReward(user, recipient, excessiveAmount);
    }
}
```

## Best Practices

1. **Always Check Available Balance**: Verify earned rewards before claiming
2. **Handle Zero Amounts**: Check for zero claim amounts to avoid unnecessary transactions
3. **Implement Access Control**: Ensure proper permissions for operator-based claims
4. **Use Events**: Emit events for transparency and tracking
5. **Gas Optimization**: Batch operations when possible
6. **Error Handling**: Implement proper error handling for failed claims

## Integration Patterns

### Frontend Integration Examples

#### Viem Integration

```typescript
import { createPublicClient, createWalletClient, http, parseEther } from "viem";
import { berachain } from "viem/chains";

const publicClient = createPublicClient({
  chain: berachain,
  transport: http()
});

const walletClient = createWalletClient({
  chain: berachain,
  transport: http()
});

// Check available rewards
const availableRewards = await publicClient.readContract({
  address: "0x...", // Reward Vault address
  abi: rewardVaultAbi,
  functionName: "earned",
  args: [userAddress]
});

// Claim 25% of available rewards
const claimAmount = (availableRewards * 25n) / 100n;

// Execute partial claim
const { request } = await publicClient.simulateContract({
  address: "0x...", // Reward Vault address
  abi: rewardVaultAbi,
  functionName: "getPartialReward",
  args: [userAddress, recipientAddress, claimAmount]
});

const hash = await walletClient.writeContract(request);
```

#### EthersJS Integration

```javascript
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("https://rpc.berachain.com");
const signer = new ethers.Wallet(privateKey, provider);
const rewardVault = new ethers.Contract(vaultAddress, rewardVaultAbi, signer);

// Check available rewards
const availableRewards = await rewardVault.earned(userAddress);

// Claim 25% of available rewards
const claimAmount = availableRewards.mul(25).div(100);

// Execute partial claim
const tx = await rewardVault.getPartialReward(userAddress, recipientAddress, claimAmount);

await tx.wait();
console.log("Partial reward claimed:", tx.hash);
```

#### Foundry Integration

```solidity
// Test script for partial reward claiming
pragma solidity ^0.8.26;

import "forge-std/Script.sol";
import "./interfaces/IRewardVault.sol";

contract PartialClaimScript is Script {
    IRewardVault rewardVault = IRewardVault(0x...); // Vault address

    function run() external {
        vm.startBroadcast();

        address user = msg.sender;
        address recipient = msg.sender;

        // Check available rewards
        uint256 availableRewards = rewardVault.earned(user);
        console.log("Available rewards:", availableRewards);

        // Claim 25% of available rewards
        uint256 claimAmount = (availableRewards * 25) / 100;

        // Execute partial claim
        rewardVault.getPartialReward(user, recipient, claimAmount);

        console.log("Claimed amount:", claimAmount);

        vm.stopBroadcast();
    }
}
```

### Automated Strategies

```solidity
// Weekly claim automation
function autoClaimWeekly(address user) external {
    uint256 lastClaim = lastClaimTime[user];
    require(block.timestamp >= lastClaim + 1 weeks, "Too early");

    uint256 available = rewardVault.earned(user);
    uint256 weeklyAmount = weeklyClaimAmounts[user];
    uint256 toClaim = available < weeklyAmount ? available : weeklyAmount;

    if (toClaim > 0) {
        lastClaimTime[user] = block.timestamp;
        rewardVault.getPartialReward(user, user, toClaim);
    }
}
```

## Related Documentation

**Contract References:**

- [Reward Vault Contract](/developers/contracts/reward-vault) - Complete API documentation
- [`getPartialReward` function](/developers/contracts/reward-vault#getpartialreward) - Function reference
- [BGT Token Documentation](/developers/contracts/bgt-token) - Reward token details

**Integration Guides:**

- [Staking for Other Accounts](/developers/guides/staking-for-other-accounts) - Complementary feature
- [Advanced PoL Integration](/developers/guides/advanced-pol) - Non-ERC20 protocols

**User Guides:**

- [Claim BGT Rewards](/learn/guides/claim-bgt) - End user claiming guide
