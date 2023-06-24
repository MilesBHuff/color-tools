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
        rgbToLab(props.foreground),
        rgbToLab(props.background),
    ));
    // const contrastDeviance = 7.05 / 4; // The difference between 21-scaled CIEDE2000 and WCAG for 50% RGB gray (#7f7f7f)
    const contrastDeviance = Math.sqrt(3); // This is eerily close to the above.

    const calcScore = (contrast: number, aa: number, aaa: number): string =>
        contrast >= aaa ? 'AAA' : contrast >= aa ? 'AA' : 'Fail';
    const scoreSmall = computed(() => calcScore(contrast.value, 4.5 * contrastDeviance, 7.0 * contrastDeviance));
    const scoreLarge = computed(() => calcScore(contrast.value, 3.0 * contrastDeviance, 4.5 * contrastDeviance));
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
