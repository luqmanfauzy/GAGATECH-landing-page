<script setup lang="ts">
import { computed, ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { Button, Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription, SheetClose } from '~/components/ui'
import { useRoute, useRuntimeConfig, useHead, useSeoMeta, useNuxtApp } from '#imports'
const route = useRoute()
const config = useRuntimeConfig()
const open = ref(false)
const hidden = ref(false)
let previousScroll = 0
const scroll = () => {
  const current = Math.max(0, window.scrollY)
  if (Math.abs(current - previousScroll) < 8) return
  hidden.value = !open.value && current > 140 && current > previousScroll
  previousScroll = current
}
const nuxtApp = useNuxtApp()
let disposeMotion = () => {}
const stopMotion = () => disposeMotion()
const startMotion = async () => {
  await nextTick()
  stopMotion()
  const main = document.querySelector('main')
  if (!main || !('IntersectionObserver' in window)) return
  const query = window.matchMedia('(prefers-reduced-motion: reduce)')
  const targets = main.querySelectorAll<HTMLElement>('.hero-copy > *, .hero-art, .section-heading, .intro-content > *, .project-card, .services-list > details, .process-grid > *, .standards-grid > *, .faq-list > *, .contact-grid > *, .case-header, .case-disclaimer, .case-story article, .case-gallery-grid > *, .case-cta')
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      const target = entry.target as HTMLElement
      if (!target.contains(document.activeElement)) target.classList.add('motion-enter')
      observer.unobserve(target)
    }
  }, { threshold: 0, rootMargin: '0px 0px -24px 0px' })
  const reset = () => {
    observer.disconnect()
    targets.forEach(target => {
      target.classList.remove('motion-enter')
      target.style.removeProperty('--motion-delay')
    })
  }
  const update = () => {
    reset()
    if (query.matches) return
    targets.forEach(target => {
      const index = Array.prototype.indexOf.call(target.parentElement?.children || [], target)
      target.style.setProperty('--motion-delay', `${Math.min(index, 3) * 65}ms`)
      observer.observe(target)
    })
  }
  query.addEventListener('change', update)
  update()
  disposeMotion = () => { reset(); query.removeEventListener('change', update) }
}
const removeStartHook = nuxtApp.hook('page:start', stopMotion)
const removeTransitionHook = nuxtApp.hook('page:transition:finish', startMotion)
onMounted(() => {
  window.addEventListener('scroll', scroll, { passive: true })
  startMotion()
})
const desktop = useMediaQuery('(min-width: 761px)')
watch(desktop, (value) => { if (value) open.value = false })
const links = [{ to: '/#work', label: 'Work' }, { to: '/#services', label: 'Services' }, { to: '/#process', label: 'How we work' }, { to: '/#faq', label: 'FAQ' }]
const canonical = computed(() => new URL(route.path, config.public.siteUrl).href)
useHead(() => ({ link: [{ rel: 'canonical', href: canonical.value }], script: [{ type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'GAGA TECH', url: config.public.siteUrl, email: 'gagatech@mail.com', telephone: '+62863716131687', address: { '@type': 'PostalAddress', addressLocality: 'Balikpapan', addressCountry: 'ID' }, description: 'Independent website and web application development partner in Balikpapan.' }).replace(/</g, '\\u003c') }] }))
useSeoMeta({ description: 'Big ideas, made real. GAGA TECH builds websites, web applications, and API integrations that make business easier. Based in Balikpapan.', ogSiteName: 'GAGA TECH', ogLocale: 'en_US', ogType: 'website', ogUrl: () => canonical.value, ogImage: () => new URL('/brand/LOGO-GAGATECH.png', config.public.siteUrl).href, twitterCard: 'summary_large_image' })
watch(() => route.fullPath, () => { open.value = false })
onBeforeUnmount(() => {
  window.removeEventListener('scroll', scroll)
  stopMotion()
  removeStartHook()
  removeTransitionHook()
})
</script>
<template>
  <div>
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header wrap" :class="{ 'is-hidden': hidden && !open }">
      <NuxtLink to="/" class="brand" aria-label="GAGA TECH home"><UiLogoMark :size="220" /><span class="brand-tagline">INDEPENDENT<br>DIGITAL PARTNER</span></NuxtLink>
      <nav class="desktop-nav" aria-label="Primary navigation"><NuxtLink v-for="link in links" :key="link.to" :to="link.to">{{ link.label }}</NuxtLink></nav>
      <Button as-child variant="outline" class="nav-cta"><NuxtLink to="/#contact">Start a conversation <span>↗</span></NuxtLink></Button>
      <Sheet v-model:open="open">
        <SheetTrigger as-child><Button variant="ghost" class="menu-toggle" aria-label="Open menu">Menu +</Button></SheetTrigger>
        <SheetContent>
          <SheetTitle class="eyebrow pr-12">GAGA TECH / EXPLORE</SheetTitle>
          <SheetDescription class="sr-only">Explore our work, services, process, and contact options.</SheetDescription>
          <nav class="mobile-menu" aria-label="Mobile navigation">
            <SheetClose v-for="(link, i) in links" :key="link.to" as-child><NuxtLink :to="link.to"><small>0{{ i + 1 }}</small>{{ link.label }} ↗</NuxtLink></SheetClose>
            <SheetClose as-child><NuxtLink to="/#contact">Start a conversation ↗</NuxtLink></SheetClose>
            <p>Balikpapan, Indonesia<br>when technology makes things easier</p>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
    <NuxtPage :transition="{ name: 'page', mode: 'out-in' }" />
    <SiteFooter />
    <a class="floating-wa" href="https://wa.me/62863716131687" target="_blank" rel="noopener noreferrer" aria-label="Contact GAGA TECH on WhatsApp"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M20.52 3.48A11.91 11.91 0 0 0 12.04 0C5.46 0 .1 5.35 .1 11.93c0 2.1 .55 4.16 1.59 5.97L0 24l6.26-1.64a11.95 11.95 0 0 0 5.77 1.47h.01C18.62 23.83 24 18.48 24 11.9c0-3.19-1.24-6.18-3.48-8.42ZM12.04 21.82a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.72.97.99-3.63-.24-.37a9.86 9.86 0 0 1-1.52-5.27c0-5.47 4.45-9.92 9.92-9.92a9.85 9.85 0 0 1 7.01 2.91 9.85 9.85 0 0 1 2.91 7.01c0 5.47-4.46 9.89-9.94 9.89Zm5.44-7.42c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.71.22 1.36.19 1.87.11.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" /></svg><span>Let's talk</span></a>
    <PointerEffects />
  </div>
</template>
