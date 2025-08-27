<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'

const props = defineProps<{
  modelValue: File[]
  maxImages?: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: File[]): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const objectUrls = ref<string[]>([])
const dragActive = ref(false)
const errorMessage = ref('')

const images = ref<File[]>([...props.modelValue])

watch(
  () => props.modelValue,
  (newVal) => {
    images.value = [...newVal]
    updateObjectUrls()
  },
  { immediate: true }
)

function handleChange(e: Event) {
  const target = e.target as HTMLInputElement
  const files = target?.files
  if (!files) return

  const selected = Array.from(files).filter(f => f.type.startsWith('image/'))

  if ((images.value.length + selected.length) > (props.maxImages || 5)) {
    errorMessage.value = `You can only upload up to ${props.maxImages || 5} images.`
    return
  }

  errorMessage.value = ''
  const limited = [...images.value, ...selected]
  images.value = limited
  emit('update:modelValue', limited)
  updateObjectUrls()
}


function updateObjectUrls() {
  objectUrls.value.forEach(url => URL.revokeObjectURL(url))
  objectUrls.value = images.value.map(file => URL.createObjectURL(file))
}

function removeImage(index: number) {
  const updated = [...images.value]
  updated.splice(index, 1)
  images.value = updated
  emit('update:modelValue', updated)
  updateObjectUrls()
}

function onClickInput() {
  inputRef.value?.click()
}

function handleDrop(e: DragEvent) {
  e.preventDefault()
  dragActive.value = false

  const files = Array.from(e.dataTransfer?.files || []).filter(f => f.type.startsWith('image/'))

  if ((images.value.length + files.length) > (props.maxImages || 5)) {
    errorMessage.value = `You can only upload up to ${props.maxImages || 5} images.`
    return
  }

  errorMessage.value = ''
  const limited = [...images.value, ...files]
  images.value = limited
  emit('update:modelValue', limited)
  updateObjectUrls()
}


function handleDrag(e: DragEvent) {
  if (e.type === 'dragenter' || e.type === 'dragover') dragActive.value = true
  else dragActive.value = false
}

onBeforeUnmount(() => {
  objectUrls.value.forEach(url => URL.revokeObjectURL(url))
})
</script>

<template>
  <div class="space-y-4">
    <div
      class="p-6 shadow-[4px_4px_0px_black] border border-black  bg-input border-2 rounded cursor-pointer  transition-all"
      @click="onClickInput"
      @dragenter.prevent="handleDrag"
      @dragover.prevent="handleDrag"
      @dragleave.prevent="handleDrag"
      @drop.prevent="handleDrop"
    >
      <p class="text-center text-gray-600">
        Click or drag and drop to upload images  {{ images.length }} of {{ maxImages || 5 }} images selected

      </p>
      <input
        ref="inputRef"
        type="file"
        class="hidden"
        multiple
        accept="image/*"
        @change="handleChange"
        :disabled="images.length >= (maxImages || 5)"
      />
    </div>

    <div v-if="objectUrls.length > 0" class="flex flex-wrap gap-4">
      <div
        v-for="(url, index) in objectUrls"
        :key="index"
        class="w-24 h-24 border border-black rounded relative overflow-hidden"
      >
        <img :src="url" alt="preview" class="object-cover w-full h-full" />
        <button
          class="absolute top-0 right-0 bg-red-500 text-white text-xs px-1"
          @click.stop="removeImage(index)"
        >
          ✕
        </button>
      </div>
    </div>
    <p v-if="errorMessage" class="text-sm text-red-600 text-center">
  {{ errorMessage }}
</p>
  </div>
</template>
