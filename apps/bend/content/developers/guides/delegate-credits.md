<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Credit Delegation

Credit delegation allows a depositor to deposit funds in the protocol to earn interest, and delegate borrowing power (i.e. their credit) to other users.

The enforcement of the loan and its terms are agreed upon between the depositor and borrowers, which can be either off-chain via legal agreements or on-chain via smart contracts.

This enables:

- The supplier (aka delegator) to earn extra yield on top of the yield they already earn from the protocol.
- The borrowers (aka delegatees) to access an uncollateralized loan.

:::warning
<b>Warning</b><br/>
The _delegatee_ cannot abuse credit approval to liquidate _delegator_ i.e. if the borrow puts _delegator's_ position in HF < `HEALTH_FACTOR_LIQUIDATION_THRESHOLD`, then borrow will fail.
:::

## Approving the delegation

The [approveDelegation()](/developers/contracts/debttoken#approvedelegation) or [`delegationWithSig()`](/developers/contracts/debttoken#delegationwithsig) must be called by the supplier (delegator), approving the borrower (delegatee) a certain amount.

This is done for each debt token that needs to be delegated.

### Example

To approve delegation, the approveDelegation method of the debt token contract is used. The supplier (delegator) allows the borrower (delegatee) a certain amount.

```typescript-vue
// Note: Please don't treat this code as a working solution and the usage should be more as a "template" to suit your dApp's needs.

import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(
  "{{config.mainnet.rpcUrl}}"
);
const signer = new ethers.Wallet("YOUR_PRIVATE_KEY", provider);

const debtTokenAddress = "0xYOUR_DEBT_TOKEN_ADDRESS"; // Replace with actual debt token address
const delegationAddress = "0xDELEGATION_ADDRESS"; // Replace with actual delegation address
const amount = ethers.utils.parseUnits("1000.0", 18); // Amount to delegate

const debtTokenAbi = [
  "function approveDelegation(address delegatee, uint256 amount) external",
];
const debtTokenContract = new ethers.Contract(
  debtTokenAddress,
  debtTokenAbi,
  signer
);

async function approveDelegation() {
  try {
    const tx = await debtTokenContract.approveDelegation(
      delegationAddress,
      amount
    );
    await tx.wait();
    console.log(`Delegation approved: ${tx.hash}`);
  } catch (error) {
    console.error("Error approving delegation:", error);
  }
}

approveDelegation();
```

:::tip
<b>Tip</b><br/>
The delegator does not need to already have supplied funds in the protocol to [approveDelegation()](/learn/tokens/debttoken#approvedelegation). However, **before** the delegatee executes [borrow()](/developers/contracts/pool#borrow), there must be sufficient collateral supplied by delegator in the protocol.
:::

## Borrowing the credit

The borrower (delegatee) calls the [borrow()](/developers/contracts/pool#borrow) method on the 'Pool', using the supplier's (delegator's) address in final parameter `onBehalfOf`.

The borrower's available credit is reduced by the borrowed amount.

### Example

```typescript-vue
// Note: Please don't treat this code as a working solution and the usage should be more as a "template" to suit your dApp's needs.
import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(
  "{{config.mainnet.rpcUrl}}"
);
const signer = new ethers.Wallet("YOUR_PRIVATE_KEY", provider);

const poolAddressesProvider = "{{config.contracts.poolAddressesProvider.address}}";
const lendingPoolAbi = [
  "function borrow(address asset, uint256 amount, uint256 interestRateMode, uint16 referralCode, address onBehalfOf) external",
];
const assetAddress = "0xASSET_ADDRESS"; // Replace with actual asset address
const borrowAmount = ethers.utils.parseUnits("1000.0", 18);

const poolAddressesProviderAbi = [
  "function getPool() external view returns (address)",
];

async function getPoolAddress(): Promise<string> {
  const lendingPoolAddressesProvider = new ethers.Contract(
    poolAddressesProvider,
    poolAddressesProviderAbi,
    provider
  );
  return await lendingPoolAddressesProvider.getPool();
}

async function borrow() {
  try {
    const lendingPoolAddress = await getPoolAddress();
    const lendingPoolContract = new ethers.Contract(
      lendingPoolAddress,
      lendingPoolAbi,
      signer
    );

    const tx = await lendingPoolContract.borrow(
      assetAddress,
      borrowAmount,
      2, // variable interest rate
      0,
      DELEGATOR_ADDRESS
    );
    await tx.wait();
    console.log(`Borrowed: ${tx.hash}`);
  } catch (error) {
    console.error("Error borrowing:", error);
  }
}

borrow();
```

## Repaying the credit

Anyone can repay the debt _OnBehalf_ of the user, by calling one of the methods - [repay()](/developers/contracts/pool#repay) or [repayWithPermit()](/developers/contracts/pool#repaywithpermit) The supplier (aka creditor) can also use [repayWithATokens()](/developers/contracts/pool#repaywithatokens) method to repay debt with their _aTokens_ of the underlying debt asset in the same pool.
