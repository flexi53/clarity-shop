import { NextResponse } from "next/server";

// Simple email format check — good enough for a signup form.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RESEND_ENDPOINT = "https://api.resend.com/emails";

function confirmationHtml() {
  return `<!doctype html>
<html lang="de">
  <body style="margin:0;padding:0;background:#04050d;font-family:Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#04050d;padding:32px 12px;">
      <tr><td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#0d0f1c;border:1px solid rgba(255,255,255,0.08);border-radius:20px;overflow:hidden;">
          <tr><td style="height:4px;background:linear-gradient(90deg,#7b5cff,#c855ff,#7b5cff);"></td></tr>
          <tr><td style="padding:36px 36px 8px;">
            <div style="font-size:22px;font-weight:800;letter-spacing:3px;color:#f0f2ff;">CLARITY</div>
          </td></tr>
          <tr><td style="padding:8px 36px 0;">
            <h1 style="margin:0 0 12px;font-size:26px;line-height:1.2;color:#f0f2ff;font-weight:800;">Willkommen bei Clarity ⚡</h1>
            <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#8a90b8;">
              Danke, dass du dich für unseren Newsletter angemeldet hast. Ab jetzt erfährst du als Erste:r von neuen Sorten,
              exklusiven Drops und Aktionen &mdash; direkt in dein Postfach.
            </p>
            <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#8a90b8;">
              Diese E-Mail bestätigt deine Anmeldung. Wenn du dich nicht angemeldet hast, kannst du sie einfach ignorieren.
            </p>
          </td></tr>
          <tr><td style="padding:0 36px 36px;">
            <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:20px;font-size:12px;color:#4a5070;line-height:1.6;">
              Du erhältst diese Nachricht, weil deine Adresse im Anmeldeformular auf unserer Website eingetragen wurde.
              Du kannst dich jederzeit über den Abmeldelink am Ende jedes Newsletters wieder austragen.
            </div>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

export async function POST(request: Request) {
  let email = "";
  try {
    const body = await request.json();
    email = (body?.email ?? "").toString().trim();
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültige Anfrage." }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Bitte gib eine gültige E-Mail-Adresse ein." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  // NEWSLETTER_FROM wird erst gesetzt, wenn eine EIGENE, in Resend verifizierte Domain existiert.
  // Fehlt sie, ist Resend im Testmodus und kann nur an die eigene Konto-Adresse liefern.
  const customFrom = process.env.NEWSLETTER_FROM;
  const from = customFrom || "Clarity <onboarding@resend.dev>";
  const notify = process.env.NEWSLETTER_NOTIFY;

  // Kein Key hinterlegt: Anmeldung annehmen, aber signalisieren, dass keine Mail rausging.
  if (!apiKey) {
    console.warn("[newsletter] RESEND_API_KEY fehlt — es wurde keine Mail versendet.");
    return NextResponse.json({ ok: true, emailSent: false });
  }

  const send = (payload: Record<string, unknown>) =>
    fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

  // Betreiber:in über jede Anmeldung informieren. Funktioniert auch OHNE eigene Domain,
  // solange NEWSLETTER_NOTIFY die eigene Resend-Konto-Adresse ist. So werden die
  // Abonnenten gesammelt. Fehler hier dürfen die Anmeldung nicht scheitern lassen.
  if (notify) {
    try {
      const r = await send({
        from,
        to: [notify],
        subject: "Neue Newsletter-Anmeldung",
        html: `<p>Neue Newsletter-Anmeldung: <strong>${email}</strong></p>`,
      });
      if (!r.ok) console.error("[newsletter] Betreiber-Benachrichtigung fehlgeschlagen:", r.status, await r.text().catch(() => ""));
    } catch (e) {
      console.error("[newsletter] Betreiber-Benachrichtigung fehlgeschlagen:", e);
    }
  }

  // Ohne verifizierte Domain kann Resend keine Bestätigung an fremde Adressen senden.
  // Anmeldung still akzeptieren (kein Fehler für echte Besucher:innen).
  if (!customFrom) {
    return NextResponse.json({ ok: true, emailSent: false });
  }

  // Domain-Modus: Bestätigungsmail direkt an den/die Abonnent:in senden.
  try {
    const res = await send({
      from,
      to: [email],
      subject: "Willkommen bei Clarity ⚡",
      html: confirmationHtml(),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[newsletter] Resend-Fehler:", res.status, detail);
      return NextResponse.json(
        { ok: false, error: "E-Mail konnte nicht gesendet werden. Bitte später erneut versuchen." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, emailSent: true });
  } catch (err) {
    console.error("[newsletter] Unerwarteter Fehler:", err);
    return NextResponse.json(
      { ok: false, error: "Serverfehler. Bitte später erneut versuchen." },
      { status: 500 },
    );
  }
}
