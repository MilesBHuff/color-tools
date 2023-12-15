<script setup lang="ts">
    import {labToContrast} from '$/functions/labToContrast.function';
    import {labToDifference} from '$/functions/labToDifference.function';
    import {rgbToContrast} from '$/functions/rgbToContrast.function';
    import {rgbToLab} from '$/functions/rgbToLab.function';
    import {round} from '$/functions/round.function';
    import type {RGBColor} from 'color-diff';
    import {computed, ref, type Ref} from 'vue';

    const props = defineProps<{
        foreground: RGBColor,
        background: RGBColor,
    }>();

    const foregroundLab = computed(() => rgbToLab(props.foreground));
    const backgroundLab = computed(() => rgbToLab(props.background));

    const enum MethodType {
        WCAG_RGB = 0,
        WCAG_Lab = 1,
        CIEDE2000 = 2,
    }
    const method: Ref<MethodType> = ref(MethodType.WCAG_RGB);

    const contrast = computed(() => {switch(method.value) {

        case MethodType.WCAG_RGB:
            return rgbToContrast(props.foreground, props.background);

        case MethodType.WCAG_Lab:
            return labToContrast(foregroundLab.value, backgroundLab.value);

        case MethodType.CIEDE2000:
            return labToDifference(foregroundLab.value, backgroundLab.value);
    }});
    const contrastDeviance = computed(() => {switch(method.value) {

        case MethodType.WCAG_RGB:
            return 1;

        case MethodType.WCAG_Lab:
            return 1.92 / 4.54; // The difference between Lab-luminance contrast-ratio and WCAG-luminance contrast-ratio for #767676, the gray closest to a 4.5 CR in WCAG.

        case MethodType.CIEDE2000:
            return 8.371755338567073 / 4.54; // The difference between 21-scaled CIEDE2000 and WCAG for #767676, the gray closest to a 4.5 CR in WCAG.
    }});

    interface ThresholdType {
        aa: number,
        aaa: number,
    }
    const smallThresholds = computed<ThresholdType>(() => ({
        aa: 4.5 * contrastDeviance.value,
        aaa: 7.0 * contrastDeviance.value,
    }));
    const largeThresholds = computed<ThresholdType>(() => ({
        aa: 3.0 * contrastDeviance.value,
        aaa: 4.5 * contrastDeviance.value,
    }));

    const calcScore = (contrast: number, aa: number, aaa: number): string =>
        contrast >= aaa ? 'AAA' : contrast >= aa ? 'AA' : 'Fail';
    const scoreSmall = computed(() => calcScore(contrast.value, smallThresholds.value.aa, smallThresholds.value.aaa));
    const scoreLarge = computed(() => calcScore(contrast.value, largeThresholds.value.aa, largeThresholds.value.aaa));
</script>
<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -->
<template>
    <form id="results">
        <div id="method">
            <label for="method">Method:</label>
            <select name="method" v-model="method" required>
                <option :value="MethodType.WCAG_RGB">WCAG (RGB)</option>
                <option :value="MethodType.WCAG_Lab">WCAG (Lab)</option>
                <option :value="MethodType.CIEDE2000">CIEDE2000</option>
            </select>
            <span></span>
        </div>
        <div id="ratio">
            <label for="ratio">Ratio:</label>
            <span class="input-wrapper">
                <input v-no-auto-input name="ratio" disabled :value="round(contrast)"/>:1
            </span>
            <span>
                Min=1
                <br/>
                Max=21
            </span>
        </div>
        <div id="score-small">
            <label for="score-small">Score (Small):</label>
            <input v-no-auto-input name="score-small" disabled :value="scoreSmall"/>
            <span>
                AA={{round(smallThresholds.aa, 1).toString(10)}}
                <br/>
                AAA={{round(smallThresholds.aaa, 1).toString(10)}}
            </span>
        </div>
        <div id="score-large">
            <label for="score-large">Score (Large):</label>
            <input v-no-auto-input name="score-large" disabled :value="scoreLarge"/>
            <span>
                AA={{round(largeThresholds.aa, 1).toString(10)}}
                <br/>
                AAA={{round(largeThresholds.aaa, 1).toString(10)}}
            </span>
        </div>
    </form>
</template>
<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -->
<style lang="scss" scoped>
    form {
        display: grid;
        grid: 'L I T';
        gap: 0.5rem 1ch;
        height: min-content;
        width: fit-content;

        >div {
            display: contents;

            label {
                text-align: right;
                cursor: text;
            }
            select {
                width: 12.75ch;
            }
            input {
                cursor: text;
                width: 5.25ch;
            }
            >span:not(.input-wrapper) {
                font-size: calc(1rem * 9/12);
                font-family: monospace;
                height: 0;
                line-height: 1;
                text-align: right;
            }
        }
    }
</style>
