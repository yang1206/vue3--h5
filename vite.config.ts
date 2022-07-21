import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"
import DefineOptions from 'unplugin-vue-define-options/vite'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import styleImport, { VantResolve } from 'vite-plugin-style-import';
//增加pwa支持
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	// 检查process.cwd()路径下.env.develeport.local、.env.development、.env.local、.env这四个环境文件
	loadEnv(mode, process.cwd())
	return {

		// 静态资源基础路径 base: './' || '',
		base: './',

		resolve: {
			alias: {
				// 配置src目录
				"@": path.resolve(__dirname, "src"),
				// 导入其他目录
				"components": path.resolve(__dirname, "components")
			}
		},
		plugins: [
			vue(),
			//vant自动导入
			Components({
				resolvers: [VantResolver()],
			}),
			DefineOptions(),
			// 配置后，Vant各组件才生效
			styleImport({
				resolves: [VantResolve()],
			}),
			//配置pwa
			VitePWA({ // mode: 'development',
				base: '/',
				mode: 'development',
				registerType: process.env.CLAIMS === 'true' ? 'autoUpdate' : undefined,
				includeAssets: ['logo.png', 'pwa.png','pwa2x.png'],
				//   配置 worker box 用于离线缓存
				workbox: {
					runtimeCaching: [
						{
							// 根据正则表达式进行缓存，如果你喜欢 也可以使用/.*/i
							urlPattern: /.*/i,
							handler: 'NetworkFirst',
							options: {
								cacheName: 'asoulcnki-api-cache',
								expiration: {
									maxEntries: 10,
									maxAgeSeconds: 60 * 60 * 1.5,
								},
								cacheableResponse: {
									statuses: [0, 200],
								},
							},
						}
					],
				},
				manifest: {
					name: 'zhaosf',
					short_name: 'zhaosf',
					theme_color: '#f5f5f5',
					background_color: "#000000",
					icons: [
						{
							src: './public/pwa.png',
							sizes: '192x192',
							type: 'image/png'
						},
						{
							src: './public/pwa2x.png',
							sizes: '512x512',
							type: 'image/png'
						},
					],
					scope:'/',
					// start_url: `/`,
					display: 'standalone',
					lang: 'zh-CN'
				}, })
		],



		// 跨域代理
		proxy: {
			'/api': {
				target: 'https://fa.hzbaoliandeng.com',
				changeOrigin: true, // 允许跨域
				rewrite: (path) => path.replace('/api/', '/'),
			},
		},
		build:{

		}
	}
})
