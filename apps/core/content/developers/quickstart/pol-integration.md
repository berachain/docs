# Integrating your dapp with Proof of Liquidity

## Flexible Design

From the perspective of an application on Berachain, the PoL system is fundamentally a mechanism that works in the following way:

1. A [Reward Vault](../../learn/pol/rewardvaults.md) smart contract that targets an ERC20 token
2. Lets users stake that token in the vault
3. Distributes BGT rewards proportionally to stakers

The dev work for all PoL integrations essentially boil down to:

1. Deploying a Reward Vault from the [factory contract](../contracts/rewards-vault-factory.md)
2. Design an ERC20 token that is minted when users perform actions you would like to incentivize
3. Have these ERC20 positions staked in your Reward Vault

All `RewardVault` contracts are deployed using the `RewardVaultFactory` contract and therefore follow a standardized implementation. Teams can't modify the RewardVault logic. This means all reward customization needs to happen at the staking token level, **not the vault level**. Determining allocation of rewards must happen at the staking token level, fully defined by your app. The vault only uses the ERC20 balances of the staking token to distribute BGT proportionally.

Below are some examples of this pattern. If you wanted to incentivize:

| Activity to incentivize    | ERC20 minting logic |
| -------- | ------- |
| Trading activity  | minting based on trading frequency/volume   |
| Content creation | minting based on post engagement metrics     |
| Gaming    | minting based on playtime/achievements    |
| NFT usage    | minting based on time NFTs are actively used   |
| Education   | minting based on course completion   |

The creativity comes in:

- What behavior you want to incentivize
- How you design the ERC20's minting logic to accurately capture that behavior
- How you prevent gaming of the system
- How you make the rewards meaningful enough to drive behavior while being sustainable

## Examples
Here are different examples that showcase how to think about using PoL to incentivize activity on your application:

- Trading activity rewards 
- Gameplay progression rewards
- DeFi positions rewards

### Example #1 - Activity-frequency rewards

In this example we'll consider an example where an application wants to incentivize users to make trades often while still considering the size of the trades to reduce spam. The core idea would be to create a staking token that represents active trading participation.

Here's how it works:
- ERC20 token representing active trading participation
- Tracks trades within a 7-day rolling window
- Awards points based on trading frequency and size


Core Mechanics:
- Minimum 5 trades required in the window for rewards
- Daily cap of 20 trades to prevent gaming
- 24-hour cooling period between score mints
- Score calculation considers both trade frequency and size
- Automatic staking of newly minted tokens in the reward vault


