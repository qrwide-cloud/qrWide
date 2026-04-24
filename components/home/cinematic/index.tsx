'use client'

import dynamic from 'next/dynamic'

export const CinematicStory = dynamic(
  () => import('./CinematicStory').then((m) => ({ default: m.CinematicStory })),
  { ssr: false, loading: () => <div className="h-screen bg-[#06080f]" /> }
)
