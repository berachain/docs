<!-- 
Scripts 
========================================================
-->
<script lang="ts">
import { defineComponent } from 'vue';
// @ts-ignore
import * as RiveModule from '@rive-app/canvas';
const { Rive } = RiveModule;

export default defineComponent({
  name: 'Rive',
  props: {
    src: String
  },
  mounted() {
    const r = new Rive({
      canvas: this.$refs.canvas as HTMLCanvasElement | OffscreenCanvas,
      src: "/Fidget.riv",
      autoplay: true,
      stateMachines: ['State Machine 1'],
      onLoad: () => {
        r.resizeDrawingSurfaceToCanvas();
      }
    })
  }
})
</script>

<!-- 
Template 
========================================================
-->
<template>
  <div>
    <canvas ref="canvas" width="100" height="100"></canvas>
  </div>
</template>

