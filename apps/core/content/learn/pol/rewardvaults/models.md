# PoL Reward Vault Models

Proof of Liquidity (PoL) Reward Vaults offer a wide and flexible design space for protocols to create innovative incentive structures. The models presented here are not official or exhaustive but serve as inspiration for builders. The Berachain team strongly encourages developers to explore and create their own unique models tailored to their specific needs and use cases. The following examples are meant to spark creativity and showcase the potential of Reward Vaults.

## Liquidity Staking/Vesting Model

This model incentivizes users to provide liquidity and stake their receipt tokens.

**User Benefit**

Users can earn $BGT rewards by providing liquidity and staking their receipt tokens.

**Protocol Benefit**

Protocols can attract and retain liquidity for their platforms.

**Validator Benefit**

Validators can receive incentives or bribes to direct emissions to these Reward Vaults.

**Example: Liquidity Staking in BEX**

| Participant | Action | Benefit |
|-------------|--------|---------|
| User | Deposits $HONEY / $WBERA into a liquidity pool on BEX. | |
| User | Receives an LP receipt token. | |
| User | Stakes the LP receipt token with the Reward Vault. | |
| User | Becomes eligible to accrue $BGT from the Reward Vault over time. | Earns rewards |
| Protocol | Gains liquidity for the platform. | Increased liquidity and BGT distribution |
| Validator | Directs emissions to this Reward Vault. | Recieves incentive tokens from the protocol in exchange for directing emissions |

:::tip
To try this model firsthand, try out [liquidity provisioning](https://bartio.bex.berachain.com/pools) on BEX and stake your LP tokens in the [Reward Vault on BGT Station](https://bartio.station.berachain.com/gauge).
:::

## Purchase Actions Model

This model incentivizes users to benefit from their purchases in protocols. 

**User Benefit**

Users can earn $BGT rewards for their purchases in protocols, ie lottery tickets, in game assets, merchandise etc.

**Protocol Benefit**

Protocols can incentvize users for loyalty and participation in their applications. 

**Validator Benefit**

Validators can be incentivized to direct emissions to vaults that support increased purchase activity by recieving incentive tokens that may capture value from fees generated from user actions.

**Example: Lottery System for getting blue chip assets**

| Participant | Action | Benefit |
|-------------|--------|---------|
| User | Purchases lottery tickets for a chance to win high-value tokens or fractionalized NFTs. | |
| Protocol | Manages the lottery system and token distribution. | Revenue from ticket sales |
| User | Receives a receipt token for the lottery ticket purchase. | |
| User | Stakes the receipt token in the Reward Vault. | |
| User | Earns $BGT rewards based on staked receipt tokens. | Earns $BGT rewards |
| User | If lottery is won, receives valuable tokens (e.g., iBGT, WETH, WBTC) at a discounted price. | Potential to acquire high-value assets at lower prices |
| Token Holder | Offers high-value tokens or NFTs as lottery prizes. | Potentially earns more yield than through direct sales |
| Protocol | Implements cool-off periods between lotteries to prevent market flooding. | Maintains market stability |
| Protocol | Fractionalizes NFTs for broader participation. | Increases accessibility of high-value assets |
| Validator | Directs emissions to this Reward Vault. | Receives portion of ticket sale fees and additional rewards |


## Retroactive Actions Model

This model rewards users for taking specific actions within a protocol retroactively

**User Benefit**

Users can earn $BGT rewards for actions in their protocol after the action has taken place. For example, loyalty rewards for holding an NFT, putting up collateral, or other actions.

**Protocol Benefit**

Can incentivize long term loyalty to their protocol by rewarding users for past actions taken.

**Validator Benefit**

Validators can receive incentives by directing emissions to vaults that have stakers with long term strategies.

**Example:**

| Participant | Action | Benefit |
|-------------|--------|---------|
| User | Deposits collateral (e.g., WETH) into Bend. | |
| User | Borrows $HONEY against their collateral. | |
| Protocol | Mints and stakes Periphery HONEY tokens on behalf of the user. | Increased $HONEY utilization |
| User | Automatically starts earning $BGT rewards for their $HONEY loan. | Earns $BGT rewards |
| User | Can claim accumulated $BGT rewards at any time. | Receives ongoing rewards |
| User | Repays $HONEY loan when desired. | |
| Protocol | Unstakes and burns Periphery HONEY tokens. | |
| Validator | Directs emissions to this Reward Vault. | Supports increased borrowing activity |

:::tip
If you want to see this in action, try this on [BEND](https://bartio.bend.berachain.com/dashboard/)
:::

## Self-Funding Model

This model enables protocols to create fundraising mechanisms that align with their specific goals or token economics.

**User Benefit**

Users can participate in funding initiatives while earning $BGT rewards, potentially gaining exposure to new tokens or projects.

**Protocol Benefit**

Protocols can design custom funding strategies, from supporting public goods to bootstrapping liquidity for new tokens or L2 solutions.

**Validator Benefit**

Validators may receive special incentives or a portion of raised funds for supporting these initiatives.

**Example:**

| Participant | Action | Benefit |
|-------------|--------|---------|
| User | Contributes to a funding pool (e.g., for public goods, L2 development, or protocol treasury). | |
| Protocol | Creates a Reward Vault for the funding initiative. | Raises funds for development or liquidity |
| User | Receives tokens representing their contribution. | |
| User | Stakes these tokens in the designated Reward Vault. | |
| User | Earns $BGT rewards proportional to their stake. | Earns rewards while supporting the initiative |
| Protocol | May offer additional benefits (e.g., L2 tokens, governance rights). | Achieves funding or liquidity goals |
| Validator | Directs emissions to this Reward Vault. | Receives portion of raised funds or special tokens |

These models represent just a fraction of the possibilities within the PoL Reward Vault design space. We encourgage builders are encouraged to use this as inspiration for their own protocols.