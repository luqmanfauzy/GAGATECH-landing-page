<script setup lang="ts">
import { computed, ref } from "vue";
import { useAsyncData, queryContent, useSeoMeta } from "#imports";
const { data: projects } = await useAsyncData("projects", () =>
    queryContent("/projects").find(),
);
const category = ref("All");
const year = ref("All years");
const filtered = computed(() =>
    (projects.value || [])
        .filter(
            (p) =>
                (category.value === "All" || p.category === category.value) &&
                (year.value === "All years" || p.year === year.value),
        )
        .sort(
            (a, b) =>
                [
                    "clinical",
                    "hospital",
                    "fnb",
                    "catalog",
                    "chat",
                    "trading",
                ].indexOf(a.kind) -
                [
                    "clinical",
                    "hospital",
                    "fnb",
                    "catalog",
                    "chat",
                    "trading",
                ].indexOf(b.kind),
        ),
);
const serviceItems = [
    {
        title: "Website development",
        label: "01",
        tag: "YOUR DIGITAL FRONT DOOR",
        text: "Websites that do more than look good—they help people understand your business and take next step.",
        points: [
            "Company profile & landing pages",
            "Mobile-first design & foundational SEO",
            "Easy-to-manage CMS",
        ],
    },
    {
        title: "Website redesign",
        label: "02",
        tag: "A FRESH PERSPECTIVE",
        text: "Keep what works. Improve experience, structure, and visual design that has fallen behind.",
        points: [
            "UX and content-structure audit",
            "Consistent visual identity",
            "Migration and redirect plan",
        ],
    },
    {
        title: "Bug fixing & optimization",
        label: "03",
        tag: "LESS FRICTION. MORE FLOW.",
        text: "Find root cause, not patch symptoms. From disruptive errors to pages that load too slowly.",
        points: [
            "Bug diagnosis and fixes",
            "Core Web Vitals audit",
            "Critical-flow testing",
        ],
    },
    {
        title: "Maintenance & support",
        label: "04",
        tag: "KEEP THINGS RUNNING",
        text: "Websites need care too. Planned updates and support within agreed scope.",
        points: ["Dependency updates", "Backup checks", "Support as agreed"],
    },
    {
        title: "Web application",
        label: "05",
        tag: "BUILT AROUND YOUR WORK",
        text: "Your business workflow is unique. Build tools around your team’s needs—not team around tool.",
        points: [
            "Dashboards & internal systems",
            "Authentication & access control",
            "Databases & operational workflows",
        ],
    },
    {
        title: "API & integration",
        label: "06",
        tag: "BETTER, CONNECTED",
        text: "Connect separate services so data moves correctly and repetitive work is reduced.",
        points: [
            "REST APIs & webhooks",
            "Third-party service integrations",
            "Validation & error handling",
        ],
    },
];
const steps = [
    [
        "Get acquainted",
        "Tell us about business, needs, and what makes work feel difficult.",
    ],
    [
        "Map direction",
        "Agree scope, priorities, cost, and timeline. Everything clear before work begins.",
    ],
    [
        "Design experience",
        "Review structure and design together. No guessing based on taste.",
    ],
    [
        "Build & connect",
        "Develop in stages with progress updates you can follow.",
    ],
    [
        "Test until ready",
        "Check functionality, mobile experience, accessibility, and key user flows.",
    ],
    [
        "Launch & support",
        "Deploy, hand over, and provide management guidance. Support follows agreed scope.",
    ],
];
const faqs = [
    [
        "Not sure what you need yet. Can we talk first?",
        "Yes. Tell us about problem or business goal through WhatsApp or form. We will map needs first, with no need to commit to project immediately.",
    ],
    [
        "How long does website take?",
        "It depends on scope, content readiness, and integrations. Timeline estimate comes after needs discussion; we do not promise duration before understanding work.",
    ],
    [
        "Can you improve existing website?",
        "Yes. We begin by reviewing technology, access, and current issues. Audit findings determine whether gradual improvement or rebuild makes more sense.",
    ],
    [
        "What about domain, hosting, and source code?",
        "Account ownership, source code, third-party service costs, and handover process are documented in project agreement. Ideally, domain and hosting are registered in your name.",
    ],
    [
        "Is support available after launch?",
        "Maintenance options are available. Initial support period, fixes, response times, and ongoing fees are set in scope—not an unlimited-support promise.",
    ],
    [
        "Can we work together from outside Balikpapan?",
        "Yes. Discussions, design reviews, and progress updates can happen online. Communication schedule follows mutual agreement, using WITA time zone.",
    ],
];
useSeoMeta({
    title: "GAGA TECH — Big ideas. Made real.",
    ogTitle: "GAGA TECH — Big ideas. Made real.",
    ogDescription:
        "Websites, web applications, and digital solutions that make business easier. Independent digital partner from Balikpapan.",
});
</script>
<template>
    <main id="main">
        <section class="hero wrap">
            <UiTopoField mode="dark" />
            <div class="hero-top mono">
                <span
                    ><i class="status-dot" /> AVAILABLE FOR SELECT
                    PROJECTS</span
                ><span
                    >BALIKPAPAN, ID
                    <span class="hero-coordinates">
                        / 01°16′ S 116°49′ E</span
                    ></span
                >
            </div>
            <div class="hero-main">
                <div class="hero-copy">
                    <div class="eyebrow hero-eyebrow">
                        SMALL STUDIO. BIG POSSIBILITIES.
                    </div>
                    <h1>
                        Big ideas.<br />Made
                        <em>real<span class="period">.</span></em>
                    </h1>
                    <div class="hero-bottom">
                        <span class="hero-spark" aria-hidden="true">✳</span>
                        <div>
                            <p>
                                We design websites and web applications that<br
                                    class="desktop-break"
                                />
                                work as well as they look. Simpler.<br
                                    class="desktop-break"
                                />
                                More useful. More <span>you.</span>
                            </p>
                            <div class="hero-actions">
                                <a
                                    href="#contact"
                                    class="button mint"
                                    data-magnetic
                                    >Discuss your idea <span>↗</span></a
                                ><a href="#work" class="text-link"
                                    >See explorations <span>↓</span></a
                                >
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hero-art" aria-hidden="true">
                    <div class="orbit orbit-one" />
                    <div class="orbit orbit-two" />
                    <div class="orbit orbit-three" />
                    <div class="orbit-cross cross-one">+</div>
                    <div class="orbit-cross cross-two">+</div>
                    <div class="hero-object">
                        <div class="object-tile tile-back" />
                        <div class="object-tile tile-mid" />
                        <div class="object-tile tile-front">
                            <svg viewBox="0 0 160 160">
                                <path
                                    d="M43 38h74v21H64v58h32V94H78V74h39v64H43z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                    </div>
                    <div class="art-note mono">
                        LESS COMPLEXITY.<br />MORE POSSIBILITY.
                    </div>
                    <div class="code-badge mono">
                        <i class="status-dot" /> IDEAS INTO INTERFACES
                        <span>↗</span>
                    </div>
                </div>
            </div>
            <div class="hero-baseline">
                <p>when technology makes things easier</p>
                <a href="#intro" class="mono"
                    >SCROLL TO EXPLORE <span>↓</span></a
                >
            </div>
        </section>
        <div class="tech-strip">
            <div class="marquee-track">
                <div
                    v-for="copy in 2"
                    :key="copy"
                    class="marquee-group"
                    :aria-hidden="copy === 2"
                >
                    <span>NUXT</span><i>✳</i><span>VUE.JS</span><i>✳</i
                    ><span>TYPESCRIPT</span><i>✳</i><span>TAILWIND CSS</span
                    ><i>✳</i><span>NODE.JS</span><i>✳</i><span>REST API</span
                    ><i>✳</i><span>POSTGRESQL</span><i>✳</i>
                </div>
            </div>
        </div>
        <section id="intro" class="intro wrap section">
            <div class="section-label">
                <span class="tiny-square" /> THE WAY WE THINK
                <span class="label-index">/ 01</span>
            </div>
            <div class="intro-content">
                <h2>
                    Technology should<br />make life <span>easier.</span
                    ><br />Not harder.
                </h2>
                <div class="intro-bottom">
                    <p>
                        More features are not always answer. We believe best
                        digital solutions begin with understanding problem, then
                        building what is truly needed.
                    </p>
                    <p>
                        GAGA TECH is independent digital partner from
                        Balikpapan. We work directly, think openly, and care
                        about details that make difference.
                    </p>
                </div>
            </div>
        </section>
        <section id="work" class="work-section wrap section">
            <div class="section-heading">
                <div>
                    <div class="section-label">
                        <span class="tiny-square" /> SELECTED EXPLORATIONS
                        <span class="label-index">/ 02</span>
                    </div>
                    <h2>
                        More than appearance.<br /><span
                            >Thoughtful by design.</span
                        >
                    </h2>
                </div>
                <p>
                    A few possibilities we can build together.<br /><span
                        class="example-note"
                        >Every item below is an example concept,<br />not client
                        project or result.</span
                    >
                </p>
            </div>
            <div class="work-filters">
                <div
                    class="filter-tabs"
                    role="group"
                    aria-label="Project category"
                >
                    <button
                        v-for="item in [
                            'All',
                            'Website',
                            'Web App',
                            'Dashboard',
                        ]"
                        :key="item"
                        :class="{ active: category === item }"
                        :aria-pressed="category === item"
                        @click="category = item"
                    >
                        {{ item }} <small v-if="item === 'All'">06</small>
                    </button>
                </div>
                <label class="year-filter"
                    ><span class="sr-only">Filter by year</span
                    ><select v-model="year">
                        <option>All years</option>
                        <option>2026</option>
                        <option>2025</option>
                    </select></label
                >
            </div>
            <p class="sr-only" aria-live="polite">
                {{ filtered.length }} example projects shown.
            </p>
            <div class="project-grid">
                <NuxtLink
                    v-for="(project, i) in filtered"
                    :key="project._path"
                    :to="`/work/${project.slug}`"
                    class="project-card"
                    data-project
                    ><div class="project-image-wrap">
                        <ProjectPreview
                            :kind="project.kind"
                            :title="project.slug"
                        /><span class="example-badge">EXAMPLE / CONCEPT</span
                        ><span class="project-open" aria-hidden="true">↗</span>
                    </div>
                    <div class="project-meta">
                        <div>
                            <span class="mono project-index"
                                >{{ String(i + 1).padStart(2, "0") }} /
                                {{ project.category }}</span
                            >
                            <h3>{{ project.title }}</h3>
                            <p>{{ project.summary }}</p>
                        </div>
                        <span class="mono project-year">{{
                            project.year
                        }}</span>
                    </div>
                    <span class="project-todo">{{
                        project.notice
                    }}</span></NuxtLink
                >
            </div>
            <div v-if="!filtered.length" class="empty-state">
                No example projects match these filters.
                <button
                    @click="
                        category = 'All';
                        year = 'All years';
                    "
                >
                    Reset filter ↗
                </button>
            </div>
        </section>
        <section id="services" class="services-section section">
            <div class="wrap">
                <div class="section-heading">
                    <div>
                        <div class="section-label">
                            <span class="tiny-square" /> WHAT WE CAN DO
                            <span class="label-index">/ 03</span>
                        </div>
                        <h2>From “how?”<br />to <em>“that’s how.”</em></h2>
                    </div>
                    <p>
                        From first page to systems behind it.<br />We choose
                        right solution, not most complex one.
                    </p>
                </div>
                <div class="services-list">
                    <details
                        v-for="(service, i) in serviceItems"
                        :key="service.label"
                        :open="i === 0"
                    >
                        <summary>
                            <span class="mono service-number">{{
                                service.label
                            }}</span>
                            <h3>{{ service.title }}</h3>
                            <span class="service-plus" aria-hidden="true"
                                >+</span
                            >
                        </summary>
                        <div class="service-detail">
                            <span class="mono" data-scramble>{{
                                service.tag
                            }}</span>
                            <p>{{ service.text }}</p>
                            <ul>
                                <li
                                    v-for="point in service.points"
                                    :key="point"
                                >
                                    {{ point }}
                                </li>
                            </ul>
                            <a href="#contact" aria-label="Discuss this service"
                                >Let’s talk ↗</a
                            >
                        </div>
                    </details>
                </div>
            </div>
        </section>
        <section id="process" class="process-section wrap section">
            <div class="section-heading">
                <div>
                    <div class="section-label">
                        <span class="tiny-square" /> HOW WE WORK
                        <span class="label-index">/ 04</span>
                    </div>
                    <h2>Clear process.<br /><span>No guesswork.</span></h2>
                </div>
                <p>
                    You know what is being done,<br />why it matters, and what
                    comes next.
                </p>
            </div>
            <div class="process-grid">
                <article v-for="(step, i) in steps" :key="step[0]">
                    <div class="process-number mono">
                        0{{ i + 1 }}<span>↗</span>
                    </div>
                    <h3>{{ step[0] }}</h3>
                    <p>{{ step[1] }}</p>
                </article>
            </div>
        </section>
        <section class="standards-section wrap section">
            <div class="standards-title">
                <div class="section-label">
                    <span class="tiny-square" /> THE NON-NEGOTIABLES
                    <span class="label-index">/ 05</span>
                </div>
                <h2>Good outside.<br /><em>Solid inside.</em></h2>
                <span class="standards-symbol" aria-hidden="true">✳</span>
            </div>
            <div class="standards-grid">
                <article>
                    <span class="mono">01 / PERFORMANCE</span>
                    <h3>Lean, not overloaded.</h3>
                    <p>
                        Efficient assets and only necessary dependencies. Speed
                        is tested, not assumed.
                    </p>
                </article>
                <article>
                    <span class="mono">02 / ACCESSIBILITY</span>
                    <h3>Built for more people.</h3>
                    <p>
                        Semantic structure, keyboard navigation, contrast, and
                        motion preferences are part of design.
                    </p>
                </article>
                <article>
                    <span class="mono">03 / MAINTAINABILITY</span>
                    <h3>Easy to carry forward.</h3>
                    <p>
                        Structured code and relevant documentation. No
                        unnecessary dependency on us.
                    </p>
                </article>
                <article>
                    <span class="mono">04 / SECURITY</span>
                    <h3>Responsible foundations.</h3>
                    <p>
                        Input validation, access management, and secrets stay
                        server-side. Security is not add-on.
                    </p>
                </article>
            </div>
        </section>
        <section id="pricing" class="pricing-section wrap section">
            <div class="section-heading">
                <div>
                    <div class="section-label">
                        <span class="tiny-square" /> FIND YOUR STARTING POINT
                        <span class="label-index">/ 06</span>
                    </div>
                    <h2>Start with what <em>you need.</em></h2>
                </div>
                <p>
                    Scope first, then numbers.<br />Final quote follows project
                    needs.
                </p>
            </div>
            <div
                class="pricing-scroll"
                role="region"
                tabindex="0"
                aria-label="Package comparison; scroll to see all columns"
            >
                <table>
                    <caption class="sr-only">
                        Comparison of three service scopes
                    </caption>
                    <thead>
                        <tr>
                            <th scope="col">Scope</th>
                            <th scope="col">
                                <span class="mono">01 / START</span>
                                <h3>Essential</h3>
                                <p>Show up well.</p>
                                <b>TODO PRICE</b>
                            </th>
                            <th scope="col" class="featured">
                                <span class="mono">02 / GROW</span>
                                <h3>Business</h3>
                                <p>Room to grow.</p>
                                <b>TODO PRICE</b>
                            </th>
                            <th scope="col">
                                <span class="mono">03 / BUILD</span>
                                <h3>Custom</h3>
                                <p>Built around your workflow.</p>
                                <b>TODO PRICE</b>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Best for</th>
                            <td>Landing page</td>
                            <td>Business website</td>
                            <td>Applications & systems</td>
                        </tr>
                        <tr>
                            <th scope="row">Responsive design</th>
                            <td>Included</td>
                            <td>Included</td>
                            <td>Included</td>
                        </tr>
                        <tr>
                            <th scope="row">Content management</th>
                            <td>Static content</td>
                            <td>CMS within scope</td>
                            <td>As needed</td>
                        </tr>
                        <tr>
                            <th scope="row">API integration</th>
                            <td>Optional</td>
                            <td>Within scope</td>
                            <td>As needed</td>
                        </tr>
                        <tr>
                            <th scope="row">Foundational SEO & handover</th>
                            <td>Included</td>
                            <td>Included</td>
                            <td>Included</td>
                        </tr>
                        <tr>
                            <th scope="row">Maintenance</th>
                            <td>Separate agreement</td>
                            <td>Separate agreement</td>
                            <td>Separate agreement</td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <span class="sr-only">Discuss package</span>
                            </th>
                            <td>
                                <a
                                    href="#contact"
                                    aria-label="Discuss Essential"
                                    >Discuss Essential ↗</a
                                >
                            </td>
                            <td>
                                <a href="#contact" aria-label="Discuss Business"
                                    >Discuss Business ↗</a
                                >
                            </td>
                            <td>
                                <a href="#contact" aria-label="Discuss Custom"
                                    >Discuss Custom ↗</a
                                >
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p class="pricing-note mono">
                PRICE NOT PUBLISHEDKAN · DOMAIN, HOSTING, DAN LAYANAN PIHAK
                KETIGA DIBAHAS TERPISAH.
            </p>
        </section>
        <section class="testimonial-section wrap section">
            <div class="section-label">
                <span class="tiny-square" /> TRUST, EARNED
                <span class="label-index">/ 07</span>
            </div>
            <div class="testimonial-copy">
                <span class="quote-mark" aria-hidden="true">“</span>
                <h2>Trust needs no<br /><em>manufacturing.</em></h2>
                <p>
                    This space is reserved for real stories from people who have
                    worked with us. No verified testimonials are published
                    yet—so there are no quotes here.
                </p>
                <span class="placeholder-tag mono"
                    >PLACEHOLDER / TODO APPROVED TESTIMONIALS</span
                >
            </div>
        </section>
        <section id="faq" class="faq-section wrap section">
            <div>
                <div class="section-label">
                    <span class="tiny-square" /> GOOD QUESTIONS
                    <span class="label-index">/ 08</span>
                </div>
                <h2>Maybe this is<br />what <em>you’re wondering.</em></h2>
                <p>
                    Still have questions?<br /><a
                        href="https://wa.me/62863716131687"
                        target="_blank"
                        rel="noopener noreferrer"
                        >Ask us directly ↗</a
                    >
                </p>
            </div>
            <div class="faq-list">
                <details v-for="(faq, i) in faqs" :key="faq[0]">
                    <summary>
                        <span class="mono">0{{ i + 1 }}</span
                        >{{ faq[0]
                        }}<span class="service-plus" aria-hidden="true">+</span>
                    </summary>
                    <p>{{ faq[1] }}</p>
                </details>
            </div>
        </section>
        <section id="contact" class="contact-section">
            <div class="wrap contact-grid">
                <div class="contact-copy">
                    <div class="section-label">
                        <span class="tiny-square" /> EVERY GOOD THING STARTS
                        WITH A CONVERSATION
                    </div>
                    <h2>
                        Have an idea?<br /><em>Let’s talk it through.</em
                        ><span>↗</span>
                    </h2>
                    <p>
                        A polished brief or rough thought—both welcome.<br />Let’s
                        find sensible first step.
                    </p>
                    <div class="contact-links">
                        <a
                            href="https://wa.me/62863716131687"
                            target="_blank"
                            rel="noopener noreferrer"
                            ><span class="mono">WHATSAPP</span
                            ><strong>+62 863 7161 31687 ↗</strong></a
                        ><a href="mailto:gagatech@mail.com"
                            ><span class="mono">EMAIL</span
                            ><strong>gagatech@mail.com ↗</strong></a
                        >
                    </div>
                    <span class="mono contact-location"
                        >BASED IN BALIKPAPAN. OPEN TO WORKING ANYWHERE.</span
                    >
                </div>
                <ContactForm />
            </div>
        </section>
    </main>
</template>
