import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY!)

export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'hello@qrwide.com'

export async function sendScanMilestoneEmail(params: {
  to: string
  name: string
  qrName: string
  scans: number
  qrId: string
}) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://qrwide.com'

  await resend.emails.send({
    from: FROM_EMAIL,
    to: params.to,
    subject: `Your QR code "${params.qrName}" just hit ${params.scans} scans!`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 24px;">
        <h1 style="font-size: 24px; font-weight: 700; color: #0A0A0A;">
          ${params.scans} scans! 🎉
        </h1>
        <p style="color: #6B7280; font-size: 16px; line-height: 1.6;">
          Hey ${params.name}, your QR code <strong>"${params.qrName}"</strong> just reached
          <strong>${params.scans} scans</strong>. People are engaging with your content!
        </p>
        <a href="${appUrl}/analytics/${params.qrId}"
           style="display: inline-block; background: #0066FF; color: white;
                  padding: 12px 24px; border-radius: 8px; text-decoration: none;
                  font-weight: 600; margin-top: 16px;">
          View Analytics
        </a>
        <p style="color: #9CA3AF; font-size: 13px; margin-top: 32px;">
          QRWide · <a href="${appUrl}/settings" style="color: #9CA3AF;">Manage notifications</a>
        </p>
      </div>
    `,
  })
}
