import { computed, ref } from 'vue'
import { useLanguagesStore } from '@/stores/languages'
import type {
  PickListMoveToSourceEvent,
  PickListMoveToTargetEvent,
  PickListReorderEvent,
  PickListSelectionChangeEvent
} from 'primevue/picklist'
import type { Language } from '../../stores/languages'
import { findOccurrencesAmount } from '@/helpers/utils'

export function useLanguagePickList() {
  const languagesStore = useLanguagesStore()
  const moveToTargetButtonDisabled = ref(true)
  const moveToSourceButtonDisabled = ref(true)
  const clearButtonDisabled = computed<boolean>(() => {
    return !languagesStore.languagesValue[1].length
  })

  function handleChangeSelection(event: PickListSelectionChangeEvent) {
    const [[selectedSourceLanguage], [selectedMovedLanguage]] = event.value
    const isSelectedOnlySourceLanguage = Boolean(selectedSourceLanguage && !selectedMovedLanguage)
    const isSelectedOnlyMovedLanguage = Boolean(selectedMovedLanguage && !selectedSourceLanguage)
    const isSelectedBothLanguages = Boolean(selectedSourceLanguage && selectedMovedLanguage)
    const isLimitReached = languagesStore.languagesValue[1].length > 9

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
    const [itemToMove] = items
    const movedLanguages = languagesStore.languagesValue[1]

    const occurrencesCount = findOccurrencesAmount(
      movedLanguages,
      ({ code }) => itemToMove.code === code
    )

    const newItem: Language =
      occurrencesCount > 0
        ? { ...itemToMove, id: itemToMove.code + occurrencesCount + 1 }
        : itemToMove

    movedLanguages.push(newItem)
    languagesStore.setMovedLanguages(movedLanguages)
  }

  function handleMoveToSource({ items }: PickListMoveToSourceEvent) {
    const movedLanguages = languagesStore.languagesValue[1]
    const [{ id: idLanguageToMove }] = items
    const updatedMovedLanguages = movedLanguages.filter(({ id }) => id !== idLanguageToMove)
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
