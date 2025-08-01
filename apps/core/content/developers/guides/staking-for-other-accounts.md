---
head:
  - - meta
    - property: og:title
      content: Staking for Other Accounts
  - - meta
    - name: description
      content: Guide to using stakeOnBehalf functionality in Berachain Reward Vaults
  - - meta
    - property: og:description
      content: Guide to using stakeOnBehalf functionality in Berachain Reward Vaults
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Staking for Other Accounts

## Introduction

The `stakeOnBehalf` function in [Reward Vaults](/developers/contracts/reward-vault) allows any account to stake tokens directly for another account without requiring delegation permissions. This feature enables new integration patterns and simplifies certain protocol workflows.

::: tip User Guide Available
For end users wanting to understand how protocols can claim BGT on their behalf, see the [BGT claiming guide](/learn/guides/claim-bgt#protocol-claiming).
:::

## Key Differences from Existing Staking Methods

### `stake()` vs `delegateStake()` vs `stakeOnBehalf()`

| Method            | Who Stakes        | Who Owns Tokens   | Who Controls Staked Balance | Use Case                         |
| ----------------- | ----------------- | ----------------- | --------------------------- | -------------------------------- |
| `stake()`         | Account holder    | Account holder    | Account holder              | Direct user staking              |
| `delegateStake()` | Delegate/Protocol | Delegate/Protocol | Delegate can withdraw       | Protocol staking with control    |
| `stakeOnBehalf()` | Any account       | Staker            | Account holder              | Protocol staking without control |

**Key Distinction**: With `stakeOnBehalf`, the staking account provides the tokens, but the beneficiary account gains full control over the staked balance and can withdraw at any time.

## Use Cases

### 1. Protocol-to-Protocol Integrations

Protocols can stake tokens for users as part of their core functionality:

```solidity
// A lending protocol stakes collateral for borrowers
function depositCollateral(uint256 amount) external {
    collateralToken.transferFrom(msg.sender, address(this), amount);

    // Stake on behalf of the user in the reward vault
    collateralToken.approve(address(rewardVault), amount);
    rewardVault.stakeOnBehalf(msg.sender, amount);

    // Update internal accounting
    userCollateral[msg.sender] += amount;
}
```

### 2. Automated Staking Services

Services can automatically stake newly acquired tokens for users:

```solidity
// An automated DCA service that stakes purchased tokens
function executeDCA(address user, address token, uint256 amount) external {
    // Purchase tokens through DCA logic
    uint256 purchased = _executeDCAPurchase(user, token, amount);

    // Automatically stake for the user
    IERC20(token).approve(address(rewardVault), purchased);
    rewardVault.stakeOnBehalf(user, purchased);
}
```

### 3. Custodial Solutions

Custodial services can stake on behalf of their customers while maintaining user ownership:

```solidity
// A custodial service staking for customers
function stakeForCustomer(address customer, uint256 amount) external onlyAuthorized {
    require(customerBalances[customer] >= amount, "Insufficient balance");

    stakingToken.approve(address(rewardVault), amount);
    rewardVault.stakeOnBehalf(customer, amount);

    customerBalances[customer] -= amount;
}
```

## Implementation Examples

### Basic Integration

```solidity
pragma solidity ^0.8.26;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IRewardVault} from "./interfaces/IRewardVault.sol";

contract StakingService {
    IRewardVault public immutable rewardVault;
    IERC20 public immutable stakingToken;

    constructor(address _rewardVault, address _stakingToken) {
        rewardVault = IRewardVault(_rewardVault);
        stakingToken = IERC20(_stakingToken);
    }

    /// @notice Stake tokens on behalf of a user
    /// @param beneficiary The account that will own the staked tokens
    /// @param amount The amount to stake
    function stakeForUser(address beneficiary, uint256 amount) external {
        // Transfer tokens from caller
        stakingToken.transferFrom(msg.sender, address(this), amount);

        // Approve and stake on behalf of beneficiary
        stakingToken.approve(address(rewardVault), amount);
        rewardVault.stakeOnBehalf(beneficiary, amount);
    }
}
```

### Advanced Integration with Access Control

```solidity
pragma solidity ^0.8.26;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IRewardVault} from "./interfaces/IRewardVault.sol";

contract ManagedStakingService is AccessControl {
    bytes32 public constant STAKER_ROLE = keccak256("STAKER_ROLE");

    IRewardVault public immutable rewardVault;
    IERC20 public immutable stakingToken;

    mapping(address => uint256) public stakedForUser;

    event StakedForUser(address indexed beneficiary, address indexed staker, uint256 amount);

    constructor(address _rewardVault, address _stakingToken) {
        rewardVault = IRewardVault(_rewardVault);
        stakingToken = IERC20(_stakingToken);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    /// @notice Stake tokens on behalf of a user (only authorized stakers)
    function stakeOnBehalfOf(
        address beneficiary,
        uint256 amount
    ) external onlyRole(STAKER_ROLE) {
        stakingToken.transferFrom(msg.sender, address(this), amount);
        stakingToken.approve(address(rewardVault), amount);
        rewardVault.stakeOnBehalf(beneficiary, amount);

        stakedForUser[beneficiary] += amount;
        emit StakedForUser(beneficiary, msg.sender, amount);
    }

    /// @notice Batch stake for multiple users
    function batchStakeOnBehalf(
        address[] calldata beneficiaries,
        uint256[] calldata amounts
    ) external onlyRole(STAKER_ROLE) {
        require(beneficiaries.length == amounts.length, "Length mismatch");

        uint256 totalAmount = 0;
        for (uint256 i = 0; i < amounts.length; i++) {
            totalAmount += amounts[i];
        }

        stakingToken.transferFrom(msg.sender, address(this), totalAmount);

        for (uint256 i = 0; i < beneficiaries.length; i++) {
            stakingToken.approve(address(rewardVault), amounts[i]);
            rewardVault.stakeOnBehalf(beneficiaries[i], amounts[i]);
            stakedForUser[beneficiaries[i]] += amounts[i];
            emit StakedForUser(beneficiaries[i], msg.sender, amounts[i]);
        }
    }
}
```

## Security Considerations

### 1. Token Approval Management

Always ensure proper token approvals and consider using safe approval patterns:

```solidity
// Safe approval pattern
function safeStakeOnBehalf(address beneficiary, uint256 amount) external {
    stakingToken.transferFrom(msg.sender, address(this), amount);

    // Reset allowance first (for tokens like USDT)
    stakingToken.approve(address(rewardVault), 0);
    stakingToken.approve(address(rewardVault), amount);

    rewardVault.stakeOnBehalf(beneficiary, amount);
}
```

### 2. Access Control

Implement appropriate access controls for who can stake on behalf of others:

```solidity
modifier onlyAuthorizedStaker() {
    require(authorizedStakers[msg.sender], "Not authorized to stake");
    _;
}
```

### 3. Front-Running Protection

Consider implementing protection against front-running in sensitive operations:

```solidity
// Use commit-reveal or similar patterns for sensitive staking operations
mapping(bytes32 => StakeCommit) public stakeCommits;

struct StakeCommit {
    address staker;
    uint256 timestamp;
    bool executed;
}
```

## Gas Optimization Tips

### 1. Batch Operations

When staking for multiple users, batch operations to save gas:

```solidity
function batchStakeOnBehalf(
    address[] calldata beneficiaries,
    uint256[] calldata amounts
) external {
    // Single transferFrom for total amount
    uint256 total = 0;
    for (uint256 i = 0; i < amounts.length; i++) {
        total += amounts[i];
    }
    stakingToken.transferFrom(msg.sender, address(this), total);

    // Individual stakes
    for (uint256 i = 0; i < beneficiaries.length; i++) {
        stakingToken.approve(address(rewardVault), amounts[i]);
        rewardVault.stakeOnBehalf(beneficiaries[i], amounts[i]);
    }
}
```

### 2. Pre-approved Contracts

For frequent operations, consider pre-approving maximum amounts:

```solidity
constructor(address _rewardVault, address _stakingToken) {
    rewardVault = IRewardVault(_rewardVault);
    stakingToken = IERC20(_stakingToken);

    // Pre-approve maximum amount to save gas on each stake
    stakingToken.approve(_rewardVault, type(uint256).max);
}
```

## Interface Definition

```solidity
interface IRewardVault {
    /// @notice Stake tokens on behalf of another account
    /// @param account The account to stake for
    /// @param amount The amount of tokens to stake
    function stakeOnBehalf(address account, uint256 amount) external;

    /// @notice Check staked balance for an account
    /// @param account The account to check
    /// @return The staked balance
    function balanceOf(address account) external view returns (uint256);
}
```

## Integration Examples

### Viem Integration

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

// Stake on behalf of a user
async function stakeOnBehalf(beneficiaryAddress: string, amount: bigint) {
  // First approve the staking token
  const approveRequest = await publicClient.simulateContract({
    address: "0x...", // Staking token address
    abi: erc20Abi,
    functionName: "approve",
    args: ["0x...", amount] // Reward Vault address, amount
  });

  await walletClient.writeContract(approveRequest.request);

  // Then stake on behalf
  const stakeRequest = await publicClient.simulateContract({
    address: "0x...", // Reward Vault address
    abi: rewardVaultAbi,
    functionName: "stakeOnBehalf",
    args: [beneficiaryAddress, amount]
  });

  const hash = await walletClient.writeContract(stakeRequest.request);
  return hash;
}
```

### EthersJS Integration

```javascript
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("https://rpc.berachain.com");
const signer = new ethers.Wallet(privateKey, provider);

async function stakeOnBehalf(beneficiaryAddress, amount) {
  const stakingToken = new ethers.Contract(tokenAddress, stakingTokenAbi, signer);

  const rewardVault = new ethers.Contract(vaultAddress, rewardVaultAbi, signer);

  // Approve staking token
  const approveTx = await stakingToken.approve(vaultAddress, amount);
  await approveTx.wait();

  // Stake on behalf of beneficiary
  const stakeTx = await rewardVault.stakeOnBehalf(beneficiaryAddress, amount);
  await stakeTx.wait();

  console.log(`Staked ${amount} for ${beneficiaryAddress}`);
  return stakeTx.hash;
}
```

### Foundry Testing Example

```solidity
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IRewardVault} from "../src/interfaces/IRewardVault.sol";

