<script setup lang="ts">
    import {hexPattern, isValidHex} from '$/functions/is-valid-hex.function';
    import {rgbToString} from '$/functions/rgbToString.function copy';
    import {stringToRgb} from '$/functions/stringToRgb.function';
    import {newRGBColor} from '$/types/rgb-color';
    import type {GroundRefType} from '$/types/types';
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
        hexRef.raw = input;
        if(hexPattern.test(input)) {
            hexRef.rgb = stringToRgb(input);
            // console.debug('input-hex.vue\n', hexRef.rgb);
            emit('input', hexRef.rgb);
        }
    };

    const hexRef: GroundRefType = reactive({
        rgb: props.modelValue,
        raw: rgbToString(props.modelValue),
    });
    const hex = computed({
        get: () => hexRef.raw,
        set: setValues,
    });
    const hexValid = computed(() =>
        isValidHex(hex.value)
    );
</script>
<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -->
<template>
    <div :id="props.id">
        <label :for="props.id">
            {{capitalize(props.id) + ':'}}
        </label><input
            :name="props.id"
            v-model="hex"
            maxlength="6"
            required
            :class="{'invalid': !hexValid}"
        />
    </div>
</template>
<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -->
<style lang="scss" scoped>
    div {
        display: contents;

        >label {
            text-align: right;
            cursor: text;
        }
        >input {
            cursor: text;
            width: 6.25ch;
        }
        >span {
            font-family: monospace;
            height: 0;
            line-height: 1;
            text-align: right;
        }
    }
</style>
