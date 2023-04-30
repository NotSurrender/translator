<template>
  <Textarea 
    autoResize 
    rows="5" 
    maxlength="1000" 
    cols="30"
    :model-value="translatorStore.translatedText"
  />
</template>

<script setup lang="ts">
import Textarea from 'primevue/textarea';
import { useTranslatorStore } from '../../stores/translator';

const translatorStore = useTranslatorStore();
</script>