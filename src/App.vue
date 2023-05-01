<script setup lang="ts">
import TranslatorModule from './components/TranslatorModule';
</script>

<template>
  <main>
    <h1>B-rain Tech Translator</h1>
    <TranslatorModule class="translator" />
  </main>
</template>

<style scoped>
body {
  font-family: (--font-family);
} 

h1 {
  text-align: center;
}

.translator {
  margin: 0 auto;
}
</style>
