const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/content', '@nuxt/image', '@nuxtjs/i18n', '@nuxtjs/sitemap', '@nuxt/fonts'],
  css: ['~/assets/css/main.css'],
  site: { url: siteUrl, name: 'GAGA TECH', indexable: !!process.env.NUXT_PUBLIC_SITE_URL },
  runtimeConfig: { contactWebhook: '', public: { siteUrl } },
  fonts: { families: [{ name: 'Bricolage Grotesque', provider: 'google' }, { name: 'DM Sans', provider: 'google' }] },
  i18n: { bundle: { optimizeTranslationDirective: false }, defaultLocale: 'en', strategy: 'no_prefix', locales: [{ code: 'en', language: 'en-US', file: 'en.json' }], langDir: '../locales' },
  app: { head: { htmlAttrs: { lang: 'en' }, title: 'GAGA TECH — when technology makes things easier', meta: [{ name: 'theme-color', content: '#0a0a0a' }], link: [{ rel: 'icon', type: 'image/svg+xml', href: '/brand/favicon.svg' }] } },
  sitemap: { urls: ['/work/clinical-system', '/work/hospital-portal', '/work/fnb-ordering', '/work/umkm-catalog', '/work/chat', '/work/trading-dashboard'] },
  nitro: { prerender: { routes: ['/'] } },
  typescript: { strict: true }
})
