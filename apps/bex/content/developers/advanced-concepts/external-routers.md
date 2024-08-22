---
head:
  - - meta
    - property: og:title
      content: External Routers
  - - meta
    - name: description
      content: Understand how BEX supports external routers for users who require bespoke logic or want to interact with BEX through other protocols.
  - - meta
    - property: og:description
      content: Understand how BEX supports external routers for users who require bespoke logic or want to interact with BEX through other protocols.
---

# External Routers

BEX supports the ability for users to approve external contracts to call operations on their behalf. This feature is useful in situations where a user requires bespoke logic or wants to use BEX through another protocol.

To grant an external contract permission to call BEX on their behalf, users can approve the contract address for a fixed number of times or for unlimited duration. Users should exercise caution before approving any router contract, as these contracts can execute arbitrary logic and potentially take control of a user's positions.

On bArtio Testnet, users interacting with the Bex frontend will swap through the MultiSwap router contract at [`0x21e2C0AFd058A89FCf7caf3aEA3cB84Ae977B73D`](https://bartio.beratrail.io/address/0x21e2C0AFd058A89FCf7caf3aEA3cB84Ae977B73D)
