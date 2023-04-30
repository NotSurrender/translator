<template>
  <Button 
    type="button" 
    label="Cancel" 
    icon="pi pi-times" 
    text
    @click="closeDialog" 
  />
  <Button 
    type="button" 
    label="Confirm" 
    icon="pi pi-check" 
    autofocus
    @click="handleConfirm" 
  />
</template>

<script setup lang="ts">
import { inject, type ComputedRef } from "vue";
import Button from 'primevue/button';
import { useLanguagesStore } from '@/stores/languages';

const dialogRef = inject<ComputedRef>("dialogRef");
const languagesStore = useLanguagesStore();

function handleConfirm() {
  languagesStore.confirm();
  dialogRef?.value.close();
}

const closeDialog = () => {
  dialogRef?.value.close();
};
</script>