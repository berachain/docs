<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Repay $HONEY Loan

Repaying a loan in Berachain Bend involves using the `repay()` or `repayWithATokens` method of the Pool contract. This guide provides TypeScript examples for using these methods .

## Repaying Loan

### Example - `repay()`

This example illustrates a user repaying a loan with `$HONEY` using the `repay()` method.

```typescript-vue
//Note: Please don't treat this code as a working solution and the usage should be more as a "template" to suit your needs.

import { ethers } from "ethers";

// Connect to Berachain using the provided RPC URL
const provider = new ethers.providers.JsonRpcProvider(
  "{{config.mainnet.rpcUrl}}"
);
const signer = new ethers.Wallet("YOUR_PRIVATE_KEY", provider);

const poolAddress = "{{config.contracts.poolProxy.address}}";
const honeyAddress = "{{config.contracts.honey.address}}";
const repayAmount = ethers.utils.parseUnits("1000.0", 18); // Amount to repay

const poolAbi = [
  "function repay(address asset, uint256 amount, uint256 rateMode, address onBehalfOf) external returns (uint256)",
  "function repayWithATokens(address asset, uint256 amount, uint256 rateMode) external returns (uint256)",
];

const assetAbi = [
  "function approve(address spender, uint256 amount) external returns (bool)",
];

async function repayLoan() {
  try {
    const poolContract = new ethers.Contract(poolAddress, poolAbi, signer);
    const assetContract = new ethers.Contract(honeyAddress, assetAbi, signer);

    // Approve the pool to spend the repay amount
    await assetContract.approve(poolAddress, repayAmount);

    // Repay the loan
    const tx = await poolContract.repay(
      honeyAddress,
      repayAmount,
      2, // variable interest rate
      signer.address // repaying loan on behalf of this user
    );
    await tx.wait();
    console.log(`Repaid: ${tx.hash}`);
  } catch (error) {
    console.error("Error repaying loan:", error);
  }
}

repayLoan();
```

### Example - `repayWithATokens()`

This example illustrates a user repaying a loan with `$HONEY` using the `repayWithATokens()` method. This scenario is relevant where a user has `$HONEY`debt, but also holds`$aHONEY` from supplying `$HONEY`

```typescript
// Same setup as above...

// repay amount of HONEY debt using aHONEY tokens
poolContract.repayWithATokens(honeyAddress, amount, 2);
```
