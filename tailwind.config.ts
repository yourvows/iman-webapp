import animate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx,vue}',
		'./components/**/*.{ts,tsx,vue}',
		'./app/**/*.{ts,tsx,vue}',
		'./src/**/*.{ts,tsx,vue}'
	],
	prefix: '',
	theme: {
		keyframes: {
			shake: {
				'0%': { transform: 'translateX(4px)' },
				'25%': { transform: 'translateX(-4px)' },
				'50%': { transform: 'translateX(4px)' },
				'75%': { transform: 'translateX(-4px)' },
				'100%': { transform: 'translateX(0)' }
			}
		},
		animation: {
			shake: 'shake 200ms linear forwards'
		},
		container: {
			center: true,
			padding: '1rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				blue: '#3680FF',
				neutral: '#828DA1'
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [animate]
}
