<template>
  <Textarea 
    class="textarea"
    autoResize
    rows="5" 
    maxlength="1000" 
    cols="30"
    :disabled="disabled"
    v-on:input="$emit('update:modelValue', $event.target.value)"
    :value="modelValue"
  />
</template>

<script setup lang="ts">
import Textarea from 'primevue/textarea';

defineProps<{
  disabled?: boolean
  modelValue: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()
</script>

<style scoped>
.textarea {
  height: 120px;
}
</style>