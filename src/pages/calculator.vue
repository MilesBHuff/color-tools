<script setup lang="ts">
    import HexInput from '$/content/hex-input.vue';
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
            <div id="renderer" :style="{
                'color': `rgb(${colors.foreground.R}, ${colors.foreground.G}, ${colors.foreground.B})`,
                'border-color': `rgb(${colors.foreground.R}, ${colors.foreground.G}, ${colors.foreground.B})`,
                'background-color': `rgb(${colors.background.R}, ${colors.background.G}, ${colors.background.B})`,
            }">
                <span id="text-small">Lorem ipsum dolor sit amet</span>
                <span id="text-large">consectetur adipiscing elit</span>
            </div>
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

    #renderer {
        border-radius: 0.25rem;
        padding: 2rem;
        height: min-content;
        width: fit-content;

        background-color: #fff;
        color: #000;
        border: 1px solid #000;

        display: flex;
        flex-direction: column;
        gap: 1ex;

        >#text-small {
            font-size: 12pt;
        }
        >#text-large {
            font-size: 18pt;
        }
    }
</style>
