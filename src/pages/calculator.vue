<script setup lang="ts">
    import HexInput from '$/content/hex-input.vue';
    import Renderer from '$/content/renderer.vue';
    import WcagResults from '$/content/wcag-results.vue';
    import type {RGBColor} from 'color-diff';
    import {reactive} from 'vue';

    const colors = reactive({
        foreground: {R: 0x00, G: 0x00, B: 0x00} as RGBColor,
        background: {R: 0xff, G: 0xff, B: 0xff} as RGBColor,
    });

    const handleSubmission = (data: {foreground: RGBColor, background: RGBColor}) => {
        colors.foreground = data.foreground;
        colors.background = data.background;
    };
</script>
<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -->
<template>
    <div id="calculator">
        <div id="input">
            <HexInput @submit="handleSubmission"/>
        </div>
        <div id="output">
            <WcagResults :foreground="colors.foreground" :background="colors.background"/>
            <Renderer :foreground="colors.foreground" :background="colors.background"/>
        </div>
    </div>
</template>
<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -->
<style lang="scss" scoped>

    #calculator {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        margin: 1rem;
    }

    #output, #input {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
</style>
