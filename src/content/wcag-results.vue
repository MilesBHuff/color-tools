<script setup lang="ts">
    import {computed} from '#/vue';
    import {luminanceToContrast} from '$/functions/luminanceToContrast.function';
    import {rgbToLab} from '$/functions/rgbToLab.function';
    import type {RgbType} from '$/types/color-models.type';

    const props = defineProps<{
        foreground: RgbType,
        background: RgbType,
    }>();

    const contrastRatio = computed(() => luminanceToContrast(
        rgbToLab(props.foreground).l,
        rgbToLab(props.background).l,
    ));

    const scoreSmall = computed(() => {
        switch(contrastRatio.value) {
            case 7.0:
                return 'AAA';
            case 4.5:
                return 'AA';
            default:
                return 'Fail';
        }
    });
    const scoreLarge = computed(() => {
        switch(contrastRatio.value) {
            case 4.5:
                return 'AAA';
            case 3.0:
                return 'AA';
            default:
                return 'Fail';
        }
    });
</script>
<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -->
<template>
    <form id="results">
        <div>
            <label for="ratio">Ratio:</label>
            <input id="ratio" name="ratio" disabled v-model="contrastRatio"/>
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
