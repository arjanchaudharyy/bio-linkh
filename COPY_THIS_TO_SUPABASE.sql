-- ========================================
-- 📋 COPY THIS ENTIRE SCRIPT TO SUPABASE SQL EDITOR
-- ========================================
-- 1. Go to: https://supabase.com/dashboard/project/drjfbmujhfxjhuazthlg/sql/new
-- 2. Paste this entire script
-- 3. Click "Run" button
-- 4. Wait for success message
-- ========================================

-- Create link_clicks table
CREATE TABLE IF NOT EXISTS link_clicks (
  id SERIAL PRIMARY KEY,
  link_name VARCHAR(255) NOT NULL,
  link_url TEXT NOT NULL,
  clicked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_agent TEXT,
  ip_address INET,
  referrer TEXT,
  country VARCHAR(100),
  city VARCHAR(100)
);

-- Create page_visits table
CREATE TABLE IF NOT EXISTS page_visits (
  id SERIAL PRIMARY KEY,
  visited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_agent TEXT,
  ip_address INET,
  referrer TEXT,
  referrer_platform VARCHAR(100),
  country VARCHAR(100),
  city VARCHAR(100)
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create performance indexes
CREATE INDEX IF NOT EXISTS idx_link_clicks_clicked_at ON link_clicks(clicked_at DESC);
CREATE INDEX IF NOT EXISTS idx_link_clicks_link_name ON link_clicks(link_name);
CREATE INDEX IF NOT EXISTS idx_link_clicks_ip_address ON link_clicks(ip_address);
CREATE INDEX IF NOT EXISTS idx_link_clicks_date_name ON link_clicks(clicked_at DESC, link_name);

CREATE INDEX IF NOT EXISTS idx_page_visits_visited_at ON page_visits(visited_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_visits_ip_address ON page_visits(ip_address);
CREATE INDEX IF NOT EXISTS idx_page_visits_referrer_platform ON page_visits(referrer_platform);
CREATE INDEX IF NOT EXISTS idx_page_visits_date_platform ON page_visits(visited_at DESC, referrer_platform);

-- Configure security settings
ALTER TABLE link_clicks DISABLE ROW LEVEL SECURITY;
ALTER TABLE page_visits DISABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Admin users can read own data" ON admin_users
  FOR SELECT USING (true);

-- ========================================
-- ✅ DONE! Your database is ready.
-- ========================================
-- Next steps:
-- 1. Run: npm run dev
-- 2. Visit: http://localhost:3000
-- 3. Test links and admin panel (/admin)
-- 4. Deploy to Vercel with the env vars provided
-- ========================================
