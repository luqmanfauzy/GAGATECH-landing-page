<script setup lang="ts">
withDefaults(defineProps<{ kind?: string; title?: string }>(), {
    kind: "clinical",
    title: "Workspace",
});
</script>
<template>
    <div
        class="project-visual grayscale"
        :class="`visual-${kind}`"
        aria-hidden="true"
    >
        <div class="visual-grid" />
        <div v-if="kind === 'hospital'" class="hospital-art">
            <div class="art-nav">
                <b>+ ruangsehat</b
                ><span>Services &nbsp; Doctors &nbsp; About</span
                ><i>Book appointment ↗</i>
            </div>
            <div class="hospital-copy">
                <small>CARE THAT CONNECTS.</small>
                <h3>Closer care.<br />More compassion.</h3>
                <p>Your health is our priority.</p>
                <b class="art-button">Find doctor ↗</b>
            </div>
            <div class="medical-cross">+</div>
            <div class="hospital-stat">
                <span>01 / CARE WITHOUT BARRIERS</span
                ><b>Room to<br />feel better.</b>
            </div>
        </div>
        <div v-else-if="kind === 'fnb'" class="food-art">
            <div class="art-nav">
                <b>SUAP<span class="food-dot">.</span></b
                ><span>Good food. Good mood.</span><i>Bag (02)</i>
            </div>
            <div class="food-copy">
                <small>FRESH FROM THE KITCHEN</small>
                <h3>Good things<br />come in bowls.</h3>
                <b class="art-button">Order your bowl ↗</b>
            </div>
            <div class="food-plate">
                <div class="food-leaf leaf-one" />
                <div class="food-leaf leaf-two" />
                <div class="food-rice" />
                <div class="food-protein" />
                <div class="food-tomato" />
            </div>
            <div class="food-bottom">
                MADE FRESH &nbsp; ✳ &nbsp; MADE FOR YOU &nbsp; ✳ &nbsp; MADE
                FRESH
            </div>
        </div>
        <div v-else-if="kind === 'catalog'" class="catalog-art">
            <div class="art-nav">
                <b>temu.</b><span>Objects with a story.</span><i>Catalog ↗</i>
            </div>
            <h3>Everyday objects.<br />Extraordinary craft.</h3>
            <div class="vases">
                <div class="vase vase-one" />
                <div class="vase vase-two" />
                <div class="vase vase-three" />
            </div>
            <div class="catalog-bottom">
                <span>THE SLOW LIVING COLLECTION</span><span>01 — 03</span>
            </div>
        </div>
        <div
            v-else
            class="dashboard-art"
            :class="{
                'chat-art': kind === 'chat',
                'trade-art': kind === 'trading',
            }"
        >
            <aside>
                <b>{{
                    kind === "clinical"
                        ? "klinik."
                        : kind === "chat"
                          ? "ping."
                          : "sinyal."
                }}</b
                ><span class="side-active">▦ &nbsp; Overview</span
                ><span
                    >◷ &nbsp;
                    {{
                        kind === "clinical" ? "Appointments" : "Activity"
                    }}</span
                ><span
                    >▤ &nbsp;
                    {{ kind === "chat" ? "Channels" : "Reports" }}</span
                ><span>⚙ &nbsp; Settings</span>
                <div class="side-bottom">● &nbsp; Your workspace</div>
            </aside>
            <div class="dashboard-content">
                <div class="dashboard-nav">
                    <span>Workspace / Overview</span><b>✳</b>
                </div>
                <h3>
                    {{
                        kind === "clinical"
                            ? "A little care, a big difference."
                            : kind === "chat"
                              ? "Great work starts with a hello."
                              : "A clearer view of the market."
                    }}
                </h3>
                <p>
                    {{
                        kind === "clinical"
                            ? "Good morning. Let’s make today better."
                            : "Everything you need, in one place."
                    }}
                </p>
                <template v-if="kind === 'chat'"
                    ><div class="chat-channel">
                        # design-team <span>● 4 online</span>
                    </div>
                    <div class="bubble">
                        Have you seen latest design update?<small>09:41</small>
                    </div>
                    <div class="bubble sent">
                        Yes! Ready for us to review together.<small
                            >09:42 ✓✓</small
                        >
                    </div>
                    <div class="bubble">Perfect. Let’s start at 10.</div>
                    <div class="chat-input">
                        Message #design-team <b>↗</b>
                    </div></template
                ><template v-else
                    ><div class="metric-grid">
                        <div>
                            <span>{{
                                kind === "clinical"
                                    ? "Total patients"
                                    : "Portfolio value"
                            }}</span
                            ><strong>{{
                                kind === "clinical" ? "128" : "$24,860"
                            }}</strong
                            ><small>↗ 12.8% this month</small>
                        </div>
                        <div>
                            <span>{{
                                kind === "clinical"
                                    ? "Appointments"
                                    : "Daily change"
                            }}</span
                            ><strong>{{
                                kind === "clinical" ? "24" : "+4.28%"
                            }}</strong
                            ><small>Updated just now</small>
                        </div>
                        <div>
                            <span>{{
                                kind === "clinical"
                                    ? "Available doctors"
                                    : "Watchlist"
                            }}</span
                            ><strong>{{
                                kind === "clinical" ? "08" : "12"
                            }}</strong
                            ><small>All systems ready</small>
                        </div>
                    </div>
                    <div class="chart-panel">
                        <div>
                            <b>{{
                                kind === "clinical"
                                    ? "Patient overview"
                                    : "Market overview"
                            }}</b
                            ><span>This week ⌄</span>
                        </div>
                        <svg viewBox="0 0 500 115">
                            <defs>
                                <linearGradient
                                    :id="`fade-${kind}`"
                                    x1="0"
                                    x2="0"
                                    y1="0"
                                    y2="1"
                                >
                                    <stop
                                        stop-color="#408A71"
                                        stop-opacity=".35"
                                    />
                                    <stop
                                        offset="1"
                                        stop-color="#408A71"
                                        stop-opacity="0"
                                    />
                                </linearGradient>
                            </defs>
                            <path
                                d="M0 95 35 83 65 89 100 58 140 65 175 35 210 51 250 22 285 34 320 15 355 42 390 25 430 31 465 8 500 18V115H0Z"
                                :fill="`url(#fade-${kind})`"
                            />
                            <path
                                d="M0 95 35 83 65 89 100 58 140 65 175 35 210 51 250 22 285 34 320 15 355 42 390 25 430 31 465 8 500 18"
                                fill="none"
                                stroke="#408A71"
                                stroke-width="3"
                            />
                        </svg>
                        <div class="chart-days">
                            <span>Mon</span><span>Tue</span><span>Wed</span
                            ><span>Thu</span><span>Fri</span>
                        </div>
                    </div>
                    <div class="dashboard-row">
                        <span>Recent activity</span><span>View all ↗</span>
                    </div></template
                >
            </div>
        </div>
        <span class="mockup-label">{{ title }} / CONCEPT PREVIEW</span>
    </div>
</template>

<style scoped>
.grayscale {
    filter: grayscale(1);
}
</style>
