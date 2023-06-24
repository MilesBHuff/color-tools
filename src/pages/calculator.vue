<script setup lang="ts">
</script>
<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -->
<template>
    <div id="calculator">
        <div id="forms">
            <form>
                <div>
                    <label for="foreground">Foreground:</label>
                    <input id="foreground" name="foreground" value="#000000"/>
                </div>
                <div>
                    <label for="background">Background:</label>
                    <input id="background" name="background" value="#ffffff"/>
                </div>
            </form>
            <form id="results">
                <div>
                    <label for="ratio">Ratio:</label>
                    <input id="ratio" name="ratio" disabled value="21"/>
                </div>
                <div>
                    <label for="score-small">Score (Small):</label>
                    <input id="score-small" name="score-small" disabled value="AAA"/>
                </div>
                <div>
                    <label for="score-large">Score (Large):</label>
                    <input id="score-large" name="score-large" disabled value="AAA"/>
                </div>
            </form>
        </div>
        <div id="renderer">
            <span id="text-small">Lorem ipsum dolor sit amet</span>
            <span id="text-large">consectetur adipiscing elit</span>
        </div>
    </div>
</template>
<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -->
<style lang="scss">

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
