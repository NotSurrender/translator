import { computed } from 'vue'
import { queryTranslateText } from '@/api/queries'
import { useLanguagesStore } from '@/stores/languages'
import { useTranslatorStore } from '@/stores/translator'
import { useLoaderStore } from '@/stores/loader'
import type { TranslatorApiTranslationRequestData } from '@/api/interfaces'

export function useTranslatorFooter() {
  const translatorStore = useTranslatorStore()
  const languagesStore = useLanguagesStore()
  const loaderStore = useLoaderStore()

  const disabled = computed(() => {
    const isMinLanguagesSelected = languagesStore.selectedLanguages.length > 1

    return !translatorStore.originalText || loaderStore.isLoading || !isMinLanguagesSelected
  })

  function handleTextClear() {
    translatorStore.originalText = ''
    translatorStore.translatedText = ''
  }

  async function handleTextTranslate() {
    loaderStore.isLoading = true
    let originalText = translatorStore.originalText
    let translatedText = translatorStore.originalText

    for (let i = 0; i < languagesStore.selectedLanguages.length - 1; i++) {
      originalText = translatedText
      try {
        const requestData: TranslatorApiTranslationRequestData = {
          from: languagesStore.selectedLanguages[i].code,
          texts: [translatedText],
          to: [languagesStore.selectedLanguages[i + 1].code]
        }

        translatedText = await queryTranslateText(requestData)
      } catch (error) {
        console.error(error)
      }
    }

    loaderStore.isLoading = false
    translatorStore.originalText = originalText
    translatorStore.translatedText = translatedText
  }

  return {
    disabled,
    handleTextClear,
    handleTextTranslate
  }
}
