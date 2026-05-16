import type { APIRoute } from 'astro';

// ── Prerender = false → runs on Vercel serverless ──
export const prerender = false;

// ── Email HTML template ────────────────────────────
function emailTemplate(name: string, service: string, message: string): string {
  const serviceLabel: Record<string, string> = {
    landing:  'Landing Page',
    firmowa:  'Strona firmowa',
    sklep:    'Sklep internetowy',
    custom:   'Custom / Aplikacja',
    sem:      'Obsługa reklam (SEM)',
    seo:      'SEO',
    inne:     'Inne',
  };
  const displayService = serviceLabel[service] || service || 'Nie podano';
  const displayMessage = message
    ? message.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>')
    : 'Nie podano';

  return `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dziękujemy za zapytanie — CtrlZ Studio</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f8;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08);">

          <!-- HEADER -->
          <tr>
            <td style="background:#04040f;padding:24px 32px;display:block;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-size:20px;font-weight:600;color:#ffffff;letter-spacing:-0.02em;">
                      Ctrl<span style="color:#a78bfa;">Z</span> Studio
                    </span>
                  </td>
                  <td align="right">
                    <span style="font-size:11px;color:rgba(255,255,255,0.35);letter-spacing:0.1em;text-transform:uppercase;">Potwierdzenie</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CHECK + GREETING -->
          <tr>
            <td style="padding:32px 32px 0;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align:middle;padding-right:14px;">
                    <div style="width:40px;height:40px;border-radius:50%;background:#ede9fe;display:flex;align-items:center;justify-content:center;text-align:center;line-height:40px;font-size:20px;">✓</div>
                  </td>
                  <td style="vertical-align:middle;">
                    <p style="margin:0;font-size:16px;font-weight:600;color:#111;">Wiadomość dotarła!</p>
                    <p style="margin:2px 0 0;font-size:13px;color:#6b7280;">Dziękujemy za kontakt z CtrlZ Studio</p>
                  </td>
                </tr>
              </table>
              <p style="margin:20px 0 0;font-size:15px;color:#111;">Cześć <strong>${name}</strong>,</p>
              <p style="margin:10px 0 0;font-size:14px;color:#374151;line-height:1.7;">
                Otrzymaliśmy Twoje zapytanie i bardzo się cieszymy, że jesteś zainteresowany/-a współpracą.
                Odezwiemy się <strong style="color:#111;">w ciągu 24 godzin</strong> z odpowiedzią.
              </p>
            </td>
          </tr>

          <!-- SUMMARY BOX -->
          <tr>
            <td style="padding:20px 32px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border-radius:10px;overflow:hidden;">
                <tr>
                  <td style="padding:14px 18px 6px;">
                    <p style="margin:0;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;">Twoje zapytanie dotyczy</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:4px 18px;">
                    <p style="margin:0;font-size:14px;color:#374151;">
                      <span style="display:inline-block;width:16px;color:#a78bfa;">◈</span>
                      <strong>Usługa:</strong> ${displayService}
                    </p>
                  </td>
                </tr>
                ${message ? `<tr>
                  <td style="padding:8px 18px 14px;">
                    <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.6;border-top:1px solid #e5e7eb;padding-top:10px;margin-top:4px;">
                      ${displayMessage}
                    </p>
                  </td>
                </tr>` : '<tr><td style="padding:0 0 14px;"></td></tr>'}
              </table>
            </td>
          </tr>

          <!-- INFO BOX -->
          <tr>
            <td style="padding:16px 32px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-left:3px solid #7c6bff;background:#f5f3ff;border-radius:0 8px 8px 0;">
                <tr>
                  <td style="padding:14px 16px;">
                    <p style="margin:0;font-size:13px;color:#4c1d95;line-height:1.65;">
                      <strong>Kiedy się odezwiemy?</strong><br>
                      Odpowiadamy w dni robocze w godz. 9:00–17:00.
                      Jeśli masz pilną sprawę — zadzwoń: <strong>+48 000 000 000</strong>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:24px 32px 0;text-align:center;">
              <a href="https://ctrlzstudio.pl/realizacje"
                 style="display:inline-block;background:#7c6bff;color:#ffffff;font-size:14px;font-weight:500;padding:11px 28px;border-radius:100px;text-decoration:none;">
                Sprawdź nasze realizacje →
              </a>
            </td>
          </tr>

          <!-- STATS -->
          <tr>
            <td style="padding:24px 32px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #f3f4f6;padding-top:20px;">
                <tr>
                  <td align="center" width="33%">
                    <p style="margin:0;font-size:24px;font-weight:700;color:#7c6bff;">250+</p>
                    <p style="margin:4px 0 0;font-size:11px;color:#9ca3af;">projektów</p>
                  </td>
                  <td align="center" width="33%">
                    <p style="margin:0;font-size:24px;font-weight:700;color:#7c6bff;">6+</p>
                    <p style="margin:4px 0 0;font-size:11px;color:#9ca3af;">lat doświadczenia</p>
                  </td>
                  <td align="center" width="33%">
                    <p style="margin:0;font-size:24px;font-weight:700;color:#7c6bff;">90+</p>
                    <p style="margin:4px 0 0;font-size:11px;color:#9ca3af;">Lighthouse score</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:28px 32px;margin-top:8px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#04040f;border-radius:10px;">
                <tr>
                  <td style="padding:18px 20px;text-align:center;">
                    <p style="margin:0 0 4px;font-size:12px;color:rgba(255,255,255,0.4);line-height:1.6;">
                      CtrlZ Studio · kontakt@ctrlzstudio.pl · +48 000 000 000
                    </p>
                    <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.2);">
                      Ten email został wysłany automatycznie — prosimy nie odpowiadać.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ── API Route ──────────────────────────────────────
export const POST: APIRoute = async ({ request }) => {
  const data    = await request.formData();
  const name    = (data.get('name')    as string) || 'Nieznany';
  const email   = (data.get('email')   as string) || '';
  const service = (data.get('service') as string) || '';
  const message = (data.get('message') as string) || '';
  const phone   = (data.get('phone')   as string) || '';

  if (!email || !email.includes('@')) {
    return new Response(JSON.stringify({ ok: false, error: 'Brak emaila' }), { status: 400 });
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ ok: false, error: 'Brak klucza API' }), { status: 500 });
  }

  // ── Email do klienta ──────────────────────────────
  const clientRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from:    'CtrlZ Studio <noreply@ctrlzstudio.pl>',
      to:      [email],
      subject: 'Dziękujemy za zapytanie — CtrlZ Studio',
      html:    emailTemplate(name, service, message),
    }),
  });

  // ── Powiadomienie do Ciebie ───────────────────────
  const notifyRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from:    'CtrlZ Studio <noreply@ctrlzstudio.pl>',
      to:      ['kontakt@ctrlzstudio.pl'],
      subject: `Nowe zapytanie od ${name} — CtrlZ Studio`,
      html: `
        <div style="font-family:sans-serif;max-width:480px;padding:24px;">
          <h2 style="margin:0 0 16px;">Nowe zapytanie ze strony</h2>
          <p><strong>Imię:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Telefon:</strong> ${phone || 'Nie podano'}</p>
          <p><strong>Usługa:</strong> ${service || 'Nie podano'}</p>
          <p><strong>Wiadomość:</strong><br>${message ? message.replace(/\n/g, '<br>') : 'Nie podano'}</p>
        </div>
      `,
    }),
  });

  if (clientRes.ok && notifyRes.ok) {
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  const errBody = await clientRes.text().catch(() => '');
  console.error('Resend error:', errBody);
  return new Response(JSON.stringify({ ok: false, error: 'Błąd wysyłki' }), { status: 500 });
};
