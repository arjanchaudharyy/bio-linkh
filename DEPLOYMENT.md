# Deployment Guide for Vercel

This guide will help you deploy your bio link application to Vercel with full analytics support.

## Prerequisites

1. A [Vercel](https://vercel.com) account
2. A [Supabase](https://supabase.com) account (free tier works fine)

## Step 1: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be provisioned (takes ~2 minutes)
3. Once ready, go to **Settings** → **API**
4. Copy the following values:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon public** key (the long key under "Project API keys")

## Step 2: Run SQL Scripts

1. In your Supabase project, go to the **SQL Editor**
2. Run the following scripts in order:

### Script 1: Create Analytics Tables
```sql
-- Copy contents from scripts/01-create-analytics-tables.sql
```

### Script 2: Add Page Visits Tracking
```sql
-- Copy contents from scripts/03-add-page-visits-tracking.sql
```

### Script 3: Add Performance Indexes
```sql
-- Copy contents from scripts/04-add-performance-indexes.sql
```

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts and confirm deployment

### Option B: Deploy via GitHub

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

## Step 4: Configure Environment Variables

After deployment, add environment variables to your Vercel project:

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase URL | From Step 1 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key | From Step 1 |

4. Click "Save"
5. **Redeploy** your application for the changes to take effect

## Step 5: Test Your Deployment

1. Visit your deployed URL
2. Click on the links to test functionality
3. Go to `/admin` and login with password: `ilovenavs17`
4. Verify that analytics are being tracked

## Features

- ✅ Bio link page with social links
- ✅ Real-time age counter
- ✅ Torch cursor effect
- ✅ Click tracking
- ✅ Visit tracking
- ✅ Analytics dashboard
- ✅ IP address tracking
- ✅ Referrer platform detection

## Customization

### Change Admin Password

Edit `app/api/admin/login/route.ts`:
```typescript
if (password === "YOUR_NEW_PASSWORD") {
```

### Update Links

Edit `components/bio-link-page.tsx` and modify the `links` array.

### Update Profile Info

Edit `components/bio-link-page.tsx` and modify:
- Profile image path
- Name
- Bio text
- Birth date for age calculation

## Troubleshooting

### Links not redirecting
- Clear browser cache
- Check browser console for errors
- Ensure popup blockers are disabled

### Analytics not showing
- Verify Supabase environment variables are set correctly
- Check that SQL scripts have been run
- Ensure you've redeployed after adding environment variables
- Check Vercel deployment logs for errors

### Database errors
- Verify SQL scripts were run successfully in Supabase
- Check Supabase logs for connection issues
- Ensure your Supabase project is active (not paused)

## Support

For issues or questions, check:
- Vercel deployment logs
- Supabase logs
- Browser console for frontend errors
