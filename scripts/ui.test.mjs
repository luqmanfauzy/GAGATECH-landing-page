import assert from 'node:assert/strict'
import { chromium } from '@playwright/test'

const browser = await chromium.launch({ channel: 'chrome', headless: true })
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' })
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (/hydration/i.test(message.text())) errors.push(message.text()) })
  const response = await page.goto(process.env.TEST_URL || 'http://127.0.0.1:3001', { waitUntil: 'networkidle' })
  assert.equal(response.status(), 200)
  const theme = () => page.evaluate(() => globalThis.document.documentElement.dataset.theme)
  assert.equal(await theme(), 'dark')
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 })
    for (const value of ['light', 'dark']) {
      await page.evaluate(() => globalThis.scrollTo(0, 0))
      const toggle = page.getByRole('button', { name: 'Light / Dark theme', exact: true })
      await toggle.focus()
      await toggle.press('Enter')
      assert.equal(await theme(), value)
      assert.equal(await toggle.getAttribute('aria-pressed'), String(value === 'light'))
      assert.equal(await page.locator('.hero h1 em').evaluate(node => globalThis.getComputedStyle(node).color), value === 'light' ? 'rgb(29, 78, 216)' : 'rgb(96, 165, 250)')
      assert.equal(await page.locator('.logo-mark').first().evaluate(node => globalThis.getComputedStyle(node).filter), value === 'light' ? 'invert(0)' : 'invert(1)')
      assert.ok(await page.evaluate(() => globalThis.document.documentElement.scrollWidth <= globalThis.innerWidth), `Theme header overflow: ${value}, ${width}`)
      if (width === 1440) {
        const blue = value === 'light' ? 'rgb(29, 78, 216)' : 'rgb(96, 165, 250)'
        for (const [selector, property, expected] of [
          ['.hero-actions .ui-solid', 'backgroundColor', blue],
          ['.nav-cta', 'color', blue],
          ['.theme-toggle', 'color', blue],
          ['.desktop-nav a', 'color', blue],
          ['.text-link', 'color', blue],
          ['.filter-tabs button', 'color', blue],
          ['.year-filter', 'color', blue],
          ['.project-card', 'outlineColor', blue],
          ['.services-list summary', 'color', blue],
          ['.faq-list button', 'color', blue],
          ['.contact-links a', 'color', 'rgb(29, 78, 216)'],
          ['.submit-button', 'backgroundColor', 'rgb(29, 78, 216)'],
          ['#name', 'borderBottomColor', 'rgb(29, 78, 216)'],
          ['#message', 'borderBottomColor', 'rgb(29, 78, 216)'],
          ['#service', 'borderBottomColor', 'rgb(29, 78, 216)'],
          ['.footer-grid a', 'color', blue],
        ]) {
          const target = page.locator(selector).first()
          await target.focus()
          await page.keyboard.press('Tab')
          await page.keyboard.press('Shift+Tab')
          assert.ok(await target.evaluate(node => node.matches(':focus-visible')), `Keyboard focus: ${selector}`)
          const style = key => target.evaluate((node, key) => globalThis.getComputedStyle(node)[key], key)
          assert.equal(await style(property), expected, `Focus: ${value} ${selector}`)
          const bounds = await target.boundingBox()
          await target.hover()
          assert.equal(await style(property), expected, `Hover: ${value} ${selector}`)
          if (selector === '.year-filter') {
            await target.click()
            assert.equal(await target.getAttribute('data-state'), 'open')
            await page.keyboard.press('ArrowDown')
            assert.equal(await page.locator('[role="option"][data-highlighted]').evaluate(node => globalThis.getComputedStyle(node).color), blue)
            await page.keyboard.press('Escape')
            continue
          }
          const hoverBackground = await style('backgroundColor')
          await page.mouse.down()
          assert.ok(await target.evaluate(node => node.matches(':active')), `Pressed: ${selector}`)
          if (selector.includes('ui-solid') || selector === '.submit-button' || selector === '.theme-toggle' || selector === '.filter-tabs button') {
            assert.notEqual(await style('backgroundColor'), hoverBackground, `Press feedback: ${value} ${selector}`)
          }
          assert.deepEqual(await target.boundingBox(), bounds, `Stable bounds: ${selector}`)
          await page.mouse.move(0, 0)
          await page.mouse.up()
          if (selector === '.project-card') {
            await target.hover()
            assert.equal(await target.locator('.project-open').evaluate(node => globalThis.getComputedStyle(node).backgroundColor), blue)
          }
        }
        assert.equal(await page.locator('.hero-illustration').evaluate(node => globalThis.getComputedStyle(node).filter), 'none')
        await page.emulateMedia({ reducedMotion: 'no-preference' })
        await page.locator('.project-card').first().hover()
        await page.waitForTimeout(300)
        assert.equal(await page.locator('.project-open').first().evaluate(node => globalThis.getComputedStyle(node).backgroundColor), blue)
        await page.emulateMedia({ reducedMotion: 'reduce' })
      }
      await page.reload({ waitUntil: 'networkidle' })
      assert.equal(await theme(), value)
      await page.getByRole('button', { name: 'Send your message' }).click()
      assert.equal(await page.locator('#name').getAttribute('aria-invalid'), 'true')
      if (width <= 760) {
        await page.evaluate(() => globalThis.scrollTo(0, 0))
        await page.getByRole('button', { name: 'Open menu' }).click()
        assert.equal(await page.getByRole('dialog').evaluate(node => globalThis.getComputedStyle(node).backgroundColor), value === 'light' ? 'rgb(255, 255, 255)' : 'rgb(10, 10, 10)')
        const mobileLink = page.locator('.mobile-menu > a').first()
        await mobileLink.focus()
        await page.keyboard.press('Tab')
        await page.keyboard.press('Shift+Tab')
        assert.equal(await mobileLink.evaluate(node => globalThis.getComputedStyle(node).color), value === 'light' ? 'rgb(29, 78, 216)' : 'rgb(96, 165, 250)')
        await page.keyboard.press('Escape')
      }
      await page.locator('.project-card').first().click()
      await page.locator('.case-header').waitFor()
      assert.equal(await theme(), value)
      await page.locator('.case-back').click()
      await page.locator('.hero').waitFor()
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto(process.env.TEST_URL || 'http://127.0.0.1:3001', { waitUntil: 'networkidle' })
  const startupPage = await browser.newPage({ colorScheme: 'light' })
  await startupPage.route('**/*', route => route.request().resourceType() === 'script' ? route.abort() : route.continue())
  await startupPage.addInitScript(() => globalThis.localStorage.setItem('gaga-theme', 'light'))
  await startupPage.goto(process.env.TEST_URL || 'http://127.0.0.1:3001', { waitUntil: 'domcontentloaded' })
  assert.equal(await startupPage.evaluate(() => globalThis.document.documentElement.dataset.theme), 'light')
  assert.equal(await startupPage.locator('html').evaluate(node => globalThis.getComputedStyle(node).colorScheme), 'light')
  await startupPage.close()
  const blockedPage = await browser.newPage({ colorScheme: 'light' })
  blockedPage.on('pageerror', error => errors.push(error.message))
  await blockedPage.addInitScript(() => {
    const storage = globalThis.localStorage
    const getItem = storage.getItem.bind(storage)
    const setItem = storage.setItem.bind(storage)
    storage.getItem = key => { if (key === 'gaga-theme') throw new Error('Storage blocked'); return getItem(key) }
    storage.setItem = (key, value) => { if (key === 'gaga-theme') throw new Error('Storage blocked'); setItem(key, value) }
  })
  await blockedPage.goto(process.env.TEST_URL || 'http://127.0.0.1:3001', { waitUntil: 'networkidle' })
  assert.equal(await blockedPage.evaluate(() => globalThis.document.documentElement.dataset.theme), 'dark')
  await blockedPage.getByRole('button', { name: 'Light / Dark theme', exact: true }).click()
  assert.equal(await blockedPage.evaluate(() => globalThis.document.documentElement.dataset.theme), 'light')
  await blockedPage.close()
  globalThis.console.log('Themes: desktop/mobile, keyboard toggle, persistence, pre-hydration startup, blocked storage, logos, forms, Sheet and case navigation passed')
  const illustration = page.locator('.hero-illustration')
  assert.equal(await illustration.getAttribute('src'), '/assets/header.png')
  assert.ok(await illustration.evaluate(node => node.complete && node.naturalWidth === 1448 && node.naturalHeight === 1086))
  assert.equal(await illustration.evaluate(node => globalThis.getComputedStyle(node).animationName), 'none')
  await page.getByRole('combobox', { name: 'Filter by year' }).click()
  await page.getByRole('option', { name: '2025', exact: true }).click()
  assert.ok(await page.locator('.project-year').evaluateAll(nodes => nodes.every(node => node.textContent.trim() === '2025')))
  await page.getByRole('combobox', { name: 'Filter by year' }).click()
  await page.getByRole('option', { name: 'All years', exact: true }).click()
  assert.equal(await page.locator('.project-card').count(), 6)
  const faq = page.getByRole('button', { name: /Not sure what you need yet/ })
  await faq.click()
  assert.equal(await faq.getAttribute('aria-expanded'), 'true')
  await faq.press('Enter')
  assert.equal(await faq.getAttribute('aria-expanded'), 'false')
  await page.getByRole('button', { name: 'Send your message' }).click()
  assert.equal(await page.locator('#name').getAttribute('aria-invalid'), 'true')
  await page.locator('#name').fill('Test User')
  await page.locator('#email').fill('test@example.com')
  await page.locator('#service').selectOption({ label: 'New website' })
  await page.locator('#message').fill('Please build a website for my business.')
  await page.getByRole('checkbox').check()
  await page.route('**/api/contact', route => route.fulfill({ status: 503, contentType: 'application/json', body: '{}' }))
  await page.locator('#email').press('Enter')
  await page.getByRole('alert').waitFor()
  assert.equal(await page.locator('#name').inputValue(), 'Test User')
  await page.unroute('**/api/contact')
  await page.route('**/api/contact', async route => {
    await new Promise(resolve => globalThis.setTimeout(resolve, 300))
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' })
  })
  await page.getByRole('button', { name: 'Send your message' }).click()
  assert.ok(await page.getByRole('button', { name: /Sending message/ }).isDisabled())
  await page.getByRole('heading', { name: 'Your message is received.' }).waitFor()
  await page.setViewportSize({ width: 390, height: 844 })
  await page.evaluate(() => globalThis.window.scrollTo(0, 0))
  const menu = page.getByRole('button', { name: 'Open menu' })
  await menu.click()
  const dialog = page.getByRole('dialog')
  await dialog.waitFor()
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press('Tab')
    assert.ok(await dialog.evaluate(node => node.contains(globalThis.document.activeElement)))
  }
  await page.keyboard.press('Escape')
  await dialog.waitFor({ state: 'hidden' })
  assert.ok(await menu.evaluate(node => node === globalThis.document.activeElement))
  await menu.click()
  await dialog.getByRole('link', { name: /Services/ }).click()
  await dialog.waitFor({ state: 'hidden' })
  assert.ok(page.url().endsWith('#services'))
  assert.ok(await page.evaluate(() => globalThis.document.documentElement.scrollWidth <= globalThis.window.innerWidth))
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 })
    await page.locator('.hero').scrollIntoViewIfNeeded()
    await page.waitForTimeout(900)
    const copy = await page.locator('.hero-copy').boundingBox()
    const art = await page.locator('.hero-art').boundingBox()
    assert.ok(width > 760 ? art.x >= copy.x + copy.width : art.y >= copy.y + copy.height, `Hero layout at ${width}`)
    assert.ok(art.x >= 0 && art.x + art.width <= width, `Hero image bounds at ${width}`)
    assert.equal(await illustration.evaluate(node => globalThis.getComputedStyle(node).animationName), 'hero-float')
    for (const selector of ['.hero', '.project-grid', '.contact-grid']) {
      await page.locator(selector).scrollIntoViewIfNeeded()
      assert.ok(await page.evaluate(() => globalThis.document.documentElement.scrollWidth <= globalThis.innerWidth), `Overflow at ${width}: ${selector}`)
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.locator('.project-card').first().click()
  await page.locator('.case-header.motion-enter').waitFor()
  await page.locator('.case-back').click()
  await page.locator('.project-card').first().waitFor()
  await page.locator('.contact-grid').scrollIntoViewIfNeeded()
  await page.locator('.contact-copy.motion-enter').waitFor()
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.waitForFunction(() => !globalThis.document.querySelector('.motion-enter'))
  const nojs = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } })
  await nojs.goto(process.env.TEST_URL || 'http://127.0.0.1:3001')
  assert.ok(await nojs.locator('.hero h1').isVisible())
  assert.ok(await nojs.locator('.project-card').first().isVisible())
  assert.ok(await nojs.locator('.contact-copy').isVisible())
  await nojs.close()
  globalThis.console.log('Motion: desktop/mobile widths 320–1440, route return, reduced-motion toggle and no-JS content passed')
  assert.deepEqual(errors, [])
  globalThis.console.log('Chrome desktop/mobile: filters, FAQ, form validation/error/loading/success, native submit, Sheet focus/Escape/links and overflow passed')
} finally {
  await browser.close()
}
