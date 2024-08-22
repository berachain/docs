<!-- 
Scripts 
========================================================
-->
<script setup lang="ts">
const props = defineProps({
    title: String,
    description: String,
    link: String,
    icon: Function,
    stroke: Boolean,
    fill: Boolean,
});
</script>

<!-- 
Template 
========================================================
-->
<template>
  <a class="VPFeature" :href=props.link>
    <span v-if="icon" class="VPFeature-Icon-BG">
      <icon class="VPFeature-Icon" stroke="1.5" size="36" />
    </span>
    <span>
      <h3 class="title">{{ props.title }}</h3>
      <p class="description">{{ props.description }}</p>
    </span>
  </a>
</template>

<!-- 
Styles 
========================================================
-->
<style scoped>
.VPFeature {
  display: flex;
  border: 1px solid var(--vp-feature-button-border);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  transition: border-color .25s,background-color .25s;
  padding: 24px;
  gap: 24px;
  transition: all 0 ease-in-out 250ms;
}

.VPFeature:hover {
  border: 1px solid var(--vp-c-brand-1);
}

.VPFeature-Icon-BG {
  background: var(--vp-home-hero-name-background);
  background-clip: text;
  -webkit-background-clip: text;
  width: 36px;
  height: 36px;
}

.VPFeature .VPFeature-Icon {
  min-width: 36px;
  min-height: 36px;
  max-width: 36px;
  max-height: 36px;
  stroke: var(--vp-c-brand-1);
}

.VPFeature .title {
  letter-spacing: -0.01em;
  line-height: 28px;
  font-size: 20px;
  font-weight: 600;
}

.VPFeature .description {
  margin: 0px;
}
</style>