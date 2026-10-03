# GAGA TECH

English dark-first landing page: Nuxt 3, Vue 3, TypeScript, Tailwind CSS, Nuxt Content, Image, Fonts, i18n, and Sitemap. Brand colors: `#091413`, `#285A48`, `#408A71`, `#B0E4CC`.

## Setup

Use Node.js 22.12+ (verified with 22.22.1). No global pnpm required.

```sh
npx --yes pnpm@10.11.0 install --frozen-lockfile
cp .env.example .env
npx --yes pnpm@10.11.0 dev
```

Open `http://localhost:3000`. Update URL when using another port so form origin checks match.

```sh
npx --yes pnpm@10.11.0 lint
npx --yes pnpm@10.11.0 typecheck
npx --yes pnpm@10.11.0 test
npx --yes pnpm@10.11.0 build
node scripts/test.mjs --http
npx --yes pnpm@10.11.0 preview
```

HTTP test needs latest build and unused port 4317. It starts temporary server, checks home page, six project details, 404, SEO metadata, assets, robots/sitemap, and form rejection. Test sends no messages to real service.

Espree is explicitly installed so Vue parser does not select Linux system Espree, which can export version `main` and cause `Invalid Version: main`.

## Folder structure

```text
app.vue                 Navigation, footer, canonical URL, metadata, JSON-LD
pages/index.vue         Landing sections, project filter, services, pricing, FAQ
pages/work/[slug].vue   Example project details from Nuxt Content
components/             Contact form, concept previews, pointer/canvas effects
components/ui/          Logo component
assets/css/main.css     Color tokens, responsive layout, reduced motion
content/projects/       Six example project Markdown files and metadata
locales/                English locale configuration
public/brand/           Full/mono logos, favicon, OG image source
server/api/             Server-side contact endpoint
server/routes/          Domain-aware robots.txt
utils/contact.ts        Shared client/server validation
scripts/                Validation and HTTP smoke tests
nuxt.config.ts          Modules, runtime config, sitemap, prerender
```

Example routes: `/work/clinical-system`, `/work/hospital-portal`, `/work/fnb-ordering`, `/work/umkm-catalog`, `/work/chat`, `/work/trading-dashboard`. Every preview is static illustration, not operational application or client-result claim.

## Deploy and contact

- Deploy as **Node server**, not static upload only; contact endpoint and OG PNG conversion need server.
- Set `NUXT_PUBLIC_SITE_URL` to final HTTPS origin **before build and at runtime**. Home page is prerendered; domain changes need rebuild. Without final domain, localhost build warning is expected.
- Set `NUXT_CONTACT_WEBHOOK` only in server environment to recipient-owned HTTPS endpoint. Never place secrets in public variables or repository.
- Run `node .output/server/index.mjs`; use `PORT`/`HOST` as platform requires. Runtime does not load `.env` automatically; inject environment through deployment platform.
- Webhook receives JSON `name`, `email`, `service`, `message`, `consent`. Endpoint must return 2xx only after message is reliably received. Redirects are rejected; timeout is 10 seconds. App success response means webhook received request, not proof email was read or delivered to inbox.
- Without webhook: HTTP 503, no false success. Webhook failure: HTTP 502. Validation: 422; invalid JSON: 400; cross-origin: 403; wrong content type: 415; body over 16 KiB: 413. No local message storage.
- Add request rate and size limits at reverse proxy/platform before publishing. Honeypot and validation do not replace spam protection.

## TODO before publishing

- Confirm WhatsApp number, email, location, and project availability with business owner.
- Fill `TODO PRICE` to match scope; do not invent prices or support durations.
- Replace example projects only with licensed original work; add verified images, process, and outcomes. Keep concept labels until available.
- Add testimonials only after permission; do not create fictional client quotes or metrics.
- Define privacy policy, webhook data retention, recipient access, and delivery-failure monitoring.
- Test real webhook end-to-end (success, failure, timeout), canonical domain, production sitemap, and social sharing preview.
- Check desktop/mobile browsers, keyboard, screen reader, reduced motion, and Lighthouse before release. HTTP smoke test is not visual audit.
- Review dependency updates separately: installation still reports Nuxt CLI/schema and oxc-parser peer warnings; avoid major upgrades without testing.
