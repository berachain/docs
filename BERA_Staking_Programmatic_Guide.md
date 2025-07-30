# How to Stake BERA Programmatically

## Contract Details

- **WBERAStakerVault**: `0x118D2cEeE9785eaf70C15Cd74CD84c9f8c3EeC9a`
- **WBERA Token**: `0x6969696969696969696969696969696969696969`
- **Network**: Berachain (same address for mainnet/testnet)

## Step-by-Step Code Guide

### Step 1: Setup

```javascript
// Import the vault ABI and connect to contract
const vaultAddress = "0x118D2cEeE9785eaf70C15Cd74CD84c9f8c3EeC9a";
const vault = new ethers.Contract(vaultAddress, vaultABI, signer);
```

### Step 2: Stake Native BERA

```javascript
// Deposit native BERA (recommended)
const amountToStake = ethers.utils.parseEther("100"); // 100 BERA
const receiver = "0x..."; // Your address

const tx = await vault.depositNative(amountToStake, receiver, {
  value: amountToStake // Must equal the amount
});
await tx.wait();
```

### Step 3: Check Your Position

```javascript
// Get your sWBERA balance
const sWBERABalance = await vault.balanceOf(receiver);
console.log("sWBERA shares:", ethers.utils.formatEther(sWBERABalance));

// Get your share of the vault
const totalAssets = await vault.totalAssets();
const totalSupply = await vault.totalSupply();
const yourShare = sWBERABalance.mul(totalAssets).div(totalSupply);
```

### Step 4: Withdraw (when ready)

```javascript
// Initiate withdrawal
const assetsToWithdraw = ethers.utils.parseEther("50"); // 50 BERA worth
const tx = await vault.withdraw(assetsToWithdraw, receiver, receiver);
await tx.wait();

// Wait 7 days, then complete withdrawal
const isNative = true; // true for BERA, false for WBERA
const completeTx = await vault.completeWithdrawal(isNative);
await completeTx.wait();
```

## Key Functions

- `depositNative(amount, receiver)` - Stake native BERA
- `deposit(amount, receiver)` - Stake WBERA
- `withdraw(assets, receiver, owner)` - Initiate withdrawal
- `completeWithdrawal(isNative)` - Complete after 7 days
- `balanceOf(account)` - Check sWBERA balance

## Important Notes

- **7-day unbonding period** for withdrawals
- **Only one withdrawal request** per address at a time
- **Auto-compounding** - no manual claiming needed
- **Native BERA deposits** automatically wrap to WBERA

That's it! Your BERA is now earning yield from PoL incentives. 🚀
