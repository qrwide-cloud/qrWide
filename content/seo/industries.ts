import type { SeoPageDefinition } from '@/lib/seo/types'

export const industryPages: SeoPageDefinition[] = [
  {
    slug: 'restaurants',
    kind: 'industry',
    title: 'QR Code Generator for Restaurants and Menus | QRWide',
    description:
      'Create QR codes for restaurant menus, reviews, WiFi, promotions, and table signage. Built for restaurants, cafes, bars, and food trucks.',
    h1: 'QR Codes for Restaurants',
    eyebrow: 'Hospitality growth',
    heroBody:
      'Use QR codes for menus, reviews, WiFi, specials, and table signage. Create once, print once, and keep your restaurant links easy to update.',
    primaryKeyword: 'qr code generator for restaurants',
    secondaryKeywords: ['restaurant qr code generator', 'restaurant menu qr code', 'qr code for restaurant menu'],
    semanticKeywords: ['menu QR code', 'contactless menu', 'restaurant reviews', 'table tents', 'cafe QR code'],
    intent: 'commercial',
    priority: 'P1',
    heroCtaLabel: 'Generate QR Code Free',
    heroCtaHref: '/create',
    secondaryCtaLabel: 'Create menu QR code',
    secondaryCtaHref: '/qr-code-generator/menu',
    trustSignals: [
      'Use QR codes for menus, reviews, WiFi, and promotions',
      'Dynamic QR codes help you update menu destinations later',
      'Great for table tents, takeout inserts, counters, and windows',
    ],
    faq: [
      {
        question: 'What can restaurants use QR codes for?',
        answer:
          'Restaurants commonly use QR codes for menus, Google reviews, WiFi access, ordering links, specials, loyalty offers, and event nights.',
      },
      {
        question: 'Should a restaurant menu QR code be dynamic?',
        answer:
          'Yes, in most cases. A dynamic code lets you update the menu destination later without reprinting every table card or sign.',
      },
      {
        question: 'Where should restaurants place QR codes?',
        answer:
          'The best placements include table tents, windows, counters, takeout bags, printed receipts, and in-store posters.',
      },
    ],
    internalLinks: [
      { href: '/qr-code-generator/menu', label: 'Menu QR code generator', description: 'Create QR codes for PDF or web menus' },
      { href: '/features/qr-code-tracking', label: 'QR code tracking', description: 'Measure menu and review campaign scans' },
      { href: '/guides/how-to-make-a-menu-qr-code', label: 'How to make a menu QR code', description: 'Setup steps and placement tips' },
    ],
    sections: [
      {
        heading: 'Top restaurant QR code use cases',
        body: ['Restaurants get the most value when they use more than one QR code destination across the guest journey.'],
        bullets: ['Menu access', 'Review requests', 'Guest WiFi', 'Promo pages', 'Event signups'],
      },
      {
        heading: 'Why dynamic QR codes work well for hospitality',
        body: [
          'Restaurants change prices, specials, and destinations often. Dynamic QR codes help you keep the printed asset and update the destination later.',
        ],
      },
    ],
  },
  {
    slug: 'real-estate',
    kind: 'industry',
    title: 'QR Code Generator for Real Estate Listings and Flyers | QRWide',
    description:
      'Create QR codes for real estate flyers, yard signs, brochures, open houses, and listing pages. Track which placements get attention.',
    h1: 'QR Codes for Real Estate',
    eyebrow: 'Listings and lead generation',
    heroBody:
      'Turn every flyer, sign, brochure, and open house asset into a measurable lead source with trackable real estate QR codes.',
    primaryKeyword: 'qr code generator for real estate',
    secondaryKeywords: ['qr code for realtor flyer', 'real estate qr code generator', 'property listing qr code'],
    semanticKeywords: ['open house', 'listing flyer', 'yard sign', 'property brochure', 'realtor marketing'],
    intent: 'commercial',
    priority: 'P1',
    heroCtaLabel: 'Generate QR Code Free',
    heroCtaHref: '/create',
    secondaryCtaLabel: 'Read flyer guide',
    secondaryCtaHref: '/guides/qr-code-for-real-estate-flyers',
    trustSignals: [
      'Track which listings and placements get scans',
      'Use QR codes on signs, flyers, brochures, and postcards',
      'Update landing pages without reprinting dynamic codes',
    ],
    faq: [
      {
        question: 'What should a real estate QR code link to?',
        answer:
          'Good destinations include a property listing page, photo gallery, virtual tour, open house details, lead form, or agent contact page.',
      },
      {
        question: 'Where do real estate QR codes work best?',
        answer:
          'Real estate QR codes work especially well on yard signs, listing flyers, brochures, direct mail, window cards, and open house signage.',
      },
      {
        question: 'Can I track scans on real estate QR codes?',
        answer:
          'Yes. Dynamic QR codes can help you measure interest by asset, campaign, or placement.',
      },
    ],
    internalLinks: [
      { href: '/qr-code-generator/dynamic', label: 'Dynamic QR code generator', description: 'Use editable QR codes for changing listings' },
      { href: '/tools/bulk-qr-code-generator', label: 'Bulk QR code generator', description: 'Create QR codes for many listings at once' },
      { href: '/features/qr-code-tracking', label: 'QR code tracking', description: 'Measure scan activity by placement' },
    ],
    sections: [
      {
        heading: 'Real estate assets that benefit from QR codes',
        body: ['Any printed asset with limited space can become far more useful with a QR code.'],
        bullets: ['Yard signs', 'Flyers', 'Brochures', 'Open house signage', 'Postcards'],
      },
    ],
  },
  {
    slug: 'events',
    kind: 'industry',
    title: 'QR Code Generator for Events, Conferences and Check-In | QRWide',
    description:
      'Create QR codes for event registration, schedules, tickets, check-in, booths, handouts, and badges.',
    h1: 'QR Codes for Events',
    eyebrow: 'Registration to follow-up',
    heroBody:
      'Use QR codes to power event registration, schedules, booth materials, check-in, and post-event follow-up across print and signage.',
    primaryKeyword: 'qr code generator for events',
    secondaryKeywords: ['event qr code generator', 'conference qr code', 'qr code for event registration'],
    semanticKeywords: ['RSVP', 'check-in', 'conference badges', 'event signage', 'booth materials'],
    intent: 'commercial',
    priority: 'P1',
    heroCtaLabel: 'Generate QR Code Free',
    heroCtaHref: '/create',
    secondaryCtaLabel: 'Try bulk QR generation',
    secondaryCtaHref: '/bulk',
    trustSignals: [
      'Use QR codes for registration, check-in, and schedules',
      'Create batches for badges, booths, and handouts',
      'Track campaign and event-related scans',
    ],
    faq: [
      {
        question: 'What can event QR codes link to?',
        answer:
          'They can link to registration forms, ticket pages, schedules, speaker info, booth landing pages, event apps, or follow-up offers.',
      },
      {
        question: 'Can I use QR codes for event check-in?',
        answer:
          'Yes. QR codes are often used for check-in, badge workflows, and form-based attendance or RSVP confirmation.',
      },
      {
        question: 'Are QR codes useful at trade shows and conferences?',
        answer:
          'Yes. They are widely used on booth signage, badges, sales collateral, lead forms, and session handouts.',
      },
    ],
    internalLinks: [
      { href: '/qr-code-generator/google-form', label: 'Google Form QR code generator', description: 'Use it for registration and check-in workflows' },
      { href: '/tools/bulk-qr-code-generator', label: 'Bulk QR code generator', description: 'Create badges and handouts in batches' },
      { href: '/guides/how-to-track-qr-code-scans', label: 'How to track QR code scans', description: 'Measure event engagement across assets' },
    ],
    sections: [
      {
        heading: 'Event QR code ideas by stage',
        body: ['Use different QR codes before, during, and after an event instead of relying on one generic code everywhere.'],
        bullets: ['Pre-event registration', 'On-site schedule and maps', 'Booth lead capture', 'Session materials', 'Post-event follow-up'],
      },
    ],
  },
  {
    slug: 'weddings',
    kind: 'industry',
    title: 'Wedding QR Code Generator for RSVPs, Photos and Details | QRWide',
    description:
      'Create QR codes for wedding RSVPs, photo galleries, schedules, venue maps, registries, and guest details.',
    h1: 'QR Codes for Weddings',
    eyebrow: 'Beautiful and practical',
    heroBody:
      'Make wedding details easier for guests with QR codes for RSVPs, schedules, venue maps, photo galleries, and gift registries.',
    primaryKeyword: 'qr code generator for weddings',
    secondaryKeywords: ['wedding qr code generator', 'qr code for wedding invitation', 'wedding RSVP qr code'],
    semanticKeywords: ['RSVP', 'wedding invitation', 'photo gallery', 'registry', 'venue map'],
    intent: 'commercial',
    priority: 'P1',
    heroCtaLabel: 'Generate QR Code Free',
    heroCtaHref: '/create',
    secondaryCtaLabel: 'Read wedding QR guide',
    secondaryCtaHref: '/guides/qr-code-for-wedding-invitations',
    trustSignals: [
      'Use QR codes for RSVPs, maps, and photo galleries',
      'Perfect for invitations, welcome signs, and table cards',
      'Simple setup for guest information and planning pages',
    ],
    faq: [
      {
        question: 'What should a wedding QR code link to?',
        answer:
          'Popular wedding QR destinations include RSVP forms, wedding websites, venue maps, schedules, gift registries, and guest photo galleries.',
      },
      {
        question: 'Where can I place wedding QR codes?',
        answer:
          'Wedding QR codes can be placed on invitations, save-the-dates, welcome signs, programs, table cards, and thank-you notes.',
      },
      {
        question: 'Are wedding QR codes free to create?',
        answer:
          'Yes. A simple static QR code can be free to create. If you want to update details later or track scans, a dynamic QR code is more flexible.',
      },
    ],
    internalLinks: [
      { href: '/qr-code-generator/google-form', label: 'Google Form QR code generator', description: 'Use it for RSVP forms' },
      { href: '/industries/events', label: 'QR codes for events', description: 'Extend the setup to schedules and guest details' },
      { href: '/guides/dynamic-vs-static-qr-codes', label: 'Dynamic vs static QR codes', description: 'Pick the right setup before printing' },
    ],
    sections: [
      {
        heading: 'Wedding QR code ideas',
        body: ['Wedding QR codes work best when they remove friction for guests and keep printed pieces uncluttered.'],
        bullets: ['RSVP forms', 'Venue maps', 'Timeline and schedule', 'Photo gallery', 'Gift registry'],
      },
    ],
  },
  {
    slug: 'schools',
    kind: 'industry',
    title: 'QR Code Generator for Schools, Teachers and Classrooms | QRWide',
    description:
      'Create QR codes for classroom resources, forms, attendance, assignments, handouts, and school events.',
    h1: 'QR Codes for Schools',
    eyebrow: 'Education workflows made simpler',
    heroBody:
      'Use QR codes in schools for classroom resources, assignment links, attendance, parent forms, event signups, and student access points.',
    primaryKeyword: 'qr code generator for schools',
    secondaryKeywords: ['qr code for teachers', 'classroom qr code', 'school qr code generator'],
    semanticKeywords: ['attendance', 'classroom resources', 'student handouts', 'school forms', 'education technology'],
    intent: 'commercial',
    priority: 'P1',
    heroCtaLabel: 'Generate QR Code Free',
    heroCtaHref: '/create',
    secondaryCtaLabel: 'See Google Form QR codes',
    secondaryCtaHref: '/qr-code-generator/google-form',
    trustSignals: [
      'Useful for classrooms, events, signups, and school communication',
      'Works on handouts, posters, and classroom displays',
      'Simple setup for teachers and administrators',
    ],
    faq: [
      {
        question: 'How do schools use QR codes?',
        answer:
          'Schools use QR codes for classroom resources, attendance forms, assignment links, event registration, parent communication, and library or campus materials.',
      },
      {
        question: 'Can teachers use QR codes in classrooms?',
        answer:
          'Yes. Teachers often use QR codes to give students fast access to videos, reading materials, Google Forms, and activity links.',
      },
      {
        question: 'What kind of QR code is best for schools?',
        answer:
          'It depends on the use case. Static codes are fine for fixed resources, while dynamic codes are better when links may change later or when tracking matters.',
      },
    ],
    internalLinks: [
      { href: '/qr-code-generator/google-form', label: 'Google Form QR code generator', description: 'Use it for attendance and signups' },
      { href: '/guides/dynamic-vs-static-qr-codes', label: 'Dynamic vs static QR codes', description: 'Choose the right QR type for school workflows' },
      { href: '/qr-code-generator/wifi', label: 'WiFi QR code generator', description: 'Helpful for guest or event access' },
    ],
    sections: [
      {
        heading: 'Useful school QR code workflows',
        body: ['Education teams get the most value when QR codes make repeated tasks easier for students, staff, and families.'],
        bullets: ['Attendance', 'Assignment links', 'Parent forms', 'Event signups', 'Resource libraries'],
      },
    ],
  },
]
