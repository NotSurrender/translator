import { computed, ref } from 'vue'
import { useLanguagesStore } from '@/stores/languages'
import type {
  PickListMoveToSourceEvent,
  PickListMoveToTargetEvent,
  PickListReorderEvent,
  PickListSelectionChangeEvent
} from 'primevue/picklist'
import type { Language } from '../../stores/languages'
import { convertArrayToMap, findOccurrences, getEntityNormalizator } from '@/helpers/utils'

export function useLanguagePickList() {
  const languagesStore = useLanguagesStore()
  const moveToTargetButtonDisabled = ref(true)
  const moveToSourceButtonDisabled = ref(true)
  const clearButtonDisabled = computed<boolean>(() => {
    return !languagesStore.languagesValue[1].length
  })

  function handleChangeSelection(event: PickListSelectionChangeEvent) {
    const [selectedSourceLanguages, selectedMovedLanguages] = event.value
    const movedLanguages = languagesStore.getMovedLanguages()

    const isLimitReached = selectedSourceLanguages.length + movedLanguages.length > 9

    const isSelectedOnlySourceLanguage = Boolean(
      selectedSourceLanguages.length && !selectedMovedLanguages.length
    )
    const isSelectedOnlyMovedLanguage = Boolean(
      selectedMovedLanguages.length && !selectedSourceLanguages.length
    )
    const isSelectedBothLanguages = Boolean(
      selectedSourceLanguages.length && selectedMovedLanguages.length
    )

    if (isSelectedOnlySourceLanguage) {
      moveToSourceButtonDisabled.value = true
      moveToTargetButtonDisabled.value = isLimitReached
    } else if (isSelectedOnlyMovedLanguage) {
      moveToTargetButtonDisabled.value = true
      moveToSourceButtonDisabled.value = false
    } else if (isSelectedBothLanguages) {
      moveToTargetButtonDisabled.value = isLimitReached
      moveToSourceButtonDisabled.value = false
    } else {
      moveToTargetButtonDisabled.value = true
      moveToSourceButtonDisabled.value = true
    }
  }

  function handleMoveToTarget({ items }: PickListMoveToTargetEvent) {
    const languagesToMove = items as Language[]
    const movedLanguages = languagesStore.getMovedLanguages()
    const occurrencesMap = findOccurrences(movedLanguages, 'code')

    const entityNormalizator = getEntityNormalizator<Language, keyof Language, keyof Language>(
      occurrencesMap,
      'code',
      'id'
    )

    movedLanguages.push(...languagesToMove.map<Language>(entityNormalizator))
    languagesStore.setMovedLanguages(movedLanguages)
  }

  function handleMoveToSource({ items }: PickListMoveToSourceEvent) {
    const languagesToMove = items as Language[]
    const languagesToMoveMap = convertArrayToMap(languagesToMove, 'id')
    const movedLanguages = languagesStore.getMovedLanguages()
    const updatedMovedLanguages = movedLanguages.filter(({ id }) => !languagesToMoveMap.has(id))
    languagesStore.setMovedLanguages(updatedMovedLanguages)
  }

  function handleReorder({ value }: PickListReorderEvent) {
    languagesStore.setLanguagesValue(value)
  }

  function clearMovedLanguages() {
    const [sourceLanguages] = languagesStore.languagesValue
    languagesStore.setLanguagesValue([sourceLanguages, []])
    moveToSourceButtonDisabled.value = true
  }

  return {
    languagesStore,
    moveToTargetButtonDisabled,
    moveToSourceButtonDisabled,
    clearButtonDisabled,
    handleChangeSelection,
    handleMoveToTarget,
    handleMoveToSource,
    handleReorder,
    clearMovedLanguages
  }
}
