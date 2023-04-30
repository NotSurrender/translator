import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Language } from '@/components/LanguagePickList'

export const useLanguagesStore = defineStore('languages', () => {
  const sourceLanguageList = ref<Language[][]>([[], []])
  const selectedLanguages = ref<Language[]>([])

  function setSourceLanguageList(languages: Language[][]) {
    sourceLanguageList.value = languages
  }

  function confirm() {
    selectedLanguages.value = sourceLanguageList.value[1]
  }

  return { sourceLanguageList, selectedLanguages, setSourceLanguageList, confirm }
})
