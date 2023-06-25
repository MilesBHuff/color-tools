<script setup lang="ts">
    import {newRGBColor} from '$/types/rgb-color';
    import HexInput from '$/widgets/hex-input.vue'
    import type {RGBColor} from 'color-diff';
    import {onMounted, reactive} from 'vue';

    enum IdType {
        foreground = 'foreground',
        background = 'background',
    }
    const ids = Object.keys(IdType) as Array<IdType>;

    const inputs: {[key in IdType]: RGBColor} = reactive({
        [IdType.foreground]: newRGBColor(0x00, 0x00, 0x00),
        [IdType.background]: newRGBColor(0xff, 0xff, 0xff),
    });

    const emit = defineEmits(['submit']);
    const onSubmit = (_event?: Event): void => {
        // console.debug('color-input.vue\n', inputs[IdType.foreground], inputs[IdType.background]);
        emit('submit', {
            foreground: inputs[IdType.foreground],
            background: inputs[IdType.background],
        });
    };
    onMounted(onSubmit);

    const onInput = (id: IdType, value: RGBColor) => {
        inputs[id] = value;
        onSubmit();
    };
</script>
<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -->
<template>
    <form @submit.prevent="onSubmit">
        <HexInput @input="value => onInput(id, value)" v-for="id of ids" :key="id" :id="id" v-model="inputs[id]"/>
    </form>
</template>
<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -->
<style lang="scss" scoped>
    form {
        display: grid;
        grid: 'L I';
        gap: 0.5rem 1ch;
        height: min-content;
        width: fit-content;
    }
</style>
