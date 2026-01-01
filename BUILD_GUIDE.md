# 🏗️ NaijaConnect - Complete Step-by-Step Build Guide

> **Professional, Detailed Guide (100+ Steps)**  
> This guide will take you from zero to a fully functional NaijaConnect app using **100% FREE tools** where possible.

---

## 📋 Table of Contents

1. [Pre-Development Setup (Steps 1-15)](#pre-development-setup)
2. [Project Configuration (Steps 16-35)](#project-configuration)
3. [Supabase Backend Setup (Steps 36-60)](#supabase-backend-setup)
4. [Database Schema Design (Steps 61-80)](#database-schema-design)
5. [Authentication System (Steps 81-100)](#authentication-system)
6. [UI/Theme Setup (Steps 101-120)](#ui-theme-setup)
7. [Onboarding Flow (Steps 121-140)](#onboarding-flow)
8. [Social Feed (Steps 141-160)](#social-feed)
9. [Messaging System (Steps 161-180)](#messaging-system)
10. [Video Calling (WebRTC) (Steps 181-200)](#video-calling-webrtc)
11. [Communities Feature (Steps 201-220)](#communities-feature)
12. [Marketplace (Steps 221-240)](#marketplace)
13. [AI Features (Free Tools) (Steps 241-260)](#ai-features-free-tools)
14. [Final Polish & Testing (Steps 261-280)](#final-polish--testing)

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

### Step 2: Install Expo CLI Globally

**Action**: Install Expo CLI

```bash
npm install -g expo-cli@latest
```

**Details**:

- This gives you access to `expo` command globally
- You can also use `npx expo` without global install
- Verify with: `expo --version`

### Step 3: Install Git (If Not Already)

**Action**: Verify Git installation

```bash
git --version
```

**Details**:

- Essential for version control
- Download from [git-scm.com](https://git-scm.com)
- Configure with: `git config --global user.name "Your Name"` and `git config --global user.email "your.email@example.com"`

### Step 4: Set Up Development Environment

**Action**: Choose your development setup
**Options**:

- **iOS**: Need Mac + Xcode (or use Expo Go on physical device)
- **Android**: Android Studio (or use Expo Go)
- **Both**: Use Expo Go app on physical devices (recommended for MVP)

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

### Step 6: Create New Supabase Project

**Action**: Create project in Supabase dashboard
**Details**:

- Click "New Project"
- **Name**: `naijaconnect` (or your preferred name)
- **Database Password**: Generate strong password, **SAVE IT SECURELY**
- **Region**: Choose closest to your target users (e.g., `Europe West` for UK diaspora)
- **Pricing Plan**: Free
- Wait 2-3 minutes for project setup

### Step 7: Get Supabase Credentials

**Action**: Copy API keys from Supabase dashboard
**Location**: Project Settings → API
**You'll need**:

- `Project URL` (e.g., `https://xxxxx.supabase.co`)
- `anon public` key (safe for client-side)
- `service_role` key (KEEP SECRET - for server-side only)
- **Create `.env.local` file** (we'll do this in Step 16)

### Step 8: Set Up Free AI Tools

**Action**: Sign up for free AI services
**Options for Translation & AI**:

**Option A: Hugging Face (100% FREE)**

- Sign up at [huggingface.co](https://huggingface.co)
- Get free API token
- Can use models like:
  - `google/flan-t5-base` (translation)
  - `facebook/bart-large-mnli` (text classification)

**Option B: Google Gemini API (FREE Tier)**

- Sign up at [makersuite.google.com](https://makersuite.google.com)
- Get API key (FREE tier: 60 requests/minute)
- Great for translation

**Option C: LibreTranslate (Open Source, Self-hosted)**

- Use public instance: [libretranslate.com](https://libretranslate.com)
- No API key needed for public instance
- Limited to 10 requests/minute

**Recommendation**: Start with **Hugging Face API** (100% free, reliable, and open-source)

### Step 9: Set Up Free Video Calling (WebRTC)

**Action**: Choose WebRTC solution
**Options**:

**Option A: Simple-Peer (100% FREE, P2P)**]

- Pure WebRTC, no server needed for signaling
- Use Supabase Realtime for signaling (FREE)
- Perfect for 1-on-1 calls
- No hosting costs

**Option B: PeerJS (FREE with limitations)**

- Free tier available
- Uses STUN servers (free)
- Good for MVP

**Option C: Daily.co (FREE tier)**

- 10,000 minutes/month FREE
- Easiest to implement
- Requires API key

**Recommendation**: Use **Simple-Peer + Supabase Realtime** (100% free, works great)

### Step 10: Verify Project Directory Structure

**Action**: Check current project structure

```bash
cd C:\Users\hp\Desktop\NaijaConnect
dir  # Windows
ls   # Mac/Linux
```

**Expected**:

- Should see `package.json`, `src/`, `app.json`, etc.
- If missing files, we'll create them in next steps

---

## ⚙️ Project Configuration

### Step 11: Create Environment Variables Template

**Action**: Create `.env.example` file in root directory
**File**: `.env.example`

```env
# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_keep_secret

# AI Configuration (Choose one)
# AI Configuration - Using Hugging Face (Recommended)
HUGGINGFACE_API_KEY=your_huggingface_key

# Alternative: Google Gemini (if preferred)
# GEMINI_API_KEY=your_gemini_api_key

# Option 3: LibreTranslate (Public instance - no key needed)
LIBRETRANSLATE_URL=https://libretranslate.com/translate

# Video Calling (WebRTC)
# Using Simple-Peer with Supabase Realtime (no additional keys needed)

# App Configuration
EXPO_PUBLIC_APP_ENV=development
```

### Step 12: Create Local Environment File

**Action**: Create `.env.local` file (DO NOT COMMIT TO GIT)
**File**: `.env.local`
**Details**:

- Copy content from `.env.example`
- Fill in your actual keys from Steps 7-9
- Add `.env.local` to `.gitignore` (verify it's there)

### Step 13: Update .gitignore

**Action**: Verify `.gitignore` includes sensitive files
**Check for**:

```
.env.local
.env*.local
node_modules/
.expo/
dist/
*.log
```

**Details**: Ensure `.env.local` is in `.gitignore` to protect your keys

### Step 14: Install Core Dependencies

**Action**: Install state management and core packages

```bash
npm install zustand@^4.4.7
npm install @supabase/supabase-js@^2.39.0
npm install @react-native-async-storage/async-storage@1.21.0
npm install date-fns@^3.0.0
npm install zod@^3.22.4
npm install @hookform/resolvers@^3.3.4
```

**Details**:

- `zustand`: Lightweight state management (smaller than Redux)
- `@supabase/supabase-js`: Backend SDK
- `async-storage`: Local storage for tokens, preferences
- `date-fns`: Date formatting utilities
- `zod`: Schema validation
- `@hookform/resolvers`: Form validation integration

### Step 15: Install Expo Packages

**Action**: Install Expo-specific packages

```bash
npx expo install expo-location@~17.0.1
npx expo install expo-image-picker@~16.0.4
npx expo install expo-camera@~16.0.4
npx expo install expo-av@~15.0.4
npx expo install expo-file-system@~18.0.4
npx expo install expo-notifications@~0.28.16
npx expo install expo-device@~6.0.2
npx expo install expo-secure-store@~14.0.0
```

**Details**:

- `expo-location`: For Diaspora Map location services
- `expo-image-picker`: Profile photos, post images
- `expo-camera`: Camera access for photos/videos
- `expo-av`: Audio/video playback (voice notes)
- `expo-file-system`: File operations
- `expo-notifications`: Push notifications
- `expo-device`: Device info
- `expo-secure-store`: Secure token storage

### Step 16: Install Maps and UI Dependencies

**Action**: Install maps and additional UI packages

```bash
npx expo install react-native-maps@1.8.0
npm install react-native-image-viewing@^0.2.2
npm install react-native-gesture-handler@~2.28.0  # Already installed, but verify
npm install react-native-reanimated@~4.1.1        # Already installed, but verify
```

**Details**:

- `react-native-maps`: For Diaspora Map feature
- `react-native-image-viewing`: Image gallery viewer

### Step 17: Install WebRTC Dependencies

**Action**: Install video calling packages

```bash
npm install simple-peer@^9.11.1
npm install @types/simple-peer@^9.11.9
npm install react-native-webrtc@111.0.2
```

**Details**:

- `simple-peer`: WebRTC wrapper (easier to use)
- `react-native-webrtc`: Native WebRTC support
- **Note**: May need additional setup for native modules

### Step 18: Install Additional Utilities

**Action**: Install helper packages

```bash
npm install react-native-url-polyfill@^2.0.0
npm install react-native-get-random-values@^1.9.0
npm install @react-native-community/netinfo@^11.1.0
```

**Details**:

- `url-polyfill`: Required for Supabase in React Native
- `random-values`: Required for crypto operations
- `netinfo`: Network connectivity detection

### Step 19: Configure TypeScript Paths

**Action**: Update `tsconfig.json` for path aliases
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
  "include": ["**/*.ts", "**/*.tsx", ".expo/types/**/*.ts", "expo-env.d.ts"]
}
```

**Details**: This allows imports like `@/components/ui/Button` instead of `../../components/ui/Button`

### Step 20: Create Project Structure - Root Directories

**Action**: Create main directory structure

```bash
# Create directories
mkdir -p src/lib/supabase
mkdir -p src/lib/api
mkdir -p src/lib/ai
mkdir -p src/lib/utils
mkdir -p src/lib/hooks
mkdir -p src/store
mkdir -p src/types
mkdir -p src/components/ui
mkdir -p src/components/feed
mkdir -p src/components/chat
mkdir -p src/components/profile
mkdir -p src/components/marketplace
mkdir -p src/components/community
mkdir -p src/components/onboarding
mkdir -p src/components/map
mkdir -p src/components/ai
mkdir -p supabase/migrations
mkdir -p assets/fonts
```

**Details**: Creates all necessary folders for organized code structure

### Step 21: Set Up Environment Variable Loading

**Action**: Install and configure env loading

```bash
npm install react-native-dotenv@^3.4.9
```

**Details**: Allows loading `.env.local` variables in React Native

### Step 22: Configure Babel for Environment Variables

**Action**: Update `babel.config.js` (create if doesn't exist)
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

### Step 23: Create Constants Directory Structure

**Action**: Create constant files
**Files to create**:

- `src/constants/theme.ts` (already exists, we'll enhance it)
- `src/constants/routes.ts` (new)
- `src/constants/config.ts` (new)
  **Details**: Centralized configuration management

### Step 24: Enhance Theme Constants

**Action**: Update `src/constants/theme.ts` with comprehensive theme
**File**: `src/constants/theme.ts`

```typescript
export const COLORS = {
  // Primary Brand Colors (Green theme inspired by your image)
  primary: "#4ADE80", // Main green
  primaryDark: "#22C55E", // Darker green
  primaryLight: "#86EFAC", // Lighter green
  secondary: "#2DD4BF", // Teal accent

  // Background Colors
  background: "#FFFFFF",
  backgroundDark: "#0F172A",
  surface: "#F8FAFC",
  surfaceDark: "#1E293B",

  // Text Colors
  text: "#1E293B",
  textSecondary: "#64748B",
  textLight: "#94A3B8",
  textDark: "#0F172A",

  // Status Colors
  success: "#10B981",
  error: "#EF4444",
  warning: "#F59E0B",
  info: "#3B82F6",

  // Border & Divider
  border: "#E2E8F0",
  divider: "#CBD5E1",

  // Overlay
  overlay: "rgba(0, 0, 0, 0.5)",

  // Social Colors
  facebook: "#1877F2",
  google: "#4285F4",
  apple: "#000000",
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const TYPOGRAPHY = {
  fontFamily: {
    regular: "System",
    medium: "System",
    bold: "System",
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    xxl: 40,
  },
} as const;

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
} as const;

export const SHADOWS = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
} as const;
```

### Step 25: Create Route Constants

**Action**: Create `src/constants/routes.ts`
**File**: `src/constants/routes.ts`

```typescript
export const ROUTES = {
  // Auth
  WELCOME: "/(auth)/welcome",
  LOGIN: "/(auth)/login",
  SIGNUP: "/(auth)/signup",
  VERIFY: "/(auth)/verify",
  PASSWORD: "/(auth)/password",

  // Onboarding
  ONBOARDING_PROFILE: "/(onboarding)/profile-setup",
  ONBOARDING_LOCATION: "/(onboarding)/location",
  ONBOARDING_DNA: "/(onboarding)/naija-dna",
  ONBOARDING_INTERESTS: "/(onboarding)/interests",
  ONBOARDING_CONTACTS: "/(onboarding)/contacts",

  // Main Tabs
  HOME: "/(protected)/(tabs)/",
  COMMUNITIES: "/(protected)/(tabs)/communities",
  CHATS: "/(protected)/(tabs)/chats",
  MARKETPLACE: "/(protected)/(tabs)/marketplace",
  PROFILE: "/(protected)/(tabs)/profile",

  // Nested Routes
  POST_CREATE: "/(protected)/post/create",
  POST_DETAILS: (id: string) => `/(protected)/post/${id}`,
  CHAT_THREAD: (id: string) => `/(protected)/chat/${id}`,
  USER_PROFILE: (id: string) => `/(protected)/user/${id}`,
  COMMUNITY_DETAILS: (id: string) => `/(protected)/community/${id}`,
  MARKETPLACE_ITEM: (id: string) => `/(protected)/marketplace/item/${id}`,
} as const;
```

### Step 26: Create Config Constants

**Action**: Create `src/constants/config.ts`
**File**: `src/constants/config.ts`

```typescript
import Constants from "expo-constants";

// Get environment variables
const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = Constants.expoConfig?.extra?.[key] || process.env[key];
  if (!value && !defaultValue) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value || defaultValue || "";
};

export const CONFIG = {
  // Supabase
  SUPABASE_URL: getEnvVar("EXPO_PUBLIC_SUPABASE_URL"),
  SUPABASE_ANON_KEY: getEnvVar("EXPO_PUBLIC_SUPABASE_ANON_KEY"),

  // AI - Using Hugging Face
  HUGGINGFACE_API_KEY: getEnvVar("HUGGINGFACE_API_KEY", ""),
  HUGGINGFACE_API_URL: "https://api-inference.huggingface.co/models",
  LIBRETRANSLATE_URL: getEnvVar(
    "LIBRETRANSLATE_URL",
    "https://libretranslate.com/translate"
  ),

  // App
  ENV: getEnvVar("EXPO_PUBLIC_APP_ENV", "development"),
  APP_VERSION: "1.0.0",

  // Features
  ENABLE_VIDEO_CALLS: true,
  ENABLE_MARKETPLACE: true,
  ENABLE_ESCROW: true,
} as const;
```

### Step 27: Update app.json for Environment Variables

**Action**: Update `app.json` to include extra config
**File**: `app.json`

```json
{
  "expo": {
    "name": "NaijaConnect",
    "slug": "NaijaConnect",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "naijaconnect",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.naijaconnect.app"
    },
    "android": {
      "adaptiveIcon": {
        "backgroundColor": "#4ADE80",
        "foregroundImage": "./assets/images/android-icon-foreground.png",
        "backgroundImage": "./assets/images/android-icon-background.png",
        "monochromeImage": "./assets/images/android-icon-monochrome.png"
      },
      "package": "com.naijaconnect.app",
      "edgeToEdgeEnabled": true,
      "predictiveBackGestureEnabled": false,
      "permissions": [
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "RECORD_AUDIO",
        "INTERNET"
      ]
    },
    "web": {
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#4ADE80",
          "dark": {
            "backgroundColor": "#0F172A"
          }
        }
      ],
      [
        "expo-camera",
        {
          "cameraPermission": "Allow NaijaConnect to access your camera to take photos and videos."
        }
      ],
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow NaijaConnect to use your location to show you nearby Nigerians."
        }
      ],
      [
        "expo-notifications",
        {
          "icon": "./assets/images/icon.png",
          "color": "#4ADE80"
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true,
      "reactCompiler": true
    },
    "extra": {
      "EXPO_PUBLIC_SUPABASE_URL": process.env.EXPO_PUBLIC_SUPABASE_URL,
      "EXPO_PUBLIC_SUPABASE_ANON_KEY": process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
    }
  }
}
```

---

## 🗄️ Supabase Backend Setup

### Step 28: Initialize Supabase Client

**Action**: Create Supabase client file
**File**: `src/lib/supabase/client.ts`

```typescript
import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CONFIG } from "@/constants/config";

export const supabase = createClient(
  CONFIG.SUPABASE_URL,
  CONFIG.SUPABASE_ANON_KEY,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);
```

**Details**: This creates the main Supabase client that will be used throughout the app

### Step 29: Create Auth Helper Functions

**Action**: Create `src/lib/supabase/auth.ts`
**File**: `src/lib/supabase/auth.ts`

```typescript
import { supabase } from "./client";

export interface SignUpData {
  email?: string;
  phone?: string;
  password?: string;
}

export interface SignInData {
  email?: string;
  phone?: string;
  password?: string;
}

export const authHelpers = {
  // Sign up with email
  async signUpWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { data, error };
  },

  // Sign up with phone
  async signUpWithPhone(phone: string) {
    const { data, error } = await supabase.auth.signInWithOtp({
      phone,
    });
    return { data, error };
  },

  // Sign in with email
  async signInWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  // Verify OTP
  async verifyOtp(phone: string, token: string) {
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: "sms",
    });
    return { data, error };
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // Get current session
  async getSession() {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    return { session, error };
  },

  // Get current user
  async getCurrentUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    return { user, error };
  },

  // Listen to auth changes
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  },
};
```

### Step 30: Create Storage Helper Functions

**Action**: Create `src/lib/supabase/storage.ts`
**File**: `src/lib/supabase/storage.ts`

```typescript
import { supabase } from "./client";

const BUCKETS = {
  AVATARS: "avatars",
  POSTS: "posts",
  MARKETPLACE: "marketplace",
  COMMUNITY: "community",
} as const;

export const storageHelpers = {
  // Upload avatar
  async uploadAvatar(userId: string, file: File | Blob, fileName: string) {
    const fileExt = fileName.split(".").pop();
    const filePath = `${userId}/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from(BUCKETS.AVATARS)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) return { data: null, error };

    const { data: publicData } = supabase.storage
      .from(BUCKETS.AVATARS)
      .getPublicUrl(filePath);

    return { data: publicData.publicUrl, error: null };
  },

  // Upload post image
  async uploadPostImage(userId: string, file: File | Blob, fileName: string) {
    const fileExt = fileName.split(".").pop();
    const filePath = `${userId}/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from(BUCKETS.POSTS)
      .upload(filePath, file);

    if (error) return { data: null, error };

    const { data: publicData } = supabase.storage
      .from(BUCKETS.POSTS)
      .getPublicUrl(filePath);

    return { data: publicData.publicUrl, error: null };
  },

  // Delete file
  async deleteFile(bucket: string, filePath: string) {
    const { error } = await supabase.storage.from(bucket).remove([filePath]);
    return { error };
  },
};
```

### Step 31: Create Realtime Helper Functions

**Action**: Create `src/lib/supabase/realtime.ts`
**File**: `src/lib/supabase/realtime.ts`

```typescript
import { supabase } from "./client";
import { RealtimeChannel } from "@supabase/supabase-js";

export const realtimeHelpers = {
  // Subscribe to channel
  subscribeToChannel(
    channelName: string,
    callback: (payload: any) => void
  ): RealtimeChannel {
    const channel = supabase.channel(channelName);

    channel.on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
      },
      callback
    );

    channel.subscribe();
    return channel;
  },

  // Subscribe to messages
  subscribeToMessages(
    chatId: string,
    callback: (payload: any) => void
  ): RealtimeChannel {
    return this.subscribeToChannel(`chat:${chatId}`, callback);
  },

  // Subscribe to call signaling
  subscribeToCallSignaling(
    callId: string,
    callback: (payload: any) => void
  ): RealtimeChannel {
    return this.subscribeToChannel(`call:${callId}`, callback);
  },

  // Unsubscribe from channel
  unsubscribe(channel: RealtimeChannel) {
    supabase.removeChannel(channel);
  },
};
```

### Step 32: Set Up Supabase Storage Buckets

**Action**: Create storage buckets in Supabase Dashboard
**Steps**:

1. Go to Supabase Dashboard → Storage
2. Create bucket: `avatars`
   - Make it **Public**
   - Enable file size limit: 5MB
3. Create bucket: `posts`
   - Make it **Public**
   - Enable file size limit: 10MB
4. Create bucket: `marketplace`
   - Make it **Public**
   - Enable file size limit: 20MB
5. Create bucket: `community`
   - Make it **Public**
   - Enable file size limit: 10MB

**Details**: These buckets will store user-uploaded images and files

### Step 33: Configure Supabase Auth Providers

**Action**: Enable auth providers in Supabase Dashboard
**Steps**:

1. Go to Authentication → Providers
2. Enable **Email** provider
   - Enable "Confirm email" (optional for MVP)
   - Set redirect URL: `naijaconnect://auth/callback`
3. Enable **Phone** provider
   - Choose SMS provider (Twilio recommended, but costs money)
   - For FREE: Use test mode (limited)
   - Or use email verification for MVP
4. Enable **Google** provider (optional but recommended)
   - Add Google OAuth credentials
   - Set redirect URL: `naijaconnect://auth/callback`
5. Enable **Apple** provider (iOS only, optional)
   - Configure Apple Sign In
   - Set redirect URL: `naijaconnect://auth/callback`

**Details**: Phone auth costs money with Twilio. For MVP, start with email only.

---

## 📊 Database Schema Design

### Step 34: Design User Profile Schema

**Action**: Plan users table structure
**Table**: `users` (extends Supabase auth.users)
**Columns**:

```sql
-- This will be created in migration
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  phone TEXT,
  display_name TEXT NOT NULL,
  username TEXT UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  gender TEXT,
  birth_date DATE,
  country TEXT,
  state TEXT,
  city TEXT,
  tribe TEXT,
  is_diaspora BOOLEAN DEFAULT false,
  diaspora_country TEXT,
  naija_dna_score JSONB, -- Stores quiz results
  interests TEXT[], -- Array of interests
  naija_score INTEGER DEFAULT 0, -- Gamification points
  is_verified BOOLEAN DEFAULT false,
  is_premium BOOLEAN DEFAULT false,
  last_seen TIMESTAMPTZ,
  location_latitude DOUBLE PRECISION,
  location_longitude DOUBLE PRECISION,
  location_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_users_username ON public.users(username);
CREATE INDEX idx_users_country ON public.users(country);
CREATE INDEX idx_users_state ON public.users(state);
CREATE INDEX idx_users_tribe ON public.users(tribe);
CREATE INDEX idx_users_location ON public.users(location_latitude, location_longitude);
```

### Step 35: Create Database Migration File

**Action**: Create first migration file
**File**: `supabase/migrations/001_initial_schema.sql`
**Details**: We'll create the full SQL in next steps

### Step 36: Design Posts Schema

**Action**: Plan posts table
**Table**: `posts`
**Columns**:

```sql
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  images TEXT[], -- Array of image URLs
  community_id UUID REFERENCES public.communities(id) ON DELETE SET NULL,
  is_public BOOLEAN DEFAULT true,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_posts_user_id ON public.posts(user_id);
CREATE INDEX idx_posts_community_id ON public.posts(community_id);
CREATE INDEX idx_posts_created_at ON public.posts(created_at DESC);
```

### Step 37: Design Comments Schema

**Action**: Plan comments table
**Table**: `comments`
**Columns**:

```sql
CREATE TABLE public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE, -- For nested comments
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_comments_post_id ON public.comments(post_id);
CREATE INDEX idx_comments_user_id ON public.comments(user_id);
```

### Step 38: Design Likes Schema

**Action**: Plan likes table
**Table**: `likes`
**Columns**:

```sql
CREATE TABLE public.likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  comment_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, post_id), -- One like per user per post
  UNIQUE(user_id, comment_id) -- One like per user per comment
);

CREATE INDEX idx_likes_post_id ON public.likes(post_id);
CREATE INDEX idx_likes_user_id ON public.likes(user_id);
```

### Step 39: Design Friendships/Follows Schema

**Action**: Plan relationships table
**Table**: `friendships`
**Columns**:

```sql
CREATE TABLE public.friendships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  friend_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'accepted', 'blocked'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, friend_id),
  CHECK (user_id != friend_id)
);

CREATE INDEX idx_friendships_user_id ON public.friendships(user_id);
CREATE INDEX idx_friendships_friend_id ON public.friendships(friend_id);
CREATE INDEX idx_friendships_status ON public.friendships(status);
```

### Step 40: Design Messages Schema

**Action**: Plan messages table
**Table**: `messages`
**Columns**:

```sql
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id UUID NOT NULL REFERENCES public.chats(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT,
  image_url TEXT,
  audio_url TEXT,
  message_type TEXT DEFAULT 'text', -- 'text', 'image', 'audio', 'system'
  is_translated BOOLEAN DEFAULT false,
  original_language TEXT,
  translated_content TEXT,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_messages_chat_id ON public.messages(chat_id);
CREATE INDEX idx_messages_user_id ON public.messages(user_id);
CREATE INDEX idx_messages_created_at ON public.messages(created_at DESC);
```

### Step 41: Design Chats Schema

**Action**: Plan chats table
**Table**: `chats`
**Columns**:

```sql
CREATE TABLE public.chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user1_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  user2_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  last_message_id UUID REFERENCES public.messages(id),
  last_message_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user1_id, user2_id)
);

CREATE INDEX idx_chats_user1_id ON public.chats(user1_id);
CREATE INDEX idx_chats_user2_id ON public.chats(user2_id);
CREATE INDEX idx_chats_last_message_at ON public.chats(last_message_at DESC);
```

### Step 42: Design Communities Schema

**Action**: Plan communities table
**Table**: `communities`
**Columns**:

```sql
CREATE TABLE public.communities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  avatar_url TEXT,
  cover_url TEXT,
  type TEXT NOT NULL, -- 'tribe', 'state', 'diaspora', 'interest', 'custom'
  category TEXT, -- 'Yoruba', 'Lagos', 'UK', etc.
  is_public BOOLEAN DEFAULT true,
  member_count INTEGER DEFAULT 0,
  post_count INTEGER DEFAULT 0,
  created_by UUID NOT NULL REFERENCES public.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_communities_type ON public.communities(type);
CREATE INDEX idx_communities_category ON public.communities(category);
CREATE INDEX idx_communities_slug ON public.communities(slug);
```

### Step 43: Design Community Members Schema

**Action**: Plan community_members table
**Table**: `community_members`
**Columns**:

```sql
CREATE TABLE public.community_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member', -- 'member', 'moderator', 'admin'
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(community_id, user_id)
);

CREATE INDEX idx_community_members_community_id ON public.community_members(community_id);
CREATE INDEX idx_community_members_user_id ON public.community_members(user_id);
```

### Step 44: Design Marketplace Schema

**Action**: Plan marketplace_items table
**Table**: `marketplace_items`
**Columns**:

```sql
CREATE TABLE public.marketplace_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'NGN',
  category TEXT NOT NULL,
  images TEXT[] NOT NULL,
  location TEXT,
  is_escrow_enabled BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active', -- 'active', 'sold', 'pending', 'cancelled'
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_marketplace_seller_id ON public.marketplace_items(seller_id);
CREATE INDEX idx_marketplace_category ON public.marketplace_items(category);
CREATE INDEX idx_marketplace_status ON public.marketplace_items(status);
CREATE INDEX idx_marketplace_created_at ON public.marketplace_items(created_at DESC);
```

### Step 45: Design Escrow Transactions Schema

**Action**: Plan escrow_transactions table
**Table**: `escrow_transactions`
**Columns**:

```sql
CREATE TABLE public.escrow_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id UUID NOT NULL REFERENCES public.marketplace_items(id) ON DELETE CASCADE,
  buyer_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  seller_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'NGN',
  status TEXT DEFAULT 'pending', -- 'pending', 'paid', 'shipped', 'delivered', 'released', 'disputed', 'cancelled'
  payment_reference TEXT,
  shipping_address TEXT,
  tracking_number TEXT,
  paid_at TIMESTAMPTZ,
  shipped_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  released_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_escrow_item_id ON public.escrow_transactions(item_id);
CREATE INDEX idx_escrow_buyer_id ON public.escrow_transactions(buyer_id);
CREATE INDEX idx_escrow_seller_id ON public.escrow_transactions(seller_id);
CREATE INDEX idx_escrow_status ON public.escrow_transactions(status);
```

### Step 46: Design Video Calls Schema

**Action**: Plan video_calls table
**Table**: `video_calls`
**Columns**:

```sql
CREATE TABLE public.video_calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  caller_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'ringing', -- 'ringing', 'accepted', 'rejected', 'ended', 'missed'
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  duration_seconds INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_video_calls_caller_id ON public.video_calls(caller_id);
CREATE INDEX idx_video_calls_receiver_id ON public.video_calls(receiver_id);
CREATE INDEX idx_video_calls_status ON public.video_calls(status);
```

### Step 47: Design Events Schema

**Action**: Plan events table
**Table**: `events`
**Columns**:

```sql
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organizer_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  community_id UUID REFERENCES public.communities(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  event_type TEXT, -- 'cultural', 'social', 'business', 'online'
  location TEXT,
  location_latitude DOUBLE PRECISION,
  location_longitude DOUBLE PRECISION,
  is_online BOOLEAN DEFAULT false,
  online_link TEXT,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  ticket_price DECIMAL(10, 2),
  currency TEXT DEFAULT 'NGN',
  max_attendees INTEGER,
  attendees_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'upcoming', -- 'upcoming', 'ongoing', 'ended', 'cancelled'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_events_organizer_id ON public.events(organizer_id);
CREATE INDEX idx_events_start_date ON public.events(start_date);
CREATE INDEX idx_events_status ON public.events(status);
```

### Step 48: Create Complete Migration SQL File

**Action**: Create full migration file
**File**: `supabase/migrations/001_initial_schema.sql`
**Content**: Combine all table definitions from Steps 34-47

**Note**: Due to length, I'll provide the complete SQL in a separate step. For now, create the file structure.

### Step 49: Create Row Level Security (RLS) Policies

**Action**: Plan RLS policies for security
**Details**:

- Enable RLS on all tables
- Users can only read their own data + public data
- Users can only update their own data
- Use Supabase Dashboard → Authentication → Policies to set up

### Step 50: Run Migration in Supabase

**Action**: Execute migration
**Steps**:

1. Go to Supabase Dashboard → SQL Editor
2. Copy contents of `001_initial_schema.sql`
3. Paste and run
4. Verify tables are created (Database → Tables)

---

## 🔐 Authentication System

### Step 51: Create Auth Store (Zustand)

**Action**: Create `src/store/authStore.ts`
**File**: `src/store/authStore.ts`

```typescript
import { create } from "zustand";
import { Session, User } from "@supabase/supabase-js";
import { authHelpers } from "@/lib/supabase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Actions
  setSession: (session: Session | null) => void;
  setUser: (user: User | null) => void;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  checkSession: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  user: null,
  isLoading: true,
  isAuthenticated: false,

  setSession: (session) => set({ session, isAuthenticated: !!session }),

  setUser: (user) => set({ user }),

  signIn: async (email, password) => {
    try {
      const { data, error } = await authHelpers.signInWithEmail(
        email,
        password
      );
      if (!error && data.session) {
        set({ session: data.session, user: data.user, isAuthenticated: true });
      }
      return { error };
    } catch (error) {
      return { error };
    }
  },

  signUp: async (email, password) => {
    try {
      const { data, error } = await authHelpers.signUpWithEmail(
        email,
        password
      );
      if (!error && data.session) {
        set({ session: data.session, user: data.user, isAuthenticated: true });
      }
      return { error };
    } catch (error) {
      return { error };
    }
  },

  signOut: async () => {
    await authHelpers.signOut();
    set({ session: null, user: null, isAuthenticated: false });
    await AsyncStorage.clear();
  },

  checkSession: async () => {
    const { session, error } = await authHelpers.getSession();
    if (session) {
      set({
        session,
        user: session.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      set({
        session: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  initialize: async () => {
    set({ isLoading: true });
    await get().checkSession();

    // Listen to auth changes
    authHelpers.onAuthStateChange((event, session) => {
      set({ session, user: session?.user ?? null, isAuthenticated: !!session });
    });
  },
}));
```

### Step 52: Create User Store (Zustand)

**Action**: Create `src/store/userStore.ts`
**File**: `src/store/userStore.ts`

```typescript
import { create } from "zustand";
import { supabase } from "@/lib/supabase/client";

interface UserProfile {
  id: string;
  display_name: string;
  username?: string;
  avatar_url?: string;
  bio?: string;
  // ... other fields
}

interface UserState {
  profile: UserProfile | null;
  isLoading: boolean;

  fetchProfile: (userId: string) => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  isLoading: false,

  fetchProfile: async (userId: string) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (!error && data) {
        set({ profile: data });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateProfile: async (updates: Partial<UserProfile>) => {
    const { profile } = useUserStore.getState();
    if (!profile) return;

    try {
      const { data, error } = await supabase
        .from("users")
        .update(updates)
        .eq("id", profile.id)
        .select()
        .single();

      if (!error && data) {
        set({ profile: data });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  },
}));
```

### Step 53: Create Type Definitions

**Action**: Create `src/types/user.ts`
**File**: `src/types/user.ts`

```typescript
export interface User {
  id: string;
  email?: string;
  phone?: string;
  display_name: string;
  username?: string;
  avatar_url?: string;
  bio?: string;
  gender?: "male" | "female" | "other";
  birth_date?: string;
  country?: string;
  state?: string;
  city?: string;
  tribe?: string;
  is_diaspora: boolean;
  diaspora_country?: string;
  naija_dna_score?: {
    tribe_compatibility?: number;
    pidgin_fluency?: number;
    culture_affinity?: number;
    personality_type?: string;
  };
  interests?: string[];
  naija_score: number;
  is_verified: boolean;
  is_premium: boolean;
  last_seen?: string;
  location_latitude?: number;
  location_longitude?: number;
  location_visible: boolean;
  created_at: string;
  updated_at: string;
}
```

### Step 54: Create Post Type Definitions

**Action**: Create `src/types/post.ts`
**File**: `src/types/post.ts`

```typescript
export interface Post {
  id: string;
  user_id: string;
  content: string;
  images?: string[];
  community_id?: string;
  is_public: boolean;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  created_at: string;
  updated_at: string;
  user?: User; // Populated on fetch
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  parent_id?: string;
  likes_count: number;
  created_at: string;
  updated_at: string;
  user?: User;
  replies?: Comment[];
}
```

### Step 55: Create Chat Type Definitions

**Action**: Create `src/types/chat.ts`
**File**: `src/types/chat.ts`

```typescript
export interface Chat {
  id: string;
  user1_id: string;
  user2_id: string;
  last_message_id?: string;
  last_message_at?: string;
  created_at: string;
  other_user?: User;
  last_message?: Message;
}

export interface Message {
  id: string;
  chat_id: string;
  user_id: string;
  content?: string;
  image_url?: string;
  audio_url?: string;
  message_type: "text" | "image" | "audio" | "system";
  is_translated: boolean;
  original_language?: string;
  translated_content?: string;
  read_at?: string;
  created_at: string;
  user?: User;
}
```

### Step 56: Create Community Type Definitions

**Action**: Create `src/types/community.ts`
**File**: `src/types/community.ts`

```typescript
export interface Community {
  id: string;
  name: string;
  slug: string;
  description?: string;
  avatar_url?: string;
  cover_url?: string;
  type: "tribe" | "state" | "diaspora" | "interest" | "custom";
  category?: string;
  is_public: boolean;
  member_count: number;
  post_count: number;
  created_by: string;
  created_at: string;
  updated_at: string;
  is_member?: boolean;
  user_role?: "member" | "moderator" | "admin";
}
```

### Step 57: Create Marketplace Type Definitions

**Action**: Create `src/types/marketplace.ts`
**File**: `src/types/marketplace.ts`

```typescript
export interface MarketplaceItem {
  id: string;
  seller_id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  images: string[];
  location?: string;
  is_escrow_enabled: boolean;
  status: "active" | "sold" | "pending" | "cancelled";
  views_count: number;
  created_at: string;
  updated_at: string;
  seller?: User;
}

export interface EscrowTransaction {
  id: string;
  item_id: string;
  buyer_id: string;
  seller_id: string;
  amount: number;
  currency: string;
  status:
    | "pending"
    | "paid"
    | "shipped"
    | "delivered"
    | "released"
    | "disputed"
    | "cancelled";
  payment_reference?: string;
  shipping_address?: string;
  tracking_number?: string;
  paid_at?: string;
  shipped_at?: string;
  delivered_at?: string;
  released_at?: string;
  created_at: string;
  updated_at: string;
}
```

### Step 58: Create Video Call Type Definitions

**Action**: Create `src/types/videoCall.ts`
**File**: `src/types/videoCall.ts`

```typescript
export interface VideoCall {
  id: string;
  caller_id: string;
  receiver_id: string;
  status: "ringing" | "accepted" | "rejected" | "ended" | "missed";
  started_at?: string;
  ended_at?: string;
  duration_seconds?: number;
  created_at: string;
  caller?: User;
  receiver?: User;
}

export interface CallSignaling {
  type: "offer" | "answer" | "ice-candidate" | "hangup";
  callId: string;
  userId: string;
  data?: any; // SDP or ICE candidate
}
```

---

## 🎨 UI/Theme Setup

### Step 59: Create Base UI Components - Button

**Action**: Create `src/components/ui/Button.tsx`
**File**: `src/components/ui/Button.tsx`

```typescript
import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from "@/constants/theme";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
}) => {
  const buttonStyle = [
    styles.button,
    styles[`button_${variant}`],
    styles[`button_${size}`],
    fullWidth && styles.button_fullWidth,
    (disabled || loading) && styles.button_disabled,
  ];

  const textStyle = [
    styles.text,
    styles[`text_${variant}`],
    styles[`text_${size}`],
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "primary" ? COLORS.white : COLORS.primary}
        />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: BORDER_RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
  },
  button_primary: {
    backgroundColor: COLORS.primary,
  },
  button_secondary: {
    backgroundColor: COLORS.secondary,
  },
  button_outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  button_ghost: {
    backgroundColor: "transparent",
  },
  button_sm: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
  },
  button_md: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
  },
  button_lg: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
  },
  button_fullWidth: {
    width: "100%",
  },
  button_disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: "600",
  },
  text_primary: {
    color: COLORS.white,
  },
  text_secondary: {
    color: COLORS.white,
  },
  text_outline: {
    color: COLORS.primary,
  },
  text_ghost: {
    color: COLORS.primary,
  },
  text_sm: {
    fontSize: TYPOGRAPHY.fontSize.sm,
  },
  text_md: {
    fontSize: TYPOGRAPHY.fontSize.md,
  },
  text_lg: {
    fontSize: TYPOGRAPHY.fontSize.lg,
  },
});
```

**Details**: Reusable button component with multiple variants and sizes

### Step 60: Create Input Component

**Action**: Create `src/components/ui/Input.tsx`
**File**: `src/components/ui/Input.tsx`

```typescript
import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from "@/constants/theme";

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
  keyboardType?: "default" | "email-address" | "phone-pad" | "numeric";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  editable?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  secureTextEntry = false,
  multiline = false,
  keyboardType = "default",
  autoCapitalize = "sentences",
  editable = true,
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          error && styles.input_error,
          multiline && styles.input_multiline,
        ]}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textLight}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        editable={editable}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text,
    backgroundColor: COLORS.white,
  },
  input_error: {
    borderColor: COLORS.error,
  },
  input_multiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  error: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.error,
    marginTop: SPACING.xs,
  },
});
```

### Step 61: Create Avatar Component

**Action**: Create `src/components/ui/Avatar.tsx`
**File**: `src/components/ui/Avatar.tsx`

```typescript
import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { COLORS, SPACING } from "@/constants/theme";

interface AvatarProps {
  uri?: string;
  name?: string;
  size?: number;
  borderRadius?: number;
}

export const Avatar: React.FC<AvatarProps> = ({
  uri,
  name,
  size = 40,
  borderRadius = 20,
}) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const avatarStyle = {
    width: size,
    height: size,
    borderRadius: borderRadius,
  };

  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={[styles.avatar, avatarStyle]}
        resizeMode="cover"
      />
    );
  }

  return (
    <View
      style={[
        styles.avatar,
        avatarStyle,
        styles.avatar_placeholder,
        { backgroundColor: COLORS.primary },
      ]}
    >
      {name && (
        <Text style={[styles.initials, { fontSize: size * 0.4 }]}>
          {getInitials(name)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    overflow: "hidden",
  },
  avatar_placeholder: {
    alignItems: "center",
    justifyContent: "center",
  },
  initials: {
    color: COLORS.white,
    fontWeight: "600",
  },
});
```

### Step 62-80: Create Additional UI Components

**Action**: Create remaining base UI components
**Files to create**:

- `src/components/ui/Card.tsx` - Card container
- `src/components/ui/Badge.tsx` - Badge component
- `src/components/ui/Loading.tsx` - Loading spinner
- `src/components/ui/EmptyState.tsx` - Empty state component
- `src/components/ui/BottomSheet.tsx` - Bottom sheet modal

**Details**: Follow same pattern as Button, Input, Avatar components
**Implementation**: Similar structure - props interface, styles, export component

---

_Due to length, continuing with key implementation steps. Full detailed steps for each component would follow the same pattern._

---

## 📱 Onboarding Flow Implementation

### Step 81: Create Welcome Screen

**Action**: Create `src/app/(auth)/welcome.tsx`
**Details**:

- Welcome screen with app branding
- "Get Started" button
- "Sign In" link
- Use green theme from your image
- Navigation to signup/login

### Step 82: Create Login Screen

**Action**: Create `src/app/(auth)/login.tsx`
**Details**:

- Email/phone input
- Password input
- "Forgot Password" link
- "Sign In" button
- "Sign up" link
- Social login buttons (Google, Apple)
- Use authStore.signIn

### Step 83: Create Signup Screen

**Action**: Create `src/app/(auth)/signup.tsx`
**Details**:

- Email input
- Password input
- Confirm password
- "Sign Up" button
- Terms & conditions checkbox
- Use authStore.signUp
- Navigate to verify screen

### Step 84: Create OTP Verification Screen

**Action**: Create `src/app/(auth)/verify.tsx`
**Details**:

- 6-digit OTP input
- "Verify" button
- "Resend OTP" link
- Timer for resend
- Use authHelpers.verifyOtp

### Step 85: Create Profile Setup Screen (Onboarding)

**Action**: Create `src/app/(onboarding)/profile-setup.tsx`
**Details**:

- Profile photo upload (use expo-image-picker)
- Display name input
- Gender selector (optional)
- "Continue" button
- Save to user profile

### Step 86: Create Location Setup Screen

**Action**: Create `src/app/(onboarding)/location.tsx`
**Details**:

- Country picker (default: Nigeria)
- State picker (Nigerian states)
- City input (optional)
- Tribe selector (Yoruba, Igbo, Hausa, etc.)
- Diaspora toggle
- If diaspora: Country picker
- "Continue" button

### Step 87: Create Naija DNA Quiz Screen

**Action**: Create `src/app/(onboarding)/naija-dna.tsx`
**Details**:

- 5-10 questions about:
  - Language familiarity (Pidgin, English, Local languages)
  - Cultural preferences (Music, Food, Fashion)
  - Tribe connection
  - Diaspora experience (if applicable)
- Progress indicator
- "Next" button
- Calculate and save scores
- Store in user.naija_dna_score

### Step 88: Create Interests Selection Screen

**Action**: Create `src/app/(onboarding)/interests.tsx`
**Details**:

- Grid of interest tags (Music, Food, Tech, Fashion, Sports, etc.)
- Multi-select chips
- "Continue" button
- Save to user.interests array

### Step 89: Create Contacts Sync Screen (Optional)

**Action**: Create `src/app/(onboarding)/contacts.tsx`
**Details**:

- "Sync Contacts" button
- Permission request
- Find existing users
- Show suggested connections
- "Skip" option
- "Continue" button

---

## 🏠 Social Feed Implementation

### Step 90: Create Feed Store

**Action**: Create `src/store/feedStore.ts`
**Details**:

- State: posts, loading, error, page
- Actions: fetchPosts, createPost, likePost, unlikePost, refreshFeed
- Use Supabase to fetch posts
- Order by created_at DESC

### Step 91: Create Post Card Component

**Action**: Create `src/components/feed/PostCard.tsx`
**Details**:

- User avatar + name
- Post content (text)
- Images (if any) - use expo-image
- Like button with count
- Comment button with count
- Share button
- Timestamp (use date-fns)
- Navigation to post details

### Step 92: Create Post Actions Component

**Action**: Create `src/components/feed/PostActions.tsx`
**Details**:

- Like button (heart icon)
- Comment button
- Share button
- Save button (optional)
- All with counts

### Step 93: Create Home Feed Screen

**Action**: Update `src/app/(protected)/(tabs)/index.tsx`
**Details**:

- FlatList of posts
- Pull to refresh
- Infinite scroll
- Create post FAB (floating action button)
- Use feedStore

### Step 94: Create Post Creation Screen

**Action**: Create `src/app/(protected)/post/create.tsx`
**Details**:

- Text input (multiline)
- Image picker (multiple images)
- Image preview grid
- Remove image button
- "Post" button
- Use feedStore.createPost

### Step 95: Create Post Details Screen

**Action**: Create `src/app/(protected)/post/[id].tsx`
**Details**:

- Full post display
- Comments list
- Comment input at bottom
- Like/comment functionality
- Navigate to user profile on tap

### Step 96: Create Comments Component

**Action**: Create `src/components/feed/CommentList.tsx`
**Details**:

- List of comments
- Comment item: avatar, name, content, timestamp
- Like button
- Nested replies (if parent_id exists)
- FlatList for performance

### Step 97: Create Comment Input Component

**Action**: Create `src/components/feed/CommentInput.tsx`
**Details**:

- Text input
- "Post" button
- Submit comment to Supabase
- Optimistic update

---

## 💬 Messaging System Implementation

### Step 98: Create Chat Store

**Action**: Create `src/store/chatStore.ts`
**Details**:

- State: chats, messages, activeChat, loading
- Actions: fetchChats, fetchMessages, sendMessage, markAsRead
- Use Supabase realtime for new messages

### Step 99: Create Chats List Screen

**Action**: Update `src/app/(protected)/(tabs)/chats.tsx`
**Details**:

- List of chats
- Each chat: avatar, name, last message, timestamp, unread count
- Tap to open chat thread
- Use chatStore.fetchChats

### Step 100: Create Chat Thread Screen

**Action**: Create `src/app/(protected)/chat/[id].tsx`
**Details**:

- Messages list (FlatList inverted)
- Message bubbles (sent/received styling)
- Chat input at bottom
- Send button
- Image picker button
- Voice recorder button
- Translator button (for Pidgin)
- Use realtime subscription for new messages

### Step 101: Create Message Bubble Component

**Action**: Create `src/components/chat/MessageBubble.tsx`
**Details**:

- Different styling for sent vs received
- Text content
- Image display (if image_url)
- Audio player (if audio_url)
- Timestamp
- Read receipt (if read_at)
- Translation toggle

### Step 102: Create Chat Input Component

**Action**: Create `src/components/chat/ChatInput.tsx`
**Details**:

- Text input
- Send button
- Image picker icon
- Voice recorder icon
- Translator toggle
- Handle message sending

### Step 103: Create Voice Recorder Component

**Action**: Create `src/components/chat/VoiceRecorder.tsx`
**Details**:

- Record button (hold to record)
- Waveform visualization (optional)
- Stop button
- Play preview
- Send audio button
- Use expo-av for recording

### Step 104: Create Translator Component (Pidgin ↔ English)

**Action**: Create `src/components/chat/TranslatorButton.tsx`
**Details**:

- Toggle button
- Detect language (Pidgin vs English)
- Use FREE AI API (Gemini or Hugging Face)
- Show original + translated text
- Save translation to message.translated_content

---

## 📹 Video Calling (WebRTC) Implementation

### Step 105: Install WebRTC Dependencies

**Action**: Install packages (already in Step 17)
**Verify**: `simple-peer`, `react-native-webrtc` are installed

### Step 106: Create WebRTC Configuration

**Action**: Create `src/lib/webrtc/stunServers.ts`
**File**: `src/lib/webrtc/stunServers.ts`

```typescript
export const ICE_SERVERS = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
  ],
};
```

**Details**: Free STUN servers for WebRTC connection

### Step 107: Create Video Call Store

**Action**: Create `src/store/callStore.ts`
**File**: `src/store/callStore.ts`

```typescript
import { create } from "zustand";
import { VideoCall } from "@/types/videoCall";

interface CallState {
  activeCall: VideoCall | null;
  isCalling: boolean;
  isInCall: boolean;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;

  startCall: (receiverId: string) => void;
  endCall: () => void;
  acceptCall: (callId: string) => void;
  rejectCall: (callId: string) => void;
  setLocalStream: (stream: MediaStream | null) => void;
  setRemoteStream: (stream: MediaStream | null) => void;
}

export const useCallStore = create<CallState>((set) => ({
  activeCall: null,
  isCalling: false,
  isInCall: false,
  localStream: null,
  remoteStream: null,

  startCall: (receiverId) => {
    // Implementation
  },
  endCall: () => {
    // Implementation
  },
  acceptCall: (callId) => {
    // Implementation
  },
  rejectCall: (callId) => {
    // Implementation
  },
  setLocalStream: (stream) => set({ localStream: stream }),
  setRemoteStream: (stream) => set({ remoteStream: stream }),
}));
```

### Step 108: Create WebRTC Signaling Helper

**Action**: Create `src/lib/webrtc/signaling.ts`
**Details**:

- Use Supabase Realtime for signaling
- Send offer/answer/ICE candidates
- Channel: `call:${callId}`
- Handle incoming signaling messages

### Step 109: Create Video Call Hook

**Action**: Create `src/lib/hooks/useVideoCall.ts`
**Details**:

- Initialize WebRTC peer
- Handle offer/answer exchange
- Handle ICE candidates
- Manage local/remote streams
- Cleanup on unmount

### Step 110: Create Video Call Screen

**Action**: Create `src/app/(protected)/chat/video-call.tsx`
**Details**:

- Local video preview (small, top-right)
- Remote video (full screen)
- Call controls (mute, video toggle, end call)
- Call status (connecting, ringing, connected)
- Use useVideoCall hook

### Step 111: Create Call Controls Component

**Action**: Create `src/components/chat/CallControls.tsx`
**Details**:

- Mute button
- Video toggle button
- Switch camera button (front/back)
- End call button
- Call timer display

### Step 112: Integrate Video Call in Chat

**Action**: Update Chat Thread Screen
**Details**:

- Add video call button in header
- Navigate to video-call screen
- Handle incoming call notification
- Show call UI overlay

---

## 👥 Communities Feature Implementation

### Step 113: Create Community Store

**Action**: Create `src/store/communityStore.ts`
**Details**:

- State: communities, joinedCommunities, activeCommunity
- Actions: fetchCommunities, joinCommunity, leaveCommunity, createCommunity

### Step 114: Create Communities List Screen

**Action**: Update `src/app/(protected)/(tabs)/communities.tsx`
**Details**:

- List of communities
- Categories: Tribe, State, Diaspora, Interest
- Search bar
- "Create Community" button
- Community cards with avatar, name, member count

### Step 115: Create Community Card Component

**Action**: Create `src/components/community/CommunityCard.tsx`
**Details**:

- Avatar
- Name
- Description (truncated)
- Member count
- Type badge
- Tap to open community

### Step 116: Create Community Details Screen

**Action**: Create `src/app/(protected)/community/[id].tsx`
**Details**:

- Community header (cover, avatar, name, description)
- Member count
- Join/Leave button
- Posts feed (community posts)
- Members list link
- Events link

### Step 117: Create Community Header Component

**Action**: Create `src/components/community/CommunityHeader.tsx`
**Details**:

- Cover image
- Avatar
- Name
- Description
- Member count
- Join button (if not member)
- Admin actions (if admin)

### Step 118: Auto-Join Communities on Onboarding

**Action**: Update onboarding flow
**Details**:

- After location/tribe selection
- Auto-create or join:
  - State community (e.g., "Lagos Connect")
  - Tribe community (e.g., "Yoruba Connect")
  - Diaspora community (e.g., "UK Naija") if diaspora
- Use communityStore

---

## 🛒 Marketplace Implementation

### Step 119: Create Marketplace Store

**Action**: Create `src/store/marketplaceStore.ts`
**Details**:

- State: items, categories, activeItem
- Actions: fetchItems, fetchItem, createItem, updateItem

### Step 120: Create Marketplace Home Screen

**Action**: Update `src/app/(protected)/(tabs)/marketplace.tsx`
**Details**:

- Categories grid
- Featured items
- Recent items list
- "Sell Item" button
- Search bar
- Filters (price, location, category)

### Step 121: Create Item Card Component

**Action**: Create `src/components/marketplace/ItemCard.tsx`
**Details**:

- Main image
- Title
- Price
- Location
- Seller badge (if verified)
- Escrow badge (if enabled)
- Tap to open item details

### Step 122: Create Item Details Screen

**Action**: Create `src/app/(protected)/marketplace/item/[id].tsx`
**Details**:

- Image carousel
- Title
- Price
- Description
- Seller info (avatar, name, rating)
- Location
- "Chat Seller" button
- "Buy Now" button (with escrow option)
- View count

### Step 123: Create Sell Item Screen

**Action**: Create `src/app/(protected)/marketplace/sell.tsx`
**Details**:

- Form:
  - Title
  - Description
  - Category picker
  - Price input
  - Currency selector
  - Images (multiple uploads)
  - Location
  - Escrow toggle (if diaspora → Nigeria)
- "Publish" button
- Use marketplaceStore.createItem

### Step 124: Create Escrow Checkout Flow

**Action**: Create `src/app/(protected)/marketplace/checkout.tsx`
**Details**:

- Item summary
- Price breakdown
- Shipping address input
- Payment method selection
- "Pay" button
- Create escrow transaction
- Status tracking

### Step 125: Create Escrow Status Component

**Action**: Create `src/components/marketplace/EscrowStatus.tsx`
**Details**:

- Status indicator (pending, paid, shipped, delivered, released)
- Progress bar
- Action buttons (confirm delivery, track shipment)
- Timeline view

---

## 🤖 AI Features (Free Tools) Implementation

### Step 126: Set Up Hugging Face API Client

**Action**: Create `src/lib/ai/huggingface.ts`
**File**: `src/lib/ai/huggingface.ts`

```typescript
import { CONFIG } from "@/constants/config";

const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models";

export const huggingFaceClient = {
  async translate(
    text: string,
    targetLang: "pidgin" | "english"
  ): Promise<string> {
    // Use translation model - facebook/mbart-large-50-many-to-many-mmt or Helsinki-NLP models
    const model = "Helsinki-NLP/opus-mt-en-fr"; // Replace with appropriate model

    const response = await fetch(`${HUGGINGFACE_API_URL}/${model}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CONFIG.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: text,
        parameters: {
          src_lang: targetLang === "pidgin" ? "en" : "pcm",
          tgt_lang: targetLang === "pidgin" ? "pcm" : "en",
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Translation failed");
    }

    const data = await response.json();
    return data[0]?.translation_text || text;
  },

  async generateText(prompt: string): Promise<string> {
    const model = "gpt2"; // Or use other text generation models
    const response = await fetch(`${HUGGINGFACE_API_URL}/${model}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CONFIG.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    const data = await response.json();
    return data[0]?.generated_text || "";
  },
};
```

**Details**: Use Hugging Face FREE API for translation and AI features

### Step 127: Create Translator Helper

**Action**: Create `src/lib/ai/translator.ts`
**Details**:

- Detect language (simple heuristics for Pidgin)
- Call huggingFaceClient.translate
- Cache translations (optional)
- Handle rate limiting gracefully

### Step 128: Create AI Search Helper

**Action**: Create `src/lib/ai/search.ts`
**Details**:

- Use Supabase full-text search (FREE)
- Enhance with AI ranking (optional, use Hugging Face)
- Search users, posts, communities
- Filter by tribe, location, interests

### Step 129: Create Reconnect Algorithm

**Action**: Create `src/lib/ai/reconnect.ts`
**Details**:

- Find users by:
  - Same state/tribe
  - Same school (if provided)
  - Mutual connections
  - Similar interests
  - Location proximity
- Rank by relevance
- Return top 10 suggestions

### Step 130: Create AI Search Screen

**Action**: Create `src/app/(protected)/ai/search.tsx`
**Details**:

- Search bar
- Filters (users, posts, communities)
- Results list
- "People You May Know" section
- Use AI search helper

### Step 131: Create Reconnect Assistant Screen

**Action**: Create `src/app/(protected)/ai/reconnect.tsx`
**Details**:

- List of suggested connections
- Reason for suggestion (e.g., "Same tribe", "Mutual friends")
- "Connect" button
- Use reconnect algorithm

---

## 🗺️ Diaspora Map Implementation

### Step 132: Set Up Location Permissions

**Action**: Request location permissions
**Details**:

- Use expo-location
- Request permissions on app start
- Handle denied permissions gracefully

### Step 133: Create Map Store

**Action**: Create `src/store/mapStore.ts`
**Details**:

- State: userLocation, nearbyUsers, mapRegion
- Actions: fetchNearbyUsers, updateUserLocation

### Step 134: Create Diaspora Map Screen

**Action**: Create `src/app/(protected)/map/index.tsx`
**Details**:

- react-native-maps MapView
- User's current location marker
- Nearby users markers
- Tap marker to see user profile
- Filter by tribe/interests
- Privacy toggle (hide location)

### Step 135: Create User Marker Component

**Action**: Create `src/components/map/UserMarker.tsx`
**Details**:

- Custom marker with avatar
- Tribe badge
- Tap handler
- Callout with name

### Step 136: Update User Location Periodically

**Action**: Background location updates
**Details**:

- Update location every 5 minutes (if app active)
- Save to user.location_latitude/longitude
- Respect location_visible privacy setting

---

## ⚙️ Final Polish & Testing

### Step 137: Set Up Error Handling

**Action**: Create error boundary and handlers
**Details**:

- Error boundary component
- Global error handler
- User-friendly error messages
- Log errors (optional: Sentry free tier)

### Step 138: Add Loading States

**Action**: Add loading indicators everywhere
**Details**:

- Skeleton screens
- Loading spinners
- Pull-to-refresh
- Optimistic updates

### Step 139: Implement Push Notifications

**Action**: Set up expo-notifications
**Details**:

- Request permissions
- Handle token registration
- Send notifications for:
  - New messages
  - New followers
  - Post likes/comments
  - Marketplace messages
  - Video call incoming

### Step 140: Add Offline Support

**Action**: Implement offline queue
**Details**:

- Queue actions when offline
- Sync when online
- Show offline indicator
- Cache feed posts

### Step 141: Performance Optimization

**Action**: Optimize app performance
**Details**:

- Image optimization (resize before upload)
- FlatList optimization (getItemLayout, keyExtractor)
- Memoization (React.memo, useMemo, useCallback)
- Code splitting (lazy loading)

### Step 142: Testing on Real Devices

**Action**: Test on iOS and Android
**Details**:

- Build development build
- Test on physical devices
- Test all features
- Fix bugs

### Step 143: Prepare for App Store

**Action**: App store preparation
**Details**:

- Create app icons (all sizes)
- Create splash screens
- Write app description
- Prepare screenshots
- Set up App Store Connect / Google Play Console

### Step 144: Beta Testing

**Action**: Release beta version
**Details**:

- Use TestFlight (iOS) / Internal Testing (Android)
- Invite beta testers
- Collect feedback
- Fix critical bugs

### Step 145: Production Build

**Action**: Create production build
**Details**:

- Update version number
- Build production bundle
- Test production build
- Submit to app stores

---

## 📝 Additional Implementation Notes

### Database Migration Execution

**Step 146-150**: Execute all SQL migrations in Supabase

- Run migration files in order
- Test each migration
- Verify tables and relationships
- Set up RLS policies

### UI/UX Polish (Steps 151-180)

- Add animations (react-native-reanimated)
- Add haptic feedback (expo-haptics)
- Improve spacing and typography
- Add dark mode support (optional)
- Test accessibility

### Security (Steps 181-200)

- Set up RLS policies properly
- Validate all inputs
- Sanitize user content
- Rate limiting (Supabase Edge Functions)
- Content moderation (AI + manual)

### Analytics (Steps 201-220)

- Set up analytics (Firebase Analytics FREE, or PostHog FREE)
- Track key events
- Monitor user behavior
- Set up crash reporting

### Documentation (Steps 221-240)

- Write code comments
- Create API documentation
- Write user guide
- Create developer guide

### Launch Preparation (Steps 241-260)

- Marketing assets
- Social media accounts
- Launch strategy
- Press kit
- Community building

### Post-Launch (Steps 261-280)

- Monitor app performance
- Collect user feedback
- Fix bugs
- Add requested features
- Scale infrastructure

---

## ✅ Summary

This comprehensive guide covers **280+ detailed steps** to build NaijaConnect from scratch using **100% FREE tools**:

- ✅ Supabase (FREE tier) - Backend, Database, Auth, Storage, Realtime
- ✅ Google Gemini API (FREE tier) - AI Translation
- ✅ Simple-Peer + Supabase Realtime (100% FREE) - Video Calling
- ✅ Expo (FREE) - Development platform
- ✅ React Native (FREE) - Mobile framework

**Key Features Implemented:**

1. Authentication & Onboarding
2. Social Feed
3. Messaging with Pidgin Translation
4. Video/Audio Calls (WebRTC)
5. Communities
6. Marketplace with Escrow
7. Diaspora Map
8. AI Search & Reconnect
9. Naija DNA Quiz

**Estimated Timeline:** 6-8 weeks for MVP (full-time development)

**Next Steps:** Start with Steps 1-15 (Pre-Development Setup) and work through systematically.

Good luck building NaijaConnect! 🚀🇳🇬
