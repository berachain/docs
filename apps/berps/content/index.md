---
# https://vitepress.dev/reference/default-theme-home-page
layout: page
---

<script setup>
  import Feature from '@berachain/ui/Feature';
  import config from '@berachain/config/constants.json';
  import { IconMoneybag, IconVocabulary, IconTerminal, IconBrandGithub, IconSearch, IconDroplet, IconGavel, IconRefresh, IconChartHistogram, IconCoins, IconWorld } from '@tabler/icons-vue';
</script>

<!-- START -->
<section class="VPHero">
  <div class="container">
    <div>
      <div class="VPImageBackground"></div>
      <img class="VPImage" src="/DocsBear.png" alt="Berachain BEX Docs" />
    </div>
    <div>
      <span class="logo">
        <img src="/assets/berachain-icon.svg" />
      </span>
      <h1 class="title">Berachain Berps Docs</h1>
      <p class="description">Learn about Berachain's decentralized perpetual exchange.</p>
    </div>
  </div>
</section>

<section class="features">
  <Feature
    title="Berps User Guide"
    description="Onboarding guide for new Berps users"
    link="/learn/"
    :icon="IconVocabulary"
  />
  <Feature
    title="Developers"
    description="Get up and running and building on Berps"
    link="/developers/"
    :icon="IconTerminal"
  />
  <Feature
    title="Berachain Faucet"
      description="Fund your testnet wallet with $BERA"
      :link=config.testnet.dapps.faucet.url
    :icon="IconDroplet"
  />
</section>

## More Berachain Docs

<section class="features">
  <Feature
    title="Core Docs"
    description="Berachain Core Docs"
    :link="config.websites.docsCore.url"
    image="/assets/BERA.png"
    type="alt"
  />
  <Feature
    title="Bend Docs"
    description="Berachain Native Lending Docs"
    :link="config.websites.docsBend.url"
    image="/assets/BEND.png"
    type="alt"
  />
  <Feature
    title="BEX Docs"
    description="Berachain Native DEX Docs"
    :link="config.websites.docsBex.url"
    image="/assets/BEX.png"
    type="alt"
  />
</section>

## Other Berachain Resources

<section class="features">
  <Feature
    title="BeaconKit"
    description="BeaconKit Repo"
    link="https://github.com/berachain/beacon-kit"
    :icon="IconBrandGithub"
    type="alt"
  />
  <Feature
    title="Beratrail"
    description="Block Explorer"
    :link="config.testnet.dapps.beratrail.url"
    :icon="IconSearch"
    type="alt"
  />
  <Feature
    title="Faucet"
    description="Get Testnet Tokens"
    :link="config.testnet.dapps.faucet.url"
    :icon="IconDroplet"
    type="alt"
  />
  <Feature
    title="BGT Station"
    description="Manage $BGT"
    :link="config.testnet.dapps.bgtStation.url"
    :icon="IconGavel"
    type="alt"
  />
  <Feature
    title="BEX"
    description="Berachain Native DEX"
    :link="config.testnet.dapps.bex.url"
    :icon="IconRefresh"
    type="alt"
  />
  <Feature
    title="Berps"
    description="Berachain Native Perps"
    :link="config.testnet.dapps.berps.url"
    :icon="IconChartHistogram"
    type="alt"
  />
  <Feature
    title="Bend"
    description="Berachain Native Lending"
    :link="config.testnet.dapps.bend.url"
    :icon="IconCoins"
    type="alt"
  />
  <Feature
    title="Honey Swap"
    description="Berachain $HONEY Swapping"
    :link="config.testnet.dapps.honeySwap.url"
    :icon="IconMoneybag"
    type="alt"
  />
  <Feature
    title="Berachain Foundation"
    description="Main Foundation Website"
    :link="config.testnet.dapps.foundation.url"
    :icon="IconWorld"
    type="alt"
  />
</section>

<style>
  .VPPage {
    padding: 32px 24px 96px 24px;
  }

  .VPPage .VPHero .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 60px;
  }

  .VPPage .VPHero .VPImageBackground {
    background-image: var(--vp-home-hero-image-background-image);
    border-radius: 50%;
    width: 192px;
    height: 192px;
    position: absolute;
    filter: var(--vp-home-hero-image-filter);
    left: 0;
    right: 0;
    margin: 0 auto;
  }

  .VPPage .VPHero .VPImage {
    position: relative;
    max-width: 192px;
    max-height: 192px;
    margin: 0 auto 15px auto;
    z-index: 10;
  }

  .VPPage .VPHero .logo {
    display: block;
    font-size: 32px;
    text-align: center;
  }

  .VPPage .VPHero .logo img {
    height: 30px;
    margin: 10px auto;
  }

  .VPPage .VPHero .title {
    font-size: 32px;
    font-weight: 700;
    text-align: center;
  }

  .VPPage .VPHero .description {
    font-size: 18px;
    line-height: 28px;
    font-weight: 500;
    text-align: center;
    color: var(--vp-c-text-2);
  }

  .VPPage h1 {
    letter-spacing: -0.02em;
    line-height: 40px;
    font-size: 28px;
    font-family: var(--vp-font-family-base);
    font-weight: 600;
  }

  .VPPage h2 {
    margin: 48px 0 16px;
    border-top: 1px solid var(--vp-c-divider);
    padding-top: 24px;
    letter-spacing: -0.02em;
    line-height: 32px;
    font-size: 24px;
    font-weight: 600;
  }

  .VPPage p {
    margin: 16px 0;
  }

  .VPPage ul {
    list-style: disc;
    padding-left: 1.25rem;
    margin: 16px 0;
    line-height: 24px;
  }

  .VPPage ul li a {
    color: var(--vp-c-brand-1);
    font-weight: 500;
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .VPPage .features {
    display: flex;
    gap: 16px;
    flex-flow: row wrap;
  }

  .VPPage .features > .VPFeature {
    flex: 1 1 100%;
  }

  @media (min-width: 768px) {
    .VPPage {
      padding: 48px 32px 96px 32px;
    }

    .VPPage h1 {
      letter-spacing: -0.02em;
      line-height: 40px;
    font-size: 32px;
    }
  }
  @media (min-width: 960px) {
    .VPPage {
      padding: 48px 32px 96px 32px;
    }

    .VPPage .VPHero .container {
      flex-direction: row-reverse;
      padding-bottom: 80px;
      align-items: center;
    }

    .VPPage .VPHero .logo {
      font-size: 56px;
      text-align: left;
      height: 72px;
      line-height: 72px;
      margin-bottom: 20px;
    }

    .VPPage .VPHero .logo img {
      height: 48px;
      margin-left: 0px;
      margin-right: 0px;
    }

    .VPPage .VPHero .title {
      font-size: 56px;
      line-height: 64px;
      text-align: left;
    }

    .VPPage .VPHero .description {
      line-height: 36px;
    font-size: 24px;
      text-align: left;
    }

    .VPPage .VPHero .VPImage {
      max-width: 320px;
      max-height: 320px;
    }

    .VPPage .VPHero .VPImageBackground {
      width: 320px;
      height: 320px;
      left: auto;
      right: auto;
      margin: 0;
    }
  }
  @media (min-width: 1440px) {
    .VPPage .features > .VPFeature {
      flex: 1 1 30%;
    }
  }
</style>