contract StakeOnBehalfTest is Test {
    IRewardVault rewardVault;
    IERC20 stakingToken;
    address user1 = makeAddr("user1");
    address user2 = makeAddr("user2");
    address staker = makeAddr("staker");

    function setUp() public {
        // Setup contracts (implementation specific)
        rewardVault = IRewardVault(/* deployed address */);
        stakingToken = IERC20(/* token address */);
    }

    function testStakeOnBehalf() public {
        uint256 stakeAmount = 100e18;

        // Mint tokens to staker
        deal(address(stakingToken), staker, stakeAmount);

        // Staker stakes on behalf of user1
        vm.startPrank(staker);
        stakingToken.approve(address(rewardVault), stakeAmount);
        rewardVault.stakeOnBehalf(user1, stakeAmount);
        vm.stopPrank();

        // Verify user1 has the staked balance
        assertEq(rewardVault.balanceOf(user1), stakeAmount);

        // Verify user1 can withdraw (they control the balance)
        vm.prank(user1);
        rewardVault.withdraw(stakeAmount);
        assertEq(rewardVault.balanceOf(user1), 0);
    }

    function testBatchStakeOnBehalf() public {
        address[] memory beneficiaries = new address[](3);
        uint256[] memory amounts = new uint256[](3);

        beneficiaries[0] = user1;
        beneficiaries[1] = user2;
        beneficiaries[2] = makeAddr("user3");

        amounts[0] = 100e18;
        amounts[1] = 200e18;
        amounts[2] = 150e18;

        uint256 totalAmount = amounts[0] + amounts[1] + amounts[2];

        // Mint tokens to staker
        deal(address(stakingToken), staker, totalAmount);

        vm.startPrank(staker);
        stakingToken.approve(address(rewardVault), totalAmount);

        // Stake for each beneficiary
        for (uint256 i = 0; i < beneficiaries.length; i++) {
            rewardVault.stakeOnBehalf(beneficiaries[i], amounts[i]);
            assertEq(rewardVault.balanceOf(beneficiaries[i]), amounts[i]);
        }

        vm.stopPrank();
    }
}
```

### Deployment Script

```solidity
// Foundry deployment script
pragma solidity ^0.8.26;

