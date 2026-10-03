import { defineEventHandler, setHeader } from 'h3'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(event => {
  const { public: { siteUrl } } = useRuntimeConfig(event)
  const url = new URL(siteUrl)
  const indexable = url.protocol === 'https:' && !['localhost', '127.0.0.1'].includes(url.hostname)
  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  return indexable ? `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${new URL('/sitemap.xml', url).href}\n` : 'User-agent: *\nDisallow: /\n'
})
