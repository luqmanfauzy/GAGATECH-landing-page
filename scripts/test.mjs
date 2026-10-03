import { readFile } from 'node:fs/promises'
import { Buffer } from 'node:buffer'
import { URL } from 'node:url'
import ts from 'typescript'
import assert from 'node:assert/strict'
import console from 'node:console'
const { fetch } = globalThis
import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { setTimeout } from 'node:timers/promises'

const compile = async path => ts.transpileModule(await readFile(new URL(path, import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText
const moduleUrl = source => `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`
const validation = moduleUrl(await compile('../utils/contact.ts'))
const test = (await compile('./validate.test.ts')).replace('../utils/contact.ts', validation)
await import(moduleUrl(test))

const topo = await readFile(new URL('../components/ui/TopoField.vue', import.meta.url), 'utf8')
const settingsSource = topo.slice(topo.indexOf('const clamp ='), topo.indexOf('const canvas ='))
const evaluateSettings = new Function('props', 'computed', ts.transpileModule(`${settingsSource}\nreturn settings`, { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText)
const defaults = { speed: 1, length: 1, density: 1, opacity: 1, hue: 0, saturation: 1, brightness: 1 }
const settingsFor = overrides => evaluateSettings({ ...defaults, ...overrides }, fn => fn())
assert.deepEqual(settingsFor({}), defaults)
assert.equal(settingsFor({ speed: 0 }).speed, 0)
assert.equal(settingsFor({ speed: -1 }).speed, 0)
assert.equal(settingsFor({ length: 0 }).length, .1)
assert.equal(settingsFor({ density: 100 }).density, 10)
assert.equal(settingsFor({ opacity: 2 }).opacity, 1)
assert.equal(settingsFor({ hue: -999 }).hue, -360)
for (const value of [NaN, Infinity, -Infinity, '2', null]) {
  for (const key of Object.keys(defaults)) assert.equal(settingsFor({ [key]: value })[key], defaults[key])
}
console.log('TopoField: defaults, zero speed, finite input and bounds passed')

if (process.argv.includes('--http')) {
  const base = 'http://127.0.0.1:4317'
  const server = spawn(process.execPath, ['.output/server/index.mjs'], { env: { ...process.env, PORT: '4317', HOST: '127.0.0.1', NUXT_PUBLIC_SITE_URL: base, NUXT_CONTACT_WEBHOOK: '' }, stdio: 'inherit' })
  const exited = once(server, 'exit')
  try {
    let ready = false
    for (let attempt = 0; attempt < 100; attempt++) {
      try { ready = (await fetch(base)).ok } catch { ready = false }
      if (ready) break
      await setTimeout(100)
    }
    assert.ok(ready, 'Production server starts')
    const slugs = ['clinical-system', 'hospital-portal', 'fnb-ordering', 'umkm-catalog', 'chat', 'trading-dashboard']
    for (const path of ['/', ...slugs.map(slug => `/work/${slug}`)]) {
      const response = await fetch(base + path)
      assert.equal(response.status, 200, path)
      const html = await response.text()
      for (const marker of ['GAGA TECH', 'rel="canonical"', 'property="og:image"', 'application/ld+json', 'id="main"']) assert.ok(html.includes(marker), `${path}: ${marker}`)
    }
    assert.equal((await fetch(`${base}/work/missing-example`)).status, 404)
    for (const asset of ['favicon.svg', 'logo-full.svg', 'logo-mono.svg', 'og.svg']) assert.equal((await fetch(`${base}/brand/${asset}`)).status, 200, asset)
    const og = await fetch(`${base}/_ipx/f_png/brand/og.svg`)
    assert.equal(og.status, 200)
    assert.match(og.headers.get('content-type'), /image\/png/)
    assert.match(await (await fetch(`${base}/robots.txt`)).text(), /Disallow: \/\s/)
    const sitemap = await fetch(`${base}/sitemap.xml`)
    assert.equal(sitemap.status, 200)
    const valid = { name: 'Test User', email: 'test@example.com', service: 'New website', message: 'I would like a website for my business.', consent: true, website: '' }
    const cases = [
      [422, JSON.stringify({}), {}],
      [422, JSON.stringify({ ...valid, website: 'spam' }), {}],
      [400, '{', {}],
      [413, JSON.stringify({ message: 'x'.repeat(17000) }), {}],
      [415, JSON.stringify(valid), { 'Content-Type': 'text/plain' }],
      [403, JSON.stringify(valid), { Origin: 'https://example.invalid' }],
      [503, JSON.stringify(valid), { Origin: base }]
    ]
    for (const [expected, body, headers] of cases) {
      const response = await fetch(`${base}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body })
      assert.equal(response.status, expected)
      assert.notEqual((await response.json()).ok, true)
    }
    console.log('Production HTTP: home, six projects, 404, SEO, assets, robots, sitemap, contact rejection and unconfigured delivery passed')
  } finally {
    server.kill('SIGTERM')
    await exited
  }
}
