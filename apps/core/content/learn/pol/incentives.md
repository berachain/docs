# Incentive Marketplace

Proof of Liquidity (PoL) enables protocols to bid for validator emissions using whitelisted incentive tokens. In doing so, protocols attract users to their protocol with `$BGT` rewards.

Validators can direct emissions to protocols' pools through reward vaults, collecting these incentives in return. Validators are expected to redistribute received incentives to their `$BGT` delegators.

![Reward Vault Incentives](/assets/reward-vault-incentives.png)

## Incentive Marketplace Operations

### Incentive Management

Token managers are the only ones entitled to add incentive tokens and control incentive parameters:

- Set incentive rate (p)
- Example: Setting rate p=10 means:
  - 10 protocol tokens exchanged per 1 BGT
  - 1000 incentive tokens deposited enables 100 BGT worth of emissions flowing to vault

### Rate Adjustments

Rate modifications follow these rules:

1. Empty vault:
   Can update to any rate
   $$r \geq r_{min}$$

2. Non-empty vault:
   Can only increase rate
   $$p^* > p$$
   Cannot decrease rate until vault incentives deplete (reverting to scenario #1)

### Distribution Flow

1. Validator emits BGT to protocol vault
2. Validator receives (p × BGT) protocol tokens
3. Validator expected to share portion with delegates
4. Creates alignment between validators, protocols, and users

## Parameters

| Parameter        | Description                                                  |
| ---------------- | ------------------------------------------------------------ |
| p                | Incentive rate - Protocol tokens given per BGT               |
| minIncentiveRate | Minimum allowed exchange rate between protocol token and BGT |
| p\*              | New incentive rate (when updating)                           |
