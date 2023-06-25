<script setup lang="ts">
    import {isValidHex} from '$/functions/is-valid-hex.function';
    import {rgbToString} from '$/functions/rgbToString.function copy';
    import {stringToRgb} from '$/functions/stringToRgb.function';
    import {newRGBColor} from '$/functions/new-rgb-color.function';
    import type {ModelViewPair} from '$/types/model-view-pair.type';
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
        </label><span class="input-wrapper">
            #<input
                :name="id"
                v-model="model"
                maxlength="6"
                required
                :class="{'invalid': !modelValid}"
            />
        </span>
    </div>
</template>
<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -->
<style lang="scss" scoped>
    label {
        justify-self: flex-start;
        cursor: text;
    }
    .input-wrapper {
        justify-self: flex-end;
    }
    input {
        cursor: text;
        width: 6.25ch;
    }
</style>
