<script setup lang="ts">
import type { AccordionTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ChevronDown } from 'lucide-vue-next'
import { AccordionHeader, AccordionTrigger } from 'reka-ui'
import { cn } from '~/utils/ui'

const props = defineProps<AccordionTriggerProps & { class?: HTMLAttributes['class'] }>()
const delegated = reactiveOmit(props, 'class')
</script>

<template>
  <AccordionHeader class="flex">
    <AccordionTrigger v-bind="delegated" :class="cn('flex flex-1 items-center justify-between gap-4 py-6 text-left text-sm font-medium hover:underline [&[data-state=open]>svg]:rotate-180', props.class)">
      <slot />
      <ChevronDown class="h-4 w-4 shrink-0 text-muted-foreground transition-transform motion-reduce:transition-none" aria-hidden="true" />
    </AccordionTrigger>
  </AccordionHeader>
</template>
