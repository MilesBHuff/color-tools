<script setup lang="ts">
    import {isValidHex} from '$/functions/is-valid-hex.function';
    import {rgbToString} from '$/functions/rgbToString.function copy';
    import {stringToRgb} from '$/functions/stringToRgb.function';
    import {newRGBColor} from '$/types/rgb-color';
    import type {ModelViewPair} from '$/types/types';
    import type {RGBColor} from 'color-diff';
    import {capitalize, computed, reactive} from 'vue';

    const props = withDefaults(defineProps<{
        id: string,
        modelValue?: RGBColor,
    }>(), {
        modelValue: () => newRGBColor(),
    });
    const emit = defineEmits(['input']);

    const setValues = (input: string): void => {
        modelRef.view = input;
        if(modelValid) {
            modelRef.model = stringToRgb(input);
            // console.debug('hex-input.vue\n', modelRef.model);
            emit('input', modelRef.model);
        }
    };

    const modelRef: ModelViewPair<RGBColor> = reactive({
        model: props.modelValue,
        view: rgbToString(props.modelValue),
    });
    const model = computed({
        get: () => modelRef.view,
        set: setValues,
    });
    const modelValid = computed(() =>
        isValidHex(model.value)
    );

    const id = props.id + 'Hex';
</script>
<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -->
<template>
    <div :id="id">
        <label :for="id">
            {{capitalize(props.id) + ':'}}
        </label><input
            :name="id"
            v-model="model"
            maxlength="6"
            required
            :class="{'invalid': !modelValid}"
        />
    </div>
</template>
<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -->
<style lang="scss" scoped>
    label {
        justify-self: flex-start;
        cursor: text;
    }
    input {
        justify-self: flex-end;
        cursor: text;
        width: 6.25ch;
    }
    span {
        font-family: monospace;
        height: 0;
        line-height: 1;
        text-align: right;
    }
</style>
