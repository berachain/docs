# Incentive Marketplace

## Overview
Berachain's incentive marketplace enables protocols to bid for validator emissions using whitelisted tokens. Validators can direct emissions to protocols through reward vaults, with the option to redistribute received incentives to their BGT delegators.

![Reward Vault Incentives](/assets/reward-vault-incentives.png)

## Vault Whitelisting
Protocols must complete these steps to whitelist a vault:

1. Deploy vault through factory contract
  - Specify single staking token
  - One vault per staking token allowed
2. Submit governance proposal for whitelisting
3. Upon approval, vault becomes eligible for emissions

## Token Whitelisting
To whitelist an incentive token:

1. Submit governance proposal containing:
  - Token address
  - Minimum incentive rate - Lowest allowed exchange rate between protocol token and BGT
  - Token manager address - Account that will control incentive parameters
2. Note:
  - Each vault maintains separate whitelisted tokens
  - Tokens can be removed via governance
  - Token managers can be updated through governance

## Marketplace Operations

### Incentive Management
Token managers control incentive parameters:
- Set incentive rate (p) and deposit tokens
- Example: Setting rate p=10 means:
 - 10 protocol tokens exchanged per 1 BGT
 - 1000 protocol tokens deposited enables 100 BGT worth of incentives
- Minimum rate ensures fair value for BGT emissions
 - Managers cannot set rates below this floor
 - Protects validators from undervalued incentives

### Rate Adjustments
Rate modifications follow these rules:
1. Empty vault:
Can update to any rate 
$$r \geq r_{min}$$

2. Non-empty vault:
Can only increase rate 
$$p^* > p$$
Must provide sufficient liquidity
Cannot decrease rate until vault depletes

### Distribution Flow
1. Validator emits BGT to protocol vault
2. Validator receives (p × BGT) protocol tokens
3. Validator expected to share portion with delegates
4. Creates alignment between validators, protocols, and users

## Parameters
| Parameter | Description |
|-----------|-------------|
| p | Incentive rate - Protocol tokens given per BGT |
| minIncentiveRate | Minimum allowed exchange rate between protocol token and BGT |
| p* | New incentive rate (when updating) |
