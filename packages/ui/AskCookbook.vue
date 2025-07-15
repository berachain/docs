<!-- 
Scripts 
========================================================
-->

<script setup lang="ts">
// It's a public API Key, so it's fine to expose it here
const COOKBOOK_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjE5N2EwN2U5OGJiYTgwM2ZiNGI0YzciLCJpYXQiOjE3MTI5NDU2NzEsImV4cCI6MjAyODUyMTY3MX0.Kcmgeb14z5-w0exHfo0W9rgS-wVhinFteCsPAMLQPoU";

if (typeof document !== "undefined") {
  let script = document.getElementById("__cookbook-script") as HTMLScriptElement | null;;
  if (!script) {
    script = document.createElement("script") as HTMLScriptElement;
    script.src =
      "https://cdn.jsdelivr.net/npm/@cookbookdev/docsbot/dist/standalone/index.cjs.js";
    script.id = "__cookbook-script";
    script.async = true;
    document.body.appendChild(script);
    console.log("🍳 Added Cookbook script" + document.body);
  }
}
</script>

<!-- 
Template 
========================================================
-->
<template>
  <div
    id="__cookbook"
    :data-api-key="COOKBOOK_API_KEY"
  ></div>
</template>
