import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTranslatorStore = defineStore('translator', () => {
  const originalText = ref('')
  const translatedText = ref('')
  const isLoading = ref(false)

  return { originalText, translatedText, isLoading }
})
