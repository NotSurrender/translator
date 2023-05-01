<template>
  <Textarea 
    autoResize 
    rows="5" 
    maxlength="1000" 
    cols="30"
    :disabled="loaderStore.isLoading"
    v-model="translatorStore.originalText" 
  />
</template>

<script setup lang="ts">
import Textarea from 'primevue/textarea';
import { useLoaderStore } from '@/stores/loader';
import { useTranslatorStore } from '@/stores/translator'

const translatorStore = useTranslatorStore();
const loaderStore = useLoaderStore();
</script>