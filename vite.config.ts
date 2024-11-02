import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

// https://vite.dev/config/
export default defineConfig({
	plugins: [vue(), svgLoader()],
	server: {
		proxy: {
			'/api': {
				target: process.env.VITE_API_URL,
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, '')
			}
		}
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@base': path.resolve(__dirname, './src/components/Base'),
			'@components': path.resolve(__dirname, './src/components')
		}
	}
})
