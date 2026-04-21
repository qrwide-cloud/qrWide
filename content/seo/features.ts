import type { SeoPageDefinition } from '@/lib/seo/types'

export const featurePages: SeoPageDefinition[] = [
  {
    slug: 'qr-code-tracking',
    kind: 'feature',
    title: 'QR Code Tracking and Analytics Software | QRWide',
    description:
      'Track QR code scans by date, location, device, and campaign. Use QRWide to measure how printed QR codes perform in the real world.',
    h1: 'QR Code Tracking and Analytics',
    eyebrow: 'Measure offline engagement',
    heroBody:
      'Track QR code scans and see how your offline campaigns perform over time. Use analytics to improve menus, flyers, packaging, and print placements.',
    primaryKeyword: 'qr code tracking',
    secondaryKeywords: ['qr code analytics', 'track qr code scans', 'trackable qr code generator'],
    semanticKeywords: ['scan data', 'location tracking', 'device breakdown', 'campaign analytics', 'dynamic QR code'],
    intent: 'commercial',
    priority: 'P1',
    heroCtaLabel: 'Generate QR Code Free',
    heroCtaHref: '/create',
    secondaryCtaLabel: 'Create dynamic QR',
    secondaryCtaHref: '/qr-code-generator/dynamic',
    trustSignals: [
      'Track scan volume over time',
      'See device and location patterns',
      'Use dynamic QR codes to measure offline campaigns',
    ],
    faq: [
      { question: 'How does QR code tracking work?', answer: 'Tracking usually works through a dynamic QR code redirect, which lets the system record scan activity before sending the user to the final destination.' },
      { question: 'What can I learn from QR code analytics?', answer: 'Analytics can show total scans, trends over time, broad location patterns, device mix, and how different assets perform.' },
      { question: 'Do I need dynamic QR codes for tracking?', answer: 'Yes. Static QR codes typically do not provide built-in scan analytics.' },
    ],
    internalLinks: [
      { href: '/guides/how-to-track-qr-code-scans', label: 'How to track QR code scans', description: 'Learn the mechanics and best practices' },
      { href: '/qr-code-generator/dynamic', label: 'Dynamic QR code generator', description: 'Tracking starts with dynamic QR codes' },
      { href: '/tools/bulk-qr-code-generator', label: 'Bulk QR code generator', description: 'Track high-volume campaigns too' },
    ],
    comparisonTitle: 'Tracked QR workflows vs basic QR generation',
    comparisonRows: [
      { label: 'Measure scans over time', qrwide: 'Yes', alternative: 'No on basic static tools' },
      { label: 'Learn which placements work', qrwide: 'Yes', alternative: 'No on basic static tools' },
      { label: 'Update destination later', qrwide: 'Yes', alternative: 'No on basic static tools' },
    ],
    sections: [
      {
        heading: 'Why QR tracking matters',
        body: [
          'If a QR code is part of a campaign, menu system, sales asset, or flyer distribution strategy, tracking helps you measure what is actually working instead of guessing.',
        ],
      },
      {
        heading: 'What teams do with scan data',
        body: [
          'Restaurants compare table placements, real estate teams compare flyer performance, and marketers compare signage, packaging, and campaign creative.',
        ],
      },
    ],
  },
]
