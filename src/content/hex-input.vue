<script setup lang="ts">
    import {stringToRgb} from '$/functions/stringToRgb.function';
    import type {RGBColor} from 'color-diff';
    import {computed, reactive} from 'vue';

    interface GroundRefType {
        raw: string,
        rgb: RGBColor,
    }

    const hexPattern = /^(?:[a-f0-9]{3}|[a-f0-9]{6})$/i;

    const isValidHex = (value: string): boolean => hexPattern.test(value);

    const setValues = (targetRef: GroundRefType) =>
        (input: string): void => {
            targetRef.raw = input;
            if(hexPattern.test(input)) {
                targetRef.rgb = stringToRgb(input);
            }
        }

    const foregroundRef: GroundRefType = reactive({
        raw: '000000',
        rgb: {R: 0x00, G: 0x00, B: 0x00},
    });
    const backgroundRef: GroundRefType = reactive({
        raw: 'ffffff',
        rgb: {R: 0xff, G: 0xff, B: 0xff},
    });

    const foreground = computed({
        get: () => foregroundRef.raw,
        set: setValues(foregroundRef),
    });
    const background = computed({
        get: () => backgroundRef.raw,
        set: setValues(backgroundRef),
    });

    const valid = computed(() => ({
        foreground: isValidHex(foreground.value),
        background: isValidHex(background.value),
    }));

    const emit = defineEmits(['submit']);

    const submitHexes = (event: Event): void => {
        if(!(
            valid.value.foreground &&
            valid.value.background
        )) {
            return event.preventDefault();
        }
        emit('submit', {
            foreground: foregroundRef.rgb,
            background: backgroundRef.rgb,
        });
    }
</script>
<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -->
<template>
    <form @submit.prevent="submitHexes">
        <div id="foreground">
            <label for="foreground">
                Foreground:
            </label><input
                name="foreground"
                v-model="foreground"
                maxlength="6"
                required
                :class="{'invalid': !valid.foreground}"
                @input="submitHexes"
            />
        </div>
        <div id="background">
            <label for="background">
                Background:
            </label><input
                name="background"
                v-model="background"
                maxlength="6"
                required
                :class="{'invalid': !valid.background}"
                @input="submitHexes"
            />
        </div>
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

        >div {
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
    }
</style>
