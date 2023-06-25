<script setup lang="ts">
    import type {ModelViewPair} from '$/types/types';
    import {computed, reactive} from 'vue';

    const props = withDefaults(defineProps<{
        id: string,
        modelValue?: number,
    }>(), {
        modelValue: () => 0,
    });
    const emit = defineEmits(['input']);

    const setValues = (input: string): void => {
        modelRef.view = input;
        if(modelValid) {
            modelRef.model = parseFloat(modelRef.view);
            // console.debug('lum-input.vue\n', modelRef.model);
            emit('input', modelRef.model);
        }
    };

    const modelRef: ModelViewPair<number> = reactive({
        model: props.modelValue,
        view: props.modelValue.toString(10),
    });
    const model = computed({
        get: () => modelRef.view,
        set: setValues,
    });
    const modelValid = computed(() =>
        true //TODO
    );

    const id = props.id + 'Hue';
</script>
<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -->
<template>
    <div :id="id">
        <label :for="id">
            H:
        </label><input
            :name="id"
            v-model="model"
            maxlength="3"
            required
            :class="{'invalid': !modelValid}"
        />
    </div>
</template>
<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -->
<style lang="scss" scoped>
    input {
        width: 3.25ch
    }
</style>
