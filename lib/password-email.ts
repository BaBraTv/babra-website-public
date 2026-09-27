export function recoveryEmailConfigured() {
  return process.env.PASSWORD_RECOVERY_EMAIL_ENABLED === "true" && Boolean(process.env.RESEND_API_KEY && process.env.PASSWORD_RECOVERY_FROM && process.env.PRODUCTION_APP_URL);
}
export async function sendRecoveryEmail(email: string, token: string) {
  if (!recoveryEmailConfigured()) throw new Error("Email unavailable");
  const origin = new URL(process.env.PRODUCTION_APP_URL!);
  if (origin.protocol !== "https:" || origin.username || origin.password) throw new Error("Email unavailable");
  // Fragments never reach HTTP access logs or referrers. Disable provider click tracking.
  const link = `${origin.origin}/reset-password#token=${token}`;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST", signal: AbortSignal.timeout(15000),
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: process.env.PASSWORD_RECOVERY_FROM, to: [email],
      subject: "BaBra — reset your password / Hindura password",
      text: `Open this private link to choose a new BaBra password:\n${link}\n\nThis link expires in 30 minutes and works once. If you did not request it, ignore this email. Never share this link.\n\nWasabye guhindura password ya konti ya BaBra. Kanda link iri hejuru ushyireho password nshya. Irangira mu minota 30 kandi ikoreshwa rimwe gusa. Niba atari wowe wabikoze, wirengagize iyi email. Ntugasangize abandi iyi link.`
    })
  });
  if (!response.ok) throw new Error("Email delivery failed");
}
