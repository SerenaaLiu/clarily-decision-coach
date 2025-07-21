#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(process.cwd(), '.env');

if (fs.existsSync(envPath)) {
  console.log('⚠️  .env file already exists. Skipping creation.');
  process.exit(0);
}

const envContent = `# Clerk Authentication
# Get your publishable key from: https://dashboard.clerk.com/
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here

# Backend API (if needed)
VITE_API_URL=https://clarily-backend-temp.onrender.com
`;

fs.writeFileSync(envPath, envContent);

console.log('✅ Created .env file');
console.log('📝 Please update the VITE_CLERK_PUBLISHABLE_KEY with your actual Clerk publishable key');
console.log('🔗 Get your key from: https://dashboard.clerk.com/'); 