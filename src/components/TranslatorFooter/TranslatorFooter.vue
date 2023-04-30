<template>
  <div class="translator-footer">
    <Button :disabled="disabled" @click="handleTextClear">Clear</Button>
    <Button :disabled="disabled" @click="handleTextTranslate">Translate</Button>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import { useTranslatorFooter } from './hooks';

const { disabled, handleTextClear, handleTextTranslate } = useTranslatorFooter()
</script>

<style scoped>
.translator-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
}
</style>