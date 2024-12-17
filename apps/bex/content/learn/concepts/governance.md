---
head:
  - - meta
    - property: og:title
      content: BeraSwap Governance
  - - meta
    - name: description
      content: Description of how BeraSwap governance is conducted
  - - meta
    - property: og:description
      content: Description of how BeraSwap governance is conducted
---

# Governance

Governance in BeraSwap is administered through the `TimelockAuthorizer` contract. Within this system, there are three primary governance roles:

- Admin
- Authorizer Adaptor
- Coordinator

On testnet, these roles are managed by the Berachain Foundation multi-sig wallet. During mainnet, these roles will be transferred to a combination of protocol-owned multi-sigs and BGT governance.

## Admin
The admin role is responsible for managing the day-to-day operations of the BeraSwap protocol, and has the most direct control over protocol parameters. Its powers include:

- Managing protocol parameters
- Implementing governance decisions
- Executing emergency actions
- Overseeing operational changes

## Authorizer Adaptor
The authorizer adaptor role serves as the permission management interface for the protocol. Its powers include:

- Controlling access to protocol functions
- Managing role assignments and permissions
- Enforcing permission checks on all actions
- Adapting between single-admin and multi-admin systems
- Interfacing with the timelock system

## Coordinator
The coordinator role handles the execution of governance actions and ensures proper sequencing. Its powers include:

- Managing staged governance actions
- Controlling execution timing and delays
- Ensuring proper order of operations
- Verifying successful completion of changes
- Handling emergency cancellations when needed

