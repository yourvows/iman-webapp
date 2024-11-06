import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

export const useTelegram = () => {
	const router = useRouter()
	const webApp = Telegram.WebApp
	const MainButton = webApp.MainButton
	const BackButton = webApp.BackButton

	onMounted(() => {
		webApp.themeParams.button_color = '#3680FF'
		webApp.themeParams.button_text_color = '#ffffff'
		webApp.themeParams.secondary_bg_color = '#ffffff'
		MainButton.text = 'Продолжить'
		BackButton.onClick(() => router.back())
	})

	return {
		webApp,
		MainButton,
		BackButton
	}
}
