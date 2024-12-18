import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import dotenv from 'dotenv'
import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
import terminal from 'vite-plugin-terminal'
import { fileURLToPath } from 'node:url'

dotenv.config()

// https://vite.dev/config/
export default ({ mode }: { mode: string }) => {
	const env = loadEnv(mode, process.cwd())
	const API_URL = env.VITE_API_URL

	return defineConfig({
		css: {
			postcss: {
				plugins: [tailwind(), autoprefixer()]
			}
		},
		plugins: [
			vue(),
			svgLoader({
				defaultImport: 'url'
			}),
			terminal({ console: 'terminal' })
		],
		server: {
			host: true,
			proxy: {
				'/api': {
					target: API_URL,
					changeOrigin: true,
					rewrite: path => path.replace(/^\/api/, ''),
					configure: (proxy, _) => {
						proxy.on('error', (err, _req, _res) => {
							console.log('error', err)
						})
						proxy.on('proxyReq', (_, req, _res) => {
							console.log('Request sent to target:', req.method, req.url)
						})
						proxy.on('proxyRes', (proxyRes, req, _res) => {
							console.log(
								'Response received from target:',
								proxyRes.statusCode,
								req.url
							)
						})
					}
				}
			}
		},
		resolve: {
			alias: [
				{
					find: '@',
					replacement: fileURLToPath(new URL('./src', import.meta.url))
				}
			]
		}
	})
}
