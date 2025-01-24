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

## Governance Responsibilities

Governance is responsible for making strategic decisions about the protocol's development and operation. This includes setting protocol fees and their distribution, approving protocol upgrades, managing key parameters, and steering the long-term direction of the protocol. All major protocol changes must go through governance approval before implementation.

## Protocol Roles

### Manager Role

The manager role is designed for handling time-sensitive protocol operations that require immediate action. This includes the ability to execute emergency measures like pausing pools or the vault in case of detected issues. The manager can also adjust operational parameters and implement decisions that have been approved through governance, ensuring the protocol can respond quickly to immediate needs while still operating within governance-approved boundaries.

### Authorizer Role

The authorizer serves as BeraSwap's permission management interface, acting as a bridge between governance decisions and their implementation. It maintains protocol security by controlling access to protocol functions and ensuring all operations pass proper permission checks. The authorizer works alongside the governance timelock system to maintain secure and controlled access to protocol functionality.

### Coordinator Role

The coordinator plays a vital role in the execution phase of governance, handling the process of implementing protocol changes. They manage staged governance actions and control the timing of execution, ensuring that changes occur in the correct sequence and with appropriate delays. The coordinator verifies that each change is completed successfully and has the authority to handle emergency cancellations if issues arise during implementation.

