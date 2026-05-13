import type { QRType } from '@/lib/db/schema'
import type { Plan } from '@/lib/plans'

const QR_TYPE_MIN_PLAN: Record<QRType, Plan> = {
  url: 'free',
  text: 'free',
  wifi: 'free',
  vcard: 'free',
  email: 'free',
  call: 'free',
  sms: 'free',
  whatsapp: 'free',
  facebook: 'free',
  instagram: 'free',
  linkedin: 'free',
  tiktok: 'free',
  youtube: 'free',
  event: 'free',
  pdf: 'free',
  app: 'free',
  images: 'free',
  video: 'free',
}

const PLAN_RANK: Record<Plan, number> = {
  free: 0,
  pro: 1,
  business: 2,
}

export function getMinimumPlanForQRType(type: QRType): Plan {
  return QR_TYPE_MIN_PLAN[type] ?? 'free'
}

export function canUseQRType(plan: Plan, type: QRType): boolean {
  return PLAN_RANK[plan] >= PLAN_RANK[getMinimumPlanForQRType(type)]
}
