export interface TranslatorApiTranslationRequestData {
  from?: string
  texts: string[]
  to: string[]
}

export interface TranslatorApiTranslation {
  to: string
  translated: string[]
}

export interface TranslatorApiTranslationResponseData {
  from: string
  translated_characters: number
  translations: TranslatorApiTranslation[]
}

export interface TranslatorApiLanguageResponseData {
  display_name: string
  language_code: string
  support_source: boolean
  support_target: boolean
}
