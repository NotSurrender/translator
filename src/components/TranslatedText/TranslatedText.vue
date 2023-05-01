<template>
  <Textarea 
    :disabled="loaderStore.isLoading"
    :model-value="translatorStore.translatedText" 
  />
</template>

<script setup lang="ts">
import Textarea from '@/ui/Textarea';
import { useTranslatorStore } from '../../stores/translator';
import { useLoaderStore } from '@/stores/loader';

const translatorStore = useTranslatorStore();
const loaderStore = useLoaderStore();
</script>