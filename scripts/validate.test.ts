import assert from "node:assert/strict";
import { validateContact, services } from "../utils/contact.ts";

const valid = {
  name: "  My Name  ",
  email: "name@example.com",
  service: services[0],
  message: "I would like a website for my business.",
  website: "",
  consent: true,
};
assert.equal(validateContact(valid).data?.name, "My Name");
for (const value of [null, [], "invalid", 42])
  assert.ok(validateContact(value).errors.form);
for (const [key, value] of Object.entries({
  name: "x",
  email: "a@b",
  service: "unknown",
  message: "short",
  consent: "true",
  website: "https://spam.invalid",
})) {
  assert.equal(
    validateContact({ ...valid, [key]: value }).data,
    undefined,
    key,
  );
}
for (const [key, size] of [
  ["name", 101],
  ["email", 255],
  ["message", 3001],
] as const) {
  assert.ok(validateContact({ ...valid, [key]: "x".repeat(size) }).errors[key]);
}
assert.ok(validateContact({ ...valid, website: {} }).errors.form);
assert.ok(
  validateContact({ ...valid, email: "a\nb@example.com" }).errors.email,
);
assert.ok(
  validateContact({ ...valid, message: " ".repeat(25) }).errors.message,
);
assert.ok(
  validateContact({
    ...valid,
    name: "x".repeat(100),
    message: "x".repeat(3000),
  }).data,
);
for (const service of services)
  assert.ok(validateContact({ ...valid, service }).data);
console.log("Contact validation: all checks passed");
