"use client";

import Link from "next/link";
import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Loader2,
  Mail,
} from "lucide-react";
import { demo, site } from "@/lib/content";
import {
  buildMailto,
  demoFields,
  roleOptions,
  validateDemoRequest,
  type DemoErrors,
  type DemoField,
  type DemoValues,
} from "@/lib/demo";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "preview" | "error";
type Delivery = "email" | "preview";

const emptyValues: DemoValues = {
  name: "",
  hospital: "",
  role: "",
  email: "",
  phone: "",
  companyWebsite: "",
};

const fieldIds: Record<DemoField, string> = {
  name: "demo-name",
  hospital: "demo-hospital",
  role: "demo-role",
  email: "demo-email",
  phone: "demo-phone",
};

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <div className="min-h-5 pt-1.5">
      {message ? (
        <p id={id} className="flex items-start gap-1.5 text-[0.75rem] text-signal-red">
          <AlertCircle size={13} aria-hidden="true" className="mt-0.5 shrink-0" />
          {message}
        </p>
      ) : null}
    </div>
  );
}

export function DemoForm() {
  const [values, setValues] = useState<DemoValues>(emptyValues);
  const [errors, setErrors] = useState<DemoErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success" || status === "preview" || status === "error") {
      resultRef.current?.focus();
    }
  }, [status]);

  function updateValue(field: DemoField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    if (status === "error") {
      setStatus("idle");
      setServerError(null);
    }
  }

  function handleChange(
    field: DemoField
  ): (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void {
    return (event) => updateValue(field, event.target.value);
  }

  function handleBlur(field: DemoField) {
    const result = validateDemoRequest(values);
    setErrors((current) => {
      const next = { ...current };
      if (result.errors[field]) next[field] = result.errors[field];
      else delete next[field];
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerError(null);

    if (values.companyWebsite?.trim()) {
      setStatus("success");
      return;
    }

    const result = validateDemoRequest(values);

    if (!result.valid) {
      setErrors(result.errors);
      setStatus("idle");
      const first = demoFields.find((field) => result.errors[field]);
      if (first) {
        window.setTimeout(() => {
          document.getElementById(fieldIds[first]!)?.focus();
        }, 60);
      }
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/demo", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      const payload = (await response.json().catch(() => null)) as
        | {
            ok?: boolean;
            delivery?: Delivery;
            message?: string;
            fieldErrors?: DemoErrors;
          }
        | null;

      if (!response.ok || !payload?.ok) {
        if (payload?.fieldErrors) {
          setErrors(payload.fieldErrors);
          const first = demoFields.find((field) => payload.fieldErrors?.[field]);
          if (first) {
            window.setTimeout(() => {
              document.getElementById(fieldIds[first]!)?.focus();
            }, 60);
          }
        }
        setServerError(payload?.message ?? demo.errors.server);
        setStatus("error");
        return;
      }

      setStatus(payload.delivery === "preview" ? "preview" : "success");
    } catch {
      setServerError(demo.errors.network);
      setStatus("error");
    }
  }

  const mailto = buildMailto(values, site.email);
  const submitting = status === "submitting";

  if (status === "success") {
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="surface flex min-h-[32rem] flex-col justify-center p-7 sm:p-9 focus-visible:outline-offset-4"
      >
        <span className="grid h-12 w-12 place-items-center rounded-full border border-brand-400/30 bg-brand-400/10 text-brand-300">
          <CheckCircle2 size={22} aria-hidden="true" />
        </span>
        <h3 className="type-subsection mt-6 text-mist-50">{demo.success.title}</h3>
        <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-mist-300">
          {demo.success.body.replace("{email}", values.email.trim())}
        </p>
        <p className="mt-4 border-t border-mist-50/10 pt-4 text-[0.8125rem] text-mist-400">
          {demo.success.note.replace("{contactEmail}", site.email)}
        </p>
      </div>
    );
  }

  if (status === "preview") {
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="surface flex min-h-[32rem] flex-col justify-center p-7 sm:p-9 focus-visible:outline-offset-4"
      >
        <span className="grid h-12 w-12 place-items-center rounded-full border border-amber/30 bg-amber/10 text-amber">
          <Mail size={22} aria-hidden="true" />
        </span>
        <h3 className="type-subsection mt-6 text-mist-50">{demo.preview.title}</h3>
        <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-mist-300">
          {demo.preview.body.replace("{contactEmail}", site.email)}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href={mailto} className="btn btn-primary">
            {demo.preview.cta}
            <Mail size={16} aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="btn btn-secondary"
          >
            {demo.preview.secondary}
          </button>
        </div>
        <p className="mt-4 text-[0.75rem] text-mist-500">
          {site.email}
        </p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      aria-busy={submitting}
      className="surface p-5 sm:p-7"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-mist-50/10 pb-4">
        <h3 className="font-display text-[1.15rem] font-medium tracking-[-0.03em] text-mist-50">
          {demo.formTitle}
        </h3>
        <p className="text-[0.75rem] text-mist-500">{demo.responseNote}</p>
      </div>

      <fieldset disabled={submitting} className="m-0 mt-5 border-0 p-0">
        <legend className="sr-only">{demo.formTitle}</legend>
        <p className="mb-4 text-[0.75rem] text-mist-500">{demo.formNote}</p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor={fieldIds.name}
              className="mb-1.5 block text-[0.8125rem] font-semibold text-mist-200"
            >
              {demo.fields.name.label}
              <span className="ml-1 text-brand-400" aria-hidden="true">
                *
              </span>
            </label>
            <input
              id={fieldIds.name}
              name="name"
              type="text"
              required
              maxLength={80}
              autoComplete={demo.fields.name.autoComplete}
              placeholder={demo.fields.name.placeholder}
              value={values.name}
              onChange={handleChange("name")}
              onBlur={() => handleBlur("name")}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "demo-name-error" : undefined}
              className={cn(
                "h-12 w-full rounded-lg border bg-ink px-3.5 text-[0.9375rem] text-mist-50 placeholder:text-mist-500 transition-colors focus:border-brand-400/60 focus:outline-none",
                errors.name ? "border-signal-red/60" : "border-mist-50/15"
              )}
            />
            <FieldError id="demo-name-error" message={errors.name} />
          </div>

          <div>
            <label
              htmlFor={fieldIds.hospital}
              className="mb-1.5 block text-[0.8125rem] font-semibold text-mist-200"
            >
              {demo.fields.hospital.label}
              <span className="ml-1 text-brand-400" aria-hidden="true">
                *
              </span>
            </label>
            <input
              id={fieldIds.hospital}
              name="hospital"
              type="text"
              required
              maxLength={120}
              autoComplete={demo.fields.hospital.autoComplete}
              placeholder={demo.fields.hospital.placeholder}
              value={values.hospital}
              onChange={handleChange("hospital")}
              onBlur={() => handleBlur("hospital")}
              aria-invalid={Boolean(errors.hospital)}
              aria-describedby={errors.hospital ? "demo-hospital-error" : undefined}
              className={cn(
                "h-12 w-full rounded-lg border bg-ink px-3.5 text-[0.9375rem] text-mist-50 placeholder:text-mist-500 transition-colors focus:border-brand-400/60 focus:outline-none",
                errors.hospital ? "border-signal-red/60" : "border-mist-50/15"
              )}
            />
            <FieldError id="demo-hospital-error" message={errors.hospital} />
          </div>

          <div>
            <label
              htmlFor={fieldIds.role}
              className="mb-1.5 block text-[0.8125rem] font-semibold text-mist-200"
            >
              {demo.fields.role.label}
              <span className="ml-1 text-brand-400" aria-hidden="true">
                *
              </span>
            </label>
            <div className="relative">
              <select
                id={fieldIds.role}
                name="role"
                required
                value={values.role}
                onChange={handleChange("role")}
                onBlur={() => handleBlur("role")}
                aria-invalid={Boolean(errors.role)}
                aria-describedby={errors.role ? "demo-role-error" : undefined}
                className={cn(
                  "h-12 w-full appearance-none rounded-lg border bg-ink px-3.5 pr-10 text-[0.9375rem] transition-colors focus:border-brand-400/60 focus:outline-none",
                  values.role ? "text-mist-50" : "text-mist-500",
                  errors.role ? "border-signal-red/60" : "border-mist-50/15"
                )}
              >
                <option value="" disabled>
                  {demo.fields.role.placeholder}
                </option>
                {roleOptions.map((option) => (
                  <option key={option} value={option} className="bg-ink text-mist-50">
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                aria-hidden="true"
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-mist-400"
              />
            </div>
            <FieldError id="demo-role-error" message={errors.role} />
          </div>

          <div>
            <label
              htmlFor={fieldIds.phone}
              className="mb-1.5 block text-[0.8125rem] font-semibold text-mist-200"
            >
              {demo.fields.phone.label}
            </label>
            <input
              id={fieldIds.phone}
              name="phone"
              type="tel"
              maxLength={24}
              autoComplete={demo.fields.phone.autoComplete}
              placeholder={demo.fields.phone.placeholder}
              value={values.phone}
              onChange={handleChange("phone")}
              onBlur={() => handleBlur("phone")}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "demo-phone-error" : undefined}
              className={cn(
                "h-12 w-full rounded-lg border bg-ink px-3.5 text-[0.9375rem] text-mist-50 placeholder:text-mist-500 transition-colors focus:border-brand-400/60 focus:outline-none",
                errors.phone ? "border-signal-red/60" : "border-mist-50/15"
              )}
            />
            <FieldError id="demo-phone-error" message={errors.phone} />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor={fieldIds.email}
              className="mb-1.5 block text-[0.8125rem] font-semibold text-mist-200"
            >
              {demo.fields.email.label}
              <span className="ml-1 text-brand-400" aria-hidden="true">
                *
              </span>
            </label>
            <input
              id={fieldIds.email}
              name="email"
              type="email"
              required
              maxLength={254}
              autoComplete={demo.fields.email.autoComplete}
              placeholder={demo.fields.email.placeholder}
              value={values.email}
              onChange={handleChange("email")}
              onBlur={() => handleBlur("email")}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "demo-email-error" : undefined}
              className={cn(
                "h-12 w-full rounded-lg border bg-ink px-3.5 text-[0.9375rem] text-mist-50 placeholder:text-mist-500 transition-colors focus:border-brand-400/60 focus:outline-none",
                errors.email ? "border-signal-red/60" : "border-mist-50/15"
              )}
            />
            <FieldError id="demo-email-error" message={errors.email} />
          </div>
        </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="demo-company-website">Company website</label>
        <input
          id="demo-company-website"
          name="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.companyWebsite ?? ""}
          onChange={(event) =>
            setValues((current) => ({
              ...current,
              companyWebsite: event.target.value,
            }))
          }
        />
      </div>

        <button type="submit" formNoValidate className="btn btn-primary mt-5 w-full" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 size={16} aria-hidden="true" className="animate-spin motion-reduce:hidden" />
              {demo.submitting}
            </>
          ) : (
            <>
              {demo.submit}
              <Mail size={16} aria-hidden="true" />
            </>
          )}
        </button>

        {status === "error" && serverError ? (
          <div
            role="alert"
            className="mt-4 rounded-lg border border-signal-red/30 bg-signal-red/10 px-3.5 py-3 text-[0.8125rem] leading-relaxed text-signal-red"
          >
            {serverError}{" "}
            <a
              href={`mailto:${site.email}`}
              className="underline underline-offset-4 hover:text-mist-50"
            >
              {site.email}
            </a>
          </div>
        ) : null}

        <p className="mt-4 text-[0.75rem] leading-relaxed text-mist-500">
          {demo.privacy} {" "}
          <Link
            href="/privacy"
            className="text-mist-300 underline decoration-mist-50/25 underline-offset-4 transition-colors hover:text-brand-200"
          >
            Read our privacy notice.
          </Link>
        </p>
      </fieldset>
    </form>
  );
}
