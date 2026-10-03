<script setup lang="ts">
import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRoute, useRuntimeConfig, useHead, useSeoMeta } from '#imports'
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
onMounted(() => window.addEventListener('scroll', scroll, { passive: true }))
const toggle = ref<HTMLButtonElement>()
const menu = ref<HTMLElement>()
const links = [{ to: '/#work', label: 'Work' }, { to: '/#services', label: 'Services' }, { to: '/#process', label: 'How we work' }, { to: '/#faq', label: 'FAQ' }]
const canonical = computed(() => new URL(route.path, config.public.siteUrl).href)
useHead(() => ({ link: [{ rel: 'canonical', href: canonical.value }], script: [{ type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'GAGA TECH', url: config.public.siteUrl, email: 'gagatech@mail.com', telephone: '+62863716131687', address: { '@type': 'PostalAddress', addressLocality: 'Balikpapan', addressCountry: 'ID' }, description: 'Independent website and web application development partner in Balikpapan.' }).replace(/</g, '\\u003c') }] }))
useSeoMeta({ description: 'Big ideas, made real. GAGA TECH builds websites, web applications, and API integrations that make business easier. Based in Balikpapan.', ogSiteName: 'GAGA TECH', ogLocale: 'en_US', ogType: 'website', ogUrl: () => canonical.value, ogImage: () => new URL('/_ipx/f_png/brand/og.svg', config.public.siteUrl).href, twitterCard: 'summary_large_image' })
watch(open, async (value) => { document.body.style.overflow = value ? 'hidden' : ''; if (value) { await nextTick(); menu.value?.querySelector<HTMLAnchorElement>('a')?.focus() } else toggle.value?.focus() })
watch(() => route.fullPath, () => { open.value = false })
function keys(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
  if (e.key !== 'Tab' || !open.value) return
  const nodes = [toggle.value, ...Array.from(menu.value?.querySelectorAll<HTMLAnchorElement>('a') || [])].filter(Boolean) as HTMLElement[]
  const first = nodes[0], last = nodes[nodes.length - 1]
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus() }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus() }
}
onBeforeUnmount(() => { document.body.style.overflow = ''; window.removeEventListener('scroll', scroll) })
</script>
<template>
  <div @keydown="keys">
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header wrap" :class="{ 'is-hidden': hidden && !open }">
      <NuxtLink to="/" class="brand" aria-label="GAGA TECH home"><UiLogoMark :size="148" /><span>INDEPENDENT<br>DIGITAL PARTNER</span></NuxtLink>
      <nav class="desktop-nav" aria-label="Primary navigation"><NuxtLink v-for="link in links" :key="link.to" :to="link.to">{{ link.label }}</NuxtLink></nav>
      <NuxtLink class="nav-cta" to="/#contact">Start a conversation <span>↗</span></NuxtLink>
      <button ref="toggle" class="menu-toggle" :aria-expanded="open" aria-controls="mobile-menu" :aria-label="open ? 'Close menu' : 'Open menu'" @click="open = !open">{{ open ? 'Close ×' : 'Menu +' }}</button>
    </header>
    <nav v-if="open" id="mobile-menu" ref="menu" class="mobile-menu" aria-label="Mobile navigation"><span class="eyebrow">GAGA TECH / EXPLORE</span><NuxtLink v-for="(link, i) in links" :key="link.to" :to="link.to" @click="open = false"><small>0{{ i + 1 }}</small>{{ link.label }} ↗</NuxtLink><NuxtLink to="/#contact" @click="open = false">Start a conversation ↗</NuxtLink><p>Balikpapan, Indonesia<br>when technology makes things easier</p></nav>
    <div :inert="open"><NuxtPage /></div>
    <SiteFooter :inert="open" />
    <a class="floating-wa" href="https://wa.me/62863716131687" target="_blank" rel="noopener noreferrer" aria-label="Contact GAGA TECH on WhatsApp"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-12 7L3 20l1.5-5A8 8 0 1 1 20 11.5Z" stroke="currentColor" stroke-width="1.5" /><path d="M8 7c-2 3 3 8 6 7l1-2-3-1-1 1-2-2 1-1-2-2Z" fill="currentColor" /></svg><span>Let's talk</span></a>
    <PointerEffects />
  </div>
</template>
