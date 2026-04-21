-- QRWide Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================
-- PROFILES
-- ========================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  name TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'business')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  qr_count INTEGER DEFAULT 0,
  scan_count_month INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ========================
-- QR CODES
-- ========================
CREATE TABLE qr_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  shortcode TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('url', 'menu', 'vcard', 'wifi', 'pdf', 'instagram', 'text')),
  destination TEXT NOT NULL,
  is_dynamic BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  style JSONB DEFAULT '{}',
  total_scans INTEGER DEFAULT 0,
  unique_scans INTEGER DEFAULT 0,
  last_scanned_at TIMESTAMPTZ,
  folder TEXT,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_qr_codes_user_id ON qr_codes(user_id);
CREATE INDEX idx_qr_codes_shortcode ON qr_codes(shortcode);

-- ========================
-- SCAN EVENTS
-- ========================
CREATE TABLE scan_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  qr_id UUID REFERENCES qr_codes(id) ON DELETE CASCADE,
  scanned_at TIMESTAMPTZ DEFAULT NOW(),
  country TEXT,
  region TEXT,
  city TEXT,
  lat FLOAT,
  lng FLOAT,
  device_type TEXT,
  os TEXT,
  browser TEXT,
  ip_hash TEXT,
  referrer TEXT,
  user_agent TEXT
);

CREATE INDEX idx_scan_events_qr_id ON scan_events(qr_id);
CREATE INDEX idx_scan_events_scanned_at ON scan_events(scanned_at);

-- ========================
-- FOLDERS
-- ========================
CREATE TABLE folders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  color TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================
-- BULK JOBS
-- ========================
CREATE TABLE bulk_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'done', 'failed')),
  total INTEGER,
  completed INTEGER DEFAULT 0,
  download_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================
-- HELPER RPC FUNCTIONS
-- ========================
CREATE OR REPLACE FUNCTION increment_qr_count(user_id UUID)
RETURNS void AS $$
  UPDATE profiles SET qr_count = qr_count + 1 WHERE id = user_id;
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION decrement_qr_count(user_id UUID)
RETURNS void AS $$
  UPDATE profiles SET qr_count = GREATEST(0, qr_count - 1) WHERE id = user_id;
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION increment_qr_scans(qr_id UUID)
RETURNS void AS $$
  UPDATE qr_codes
  SET total_scans = total_scans + 1,
      last_scanned_at = NOW()
  WHERE id = qr_id;
$$ LANGUAGE sql SECURITY DEFINER;

-- Reset monthly scan counts (run via pg_cron or Supabase cron)
CREATE OR REPLACE FUNCTION reset_monthly_scan_counts()
RETURNS void AS $$
  UPDATE profiles SET scan_count_month = 0;
$$ LANGUAGE sql SECURITY DEFINER;

-- ========================
-- ROW LEVEL SECURITY
-- ========================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE qr_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE scan_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE folders ENABLE ROW LEVEL SECURITY;
ALTER TABLE bulk_jobs ENABLE ROW LEVEL SECURITY;

-- Profiles: users can only see/edit their own
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- QR Codes: users can CRUD their own
CREATE POLICY "Users can view own QR codes" ON qr_codes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own QR codes" ON qr_codes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own QR codes" ON qr_codes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own QR codes" ON qr_codes FOR DELETE USING (auth.uid() = user_id);

-- Scan events: only owner can view; service role inserts
CREATE POLICY "Users can view scans for their QR codes" ON scan_events FOR SELECT
  USING (EXISTS (SELECT 1 FROM qr_codes WHERE qr_codes.id = scan_events.qr_id AND qr_codes.user_id = auth.uid()));

-- Service role bypass (for edge redirect worker)
CREATE POLICY "Service role full access to scan_events" ON scan_events
  FOR ALL USING (auth.role() = 'service_role');

-- Folders
CREATE POLICY "Users can manage own folders" ON folders FOR ALL USING (auth.uid() = user_id);

-- Bulk jobs
CREATE POLICY "Users can manage own bulk jobs" ON bulk_jobs FOR ALL USING (auth.uid() = user_id);

-- ========================
-- STORAGE BUCKET
-- ========================
-- Run these in Supabase dashboard > Storage:
-- 1. Create bucket "bulk-zips" (public)
-- 2. Create bucket "qr-logos" (public, 500KB file limit)
