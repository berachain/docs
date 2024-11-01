# Retrieve Loan Health in Berachain Bend

Retrieving the health of a user's loans may be important for various reasons, such as monitoring the safety of their loan or determining the eligibility for liquidation.

Following is a simple example for calling the [Pool](/developers/contracts/pool) contract's `getUserAccountData()` function to retrieve the health of a user's loan.

### TypeScript Example

```typescript
import { Contract, utils } from "ethers";
const poolAbi = [
  "function getUserAccountData(address user) external view returns (uint256 totalCollateralBase, uint256 totalDebtBase, uint256 availableBorrowsBase, uint256 currentLiquidationThreshold, uint256 ltv, uint256 healthFactor)",
];
const poolContract = new Contract(POOL_ADDRESS, poolAbi, signer);

const {
  totalCollateralBase,
  totalDebtBase,
  availableBorrowsBase,
  currentLiquidationThreshold,
  ltv,
  healthFactor,
} = await poolContract.getUserAccountData(userAddress);
```

The `getUserAccountData()` function returns the following:

| Name                          | Type      | Description                                                                      |
| ----------------------------- | --------- | -------------------------------------------------------------------------------- |
| `totalCollateralBase`         | `uint256` | The total collateral of the user in the base currency used by the price feed     |
| `totalDebtBase`               | `uint256` | The total debt of the user in the base currency used by the price feed           |
| `availableBorrowsBase`        | `uint256` | The borrowing power left of the user in the base currency used by the price feed |
| `currentLiquidationThreshold` | `uint256` | The liquidation threshold of the user                                            |
| `ltv`                         | `uint256` | The loan to value of the user                                                    |
| `healthFactor`                | `uint256` | The current health factor of the user                                            |

### Health Parameters Explained

- **`currentLiquidationThreshold`**: The weighted average of the liquidation thresholds of the user's collateral assets. For example, if a user has deposited equal amounts of two assets with liquidation thresholds of 80% and 90%, the `currentLiquidationThreshold` would be 85%.
- **`ltv`**: The loan-to-value ratio is the ratio of the loan amount to the value of the collateral. It is the quotient of `totalDebtBase/totalCollateralBase`.
- **`healthFactor`**: The health factor is the ratio of the sum of the total collateral, multiplied by that collateral's liquidation threshold, to the total debt. A health factor below 1 indicates that the user's loan can be liquidated. See a detailed explanation of the [health factor](/learn/lending-protocol/liquidations#health-factor) calculation.
