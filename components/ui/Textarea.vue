<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '~/utils/ui'

const props = defineProps<{ defaultValue?: string; modelValue?: string; class?: HTMLAttributes['class'] }>()
const emits = defineEmits<{ 'update:modelValue': [value: string] }>()
const modelValue = useVModel(props, 'modelValue', emits, { passive: true, defaultValue: props.defaultValue })
</script>

<template>
  <textarea v-model="modelValue" :class="cn('flex min-h-24 w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-base text-foreground shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50', props.class)" />
</template>
