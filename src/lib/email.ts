import nodemailer, { type Transporter } from "nodemailer";

/**
 * Outgoing mail for HomeSure.
 *
 * This lives in the Next.js app rather than in the Supabase auth server on purpose: that server
 * belongs to someone else and has no SMTP configured, so its own confirmation mail fails. Sending
 * from here means the whole flow is driven by `.env.local`, which is ours to change.
 *
 * Works with any SMTP provider — Brevo, Gmail, Mailtrap, Resend's SMTP bridge. Nothing here is
 * specific to one of them.
 */

type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
};

/** Reads the SMTP settings, or says exactly which one is missing. */
export function smtpConfig(): { ok: true; config: SmtpConfig } | { ok: false; missing: string[] } {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const from = process.env.SMTP_FROM;

  const missing = Object.entries({ SMTP_HOST: host, SMTP_PORT: port, SMTP_USER: user, SMTP_PASSWORD: pass, SMTP_FROM: from })
    .filter(([, v]) => !v)
    .map(([k]) => k);

  if (missing.length) return { ok: false, missing };

  const portNumber = Number(port);
  return {
    ok: true,
    config: {
      host: host!,
      port: portNumber,
      // 465 is implicit TLS; 587 and 2525 start plain and upgrade with STARTTLS.
      secure: portNumber === 465,
      user: user!,
      pass: pass!,
      from: from!,
    },
  };
}

export function isEmailConfigured(): boolean {
  return smtpConfig().ok;
}

let transporter: Transporter | null = null;

function getTransporter(config: SmtpConfig): Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: { user: config.user, pass: config.pass },
    });
  }
  return transporter;
}

export async function sendMail({ to, subject, html, text }: {
  to: string; subject: string; html: string; text: string;
}): Promise<void> {
  const settings = smtpConfig();
  if (!settings.ok) {
    throw new Error(`Email is not configured on this server (missing ${settings.missing.join(", ")}).`);
  }

  await getTransporter(settings.config).sendMail({
    from: settings.config.from,
    to,
    subject,
    text,
    html,
  });
}

/** The address the verification link points back at. */
export function appOrigin(request: Request): string {
  const configured = process.env.APP_ORIGIN;
  if (configured) return configured.replace(/\/+$/, "");

  // Behind a proxy the forwarded headers are the only honest source; otherwise use the Host.
  const headers = request.headers;
  const proto = headers.get("x-forwarded-proto") ?? "http";
  const host = headers.get("x-forwarded-host") ?? headers.get("host") ?? "localhost:3000";
  return `${proto}://${host}`;
}

const BRAND = "#00c9a7";

export function verificationEmail({ firstName, link }: { firstName: string; link: string }) {
  const hello = firstName ? `Hi ${escapeHtml(firstName)},` : "Hi,";

  const text = [
    firstName ? `Hi ${firstName},` : "Hi,",
    "",
    "Confirm your email address to finish setting up your HomeSure account:",
    "",
    link,
    "",
    "This link works for 24 hours. If you did not sign up for HomeSure, you can ignore this message — no account will be activated.",
    "",
    "— HomeSure, Sta. Maria, Bulacan",
  ].join("\n");

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#f1f5f9;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 2px 12px rgba(15,23,42,0.08);">
      <tr>
        <td style="padding:28px 32px 8px;">
          <div style="font-size:20px;font-weight:800;color:#0f172a;letter-spacing:-0.3px;">HomeSure</div>
          <div style="font-size:12px;color:#64748b;margin-top:2px;">Sta. Maria, Bulacan</div>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 32px 0;">
          <p style="font-size:15px;color:#0f172a;margin:0 0 12px;">${hello}</p>
          <p style="font-size:14px;color:#334155;line-height:1.65;margin:0 0 24px;">
            Confirm your email address to finish setting up your account. You will not be able to
            sign in until you do.
          </p>
          <a href="${escapeHtml(link)}"
             style="display:inline-block;background:${BRAND};color:#04221d;text-decoration:none;
                    font-weight:700;font-size:14px;padding:13px 28px;border-radius:9px;">
            Confirm my email
          </a>
          <p style="font-size:12px;color:#64748b;line-height:1.6;margin:24px 0 0;">
            Or paste this into your browser:<br>
            <span style="color:#334155;word-break:break-all;">${escapeHtml(link)}</span>
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 32px 28px;">
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:0 0 16px;">
          <p style="font-size:11.5px;color:#94a3b8;line-height:1.6;margin:0;">
            This link works for 24 hours. If you did not sign up for HomeSure you can ignore this
            message — no account will be activated.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject: "Confirm your HomeSure email", text, html };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
