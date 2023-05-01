<template>
  <Button 
    label="Cancel" 
    icon="pi pi-times" 
    text
    @click="closeDialog" 
  />
  <Button 
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
  closeDialog();
}

function closeDialog() {
  dialogRef?.value.close();
}
</script>