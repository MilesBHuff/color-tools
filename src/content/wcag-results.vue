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
    const contrastDeviance = 7.05 / 4; // The difference between 21-scaled CIEDE2000 and WCAG for 50% RGB gray (#7f7f7f)
    // const contrastDeviance = Math.sqrt(3); // This is eerily close to the above.

    interface ThresholdType {
        aa: number,
        aaa: number,
    }
    const smallThresholds: ThresholdType= {
        aa: 4.5 * contrastDeviance,
        aaa: 7.0 * contrastDeviance,
    }
    const largeThresholds: ThresholdType = {
        aa: 3.0 * contrastDeviance,
        aaa: 4.5 * contrastDeviance,
    }

    const calcScore = (contrast: number, aa: number, aaa: number): string =>
        contrast >= aaa ? 'AAA' : contrast >= aa ? 'AA' : 'Fail';
    const scoreSmall = computed(() => calcScore(contrast.value, smallThresholds.aa, smallThresholds.aaa));
    const scoreLarge = computed(() => calcScore(contrast.value, largeThresholds.aa, largeThresholds.aaa));
</script>
<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -->
<template>
    <form id="results">
        <div>
            <label for="ratio">Ratio:</label>
            <input id="ratio" name="ratio" disabled v-model="contrast"/>
            <span>
                Min=1
                <br/>
                Max=21
            </span>
        </div>
        <div>
            <label for="score-small">Score (Small):</label>
            <input id="score-small" name="score-small" disabled v-model="scoreSmall"/>
            <span>
                AA={{Math.round(smallThresholds.aa * 100) / 100}}
                <br/>
                AAA={{Math.round(smallThresholds.aaa * 100) / 100}}
            </span>
        </div>
        <div>
            <label for="score-large">Score (Large):</label>
            <input id="score-large" name="score-large" disabled v-model="scoreLarge"/>
            <span>
                AA={{Math.round(largeThresholds.aa * 100) / 100}}
                <br/>
                AAA={{Math.round(largeThresholds.aaa * 100) / 100}}
            </span>
        </div>
    </form>
</template>
<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -->
<style lang="scss" scoped>
</style>
