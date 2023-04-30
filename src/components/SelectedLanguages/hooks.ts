import { computed, onMounted } from 'vue'
import { TRANSLATOR_API } from '@/config'
import { HttpClient } from '@/helpers/http-client'
import { useLanguagesStore } from '@/stores/languages'
import { useDialog } from 'primevue/usedialog'
import type { MenuItem } from 'primevue/menuitem'
import { useTranslatorStore } from '@/stores/translator'
import LanguagePickList from '../LanguagePickList'
import ConfirmationFooter from '../ConfirmationFooter'
import type { TranslatorApiLanguageResponseData } from '../TranslatorFooter/interfaces'
import { convertApiDataLanguage } from './utils'

export function useSelectedLanguages() {
  const dialog = useDialog()
  const languagesStore = useLanguagesStore()
  const translatorStore = useTranslatorStore()

  const selectedLanguages = computed<MenuItem[]>(() => {
    return languagesStore.selectedLanguages.map<MenuItem>(({ code }) => ({
      label: code
    }))
  })

  function openModal() {
    dialog.open(LanguagePickList, {
      props: {
        header: 'Language list',
        modal: true
      },
      templates: {
        footer: ConfirmationFooter
      }
    })
  }

  async function queryLanguages() {
    try {
      const { languages } = await HttpClient.get<{
        languages: TranslatorApiLanguageResponseData[]
      }>(TRANSLATOR_API + '/languages')
      languagesStore.sourceLanguageList = [languages.map(convertApiDataLanguage), []]
    } catch (error) {
      console.error(error)
    }
  }

  onMounted(queryLanguages)

  return {
    selectedLanguages,
    translatorStore,
    openModal
  }
}
