<script setup lang="ts">
    import {luminanceToContrast} from '@/functions/luminanceToContrast.function';
    import {rgbToLab} from '@/functions/rgbToLab.function';
    import type {RgbType} from '@/types/color-models.type';

    const props = defineProps<{
        foreground: RgbType,
        background: RgbType,
    }>();

    const contrastRatio = luminanceToContrast(
        rgbToLab(props.foreground).l,
        rgbToLab(props.background).l,
    );

    let scoreSmall = 'Fail';
    let scoreLarge = 'Fail';
    switch(contrastRatio) {
        case 3.0:
            scoreLarge = 'AA';
        case 4.5:
            scoreLarge = 'AAA';
            scoreSmall = 'AA';
        case 7.0:
            scoreSmall = 'AAA';
    }
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
