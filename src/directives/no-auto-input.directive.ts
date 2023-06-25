import type {Directive} from 'vue'

export const NoAutoInput: Directive = {
    beforeMount(el) {
        el.setAttribute('autocapitalize', 'off');
        el.setAttribute('autocomplete', 'off');
        el.setAttribute('autocorrect', 'off');
        el.setAttribute('spellcheck', 'false');
    },
};
