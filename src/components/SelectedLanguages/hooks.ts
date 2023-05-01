import { computed, onMounted } from 'vue'
import { useLanguagesStore } from '@/stores/languages'
import { useDialog } from 'primevue/usedialog'
import LanguagePickList from '../LanguagePickList'
import ConfirmationFooter from '../ConfirmationFooter'
import { convertApiDataLanguageToLanguage, convertLanguageToMenuItem } from './utils'
import { queryLanguages } from '@/api/queries'
import { useLoaderStore } from '@/stores/loader'
import type { MenuItem } from 'primevue/menuitem'

export function useSelectedLanguages() {
  const dialog = useDialog()
  const languagesStore = useLanguagesStore()
  const loaderStore = useLoaderStore()

  const selectedLanguages = computed<MenuItem[]>(() => {
    return languagesStore.selectedLanguages.map(convertLanguageToMenuItem)
  })

  function openModal() {
    if (!loaderStore.isLoading) {
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
  }

  async function setLanguages() {
    try {
      loaderStore.isLoading = true
      const languages = await queryLanguages()
      languagesStore.setLanguagesValue(languages.map(convertApiDataLanguageToLanguage))
    } catch (error) {
      console.error(error)
    } finally {
      loaderStore.isLoading = false
    }
  }

  onMounted(setLanguages)

  return {
    selectedLanguages,
    loaderStore,
    openModal
  }
}