```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./IRewardVault.sol";

interface IBerachainRewardsVault {
    function delegateStake(address user, uint256 amount) external;
    function delegateWithdraw(address user, uint256 amount) external;
    function getDelegateStake(
        address account,
        address delegate
    ) external view returns (uint256);
}

/**
 * @title TraderScore
 * @notice ERC20 token that represents trading activity scores
 */
contract TraderScore is ERC20, Ownable, ReentrancyGuard {
    // Constants for scoring
    uint256 public constant TRADE_WINDOW = 7 days;
    uint256 public constant MIN_TRADES_FOR_REWARD = 5;
    uint256 public constant MAX_TRADES_PER_DAY = 20;
    uint256 public constant BASE_POINTS_PER_TRADE = 100; // 1 token = 100 points

    // Trading activity tracking
    struct TraderInfo {
        uint256[] tradeTimes;
        uint256 lastMintTimestamp;
        uint256 currentScore;
    }

    mapping(address => TraderInfo) public traderInfo;
    IBerachainRewardsVault public immutable rewardVault;
    
    event TradeRecorded(address indexed trader, uint256 tradeSize, uint256 timestamp);
    event ScoreMinted(address indexed trader, uint256 score, uint256 timestamp);
    
    constructor(address _rewardVault) ERC20("Trader Score", "SCORE") {
        rewardVault = IBerachainRewardsVault(_rewardVault);
    }

    /**
     * @notice Records a trade for a user and potentially mints score tokens
     * @param trader Address of the trader
     * @param tradeSize Size of the trade in base currency
     */
    function recordTrade(address trader, uint256 tradeSize) external onlyOwner nonReentrant {
        TraderInfo storage info = traderInfo[trader];
        uint256 currentTime = block.timestamp;

        // Add new trade
        info.tradeTimes.push(currentTime);
        emit TradeRecorded(trader, tradeSize, currentTime);

        // Calculate active trades in window
        uint256 activeTradeCount = getActiveTradeCount(trader);

        // Check if eligible for scoring
        if (activeTradeCount >= MIN_TRADES_FOR_REWARD && 
            currentTime - info.lastMintTimestamp >= 1 days) {
            
            uint256 newScore = _calculateScore(info, tradeSize, activeTradeCount);
            
            if (newScore > 0) {
                // Mint and stake following the correct pattern
                _mintAndDelegateStake(trader, newScore);
                
                info.lastMintTimestamp = currentTime;
                info.currentScore = newScore;
                
                emit ScoreMinted(trader, newScore, currentTime);
            }
        }
    }

    /**
     * @notice Calculates trading score based on frequency and size
     */
    function _calculateScore(
        TraderInfo storage info, 
        uint256 tradeSize, 
        uint256 activeTradeCount
    ) internal view returns (uint256) {
        // Calculate daily average trades
        uint256 avgDailyTrades = (activeTradeCount * 1 days) / TRADE_WINDOW;
        if (avgDailyTrades > MAX_TRADES_PER_DAY) {
            avgDailyTrades = MAX_TRADES_PER_DAY;
        }

        // Score based on trade frequency and size
        uint256 frequencyMultiplier = avgDailyTrades * BASE_POINTS_PER_TRADE;
        uint256 sizeMultiplier = (tradeSize * BASE_POINTS_PER_TRADE) / (1 ether);
        
        return (frequencyMultiplier + sizeMultiplier) / BASE_POINTS_PER_TRADE;
    }

    /**
     * @notice Mints tokens to contract and delegates stake to user
     */
    function _mintAndDelegateStake(address trader, uint256 newScore) internal {
    uint256 currentScore = traderInfo[trader].currentScore;
    uint256 scoreIncrease = newScore - currentScore;  // Calculate only the increase
    
    if (scoreIncrease > 0) {
        _mint(address(this), scoreIncrease);  // Mint only the difference
        approve(address(rewardVault), scoreIncrease);
        rewardVault.delegateStake(trader, scoreIncrease);
    }
}

    /**
     * @notice View function to get active trades in window
     */
    function getActiveTradeCount(address trader) public view returns (uint256) {
        TraderInfo storage info = traderInfo[trader];
        uint256 cutoffTime = block.timestamp - TRADE_WINDOW;
        uint256 count = 0;
        
        for (uint256 i = 0; i < info.tradeTimes.length; i++) {
            if (info.tradeTimes[i] >= cutoffTime) {
                count++;
            }
        }
        
        return count;
    }

    /**
     * @notice View function to get all trade timestamps for a trader
     */
    function getTradeHistory(address trader) external view returns (uint256[] memory) {
        return traderInfo[trader].tradeTimes;
    }

    /**
     * @notice View function to check if trader is eligible for score minting
     */
    function isEligibleForScoring(address trader) external view returns (bool) {
        TraderInfo storage info = traderInfo[trader];
        uint256 activeTradeCount = getActiveTradeCount(trader);
        
        return activeTradeCount >= MIN_TRADES_FOR_REWARD && 
               block.timestamp - info.lastMintTimestamp >= 1 days;
    }
}
```

Integration:

- Deploy `TraderScore` contract with your `BerachainRewardsVault` address (note: must implement `IBerachainRewardsVault` interface)
- After each trade, call `recordTrade` with trader's address and trade size
- Contract automatically mints tokens to itself and delegates stakes to users via `BerachainRewardsVault` when thresholds are met
- The contract holds the tokens and delegates them to users, rather than users directly staking


### Example #2 - Gameplay Progression Rewards

This system incentivizes three key engagement metrics:

**Daily Playtime**

- Target of 30 minutes daily playtime
- Additional rewards for playing up to 4 hours
- Prevents gaming by capping max daily rewards

**Streak Maintenance**

- Rewards consecutive days of play
- Streak multiplier up to 7 days
- Streak breaks if player misses a day

**Progression**

- Points for each level completed
- Level points stack with daily/streak bonuses
- Encourages both regular play and advancement

