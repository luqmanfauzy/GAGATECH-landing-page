import { defineEventHandler, createError, getHeader } from "h3";
import { useRuntimeConfig } from "#imports";
import { validateContact } from "../../utils/contact";
export default defineEventHandler(async (event) => {
  let bytes = 0;
  const chunks: Buffer[] = [];
  for await (const chunk of event.node.req.iterator({
    destroyOnReturn: false,
  })) {
    bytes += chunk.length;
    if (bytes > 16_384)
      throw createError({
        statusCode: 413,
        statusMessage: "Form is too large.",
      });
    chunks.push(Buffer.from(chunk));
  }
  const origin = getHeader(event, "origin");
  const config = useRuntimeConfig(event);
  if (origin && origin !== new URL(config.public.siteUrl).origin)
    throw createError({
      statusCode: 403,
      statusMessage: "Origin is not allowed.",
    });
  if (!getHeader(event, "content-type")?.startsWith("application/json"))
    throw createError({ statusCode: 415, statusMessage: "Use JSON." });
  let body: unknown;
  try {
    body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw createError({ statusCode: 400, statusMessage: "Invalid JSON." });
  }
  const { data, errors } = validateContact(body);
  if (!data)
    throw createError({
      statusCode: 422,
      statusMessage: "Check form and try again.",
      data: errors,
    });
  const webhook = config.contactWebhook;
  if (!webhook)
    throw createError({
      statusCode: 503,
      statusMessage:
        "Form is not available yet. Contact us via WhatsApp or email.",
    });
  try {
    const url = new URL(webhook);
    if (url.protocol !== "https:") throw new Error("Invalid webhook");
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        service: data.service,
        message: data.message,
        consent: data.consent,
      }),
      signal: AbortSignal.timeout(10_000),
      redirect: "error",
    });
    if (!response.ok) throw new Error("Delivery failed");
  } catch {
    throw createError({
      statusCode: 502,
      statusMessage: "Delivery could not be confirmed. Try WhatsApp or email.",
    });
  }
  return { ok: true };
});