import "forge-std/Script.sol";
import "./interfaces/IRewardVault.sol";

contract StakeOnBehalfScript is Script {
    function run() external {
        vm.startBroadcast();

        IRewardVault rewardVault = IRewardVault(0x...);
        IERC20 stakingToken = IERC20(0x...);

        address beneficiary = 0x...; // Address to stake for
        uint256 amount = 100e18;     // Amount to stake

        // Approve and stake
        stakingToken.approve(address(rewardVault), amount);
        rewardVault.stakeOnBehalf(beneficiary, amount);

        console.log("Staked", amount, "for", beneficiary);

        vm.stopBroadcast();
    }
}
```

## Best Practices

1. **Clear Permissions**: Ensure users understand who can stake on their behalf
2. **Event Logging**: Emit comprehensive events for transparency
3. **Gas Efficiency**: Use batch operations when possible
4. **Error Handling**: Implement proper error handling and revert messages
5. **Documentation**: Clearly document the trust model and permissions

## Related Documentation

**Contract References:**

- [Reward Vault Contract](/developers/contracts/reward-vault) - Complete API documentation
- [`stakeOnBehalf` function](/developers/contracts/reward-vault#stakeonbehalf) - Function reference

**Integration Guides:**

- [Advanced PoL Integration](/developers/guides/advanced-pol) - Non-ERC20 protocols
- [PoL Integration Quickstart](/developers/quickstart/pol-integration) - Getting started
- [Partial Reward Claims](/developers/guides/partial-reward-claims) - Complementary feature

**User Guides:**

- [BGT Claiming Guide](/learn/guides/claim-bgt#protocol-claiming) - End user perspective on protocol claiming
