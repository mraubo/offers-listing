<script setup lang="ts">
import { FetchErrorEmits } from '@/components/api/FetchError/FetchError.types'

const emit = defineEmits<FetchErrorEmits>()
</script>
<template>
  <div class="d-flex flex-column align-center justify-center px-4 py-8">
    <span class="d-block text-h4 mb-8"> Błąd podczas pobierania danych. </span>
    <v-btn color="primary" @click="emit('retry')"> Spróbuj ponownie</v-btn>
  </div>
</template>
<style scoped lang="scss"></style>
