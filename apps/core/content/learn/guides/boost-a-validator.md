<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Boost A Validator With $BGT

The following guide will walk you through the process of boosting a Validator with $BGT to become eligible to claim any Incentives a Validator is rewarded by directing $BGT emissions to Reward Vaults.

## Requirements

- A wallet that has accumulated $BGT

## How To Boost A Validator With $BGT

This will walk you through the process of boosting a Berachain Validator through <a :href="config.mainnet.dapps.hub.url" target="_blank">{{config.mainnet.dapps.hub.name}}</a>.

### Step 1 - Choose A Validator

On the **Boost** page, choose a validator you would like to boost.

![Berachain Hub Validators](/assets/boost-validator-validators.png)

### Step 2 - Queue Boost

In order to Boost a Validator, the Boost must first be queued before it can be activated.

Under the **Your Boosts** section, you can see the amount of BGT you have available to boost.  Click the **Boost** button.

![Validators](/assets/boost-validator-validator.png)

Specify an amount of $BGT to Boost the Validator with and click **Queue Boost**. Approve the transaction in your wallet.
You will need to wait a certain period of time before the boost is activated.

![Validator Queue Boost](/assets/boost-validator-queue-boost.png)

### Step 3 - Activate Boost

Boosts are automatically activated after the boost cooldown period has passed, and can be cancelled anytime before it activates.

![Validator Boost Queued](/assets/boost-validator-queued.png)
