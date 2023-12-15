<script setup lang="ts">
    import CalculatorPage from '@/pages/calculator.vue';
</script>
<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -->
<template>
    <CalculatorPage/>
</template>
<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -->
<style lang="scss" id="styles-global">
    * {
        white-space: nowrap;
        font-size: calc(1rem * 11.5/12);
    }

    html {
        height: 100%;
        width: 100%;
    }
    body {
        height: 100%;
        width: 100%;
        margin: unset;

        background-color: #fff;
        background: linear-gradient(rgba($color: #fff, $alpha: 0.5), rgba($color: #fff, $alpha: 0.5)), url('https://giomjava.files.wordpress.com/2011/06/stripesgnome.jpg'); //TODO:  Use something custom.
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }

    .input-wrapper {
        font-family: monospace;
        display: inline-flex;
        align-items: center;
    }

    input {
        text-align: right;
        box-shadow: 0 0 0.125rem #000 inset;
    }
    select {
        cursor: pointer;
        box-shadow: 0 0 0.125rem #000;
    }
    input, select {
        padding: 0 0.5ch;
        border-radius: 0.25rem;
        font-family: monospace;

        color: #000;
        background-color: #fff;
        border: 0px solid transparent;

        &:disabled {
            border-color: transparent;
            background-color: transparent;
            font-weight: bold;
        }
        &.invalid {
            background-color: #ffc5c5;
        }
    }
</style>
