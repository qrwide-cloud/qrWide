export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type QRType =
  // Free
  | 'url' | 'text' | 'wifi' | 'vcard'
  // Pro
  | 'email' | 'call' | 'sms' | 'whatsapp'
  | 'facebook' | 'instagram' | 'linkedin' | 'tiktok' | 'youtube'
  | 'event'
  // Business
  | 'pdf' | 'app' | 'images' | 'video'

export interface QRStyle {
  foreground?: string
  background?: string
  cornerColor?: string         // outer corner frame color (defaults to foreground)
  cornerDotColor?: string      // inner corner dot color (defaults to cornerColor)
  dotStyle?: 'square' | 'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'extra-rounded'
  cornerStyle?: 'square' | 'extra-rounded' | 'dot'
  cornerDotStyle?: 'square' | 'dot'
  logoUrl?: string
  logoSize?: number            // 0.1 – 0.5, default 0.3
  errorCorrection?: 'L' | 'M' | 'Q' | 'H'
  frame?: 'none' | 'simple' | 'rounded' | 'speech-bubble'
  frameText?: string
  size?: number
}

export interface Database {
  public: {
    PostgrestVersion: '12'
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          name: string | null
          plan: 'free' | 'pro' | 'business'
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          qr_count: number
          scan_count_month: number
          created_at: string
        }
        Insert: {
          id: string
          email?: string | null
          name?: string | null
          plan?: 'free' | 'pro' | 'business'
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          qr_count?: number
          scan_count_month?: number
          created_at?: string
        }
        Update: {
          email?: string | null
          name?: string | null
          plan?: 'free' | 'pro' | 'business'
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          qr_count?: number
          scan_count_month?: number
        }
        Relationships: []
      }
      qr_codes: {
        Row: {
          id: string
          user_id: string
          shortcode: string
          name: string
          type: QRType
          destination: string
          is_dynamic: boolean
          is_active: boolean
          style: Json
          total_scans: number
          unique_scans: number
          last_scanned_at: string | null
          folder: string | null
          tags: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          shortcode: string
          name: string
          type: QRType
          destination: string
          is_dynamic?: boolean
          is_active?: boolean
          style?: Json
          total_scans?: number
          unique_scans?: number
          last_scanned_at?: string | null
          folder?: string | null
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          destination?: string
          is_dynamic?: boolean
          is_active?: boolean
          style?: Json
          total_scans?: number
          unique_scans?: number
          last_scanned_at?: string | null
          folder?: string | null
          tags?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'qr_codes_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          }
        ]
      }
      scan_events: {
        Row: {
          id: string
          qr_id: string
          scanned_at: string
          country: string | null
          region: string | null
          city: string | null
          lat: number | null
          lng: number | null
          device_type: string | null
          os: string | null
          browser: string | null
          ip_hash: string | null
          referrer: string | null
          user_agent: string | null
        }
        Insert: {
          id?: string
          qr_id: string
          scanned_at?: string
          country?: string | null
          region?: string | null
          city?: string | null
          lat?: number | null
          lng?: number | null
          device_type?: string | null
          os?: string | null
          browser?: string | null
          ip_hash?: string | null
          referrer?: string | null
          user_agent?: string | null
        }
        Update: {
          country?: string | null
          region?: string | null
          city?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'scan_events_qr_id_fkey'
            columns: ['qr_id']
            isOneToOne: false
            referencedRelation: 'qr_codes'
            referencedColumns: ['id']
          }
        ]
      }
      folders: {
        Row: {
          id: string
          user_id: string
          name: string
          color: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          color?: string | null
          created_at?: string
        }
        Update: {
          name?: string
          color?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'folders_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          }
        ]
      }
      bulk_jobs: {
        Row: {
          id: string
          user_id: string
          status: 'pending' | 'processing' | 'done' | 'failed'
          total: number
          completed: number
          download_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          status?: 'pending' | 'processing' | 'done' | 'failed'
          total: number
          completed?: number
          download_url?: string | null
          created_at?: string
        }
        Update: {
          status?: 'pending' | 'processing' | 'done' | 'failed'
          completed?: number
          download_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'bulk_jobs_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: Record<string, never>
    Functions: {
      increment_qr_count: { Args: { user_id: string }; Returns: undefined }
      decrement_qr_count: { Args: { user_id: string }; Returns: undefined }
      increment_qr_scans: { Args: { qr_id: string }; Returns: undefined }
      record_scan_event: {
        Args: {
          p_qr_id: string
          p_country?: string | null
          p_region?: string | null
          p_city?: string | null
          p_lat?: number | null
          p_lng?: number | null
          p_device_type?: string | null
          p_os?: string | null
          p_browser?: string | null
          p_ip_hash?: string | null
          p_referrer?: string | null
          p_user_agent?: string | null
        }
        Returns: undefined
      }
    }
    Enums: Record<string, never>
  }
}
