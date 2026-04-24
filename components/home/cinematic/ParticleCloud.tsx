'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
// React Three Fiber uses Three.js JSX intrinsics that TypeScript can't resolve
// without a full R3F type setup — using any-casted createElement here.
import { useRef, useMemo, createElement } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { COUNT, FORMATIONS } from './formations'

interface Props {
  stateRef: React.MutableRefObject<{ formation: number; mouseX: number; mouseY: number }>
}

export function ParticleCloud({ stateRef }: Props) {
  const groupRef = useRef<THREE.Group>(null!)
  const pointsRef = useRef<THREE.Points>(null!)

  const formations = useMemo(() => FORMATIONS.map((f) => f()), [])
  const cur = useMemo(() => formations[0].slice(), [formations])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(cur, 3))
    return geo
  }, [cur])

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: '#5b8fff',
        size: 0.07,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
      }),
    []
  )

  useFrame((_, delta) => {
    if (!pointsRef.current || !groupRef.current) return
    const { formation, mouseX, mouseY } = stateRef.current

    const fi = Math.min(Math.floor(formation), formations.length - 2)
    const t = formation - fi
    const st = t * t * (3 - 2 * t)
    const from = formations[fi]
    const to = formations[fi + 1]
    const speed = 1 - Math.exp(-delta * 6)

    for (let i = 0; i < COUNT; i++) {
      const tx = from[i * 3] + (to[i * 3] - from[i * 3]) * st
      const ty = from[i * 3 + 1] + (to[i * 3 + 1] - from[i * 3 + 1]) * st
      const tz = from[i * 3 + 2] + (to[i * 3 + 2] - from[i * 3 + 2]) * st
      cur[i * 3] += (tx - cur[i * 3]) * speed
      cur[i * 3 + 1] += (ty - cur[i * 3 + 1]) * speed
      cur[i * 3 + 2] += (tz - cur[i * 3 + 2]) * speed
    }

    const attr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    attr.needsUpdate = true

    groupRef.current.rotation.x += (-mouseY * 0.12 - groupRef.current.rotation.x) * 0.04
    groupRef.current.rotation.y += (mouseX * 0.18 - groupRef.current.rotation.y) * 0.04
  })

  // Use createElement with any cast to avoid R3F JSX type issues in this project's TS config
  const E = createElement as any

  return E(
    'group',
    { ref: groupRef },
    E('points', { ref: pointsRef, geometry, material })
  )
}
