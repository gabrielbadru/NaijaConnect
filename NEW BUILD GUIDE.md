# 🏗️ NaijaConnect - Complete Professional Build Guide

> **Enterprise-Grade, Comprehensive Guide (1000+ Steps)**  
> This is the definitive guide to building NaijaConnect from zero to production, combining all features, best practices, and professional implementation patterns.

---

## 📋 Table of Contents

### Part I: Foundation & Setup (Steps 1-200)
1. [Pre-Development Setup (Steps 1-50)](#pre-development-setup)
2. [Project Configuration & Fixes (Steps 51-100)](#project-configuration--fixes)
3. [TypeScript & Babel Configuration (Steps 101-150)](#typescript--babel-configuration)
4. [Supabase Backend Setup (Steps 151-200)](#supabase-backend-setup)

### Part II: Routing & Navigation (Steps 201-300)
5. [App Routing & Navigation (Steps 201-250)](#app-routing--navigation)
6. [Splash Screen & Initialization (Steps 251-300)](#splash-screen--initialization)

### Part III: Authentication & User Management (Steps 301-400)
7. [Authentication System (Steps 301-350)](#authentication-system)
8. [User Store & Profile Management (Steps 351-400)](#user-store--profile-management)

### Part IV: Database Schema (Steps 401-600)
9. [Core Database Schema (Steps 401-500)](#core-database-schema)
10. [Cultural Matches & Reconnection Schema (Steps 501-600)](#cultural-matches--reconnection-schema)

### Part V: Onboarding System (Steps 601-800)
11. [Onboarding Strategy Implementation (Steps 601-700)](#onboarding-strategy-implementation)
12. [Onboarding Screens & Components (Steps 701-800)](#onboarding-screens--components)

### Part VI: UI Components & Theme (Steps 801-900)
13. [UI Component Library (Steps 801-850)](#ui-component-library)
14. [Theme & Styling (Steps 851-900)](#theme--styling)

### Part VII: Core Features (Steps 901-1200)
15. [Social Feed System (Steps 901-1000)](#social-feed-system)
16. [Messaging System (Steps 1001-1100)](#messaging-system)
17. [Video Calling (WebRTC) (Steps 1101-1200)](#video-calling-webrtc)

### Part VIII: Advanced Features (Steps 1201-1400)
18. [Communities Feature (Steps 1201-1300)](#communities-feature)
19. [Marketplace & Escrow (Steps 1301-1400)](#marketplace--escrow)

### Part IX: AI & Cultural Features (Steps 1401-1600)
20. [AI Integration (Hugging Face) (Steps 1401-1500)](#ai-integration-hugging-face)
21. [Cultural Matches & Reconnection (Steps 1501-1600)](#cultural-matches--reconnection)

### Part X: Additional Features (Steps 1601-1800)
22. [Diaspora Map (Steps 1601-1700)](#diaspora-map)
23. [Events System (Steps 1701-1800)](#events-system)

### Part XI: Settings & Profile (Steps 1801-1900)
24. [Settings Screens (Steps 1801-1850)](#settings-screens)
25. [Profile Management (Steps 1851-1900)](#profile-management)

### Part XII: Database Migrations (Steps 1901-2000)
26. [Migration Strategies (Steps 1901-1950)](#migration-strategies)
27. [Complete Migration Files (Steps 1951-2000)](#complete-migration-files)

### Part XIII: Production & Optimization (Steps 2001-2200)
28. [Performance Optimization (Steps 2001-2100)](#performance-optimization)
29. [Testing & Quality Assurance (Steps 2101-2200)](#testing--quality-assurance)

### Part XIV: Deployment & Launch (Steps 2201-2400)
30. [Build & Deployment (Steps 2201-2300)](#build--deployment)
31. [App Store Preparation (Steps 2301-2400)](#app-store-preparation)

### Part XV: Post-Launch (Steps 2401-2500)
32. [Analytics & Monitoring (Steps 2401-2450)](#analytics--monitoring)
33. [Maintenance & Updates (Steps 2451-2500)](#maintenance--updates)

---

## 🔧 Pre-Development Setup

### Step 1: Verify Node.js Installation

**Action**: Check Node.js version

```bash
node --version  # Should be v18.x or v20.x
npm --version   # Should be 9.x or higher
```

**Details**:

- If not installed, download from [nodejs.org](https://nodejs.org)
- Use LTS version for stability
- Verify installation with above commands
- **Recommended**: Node.js v20.x LTS for best compatibility

### Step 2: Install Expo CLI Globally

**Action**: Install Expo CLI

```bash
npm install -g expo-cli@latest
```

**Alternative** (without global install):
```bash
npx expo --version  # Use npx expo instead
```

**Details**:

- This gives you access to `expo` command globally
- You can also use `npx expo` without global install (recommended)
- Verify with: `expo --version` or `npx expo --version`
- **Best Practice**: Use `npx expo` to always get latest version

### Step 3: Install Git (If Not Already)

**Action**: Verify Git installation

```bash
git --version
```

**Details**:

- Essential for version control
- Download from [git-scm.com](https://git-scm.com)
- Configure with:
  ```bash
  git config --global user.name "Your Name"
  git config --global user.email "your.email@example.com"
  ```
- Initialize repo: `git init` (if not already done)

### Step 4: Set Up Development Environment

**Action**: Choose your development setup

**Options**:

- **iOS**: Need Mac + Xcode (or use Expo Go on physical device)
- **Android**: Android Studio (or use Expo Go)
- **Both**: Use Expo Go app on physical devices (recommended for MVP)
- **Web**: Works out of the box with Expo

**Recommended Setup for MVP**:
- Use Expo Go app on physical devices
- Test on both iOS and Android
- Use Android Studio for Android emulator (optional)
- Use Xcode for iOS simulator (Mac only)

**Details**:

- Expo Go: Fastest way to test, no build required
- Development Build: More control, requires building
- For MVP: Start with Expo Go, move to development build later

### Step 5: Create Supabase Account (FREE Tier)

**Action**: Sign up at [supabase.com](https://supabase.com)

**Details**:

- Click "Start your project"
- Sign up with GitHub (recommended) or email
- Verify your email
- **Free tier includes**:
  - 500MB database
  - 1GB file storage
  - 2GB bandwidth
  - 50,000 monthly active users
  - Real-time subscriptions
  - Authentication (unlimited users)
  - Edge Functions (500K invocations/month)
  - Postgres database (fully managed)

**Important**: Free tier is sufficient for MVP and early growth

### Step 6: Create New Supabase Project

**Action**: Create project in Supabase dashboard

**Details**:

- Click "New Project"
- **Name**: `naijaconnect` (or your preferred name)
- **Database Password**: Generate strong password, **SAVE IT SECURELY**
  - Store in password manager
  - You'll need this for direct database access
- **Region**: Choose closest to your target users
  - `Europe West` for UK/EU diaspora
  - `US East` for US/Canada diaspora
  - `Asia Pacific` for Asia diaspora
- **Pricing Plan**: Free
- Wait 2-3 minutes for project setup
- **Note**: Project setup creates PostgreSQL database automatically

### Step 7: Get Supabase Credentials

**Action**: Copy API keys from Supabase dashboard

**Location**: Project Settings → API

**You'll need**:

- `Project URL` (e.g., `https://xxxxx.supabase.co`)
  - This is your API endpoint
  - Used for all Supabase client calls
- `anon public` key (safe for client-side)
  - Used in mobile app
  - Protected by Row Level Security (RLS)
- `service_role` key (KEEP SECRET - for server-side only)
  - **NEVER expose in client code**
  - Only use in server-side code or Edge Functions
  - Has admin access, bypasses RLS
- **Create `.env.local` file** (we'll do this in Step 16)

**Security Best Practices**:
- Never commit `.env.local` to Git
- Use `.env.example` for template
- Rotate keys if exposed
- Use service_role only in secure environments

### Step 8: Set Up Free AI Tools (Hugging Face)

**Action**: Sign up for Hugging Face API (100% FREE)

**Why Hugging Face**:
- 100% free API access
- No credit card required
- Reliable and open-source
- Multiple models available
- Great for translation and AI features

**Steps**:

1. Go to [huggingface.co](https://huggingface.co)
2. Click "Sign Up"
3. Create account (GitHub, Google, or email)
4. Go to Settings → Access Tokens
5. Create new token (read permission is enough for API)
6. Copy token (save securely)
7. **Can use models like**:
   - Translation models (for Pidgin ↔ English)
   - Text generation models
   - Classification models
   - Image models (if needed)

**API Details**:
- API URL: `https://api-inference.huggingface.co/models`
- Authentication: Bearer token
- Rate limits: Generous free tier
- No payment required

### Step 9: Set Up Free Video Calling (WebRTC)

**Action**: Choose WebRTC solution

**Recommended: Simple-Peer + Supabase Realtime (100% FREE)**

**Why This Solution**:
- 100% free (no costs)
- Uses Supabase Realtime (already have it)
- P2P (peer-to-peer) - no server needed
- Perfect for 1-on-1 calls
- Works great for MVP

**Options**:

**Option A: Simple-Peer + Supabase Realtime (Recommended)**
- Pure WebRTC, no server needed for signaling
- Use Supabase Realtime for signaling (FREE)
- Perfect for 1-on-1 calls
- No hosting costs
- Packages: `simple-peer`, `react-native-webrtc`

**Option B: PeerJS (FREE with limitations)**
- Free tier available
- Uses STUN servers (free)
- Good for MVP
- Requires external service

**Option C: Daily.co (FREE tier)**
- 10,000 minutes/month FREE
- Easiest to implement
- Requires API key
- Has usage limits

**Recommendation**: Use **Simple-Peer + Supabase Realtime** (100% free, works great)

### Step 10: Verify Project Directory Structure

**Action**: Check current project structure

```bash
cd C:\Users\hp\Desktop\NaijaConnect
dir  # Windows
ls   # Mac/Linux
```

**Expected Structure**:

```
NaijaConnect/
├── src/
├── assets/
├── node_modules/
├── package.json
├── app.json
├── tsconfig.json
├── babel.config.js
└── .gitignore
```

**If missing files**: We'll create them in next steps

---

## ⚙️ Project Configuration & Fixes

### Step 11: Fix TypeScript Configuration Error

**Problem**: `tsconfig.json` has invalid `ignoreDeprecations` value

**Error**: `Invalid value for '--ignoreDeprecations'`

**Action**: Update `tsconfig.json`

**File**: `tsconfig.json`

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/store/*": ["./src/store/*"],
      "@/types/*": ["./src/types/*"],
      "@/constants/*": ["./src/constants/*"]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts"
  ]
}
```

**Changes Made**:
- Removed `"ignoreDeprecations": "6.0"` (invalid value)
- Kept all path aliases for clean imports
- Maintained strict TypeScript checking
- Proper include paths

**Details**: 
- Path aliases allow imports like `@/components/ui/Button`
- Strict mode catches errors early
- Extends Expo base config for compatibility

### Step 12: Fix Babel Configuration

**Problem**: `babel.config.js` missing required plugins for environment variables

**Action**: Update `babel.config.js`

**File**: `babel.config.js`

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env.local",
          safe: false,
          allowUndefined: true,
        },
      ],
      "react-native-reanimated/plugin", // Must be last
    ],
  };
};
```

**Changes Made**:
- Added `react-native-dotenv` plugin for environment variables
- Configured to load from `.env.local`
- Added `react-native-reanimated/plugin` (must be last)
- Proper plugin order (reanimated must be last)

**Details**:
- Allows using `process.env.VARIABLE_NAME` in code
- Loads from `.env.local` file
- `safe: false` means it won't fail if variable missing
- `allowUndefined: true` allows undefined variables

**Install Required Package** (if not already installed):
```bash
npm install react-native-dotenv@^3.4.9
```

### Step 13: Install react-native-dotenv Package

**Action**: Install package for environment variable loading

```bash
npm install react-native-dotenv@^3.4.9
```

**Details**:
- Required for loading `.env.local` variables
- Works with Babel plugin configuration
- No additional setup needed after installation
- Restart Metro bundler after installation

### Step 14: Create Environment Variables Template

**Action**: Create `.env.example` file in root directory

**File**: `.env.example`

```env
# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_keep_secret

# AI Configuration - Using Hugging Face (Recommended)
HUGGINGFACE_API_KEY=your_huggingface_api_key

# App Configuration
EXPO_PUBLIC_APP_ENV=development
```

**Details**:
- Template file for environment variables
- Safe to commit to Git
- Copy to `.env.local` and fill in actual values
- `EXPO_PUBLIC_` prefix makes variables available in client code

### Step 15: Create Local Environment File

**Action**: Create `.env.local` file (DO NOT COMMIT TO GIT)

**File**: `.env.local`

**Steps**:

1. Copy content from `.env.example`
2. Fill in your actual keys from Steps 7-8
3. Save file in root directory

**Example** (with placeholder values):

```env
# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# AI Configuration - Using Hugging Face
HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxxxxxxxxxxx

# App Configuration
EXPO_PUBLIC_APP_ENV=development
```

**Important**: 
- Never commit this file to Git
- Add to `.gitignore` (verify in Step 16)
- Keep keys secure
- Don't share this file

### Step 16: Update .gitignore

**Action**: Verify `.gitignore` includes sensitive files

**File**: `.gitignore`

**Check for** (add if missing):

```
# Environment variables
.env.local
.env*.local
.env

# Dependencies
node_modules/

# Expo
.expo/
dist/
web-build/

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Build
*.apk
*.aab
*.ipa
*.dSYM.zip
*.dSYM
```

**Details**: 
- Ensures `.env.local` is not committed to Git
- Protects your API keys and secrets
- Excludes build artifacts and dependencies
- Standard React Native/Expo ignores

**Verify**: Run `git status` to ensure `.env.local` is not tracked

---

*[This guide continues with 1000+ steps. Due to the comprehensive nature, I'll continue building the file with all sections. Let me continue...]*

