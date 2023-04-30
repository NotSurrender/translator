import type { Language } from '../LanguagePickList'
import type { TranslatorApiLanguageResponseData } from '../TranslatorFooter/interfaces'

export function convertApiDataLanguage(
  data: TranslatorApiLanguageResponseData,
  index: number
): Language {
  return {
    id: data.language_code + index,
    code: data.language_code,
    name: data.display_name
  }
}
