import { demo } from "@/lib/content";

export type DemoField = "name" | "hospital" | "role" | "email" | "phone";

export type DemoValues = Record<DemoField, string> & {
  companyWebsite?: string;
};

export type DemoErrors = Partial<Record<DemoField, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\-\s.\d]{7,24}$/;

export const demoFields: DemoField[] = ["name", "hospital", "role", "email", "phone"];

export const roleOptions = demo.fields.role.options;

export function validateDemoRequest(values: DemoValues): {
  errors: DemoErrors;
  valid: boolean;
} {
  const errors: DemoErrors = {};
  const name = values.name.trim();
  const hospital = values.hospital.trim();
  const email = values.email.trim();
  const phone = values.phone.trim();
  const role = values.role.trim();

  if (name.length < 2) errors.name = demo.errors.name;
  if (name.length > 80) errors.name = demo.errors.name;

  if (hospital.length < 2) errors.hospital = demo.errors.hospital;
  if (hospital.length > 120) errors.hospital = demo.errors.hospital;

  if (!roleOptions.some((option) => option === role)) errors.role = demo.errors.role;

  if (!email) errors.email = demo.errors.emailRequired;
  else if (email.length > 254 || !EMAIL.test(email)) {
    errors.email = demo.errors.emailInvalid;
  }

  if (phone && (!PHONE.test(phone) || phone.replace(/\D/g, "").length < 7)) {
    errors.phone = demo.errors.phoneInvalid;
  }

  return { errors, valid: Object.keys(errors).length === 0 };
}

export function buildMailto(values: DemoValues, email: string): string {
  const subject = `${demo.mailSubject} — ${values.hospital.trim() || "Hospital"}`;
  const body = [
    demo.mailIntro,
    "",
    `${demo.fields.name.label}: ${values.name.trim()}`,
    `${demo.fields.hospital.label}: ${values.hospital.trim()}`,
    `${demo.fields.role.label}: ${values.role.trim()}`,
    `${demo.fields.email.label}: ${values.email.trim()}`,
    `${demo.fields.phone.label}: ${values.phone.trim()}`,
  ].join("\n");

  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
