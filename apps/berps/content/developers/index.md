# Berps Developer Overview

This section describes the smart contracts powering the Berps platform, providing guidance to developers wishing to interact with them programmatically.

[`Entrypoint.sol`](/developers/contracts/entrypoint) serves as the entrypoint for all trading actions. However, developers wishing to make trades must first provide `$HONEY` approval to the `Orders` contract, which is responsible for the transfer of funds.

## Architecture Diagram

Below is a simplified diagram helping developers visualize Berps' contract architecture. The flow of funds and fees is also illustrated.

![Berps architecture](/assets/berps-architecture.png)
