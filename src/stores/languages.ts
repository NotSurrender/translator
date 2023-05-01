import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface Language {
  id: string
  name: string
  code: string
}

export const useLanguagesStore = defineStore('languages', () => {
  const languagesValue = ref<Language[][]>([[], []])
  const selectedLanguages = ref<Language[]>([])

  function setLanguagesValue(sourceLanguages: Language[]): void
  function setLanguagesValue(languages: Language[][]): void

  function setLanguagesValue(languages: unknown[]) {
    if (Array.isArray(languages[0])) {
      languagesValue.value = languages as Language[][]
    } else {
      languagesValue.value = [languages as Language[], []]
    }
  }

  function getMovedLanguages() {
    return languagesValue.value[1]
  }

  function setMovedLanguages(languages: Language[]) {
    languagesValue.value = [languagesValue.value[0], languages]
  }

  function confirm() {
    selectedLanguages.value = languagesValue.value[1]
  }

  return {
    languagesValue,
    selectedLanguages,
    getMovedLanguages,
    setLanguagesValue,
    setMovedLanguages,
    confirm
  }
})
