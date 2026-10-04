import { cva, type VariantProps } from 'class-variance-authority'

export const buttonVariants = cva('inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50', {
  variants: {
    variant: {
      default: 'ui-solid bg-primary text-primary-foreground',
      outline: 'ui-soft border border-input bg-background',
      ghost: 'ui-soft',
      link: 'ui-link text-primary underline-offset-4 hover:underline',
    },
    size: { default: 'h-10 px-4 py-2', lg: 'h-12 px-6', icon: 'h-10 w-10' },
  },
  defaultVariants: { variant: 'default', size: 'default' },
})
export type ButtonVariants = VariantProps<typeof buttonVariants>
export { AccordionRoot as Accordion, AccordionItem, AccordionContent, SelectRoot as Select, SelectValue, DialogRoot as Sheet, DialogTrigger as SheetTrigger, DialogTitle as SheetTitle, DialogDescription as SheetDescription, DialogClose as SheetClose } from 'reka-ui'
export { default as Button } from './Button.vue'
export { default as Input } from './Input.vue'
export { default as Textarea } from './Textarea.vue'
export { default as SelectTrigger } from './SelectTrigger.vue'
export { default as SelectContent } from './SelectContent.vue'
export { default as SelectItem } from './SelectItem.vue'
export { default as AccordionTrigger } from './AccordionTrigger.vue'
export { default as SheetContent } from './SheetContent.vue'
