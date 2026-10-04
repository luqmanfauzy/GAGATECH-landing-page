<script setup lang="ts">
import type { DialogContentEmits, DialogContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { X } from 'lucide-vue-next'
import { DialogClose, DialogContent, DialogOverlay, DialogPortal, useForwardPropsEmits } from 'reka-ui'
import { cn } from '~/utils/ui'

defineOptions({ inheritAttrs: false })
const props = defineProps<DialogContentProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<DialogContentEmits>()
const forwarded = useForwardPropsEmits(reactiveOmit(props, 'class'), emits)
</script>

<template>
  <DialogPortal>
    <DialogOverlay class="fixed inset-0 z-50 bg-black/80" />
    <DialogContent v-bind="{ ...forwarded, ...$attrs }" :class="cn('fixed inset-y-0 right-0 z-50 w-full max-w-sm overflow-y-auto overscroll-contain border-l border-input bg-background p-6 text-foreground shadow-lg', props.class)">
      <slot />
      <DialogClose class="ui-soft absolute right-4 top-4 rounded-sm p-2 focus-visible:ring-2 focus-visible:ring-ring" aria-label="Close menu"><X class="h-5 w-5" aria-hidden="true" /></DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