The scoring system:
- Base daily score for meeting minimum playtime (1000 points)
- Level bonus (100 points per level)
- Streak multiplier (up to 70% bonus for 7-day streak)
- Extra playtime bonus (up to 2x for hitting max daily time)

``` solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

interface IBerachainRewardsVault {
    function delegateStake(address user, uint256 amount) external;
    function delegateWithdraw(address user, uint256 amount) external;
    function getDelegateStake(
        address account,
        address delegate
    ) external view returns (uint256);
}

/**
 * @title GameEngagement
 * @notice Tracks and rewards consistent gameplay and progression
 */
contract GameEngagement is ERC20, Ownable, ReentrancyGuard {
    // Engagement tracking constants
    uint256 public constant DAILY_SESSION_TARGET = 30 minutes;
    uint256 public constant MAX_DAILY_PLAYTIME = 4 hours;
    uint256 public constant POINTS_PER_LEVEL = 100;
    uint256 public constant STREAK_MULTIPLIER = 10;
    uint256 public constant BASE_DAILY_POINTS = 1000;

    struct PlayerStats {
        uint256 lastPlayTimestamp;
        uint256 dailyPlayTime;
        uint256 currentLevel;
        uint256 playStreak;      // Consecutive days played
        uint256 lastMintTimestamp;
        uint256 lastDailyReset;
        uint256 currentScore;    // Track current score for incremental minting
    }

    mapping(address => PlayerStats) public playerStats;
    IBerachainRewardsVault public immutable rewardVault;

    event SessionRecorded(address indexed player, uint256 duration, uint256 timestamp);
    event LevelCompleted(address indexed player, uint256 level, uint256 timestamp);
    event EngagementScoreMinted(address indexed player, uint256 score, uint256 timestamp);

    constructor(address _rewardVault) ERC20("Game Engagement Score", "PLAY") {
        rewardVault = IBerachainRewardsVault(_rewardVault);
    }

    /**
     * @notice Records a gameplay session
     * @param player Address of the player
     * @param duration Duration of play session in seconds
     */
    function recordGameSession(address player, uint256 duration) external onlyOwner nonReentrant {
        PlayerStats storage stats = playerStats[player];
        uint256 currentTime = block.timestamp;
        
        // Check if we need to reset daily stats
        if (block.timestamp >= stats.lastDailyReset + 1 days) {
            _resetDailyStats(stats);
        }

        // Update play time (cap at max daily)
        uint256 newDailyTime = stats.dailyPlayTime + duration;
        stats.dailyPlayTime = newDailyTime > MAX_DAILY_PLAYTIME ? MAX_DAILY_PLAYTIME : newDailyTime;
        
        // Update streak if this is their first session of the day
        if (stats.lastPlayTimestamp < stats.lastDailyReset) {
            stats.playStreak++;
        }
        
        stats.lastPlayTimestamp = currentTime;
        emit SessionRecorded(player, duration, currentTime);

        // Try to mint score if eligible
        _checkAndMintScore(player, stats);
    }

    /**
     * @notice Records completion of a new level
     * @param player Address of the player
     * @param newLevel The new level achieved
     */
    function recordLevelUp(address player, uint256 newLevel) external onlyOwner nonReentrant {
        PlayerStats storage stats = playerStats[player];
        require(newLevel > stats.currentLevel, "Invalid level");
        
        uint256 currentTime = block.timestamp;
        stats.currentLevel = newLevel;
        
        emit LevelCompleted(player, newLevel, currentTime);
        
        // Try to mint score if eligible
        _checkAndMintScore(player, stats);
    }

    function _resetDailyStats(PlayerStats storage stats) private {
        // If they didn't play yesterday, reset streak
        if (stats.lastPlayTimestamp < stats.lastDailyReset) {
            stats.playStreak = 0;
        }
        
        stats.dailyPlayTime = 0;
        stats.lastDailyReset = block.timestamp;
    }

    function _checkAndMintScore(address player, PlayerStats storage stats) private {
        // Can only mint once per day
        if (block.timestamp - stats.lastMintTimestamp < 1 days) {
            return;
        }

        // Must meet minimum daily play time
        if (stats.dailyPlayTime < DAILY_SESSION_TARGET) {
            return;
        }

        uint256 newScore = _calculateScore(stats);
        uint256 scoreIncrease = newScore - stats.currentScore;

        if (scoreIncrease > 0) {
            _mintAndDelegateStake(player, scoreIncrease);
            stats.currentScore = newScore;
            stats.lastMintTimestamp = block.timestamp;
            emit EngagementScoreMinted(player, scoreIncrease, block.timestamp);
        }
    }

    function _calculateScore(PlayerStats memory stats) private pure returns (uint256) {
        // Base score for meeting daily target
        uint256 score = BASE_DAILY_POINTS;
        
        // Add points for current level
        score += stats.currentLevel * POINTS_PER_LEVEL;
        
        // Multiply by streak bonus (cap at 7 days)
        uint256 streakBonus = stats.playStreak > 7 ? 7 : stats.playStreak;
        score += (score * streakBonus * STREAK_MULTIPLIER) / 100;
        
        // Bonus for exceeding daily target (up to 2x for max playtime)
        if (stats.dailyPlayTime > DAILY_SESSION_TARGET) {
            uint256 extraTime = stats.dailyPlayTime - DAILY_SESSION_TARGET;
            uint256 maxExtraTime = MAX_DAILY_PLAYTIME - DAILY_SESSION_TARGET;
            score += (score * extraTime) / maxExtraTime;
        }
        
        return score;
    }

    /**
     * @notice Mints tokens to contract and delegates stake to user
     * @dev Following the pattern from OnlyPaws.sol
     */
    function _mintAndDelegateStake(address player, uint256 amount) private {
        _mint(address(this), amount);  // 1. Mint to contract
        approve(address(rewardVault), amount);  // 2. Contract approves vault
        rewardVault.delegateStake(player, amount);  // 3. Delegate stake to user
    }

    // View functions for game client
    function getPlayerStats(address player) external view returns (
        uint256 dailyPlayTime,
        uint256 currentLevel,
        uint256 playStreak,
        bool eligibleForMint
    ) {
        PlayerStats memory stats = playerStats[player];
        return (
            stats.dailyPlayTime,
            stats.currentLevel,
            stats.playStreak,
            _isEligibleForMint(stats)
        );
    }

    function _isEligibleForMint(PlayerStats memory stats) private view returns (bool) {
        return stats.dailyPlayTime >= DAILY_SESSION_TARGET &&
               block.timestamp - stats.lastMintTimestamp >= 1 days;
    }
}
```

