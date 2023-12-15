import {NoAutoInput} from '@/directives/no-auto-input.directive';
import Main from '@/main.vue';
import {createApp} from 'vue';

const app = createApp(Main);
app.directive('no-auto-input', NoAutoInput);
app.mount('#vue');
