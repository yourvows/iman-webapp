/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		keyframes: {
			shake: {
				'0%': { top: '2px', left: '2px' },
				'25%': { top: '-2px', left: '2px' },
				'50%': { top: '2px', left: '-2px' },
				'75%': { top: '-2px', left: '-2px' },
				'100%': { top: '0', left: '0' }
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
