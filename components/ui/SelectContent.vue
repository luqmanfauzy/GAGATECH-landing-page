<script setup lang="ts">
import type { SelectContentEmits, SelectContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ChevronDown, ChevronUp } from 'lucide-vue-next'
import { SelectContent, SelectPortal, SelectViewport, SelectScrollDownButton, SelectScrollUpButton, useForwardPropsEmits } from 'reka-ui'
import { cn } from '~/utils/ui'

defineOptions({ inheritAttrs: false })
const props = withDefaults(defineProps<SelectContentProps & { class?: HTMLAttributes['class'] }>(), { position: 'popper', class: undefined })
const emits = defineEmits<SelectContentEmits>()
const forwarded = useForwardPropsEmits(reactiveOmit(props, 'class'), emits)
</script>

<template>
  <SelectPortal>
    <SelectContent v-bind="{ ...forwarded, ...$attrs }" :class="cn('relative z-50 max-h-[var(--reka-select-content-available-height)] min-w-32 overflow-hidden rounded-md border border-input bg-popover text-popover-foreground shadow-md', props.class)">
      <SelectScrollUpButton class="flex items-center justify-center py-1"><ChevronUp class="h-4 w-4" aria-hidden="true" /></SelectScrollUpButton>
      <SelectViewport class="min-w-[var(--reka-select-trigger-width)] p-1"><slot /></SelectViewport>
      <SelectScrollDownButton class="flex items-center justify-center py-1"><ChevronDown class="h-4 w-4" aria-hidden="true" /></SelectScrollDownButton>
    </SelectContent>
  </SelectPortal>
</template>
