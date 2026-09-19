import nodemailer from 'nodemailer'

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX = 5
const rateLimitStore = new Map()
const DEFAULT_SENDER_EMAIL = 'mdocteur.faye@univ-thies.sn'
const DEFAULT_RECIPIENT_EMAIL = 'mamadoudocteurf@gmail.com'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function getClientIp(request) {
  const forwardedFor = request.headers.get('x-forwarded-for')
  return forwardedFor?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'
}

function isRateLimited(ip) {
  const now = Date.now()
  const record = rateLimitStore.get(ip)

  if (!record || now > record.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  record.count += 1
  return record.count > RATE_LIMIT_MAX
}

function cleanText(value, maxLength = 500) {
  return String(value || '').trim().slice(0, maxLength)
}

function cleanSubjectText(value, maxLength = 120) {
  return cleanText(value, maxLength).replace(/[\r\n]+/g, ' ')
}

function isValidEmail(value) {
  return EMAIL_RE.test(cleanText(value, 160))
}

function escapeHtml(value, maxLength) {
  return cleanText(value, maxLength)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(request) {
  try {
    const ip = getClientIp(request)

    if (isRateLimited(ip)) {
      return Response.json({ error: 'Trop de demandes. Réessayez dans quelques minutes.' }, { status: 429 })
    }

    const body = await request.json().catch(() => null)

    if (!body || typeof body !== 'object') {
      return Response.json({ error: 'Requête invalide' }, { status: 400 })
    }

    const { name, phone, email, service, message, website } = body

    if (website) {
      return Response.json({ success: true })
    }

    const gmailUser = (process.env.GMAIL_USER || DEFAULT_SENDER_EMAIL).trim()
    const recipientEmail = (process.env.EMAIL_TO || DEFAULT_RECIPIENT_EMAIL).trim()
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, '')
    const smtpHost = process.env.SMTP_HOST?.trim()
    const smtpPort = Number(process.env.SMTP_PORT || 587)
    const smtpSecure = process.env.SMTP_SECURE === 'true'
    const smtpUser = (process.env.SMTP_USER || gmailUser).trim()
    const smtpPass = (process.env.SMTP_PASS || gmailAppPassword || '').replace(/\s/g, '')

    if (!smtpPass) {
      console.error('Email config missing: GMAIL_APP_PASSWORD or SMTP_PASS')
      return Response.json({ error: 'Configuration email indisponible. Vérifiez le mot de passe d’application.' }, { status: 500 })
    }

    // We allow service: 'gmail' for any email address since it might be a Google Workspace account


    const smtpConfig = smtpHost
      ? {
          host: smtpHost,
          port: smtpPort,
          secure: smtpSecure,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
          tls: {
            rejectUnauthorized: false
          }
        }
      : {
          service: 'gmail',
          auth: {
            user: gmailUser,
            pass: smtpPass,
          },
          tls: {
            rejectUnauthorized: false
          }
        }

    const safeName = escapeHtml(name, 120)
    const safePhone = escapeHtml(phone, 80)
    const safeEmail = escapeHtml(email, 160)
    const safeService = escapeHtml(service || 'Contact général', 160)
    const safeMessage = escapeHtml(message, 2000)
    const clientEmail = isValidEmail(email) ? cleanText(email, 160) : ''
    const serviceLabel = cleanSubjectText(service || 'Contact général', 120)
    const clientName = cleanSubjectText(name, 120)
    const replyTo = clientEmail || gmailUser
    const currentYear = new Date().getFullYear()

    if (!safeName || !safePhone) {
      return Response.json({ error: 'Nom et téléphone requis' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport(smtpConfig)

    await transporter.sendMail({
      from: `"SENEDIAG Site" <${gmailUser}>`,
      to: recipientEmail,
      replyTo,
      subject: `SENEDIAG - Nouvelle demande - ${serviceLabel} - ${clientName}`,
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:auto;border:1px solid #DBEAFE;border-radius:12px;overflow:hidden">
          <div style="background:#167B93;padding:20px;text-align:center">
            <h2 style="color:white;margin:0;font-size:20px">+ SENEDIAG</h2>
            <p style="color:rgba(255,255,255,.8);margin:4px 0 0;font-size:13px">Nouvelle demande reçue</p>
          </div>
          <div style="padding:24px">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#6B7280;font-size:13px;width:120px">Nom</td><td style="font-weight:600">${safeName}</td></tr>
              <tr><td style="padding:8px 0;color:#6B7280;font-size:13px">Téléphone</td><td style="font-weight:600">${safePhone}</td></tr>
              <tr><td style="padding:8px 0;color:#6B7280;font-size:13px">Courriel</td><td>${safeEmail || '-'}</td></tr>
              <tr><td style="padding:8px 0;color:#6B7280;font-size:13px">Service</td><td><span style="background:#DFF3F7;color:#167B93;padding:3px 10px;border-radius:6px;font-size:12px;font-weight:600">${safeService}</span></td></tr>
              <tr><td style="padding:8px 0;color:#6B7280;font-size:13px;vertical-align:top">Message</td><td style="font-size:13px;color:#374151;white-space:pre-wrap">${safeMessage || '-'}</td></tr>
            </table>
          </div>
          <div style="background:#EAF7FA;padding:14px 24px;text-align:center">
            <p style="font-size:11px;color:#9CA3AF;margin:0">${currentYear} SENEDIAG - Sénégal Diagnostique</p>
          </div>
        </div>
      `,
    })

    if (clientEmail) {
      await transporter.sendMail({
        from: `"SENEDIAG" <${gmailUser}>`,
        to: clientEmail,
        replyTo: recipientEmail,
        subject: `SENEDIAG - Votre demande de ${serviceLabel} a bien été reçue`,
        text: `Bonjour ${clientName},

Nous confirmons la réception de votre demande de ${serviceLabel}.

Notre équipe vous contactera rapidement pour confirmer les informations et organiser la suite de votre prise en charge.

Résumé de votre demande :
- Nom : ${clientName}
- Téléphone : ${cleanSubjectText(phone, 80)}
- Service : ${serviceLabel}
- Message : ${cleanText(message || '-', 2000)}

Merci de votre confiance.

L'équipe SENEDIAG`,
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:auto;border:1px solid #DBEAFE;border-radius:12px;overflow:hidden;background:#ffffff">
            <div style="background:#167B93;padding:22px;text-align:center">
              <h2 style="color:white;margin:0;font-size:20px">SENEDIAG</h2>
              <p style="color:rgba(255,255,255,.86);margin:6px 0 0;font-size:13px">Accusé de réception</p>
            </div>
            <div style="padding:26px">
              <p style="font-size:15px;color:#082F44;margin:0 0 14px">Bonjour <strong>${safeName}</strong>,</p>
              <p style="font-size:14px;line-height:1.6;color:#374151;margin:0 0 16px">
                Votre demande de <strong>${safeService}</strong> a bien été reçue.
              </p>
              <p style="font-size:14px;line-height:1.6;color:#374151;margin:0 0 20px">
                Notre équipe vous contactera rapidement pour confirmer les informations et organiser la suite de votre prise en charge.
              </p>
              <div style="background:#DFF3F7;border-radius:10px;padding:16px;margin:0 0 20px">
                <p style="font-size:12px;font-weight:700;color:#167B93;text-transform:uppercase;margin:0 0 10px">Résumé de votre demande</p>
                <table style="width:100%;border-collapse:collapse">
                  <tr><td style="padding:6px 0;color:#6B7280;font-size:13px;width:110px">Téléphone</td><td style="font-size:13px;color:#082F44;font-weight:600">${safePhone}</td></tr>
                  <tr><td style="padding:6px 0;color:#6B7280;font-size:13px">Service</td><td style="font-size:13px;color:#082F44;font-weight:600">${safeService}</td></tr>
                  <tr><td style="padding:6px 0;color:#6B7280;font-size:13px;vertical-align:top">Message</td><td style="font-size:13px;color:#374151;white-space:pre-wrap">${safeMessage || '-'}</td></tr>
                </table>
              </div>
              <p style="font-size:13px;color:#6B7280;margin:0">Merci de votre confiance.</p>
              <p style="font-size:13px;color:#082F44;font-weight:700;margin:4px 0 0">L'équipe SENEDIAG</p>
            </div>
            <div style="background:#EAF7FA;padding:14px 24px;text-align:center">
              <p style="font-size:11px;color:#9CA3AF;margin:0">${currentYear} SENEDIAG - Sénégal Diagnostique</p>
            </div>
          </div>
        `,
      })
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    const message =
      error?.response?.body ||
      error?.message ||
      'Erreur envoi email'

    return Response.json({ error: message }, { status: 500 })
  }
}
