# 🚀 Quick Start Guide

Your app is **fully configured** and ready to go! Here's what to do:

## ✅ Everything is Already Set Up

- ✅ Environment variables configured in `.env.local`
- ✅ Supabase credentials added
- ✅ Database tables ready (if you ran the SQL script)
- ✅ All code is working

## 🎯 Run Your App

### 1. Start Development Server

```bash
npm run dev
```

**Important**: If you already have a dev server running, **restart it** to load the new environment variables!

Press `Ctrl+C` to stop the current server, then run `npm run dev` again.

### 2. Test Your App

Open these URLs in your browser:

**Main Page:**
```
http://localhost:3000
```
- Click on the links (Portfolio, LinkedIn, Twitter, etc.)
- All links should open in new tabs ✅

**Admin Dashboard:**
```
http://localhost:3000/admin
```
- Login with password: `ilovenavs17`
- You should see analytics dashboard with data ✅

## 🐛 Troubleshooting

### Issue: "Setup Required" message in admin

**Solution**: Restart your dev server!

```bash
# Stop the server (Ctrl+C)
# Then start again:
npm run dev
```

### Issue: Analytics still showing 0

**Did you run the SQL script in Supabase?**

1. Go to: https://supabase.com/dashboard/project/drjfbmujhfxjhuazthlg/sql/new
2. Copy and paste the script from `COPY_THIS_TO_SUPABASE.sql`
3. Click "Run"
4. Restart your dev server

### Issue: Links not working

- Clear browser cache
- Try in incognito/private mode
- Check browser console for errors

## 🚀 Deploy to Vercel

When you're ready to deploy:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Then add these environment variables in Vercel dashboard:

```
NEXT_PUBLIC_SUPABASE_URL=https://drjfbmujhfxjhuazthlg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyamZibXVqaGZ4amh1YXp0aGxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NzQ0NTMsImV4cCI6MjA3OTE1MDQ1M30.7ZaMq1Atqr0nT90MTS0ceh6RotNHIZ4lcAsaGAQvos4
```

## ✨ Features Working

- ✅ Torch cursor effect (move your mouse to see it)
- ✅ Live age counter (updates in real-time)
- ✅ All links redirect properly
- ✅ Click tracking
- ✅ Visit tracking
- ✅ Admin dashboard with charts
- ✅ Session persistence (login stays after refresh)

## 🔐 Security Note

Before going live, change the admin password in:
`app/api/admin/login/route.ts`

## 📊 What Gets Tracked

- Every page visit
- Every link click
- User IP address
- Referrer platform (where visitors come from)
- User agent (browser info)

All visible in the `/admin` dashboard!

---

**Need help?** Check the logs in terminal where `npm run dev` is running.
