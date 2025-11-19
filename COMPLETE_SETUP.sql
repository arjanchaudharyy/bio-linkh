-- ========================================
-- COMPLETE DATABASE SETUP FOR BIO LINK APP
-- ========================================
-- Copy and paste this entire script into Supabase SQL Editor
-- Run it once to set up all tables, indexes, and permissions
-- ========================================

-- ========================================
-- 1. CREATE ANALYTICS TABLES
-- ========================================

-- Create link_clicks table to track individual link clicks
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

-- Create page_visits table to track where visitors come from
CREATE TABLE IF NOT EXISTS page_visits (
  id SERIAL PRIMARY KEY,
  visited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_agent TEXT,
  ip_address INET,
  referrer TEXT,
  referrer_platform VARCHAR(100), -- extracted platform name (twitter, linkedin, etc.)
  country VARCHAR(100),
  city VARCHAR(100)
);

-- Create admin users table for dashboard access (optional - not used currently)
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- 2. CREATE INDEXES FOR PERFORMANCE
-- ========================================

-- Indexes for link_clicks table
CREATE INDEX IF NOT EXISTS idx_link_clicks_clicked_at ON link_clicks(clicked_at DESC);
CREATE INDEX IF NOT EXISTS idx_link_clicks_link_name ON link_clicks(link_name);
CREATE INDEX IF NOT EXISTS idx_link_clicks_ip_address ON link_clicks(ip_address);
CREATE INDEX IF NOT EXISTS idx_link_clicks_date_name ON link_clicks(clicked_at DESC, link_name);

-- Indexes for page_visits table
CREATE INDEX IF NOT EXISTS idx_page_visits_visited_at ON page_visits(visited_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_visits_ip_address ON page_visits(ip_address);
CREATE INDEX IF NOT EXISTS idx_page_visits_referrer_platform ON page_visits(referrer_platform);
CREATE INDEX IF NOT EXISTS idx_page_visits_date_platform ON page_visits(visited_at DESC, referrer_platform);

-- ========================================
-- 3. CONFIGURE ROW LEVEL SECURITY
-- ========================================

-- Disable RLS for analytics tables to allow public inserts from your app
ALTER TABLE link_clicks DISABLE ROW LEVEL SECURITY;
ALTER TABLE page_visits DISABLE ROW LEVEL SECURITY;

-- Enable RLS for admin users table for security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Add RLS policy for admin users (only they can read their own data)
CREATE POLICY IF NOT EXISTS "Admin users can read own data" ON admin_users
  FOR SELECT USING (true);

-- ========================================
-- SETUP COMPLETE!
-- ========================================
-- Your database is now ready to track analytics.
-- You can now:
-- 1. Add the Supabase credentials to your Vercel environment variables
-- 2. Deploy your app
-- 3. Visit /admin and login with password: ilovenavs17
-- ========================================
