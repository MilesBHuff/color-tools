<script setup lang="ts">
    import CalculatorPage from '$/pages/calculator.vue';
</script>
<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -->
<template>
    <CalculatorPage/>
</template>
<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -->
<style lang="scss" id="styles-global">
    body {
        background-color: #f6f6f6;
    }

    input {
        text-align: right;
    }
    input, select {
        padding: 0 0.5ch;
        border-radius: 0.25rem;
        font-family: monospace;

        color: #000;
        background-color: #fff;
        border: 1px solid #7f7f7f;

        &:disabled {
            border-color: transparent;
            background-color: transparent;
            font-weight: bold;
        }
        &.invalid {
            border-color: #f00 !important;
        }
    }
</style>
