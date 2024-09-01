# Governance

Bend is governed by Berachain Governance Token (`$BGT`) holders. `$BGT` holders are empowered with broad governance powers over Bend, such as adding new asset markets, changing risk parameters, or upgrading certain protocol contracts.

In this section, we describe the key Bend governance contracts.
![Bend Architecture - Pool Operation](/assets/bend-architecture-poolOperation.png)

## PoolAddressesProvider

The [PoolAddressesProvider](/developers/contracts/pooladdressesprovider) contract is the main address registry of Bend.

> This contract controls the upgradeability and access management of the protocol, including asset listings and risk parameters.

Most contracts rely on the `PoolAddressesProvider` to validate access and retrieve information. For instance, instead of storing oracle addresses within the `Pool` contract, it references them from the `PoolAddressesProvider`.

### Proposing Changes

`$BGT` token governance is responsible for changes to the `PoolAddressesProvider` contract. Read more about the [BGT Governance](https://docs.berachain.com/learn/pol/tokens/bgt#governance) process.

## Access Control List (`ACLManager`)

The ACLManager contract is responsible for managing the Access Control List (ACL) of Bend. It controls the permissions of various roles within the protocol. At the top is the `DEFAULT_ADMIN_ROLE`, which has the authority to assign roles to other addresses and is held by the `$BGT` governance contract. Other roles include:

- **EMERGENCY_ADMIN:** Held by a community multisig wallet, this role can quickly pause a particular reserve in case of critical issues.
- **RISK_ADMIN:** Responsible for setting risk parameters.
- **ASSET_LISTING_ADMIN:** Has the authority to add new reserves to Bend.
- **POOL_ADMIN:** Combines the roles of `RISK_ADMIN` and `ASSET_LISTING_ADMIN` along with additional pool configuration access.
