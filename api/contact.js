// api/contact.js — Vercel Serverless Function
// Wysyła powiadomienie tylko do właściciela strony

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Missing API key' });
  }

  const body    = req.body || {};
  const name    = body.name    || 'Nieznany';
  const email   = body.email   || 'Brak';
  const phone   = body.phone   || 'Brak';
  const service = body.service || 'Brak';
  const message = body.message || 'Brak';

  try {
    const res2 = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from:    'CtrlZ Studio <noreply@ctrlzstudio.pl>',
        to:      ['kontakt@ctrlzstudio.pl'],
        subject: `📬 Nowe zapytanie od ${name}`,
        html: `
          <div style="font-family:sans-serif;max-width:520px;padding:24px;background:#f9f9f9;border-radius:12px;">
            <h2 style="margin:0 0 20px;color:#111;">Nowe zapytanie ze strony</h2>
            <table cellpadding="0" cellspacing="0" width="100%">
              <tr><td style="padding:8px 0;color:#555;width:120px;">Imię:</td><td style="padding:8px 0;font-weight:600;color:#111;">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#555;">Email:</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#7c6bff;">${email}</a></td></tr>
              <tr><td style="padding:8px 0;color:#555;">Telefon:</td><td style="padding:8px 0;color:#111;">${phone}</td></tr>
              <tr><td style="padding:8px 0;color:#555;">Usługa:</td><td style="padding:8px 0;color:#111;">${service}</td></tr>
            </table>
            ${message !== 'Brak' ? `
            <div style="margin-top:16px;padding:14px 16px;background:#fff;border-left:3px solid #7c6bff;border-radius:0 8px 8px 0;">
              <p style="margin:0;font-size:13px;color:#555;line-height:1.6;">${message.replace(/\n/g, '<br>')}</p>
            </div>` : ''}
            <p style="margin:20px 0 0;font-size:12px;color:#999;">Wysłano z ctrlzstudio.pl</p>
          </div>
        `,
      }),
    });

    if (!res2.ok) {
      const err = await res2.text();
      console.error('Resend error:', err);
      return res.status(500).json({ error: 'Send failed' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}

}

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Missing API key' });
  }

  // Parse form data
  const body = req.body || {};
  const name    = body.name    || 'Nieznany';
  const email   = body.email   || '';
  const service = body.service || '';
  const message = body.message || '';
  const phone   = body.phone   || '';

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  try {
    // Email to client
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

    // Notification to you
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from:    'CtrlZ Studio <noreply@ctrlzstudio.pl>',
        to:      ['kontakt@ctrlzstudio.pl'],
        subject: `Nowe zapytanie od ${name}`,
        html: `<div style="font-family:sans-serif;max-width:480px;padding:24px;">
          <h2>Nowe zapytanie ze strony</h2>
          <p><strong>Imię:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Telefon:</strong> ${phone || 'Nie podano'}</p>
          <p><strong>Usługa:</strong> ${service || 'Nie podano'}</p>
          <p><strong>Wiadomość:</strong><br>${message ? message.replace(/\n/g, '<br>') : 'Nie podano'}</p>
        </div>`,
      }),
    });

    if (!clientRes.ok) {
      const err = await clientRes.text();
      console.error('Resend error:', err);
      return res.status(500).json({ error: 'Send failed' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
