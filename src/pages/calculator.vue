<script setup lang="ts">
    import HexInput from '@/content/hex-input.vue';
    import WcagResults from '@/content/wcag-results.vue';
</script>
<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -->
<template>
    <div id="calculator">
        <div id="forms">
            <HexInput/>
            <WcagResults/>
        </div>
        <div id="renderer">
            <span id="text-small">Lorem ipsum dolor sit amet</span>
            <span id="text-large">consectetur adipiscing elit</span>
        </div>
    </div>
</template>
<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -->
<style lang="scss">
    .invalid-input {
        border-color: #f00 !important;
    }

    #calculator {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        margin: 1rem;

        >#forms {
            display: grid;
            grid: 'L I';
            gap: 0.5rem 1ch;
            height: min-content;
            width: fit-content;

            >form {
                display: contents;

                >div {
                    display: contents;

                    >label {
                        text-align: right;
                    }

                    >input {
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
                    }
                }
            }
        }

        >#renderer {
            padding: 1rem;
            border-radius: 0.25rem;
            padding: 2rem;
            height: min-content;
            width: fit-content;

            background-color: #fff;
            color: #000;
            border: 1px solid #000;

            display: flex;
            flex-direction: column;
            gap: 1ex;

            >#text-small {
                font-size: 12pt;
            }
            >#text-large {
                font-size: 18pt;
            }
        }
    }
</style>
