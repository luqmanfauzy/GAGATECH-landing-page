<script setup lang="ts">
import type { SelectItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { Check } from 'lucide-vue-next'
import { SelectItem, SelectItemIndicator, SelectItemText, useForwardProps } from 'reka-ui'
import { cn } from '~/utils/ui'

const props = defineProps<SelectItemProps & { class?: HTMLAttributes['class'] }>()
const forwarded = useForwardProps(reactiveOmit(props, 'class'))
</script>

<template>
  <SelectItem v-bind="forwarded" :class="cn('relative flex w-full cursor-default select-none items-center rounded-sm py-2 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50', props.class)">
    <span class="absolute right-2 flex h-4 w-4 items-center justify-center"><SelectItemIndicator><Check class="h-4 w-4" aria-hidden="true" /></SelectItemIndicator></span>
    <SelectItemText><slot /></SelectItemText>
  </SelectItem>
</template>
