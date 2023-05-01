<template>
  <div class="card">
    <PickList
      item
      listStyle="width: 200px; height:342px" 
      dataKey="id"
      :modelValue="languagesStore.languagesValue"
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
    <Button class="clear-button" :disabled="clearButtonDisabled" @click="clearMovedLanguages">Clear</Button>
  </div>
</template>

<script setup lang="ts">
import PickList from 'primevue/picklist';
import Button from 'primevue/button';
import { useLanguagePickList } from './hooks'

const { 
  languagesStore, 
  moveToTargetButtonDisabled, 
  moveToSourceButtonDisabled,
  clearButtonDisabled,
  handleChangeSelection,
  handleMoveToTarget,
  handleMoveToSource,
  handleReorder,
  clearMovedLanguages
} = useLanguagePickList();

</script>

<style scoped>
.clear-button {
  margin-top: 16px;
}
</style>