import type { MenuItem } from 'primevue/menuitem'
import type { Language } from '@/stores/languages'
import type { TranslatorApiLanguageResponseData } from '@/api/interfaces'

export function convertApiDataLanguageToLanguage(
  data: TranslatorApiLanguageResponseData,
  index: number
): Language {
  return {
    id: data.language_code + index,
    code: data.language_code,
    name: data.display_name
  }
}

export function convertLanguageToMenuItem(language: Language): MenuItem {
  return {
    label: language.code
  }
}
