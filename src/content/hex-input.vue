<script setup lang="ts">
    import {computed, ref, type Ref} from 'vue';

    const hexPattern = /^(?:[a-f0-9]{3}|[a-f0-9]{6})$/i;

    const isValidHex = (value: string): boolean => hexPattern.test(value);

    const setValues = (targetRef: Ref, targetNum: Ref) =>
        (newValue: string): void => {
            targetRef.value = newValue;
            if(hexPattern.test(newValue)) {
                targetNum.value = parseInt(newValue, 16);
            }
        }

    const foregroundRawRef = ref('000000');
    const foregroundValRef = ref(0x000000);

    const backgroundRawRef = ref('ffffff');
    const backgroundValRef = ref(0xffffff);

    const foreground = computed({
        get: () => foregroundRawRef.value,
        set: setValues(foregroundRawRef, foregroundValRef),
    });
    const background = computed({
        get: () => backgroundRawRef.value,
        set: setValues(backgroundRawRef, backgroundValRef),
    });

    const foregroundValid = computed(() => isValidHex(foreground.value));
    const backgroundValid = computed(() => isValidHex(background.value));

    const submitHexes = (event: Event): void => {
        if (!foregroundValid.value || !backgroundValid.value) {
            event.preventDefault();
        }
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
<style lang="scss">
</style>
