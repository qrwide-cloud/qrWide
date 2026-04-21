import type { SeoPageDefinition } from '@/lib/seo/types'

export const guidePages: SeoPageDefinition[] = [
  {
    slug: 'dynamic-vs-static-qr-codes',
    kind: 'guide',
    title: 'Dynamic vs Static QR Codes: What Is the Difference? | QRWide',
    description:
      'Learn the difference between dynamic and static QR codes, when to use each one, and how to avoid reprinting mistakes.',
    h1: 'Dynamic vs Static QR Codes',
    eyebrow: 'QR basics',
    heroBody:
      'Static QR codes are simple and permanent. Dynamic QR codes are editable and trackable. Here is how to choose the right one before you print.',
    primaryKeyword: 'dynamic vs static qr code',
    secondaryKeywords: ['difference between static and dynamic qr code', 'what is dynamic qr code', 'what is static qr code'],
    semanticKeywords: ['editable qr code', 'tracking', 'reprinting', 'print campaigns', 'scan analytics'],
    intent: 'informational',
    priority: 'P1',
    heroCtaLabel: 'Generate QR Code Free',
    heroCtaHref: '/create',
    secondaryCtaLabel: 'Try dynamic QR codes',
    secondaryCtaHref: '/qr-code-generator/dynamic',
    trustSignals: [
      'Clear explanation of when each QR type works best',
      'Covers editing, tracking, and print decisions',
      'Helps avoid costly reprinting mistakes',
    ],
    comparisonTitle: 'Static vs dynamic at a glance',
    comparisonRows: [
      { label: 'Edit after printing', qrwide: 'Dynamic only', alternative: 'Static cannot' },
      { label: 'Track scans', qrwide: 'Dynamic only', alternative: 'Static cannot' },
      { label: 'Best for fixed content', qrwide: 'Static', alternative: 'Dynamic also works' },
    ],
    faq: [
      { question: 'Which is better: static or dynamic QR codes?', answer: 'Neither is always better. Static is best for fixed content. Dynamic is best when you want editability or tracking.' },
      { question: 'Do static QR codes expire?', answer: 'No. Static QR codes do not expire as long as the destination stays available.' },
      { question: 'Why do businesses prefer dynamic QR codes?', answer: 'Because they can update the destination later and measure scan activity.' },
    ],
    internalLinks: [
      { href: '/qr-code-generator/static', label: 'Static QR code generator', description: 'Create a simple fixed QR code' },
      { href: '/qr-code-generator/dynamic', label: 'Dynamic QR code generator', description: 'Create editable and trackable QR codes' },
      { href: '/features/qr-code-tracking', label: 'QR code tracking', description: 'See what scan analytics can show you' },
    ],
    sections: [
      {
        heading: 'What is a static QR code?',
        body: [
          'A static QR code directly stores the content inside the code itself. It is a good fit for information that will never need to change.',
        ],
      },
      {
        heading: 'What is a dynamic QR code?',
        body: [
          'A dynamic QR code points to a redirect that can be updated later. That makes it ideal for campaigns, print assets, and analytics-heavy use cases.',
        ],
      },
      {
        heading: 'How to choose the right type',
        body: [
          'If the content is fixed and you do not need analytics, static is fine. If you may need changes later, or you want tracking, dynamic is the safer long-term choice.',
        ],
      },
    ],
  },
  {
    slug: 'how-to-make-a-menu-qr-code',
    kind: 'guide',
    title: 'How to Make a Menu QR Code for Restaurants | QRWide',
    description:
      'Learn how to create a menu QR code for a restaurant, cafe, bar, or food truck using a PDF or webpage.',
    h1: 'How to Make a Menu QR Code',
    eyebrow: 'Restaurant setup guide',
    heroBody:
      'Create a menu QR code in a few steps, choose the right destination, and place it where guests are most likely to scan.',
    primaryKeyword: 'how to make a menu qr code',
    secondaryKeywords: ['restaurant menu qr code', 'how to create qr code for menu', 'pdf menu qr code'],
    semanticKeywords: ['PDF menu', 'web menu', 'restaurant signage', 'table tent', 'hospitality'],
    intent: 'informational',
    priority: 'P1',
    heroCtaLabel: 'Create Menu QR Code',
    heroCtaHref: '/qr-code-generator/menu',
    secondaryCtaLabel: 'See restaurant pages',
    secondaryCtaHref: '/industries/restaurants',
    trustSignals: [
      'Step-by-step menu QR setup',
      'Helps you choose between PDF and webpage menus',
      'Includes placement and print guidance',
    ],
    faq: [
      { question: 'Should my menu QR code link to a PDF or a webpage?', answer: 'PDFs are quick to launch. Webpages are often better for mobile UX and frequent updates.' },
      { question: 'Can I update a menu QR code after printing?', answer: 'Yes, if you use a dynamic QR code.' },
      { question: 'Where should I place a menu QR code?', answer: 'Table tents, counters, windows, takeout inserts, and receipts are common placements.' },
    ],
    internalLinks: [
      { href: '/qr-code-generator/menu', label: 'Menu QR code generator', description: 'Create the code itself' },
      { href: '/qr-code-generator/pdf', label: 'PDF QR code generator', description: 'Use it for PDF menus and handouts' },
      { href: '/industries/restaurants', label: 'QR codes for restaurants', description: 'See restaurant-specific QR use cases' },
    ],
    sections: [
      {
        heading: 'Step 1: Choose the destination',
        body: ['Decide whether the menu QR code should open a PDF or a webpage. Use a webpage if mobile readability and frequent updates matter.'],
      },
      {
        heading: 'Step 2: Generate and test the QR code',
        body: ['Create the code, scan it on multiple phones, and confirm the menu opens quickly over mobile data as well as WiFi.'],
      },
      {
        heading: 'Step 3: Print with a clear call to action',
        body: ['Use wording like "Scan to view menu" and place the code where guests naturally look first.'],
      },
    ],
  },
  {
    slug: 'how-to-track-qr-code-scans',
    kind: 'guide',
    title: 'How to Track QR Code Scans and Measure Performance | QRWide',
    description:
      'Learn how QR code tracking works, what metrics to measure, and how dynamic QR codes help you analyze campaign performance.',
    h1: 'How to Track QR Code Scans',
    eyebrow: 'Analytics guide',
    heroBody:
      'Track QR code scans with dynamic QR codes and use the data to improve menus, flyers, packaging, and offline campaigns.',
    primaryKeyword: 'how to track qr code scans',
    secondaryKeywords: ['qr code analytics', 'can qr codes be tracked', 'trackable qr code'],
    semanticKeywords: ['scan count', 'location', 'device', 'campaign measurement', 'analytics dashboard'],
    intent: 'informational',
    priority: 'P1',
    heroCtaLabel: 'See QR Tracking',
    heroCtaHref: '/features/qr-code-tracking',
    secondaryCtaLabel: 'Create dynamic QR code',
    secondaryCtaHref: '/qr-code-generator/dynamic',
    trustSignals: [
      'Explains what data dynamic QR codes can capture',
      'Shows why static QR codes are not enough for measurement',
      'Connects analytics to real-world campaign decisions',
    ],
    faq: [
      { question: 'Can static QR codes be tracked?', answer: 'Not on their own. Tracking usually requires a dynamic QR code that routes through a measurable redirect.' },
      { question: 'What metrics can I see with QR tracking?', answer: 'Typical metrics include total scans, time, location, device type, and historical scan trends.' },
      { question: 'Why should I track QR code scans?', answer: 'Tracking helps you learn which placements, campaigns, or assets are actually driving engagement.' },
    ],
    internalLinks: [
      { href: '/features/qr-code-tracking', label: 'QR code tracking features', description: 'See the analytics product page' },
      { href: '/qr-code-generator/dynamic', label: 'Dynamic QR code generator', description: 'Tracking starts with dynamic QR codes' },
      { href: '/guides/dynamic-vs-static-qr-codes', label: 'Dynamic vs static QR codes', description: 'Understand why editability matters' },
    ],
    sections: [
      {
        heading: 'Why QR tracking requires dynamic codes',
        body: ['Tracking works when the QR code points to a measurable redirect instead of storing the final content directly.'],
      },
      {
        heading: 'The most useful QR metrics',
        body: ['Not every metric matters equally. Focus on total scans, scan trends over time, device patterns, and placement-level performance.'],
      },
      {
        heading: 'How to use scan data',
        body: ['Use tracking data to improve placement, messaging, print design, destination pages, and campaign follow-up.'],
      },
    ],
  },
  {
    slug: 'how-to-make-a-wifi-qr-code',
    kind: 'guide',
    title: 'How to Make a WiFi QR Code for Guests and Customers | QRWide',
    description:
      'Learn how to create a WiFi QR code for guest access, office signs, restaurants, hotels, and event spaces.',
    h1: 'How to Make a WiFi QR Code',
    eyebrow: 'Quick setup guide',
    heroBody:
      'Create a WiFi QR code so guests can join your network in one scan instead of typing the password.',
    primaryKeyword: 'how to make a wifi qr code',
    secondaryKeywords: ['wifi password qr code', 'how to create wifi qr code', 'guest wifi qr code'],
    semanticKeywords: ['SSID', 'network password', 'guest network', 'cafe wifi', 'hotel wifi'],
    intent: 'informational',
    priority: 'P1',
    heroCtaLabel: 'Create WiFi QR Code',
    heroCtaHref: '/qr-code-generator/wifi',
    secondaryCtaLabel: 'See WiFi QR page',
    secondaryCtaHref: '/qr-code-generator/wifi',
    trustSignals: [
      'Ideal for offices, restaurants, salons, hotels, and events',
      'Simple print-and-place workflow',
      'Reduces friction for guests and customers',
    ],
    faq: [
      { question: 'What do I need to create a WiFi QR code?', answer: 'You need the network name, password, and security type for the guest network you want to share.' },
      { question: 'Should I use a guest network QR code?', answer: 'Yes. Most businesses should share a guest network rather than their private internal network.' },
      { question: 'Where should I place a WiFi QR code?', answer: 'Good placements include counters, welcome signs, hotel rooms, table tents, and event registration desks.' },
    ],
    internalLinks: [
      { href: '/qr-code-generator/wifi', label: 'WiFi QR code generator', description: 'Create the code now' },
      { href: '/industries/restaurants', label: 'QR codes for restaurants', description: 'Use WiFi QR codes alongside menus and reviews' },
      { href: '/industries/events', label: 'QR codes for events', description: 'Use WiFi QR codes for guest access at live events' },
    ],
    sections: [
      {
        heading: 'What you need before you start',
        body: ['Most WiFi QR setup takes just a moment if you already know the SSID, password, and security type of the network you want guests to use.'],
      },
      {
        heading: 'How to print and place your WiFi QR code',
        body: ['Add a simple CTA like "Scan to join WiFi", use enough contrast, and place the sign where guests naturally pause.'],
      },
    ],
  },
]
