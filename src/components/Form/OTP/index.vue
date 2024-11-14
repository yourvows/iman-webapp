<script setup lang="ts">
import {
	ref,
	watch,
	toRef,
	onBeforeUpdate,
	onMounted,
	nextTick,
	withDefaults
} from 'vue'

const props = withDefaults(
	defineProps<{
		className?: string
		inputClass?: string
		step?: number
		fields?: number
		error?: boolean
		disabled?: boolean
	}>(),
	{
		fields: 6
	}
)

const emit = defineEmits<{
	(e: 'change', value: string): void
	(e: 'complete', value: string): void
	(e: 'update:modelValue', value: string): void
}>()

const enum KEY_CODE {
	Backspace = 8,
	Left = 37,
	Up = 38,
	Right = 39,
	Down = 40
}
const randomNumber = Math.floor(Math.random() * 101)
const values = ref<string[]>([])
const iRefs = ref<number[]>([])
const inputs = ref<(HTMLInputElement | null)[]>([])
const fields = toRef(props, 'fields')
const autoFocusIndex = ref(0)
const autoFocus = true
const activeIndex = ref<number | null>(0)

const initVals = () => {
	let vals
	if (values.value && values.value.length) {
		vals = []
		for (let i = 0; i < fields.value; i++) {
			vals.push(values.value[i] || '')
		}
		autoFocusIndex.value =
			values.value.length >= fields.value ? 0 : values.value.length
	} else {
		vals = Array(fields.value).fill('')
	}
	iRefs.value = []
	for (let i = 0; i < fields.value; i++) {
		iRefs.value.push(i + 1)
	}
	values.value = vals
}
const onFocus = (e: FocusEvent, index: number) => {
	activeIndex.value = index
	const target = e.target as HTMLInputElement
	if (target) {
		target.select()
	}
}
const onValueChange = (e: Event) => {
	const target = e.target as HTMLInputElement
	const index = parseInt(target.dataset.id || '0')
	target.value = target.value.replace(/[^\d]/gi, '')
	// this.handleKeys[index] = false;
	if (target.value === '' || !target.validity.valid) {
		return
	}
	let next
	const value = target.value
	values.value = Object.assign([], values.value)
	if (value.length > 1) {
		let nextIndex = value.length + index - 1
		if (nextIndex >= fields.value) {
			nextIndex = fields.value - 1
		}
		next = iRefs.value[nextIndex]
		const split = value.split('')
		split.forEach((item, i) => {
			const cursor = index + i
			if (cursor < fields.value) {
				values.value[cursor] = item
			}
		})
	} else {
		next = iRefs.value[index + 1]
		values.value[index] = value
	}
	if (next) {
		const element = inputs.value[next] as HTMLInputElement
		element.focus()
		element.select()
	}
	triggerChange(values.value)
}
const onKeyDown = (e: KeyboardEvent) => {
	const target = e.target as HTMLInputElement
	const index = parseInt(target.dataset.id || '0')
	const prevIndex = index - 1
	const nextIndex = index + 1
	const prev = iRefs.value[prevIndex]
	const next = iRefs.value[nextIndex]
	switch (e.keyCode) {
		case KEY_CODE.Backspace: {
			e.preventDefault()
			const vals = [...values.value]
			if (values.value[index]) {
				vals[index] = ''
				values.value = vals
				triggerChange(vals)
			} else if (prev) {
				vals[prevIndex] = ''
				inputs.value[prev]?.focus()
				values.value = vals
				triggerChange(vals)
			}
			break
		}
		case KEY_CODE.Left:
			e.preventDefault()
			if (prev) {
				inputs.value[prev]?.focus()
			}
			break
		case KEY_CODE.Right:
			e.preventDefault()
			if (next) {
				inputs.value[next]?.focus()
			}
			break
		case KEY_CODE.Up:
		case KEY_CODE.Down:
			e.preventDefault()
			break
		default:
			break
	}
}
const triggerChange = (vals = values.value) => {
	const val = vals.join('')
	emit('update:modelValue', val)
	if (val.length >= fields.value) {
		emit('complete', val)
		return
	}
	emit('change', val)
}
initVals()
watch(
	() => props.step,
	newValue => {
		const inputElement = document.getElementById(
			`verification-input-${randomNumber}`
		)
		if (newValue === 2 && inputElement) {
			inputElement.autofocus = true
		}
	},
	{ immediate: true }
)
onBeforeUpdate(() => {
	inputs.value = []
})

onMounted(() => {
	nextTick(() => {
		setTimeout(() => {
			if (inputs.value && inputs.value[1]) {
				inputs.value[1]?.focus()
			}
		}, 500)
	})
})

const pasteDigits = (e: ClipboardEvent) => {
	e.preventDefault()
	const pastedData = e.clipboardData!.getData('text')
	const otpRegex = new RegExp(`^\\d{${props.fields}}$`)

	if (otpRegex.test(pastedData)) {
		for (let i = 0; i < fields.value; i++) {
			values.value[i] = pastedData[i]
		}

		triggerChange(values.value)
	}
}
</script>

<template>
	<template v-for="(v, index) in values" :key="index">
		<input
			:id="`verification-input-${randomNumber + index}`"
			:ref="
				el => {
					if (el) inputs[index + 1] = el as HTMLInputElement
				}
			"
			required
			inputmode="numeric"
			autocomplete="one-time-code"
			:class="[
				inputClass,
				{
					'!border-[#F93C651A]/5 !border !border-solid !bg-[#F93C651A]/10':
						error
				}
			]"
			pattern="\d*"
			:autoFocus="autoFocus && index === autoFocusIndex"
			:data-id="index"
			:value="v"
			:disabled="props.disabled"
			maxlength="1"
			@input="onValueChange"
			@focus="onFocus($event, index)"
			@keydown="onKeyDown"
			@paste="pasteDigits"
			@blur="activeIndex = null"
		/>
	</template>
</template>

<style lang="postcss" scoped>
input {
	@apply caret-[#3680FF] focus:border focus:border-[#3680FF]/50 w-16 h-full text-center font-semibold text-2xl leading-8 rounded-[16px] bg-[#F2F3F5] border-none outline-none;
}
</style>
