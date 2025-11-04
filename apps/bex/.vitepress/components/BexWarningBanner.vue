<!-- 
BEX Warning Banner Component
Shows a persistent banner across all BEX documentation pages
-->
<script setup>
import config from '@berachain/config/constants.json';
</script>

<template>
  <div class="BexWarningBanner">
    <span class="BexWarningBannerIcon">⚠️</span>
    <span class="BexWarningBannerText">
      <span>BEX pools are paused until further notice.</span>
      <span class="BexWarningBannerFollow"> Follow the <a :href="config.socials.twitter" target="_blank" rel="noopener noreferrer">Berachain Foundation</a> for updates.</span>
    </span>
  </div>
</template>

<style scoped>
.BexWarningBanner {
  background: var(--vp-c-brand-1);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 40px;
  width: 100%;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-bg);
  z-index: 1000;
  padding: 0 16px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.BexWarningBannerIcon {
  flex-shrink: 0;
  font-size: 18px;
}

.BexWarningBannerText {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px;
}

.BexWarningBannerFollow {
  white-space: nowrap;
}

.BexWarningBanner a {
  color: var(--vp-c-bg);
  text-decoration: underline;
  font-weight: 600;
}

.BexWarningBanner a:hover {
  opacity: 0.8;
}

@media (min-width: 768px) {
  .BexWarningBanner {
    font-size: 15px;
  }
}
</style>

<style>
/* Push nav bar down to account for fixed banner */
.VPNav {
  margin-top: 40px;
}
</style>
