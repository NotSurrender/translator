<template>
  <div class="translator">
    <SelectedLanguages />
    <div class="translator__io-area">
      <OriginalText />
      <TranslatedText />
    </div>
    <TranslatorFooter />
  </div>  
</template>

<script setup lang="ts">
import SelectedLanguages from '../SelectedLanguages';
import OriginalText from '../OriginalText';
import TranslatedText from '../TranslatedText';
import TranslatorFooter from '../TranslatorFooter';
</script>

<style scoped>
.translator__io-area {
  display: flex;
  column-gap: 8px;
  margin-top: 8px;
}
</style>