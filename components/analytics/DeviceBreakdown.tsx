'use client'

import { useMemo } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import type { Database } from '@/lib/db/schema'

type ScanEvent = Database['public']['Tables']['scan_events']['Row']

const COLORS = ['#0066FF', '#00D4AA', '#F59E0B', '#EF4444', '#8B5CF6']

interface DeviceBreakdownProps {
  scans: ScanEvent[]
}

export function DeviceBreakdown({ scans }: DeviceBreakdownProps) {
  const data = useMemo(() => {
    const map: Record<string, number> = {}
    scans.forEach((s) => {
      const key = s.device_type ?? 'Unknown'
      map[key] = (map[key] ?? 0) + 1
    })
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value }))
  }, [scans])

  if (data.length === 0) {
    return <p className="text-sm text-[var(--text-secondary)]">No device data yet</p>
  }

  return (
    <ResponsiveContainer width="100%" height={180}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={75}
          dataKey="value"
          paddingAngle={2}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            fontSize: '12px',
          }}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: '12px', color: 'var(--text-secondary)' }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
