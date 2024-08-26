---
head:
  - - meta
    - property: og:title
      content: BEX Impact Contract
  - - meta
    - name: description
      content: The BEX Impact contract allows users to calculate the price impact and resulting token flows associated with a hypothetical swap on the BEX DEX.
  - - meta
    - property: og:description
      content: The BEX Impact contract allows users to calculate the price impact and resulting token flows associated with a hypothetical swap on the BEX DEX.
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# CrocImpact Contract

The `CrocImpact` contract provides a convenient way to calculate the price impact and resulting token flows associated with a hypothetical swap on the BEX DEX.

The contract is deployed at

bArtio Testnet: `{{config.contracts.crocImpact.address}}`

Note that calling this contract does not execute an actual swap. It simply returns the token quantities that would be paid or received if a swap were to be executed at the current chain state. When calculating off-chain, keep in mind that the state of the curve may change between the time the function is called and the time the actual swap transaction executes on-chain.

The contract has a single public method:

```solidity
function calcImpact(
    address base,
    address quote,
    uint256 poolIdx,
    bool isBuy,
    bool inBaseQty,
    uint128 qty,
    uint16 tip,
    uint128 limitPrice
) public view returns (int128 baseFlow, int128 quoteFlow, uint128 finalPrice)
```

**Parameters**
| Parameter | Type | Description |
| ---------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| base | address | The address of the base token |
| quote | address | The address of the quote token |
| poolIdx | uint256 | The pool type index |
| isBuy | bool | True if the user wants to pay base token and receive quote token. False if the user wants to receive base token and pay quote token |
| inBaseQty | bool | If true, the qty parameter is denominated in base tokens. If false, it's denominated in quote tokens. |
| qty | uint128 | The quantity of tokens to swap. |
| tip | uint16 | If zero, the user accepts the standard swap fee rate in the pool. If non-zero, the user agrees to pay up to this swap fee rate to the pool's LPs. In standard cases, this should be 0. |
| limitPrice | uint128 | Represents the worse possible price the user is willing to accept. If buying this represents an upper bound. |

**Returns**

| Return Value | Type    | Description                                                                                                                                                                                                                                   |
| ------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| baseFlow     | int128  | The base side token flows the swap would pay/receive to the caller. A negative quantity indicates a credit received by the user from the pool, while a positive quantity indicates a debit paid to the pool by the user.                      |
| quoteFlow    | int128  | The quote side token flows the swap would pay/receive to the caller. The same negative/positive convention as the baseFlow return value applies.                                                                                              |
| finalPrice   | uint128 | The final price the pool would arrive at after the swap is executed. Note that this is the post-swap pool price, not the realized price the swapper pays. The latter can be calculated by dividing the base and quote token flows from above. |
