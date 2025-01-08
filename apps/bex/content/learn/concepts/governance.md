---
head:
  - - meta
    - property: og:title
      content: BeraSwap Governance
  - - meta
    - name: description
      content: Understanding the governance structure and roles in BeraSwap Protocol
  - - meta
    - property: og:description
      content: Understanding the governance structure and roles in BeraSwap Protocol
---

# Governance

BeraSwap's governance system allows BGT holders to participate in protocol decision-making, with voting power proportional to their holdings. Governance is responsible for steering the protocol's future direction and overseeing its development. No changes to core protocol features can be made without governance approval.

:::info
On testnet, these roles are managed by the Berachain Foundation multi-sig wallet. During mainnet, these roles will be transferred to a combination of protocol-owned multi-sigs and BGT governance.
:::

## Governance Responsibilities

BeraSwap Governance is the heart and brain of the protocol. The main responsibilities include:
- Managing protocol parameters and fees
- Approving protocol upgrades and new features
- Overseeing emergency actions and security measures

## Governance Structure

### Admin Role

The admin role is responsible for managing the day-to-day operations of the BeraSwap protocol and has the most direct control over protocol parameters. This role is crucial for implementing governance decisions and maintaining protocol health. When necessary, the admin can execute emergency actions to protect users and assets. They oversee operational changes and ensure the protocol runs smoothly according to the community's wishes.

### Authorizer Role

The authorizer serves as the permission management interface for the protocol, acting as a bridge between governance decisions and their implementation. It controls access to protocol functions and manages role assignments, ensuring that all actions go through proper permission checks. The authorizer is designed to work with both single-admin and multi-admin systems.

### Coordinator Role

The coordinator plays a vital role in the execution phase of governance, handling the process of implementing protocol changes. They manage staged governance actions and control the timing of execution, ensuring that changes occur in the correct sequence and with appropriate delays. The coordinator verifies that each change is completed successfully and has the authority to handle emergency cancellations if issues arise during implementation.

