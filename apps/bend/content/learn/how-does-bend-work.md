<script setup>
  import config from '@berachain/config/constants.json';
</script>

# How Does Bend Work?

Bend's design is inspired by [Aave](https://app.aave.com/), a highly battle-tested and efficient lending protocol. This article describes key concepts and how participants interact with one another.

There are three main participants in Bend:

1. **Suppliers** providing `$HONEY` liquidity
2. **Borrowers** borrowing `$HONEY` and paying lending fees
3. **Liquidators** ensuring that the protocol remains solvent

<a :href="config.testnet.dapps.bend.url">

![Berachain Bend](/assets/how-bend-works-2.png)

</a>

Berachain itself may also be considered a Bend participant, as it's the entity providing `$BGT` incentives to promote Bend usage.

## Suppliers

Suppliers have two main tasks that can be performed in Bend, they get to _deposit_ assets as a collateral, and _supply_ `$HONEY` to the Bend platform and earn interest from the `$HONEY` borrowed by borrowers. By supplying liquidity, they help maintain a robust lending pool, ensuring that there is always available capital for borrowers. This activity directly supports the overall liquidity and efficiency of the Berachain ecosystem, contributing to its stability and security.

## Borrowers

Borrowers obtain `$HONEY` loans by putting up collateral, making Bend an over-collateralized lending protocol. This means that borrowers must deposit assets worth more than the amount they wish to borrow. This over-collateralization reduces the risk of default, maintaining the protocol’s solvency and protecting the suppliers' funds. By participating, borrowers also help stimulate demand for the assets in the system, ensuring an active and dynamic market.

## Liquidators

Liquidators, often referred to as liquidation bots, monitor the health of loans on the platform. When a borrower's collateral falls below a certain threshold, these bots automatically initiate the liquidation process. This ensures that bad debts are promptly addressed, maintaining the protocol's liquidity and minimizing losses. Liquidators thus play a crucial role in preserving the financial health and stability of the Bend platform by swiftly managing under-collateralized positions.

## Berachain

Bend opens up the oppurtunity for users to borrow `$HONEY`, which starts the cycle for supplying -> borrowing -> earning `$BGT` rewards.

The same `$BGT` can be then be used to increase validator's `$BGT` weight, increasing the power to produce more `$BGT` rewards per-block. Read more in the next section - [Bend & Proof Of Liquidity](/learn/bend-and-pol).
