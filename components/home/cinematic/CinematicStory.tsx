'use client'

import { useRef, useEffect, useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { ParticleCloud } from './ParticleCloud'

const SCENES = [
  {
    formation: 0,
    eyebrow: 'Dynamic QR Codes',
    headline: ['Print once.', 'Update forever.'],
    sub: 'Change your QR destination without touching a single printed sheet. Perfect for menus, campaigns, and signage.',
    color: '#5b8fff',
  },
  {
    formation: 1,
    eyebrow: 'Real-Time Analytics',
    headline: ['Every scan,', 'mapped instantly.'],
    sub: 'Location, device, time of day — know exactly which placements drive traffic. Updated in real time.',
    color: '#00C896',
  },
  {
    formation: 2,
    eyebrow: 'Bulk Generation',
    headline: ['500 codes.', '60 seconds.'],
    sub: 'Upload a CSV, download a ZIP of individually named, print-ready QR codes. Events, retail, logistics — done.',
    color: '#8B5CF6',
  },
  {
    formation: 3,
    eyebrow: '15+ QR Types',
    headline: ['Any format.', 'Any platform.'],
    sub: 'URL, Wi-Fi, vCard, WhatsApp, PDF, Instagram and more — all from one clean dashboard.',
    color: '#F59E0B',
  },
  {
    formation: 4,
    eyebrow: 'Free to Start',
    headline: ['The QR infrastructure', 'for serious work.'],
    sub: 'No credit card needed. Generate and download instantly. Sign up free to save, track, and update anytime.',
    color: '#0057FF',
    isCta: true,
  },
]

const NUM_SCENES = SCENES.length

export function CinematicStory() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scene, setScene] = useState(0)
  const stateRef = useRef({ formation: 0, mouseX: 0, mouseY: 0 })

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const proxy = { val: 0 }

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          onUpdate(self) {
            setScene(Math.min(Math.floor(self.progress * NUM_SCENES), NUM_SCENES - 1))
          },
        },
      }).to(proxy, {
        val: NUM_SCENES - 1,
        duration: 1,
        ease: 'none',
        onUpdate() {
          stateRef.current.formation = proxy.val
        },
      })
    })

    const onMouse = (e: MouseEvent) => {
      stateRef.current.mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      stateRef.current.mouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse, { passive: true })

    return () => {
      ctx.revert()
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  const s = SCENES[scene]

  return (
    <div ref={containerRef} style={{ height: `${NUM_SCENES * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden" style={{ background: '#06080f' }}>

        {/* WebGL canvas */}
        <Canvas
          camera={{ position: [0, 0, 14], fov: 55 }}
          gl={{ antialias: true, alpha: false }}
          dpr={[1, 1.5]}
          style={{ position: 'absolute', inset: 0 }}
        >
          <Suspense fallback={null}>
            <ParticleCloud stateRef={stateRef} />
            <EffectComposer>
              <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} intensity={1.2} />
            </EffectComposer>
          </Suspense>
        </Canvas>

        {/* Radial vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 75% 75% at 60% 50%, transparent 30%, #06080f 100%)',
          }}
        />

        {/* Top / bottom fade */}
        <div
          className="absolute inset-x-0 top-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, #06080f, transparent)' }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #06080f, transparent)' }}
        />

        {/* Text overlay */}
        <div className="absolute inset-0 flex items-center pointer-events-none">
          <div className="mx-auto max-w-7xl w-full px-6 lg:px-10">
            <div key={scene} className="cinematic-scene max-w-[520px]">
              {/* Eyebrow */}
              <div
                className="mb-5 inline-flex items-center gap-2 rounded-full border px-3.5 py-1"
                style={{ borderColor: `${s.color}50`, background: `${s.color}18` }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.color }} />
                <span className="text-[11px] font-bold tracking-[0.12em] uppercase" style={{ color: s.color }}>
                  {s.eyebrow}
                </span>
              </div>

              {/* Headline */}
              <h2
                className="text-[40px] font-black leading-[1.07] tracking-[-0.04em] text-white sm:text-[54px] lg:text-[64px]"
                style={{ textShadow: `0 0 60px ${s.color}55` }}
              >
                {s.headline.map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </h2>

              {/* Sub */}
              <p className="mt-5 max-w-[420px] text-[15px] leading-[1.8] text-white/55 sm:text-[16px]">
                {s.sub}
              </p>

              {/* CTA (last scene) */}
              {s.isCta && (
                <div className="mt-8 flex flex-wrap gap-3 pointer-events-auto">
                  <Link href="/create">
                    <button
                      className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#0057FF] px-7
                                 text-[15px] font-semibold text-white transition-all duration-200
                                 shadow-[0_8px_32px_rgba(0,87,255,0.45)]
                                 hover:bg-[#0049E0] hover:shadow-[0_8px_40px_rgba(0,87,255,0.55)]
                                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#06080f]"
                    >
                      Generate QR Code Free
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </Link>
                  <Link href="/pricing">
                    <button
                      className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/20
                                 bg-white/8 px-7 text-[15px] font-semibold text-white
                                 transition-all duration-200 hover:border-white/30 hover:bg-white/12
                                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06080f]"
                    >
                      See pricing
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scene progress pill indicators */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 pointer-events-none">
          {SCENES.map((sc, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-500 ease-out"
              style={{
                width: 3,
                height: i === scene ? 20 : 6,
                background: i === scene ? sc.color : 'rgba(255,255,255,0.18)',
                boxShadow: i === scene ? `0 0 8px ${sc.color}` : 'none',
              }}
            />
          ))}
        </div>

        {/* Scroll hint */}
        {scene === 0 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none cinematic-scroll-hint">
            <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-white/30">
              Scroll
            </span>
            <ChevronDown className="h-4 w-4 text-white/30 animate-bounce" />
          </div>
        )}
      </div>
    </div>
  )
}
