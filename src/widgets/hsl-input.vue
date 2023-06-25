<script setup lang="ts">
    import {newRGBColor} from '$/functions/new-rgb-color.function';
    import HueInput from '$/widgets/hue-input.vue';
    import SatInput from '$/widgets/sat-input.vue';
    import LumInput from '$/widgets/lum-input.vue';
    import type {RGBColor} from 'color-diff';

    const props = withDefaults(defineProps<{
        id: string,
        modelValue?: RGBColor,
    }>(), {
        modelValue: () => newRGBColor(),
    });
    // const emit = defineEmits(['input']);

    const id = props.id + 'HSL';
</script>
<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -->
<template>
    <div :id="id">
        <HueInput :id="props.id"/>
        <SatInput :id="props.id"/>
        <LumInput :id="props.id"/>
    </div>
</template>
<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -->
<style lang="scss" scoped>
    div {
        display: flex;
        flex-direction: row;
        align-items: center;
        // gap: 0.5ch;
    }
</style>
