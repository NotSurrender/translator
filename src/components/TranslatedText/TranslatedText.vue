<template>
  <Textarea :model-value="translatorStore.translatedText" />
</template>

<script setup lang="ts">
import Textarea from '@/ui/Textarea';
import { useTranslatorStore } from '../../stores/translator';

const translatorStore = useTranslatorStore();
</script>