Integration:

- Game server calls `recordGameSession` periodically during gameplay
- `recordLevelUp` called when player completes a new level

When players are eligible, tokens are:
- Minted to the contract
- Automatically delegated to players via `BerachainRewardsVault`

Daily reset ensures players must come back each day to maintain their streak
Players accumulate score progressively rather than receiving the full amount each mint

### Example #3 - Incentivizing Trading Positions

Here's how this system works:

- Creates an ERC20 token representing healthy perps positions, as described below
- Token is automatically staked in RewardVault to earn BGT


Token Minting Based On:
- Position Size: 1 token per $1000 in position size
- Health Ratio: Must maintain at least 110% collateral
- Duration: Bonus for longer-held positions
- Optimal Maintenance: 50% bonus for keeping 150%+ health ratio


``` solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IRewardVault.sol";

/**
 * @title PerpsStakingToken
 * @notice Mints tokens based on perpetual futures position health, automatically staking them for BGT rewards
 */
contract PerpsStakingToken is ERC20, Ownable, ReentrancyGuard {
    struct Position {
        uint256 size;           // Position size in USD
        uint256 collateral;     // Collateral amount in USD
        uint256 openTimestamp;  // When position was opened
        bool isLong;           // Long or short position
        bool isActive;         // Position status
        uint256 lastTokenMintTimestamp; // Last time tokens were minted
    }

    uint256 public constant MIN_HEALTH_RATIO = 110;    // 1.1x minimum health ratio (110%)
    uint256 public constant OPTIMAL_HEALTH_RATIO = 150; // 1.5x optimal health ratio (150%)
    uint256 public constant MIN_POSITION_SIZE = 100e18; // Minimum $100 position
    uint256 public constant MINT_INTERVAL = 1 days;    // How often tokens can be minted

    IRewardVault public immutable rewardVault;
    mapping(address => mapping(uint256 => Position)) public positions; // user => positionId => Position
    mapping(address => uint256) public positionCount;

    event PositionOpened(address indexed user, uint256 indexed positionId, uint256 size, bool isLong);
    event PositionModified(address indexed user, uint256 indexed positionId, uint256 newSize, uint256 newCollateral);
    event PositionClosed(address indexed user, uint256 indexed positionId);
    event TokensStaked(address indexed user, uint256 amount);

    constructor(address _rewardVault) ERC20("Perps Position Token", "pPOS") {
        rewardVault = IRewardVault(_rewardVault);
    }

    /**
     * @notice Called by perps platform when a new position is opened
     */
    function openPosition(
        address user,
        uint256 size,
        uint256 collateral,
        bool isLong
    ) external onlyOwner nonReentrant {
        require(size >= MIN_POSITION_SIZE, "Position too small");
        require(collateral > 0, "No collateral");

        uint256 positionId = positionCount[user];
        positions[user][positionId] = Position({
            size: size,
            collateral: collateral,
            openTimestamp: block.timestamp,
            isLong: isLong,
            isActive: true,
            lastTokenMintTimestamp: block.timestamp
        });

        positionCount[user]++;
        emit PositionOpened(user, positionId, size, isLong);
    }

    /**
     * @notice Called when position size or collateral changes
     */
    function modifyPosition(
        address user,
        uint256 positionId,
        uint256 newSize,
        uint256 newCollateral
    ) external onlyOwner nonReentrant {
        Position storage position = positions[user][positionId];
        require(position.isActive, "Position not active");

        // Mint tokens before updating position
        _mintTokensForPosition(user, positionId);

        position.size = newSize;
        position.collateral = newCollateral;

        emit PositionModified(user, positionId, newSize, newCollateral);
    }

    /**
     * @notice Called when position is closed
     */
    function closePosition(
        address user,
        uint256 positionId
    ) external onlyOwner nonReentrant {
        Position storage position = positions[user][positionId];
        require(position.isActive, "Position not active");

        // Final token minting before closing
        _mintTokensForPosition(user, positionId);
        position.isActive = false;

        emit PositionClosed(user, positionId);
    }

    /**
     * @notice Mints tokens based on position health and duration and stakes them for the user
     */
    function _mintTokensForPosition(address user, uint256 positionId) internal {
        Position storage position = positions[user][positionId];
        
        if (!position.isActive || 
            block.timestamp < position.lastTokenMintTimestamp + MINT_INTERVAL) {
            return;
        }

        // Calculate health ratio
        uint256 healthRatio = (position.collateral * 100) / position.size;
        
        if (healthRatio >= MIN_HEALTH_RATIO) {
            // Base token amount is 1 token per $1000 in position size per day
            uint256 tokens = (position.size) / 1000e18;
            
            // Bonus for optimal health ratio
            if (healthRatio >= OPTIMAL_HEALTH_RATIO) {
                tokens = (tokens * 150) / 100; // 50% bonus
            }
            
            // Time multiplier (up to 2x for positions held 10+ days)
            uint256 daysOpen = (block.timestamp - position.openTimestamp) / 1 days;
            if (daysOpen > 0) {
                uint256 timeMultiplier = 100 + (daysOpen * 10); // +10% per day
                timeMultiplier = timeMultiplier > 200 ? 200 : timeMultiplier;
                tokens = (tokens * timeMultiplier) / 100;
            }

            // Mint tokens to this contract
            _mint(address(this), tokens);
            
            // Approve and delegate stake to the user
            approve(address(rewardVault), tokens);
            rewardVault.delegateStake(user, tokens);
            
            emit TokensStaked(user, tokens);
        }

        position.lastTokenMintTimestamp = block.timestamp;
    }

    /**
     * @notice Allows users to manually mint tokens for their positions
     */
    function mintPositionTokens(uint256 positionId) external nonReentrant {
        _mintTokensForPosition(msg.sender, positionId);
    }
}
```
Integration:
- Perps platform calls `openPosition` when positions are created
- `modifyPosition` on size/collateral changes
- `closePosition` when positions are closed
- Users can trigger their own minting via `mintPositionTokens`