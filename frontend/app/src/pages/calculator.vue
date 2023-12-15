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
        <Renderer class="card" :foreground="colors.foreground" :background="colors.background"/>
        <div id="forms">
            <ColorInputs class="card" @submit="onSubmit"/>
            <WCAGResults class="card" :foreground="colors.foreground" :background="colors.background"/>
        </div>
    </div>
</template>
<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -->
<style lang="scss" scoped>
    #calculator {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        justify-content: center;
        align-items: center;
        height: 100%;
    }
    #forms {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        gap: 1rem;

        align-items: center;
        justify-content: center;
    }

    .card {
        border-radius: 0.25rem;
        background-color: rgba($color: #fff, $alpha: 0.8);
        padding: 1rem;
        box-shadow: 0 0 0.125rem #000;
    }
</style>
