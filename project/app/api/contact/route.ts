import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function POST(req: Request) {
  try {
    const { name, email, message, website } = await req.json();

    // Honeypot
    if (website) return NextResponse.json({ ok: true });

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "INVALID_INPUT" }, { status: 400 });
    }

    const from = process.env.MAIL_FROM || "Tier-Check <onboarding@resend.dev>";
    const to = process.env.MAIL_TO || "tier-check@outlook.de";

    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Neue Nachricht von ${name}`,
      html: `
        <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial">
          <h2>Kontaktanfrage</h2>
          <p><b>Name:</b> ${escapeHtml(name)}</p>
          <p><b>E-Mail:</b> ${escapeHtml(email)}</p>
          <pre style="white-space:pre-wrap;font:inherit">${escapeHtml(message)}</pre>
        </div>
      `,
    });

    if (error) {
      console.error("RESEND_ERROR", error);
      return NextResponse.json({ ok: false, error: "RESEND_ERROR" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (e) {
    console.error("CONTACT_API_ERROR", e);
    return NextResponse.json({ ok: false, error: "SERVER_ERROR" }, { status: 500 });
  }
}
