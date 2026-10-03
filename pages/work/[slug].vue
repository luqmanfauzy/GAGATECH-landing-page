<script setup lang="ts">
import {
    useRoute,
    useAsyncData,
    queryContent,
    createError,
    useSeoMeta,
} from "#imports";
definePageMeta({ key: (route) => route.path });
const route = useRoute();
const slug = String(route.params.slug);
const { data: project } = await useAsyncData(`project-${slug}`, () =>
    queryContent("/projects").where({ slug }).findOne(),
);
if (!project.value)
    throw createError({
        statusCode: 404,
        statusMessage: "Example project not found",
    });
useSeoMeta({
    title: () => `${project.value?.title} — Example concept | GAGA TECH`,
    description: () => project.value?.summary,
    ogTitle: () => `${project.value?.title} — GAGA TECH`,
    ogDescription: () => project.value?.summary,
});
</script>
<template>
    <main v-if="project" id="main" class="case-page wrap">
        <NuxtLink to="/#work" class="case-back mono"
            >← BACK TO EXPLORATIONS</NuxtLink
        >
        <div class="case-header">
            <span class="eyebrow">EXAMPLE CONCEPT / {{ project.year }}</span>
            <h1>{{ project.title }}</h1>
            <p>{{ project.summary }}</p>
            <div class="case-tags">
                <span>{{ project.category }}</span
                ><span>{{ project.client }}</span
                ><span v-for="tech in project.tech" :key="tech">{{
                    tech
                }}</span>
            </div>
        </div>
        <aside class="case-disclaimer">
            <span>↗</span>
            <div>
                <strong>Independent exploration. Not client project.</strong>
                <p>
                    {{ project.notice }}. All names, figures, and interfaces are
                    illustrative. No real business results are claimed.
                </p>
            </div>
        </aside>
        <ProjectPreview :kind="project.kind" :title="project.slug" />
        <div class="case-story">
            <div class="section-label">
                <span class="tiny-square" /> BEHIND THE CONCEPT
            </div>
            <div>
                <ContentRenderer :value="project" />
                <article
                    v-for="(label, key) in {
                        problem: '01 / Challenge',
                        solution: '02 / Solution',
                        process: '03 / Process',
                        result: '04 / Outcome & limits',
                    }"
                    :key="key"
                >
                    <h2>{{ label }}</h2>
                    <p>{{ project[key] }}</p>
                </article>
            </div>
        </div>
        <section class="case-gallery">
            <div class="section-heading">
                <h2>Exploration details.</h2>
                <span class="mono">CONCEPT GALLERY / NOT LIVE APPLICATION</span>
            </div>
            <div class="case-gallery-grid">
                <figure
                    v-for="(caption, i) in project.gallery"
                    :key="caption"
                    :class="{ 'detail-crop': i === 1 }"
                >
                    <ProjectPreview
                        :kind="project.kind"
                        :title="project.slug"
                    />
                    <figcaption>
                        <span class="mono">0{{ i + 1 }}</span> {{ caption }}
                        <small>— concept preview</small>
                    </figcaption>
                </figure>
            </div>
        </section>
        <div class="case-cta">
            <h2>Have similar challenge?</h2>
            <NuxtLink to="/#contact" class="button mint"
                >Start conversation ↗</NuxtLink
            >
        </div>
    </main>
</template>
