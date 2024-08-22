---
head:
  - - meta
    - property: og:title
      content: BEX Governance
  - - meta
    - name: description
      content: Description of how Bex governance is conducted
  - - meta
    - property: og:description
      content: Description of how Bex governance is conducted
---

# Governance

Governance in BEX is administered through the `CrocPolicy` contract. Within this contract, there are three several governance roles:

- Operations
- Treasury
- Emergency

During the testnet, these roles are run by a Berachain Foundation multi-sig wallet. At mainnet launch, these roles will be divided amongst multi-sig wallets, and BGT governance.

## Operations

The operations role is responsible for managing the day-to-day operations of the BEX protocol, and has a more limited scope of powers compared to the other roles. Its powers include:

- Enabling or disabling new pool types
- Setting protocol fees
- Set a minimum initial liquidity value for all new pools

## Treasury

The treasury role is the most privileged role within the BEX protocol. Its powers include:

- All the powers of the operations role
- Ability to upgrade BEX proxy contracts
- Collecting accumulated protocol fees
- Disabling or enabling the `swap()` hot path flag
- Disabling or enabling safe mode, which freezes all user activities and funds

## Emergency

The emergency role has all of the powers of the operations role, including the ability to disable or enabling safe mode, which freezes all user activities and funds.
