import {
  Link2, Type, Wifi, User, Mail, Phone, MessageSquare,
  MessageCircle, Share2, Camera, Briefcase, Music2,
  PlayCircle, CalendarDays, FileText, Smartphone, ImageIcon,
  Video,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type Plan = 'free' | 'pro' | 'business'

export interface FieldConfig {
  key: string
  label: string
  type: 'text' | 'url' | 'email' | 'tel' | 'password' | 'textarea' | 'select' | 'handle'
  placeholder?: string
  prefix?: string
  options?: { value: string; label: string }[]
  required?: boolean
}

export interface QRTypeConfig {
  id: string
  label: string
  icon: LucideIcon
  iconColor: string
  iconBg: string
  description: string
  plan: Plan
  fields: FieldConfig[]
}

export const QR_TYPES: QRTypeConfig[] = [
  // ── FREE ──────────────────────────────────────
  {
    id: 'url',
    label: 'Link / URL',
    icon: Link2,
    iconColor: '#0057FF',
    iconBg: 'rgba(0,87,255,0.1)',
    description: 'Website, landing page, any link',
    plan: 'free',
    fields: [
      { key: 'url', label: 'URL', type: 'url', placeholder: 'https://your-website.com', required: true },
    ],
  },
  {
    id: 'text',
    label: 'Text',
    icon: Type,
    iconColor: '#6B7280',
    iconBg: 'rgba(107,114,128,0.1)',
    description: 'Plain text message or note',
    plan: 'free',
    fields: [
      { key: 'text', label: 'Text content', type: 'textarea', placeholder: 'Type any text here…', required: true },
    ],
  },
  {
    id: 'wifi',
    label: 'Wi-Fi',
    icon: Wifi,
    iconColor: '#0057FF',
    iconBg: 'rgba(0,87,255,0.1)',
    description: 'Share Wi-Fi credentials instantly',
    plan: 'free',
    fields: [
      { key: 'ssid', label: 'Network name (SSID)', type: 'text', placeholder: 'My WiFi Network', required: true },
      { key: 'password', label: 'Password', type: 'password', placeholder: 'Network password' },
      {
        key: 'encryption', label: 'Encryption', type: 'select',
        options: [{ value: 'WPA', label: 'WPA/WPA2' }, { value: 'WEP', label: 'WEP' }, { value: 'nopass', label: 'None' }],
      },
    ],
  },
  {
    id: 'vcard',
    label: 'V-Card',
    icon: User,
    iconColor: '#8B5CF6',
    iconBg: 'rgba(139,92,246,0.1)',
    description: 'Digital business card with contact info',
    plan: 'free',
    fields: [
      { key: 'name', label: 'Full name', type: 'text', placeholder: 'Jane Smith', required: true },
      { key: 'company', label: 'Company', type: 'text', placeholder: 'Acme Inc' },
      { key: 'phone', label: 'Phone', type: 'tel', placeholder: '+1 555 123 4567' },
      { key: 'email', label: 'Email', type: 'email', placeholder: 'jane@example.com' },
      { key: 'website', label: 'Website', type: 'url', placeholder: 'https://jane.com' },
      { key: 'address', label: 'Address', type: 'text', placeholder: '123 Main St, City, State' },
    ],
  },

  // ── PRO ───────────────────────────────────────
  {
    id: 'email',
    label: 'E-mail',
    icon: Mail,
    iconColor: '#EF4444',
    iconBg: 'rgba(239,68,68,0.1)',
    description: 'Pre-fill email address, subject & body',
    plan: 'pro',
    fields: [
      { key: 'email', label: 'Email address', type: 'email', placeholder: 'hello@example.com', required: true },
      { key: 'subject', label: 'Subject', type: 'text', placeholder: 'Inquiry from QR code' },
      { key: 'body', label: 'Message body', type: 'textarea', placeholder: 'Hi, I scanned your QR code and…' },
    ],
  },
  {
    id: 'call',
    label: 'Call',
    icon: Phone,
    iconColor: '#10B981',
    iconBg: 'rgba(16,185,129,0.1)',
    description: 'Dial a phone number instantly on scan',
    plan: 'pro',
    fields: [
      { key: 'phone', label: 'Phone number', type: 'tel', placeholder: '+1 555 123 4567', required: true },
    ],
  },
  {
    id: 'sms',
    label: 'SMS',
    icon: MessageSquare,
    iconColor: '#F59E0B',
    iconBg: 'rgba(245,158,11,0.1)',
    description: 'Pre-filled text message ready to send',
    plan: 'pro',
    fields: [
      { key: 'phone', label: 'Phone number', type: 'tel', placeholder: '+1 555 123 4567', required: true },
      { key: 'message', label: 'Pre-filled message', type: 'textarea', placeholder: 'Hi, I scanned your QR…' },
    ],
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    icon: MessageCircle,
    iconColor: '#25D366',
    iconBg: 'rgba(37,211,102,0.1)',
    description: 'Open WhatsApp chat with pre-filled text',
    plan: 'pro',
    fields: [
      { key: 'phone', label: 'WhatsApp number', type: 'tel', placeholder: '+1 555 123 4567', required: true },
      { key: 'message', label: 'Pre-filled message', type: 'textarea', placeholder: 'Hi, I found you via QR…' },
    ],
  },
  {
    id: 'facebook',
    label: 'Facebook',
    icon: Share2,
    iconColor: '#1877F2',
    iconBg: 'rgba(24,119,242,0.1)',
    description: 'Link directly to a Facebook page or profile',
    plan: 'pro',
    fields: [
      { key: 'handle', label: 'Facebook username or page URL', type: 'text', placeholder: 'yourpage', prefix: 'facebook.com/', required: true },
    ],
  },
  {
    id: 'instagram',
    label: 'Instagram',
    icon: Camera,
    iconColor: '#E1306C',
    iconBg: 'rgba(225,48,108,0.1)',
    description: 'Drive followers to your Instagram profile',
    plan: 'pro',
    fields: [
      { key: 'handle', label: 'Instagram handle', type: 'handle', placeholder: 'yourhandle', prefix: 'instagram.com/', required: true },
    ],
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: Briefcase,
    iconColor: '#0A66C2',
    iconBg: 'rgba(10,102,194,0.1)',
    description: 'Share your LinkedIn profile or company page',
    plan: 'pro',
    fields: [
      {
        key: 'type', label: 'Profile type', type: 'select',
        options: [{ value: 'in', label: 'Personal profile' }, { value: 'company', label: 'Company page' }],
      },
      { key: 'handle', label: 'LinkedIn handle', type: 'text', placeholder: 'yourname', required: true },
    ],
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    icon: Music2,
    iconColor: '#010101',
    iconBg: 'rgba(0,0,0,0.08)',
    description: 'Grow your TikTok audience with a QR code',
    plan: 'pro',
    fields: [
      { key: 'handle', label: 'TikTok handle', type: 'handle', placeholder: 'yourhandle', prefix: 'tiktok.com/@', required: true },
    ],
  },
  {
    id: 'youtube',
    label: 'YouTube',
    icon: PlayCircle,
    iconColor: '#FF0000',
    iconBg: 'rgba(255,0,0,0.08)',
    description: 'Channel, video, or playlist link',
    plan: 'pro',
    fields: [
      {
        key: 'linkType', label: 'Link type', type: 'select',
        options: [
          { value: 'channel', label: 'Channel (@handle)' },
          { value: 'video', label: 'Video URL' },
        ],
      },
      { key: 'handle', label: 'Handle or URL', type: 'text', placeholder: '@yourchannel or full video URL', required: true },
    ],
  },
  {
    id: 'event',
    label: 'Event',
    icon: CalendarDays,
    iconColor: '#8B5CF6',
    iconBg: 'rgba(139,92,246,0.1)',
    description: 'Calendar event — adds to phone with one scan',
    plan: 'pro',
    fields: [
      { key: 'title', label: 'Event title', type: 'text', placeholder: 'Annual Conference 2026', required: true },
      { key: 'location', label: 'Location', type: 'text', placeholder: 'New York Convention Center' },
      { key: 'startDate', label: 'Start date & time', type: 'text', placeholder: '2026-06-15 09:00' },
      { key: 'endDate', label: 'End date & time', type: 'text', placeholder: '2026-06-15 17:00' },
      { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Join us for…' },
    ],
  },

  // ── BUSINESS ──────────────────────────────────
  {
    id: 'pdf',
    label: 'PDF',
    icon: FileText,
    iconColor: '#EF4444',
    iconBg: 'rgba(239,68,68,0.1)',
    description: 'Menu, brochure, document — instant download',
    plan: 'business',
    fields: [
      { key: 'url', label: 'PDF URL', type: 'url', placeholder: 'https://example.com/menu.pdf', required: true },
    ],
  },
  {
    id: 'app',
    label: 'App',
    icon: Smartphone,
    iconColor: '#0057FF',
    iconBg: 'rgba(0,87,255,0.1)',
    description: 'App Store or Google Play direct link',
    plan: 'business',
    fields: [
      { key: 'appStore', label: 'Apple App Store URL', type: 'url', placeholder: 'https://apps.apple.com/…' },
      { key: 'playStore', label: 'Google Play URL', type: 'url', placeholder: 'https://play.google.com/…' },
    ],
  },
  {
    id: 'images',
    label: 'Images',
    icon: ImageIcon,
    iconColor: '#F59E0B',
    iconBg: 'rgba(245,158,11,0.1)',
    description: 'Photo gallery or single image URL',
    plan: 'business',
    fields: [
      { key: 'url', label: 'Image or gallery URL', type: 'url', placeholder: 'https://example.com/gallery', required: true },
      { key: 'title', label: 'Gallery title', type: 'text', placeholder: 'Product Photos' },
    ],
  },
  {
    id: 'video',
    label: 'Video',
    icon: Video,
    iconColor: '#8B5CF6',
    iconBg: 'rgba(139,92,246,0.1)',
    description: 'YouTube, Vimeo, or any hosted video',
    plan: 'business',
    fields: [
      { key: 'url', label: 'Video URL', type: 'url', placeholder: 'https://youtube.com/watch?v=…', required: true },
    ],
  },
]

export const FREE_TYPES = QR_TYPES.filter((t) => t.plan === 'free')
export const PRO_TYPES = QR_TYPES.filter((t) => t.plan === 'pro')
export const BUSINESS_TYPES = QR_TYPES.filter((t) => t.plan === 'business')

export function getTypeConfig(id: string): QRTypeConfig | undefined {
  return QR_TYPES.find((t) => t.id === id)
}

export const PLAN_LABELS: Record<Plan, string> = {
  free: 'Free',
  pro: 'Pro',
  business: 'Business',
}

export const PLAN_COLORS: Record<Plan, { text: string; bg: string; border: string }> = {
  free:     { text: '#10B981', bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.25)' },
  pro:      { text: '#0057FF', bg: 'rgba(0,87,255,0.08)',   border: 'rgba(0,87,255,0.2)' },
  business: { text: '#8B5CF6', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.2)' },
}
