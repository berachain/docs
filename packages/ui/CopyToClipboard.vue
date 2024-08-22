<!-- 
Scripts 
========================================================
Note: Component built to be used in documentation tables
If using for other areas, it's recommended to refactor to support additional alignment styles
-->
<script setup>

import { ClipboardIcon } from '@heroicons/vue/24/outline';
import { CheckCircleIcon } from '@heroicons/vue/24/solid';
import { ref } from 'vue';

const clicked = ref(false);
const props = defineProps({
  text: String
});

const copyToClipboard = () => {
    navigator.clipboard.writeText(props.text).then(() => {
        clicked.value = true;
        setTimeout(() => {
            clicked.value = false;
        }, 600);
    }).catch(err => {
        alert('Failed to copy text');
    });
}

</script>

<!-- 
Template 
========================================================
-->
<template>
    <div class="outer">
        <div class="inner">
            {{props.text}}
        </div>
        <button v-if="clicked" class="btn">
            <CheckCircleIcon class="h-fit w-fit clipboardicon" />
        </button>
        <button v-else="clicked" @click="copyToClipboard" class="btn">
            <ClipboardIcon class="h-fit w-fit clipboardicon" />
        </button>
    </div>
</template>
  
<!-- 
Styles 
========================================================
-->
<style>
.outer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.inner {
    margin-right: 1em;
}

.btn {
    height: 24px;
    width: 24px;
}

.clipboardicon {
    height: 18px;
    width: 18px;
    opacity: 0.4;
}

.clipboardicon:hover {
    opacity: 1;
}
</style>