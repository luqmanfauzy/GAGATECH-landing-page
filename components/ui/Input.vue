<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '~/utils/ui'

const props = defineProps<{ defaultValue?: string | number; modelValue?: string | number; class?: HTMLAttributes['class'] }>()
const emits = defineEmits<{ 'update:modelValue': [value: string | number] }>()
const modelValue = useVModel(props, 'modelValue', emits, { passive: true, defaultValue: props.defaultValue })
</script>

<template>
  <input v-model="modelValue" :class="cn('ui-field flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50', props.class)">
</template>
