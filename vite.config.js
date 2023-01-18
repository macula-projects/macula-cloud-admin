import { defineConfig, loadEnv  } from "vite";
import { fileURLToPath, URL } from 'node:url';
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from 'unplugin-auto-import/vite'
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Inspect from 'vite-plugin-inspect';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
	return {
		resolve: {
	    alias: {
	      // 设置别名
	      '@': fileURLToPath(new URL('./src', import.meta.url)),
	    },
	    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
	  },
	
	  plugins: [
	    vue(),
	    
	    vueJsx(),
	    
	    AutoImport({
	      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
	      resolvers: [
	        ElementPlusResolver({
	          importStyle: false
	        }),
	      ],
	    }),
	
	    Components({
	      // 配置需要将哪些后缀类型的文件进行自动按需引入
	      extensions: ['vue', 'md'],
	      // 解析的 UI 组件库，这里以 Element Plus为例
	      resolvers: [
	        // 自动导入 Element Plus 组件
	        ElementPlusResolver({
	          importStyle: false
	        }),
	      ],
	      exclude: [/scCropper/]
	    }),
	
	    Inspect(),
	  ],
	  server: {
	    port: 5800,
	    host: true,
	    open: true,
	    proxy: {
	      // https://cn.vitejs.dev/config/#server-proxy
	      '/api': {
	        target: 'https://www.fastmock.site/mock/5039c4361c39a7e3252c5b55971f1bd3/api',
	        changeOrigin: true,
	        rewrite: (p) => p.replace(/^\/api/, '')
	      }
	    },
	  },
	  css: {
	    postcss: {
	      plugins: [
	          {
	            postcssPlugin: 'internal:charset-removal',
	            AtRule: {
	              charset: (atRule) => {
	                if (atRule.name === 'charset') {
	                  atRule.remove();
	                }
	              }
	            }
	          }
	      ],
	    },
	  },
	}
});
