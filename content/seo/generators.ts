import type { SeoPageDefinition } from '@/lib/seo/types'

export const generatorPages: SeoPageDefinition[] = [
  {
    slug: 'dynamic',
    kind: 'generator',
    title: 'Dynamic QR Code Generator with Tracking | QRWide',
    description:
      'Create dynamic QR codes you can edit after printing. Track scans, update destinations anytime, and keep one QR code live across every campaign.',
    h1: 'Dynamic QR Code Generator',
    eyebrow: 'Editable and trackable',
    heroBody:
      'Create dynamic QR codes that you can update after printing. Track scans, change destinations, and measure offline campaigns without replacing the code.',
    primaryKeyword: 'dynamic qr code generator',
    secondaryKeywords: ['editable qr code', 'trackable qr code generator', 'dynamic qr code with analytics'],
    semanticKeywords: ['scan analytics', 'editable destination', 'redirect link', 'campaign tracking', 'qr code management'],
    intent: 'transactional',
    priority: 'P1',
    heroCtaLabel: 'Generate QR Code Free',
    heroCtaHref: '/create',
    secondaryCtaLabel: 'See QR tracking',
    secondaryCtaHref: '/features/qr-code-tracking',
    trustSignals: [
      'Update the destination after printing',
      'Track scans by date, location, and device',
      'Perfect for signage, menus, flyers, and campaigns',
    ],
    comparisonTitle: 'Dynamic QRWide codes vs basic static QR codes',
    comparisonRows: [
      { label: 'Edit destination later', qrwide: 'Yes', alternative: 'No' },
      { label: 'Track scans', qrwide: 'Yes', alternative: 'No' },
      { label: 'Keep the same printed code', qrwide: 'Yes', alternative: 'No' },
    ],
    faq: [
      {
        question: 'What is a dynamic QR code?',
        answer:
          'A dynamic QR code points to a short redirect that can be updated later, which lets you change the final destination without reprinting the QR code.',
      },
      {
        question: 'Can I track dynamic QR code scans?',
        answer:
          'Yes. Dynamic QR codes let you measure scan activity and see how many people engaged with each code over time.',
      },
      {
        question: 'Do dynamic QR codes work for print?',
        answer:
          'Yes. They are especially useful for print because the printed code stays the same even when you update the destination later.',
      },
    ],
    internalLinks: [
      { href: '/features/qr-code-tracking', label: 'QR code tracking', description: 'See scan analytics and reporting features' },
      { href: '/guides/dynamic-vs-static-qr-codes', label: 'Dynamic vs static QR codes', description: 'Learn when to use each type' },
      { href: '/tools/bulk-qr-code-generator', label: 'Bulk QR code generator', description: 'Create many trackable QR codes at once' },
    ],
    sections: [
      {
        heading: 'Why businesses choose dynamic QR codes',
        body: [
          'Dynamic QR codes are the right choice when the destination may change over time or when you need analytics.',
          'They work especially well for restaurant menus, campaign flyers, real estate signs, business cards, and packaging.',
        ],
        bullets: ['Edit the destination without reprinting', 'Track scan activity', 'Pause or reactivate a code when needed'],
      },
      {
        heading: 'Best uses for dynamic QR codes',
        body: [
          'Dynamic QR codes are ideal for any printed asset that stays in the world longer than the page it points to.',
        ],
        bullets: ['Restaurant menus', 'Real estate flyers', 'Event signage', 'Product packaging', 'In-store promotions'],
      },
    ],
  },
  {
    slug: 'static',
    kind: 'generator',
    title: 'Static QR Code Generator Free | QRWide',
    description:
      'Create free static QR codes that never expire. Great for fixed links, WiFi, text, and simple print campaigns.',
    h1: 'Static QR Code Generator',
    eyebrow: 'Free forever',
    heroBody:
      'Create a static QR code free in seconds. Static codes never expire and are best when the content will not change.',
    primaryKeyword: 'static qr code generator',
    secondaryKeywords: ['free static qr code', 'static qr code free', 'non expiring qr code'],
    semanticKeywords: ['fixed destination', 'free qr code', 'print-ready qr code', 'simple qr generator'],
    intent: 'transactional',
    priority: 'P1',
    heroCtaLabel: 'Generate QR Code Free',
    heroCtaHref: '/create',
    secondaryCtaLabel: 'Compare with dynamic',
    secondaryCtaHref: '/guides/dynamic-vs-static-qr-codes',
    trustSignals: [
      'Static QR codes do not expire',
      'Unlimited scans for fixed destinations',
      'Best for simple links, text, and WiFi access',
    ],
    comparisonTitle: 'Static QR codes vs dynamic QR codes',
    comparisonRows: [
      { label: 'Free to generate', qrwide: 'Yes', alternative: 'Usually yes' },
      { label: 'Edit after printing', qrwide: 'No', alternative: 'Dynamic only' },
      { label: 'Track scans', qrwide: 'No', alternative: 'Dynamic only' },
    ],
    faq: [
      {
        question: 'Do static QR codes expire?',
        answer: 'No. Static QR codes do not expire as long as the destination itself stays available.',
      },
      {
        question: 'Can I edit a static QR code later?',
        answer:
          'No. A static QR code directly stores the content, so if the destination changes you need to generate a new QR code.',
      },
      {
        question: 'When should I use a static QR code?',
        answer:
          'Use a static QR code when the content is fixed and you do not need analytics, such as text, WiFi credentials, or a permanent URL.',
      },
    ],
    internalLinks: [
      { href: '/guides/dynamic-vs-static-qr-codes', label: 'Dynamic vs static QR codes', description: 'See the tradeoffs before printing' },
      { href: '/qr-code-generator/wifi', label: 'WiFi QR codes', description: 'Create scan-to-connect WiFi access' },
      { href: '/qr-code-generator/vcard', label: 'vCard QR codes', description: 'Share contact details with one scan' },
    ],
    sections: [
      {
        heading: 'Why static QR codes still matter',
        body: [
          'Static QR codes are the simplest option when your content will not change and you want a fast, free, permanent QR code.',
          'They are especially useful for WiFi, text, simple contact details, and stable website URLs.',
        ],
      },
      {
        heading: 'When not to use a static QR code',
        body: [
          'If you expect the destination to change or you want to track scans, a dynamic QR code is the better choice.',
        ],
      },
    ],
  },
  {
    slug: 'wifi',
    kind: 'generator',
    title: 'WiFi QR Code Generator Free | QRWide',
    description:
      'Create a WiFi QR code that lets guests connect instantly without typing the password. Ideal for cafes, offices, hotels, and events.',
    h1: 'WiFi QR Code Generator',
    eyebrow: 'Scan to join WiFi',
    heroBody:
      'Turn your network name and password into a WiFi QR code your guests can scan to connect instantly.',
    primaryKeyword: 'wifi qr code generator',
    secondaryKeywords: ['wifi password qr code', 'qr code for wifi password', 'scan to connect wifi'],
    semanticKeywords: ['SSID', 'WPA', 'guest wifi', 'network password', 'cafe wifi'],
    intent: 'transactional',
    priority: 'P1',
    heroCtaLabel: 'Generate QR Code Free',
    heroCtaHref: '/create?type=wifi',
    secondaryCtaLabel: 'Read WiFi QR guide',
    secondaryCtaHref: '/guides/how-to-make-a-wifi-qr-code',
    trustSignals: [
      'Guests join WiFi without typing the password',
      'Perfect for cafes, offices, salons, and events',
      'Static QR codes work great for fixed guest networks',
    ],
    faq: [
      {
        question: 'How does a WiFi QR code work?',
        answer:
          'A WiFi QR code stores your network credentials so a phone can scan the code and connect without manually typing the password.',
      },
      {
        question: 'Is a WiFi QR code secure?',
        answer:
          'It is as secure as the network you are sharing. Most businesses use WiFi QR codes for guest networks rather than private internal networks.',
      },
      {
        question: 'Can I print a WiFi QR code on signs?',
        answer: 'Yes. WiFi QR codes are commonly printed on table tents, wall signs, front desks, and welcome cards.',
      },
    ],
    internalLinks: [
      { href: '/guides/how-to-make-a-wifi-qr-code', label: 'How to make a WiFi QR code', description: 'Step-by-step setup guide' },
      { href: '/industries/restaurants', label: 'QR codes for restaurants', description: 'Use WiFi and menu QR codes together' },
      { href: '/industries/events', label: 'QR codes for events', description: 'Use WiFi QR codes for guest access at live events' },
    ],
    sections: [
      {
        heading: 'Best places to use a WiFi QR code',
        body: ['WiFi QR codes save time and reduce friction wherever guests or customers ask for internet access.'],
        bullets: ['Restaurants and cafes', 'Hotel lobbies and rooms', 'Offices and coworking spaces', 'Events and conferences'],
      },
      {
        heading: 'WiFi QR code tips for print',
        body: [
          'Put the code somewhere easy to spot, add a simple call to action like "Scan to join WiFi", and test the final print before rolling it out broadly.',
        ],
      },
    ],
  },
  {
    slug: 'vcard',
    kind: 'generator',
    title: 'vCard QR Code Generator for Contact Sharing | QRWide',
    description:
      'Create a vCard QR code to share your name, phone, email, company, and social links in one scan.',
    h1: 'vCard QR Code Generator',
    eyebrow: 'Digital contact sharing',
    heroBody:
      'Make it easy for someone to save your contact details with one scan. Ideal for networking, events, resumes, and business cards.',
    primaryKeyword: 'vcard qr code generator',
    secondaryKeywords: ['contact qr code generator', 'qr code for contact info', 'digital business card qr code'],
    semanticKeywords: ['contact card', 'business card', 'phone number', 'email address', 'company info'],
    intent: 'transactional',
    priority: 'P1',
    heroCtaLabel: 'Generate QR Code Free',
    heroCtaHref: '/create?type=vcard',
    secondaryCtaLabel: 'See business card QR page',
    secondaryCtaHref: '/qr-code-generator/business-card',
    trustSignals: [
      'Share name, phone, email, and company details in one scan',
      'Works well on business cards, badges, and resumes',
      'Great for networking and offline lead capture',
    ],
    faq: [
      {
        question: 'What is a vCard QR code?',
        answer:
          'A vCard QR code stores contact information in a format that many smartphones can read and save directly to contacts.',
      },
      {
        question: 'What information can I include in a vCard QR code?',
        answer:
          'You can include fields like name, company, phone, email, website, job title, and address depending on your QR code setup.',
      },
      {
        question: 'Should I use a vCard QR code or a website link?',
        answer:
          'Use a vCard QR code when your goal is direct contact saving. Use a website or landing page when you want more content or tracking options.',
      },
    ],
    internalLinks: [
      { href: '/qr-code-generator/business-card', label: 'Business card QR code generator', description: 'Best destination ideas for cards' },
      { href: '/industries/real-estate', label: 'QR codes for real estate', description: 'Use contact-sharing QR codes on printed marketing pieces' },
      { href: '/features/qr-code-tracking', label: 'QR code tracking', description: 'Measure which printed assets generate engagement' },
    ],
    sections: [
      {
        heading: 'Where to use a vCard QR code',
        body: ['vCard QR codes work best when your goal is to make contact-saving fast and effortless.'],
        bullets: ['Business cards', 'Trade show badges', 'Sales leave-behinds', 'Resume and portfolio printouts'],
      },
      {
        heading: 'How to make your contact QR code more useful',
        body: [
          'Include only the fields people actually need, make the QR code easy to spot, and add a clear action like "Scan to save contact".',
        ],
      },
    ],
  },
  {
    slug: 'pdf',
    kind: 'generator',
    title: 'PDF QR Code Generator Free | QRWide',
    description:
      'Turn a PDF into a QR code for menus, brochures, catalogs, and guides. Share files instantly from print, signage, and packaging.',
    h1: 'PDF QR Code Generator',
    eyebrow: 'Share files with one scan',
    heroBody:
      'Convert a PDF into a QR code people can scan from menus, flyers, brochures, catalogs, and handouts.',
    primaryKeyword: 'pdf qr code generator',
    secondaryKeywords: ['pdf to qr code', 'qr code for pdf', 'convert pdf to qr code'],
    semanticKeywords: ['brochure', 'catalog', 'menu PDF', 'document download', 'file sharing'],
    intent: 'transactional',
    priority: 'P1',
    heroCtaLabel: 'Generate QR Code Free',
    heroCtaHref: '/create?type=pdf',
    secondaryCtaLabel: 'Read PDF QR guide',
    secondaryCtaHref: '/guides/how-to-make-a-pdf-qr-code',
    trustSignals: [
      'Ideal for menus, brochures, catalogs, and documents',
      'Works from flyers, packaging, posters, and print handouts',
      'Use dynamic QR codes when the file will change later',
    ],
    faq: [
      {
        question: 'Can I turn a PDF into a QR code?',
        answer:
          'Yes. A PDF QR code links a scan to a PDF file or file URL so someone can view or download the document on their phone.',
      },
      {
        question: 'Should I use a static or dynamic PDF QR code?',
        answer:
          'Use dynamic if the file may change later. Use static only if the file location is permanent and you do not need tracking.',
      },
      {
        question: 'What are PDF QR codes good for?',
        answer:
          'They are commonly used for restaurant menus, brochures, sell sheets, event packets, manuals, and lead magnets.',
      },
    ],
    internalLinks: [
      { href: '/qr-code-generator/menu', label: 'Menu QR code generator', description: 'Create menu QR codes for restaurants and cafes' },
      { href: '/guides/dynamic-vs-static-qr-codes', label: 'Dynamic vs static QR codes', description: 'Decide whether the file destination may change later' },
      { href: '/tools/bulk-qr-code-generator', label: 'Bulk QR code generator', description: 'Generate many file-linked QR codes at once' },
    ],
    sections: [
      {
        heading: 'Popular PDF QR code use cases',
        body: ['PDF QR codes help bridge print and digital by making a document instantly available on mobile.'],
        bullets: ['Restaurant menus', 'Sales brochures', 'Product guides', 'Event handouts', 'Real estate brochures'],
      },
      {
        heading: 'When to use a webpage instead of a PDF',
        body: [
          'If the content changes often or needs a better mobile experience, a landing page may work better than a PDF. If you already have a polished file, a PDF QR code is a fast option.',
        ],
      },
    ],
  },
  {
    slug: 'menu',
    kind: 'generator',
    title: 'Restaurant Menu QR Code Generator | QRWide',
    description:
      'Create menu QR codes for restaurants, cafes, bars, and food trucks. Link to a PDF or online menu and update it anytime.',
    h1: 'Restaurant Menu QR Code Generator',
    eyebrow: 'Built for hospitality',
    heroBody:
      'Create a menu QR code your guests can scan from tables, windows, takeout inserts, and signs. Perfect for PDF or online menus.',
    primaryKeyword: 'menu qr code generator',
    secondaryKeywords: ['restaurant menu qr code generator', 'qr code for menu', 'pdf menu qr code'],
    semanticKeywords: ['restaurant menu', 'cafe menu', 'table tents', 'contactless menu', 'hospitality marketing'],
    intent: 'transactional',
    priority: 'P1',
    heroCtaLabel: 'Generate QR Code Free',
    heroCtaHref: '/create?type=pdf',
    secondaryCtaLabel: 'See restaurant use cases',
    secondaryCtaHref: '/industries/restaurants',
    trustSignals: [
      'Update your menu without reprinting the QR code',
      'Works for PDF menus and online menu pages',
      'Great for table tents, counter signs, and takeout bags',
    ],
    faq: [
      {
        question: 'How do I create a QR code for my restaurant menu?',
        answer:
          'Upload or link your menu, generate the QR code, print it on tables or signs, and test it before service. Dynamic QR codes work best if the menu changes over time.',
      },
      {
        question: 'Should a restaurant menu QR code link to a PDF or a webpage?',
        answer:
          'PDFs are quick to launch. A webpage is often better for mobile experience and frequent updates. Either can work depending on your setup.',
      },
      {
        question: 'Can I track menu QR scans?',
        answer:
          'Yes. If you use a dynamic QR code, you can track scan activity and learn which placements drive the most engagement.',
      },
    ],
    internalLinks: [
      { href: '/industries/restaurants', label: 'QR codes for restaurants', description: 'Restaurant-specific QR strategies and examples' },
      { href: '/guides/how-to-make-a-menu-qr-code', label: 'How to make a menu QR code', description: 'Setup tutorial and placement tips' },
      { href: '/features/qr-code-tracking', label: 'QR code tracking', description: 'Measure scans from menus and signage' },
    ],
    sections: [
      {
        heading: 'Where to place menu QR codes',
        body: ['The best menu QR placements are the ones guests see before they ask for a paper menu or staff help.'],
        bullets: ['Table tents', 'Counter displays', 'Window decals', 'Takeout inserts', 'Printed receipts'],
      },
      {
        heading: 'How restaurants use menu QR codes beyond menus',
        body: [
          'Once guests are used to scanning, you can also use QR codes for WiFi, reviews, loyalty programs, and event nights.',
        ],
      },
    ],
  },
  {
    slug: 'google-form',
    kind: 'generator',
    title: 'Google Form QR Code Generator | QRWide',
    description:
      'Create a QR code for any Google Form. Great for attendance, registration, feedback, surveys, and lead capture.',
    h1: 'Google Form QR Code Generator',
    eyebrow: 'Fast form access',
    heroBody:
      'Turn a Google Form into a QR code for feedback, event registration, class attendance, signups, and data collection.',
    primaryKeyword: 'google form qr code generator',
    secondaryKeywords: ['google form qr code', 'qr code for google form', 'survey qr code'],
    semanticKeywords: ['attendance', 'RSVP', 'feedback form', 'registration form', 'survey'],
    intent: 'transactional',
    priority: 'P1',
    heroCtaLabel: 'Generate QR Code Free',
    heroCtaHref: '/create?type=url',
    secondaryCtaLabel: 'See event QR ideas',
    secondaryCtaHref: '/industries/events',
    trustSignals: [
      'Works for surveys, registrations, attendance, and RSVPs',
      'Easy to print on posters, signs, and handouts',
      'Dynamic QR codes help track campaign response',
    ],
    faq: [
      {
        question: 'Can I create a QR code for a Google Form?',
        answer:
          'Yes. Copy your Google Form link, paste it into QRWide, and generate a QR code people can scan to open the form on mobile.',
      },
      {
        question: 'What are Google Form QR codes used for?',
        answer:
          'They are often used for attendance, event registration, feedback surveys, lead capture, and customer reviews.',
      },
      {
        question: 'Can I track scans on a Google Form QR code?',
        answer:
          'Yes, when you use a dynamic QR code. That helps you measure how often the form entry point is being used.',
      },
    ],
    internalLinks: [
      { href: '/industries/events', label: 'QR codes for events', description: 'Use forms for registrations and check-in' },
      { href: '/guides/how-to-track-qr-code-scans', label: 'How to track QR code scans', description: 'Measure response from posters, signs, and forms' },
      { href: '/industries/events', label: 'QR codes for events', description: 'See more event-specific use cases' },
    ],
    sections: [
      {
        heading: 'Google Form QR code use cases',
        body: ['Google Form QR codes work anywhere someone needs to open a form quickly from a poster, flyer, handout, or screen.'],
        bullets: ['Event registration', 'Class attendance', 'Customer feedback', 'Staff checklists', 'Lead generation'],
      },
      {
        heading: 'Tips for higher response rates',
        body: [
          'Put a clear call to action next to the QR code, keep the form short, and explain the value of scanning, such as checking in, entering a giveaway, or leaving feedback.',
        ],
      },
    ],
  },
  {
    slug: 'whatsapp',
    kind: 'generator',
    title: 'WhatsApp QR Code Generator | QRWide',
    description:
      'Create a WhatsApp QR code that opens a chat in one scan. Great for support, reservations, inquiries, and sales conversations.',
    h1: 'WhatsApp QR Code Generator',
    eyebrow: 'Click-to-chat made simple',
    heroBody:
      'Let people start a WhatsApp conversation with you in one scan. Great for customer support, reservations, and offline campaigns.',
    primaryKeyword: 'whatsapp qr code generator',
    secondaryKeywords: ['whatsapp qr code', 'click to chat qr code', 'qr code for whatsapp number'],
    semanticKeywords: ['click to chat', 'customer support', 'booking', 'lead capture', 'WhatsApp business'],
    intent: 'transactional',
    priority: 'P1',
    heroCtaLabel: 'Generate QR Code Free',
    heroCtaHref: '/create?type=whatsapp',
    secondaryCtaLabel: 'See social QR pages',
    secondaryCtaHref: '/qr-code-generator/instagram',
    trustSignals: [
      'Start a chat instantly from print or signage',
      'Great for support desks, salons, restaurants, and service businesses',
      'Works for personal and business WhatsApp use cases',
    ],
    faq: [
      {
        question: 'How does a WhatsApp QR code work?',
        answer:
          'A WhatsApp QR code opens a chat link so the scanner can start a conversation without manually saving the number or typing it.',
      },
      {
        question: 'Can I use a WhatsApp QR code for customer support?',
        answer: 'Yes. It is commonly used for support, reservations, service inquiries, and quick lead capture.',
      },
      {
        question: 'Where should I place a WhatsApp QR code?',
        answer: 'Good placements include storefront signs, flyers, product inserts, menus, and event displays.',
      },
    ],
    internalLinks: [
      { href: '/guides/how-to-track-qr-code-scans', label: 'How to track QR code scans', description: 'Measure support and inquiry campaigns' },
      { href: '/industries/restaurants', label: 'QR codes for restaurants', description: 'Use WhatsApp QR codes for reservations and inquiries' },
      { href: '/qr-code-generator/instagram', label: 'Instagram QR code generator', description: 'Build your social media QR stack' },
    ],
    sections: [
      {
        heading: 'Best use cases for WhatsApp QR codes',
        body: ['WhatsApp QR codes reduce friction when the goal is starting a conversation fast.'],
        bullets: ['Reservations', 'Service inquiries', 'Quote requests', 'Customer support', 'Sales conversations'],
      },
    ],
  },
  {
    slug: 'instagram',
    kind: 'generator',
    title: 'Instagram QR Code Generator | QRWide',
    description:
      'Create an Instagram QR code for your profile, campaign page, or promotion. Turn print traffic into followers and engagement.',
    h1: 'Instagram QR Code Generator',
    eyebrow: 'Grow social traffic from print',
    heroBody:
      'Create an Instagram QR code people can scan from business cards, flyers, packaging, posters, and event displays.',
    primaryKeyword: 'instagram qr code generator',
    secondaryKeywords: ['instagram qr code', 'qr code for instagram profile', 'social media qr code'],
    semanticKeywords: ['followers', 'social media marketing', 'profile link', 'creator marketing', 'offline promotion'],
    intent: 'transactional',
    priority: 'P1',
    heroCtaLabel: 'Generate QR Code Free',
    heroCtaHref: '/create?type=instagram',
    secondaryCtaLabel: 'Read Instagram QR guide',
    secondaryCtaHref: '/guides/how-to-create-an-instagram-qr-code',
    trustSignals: [
      'Link to your Instagram profile, campaign page, or content destination',
      'Great for packaging, business cards, and event signage',
      'Turn offline exposure into followers and engagement',
    ],
    faq: [
      {
        question: 'Can I create a QR code for my Instagram profile?',
        answer: 'Yes. Paste your Instagram profile URL into QRWide and generate a QR code people can scan to open it instantly.',
      },
      {
        question: 'Where should I use an Instagram QR code?',
        answer:
          'Instagram QR codes work well on product packaging, signs, brochures, posters, business cards, and event materials.',
      },
      {
        question: 'Should I link to my profile or a landing page?',
        answer:
          'If your goal is followers, link to the profile. If your goal is campaign performance, a landing page or trackable page may work better.',
      },
    ],
    internalLinks: [
      { href: '/guides/dynamic-vs-static-qr-codes', label: 'Dynamic vs static QR codes', description: 'Use dynamic QR codes for campaign tracking and updates' },
      { href: '/qr-code-generator/whatsapp', label: 'WhatsApp QR code generator', description: 'Add another social/contact option' },
      { href: '/qr-code-generator/business-card', label: 'Business card QR code generator', description: 'Put Instagram on print cards' },
    ],
    sections: [
      {
        heading: 'Best offline placements for Instagram QR codes',
        body: ['Instagram QR codes help bridge real-world attention into digital follow-through.'],
        bullets: ['Business cards', 'Packaging', 'Retail signage', 'Event booths', 'Flyers and posters'],
      },
    ],
  },
  {
    slug: 'business-card',
    kind: 'generator',
    title: 'Business Card QR Code Generator | QRWide',
    description:
      'Create a business card QR code that links to your contact card, website, portfolio, LinkedIn, or booking page.',
    h1: 'Business Card QR Code Generator',
    eyebrow: 'Make every card do more',
    heroBody:
      'Add a QR code to your business card so one scan can open your contact info, website, LinkedIn, portfolio, or booking page.',
    primaryKeyword: 'business card qr code generator',
    secondaryKeywords: ['business card qr code', 'qr code on business card', 'digital business card qr'],
    semanticKeywords: ['networking', 'vCard', 'LinkedIn', 'portfolio', 'contact sharing'],
    intent: 'transactional',
    priority: 'P1',
    heroCtaLabel: 'Generate QR Code Free',
    heroCtaHref: '/create?type=vcard',
    secondaryCtaLabel: 'See vCard QR codes',
    secondaryCtaHref: '/qr-code-generator/vcard',
    trustSignals: [
      'Use a QR code to save contact details fast',
      'Link to LinkedIn, portfolio, booking, or website',
      'Ideal for networking, sales, and recruiting',
    ],
    faq: [
      {
        question: 'What should a business card QR code link to?',
        answer:
          'The best destination depends on your goal. Popular options include a vCard, website, booking page, portfolio, or LinkedIn profile.',
      },
      {
        question: 'Should I put a QR code on my business card?',
        answer:
          'Yes, if it makes the next action easier. A QR code can reduce friction by letting someone save your contact details or view your work instantly.',
      },
      {
        question: 'Where should a QR code go on a business card?',
        answer:
          'Usually on the back or in a clean open area with enough contrast and a clear label so the card still feels readable and professional.',
      },
    ],
    internalLinks: [
      { href: '/qr-code-generator/vcard', label: 'vCard QR code generator', description: 'Best for direct contact saving' },
      { href: '/guides/dynamic-vs-static-qr-codes', label: 'Dynamic vs static QR codes', description: 'Choose the best setup for a printed card' },
      { href: '/create', label: 'Create a business card QR code', description: 'Jump into the generator and test destinations' },
    ],
    sections: [
      {
        heading: 'Popular business card QR destinations',
        body: ['A great business card QR code should help the person scanning take the next step fast.'],
        bullets: ['Save contact details', 'Open LinkedIn profile', 'Visit website', 'Book a meeting', 'View portfolio'],
      },
      {
        heading: 'Business card QR code design tips',
        body: [
          'Keep the code clean, high-contrast, and easy to spot. Pair it with a short CTA like "Scan to save contact" or "View portfolio".',
        ],
      },
    ],
  },
  {
    slug: 'app-download',
    kind: 'generator',
    title: 'App Download QR Code Generator for iOS and Android | QRWide',
    description:
      'Create an app download QR code for App Store, Google Play, landing pages, or app promotion campaigns.',
    h1: 'App Download QR Code Generator',
    eyebrow: 'Promote your app from anywhere',
    heroBody:
      'Create an app download QR code for your app store listing or app landing page and turn print, events, and packaging into installs.',
    primaryKeyword: 'app download qr code generator',
    secondaryKeywords: ['app store qr code generator', 'qr code for app download', 'mobile app qr code'],
    semanticKeywords: ['App Store', 'Google Play', 'mobile installs', 'app marketing', 'campaign tracking'],
    intent: 'transactional',
    priority: 'P1',
    heroCtaLabel: 'Generate QR Code Free',
    heroCtaHref: '/create?type=app',
    secondaryCtaLabel: 'See app promo guide',
    secondaryCtaHref: '/guides/qr-code-for-app-promotion',
    trustSignals: [
      'Promote app installs from print, events, and packaging',
      'Use one QR code for your app landing page or store listing',
      'Track scans when you need campaign measurement',
    ],
    faq: [
      {
        question: 'Can I create a QR code for my app?',
        answer:
          'Yes. You can create a QR code for an App Store listing, Google Play listing, or app landing page and print it anywhere you promote your app.',
      },
      {
        question: 'Should I link directly to the app store or a landing page?',
        answer:
          'Link directly to the app store if speed matters most. Use a landing page if you want more context, platform routing, or analytics.',
      },
      {
        question: 'Where do app download QR codes work best?',
        answer:
          'They work well on posters, product packaging, event booths, sales decks, and in-store displays.',
      },
    ],
    internalLinks: [
      { href: '/guides/how-to-track-qr-code-scans', label: 'How to track QR code scans', description: 'Measure app promo engagement from print' },
      { href: '/features/qr-code-tracking', label: 'QR tracking', description: 'Measure campaign scans over time' },
      { href: '/industries/events', label: 'QR codes for events', description: 'Promote your app at conferences and trade shows' },
    ],
    sections: [
      {
        heading: 'Best use cases for app download QR codes',
        body: ['App download QR codes work best anywhere people may want to move from seeing your brand to installing your app immediately.'],
        bullets: ['Trade show booths', 'Packaging inserts', 'Retail signage', 'Event handouts', 'Product onboarding materials'],
      },
    ],
  },
]
