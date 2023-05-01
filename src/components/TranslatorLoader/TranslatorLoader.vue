<template>
  <ProgressSpinner v-if="loaderStore.isLoading" class="progress-spinner" />
</template>

<script setup lang="ts">
import { useLoaderStore } from '@/stores/loader';
import ProgressSpinner from 'primevue/progressspinner';

const loaderStore = useLoaderStore();
</script>

<style scoped>
.progress-spinner {
  position: absolute;
  z-index: 1;
  left: calc(50% - 50px);
  top: calc(50% - 50px);
}
</style>
