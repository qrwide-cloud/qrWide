export const COUNT = 900

function rng(seed: number) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) & 0x7fffffff
    return s / 0x7fffffff
  }
}

// Formation 0: 30×30 QR-like dense grid
export function formation_qrGrid(): Float32Array {
  const p = new Float32Array(COUNT * 3)
  const cols = 30
  const spacing = 0.38
  let i = 0
  for (let r = 0; r < 30 && i < COUNT; r++) {
    for (let c = 0; c < cols && i < COUNT; c++) {
      p[i * 3 + 0] = (c - 14.5) * spacing
      p[i * 3 + 1] = (r - 14.5) * spacing
      p[i * 3 + 2] = 0
      i++
    }
  }
  return p
}

// Formation 1: Random sphere scatter
export function formation_scatter(): Float32Array {
  const p = new Float32Array(COUNT * 3)
  const r = rng(1337)
  for (let i = 0; i < COUNT; i++) {
    const theta = Math.acos(2 * r() - 1)
    const phi = 2 * Math.PI * r()
    const radius = 2.5 + r() * 4
    p[i * 3 + 0] = radius * Math.sin(theta) * Math.cos(phi)
    p[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi)
    p[i * 3 + 2] = radius * Math.cos(theta) * 0.3
  }
  return p
}

// Formation 2: Vertical bar chart (analytics)
export function formation_bars(): Float32Array {
  const p = new Float32Array(COUNT * 3)
  const heights = [0.55, 0.42, 1.0, 0.78, 0.5, 0.88, 0.64]
  const nBars = heights.length
  const perBar = Math.floor(COUNT / nBars)
  const r = rng(42)
  let idx = 0
  for (let b = 0; b < nBars; b++) {
    const n = b < nBars - 1 ? perBar : COUNT - idx
    const bx = (b - nBars / 2 + 0.5) * 1.25
    const h = heights[b] * 5.5
    for (let j = 0; j < n; j++) {
      p[idx * 3 + 0] = bx + (r() - 0.5) * 0.45
      p[idx * 3 + 1] = (j / n) * h - h / 2
      p[idx * 3 + 2] = (r() - 0.5) * 0.2
      idx++
    }
  }
  return p
}

// Formation 3: Stacked rows (bulk)
export function formation_rows(): Float32Array {
  const p = new Float32Array(COUNT * 3)
  const numRows = 9
  const cols = Math.ceil(COUNT / numRows)
  let idx = 0
  for (let row = 0; row < numRows && idx < COUNT; row++) {
    for (let col = 0; col < cols && idx < COUNT; col++) {
      p[idx * 3 + 0] = (col - cols / 2 + 0.5) * 0.18
      p[idx * 3 + 1] = (row - numRows / 2 + 0.5) * 0.85
      p[idx * 3 + 2] = 0
      idx++
    }
  }
  return p
}

// Formation 4: Fibonacci sphere (constellation)
export function formation_sphere(): Float32Array {
  const p = new Float32Array(COUNT * 3)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < COUNT; i++) {
    const y = 1 - (i / (COUNT - 1)) * 2
    const radius = Math.sqrt(1 - y * y)
    const theta = golden * i
    p[i * 3 + 0] = radius * Math.cos(theta) * 5
    p[i * 3 + 1] = y * 5
    p[i * 3 + 2] = radius * Math.sin(theta) * 2.5
  }
  return p
}

export const FORMATIONS = [
  formation_qrGrid,
  formation_scatter,
  formation_bars,
  formation_rows,
  formation_sphere,
]
