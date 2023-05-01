import { HttpClient } from '@/helpers/http-client'
import type {
  TranslatorApiLanguageResponseData,
  TranslatorApiTranslationRequestData,
  TranslatorApiTranslationResponseData
} from './interfaces'
import { TRANSLATOR_API } from './config'

export async function queryLanguages() {
  const { languages } = await HttpClient.get<{
    languages: TranslatorApiLanguageResponseData[]
  }>(TRANSLATOR_API + '/languages')

  return languages
}

export async function queryTranslateText(data: TranslatorApiTranslationRequestData) {
  const { translations } = await HttpClient.post<
    TranslatorApiTranslationResponseData,
    TranslatorApiTranslationRequestData
  >(TRANSLATOR_API + '/text', data)

  return translations[0].translated[0]
}
