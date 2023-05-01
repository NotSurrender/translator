import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTranslatorStore = defineStore('translator', () => {
  const originalText = ref('')
  const translatedText = ref('')

  return { originalText, translatedText }
})
