<script setup lang="ts">
    import {labToContrast} from '$/functions/labToContrast.function';
    import {labToDifference} from '$/functions/labToDifference.function';
    import {rgbToLab} from '$/functions/rgbToLab.function';
    import {round} from '$/functions/round.function';
    import type {RGBColor} from 'color-diff';
    import {computed} from 'vue';

    const props = defineProps<{
        foreground: RGBColor,
        background: RGBColor,
    }>();

    const foregroundLab = rgbToLab(props.foreground);
    const backgroundLab = rgbToLab(props.background);

    const useDifference = true;
    const contrast = computed(() => useDifference
        ? labToDifference(
            foregroundLab,
            backgroundLab,
        )
        : labToContrast(
            foregroundLab,
            backgroundLab ,
        )
    );
    const contrastDeviance = useDifference
        ? 8.371755338567073 / 4.54 // The difference between 21-scaled CIEDE2000 and WCAG for 50% RGB gray (#7f7f7f)
        : 1.92 / 4.54;

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
            <input id="ratio" name="ratio" disabled :value="round(contrast)"/>
            <span>
                Min=1
                <br/>
                Max=21
            </span>
        </div>
        <div>
            <label for="score-small">Score (Small):</label>
            <input id="score-small" name="score-small" disabled :value="scoreSmall"/>
            <span>
                AA={{round(smallThresholds.aa)}}
                <br/>
                AAA={{round(smallThresholds.aaa)}}
            </span>
        </div>
        <div>
            <label for="score-large">Score (Large):</label>
            <input id="score-large" name="score-large" disabled :value="scoreLarge"/>
            <span>
                AA={{round(largeThresholds.aa)}}
                <br/>
                AAA={{round(largeThresholds.aaa)}}
            </span>
        </div>
    </form>
</template>
<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -->
<style lang="scss" scoped>
</style>
