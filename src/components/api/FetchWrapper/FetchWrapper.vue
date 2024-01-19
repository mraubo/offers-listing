<script setup lang="ts">
import { FetchWrapperProps } from '@/components/api/FetchWrapper/FetchWrapper.types'
import Fetching from '@/components/api/FetchingIndicator.vue'
import FetchError from '@/components/api/FetchError/FetchError.vue'
import { FetchErrorEmits } from '@/components/api/FetchError/FetchError.types'

defineProps<FetchWrapperProps>()
const emit = defineEmits<FetchErrorEmits>()
</script>
<template>
  <div>
    <Fetching v-if="loading" />
    <FetchError v-else-if="error" @retry="emit('retry')" />
    <slot v-else />
  </div>
</template>
<style scoped lang="scss"></style>
