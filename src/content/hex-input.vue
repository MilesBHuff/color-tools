<script setup lang="ts">
    import {computed, defineEmits, reactive} from 'vue';

    const hexPattern = /^(?:[a-f0-9]{3}|[a-f0-9]{6})$/i;

    const isValidHex = (value: string): boolean => hexPattern.test(value);

    interface GroundRefType {
        raw: string,
        value: number,
    }

    const setValues = (targetRef: GroundRefType) =>
        (input: string): void => {
            targetRef.raw = input;
            if(hexPattern.test(input)) {
                targetRef.value = parseInt(input, 16);
            }
        }

    const foregroundRef: GroundRefType = reactive({
        raw: '000000',
        value: 0x000000,
    });
    const backgroundRef: GroundRefType = reactive({
        raw: 'ffffff',
        value: 0xffffff,
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
            foreground: foregroundRef.value,
            background: backgroundRef.value,
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
        </div>
    </form>
</template>
<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -->
<style lang="scss" scoped>
</style>
