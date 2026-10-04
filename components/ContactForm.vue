<script setup lang="ts">
import { reactive, ref, nextTick } from "vue";
import { validateContact, services } from "~/utils/contact";
import { Button, Input, Textarea } from "~/components/ui";
const form = reactive({
    name: "",
    email: "",
    service: "",
    message: "",
    website: "",
    consent: false,
});
const errors = ref<Record<string, string>>({});
const pending = ref(false);
const success = ref(false);
const status = ref("");
const formEl = ref<HTMLFormElement>();
async function submit() {
    if (pending.value) return;
    status.value = "";
    const result = validateContact(form);
    errors.value = result.errors;
    if (!result.data) {
        status.value = result.errors.form || "";
        await nextTick();
        formEl.value
            ?.querySelector<HTMLElement>('[aria-invalid="true"]')
            ?.focus();
        return;
    }
    pending.value = true;
    try {
        await $fetch("/api/contact", { method: "POST", body: result.data });
        success.value = true;
    } catch (error: unknown) {
        const code = (error as { statusCode?: number }).statusCode;
        status.value =
            code === 503
                ? "Form is not available yet. Share your needs via WhatsApp or email."
                : code === 422
                  ? "Some details are invalid. Check entries and try again."
                  : "Delivery could not be confirmed. Your entries remain on this page; try WhatsApp or email.";
    } finally {
        pending.value = false;
    }
}
</script>
<template>
    <div class="contact-form-wrap">
        <div v-if="success" class="form-success" role="status">
            <span>↗</span>
            <h3>Your message is received.</h3>
            <p>
                Thank you for contacting GAGA TECH. We will review your needs
                and reply to email address you provided.
            </p>
            <Button
                @click="
                    success = false;
                    form.message = '';
                "
                >Send another message ↗</Button
            >
        </div>
        <form v-else ref="formEl" novalidate @submit.prevent="submit">
            <div class="form-row">
                <div class="field">
                    <label for="name">Your name <span>*</span></label
                    ><Input
                        id="name"
                        v-model="form.name"
                        name="name"
                        autocomplete="name"
                        placeholder="First name is fine"
                        required
                        minlength="2"
                        maxlength="100"
                        :aria-invalid="!!errors.name"
                        :aria-describedby="
                            errors.name ? 'name-error' : undefined
                        "
                    /><small
                        v-if="errors.name"
                        id="name-error"
                        class="field-error"
                        >{{ errors.name }}</small
                    >
                </div>
                <div class="field">
                    <label for="email">Email <span>*</span></label
                    ><Input
                        id="email"
                        v-model="form.email"
                        name="email"
                        type="email"
                        autocomplete="email"
                        placeholder="name@business.com"
                        required
                        maxlength="254"
                        :aria-invalid="!!errors.email"
                        :aria-describedby="
                            errors.email ? 'email-error' : undefined
                        "
                    /><small
                        v-if="errors.email"
                        id="email-error"
                        class="field-error"
                        >{{ errors.email }}</small
                    >
                </div>
            </div>
            <div class="field">
                <label for="service"
                    >What would you like to build? <span>*</span></label
                ><select
                    id="service"
                    v-model="form.service"
                    name="service"
                    required
                    :aria-invalid="!!errors.service"
                    :aria-describedby="
                        errors.service ? 'service-error' : undefined
                    "
                >
                    <option value="" disabled>Choose your need</option>
                    <option v-for="service in services" :key="service">
                        {{ service }}
                    </option></select
                ><small
                    v-if="errors.service"
                    id="service-error"
                    class="field-error"
                    >{{ errors.service }}</small
                >
            </div>
            <div class="field">
                <label for="message"
                    >A little about your idea <span>*</span></label
                ><Textarea
                    id="message"
                    v-model="form.message"
                    name="message"
                    rows="3"
                    placeholder="Your business, problem you want to solve, or idea still taking shape…"
                    required
                    minlength="20"
                    maxlength="3000"
                    :aria-invalid="!!errors.message"
                    :aria-describedby="
                        errors.message ? 'message-error' : undefined
                    "
                /><small
                    v-if="errors.message"
                    id="message-error"
                    class="field-error"
                    >{{ errors.message }}</small
                >
            </div>
            <div class="honey" aria-hidden="true">
                <label for="website">Website</label
                ><input
                    id="website"
                    v-model="form.website"
                    name="website"
                    tabindex="-1"
                    autocomplete="off"
                />
            </div>
            <label class="consent"
                ><input
                    v-model="form.consent"
                    type="checkbox"
                    required
                    :aria-invalid="!!errors.consent"
                    :aria-describedby="
                        errors.consent ? 'consent-error' : undefined
                    "
                /><span
                    >I agree that this information may be used to respond to my
                    project enquiry. Not for newsletters.</span
                ></label
            ><small
                v-if="errors.consent"
                id="consent-error"
                class="field-error"
                >{{ errors.consent }}</small
            >
            <p v-if="status" class="form-status" role="alert">{{ status }}</p>
            <Button
                class="submit-button"
                size="lg"
                :disabled="pending"
                :aria-busy="pending"
                type="submit"
                >{{ pending ? "Sending message…" : "Send your message" }}
                <span>↗</span></Button
            >
            <p class="form-note">No commitment. Start with conversation.</p>
        </form>
    </div>
</template>
