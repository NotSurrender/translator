import { computed } from 'vue'
import { HttpClient } from '@/helpers/http-client'
import { useLanguagesStore } from '@/stores/languages'
import { useTranslatorStore } from '@/stores/translator'
import { TRANSLATOR_API } from '@/config'
import type {
  TranslatorApiTranslationRequestData,
  TranslatorApiTranslationResponseData
} from './interfaces'

export function useTranslatorFooter() {
  const translatorStore = useTranslatorStore()
  const languagesStore = useLanguagesStore()

  const disabled = computed(() => {
    const isMinLanguagesSelected = languagesStore.selectedLanguages.length > 1

    return !translatorStore.originalText || translatorStore.isLoading || !isMinLanguagesSelected
  })

  function handleTextClear() {
    translatorStore.originalText = ''
    translatorStore.translatedText = ''
  }

  async function handleTextTranslate() {
    translatorStore.isLoading = true
    let text = ''

    for (let i = 0; i < languagesStore.selectedLanguages.length - 1; i++) {
      try {
        text = translatorStore.originalText
        const { translations } = await HttpClient.post<
          TranslatorApiTranslationResponseData,
          TranslatorApiTranslationRequestData
        >(TRANSLATOR_API + '/text', {
          from: languagesStore.selectedLanguages[i].code,
          texts: [text],
          to: [languagesStore.selectedLanguages[i + 1].code]
        })
        text = translations[0].translated[0]
      } catch (error) {
        console.error(error)
      }
    }

    translatorStore.isLoading = false
    translatorStore.translatedText = text
  }

  return {
    disabled,
    handleTextClear,
    handleTextTranslate
  }
}
