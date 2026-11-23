import { NextResponse } from "next/server";
import { demo, site } from "@/lib/content";
import { validateDemoRequest, type DemoErrors, type DemoValues } from "@/lib/demo";

type Delivery = "email" | "preview";

type DemoResponse = {
  ok: boolean;
  delivery?: Delivery;
  message?: string;
  fieldErrors?: DemoErrors;
};

function noStore(payload: DemoResponse, status = 200) {
  return NextResponse.json(payload, {
    status,
    headers: { "cache-control": "no-store" },
  });
}

function str(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return noStore({ ok: false, message: demo.errors.server }, 400);
  }

  if (!body || typeof body !== "object") {
    return noStore({ ok: false, message: demo.errors.server }, 400);
  }

  const record = body as Record<string, unknown>;
  const values: DemoValues = {
    name: str(record.name),
    hospital: str(record.hospital),
    role: str(record.role),
    email: str(record.email),
    phone: str(record.phone),
    companyWebsite: str(record.companyWebsite),
  };

  // Honeypot: return a normal-looking success without doing work.
  if (values.companyWebsite) {
    return noStore({ ok: true, delivery: "email" });
  }

  const validation = validateDemoRequest(values);
  if (!validation.valid) {
    return noStore(
      {
        ok: false,
        message: demo.errors.checkFields,
        fieldErrors: validation.errors,
      },
      422
    );
  }

  const submission = {
    name: values.name.trim(),
    hospital: values.hospital.trim(),
    role: values.role.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
    source: "inclusyq-website",
    submittedAt: new Date().toISOString(),
  };

  const webhookUrl = process.env.DEMO_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(process.env.DEMO_WEBHOOK_TOKEN
            ? { authorization: `Bearer ${process.env.DEMO_WEBHOOK_TOKEN}` }
            : {}),
        },
        body: JSON.stringify(submission),
        signal: AbortSignal.timeout(10_000),
      });

      if (!response.ok) {
        console.error("Demo webhook returned", response.status);
        return noStore({ ok: false, message: demo.errors.server }, 502);
      }

      return noStore({ ok: true, delivery: "email" });
    } catch (error) {
      console.error("Demo webhook failed", error instanceof Error ? error.name : "unknown");
      return noStore({ ok: false, message: demo.errors.server }, 502);
    }
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    // Transparent preview behaviour: the form works, but no mail is sent.
    // Set RESEND_API_KEY or DEMO_WEBHOOK_URL in production.
    console.info("Demo request validated; no delivery service configured.");
    return noStore({ ok: true, delivery: "preview" });
  }

  const to = process.env.DEMO_TO_EMAIL ?? site.email;
  const from =
    process.env.DEMO_FROM_EMAIL ?? "InclusyQ Website <onboarding@resend.dev>";
  const subject = `Demo request · ${submission.hospital}`.replace(/[\r\n]+/g, " ");
  const text = [
    demo.mailIntro,
    "",
    `${demo.fields.name.label}: ${submission.name}`,
    `${demo.fields.hospital.label}: ${submission.hospital}`,
    `${demo.fields.role.label}: ${submission.role}`,
    `${demo.fields.email.label}: ${submission.email}`,
    `${demo.fields.phone.label}: ${submission.phone}`,
  ].join("\n");

  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#101512">
      <h1 style="font-size:20px">InclusyQ demo request</h1>
      <p>${escapeHtml(demo.mailIntro)}</p>
      <table style="border-collapse:collapse">
        <tr><td style="padding:4px 16px 4px 0"><strong>${escapeHtml(demo.fields.name.label)}</strong></td><td>${escapeHtml(submission.name)}</td></tr>
        <tr><td style="padding:4px 16px 4px 0"><strong>${escapeHtml(demo.fields.hospital.label)}</strong></td><td>${escapeHtml(submission.hospital)}</td></tr>
        <tr><td style="padding:4px 16px 4px 0"><strong>${escapeHtml(demo.fields.role.label)}</strong></td><td>${escapeHtml(submission.role)}</td></tr>
        <tr><td style="padding:4px 16px 4px 0"><strong>${escapeHtml(demo.fields.email.label)}</strong></td><td>${escapeHtml(submission.email)}</td></tr>
        <tr><td style="padding:4px 16px 4px 0"><strong>${escapeHtml(demo.fields.phone.label)}</strong></td><td>${escapeHtml(submission.phone)}</td></tr>
      </table>
    </div>
  `.trim();

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${resendKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: submission.email,
        subject,
        text,
        html,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error("Resend returned", response.status);
      return noStore({ ok: false, message: demo.errors.server }, 502);
    }

    return noStore({ ok: true, delivery: "email" });
  } catch (error) {
    console.error("Resend failed", error instanceof Error ? error.name : "unknown");
    return noStore({ ok: false, message: demo.errors.server }, 502);
  }
}
