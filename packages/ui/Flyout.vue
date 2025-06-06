<!-- 
Scripts 
========================================================
-->
<script lang="ts" setup>
import { ref } from 'vue';
import { useFlyout } from 'vitepress/dist/client/theme-default/composables/flyout';
import VPIconChevronDown from 'vitepress/dist/client/theme-default/components/icons/VPIconChevronDown.vue'
import VPIconMoreHorizontal from 'vitepress/dist/client/theme-default/components/icons/VPIconMoreHorizontal.vue'
import VPMenu from 'vitepress/dist/client/theme-default/components/VPMenu.vue'

defineProps<{
  icon?: any
  button?: string
  label?: string
  items?: any[]
}>()

const open = ref(false)
const el = ref<HTMLElement>()

useFlyout({ el, onBlur })

function onBlur() {
  open.value = false
}
</script>

<!-- 
Template 
========================================================
-->
<template>
  <div
    class="VPFlyout"
    ref="el"
    @mouseenter="open = true"
    @mouseleave="open = false"
  >
    <button
      type="button"
      class="button"
      aria-haspopup="true"
      :aria-expanded="open"
      :aria-label="label"
      @click="open = !open"
    >
      <span v-if="button || icon" class="text">
        <component v-if="icon" :is="icon" class="option-icon" />
        <span v-if="button" v-html="button"></span>
        <VPIconChevronDown class="text-icon" />
      </span>

      <VPIconMoreHorizontal v-else class="icon" />
    </button>

    <div class="menu">
      <VPMenu :items="items">
        <slot />
      </VPMenu>
    </div>
  </div>
</template>

<!-- 
Styles 
========================================================
-->
<style scoped>
.VPFlyout {
  position: relative;
}

.VPFlyout .text {
  background: var(--vp-c-neutral-inverse);
  border: 1px solid var(--vp-input-border-color);
  border-radius: 8px;
  height: auto;
  line-height: 36px;
  padding-left: 12px;
  padding-right: 12px;
}

.VPFlyout:hover {
  color: var(--vp-c-brand-1);
  transition: color 0.25s;
}

.VPFlyout:hover .text {
  color: var(--vp-c-text-2);
}

.VPFlyout:hover .icon {
  fill: var(--vp-c-text-2);
}

.VPFlyout.active .text {
  color: var(--vp-c-brand-1);
}

.VPFlyout.active:hover .text {
  color: var(--vp-c-brand-2);
}

.VPFlyout:hover .menu,
.button[aria-expanded="true"] + .menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.button[aria-expanded="false"] + .menu {
  opacity: 0;
  visibility: hidden;
  transform: translateY(0);
}

.button {
  display: flex;
  align-items: center;
  padding: 0 12px;
  height: var(--vp-nav-height);
  color: var(--vp-c-text-1);
  transition: color 0.5s;
}

.text {
  display: flex;
  align-items: center;
  line-height: var(--vp-nav-height);
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}

.option-icon {
  margin-right: 0px;
  width: 16px;
  height: 16px;
  fill: currentColor;
}

.text-icon {
  margin-left: 4px;
  width: 14px;
  height: 14px;
  fill: currentColor;
}

.icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
  transition: fill 0.25s;
}

.menu {
  position: absolute;
  top: calc(var(--vp-nav-height) / 2 + 20px);
  right: 0;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.25s, visibility 0.25s, transform 0.25s;
  z-index: 1000;
}
</style>
