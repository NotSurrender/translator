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
body, h1 {
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol
} 

h1 {
  text-align: center;
}

.translator {
  margin: 0 auto;
}
</style>
