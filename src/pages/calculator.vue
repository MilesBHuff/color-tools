<script setup lang="ts">
    import ColorInputs from '$/content/color-inputs.vue';
    import Renderer from '$/content/renderer.vue';
    import WcagResults from '$/content/wcag-results.vue';
    import {newRGBColor} from '$/types/rgb-color';
    import type {RGBColor} from 'color-diff';
    import {reactive} from 'vue';

    const colors = reactive({
        foreground: newRGBColor(),
        background: newRGBColor(),
    });

    const onSubmit = (data: {foreground: RGBColor, background: RGBColor}) => {
        colors.foreground = data.foreground;
        colors.background = data.background;
        // console.debug('calculator.vue\n', data.foreground, data.background);
    };
</script>
<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -->
<template>
    <div id="calculator">
        <div id="input">
            <ColorInputs @submit="onSubmit"/>
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
