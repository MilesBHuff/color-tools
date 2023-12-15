import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import {fileURLToPath, URL} from 'node:url';
import {defineConfig} from 'vite';

////////////////////////////////////////////////////////////////////////////////
/** https://vitejs.dev/config */
export default defineConfig({
    root: 'app',

    build: {
        outDir: '../dist',
        rollupOptions: {
            input: {
                app: 'app/index.html',
            },
        },
        sourcemap: true,
    },
    server: {
        open: false,
    },

    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./app/src', import.meta.url)),
        },
    },

    plugins: [
        vue(),
        vueJsx(),
    ],
});
