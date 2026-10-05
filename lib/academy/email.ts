import nodemailer from "nodemailer";

function academyBaseUrl() {
  return (process.env.ACADEMY_APP_URL || process.env.PRODUCTION_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
}

function smtpTransport() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  if (!host || !user || !pass) return null;
  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass }
  });
}

function sender() {
  return process.env.EMAIL_FROM || process.env.PASSWORD_RECOVERY_FROM || "BaBra AI Academy <no-reply@babra.store>";
}

async function sendAcademyEmail(input: { to: string; subject: string; text: string; html: string }) {
  if (process.env.RESEND_API_KEY) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: AbortSignal.timeout(15_000),
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: sender(),
        to: [input.to],
        subject: input.subject,
        text: input.text,
        html: input.html
      })
    });
    if (!response.ok) throw new Error("Academy email delivery failed");
    return;
  }

  const transport = smtpTransport();
  if (!transport) throw new Error("Academy email is not configured");
  await transport.sendMail({ from: sender(), ...input });
}

export async function sendAcademyVerification(email: string, token: string) {
  const url = `${academyBaseUrl()}/api/academy/v1/auth/verify-email?token=${encodeURIComponent(token)}`;
  await sendAcademyEmail({
    to: email,
    subject: "Verify your BaBra AI Academy account",
    text: `Verify your Academy account using this link: ${url}`,
    html: `<p>Welcome to BaBra AI Academy.</p><p><a href="${url}">Verify your account</a></p><p>This link expires in 24 hours.</p>`
  });
}

export async function sendAcademyPasswordReset(email: string, token: string) {
  const url = `${academyBaseUrl()}/academy/reset-password?token=${encodeURIComponent(token)}`;
  await sendAcademyEmail({
    to: email,
    subject: "Reset your BaBra AI Academy password",
    text: `Reset your Academy password using this link: ${url}`,
    html: `<p><a href="${url}">Reset your Academy password</a></p><p>This link expires in one hour. Ignore this email if you did not request it.</p>`
  });
}
