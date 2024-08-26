<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Liquidations

The health of Bend is dependent on the 'health' of the positions within the protocol, also known as the 'health factor'. When the 'health factor' of an account's total loans is below 1, anyone can make a [liquidationCall()](/developers/contracts/pool#liquidationcall) to the `Pool` contract, pay back part of the debt owed and receive discounted collateral in return (also known as the liquidation bonus).

This incentivizes third parties to participate in the health of the overall protocol, by acting in their own interest (to receive the discounted collateral) and as a result, ensure borrows are sufficiently collateralized.

There are multiple ways to participate in liquidations:

1. By calling the [liquidationCall()](/developers/contracts/pool#liquidationcall) directly in the `Pool` contract.
2. By creating your own automated bot or system to liquidate loans.

:::warning
For liquidation calls to be profitable, you must take into account the gas cost involved in liquidating the loan. If a high gas price is used, then the liquidation may be unprofitable for you.
:::

:::tip
Bend protocol allows 100% of debt (i.e. `MAX_LIQUIDATION_CLOSE_FACTOR`) to be liquidated in single `liquidationCall()` if: `HF < CLOSE_FACTOR_HF_THRESHOLD`
:::

## Before Making Liquidation Call

When making a [liquidationCall()](/developers/contracts/pool#liquidationcall), you must:

- Know the account (i.e. the ethereum address: `user`) whose health factor is below 1.

- Know the valid debt amount and asset (i.e. `debtToCover` & `debtAsset`)

  - If the HF is above `CLOSE_FACTOR_HF_THRESHOLD`, then only a maximum of 50% (i.e. `DEFAULT_LIQUIDATION_CLOSE_FACTOR`) of the debt can be liquidated per valid `liquidationCall()`

  - If the HF is below `CLOSE_FACTOR_HF_THRESHOLD`, then 100% (i.e. `MAX_LIQUIDATION_CLOSE_FACTOR`) of the debt can be liquidated in single valid `liquidationCall()`

  - You can set the `debtToCover` to `uint(-1)` and the protocol will proceed with the highest possible liquidation allowed by the close factor.

  - You must already have sufficient balance of the debt asset, which will be used by the `liquidationCall` to pay back the debt.

- Know the collateral asset `collateralAsset` you closing, i.e. the asset that the user has `backing` their outstanding loan that you will receive as a `bonus`.

- Whether you want to receive _aTokens_ or the underlying asset after a successful `liquidationCall()`.

## Getting Accounts to Liquidate

Only accounts with `HF < 1` can be liquidated. To get a user's health factor **on-chain**:

1. To gather user account data from on-chain data, one way would be to monitor emitted events from the protocol and keep an up to date index of user data locally.
2. Call [`getUserAccountData`](/developers/contracts/pool#getuseraccountdata) to see if the current user's `HF < 1`, meeting the liquidation criteria.

### Liquidation Example

```typescript-vue
//Note: Please don't treat this code as a working solution and the usage should be more as a "template" to suit your specific needs.

import { ethers } from "ethers";

// connect to Berachain using the provided rpc url
const provider = new ethers.providers.JsonRpcProvider(
  "{{config.testnet.rpcUrl}}"
);

// replace with your wallet's private key
const signer = new ethers.Wallet("YOUR_PRIVATE_KEY", provider);

// addresses for the contracts and assets involved
const poolAddress = "{{config.contracts.poolProxy.address}}"; // pool contract address on bArtio
const collateralAssetAddress = "0xCollateralAssetAddress"; // replace with the actual collateral asset address
const debtAssetAddress = "0xDebtAssetAddress"; // replace with the actual debt asset address
const userAddress = "0xUserAddress"; // address of the user whose loan is being liquidated

// the amount of debt we want to cover (for this example, 1000 $honey)
const debtToCover = ethers.utils.parseUnits("1000.0", 18);

// abi for the pool contract, focusing on the liquidationCall function
const poolAbi = [
  "function liquidationCall(address collateralAsset, address debtAsset, address user, uint256 debtToCover, bool receiveAToken) external",
];

async function liquidateLoan() {
  try {
    const poolContract = new ethers.Contract(poolAddress, poolAbi, signer);

    // perform the liquidation call
    const tx = await poolContract.liquidationCall(
      collateralAssetAddress, // the collateral asset we want to seize
      debtAssetAddress, // the debt asset we're covering
      userAddress, // the user whose loan is being liquidated
      debtToCover, // amount of debt to cover
      false // set to true if you want to receive aTokens instead of the underlying asset
    );

    await tx.wait();
    console.log(
      `liquidation performed successfully! transaction hash: ${tx.hash}`
    );
  } catch (error) {
    console.error("there was an error performing the liquidation:", error);
  }
}

// run the liquidation function
liquidateLoan();
```
