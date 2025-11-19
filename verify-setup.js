#!/usr/bin/env node

// Verify setup script
console.log('🔍 Verifying Bio Link App Setup...\n');

// Check environment variables
console.log('1. Checking environment variables...');
const envPath = require('path').join(__dirname, '.env.local');
const fs = require('fs');

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const hasUrl = envContent.includes('NEXT_PUBLIC_SUPABASE_URL=https://drjfbmujhfxjhuazthlg.supabase.co');
  const hasKey = envContent.includes('NEXT_PUBLIC_SUPABASE_ANON_KEY=');
  
  if (hasUrl && hasKey) {
    console.log('   ✅ Environment variables configured correctly\n');
  } else {
    console.log('   ❌ Environment variables missing or incorrect\n');
    process.exit(1);
  }
} else {
  console.log('   ❌ .env.local file not found\n');
  process.exit(1);
}

// Check SQL script
console.log('2. Checking SQL setup script...');
const sqlPath = require('path').join(__dirname, 'COPY_THIS_TO_SUPABASE.sql');
if (fs.existsSync(sqlPath)) {
  console.log('   ✅ SQL script ready\n');
} else {
  console.log('   ❌ SQL script not found\n');
  process.exit(1);
}

// Check key files
console.log('3. Checking key files...');
const filesToCheck = [
  'components/bio-link-page.tsx',
  'components/admin-dashboard.tsx',
  'app/api/admin/login/route.ts',
  'app/api/admin/analytics/route.ts',
  'app/api/track-click/route.ts',
  'app/api/track-visit/route.ts',
  'lib/supabase.ts'
];

let allFilesExist = true;
filesToCheck.forEach(file => {
  const filePath = require('path').join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.log(`   ❌ Missing: ${file}`);
    allFilesExist = false;
  }
});

if (allFilesExist) {
  console.log('   ✅ All required files present\n');
}

// Final instructions
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('✨ Setup Verification Complete!\n');
console.log('📋 Next Steps:\n');
console.log('1. Run SQL script in Supabase (if not done):');
console.log('   → Copy content from: COPY_THIS_TO_SUPABASE.sql');
console.log('   → Paste in: https://supabase.com/dashboard/project/drjfbmujhfxjhuazthlg/sql/new');
console.log('   → Click "Run"\n');
console.log('2. Start development server:');
console.log('   → npm run dev\n');
console.log('3. Open in browser:');
console.log('   → http://localhost:3000 (main page)');
console.log('   → http://localhost:3000/admin (dashboard)\n');
console.log('4. Login to admin:');
console.log('   → Password: ilovenavs17\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
