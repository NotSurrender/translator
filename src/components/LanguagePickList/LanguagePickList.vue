<template>
  <div class="card">
    <PickList
      item
      listStyle="width: 200px; height:342px" 
      dataKey="id"
      :modelValue="languagesStore.sourceLanguageList"
      :moveAllToTargetProps="{ style: { display: 'none' } }"
      :moveAllToSourceProps="{ style: { display: 'none' } }"
      :moveTopButtonProps="{ style: { display: 'none' }}"
      :moveBottomButtonProps="{ style: { display: 'none' }}"
      :show-source-controls="false"
      :move-to-target-props="{ disabled: moveToTargetButtonDisabled }"
      :move-to-source-props="{ disabled: moveToSourceButtonDisabled }"
      @selection-change="handleChangeSelection"
      @move-to-target="handleMoveToTarget"
      @move-to-source="handleMoveToSource"
      @reorder="handleReorder"
    >
      <template #sourceheader>List</template>
      <template #targetheader>Selected</template>
      <template #item="slotProps">
        <div class="flex flex-wrap p-2 align-items-center gap-3">
          <div class="flex-1 flex flex-column gap-2">
            <span class="font-bold">{{ slotProps.item.name }}</span>
          </div>
        </div>
      </template>
    </PickList>
    <Button class="clear-button" :disabled="clearButtonDisabled" @click="clearLanguageList">Clear</Button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import PickList, { 
  type PickListMoveToSourceEvent, 
  type PickListMoveToTargetEvent, 
  type PickListReorderEvent, 
  type PickListSelectionChangeEvent 
} from 'primevue/picklist';
import Button from 'primevue/button';

import type { Language } from './interfaces';
import { useLanguagesStore } from '@/stores/languages';

const languagesStore = useLanguagesStore();
const moveToTargetButtonDisabled = ref(true);
const moveToSourceButtonDisabled = ref(true);
const clearButtonDisabled = computed(() => {
  return !languagesStore.sourceLanguageList[1].length;
});

function handleChangeSelection(event: PickListSelectionChangeEvent) {
  const [[selectedSourceLanguage], [selectedMovedLanguage]] = event.value;
  const isSelectedOnlySourceLanguage = Boolean(selectedSourceLanguage && !selectedMovedLanguage);
  const isSelectedOnlyMovedLanguage = Boolean(selectedMovedLanguage && !selectedSourceLanguage);
  const isSelectedBothLanguages = Boolean(selectedSourceLanguage && selectedMovedLanguage);
  const isLimitReached = languagesStore.sourceLanguageList[1].length > 9;

  if (isSelectedOnlySourceLanguage) {
    moveToSourceButtonDisabled.value = true;
    moveToTargetButtonDisabled.value = isLimitReached;
  } else if (isSelectedOnlyMovedLanguage) {
    moveToSourceButtonDisabled.value = false;
  } else if (isSelectedBothLanguages) {
    moveToTargetButtonDisabled.value = isLimitReached;
    moveToSourceButtonDisabled.value = false;
  } else {
    moveToTargetButtonDisabled.value = true;
    moveToSourceButtonDisabled.value = true;
  }
}

function handleMoveToTarget({ items }: PickListMoveToTargetEvent) {
  const [sourceLanguages, movedLanguages] = languagesStore.sourceLanguageList;
  const updatedMovedLanguages = [...movedLanguages, ...items]
    .map<Language>((item, index) => ({
      id: item.code + index,
      code: item.code,
      name: item.name
    }));

  languagesStore.setSourceLanguageList([sourceLanguages, updatedMovedLanguages]);
}

function handleMoveToSource({ items }: PickListMoveToSourceEvent) {
  const [sourceLanguages, movedLanguages] = languagesStore.sourceLanguageList;
  const languageToMoveId = items[0].id;
  const updatedMovedLanguages = movedLanguages.filter(({ id }) => id !== languageToMoveId);
  languagesStore.setSourceLanguageList([sourceLanguages, updatedMovedLanguages]);
}

function handleReorder({ value }: PickListReorderEvent) {
  const [sourceLanguages, movedLanguages] = value;
  languagesStore.setSourceLanguageList([sourceLanguages, movedLanguages]);
}

function clearLanguageList() {
  const [allLanguages] = languagesStore.sourceLanguageList;
  languagesStore.setSourceLanguageList([allLanguages, []]);
  moveToSourceButtonDisabled.value = true; 
}
</script>

<style scoped>
.clear-button {
  margin-top: 16px;
}
</style>