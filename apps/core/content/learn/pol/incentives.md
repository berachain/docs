# Incentive Marketplace

Proof-of-Liquidity (PoL) enables protocols to bid for validator `$BGT` emissions to Reward Vaults using whitelisted incentive tokens. In doing so, protocols attract users to their protocol with `$BGT` rewards.

In a nutshell, here's how Incentives work:

1. A protocol sets an incentive rate for their reward vault (e.g., 10 protocol tokens per 1 `$BGT`)
2. When a validator directs `$BGT` emissions to this vault, they receive the corresponding amount of Incentives (e.g. 10 protocol tokens for directing 1 `$BGT`)
3. Validators can take a commission on these Incentives before distributing the remainder to their `$BGT` delegators
4. The amount of `$BGT` a validator can direct (and thus Incentives they can earn) depends on their delegation weight

![Reward Vault Incentives](/assets/reward-vault-incentives.png)

## Incentive Marketplace Operations

[Token managers](/learn/governance/rewardvault#token-whitelisting) are the only ones entitled to 1) add incentive tokens and 2) control incentive parameters on a Reward Vault. The key entrypoint is the `addIncentive` function on the Reward Vault contract:

```solidity
function addIncentive(address token, uint256 amount, uint256 incentiveRate) external;
```

### Rate Adjustments

Each time incentives are added to a Reward Vault, the manager sets the rate (r) for the next distribution (until `$BGT` is depleted).

Example: Setting rate `r=10` means:

- 10 protocol tokens exchanged per 1 `$BGT`
- 1000 incentive tokens deposited enables 100 `$BGT` worth of emissions flowing to vault

Rate modifications follow these rules:

1. Empty vault:
   Can update to any rate above the minimum
   $$r \geq r_{min}$$

2. Non-empty vault:
   Can only increase rate
   $$r^* > r$$

The rate cannot be decreased until vault incentives deplete (reverting to scenario #1)

### Parameters

| Parameter        | Description                                                  |
| ---------------- | ------------------------------------------------------------ |
| p                | Incentive rate - Protocol tokens given per BGT               |
| minIncentiveRate | Minimum allowed exchange rate between protocol token and BGT |
| p\*              | New incentive rate (when updating)                           |

### Distribution Flow

1. Validator emits `$BGT` to protocol vault
2. Validator receives (`r × $BGT`) protocol token incentives
3. Validator expected to share portion of incentives with delegates (this will be an on-chain operation in the future)
