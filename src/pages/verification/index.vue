<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'
import { Alert, useWebApp } from 'vue-tg'

const { platform } = useWebApp()

const videoRef = useTemplateRef('video')
const canvasRef = useTemplateRef('canvas')

const srcImg = ref('')
const imageCapture = ref<ImageCapture | null>(null)
const images = ref<{ dataUrl?: string; blob?: string }>({})

const error = ref(null)

function startup() {
	navigator.mediaDevices
		.getUserMedia({
			video: {
				facingMode: 'user',
				width: { ideal: 1280 },
				height: { ideal: 720 }
			},
			audio: false
		})
		.then(gotStream)
		.catch(err => (error.value = err))
}

function gotStream(stream: MediaStream) {
	const video = videoRef.value!
	video.srcObject = stream

	if ('ImageCapture' in window) {
		console.log('ImageCapture supported', platform)
		const [track] = stream.getVideoTracks()
		imageCapture.value = new ImageCapture(track)
		return imageCapture.value.takePhoto()
	}
}

async function takePicture() {
	if ('ImageCapture' in window) {
		const blob = await imageCapture.value!.takePhoto()
		console.log('Photo taken: ' + blob.type + ', ' + blob.size + 'B')
		images.value.blob = URL.createObjectURL(blob)
		srcImg.value = images.value.blob
	} else {
		const video = videoRef.value!
		const canvas = canvasRef.value!
		const context = canvas.getContext('2d')

		const { videoWidth, videoHeight } = video
		canvas.width = videoWidth
		canvas.height = videoHeight

		context!.drawImage(video, 0, 0, videoWidth, videoHeight)

		images.value.dataUrl = canvas.toDataURL('image/png')
		canvas.toBlob(
			blob => (images.value.blob = URL.createObjectURL(blob!)),
			'image/png'
		)

		srcImg.value = canvas.toDataURL('image/png')
	}
}

onMounted(() => {
	startup()
})
</script>

<template>
	<div>
		<div class="relative">
			<video
				class="-scale-x-100 transform h-svh text-white bg-black"
				width="100%"
				playsinline
				autoplay
				ref="video"
			>
				Stream not available
			</video>
			<div
				class="absolute bottom-5 transform -translate-x-1/2 -translate-y-1/2 left-1/2 size-24 rounded-full bg-white text-black"
				@click.prevent="takePicture"
			/>
		</div>

		<canvas class="hidden" ref="canvas" />
		<img :src="srcImg" alt="Captured image" />
		<Alert v-if="error" :message="error" />
	</div>
</template>
