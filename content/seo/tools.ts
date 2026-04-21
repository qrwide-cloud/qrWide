import type { SeoPageDefinition } from '@/lib/seo/types'

export const toolPages: SeoPageDefinition[] = [
  {
    slug: 'bulk-qr-code-generator',
    kind: 'tool',
    title: 'Bulk QR Code Generator with CSV Upload | QRWide',
    description:
      'Create QR codes in bulk using CSV upload. Generate batches for menus, listings, product packaging, handouts, and campaigns.',
    h1: 'Bulk QR Code Generator',
    eyebrow: 'Generate at scale',
    heroBody:
      'Upload a CSV, generate many QR codes in one run, and download a ZIP of ready-to-use assets for print or distribution.',
    primaryKeyword: 'bulk qr code generator',
    secondaryKeywords: ['batch qr code generator', 'csv qr code generator', 'bulk qr code creator'],
    semanticKeywords: ['CSV upload', 'ZIP download', 'high-volume QR creation', 'bulk campaign setup'],
    intent: 'transactional',
    priority: 'P1',
    heroCtaLabel: 'Try Bulk QR Generation',
    heroCtaHref: '/bulk',
    secondaryCtaLabel: 'See pricing',
    secondaryCtaHref: '/pricing',
    trustSignals: [
      'Upload CSV and generate many QR codes at once',
      'Ideal for events, packaging, listings, and restaurant groups',
      'Built for teams that need speed and consistency',
    ],
    faq: [
      {
        question: 'Can I create QR codes in bulk?',
        answer:
          'Yes. QRWide lets you upload a CSV and generate many QR codes in a single workflow, which is faster than creating each code by hand.',
      },
      {
        question: 'What is bulk QR generation good for?',
        answer:
          'Bulk QR generation is useful for product packaging, event materials, real estate listings, menu groups, coupons, and inventory labels.',
      },
      {
        question: 'Can I download all QR codes together?',
        answer:
          'Yes. Bulk workflows typically end with a ZIP or grouped asset export so you can hand everything off for print or distribution.',
      },
    ],
    internalLinks: [
      { href: '/industries/events', label: 'QR codes for events', description: 'Bulk creation for badges and handouts' },
      { href: '/industries/real-estate', label: 'QR codes for real estate', description: 'Generate listing QR codes at scale' },
      { href: '/features/qr-code-tracking', label: 'QR tracking', description: 'Track scans across campaigns and batches' },
    ],
    sections: [
      {
        heading: 'Who needs bulk QR code generation',
        body: ['Bulk QR creation is best for teams that need dozens or hundreds of unique codes without manual repetition.'],
        bullets: ['Restaurant groups', 'Event teams', 'Real estate brokerages', 'Retail and packaging teams', 'Agencies managing campaigns'],
      },
      {
        heading: 'How bulk QR workflows save time',
        body: [
          'Instead of creating codes one by one, you define the batch in a spreadsheet, upload it, and generate a whole campaign in one pass.',
        ],
      },
    ],
  },
  {
    slug: 'qr-code-generator-with-logo',
    kind: 'tool',
    title: 'QR Code Generator with Logo | QRWide',
    description:
      'Create branded QR codes with logo placement, custom colors, and clean design controls while keeping scans reliable.',
    h1: 'QR Code Generator with Logo',
    eyebrow: 'Brand-safe QR design',
    heroBody:
      'Create branded QR codes with a logo, custom colors, and a cleaner visual style for packaging, print, and campaigns.',
    primaryKeyword: 'qr code generator with logo',
    secondaryKeywords: ['custom qr code generator', 'branded qr code', 'qr code with logo free'],
    semanticKeywords: ['logo qr code', 'brand colors', 'design controls', 'print-ready design'],
    intent: 'transactional',
    priority: 'P2',
    heroCtaLabel: 'Generate QR Code Free',
    heroCtaHref: '/create',
    secondaryCtaLabel: 'Read design guide',
    secondaryCtaHref: '/guides/qr-code-design-best-practices',
    trustSignals: [
      'Add visual branding without losing scan reliability',
      'Use colors and style controls to fit your campaign',
      'Download print-ready QR code files',
    ],
    faq: [
      {
        question: 'Can I add a logo to a QR code?',
        answer:
          'Yes. Many branded QR code tools let you add a logo or center graphic as long as the design still leaves enough contrast and scan reliability.',
      },
      {
        question: 'Will a logo make a QR code harder to scan?',
        answer:
          'It can if the code is over-designed. The safest approach is to keep strong contrast, enough quiet space, and test the final code on multiple phones before printing.',
      },
      {
        question: 'What should I avoid with custom QR design?',
        answer:
          'Avoid low contrast, tiny print sizes, oversized center logos, and decorative changes that make the code hard to recognize.',
      },
    ],
    internalLinks: [
      { href: '/guides/dynamic-vs-static-qr-codes', label: 'Dynamic vs static QR codes', description: 'Understand when design and tracking needs differ' },
      { href: '/create', label: 'Create a branded QR code', description: 'Jump into the generator and customize the design' },
      { href: '/best/qr-code-generator-with-analytics', label: 'Best QR generators with analytics', description: 'Compare design and tracking options' },
    ],
    sections: [
      {
        heading: 'Where logo QR codes perform best',
        body: ['Logo QR codes work best where brand recognition matters and the scan distance is reasonable.'],
        bullets: ['Packaging', 'Business cards', 'Retail signage', 'Menus', 'Marketing flyers'],
      },
    ],
  },
]
