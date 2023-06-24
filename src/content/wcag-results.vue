<script setup lang="ts">
    import {luminanceToContrast} from '$/functions/luminanceToContrast.function';
    import {rgbToLab} from '$/functions/rgbToLab.function';
    import type {RGBColor} from 'color-diff';
    import {computed} from 'vue';

    const props = defineProps<{
        foreground: RGBColor,
        background: RGBColor,
    }>();

    const contrast = computed(() => luminanceToContrast(
        rgbToLab(props.foreground).L / 100,
        rgbToLab(props.background).L / 100,
    ));

    const calcScore = (contrast: number, aa: number, aaa: number): string => {
        switch(contrast) {
            case aaa:
                return 'AAA';
            case aa:
                return 'AA';
            default:
                return 'Fail';
        }
    }
    const scoreSmall = computed(() => calcScore(contrast.value, 4.5, 7.0));
    const scoreLarge = computed(() => calcScore(contrast.value, 3.0, 4.5));
</script>
<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -->
<template>
    <form id="results">
        <div>
            <label for="ratio">Ratio:</label>
            <input id="ratio" name="ratio" disabled v-model="contrast"/>
        </div>
        <div>
            <label for="score-small">Score (Small):</label>
            <input id="score-small" name="score-small" disabled v-model="scoreSmall"/>
        </div>
        <div>
            <label for="score-large">Score (Large):</label>
            <input id="score-large" name="score-large" disabled v-model="scoreLarge"/>
        </div>
    </form>
</template>
<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -->
<style lang="scss" scoped>
</style>
