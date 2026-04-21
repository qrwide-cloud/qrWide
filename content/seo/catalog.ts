import { bestPages } from '@/content/seo/best'
import { comparisonPages } from '@/content/seo/comparisons'
import { featurePages } from '@/content/seo/features'
import { generatorPages } from '@/content/seo/generators'
import { guidePages } from '@/content/seo/guides'
import { industryPages } from '@/content/seo/industries'
import { toolPages } from '@/content/seo/tools'
import type { SeoPageDefinition } from '@/lib/seo/types'

export const seoCatalog = {
  generators: generatorPages,
  tools: toolPages,
  industries: industryPages,
  guides: guidePages,
  comparisons: comparisonPages,
  best: bestPages,
  features: featurePages,
}

export const allSeoPages: SeoPageDefinition[] = [
  ...generatorPages,
  ...toolPages,
  ...industryPages,
  ...guidePages,
  ...comparisonPages,
  ...bestPages,
  ...featurePages,
]

export function findSeoPage(
  collection: SeoPageDefinition[],
  slug: string
): SeoPageDefinition | undefined {
  return collection.find((page) => page.slug === slug)
}
