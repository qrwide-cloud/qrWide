import type { Metadata } from 'next'
import { BulkClient } from './BulkClient'

export const metadata: Metadata = { title: 'Bulk QR Code Generator' }

export default function BulkPage() {
  return <BulkClient />
}
