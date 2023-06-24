<script setup lang="ts">
    import {computed, ref, type Ref} from 'vue';
    
    const hexPattern = /^(?:[a-f0-9]{3}|[a-f0-9]{6})$/i;

    const isValidHex = (value: string) => hexPattern.test(value);

    const setValues = (targetRef: Ref, targetNum: Ref) => 
        (newValue: string): void => {
            targetRef.value = newValue;
            if(hexPattern.test(newValue)) {
                targetNum.value = parseInt(newValue, 16);
            }
        }

    const foregroundRawRef = ref('000000');
    const foregroundNumRef = ref(0x000000);

    const backgroundRawRef = ref('ffffff');
    const backgroundNumRef = ref(0xffffff);

    const foreground = computed({
        get: () => foregroundRawRef.value,
        set: setValues(foregroundRawRef, foregroundNumRef),
    });
    const background = computed({
        get: () => backgroundRawRef.value,
        set: setValues(backgroundRawRef, backgroundNumRef),
    });

    const foregroundValid = computed(() => isValidHex(foreground.value));
    const backgroundValid = computed(() => isValidHex(background.value));

    const submitHexes = (event: Event) => {
        if (!foregroundValid.value || !backgroundValid.value) {
            event.preventDefault();
        }
    }
</script>
<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -->
<template>
    <div id="calculator">
        <div id="forms">
            <form @submit.prevent="submitHexes">
                <div>
                    <label for="foreground">Foreground:</label>
                    <input id="foreground" name="foreground" v-model="foreground" maxlength="6" required :class="{'invalid-input': !foregroundValid}" @input="submitHexes"/>
                </div>
                <div>
                    <label for="background">Background:</label>
                    <input id="background" name="background" v-model="background" maxlength="6" required :class="{'invalid-input': !backgroundValid}" @input="submitHexes"/>
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
