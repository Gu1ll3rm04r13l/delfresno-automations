import { Resend } from "resend";

export type LeadEmail = {
  name: string;
  email: string;
  company?: string;
  message: string;
};

export async function sendLeadNotification(lead: LeadEmail): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM ?? "onboarding@resend.dev";
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey) throw new Error("RESEND_API_KEY no está configurada");
  if (!to) throw new Error("CONTACT_TO_EMAIL no está configurada");

  const resend = new Resend(apiKey);

  const subject = `Nuevo lead — ${lead.name}${
    lead.company ? ` (${lead.company})` : ""
  }`;

  const text = [
    `Nombre:   ${lead.name}`,
    `Email:    ${lead.email}`,
    lead.company ? `Empresa:  ${lead.company}` : null,
    "",
    "Mensaje:",
    lead.message,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <div style="font-family: -apple-system, sans-serif; max-width: 560px;">
      <h2 style="margin: 0 0 16px;">Nuevo lead desde la web</h2>
      <table style="border-collapse: collapse; width: 100%; font-size: 14px;">
        <tr><td style="padding: 4px 8px; color:#666;">Nombre</td><td style="padding: 4px 8px;"><strong>${escapeHtml(
          lead.name
        )}</strong></td></tr>
        <tr><td style="padding: 4px 8px; color:#666;">Email</td><td style="padding: 4px 8px;"><a href="mailto:${escapeHtml(
          lead.email
        )}">${escapeHtml(lead.email)}</a></td></tr>
        ${
          lead.company
            ? `<tr><td style="padding: 4px 8px; color:#666;">Empresa</td><td style="padding: 4px 8px;">${escapeHtml(
                lead.company
              )}</td></tr>`
            : ""
        }
      </table>
      <h3 style="margin: 20px 0 8px; font-size: 14px;">Mensaje</h3>
      <p style="white-space: pre-wrap; line-height: 1.5; font-size: 14px;">${escapeHtml(
        lead.message
      )}</p>
    </div>
  `;

  const result = await resend.emails.send({
    from,
    to,
    replyTo: lead.email,
    subject,
    text,
    html,
  });

  if (result.error) {
    throw new Error(`Resend error: ${result.error.message ?? "unknown"}`);
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
