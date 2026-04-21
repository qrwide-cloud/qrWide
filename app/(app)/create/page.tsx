import type { Metadata } from 'next'
import { CreateClient } from './CreateClient'

export const metadata: Metadata = {
  title: 'Create QR Code',
  description: 'Create a custom QR code in seconds. URL, WiFi, vCard, and more.',
}

export default function CreatePage() {
  return <CreateClient />
}
