---
head:
  - - meta
    - property: og:title
      content: Berachain Tokenomics
  - - meta
    - name: description
      content: Berachain's Tokenomics
  - - meta
    - property: og:description
      content: Berachain's Tokenomics
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Berachain Tokenomics

## Overview

| Property                | Details                                                  |
| ----------------------- | -------------------------------------------------------- |
| Token Name              | BERA                                                     |
| Total Supply at Genesis | 500,000,000 BERA                                         |
| Inflation Schedule      | ~10% annually (via BGT emissions), subject to governance |
| Decimals                | 18                                                       |

`$BERA` serves as the native gas and staking token of Berachain, the first blockchain powered by Proof-of-Liquidity, whilst `$BGT` facilitates governance and economic incentives.

[Learn more about BERA's role in the network](/learn/pol/tokens/bera)

## Distribution and Allocation

The total genesis supply of 500 million `$BERA` is allocated across five categories:

![BERA Allocation](/assets/bera-allocation.png)

### Category Descriptions

| Category                         | Amount (BERA) | Description                                                                                                                                                           |
| -------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Initial Core Contributors**    | 84,000,000    | Tokens distributed to advisors and members of Big Bera Labs, the core contributors to the Berachain blockchain                                                        |
| **Investors**                    | 171,500,000   | Tokens distributed to Berachain’s Seed, Series A and Series B investors                                                                                               |
| **Community Airdrop**            | 79,000,000    | Parties within the Berachain ecosystem, including testnet users, Berachain NFT holders, ecosystem NFT holders, social supporters, ecosystem dApps, community builders |
| **Ecosystem & R&D**              | 100,000,000   | Tokens distributed to ecosystem and R&D projects - more below                                                                                                         |
| **Future Community Initiatives** | 65,500,000    | Reserved for applications, developers and users through incentive programs, grants and more, with input from the community itself via Snapshots, RFPs etc.            |

#### Ecosystem & R&D

20% of Berachain’s token supply will be used to support ecosystem development, R&D, growth initiatives, and the operations of the Berachain Foundation. This will largely focus on programs for developers and builders (see [Boyco](https://boyco.berachain.com/)), node operator delegations, and evolutions of Proof of Liquidity and BeaconKit.

At launch, 10% of `$BERA` supply is unlocked from this bucket for ecosystem growth, developer tooling / infrastructure, liquidity provisioning and more.

## Vesting and Token Release Schedule

All parties follow an identical vesting schedule:

- Initial Unlock: After a one-year cliff, 1/6th of allocated tokens are unlocked
- Linear Vesting: The remaining 5/6ths of tokens vest linearly over the subsequent 24 months

![BERA Inflation](/assets/bera-inflation.png)
