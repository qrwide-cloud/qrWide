'use client'

import { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { Database } from '@/lib/db/schema'

type ScanEvent = Database['public']['Tables']['scan_events']['Row']

interface ScanChartProps {
  scans: ScanEvent[]
  range: '7d' | '30d' | '90d' | 'all'
}

export function ScanChart({ scans, range }: ScanChartProps) {
  const data = useMemo(() => {
    const days = range === 'all' ? 90 : parseInt(range)
    const map: Record<string, number> = {}

    // Pre-fill all days with 0
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000)
      const key = d.toISOString().split('T')[0]
      map[key] = 0
    }

    scans.forEach((s) => {
      const key = s.scanned_at.split('T')[0]
      if (key in map) map[key] = (map[key] ?? 0) + 1
    })

    return Object.entries(map).map(([date, count]) => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      scans: count,
    }))
  }, [scans, range])

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 10, fill: '#9CA3AF' }}
          tickLine={false}
          interval={Math.floor(data.length / 6)}
        />
        <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} tickLine={false} axisLine={false} allowDecimals={false} />
        <Tooltip
          contentStyle={{
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            fontSize: '12px',
          }}
        />
        <Line
          type="monotone"
          dataKey="scans"
          stroke="#0066FF"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: '#0066FF' }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
