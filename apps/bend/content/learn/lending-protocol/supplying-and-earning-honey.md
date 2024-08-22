# Supplying & Earning $HONEY

On Bend, users can deposit a variety of blue-chip assets which acts as a collateral and increase their borrowing capacity. The primary assets that can be supplied include:

- Ethereum (wETH)
- Bitcoin (wBTC)
- $HONEY (Berachain’s native stablecoin)

The list of assets available for supplying will be decided decided via foundation and governance.

**Note:** In the Bend dApp, "Supplying" and "Deposit" are used for seperate tasks. Exaple - Only $HONEY can be *supplied*, and other assets can be *deposited* acting as a collateral to *borrow* `$HONEY`.

To learn more on depositing assets, check out [Depositing](/learn/guides/depositing-collateral#how-do-i-deposit) guide.

## Supply Logic

### **Adding Liquidity**

![Adding Liquidity](/assets/supplyLogic-addingLiquidity.png)

The diagram above captures the sequence of function calls that occurs when a user **adds liquidity** to Bend:

1. User supplies liquidity (e.g 100 `$HONEY`) to the protocol via the `supply()` function of Pool.sol
2. The `supply()` function then calls the `mint()` function of the corresponding receipt token smart contract, which following our example will be `a$HONEY`.sol
3. The `mint()` function then mints the same amount of receipt tokens (e.g. 100 `a$HONEY`) to the user. Note that the amount of aTokens minted is always 1:1 with the amount supplied.

This is why the aTokens are referred to as the receipt tokens. They are receipts that the user has indeed provided X amount of tokens to token Y’s liquidity pool.

### **Removing Liquidity**

![Adding Liquidity](/assets/removingL-removingLiquidity.png)

The diagram above captures the sequence of function calls that occurs when a user **removes liquidity** from Bend:

1. User removes liquidity (e.g. 100 `a$HONEY`) from the protocol via the `withdraw()` function of Pool.sol
2. The `withdraw()` function then calls the `burn()` function of the receipt token
3. The `burn()` function burns the receipt tokens received (100 `a$HONEY`) and transfers the underlying asset (`$HONEY`) to the user.

### Recap

To conclude the Supply-side logic: aTokens are tokens minted and burnt upon _supply_ and _withdraw_ of assets to Bend, which denote the amount of assets supplied and the yield earned on those assets. The aTokens’ value is pegged to the value of the corresponding supplied asset at a 1:1 ratio and can be safely stored, transferred or traded. All yield collected by the aTokens’ reserves are distributed to aToken holders directly by continuously increasing their wallet balance.

Now that we know how the process of the Supply related processes (adding/removing liquidity) work, let’s take a look at the Borrow related processes.

## Rewards/ $HONEY

Suppliers on Bend earn rewards in the form of interest generated from the $HONEY they supply. These earnings are represented by aToken (`$aHoney`), which are minted and burned upon supply and withdrawal of assets. The value of aTokens is pegged 1:1 to the value of the corresponding supplied asset, and they continuously earn interest based on the borrowing activity on the platform.
