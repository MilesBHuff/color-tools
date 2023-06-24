<script setup lang="ts">
    import {labToContrast} from '$/functions/labToContrast.function';
    import {labToDifference} from '$/functions/labToDifference.function';
    import {rgbToContrast} from '$/functions/rgbToContrast.function';
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

    enum MethodType {
        WCAG = 0,
        Lab_WCAG = 1,
        CIEDE2000 = 2,
    }
    const method: MethodType = MethodType.WCAG;

    const contrast = computed(() => {switch(method as MethodType) {

        case MethodType.WCAG:
            return rgbToContrast(props.foreground, props.background);

        case MethodType.Lab_WCAG:
            return labToContrast(foregroundLab, backgroundLab);

        case MethodType.CIEDE2000:
            return labToDifference(foregroundLab, backgroundLab);
    }});
    const contrastDeviance = (() => {switch(method as MethodType) {

        case MethodType.WCAG:
            return 1;

        case MethodType.Lab_WCAG:
            return 1.92 / 4.54; // The difference between Lab-luminance contrast-ratio and WCAG-luminance contrast-ratio for #767676, the gray closest to a 4.5 CR in WCAG.

        case MethodType.CIEDE2000:
            return 8.371755338567073 / 4.54; // The difference between 21-scaled CIEDE2000 and WCAG for #767676, the gray closest to a 4.5 CR in WCAG.
    }})();

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
