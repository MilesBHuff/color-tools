<script setup lang="ts">
    import ColorInputs from '$/content/color-inputs.vue';
    import Renderer from '$/content/renderer.vue';
    import WCAGResults from '$/content/wcag-results.vue';
    import {newRGBColor} from '$/functions/new-rgb-color.function';
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
        <ColorInputs class="card" @submit="onSubmit"/>
        <Renderer class="card" :foreground="colors.foreground" :background="colors.background"/>
        <WCAGResults class="card" :foreground="colors.foreground" :background="colors.background"/>
    </div>
</template>
<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -->
<style lang="scss" scoped>
    #calculator {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        gap: 1rem;
        margin: 1rem;
    }

    .card {
        border-radius: 0.25rem;
        border: 1px solid #767676;
        background-color: #f6f6f6;
        padding: 1rem;
        height: min-content;
        width: fit-content;
    }
</style>
