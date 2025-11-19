# Bio Link Landing Page with Analytics

A modern, customizable bio link landing page built with Next.js 14, featuring real-time analytics tracking, a torch cursor effect, and easy Vercel deployment.

## ✨ Features

- 🔗 **Customizable Links**: Add all your social media and important links
- 📊 **Analytics Dashboard**: Track clicks, visits, and user demographics
- 🔥 **Torch Cursor Effect**: Subtle, high-quality spotlight effect that follows the cursor
- ⏰ **Live Age Counter**: Real-time age calculation with 8 decimal precision
- 📱 **Fully Responsive**: Works perfectly on all devices
- 🎨 **Dark Theme**: Sleek black theme with smooth animations
- 🔒 **Password Protected Admin**: Secure analytics dashboard
- 🚀 **Vercel-Ready**: Optimized for easy deployment

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd <your-repo-name>
npm install
```

### 2. Set Up Environment Variables

Copy the example env file:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> **Note**: You can run the app without Supabase, but analytics tracking will be disabled.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your bio link page.

## 🎨 Customization

### Update Your Profile

Edit `components/bio-link-page.tsx`:

```typescript
// Update profile info
<h1>Your Name</h1>
<p>Your bio description...</p>

// Update birth date for age counter
const birthDate = new Date(2010, 8, 23) // Year, Month (0-indexed), Day
```

### Update Links

Edit the `links` array in `components/bio-link-page.tsx`:

```typescript
const links: LinkData[] = [
  {
    name: "Portfolio",
    url: "https://your-portfolio.com",
    icon: <Globe className="w-5 h-5" />,
  },
  // Add more links...
]
```

### Change Admin Password

Edit `app/api/admin/login/route.ts`:

```typescript
if (password === "your_new_password") {
```

### Customize Torch Effect

Edit the torch effect in `components/bio-link-page.tsx`:

```typescript
style={{
  background: `radial-gradient(
    circle 600px at ${mousePosition.x}px ${mousePosition.y}px,
    rgba(59, 130, 246, 0.15), // Change color and opacity here
    transparent 80%
  )`,
}}
```

## 📊 Analytics Setup

### Set Up Supabase

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **Settings** → **API** and copy:
   - Project URL
   - anon public key

### Run SQL Scripts

In your Supabase SQL Editor, run these scripts in order:

1. `scripts/01-create-analytics-tables.sql` - Creates the base tables
2. `scripts/03-add-page-visits-tracking.sql` - Adds visit tracking
3. `scripts/04-add-performance-indexes.sql` - Optimizes performance

### Access Analytics

1. Go to `/admin` on your deployed site
2. Login with password: `ilovenavs17` (change this!)
3. View your analytics dashboard with:
   - Total visits and clicks
   - Unique visitors
   - Top performing links
   - Traffic sources
   - Recent activity
   - Time-based filtering

## 🚀 Deploy to Vercel

### Via Vercel CLI

```bash
npm i -g vercel
vercel
```

### Via GitHub

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Add environment variables in project settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Deploy!

> **Important**: After adding environment variables, redeploy your project for changes to take effect.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Charts**: Recharts
- **Database**: Supabase
- **Analytics**: Vercel Analytics
- **Hosting**: Vercel

## 📁 Project Structure

```
├── app/
│   ├── api/                    # API routes
│   │   ├── admin/             # Admin endpoints
│   │   ├── track-click/       # Click tracking
│   │   └── track-visit/       # Visit tracking
│   ├── admin/                 # Admin dashboard page
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── components/
│   ├── bio-link-page.tsx     # Main bio link component
│   ├── admin-dashboard.tsx   # Analytics dashboard
│   └── ui/                    # Reusable UI components
├── lib/
│   └── supabase.ts           # Supabase client
├── scripts/
│   └── *.sql                  # Database setup scripts
└── public/
    └── profile.jpg           # Your profile image
```

## 🔧 Development

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Type Check

```bash
npx tsc --noEmit
```

## 🐛 Troubleshooting

### Links Not Working
- **Solution**: Clear browser cache and disable popup blockers

### Analytics Not Showing
- Verify Supabase environment variables are set
- Ensure SQL scripts have been run
- Check Vercel deployment logs
- Redeploy after adding environment variables

### Torch Effect Not Visible
- **Solution**: The effect is subtle by design. Move cursor slowly to see it better.

### Database Errors
- Verify SQL scripts ran successfully in Supabase
- Check Supabase project is active (not paused)
- Review Supabase logs for connection issues

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For questions or support, reach out via the email button on your bio link page.

---

Made with ❤️ using Next.js and Supabase
