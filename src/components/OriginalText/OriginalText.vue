<template>
  <Textarea
    placeholder="Insert text"
    :disabled="loaderStore.isLoading"
    v-model="translatorStore.originalText"
  />
</template>

<script setup lang="ts">
import Textarea from '@/ui/Textarea';
import { useLoaderStore } from '@/stores/loader';
import { useTranslatorStore } from '@/stores/translator'

const translatorStore = useTranslatorStore();
const loaderStore = useLoaderStore();
</script>