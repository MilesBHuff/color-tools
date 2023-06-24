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

    const foregroundValid = computed(() => isValidHex(foreground.value));
    const backgroundValid = computed(() => isValidHex(background.value));

    const emit = defineEmits(['submit']);

    const submitHexes = (event: Event): void => {
        if(!(foregroundValid.value && backgroundValid.value)) {
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
                :class="{'invalid-input': !foregroundValid}"
                @input="submitHexes"
            />
            <span></span>
        </div>
        <div id="background">
            <label for="background">
                Background:
            </label><input
                name="background"
                v-model="background"
                maxlength="6"
                required
                :class="{'invalid-input': !backgroundValid}"
                @input="submitHexes"
            />
            <span></span>
        </div>
    </form>
</template>
<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -->
<style lang="scss" scoped>
</style>
