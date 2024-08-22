---
title: Interest Rates in Bend
---

# Interest Rates

Interest rates on Bend are dynamic, adjusting based on the utilization rate of `$HONEY` in the lending pool. See the article on [Interest Rates](/learn/lending-protocol/interest-rates) for details on how interest rates are calculated.

All rates and indeces queried on-chain or from subgraphs are expressed in RAY units i.e. `10^27`.

## Fetching Current Interest Rates

Below is an example for fetching interest rates on Bend

```typescript
// Note: Please don't treat this code as a working solution and the usage should be more as a "template" to suit your needs.

import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(
  "https://bartio.rpc.berachain.com"
);
const poolAddressesProvider = "0x8297A07f87a8576b88d46e636c05B84E4Ea8265D";

const poolAddressesProviderAbi = [
  "function getPool() external view returns (address)",
];

const poolAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
    ],
    name: "getReserveData",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint256",
                name: "data",
                type: "uint256",
              },
            ],
            internalType: "struct DataTypes.ReserveConfigurationMap",
            name: "configuration",
            type: "tuple",
          },
          {
            internalType: "uint128",
            name: "liquidityIndex",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "currentLiquidityRate",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "variableBorrowIndex",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "currentVariableBorrowRate",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "currentStableBorrowRate",
            type: "uint128",
          },
          {
            internalType: "uint40",
            name: "lastUpdateTimestamp",
            type: "uint40",
          },
          {
            internalType: "uint16",
            name: "id",
            type: "uint16",
          },
          {
            internalType: "address",
            name: "aTokenAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "stableDebtTokenAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "variableDebtTokenAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "interestRateStrategyAddress",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "accruedToTreasury",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "unbacked",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "isolationModeTotalDebt",
            type: "uint128",
          },
        ],
        internalType: "struct DataTypes.ReserveData",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const assetAddress = "0xASSET_ADDRESS"; // Replace with the actual asset address

async function fetchInterestRates() {
  const poolAddressesProvider = new ethers.Contract(
    poolAddressesProvider,
    poolAddressesProviderAbi,
    provider
  );
  const lendingPoolAddress = await poolAddressesProvider.getPool();
  const lendingPool = new ethers.Contract(poolAddress, poolAbi, provider);

  const { liquidityRate, variableBorrowRate, stableBorrowRate } =
    await lendingPool.getReserveData(assetAddress);

  console.log(
    `$HONEY Supply APY: ${ethers.utils.formatUnits(liquidityRate, 27)}%`
  );
  console.log(
    `$HONEY Borrow APY: ${ethers.utils.formatUnits(variableBorrowRate, 27)}%`
  );
}

fetchInterestRates().catch(console.error);
```
