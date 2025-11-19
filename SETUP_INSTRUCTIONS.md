# Quick Setup Instructions

## Step 1: Run SQL Script in Supabase

1. Go to your Supabase project: https://supabase.com/dashboard/project/drjfbmujhfxjhuazthlg
2. Click on **SQL Editor** in the left sidebar
3. Click **New query**
4. Copy and paste the **ENTIRE** script below:

```sql
-- ========================================
-- COMPLETE DATABASE SETUP FOR BIO LINK APP
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
  referrer_platform VARCHAR(100),
  country VARCHAR(100),
  city VARCHAR(100)
);

-- Create admin users table (optional)
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_link_clicks_clicked_at ON link_clicks(clicked_at DESC);
CREATE INDEX IF NOT EXISTS idx_link_clicks_link_name ON link_clicks(link_name);
CREATE INDEX IF NOT EXISTS idx_link_clicks_ip_address ON link_clicks(ip_address);
CREATE INDEX IF NOT EXISTS idx_link_clicks_date_name ON link_clicks(clicked_at DESC, link_name);

CREATE INDEX IF NOT EXISTS idx_page_visits_visited_at ON page_visits(visited_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_visits_ip_address ON page_visits(ip_address);
CREATE INDEX IF NOT EXISTS idx_page_visits_referrer_platform ON page_visits(referrer_platform);
CREATE INDEX IF NOT EXISTS idx_page_visits_date_platform ON page_visits(visited_at DESC, referrer_platform);

-- Configure security
ALTER TABLE link_clicks DISABLE ROW LEVEL SECURITY;
ALTER TABLE page_visits DISABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Admin users can read own data" ON admin_users
  FOR SELECT USING (true);
```

5. Click **Run** or press `Ctrl+Enter` (or `Cmd+Enter` on Mac)
6. Wait for "Success. No rows returned" message

## Step 2: Test Locally

```bash
npm run dev
```

Then visit:
- http://localhost:3000 - Main bio link page (test clicking links)
- http://localhost:3000/admin - Admin dashboard (password: ilovenavs17)

## Step 3: Deploy to Vercel

### Option A: Via Vercel Dashboard

1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Add Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://drjfbmujhfxjhuazthlg.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyamZibXVqaGZ4amh1YXp0aGxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NzQ0NTMsImV4cCI6MjA3OTE1MDQ1M30.7ZaMq1Atqr0nT90MTS0ceh6RotNHIZ4lcAsaGAQvos4`
5. Click "Deploy"

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Add environment variables (when prompted or via dashboard)
```

## Step 4: Verify Everything Works

1. Visit your deployed URL
2. Click on a few links (Portfolio, LinkedIn, etc.)
3. Go to `/admin` and login with password: `ilovenavs17`
4. You should see:
   - Click statistics
   - Visit counts
   - Charts and graphs
   - Recent activity

## Troubleshooting

### Links not working?
- Clear browser cache
- Try in incognito mode
- Check browser console for errors

### Analytics not showing?
- Verify SQL script ran successfully
- Check that environment variables are set in Vercel
- Redeploy after adding environment variables
- Check browser console and Vercel logs

### Getting "Unauthorized" in admin?
- Make sure you're using password: `ilovenavs17`
- Try clearing cookies and logging in again

## Security Note

**Important**: Change the admin password before going live!

Edit `app/api/admin/login/route.ts` and change:
```typescript
if (password === "ilovenavs17") {
```
to:
```typescript
if (password === "your_secure_password") {
```

Then redeploy.

---

That's it! Your bio link app with analytics is ready to go! 🚀
