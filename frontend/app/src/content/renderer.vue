<script setup lang="ts">
    import type {RGBColor} from 'color-diff';

    const props = defineProps<{
        foreground: RGBColor,
        background: RGBColor,
    }>();
</script>
<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -->
<template>
    <div id="renderer" :style="{
        'color': `rgb(${props.foreground.R}, ${props.foreground.G}, ${props.foreground.B})`,
        'border-color': `rgb(${props.foreground.R}, ${props.foreground.G}, ${props.foreground.B})`,
        'background-color': `rgb(${props.background.R}, ${props.background.G}, ${props.background.B})`,
    }">
        <span id="text-small">Lorem ipsum dolor sit amet</span>
        <span id="text-large">consectetur adipiscing elit</span>
    </div>
</template>
<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -->
<style lang="scss" scoped>
    #renderer {
        padding: 2rem;
        justify-content: center;

        background-color: #fff;
        color: #000;
        border: 1px solid #000;
        box-shadow: none;

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
