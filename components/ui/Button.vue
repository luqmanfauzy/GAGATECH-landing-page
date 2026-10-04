<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { cn } from '~/utils/ui'
import { buttonVariants, type ButtonVariants } from './index'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
}
const props = withDefaults(defineProps<Props>(), { as: 'button', variant: 'default', size: 'default', class: undefined })
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :type="as === 'button' && !asChild ? 'button' : undefined" :class="cn(buttonVariants({ variant, size }), props.class)"><slot /></Primitive>
</template>
