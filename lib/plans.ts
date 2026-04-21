export type Plan = 'free' | 'pro' | 'business'

export interface PlanLimits {
  maxDynamicQr: number
  maxBulk: number
  analyticsLevel: 'basic' | 'full' | 'full+export'
  customLogo: boolean
  watermark: boolean
  pdfDownload: boolean
  apiAccess: boolean
  customDomain: boolean
  teamMembers: number
}

const PLAN_LIMITS: Record<Plan, PlanLimits> = {
  free: {
    maxDynamicQr: 3,
    maxBulk: 10,
    analyticsLevel: 'basic',
    customLogo: false,
    watermark: true,
    pdfDownload: false,
    apiAccess: false,
    customDomain: false,
    teamMembers: 1,
  },
  pro: {
    maxDynamicQr: 50,
    maxBulk: 100,
    analyticsLevel: 'full',
    customLogo: true,
    watermark: false,
    pdfDownload: true,
    apiAccess: false,
    customDomain: false,
    teamMembers: 1,
  },
  business: {
    maxDynamicQr: Infinity,
    maxBulk: 500,
    analyticsLevel: 'full+export',
    customLogo: true,
    watermark: false,
    pdfDownload: true,
    apiAccess: true,
    customDomain: true,
    teamMembers: 5,
  },
}

export function getPlanLimits(plan: Plan): PlanLimits {
  return PLAN_LIMITS[plan] ?? PLAN_LIMITS.free
}

export const PLAN_PRICES = {
  pro: { monthly: 500, yearly: 4900 },       // cents
  business: { monthly: 900, yearly: 8900 },
}
