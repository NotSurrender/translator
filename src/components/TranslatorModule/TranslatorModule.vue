<template>
  <div class="translator">
    <TranslatorLoader />
    <SelectedLanguages />
    <div class="translator__io-area">
      <OriginalText />
      <TranslatedText />
    </div>
    <TranslatorFooter />
  </div>  
</template>

<script setup lang="ts">
import TranslatorLoader from '../TranslatorLoader';
import SelectedLanguages from '../SelectedLanguages';
import OriginalText from '../OriginalText';
import TranslatedText from '../TranslatedText';
import TranslatorFooter from '../TranslatorFooter';
</script>

<style scoped>
.translator {
  position: relative;
  width: 500px;
}
.translator__io-area {
  display: flex;
  column-gap: 8px;
  margin-top: 8px;
}
</style>