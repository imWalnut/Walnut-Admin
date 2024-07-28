import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';

// https://vitejs.dev/config/
const envPrefix = ['VITE', 'VUE']
export default defineConfig(({mode}) => {
  const envConfig = loadEnv(mode, process.cwd(), envPrefix)
  return {
    base: './',
    envPrefix: envPrefix,
    server: {
      port: Number(envConfig.VUE_APP_PORT),
      proxy: {
        '/api': {
          target: envConfig.VUE_APP_SERVER,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "/api"),
        }
      },
      open: true
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import "${resolve(__dirname, 'src/assets/css/color.less')}"`,
            javascriptEnabled: true
          },
        }
      }
    },
    define: {
      'process.env': envConfig
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    plugins: [vue(), vueJsx()]
  }
})
