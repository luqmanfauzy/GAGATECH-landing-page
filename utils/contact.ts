export type ContactInput = { name: string; email: string; service: string; message: string; website: string; consent: boolean }
export const services = ['New website', 'Website redesign', 'Bug fixing & optimization', 'Maintenance', 'Web app', 'API integration']
export function validateContact(value: unknown): { data?: ContactInput; errors: Record<string, string> } {
  const errors: Record<string, string> = {}
  if (!value || typeof value !== 'object' || Array.isArray(value)) return { errors: { form: 'Invalid data format.' } }
  const input = value as Record<string, unknown>
  const text = (key: string) => typeof input[key] === 'string' ? (input[key] as string).trim() : ''
  const data: ContactInput = { name: text('name'), email: text('email'), service: text('service'), message: text('message'), website: text('website'), consent: input.consent === true }
  if (data.name.length < 2 || data.name.length > 100) errors.name = 'Name must be 2–100 characters.'
  if (data.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Enter valid email address.'
  if (!services.includes(data.service)) errors.service = 'Choose service you need.'
  if (data.message.length < 20 || data.message.length > 3000) errors.message = 'Describe your needs in 20–3,000 characters.'
  if (!data.consent) errors.consent = 'Consent is required so we can contact you.'
  if (data.website || (input.website !== undefined && typeof input.website !== 'string')) errors.form = 'Request cannot be processed.'
  return { data: Object.keys(errors).length ? undefined : data, errors }
}
