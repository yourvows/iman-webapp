/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
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
			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				lg: '4rem',
				xl: '5rem',
				'2xl': '6rem'
			}
		},
		extend: {
			colors: {
				blue: '#3680FF',
				neutral: '#828DA1'
			}
		}
	},
	plugins: []
}
