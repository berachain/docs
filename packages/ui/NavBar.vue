<!-- 
Scripts 
========================================================
-->
<script lang="ts" setup>
// @ts-ignore
import { useWindowScroll } from '@vueuse/core';
import { ref, watchPostEffect } from 'vue';
import { useData } from 'vitepress';
import { useSidebar } from 'vitepress/theme';
import VPNavBarAppearance from 'vitepress/dist/client/theme-default/components/VPNavBarAppearance.vue';
import VPNavBarExtra from 'vitepress/dist/client/theme-default/components/VPNavBarExtra.vue';
import VPNavBarHamburger from 'vitepress/dist/client/theme-default/components/VPNavBarHamburger.vue';
import VPNavBarMenu from 'vitepress/dist/client/theme-default/components/VPNavBarMenu.vue';
import VPNavBarSearch from 'vitepress/dist/client/theme-default/components/VPNavBarSearch.vue';
import VPNavBarSocialLinks from 'vitepress/dist/client/theme-default/components/VPNavBarSocialLinks.vue';
import VPNavBarTitle from 'vitepress/dist/client/theme-default/components/VPNavBarTitle.vue';
import VPNavBarTranslations from 'vitepress/dist/client/theme-default/components/VPNavBarTranslations.vue';
import AskCookbook from '@berachain/ui/AskCookbook';

// Instances
defineProps<{ isScreenOpen: boolean }>();
defineEmits<{ (e: 'toggle-screen'): void }>();

// @ts-ignore
const { y } = useWindowScroll()
const { hasSidebar } = useSidebar()
const { frontmatter } = useData()
const classes = ref<Record<string, boolean>>({})

// Watchers
watchPostEffect(() => {
  classes.value = {
    'has-sidebar': hasSidebar.value,
    top: frontmatter.value.layout === 'home' && y.value === 0,
  }
})


</script>

<!-- 
Template 
========================================================
-->
<template>
  <div class="VPNavBar" :class="classes">
    <div class="container">
      <div class="title-container">
        <VPNavBarTitle>
          <template #nav-bar-title-before>
            <slot name="nav-bar-title-before" />
          </template>
          <template #nav-bar-title-after>
            <slot name="nav-bar-title-after" />
          </template>
        </VPNavBarTitle>
      </div>

      <div class="content">
        <div class="curtain" />
        <div class="content-body">
          <slot name="nav-bar-content-before" />
          <VPNavBarMenu class="menu" />
          <VPNavBarSearch class="search" />
          <VPNavBarTranslations class="translations" />
          <VPNavBarAppearance class="appearance" />
          <VPNavBarSocialLinks class="social-links" />
          <VPNavBarExtra class="extra" />
          <slot name="nav-bar-content-after" />
          <VPNavBarHamburger class="hamburger" :active="isScreenOpen" @click="$emit('toggle-screen')" />
        </div>
      </div>
    </div>
  </div>
  <AskCookbook />
</template>

<!-- 
Styles 
========================================================
-->
<style>
.VPNavBarMenu.menu .menu .VPMenu {
  background: var(--vp-c-bg);
}

@media (min-width: 960px) {
  .VPNavBarTitle.has-sidebar .title {
    width: var(--vp-sidebar-width);
    padding: 0 24px;
  }

  .VPNavBar.has-sidebar .content-body {
    border-bottom: 1px solid var(--vp-c-divider);
  }
}
</style>

<style scoped>
.VPNavBar {
  position: relative;
  border-bottom: 1px solid transparent;
  padding: 0 8px 0 24px;
  height: var(--vp-nav-height);
  pointer-events: none;
  white-space: nowrap;
}

.container {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: calc(var(--vp-layout-max-width) - 64px);
  height: var(--vp-nav-height);
  pointer-events: none;
}

.container>.title,
.container>.content {
  pointer-events: none;
}

.container :deep(*) {
  pointer-events: auto;
}

.title-container {
  /* flex-shrink: 0;
  height: calc(var(--vp-nav-height) - 1px);
  transition: background-color 0.5s; */
}

.content {
  flex-grow: 1;
}

.extra {
  padding-right: 12px;
}

.search-bar {
  padding: 0;
}

.search {
  justify-content: flex-end;
  padding-right: 16px;
}

.content-body {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: var(--vp-nav-height);
  transition: background-color 0.5s;
}

.menu+.translations::before,
.menu+.appearance::before,
.menu+.social-links::before,
.translations+.appearance::before,
.appearance+.social-links::before {
  margin-right: 8px;
  margin-left: 8px;
  width: 1px;
  height: 24px;
  background-color: var(--vp-c-divider);
  content: "";
}

.menu+.appearance::before,
.translations+.appearance::before {
  margin-right: 16px;
}

.appearance+.social-links::before {
  margin-left: 16px;
}

.social-links {
  margin-right: 24px;
}

/* Media Queries 
======================================================== */
@media (max-width: 767px) {
  .content-body {
    column-gap: 0.5rem;
  }
}

@media (min-width: 768px) {
  .VPNavBar {
    padding: 0 32px;
  }

  .menu {
    padding-left: 12px;
  }
}

@media (min-width: 960px) {
  .VPNavBar.has-sidebar {
    padding: 0;
  }

  .VPNavBar:not(.has-sidebar):not(.top) {
    /* border-bottom-color: var(--vp-c-gutter); */
    background-color: var(--vp-nav-bg-color);
  }

  .VPNavBar.has-sidebar .container {
    max-width: 100%;
  }

  .menu {
    padding-left: 12px;
  }


  .VPNavBar:not(.top) .content-body {
    position: relative;
    background-color: var(--vp-nav-bg-color);
  }

  .VPNavBar.has-sidebar .curtain {
    position: absolute;
    right: 0;
    bottom: -31px;
    width: calc(100% - var(--vp-sidebar-width));
    height: 32px;
  }

  .VPNavBar.has-sidebar .curtain::before {
    display: block;
    width: 100%;
    height: 32px;
    background: linear-gradient(var(--vp-c-bg), transparent 70%);
    content: "";
  }
}

@media (min-width: 1440px) {
  .menu {
    padding-left: 12px;
  }

  /* .VPNavBar.has-sidebar .title {
    padding-left: 24px;
    width: var(--vp-sidebar-width);
  } */

  .VPNavBar.has-sidebar .content {
    /* padding-right: 0;
    padding-left: var(--vp-sidebar-width); */

  }

  .VPNavBar.has-sidebar .curtain {
    width: calc(100% - ((100vw - var(--vp-layout-max-width)) / 2 + var(--vp-sidebar-width)));
  }
}
</style>
