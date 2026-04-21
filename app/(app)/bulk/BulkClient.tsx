'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useToast } from '@/components/ui/Toast'

interface BulkRow {
  name: string
  destination_url: string
  folder?: string
  tags?: string
}

type Step = 'upload' | 'preview' | 'generating' | 'done'

export function BulkClient() {
  const [step, setStep] = useState<Step>('upload')
  const [rows, setRows] = useState<BulkRow[]>([])
  const [progress, setProgress] = useState(0)
  const [total, setTotal] = useState(0)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [errors, setErrors] = useState<string[]>([])
  const fileRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  function downloadTemplate() {
    const csv = 'name,destination_url,folder,tags\nMy QR Code,https://example.com,Folder1,tag1;tag2\n'
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'qrwide-bulk-template.csv'
    a.click()
  }

  function parseCSV(text: string): BulkRow[] {
    const lines = text
      .trim()
      .split(/\r?\n/)
      .filter(Boolean)
    if (lines.length < 2) return []
    const parseLine = (line: string) => {
      const values: string[] = []
      let current = ''
      let inQuotes = false

      for (let i = 0; i < line.length; i++) {
        const char = line[i]
        const next = line[i + 1]

        if (char === '"') {
          if (inQuotes && next === '"') {
            current += '"'
            i++
          } else {
            inQuotes = !inQuotes
          }
          continue
        }

        if (char === ',' && !inQuotes) {
          values.push(current.trim())
          current = ''
          continue
        }

        current += char
      }

      values.push(current.trim())
      return values
    }

    const headers = parseLine(lines[0]).map((h) => h.trim().toLowerCase())
    return lines.slice(1).map((line) => {
      const vals = parseLine(line).map((v) => v.replace(/^"|"$/g, ''))
      const row: Record<string, string> = {}
      headers.forEach((h, i) => { row[h] = vals[i] ?? '' })
      return {
        name: row.name ?? '',
        destination_url: row.destination_url ?? '',
        folder: row.folder,
        tags: row.tags,
      }
    }).filter((r) => r.name && r.destination_url)
  }

  function validateURL(url: string): boolean {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (ev) => {
      const text = ev.target?.result as string
      const parsed = parseCSV(text)
      const errs = parsed
        .filter((r) => !validateURL(r.destination_url))
        .map((r) => `Invalid URL: ${r.destination_url}`)

      setRows(parsed)
      setErrors(errs)
      setStep('preview')
    }
    reader.readAsText(file)
  }

  async function generate() {
    setStep('generating')
    setTotal(rows.length)
    setProgress(0)

    try {
      const res = await fetch('/api/qr/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rows }),
      })

      if (!res.ok) {
        const body = await res.json()
        toast(body.error ?? 'Generation failed', 'error')
        setStep('preview')
        return
      }

      // SSE stream
      const reader = res.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) return

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        const lines = chunk.split('\n').filter((l) => l.startsWith('data: '))
        for (const line of lines) {
          try {
            const data = JSON.parse(line.slice(6))
            if (data.progress) setProgress(data.progress)
            if (data.error) {
              toast(data.error, 'error')
              setStep('preview')
              return
            }
            if (data.downloadUrl) {
              setDownloadUrl(data.downloadUrl)
              setStep('done')
            }
          } catch {}
        }
      }
    } catch {
      toast('Generation failed', 'error')
      setStep('preview')
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Bulk QR Code Generator</h1>
      <p className="text-sm text-[var(--text-secondary)] mb-8">
        Upload a CSV and get a ZIP of QR codes. Free: 10 · Pro: 100 · Business: 500
      </p>

      {step === 'upload' && (
        <Card className="p-8">
          <div className="text-center space-y-4">
            <div className="text-4xl">📋</div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Upload your CSV</h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Columns: <code className="font-mono text-xs bg-[var(--surface)] px-1 rounded">name</code>,{' '}
              <code className="font-mono text-xs bg-[var(--surface)] px-1 rounded">destination_url</code>,{' '}
              <code className="font-mono text-xs bg-[var(--surface)] px-1 rounded">folder</code> (optional),{' '}
              <code className="font-mono text-xs bg-[var(--surface)] px-1 rounded">tags</code> (optional)
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="secondary" size="sm" onClick={downloadTemplate}>
                Download template
              </Button>
              <Button size="sm" onClick={() => fileRef.current?.click()}>
                Upload CSV
              </Button>
            </div>
            <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={handleFile} />

            <div
              className="border-2 border-dashed border-[var(--border)] rounded-[12px] p-8 mt-4 cursor-pointer hover:border-[#0066FF] transition-colors"
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault()
                const file = e.dataTransfer.files[0]
                if (file) {
                  const input = fileRef.current!
                  const dt = new DataTransfer()
                  dt.items.add(file)
                  input.files = dt.files
                  input.dispatchEvent(new Event('change', { bubbles: true }))
                }
              }}
            >
              <p className="text-sm text-[var(--text-secondary)]">Drag & drop CSV here or click to browse</p>
            </div>
          </div>
        </Card>
      )}

      {step === 'preview' && (
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-[var(--text-primary)]">
                Preview ({rows.length} QR codes)
              </h2>
              <Button variant="ghost" size="sm" onClick={() => { setStep('upload'); setRows([]); setErrors([]) }}>
                Start over
              </Button>
            </div>

            {errors.length > 0 && (
              <div className="mb-4 rounded-[8px] bg-[#FEE2E2] border border-[#EF4444]/30 p-3">
                <p className="text-sm font-medium text-[#991B1B] mb-1">{errors.length} URL validation error(s)</p>
                {errors.slice(0, 3).map((e) => <p key={e} className="text-xs text-[#991B1B]">{e}</p>)}
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] text-left">
                    <th className="pb-2 pr-4 text-xs text-[var(--text-secondary)] font-medium">Name</th>
                    <th className="pb-2 pr-4 text-xs text-[var(--text-secondary)] font-medium">URL</th>
                    <th className="pb-2 text-xs text-[var(--text-secondary)] font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.slice(0, 5).map((row, i) => (
                    <tr key={i} className="border-b border-[var(--border)] last:border-0">
                      <td className="py-2 pr-4 font-medium">{row.name}</td>
                      <td className="py-2 pr-4 text-[var(--text-secondary)] truncate max-w-[200px]">{row.destination_url}</td>
                      <td className="py-2">
                        {validateURL(row.destination_url) ? (
                          <span className="text-[#10B981] text-xs">✓ Valid</span>
                        ) : (
                          <span className="text-[#EF4444] text-xs">✗ Invalid URL</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {rows.length > 5 && (
                <p className="text-xs text-[var(--text-secondary)] mt-2">+ {rows.length - 5} more rows</p>
              )}
            </div>
          </Card>

          <Button
            onClick={generate}
            disabled={errors.length === rows.length}
            className="w-full"
            size="lg"
          >
            Generate {rows.length} QR codes →
          </Button>
        </div>
      )}

      {step === 'generating' && (
        <Card className="p-8 text-center">
          <div className="text-4xl mb-4">⚙️</div>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Generating...</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            {progress} of {total} complete
          </p>
          <div className="w-full bg-[var(--surface)] rounded-full h-2">
            <div
              className="bg-[#0066FF] h-2 rounded-full transition-all duration-300"
              style={{ width: `${total > 0 ? (progress / total) * 100 : 0}%` }}
            />
          </div>
        </Card>
      )}

      {step === 'done' && (
        <Card className="p-8 text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">Done!</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            {total} QR codes generated successfully
          </p>
          {downloadUrl && (
            <a href={downloadUrl}>
              <Button size="lg">Download ZIP</Button>
            </a>
          )}
        </Card>
      )}
    </div>
  )
}
