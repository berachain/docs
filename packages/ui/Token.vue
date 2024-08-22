<!-- 
Scripts 
========================================================
-->
<script setup lang="ts">
  const props = defineProps({
    title: String,
    image: {
      type: String,
      default: ""
    }
  });
</script>

<!-- 
Template 
========================================================
-->
<template>
  <div class="token">
    <img v-if="props.image" :src="props.image" />
    {{props.title}}
  </div>
</template>

<!-- 
Styles 
========================================================
-->
<style scoped>
  .token {
    display: flex;
    gap: 12px;
    align-items: center;
    background: var(--vp-c-neutral-inverse);
    border: 1px solid var(--vp-input-border-color);
    padding: 16px 20px;
    border-radius: 8px;
    font-weight: 600;
    transition: all 250ms ease-in-out 0s;
  }

  .token:hover {
    border: 1px solid var(--vp-c-brand-1);
  }

  .token img {
    display: block;
    width: 48px;
    height: 48px;
  }
</style>