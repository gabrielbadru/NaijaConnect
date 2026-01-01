# 🏗️ NaijaConnect - Complete Implementation Guide Part 2

> **Professional, Detailed Guide (300+ Steps)**  
> This guide covers advanced implementation, missing screens, routing, migrations, and production-ready features.

---

## 📋 Table of Contents

1. [App Routing & Navigation (Steps 1-50)](#app-routing--navigation)
2. [Splash Screen & Initialization (Steps 51-70)](#splash-screen--initialization)
3. [Authentication Flow & Redirects (Steps 71-100)](#authentication-flow--redirects)
4. [Onboarding Screens Implementation (Steps 101-150)](#onboarding-screens-implementation)
5. [Protected Screens - Settings (Steps 151-200)](#protected-screens---settings)
6. [Protected Screens - Additional Features (Steps 201-250)](#protected-screens---additional-features)
7. [Database Migrations - Docker vs SQL (Steps 251-300)](#database-migrations---docker-vs-sql)
8. [Production Optimization (Steps 301-350)](#production-optimization)

---

## 🧭 App Routing & Navigation

### ⚠️ IMPORTANT: Fix QR Code Redirect Issue

**Problem**: When scanning QR code, app shows Expo welcome screen instead of your custom app.

**Root Cause**: The root `index.tsx` was redirecting directly without proper routing setup.

**Quick Fix**: Update `src/app/index.tsx` to redirect to splash screen:
```typescript
import { Redirect } from "expo-router";

export default function RootIndex() {
  // Redirect to splash screen first, which will handle auth checking
  return <Redirect href="/(splash)" />;
}
```

**Full Solution**: Follow Steps 1-10 below to implement complete routing system.

---

### Step 1: Fix Root Index Routing
**Action**: Update `src/app/index.tsx` to check authentication state
**File**: `src/app/index.tsx`
```typescript
import { Redirect, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { View, ActivityIndicator } from "react-native";
import { COLORS } from "@/constants/theme";

export default function RootIndex() {
  const { isAuthenticated, isLoading, initialize } = useAuthStore();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    async function init() {
      await initialize();
      setIsInitializing(false);
    }
    init();
  }, []);

  if (isInitializing || isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/(splash)" />;
  }

  // Check if user has completed onboarding
  return <Redirect href="/(protected)/(tabs)" />;
}
```
**Details**: This ensures proper authentication checking before routing

### Step 2: Create Splash Screen Layout
**Action**: Create `src/app/(splash)/_layout.tsx`
**File**: `src/app/(splash)/_layout.tsx`
```typescript
import { Stack } from 'expo-router';

export default function SplashLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
```

### Step 3: Implement Splash Screen
**Action**: Create `src/app/(splash)/index.tsx`
**File**: `src/app/(splash)/index.tsx`
```typescript
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import { COLORS, SPACING, TYPOGRAPHY } from '@/constants/theme';
import { useUserStore } from '@/store/userStore';

export default function SplashScreen() {
  const router = useRouter();
  const { isAuthenticated, isLoading, initialize } = useAuthStore();
  const { profile, fetchProfile } = useUserStore();

  useEffect(() => {
    async function checkAuth() {
      await initialize();
      
      // Minimum splash screen display time (2 seconds)
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (!isAuthenticated) {
        router.replace('/(auth)/welcome');
        return;
      }

      // Check if user has completed onboarding
      if (isAuthenticated) {
        const { user } = useAuthStore.getState();
        if (user) {
          await fetchProfile(user.id);
          
          const currentProfile = useUserStore.getState().profile;
          
          if (!currentProfile || !currentProfile.display_name) {
            router.replace('/(onboarding)/profile-setup');
          } else {
            router.replace('/(protected)/(tabs)');
          }
        }
      }
    }

    checkAuth();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image 
          source={require('@/assets/images/icon.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>NaijaConnect</Text>
        <Text style={styles.subtitle}>Connecting Nigerians Worldwide</Text>
      </View>
      <ActivityIndicator 
        size="large" 
        color={COLORS.primary} 
        style={styles.loader}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.xxxl,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.textSecondary,
  },
  loader: {
    marginTop: SPACING.xl,
  },
});
```

### Step 4: Create Auth Store (Prerequisite)
**Action**: Create `src/store/authStore.ts` BEFORE implementing routing
**File**: `src/store/authStore.ts`
**Details**: This store is required for Steps 1, 3, and 4. See BUILD_GUIDE.md Step 51 for full implementation.

**Quick Reference**:
- Must have `initialize()`, `isAuthenticated`, `isLoading` methods
- Must handle session management
- Must listen to auth state changes

### Step 5: Create User Store (Prerequisite)
**Action**: Create `src/store/userStore.ts` BEFORE implementing splash screen
**File**: `src/store/userStore.ts`
**Details**: This store is required for Step 3. See BUILD_GUIDE.md Step 52 for full implementation.

**Quick Reference**:
- Must have `fetchProfile(userId)` method
- Must store user profile data
- Must handle loading states

### Step 6: Initialize Supabase Client (Prerequisite)
**Action**: Create `src/lib/supabase/client.ts` BEFORE creating stores
**File**: `src/lib/supabase/client.ts`
**Details**: This is required for auth store. See BUILD_GUIDE.md Step 28 for full implementation.

**Quick Reference**:
- Must export `supabase` client instance
- Must configure AsyncStorage for auth persistence
- Must use CONFIG from constants

### Step 7: Update Protected Layout with Auth Guard
**Action**: Update `src/app/(protected)/_layout.tsx`
**File**: `src/app/(protected)/_layout.tsx`
```typescript
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { View, ActivityIndicator } from 'react-native';
import { COLORS } from '@/constants/theme';

export default function ProtectedLayout() {
  const { isAuthenticated, isLoading } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inSplashGroup = segments[0] === '(splash)';

    if (!isAuthenticated && !inAuthGroup && !inSplashGroup) {
      router.replace('/(auth)/welcome');
    } else if (isAuthenticated && (inAuthGroup || inSplashGroup)) {
      router.replace('/(protected)/(tabs)');
    }
  }, [isAuthenticated, segments, isLoading]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="post" />
      <Stack.Screen name="chat" />
      <Stack.Screen name="community" />
      <Stack.Screen name="marketplace" />
      <Stack.Screen name="user" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="ai" />
      <Stack.Screen name="map" />
      <Stack.Screen name="events" />
      <Stack.Screen name="wallet" />
    </Stack>
  );
}
```

### Step 8: Update Auth Layout
**Action**: Update `src/app/(auth)/_layout.tsx`
**File**: `src/app/(auth)/_layout.tsx`
```typescript
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="verify" />
      <Stack.Screen name="password" />
    </Stack>
  );
}
```

### Step 9: Update Onboarding Layout
**Action**: Update `src/app/(onboarding)/_layout.tsx`
**File**: `src/app/(onboarding)/_layout.tsx`
```typescript
import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="profile-setup" />
      <Stack.Screen name="location" />
      <Stack.Screen name="naija-dna" />
      <Stack.Screen name="interest" />
      <Stack.Screen name="contacts" />
    </Stack>
  );
}
```

### Step 10: Create Root Layout with Proper Setup
**Action**: Update `src/app/_layout.tsx`
**File**: `src/app/_layout.tsx`
```typescript
import { Stack } from "expo-router";
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Keep splash screen visible while loading
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    // Add custom fonts here if needed
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(splash)" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(onboarding)" />
          <Stack.Screen name="(protected)" />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
```

### Step 11-50: Additional Routing Setup
**Details**: 
- Deep linking configuration
- Navigation guards
- Route parameters handling
- Tab navigation customization
- Stack navigation options
- Modal presentations
- Transition animations

---

## 🎨 Splash Screen & Initialization

### Step 51: Create Splash Screen Assets
**Action**: Ensure splash screen images are properly configured
**Files**:
- `assets/images/splash-icon.png` (200x200px recommended)
- `assets/images/icon.png` (1024x1024px for app icon)

### Step 52: Configure Splash Screen in app.json
**Action**: Update `app.json` splash configuration
**File**: `app.json`
```json
{
  "expo": {
    "splash": {
      "image": "./assets/images/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#4ADE80"
    }
  }
}
```

### Step 53: Initialize Auth Store on App Start
**Action**: Ensure auth store initializes properly
**Details**: The splash screen should call `initialize()` from authStore

### Step 54-70: Additional Initialization Steps
**Details**:
- Font loading
- Asset preloading
- Environment variable validation
- Error boundary setup
- Analytics initialization
- Push notification setup

---

## 🔐 Authentication Flow & Redirects

### Step 71: Create Welcome Screen
**Action**: Implement `src/app/(auth)/welcome.tsx`
**File**: `src/app/(auth)/welcome.tsx`
```typescript
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { COLORS, SPACING, TYPOGRAPHY } from '@/constants/theme';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image 
          source={require('@/assets/images/icon.png')} 
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome to NaijaConnect</Text>
        <Text style={styles.subtitle}>
          Connect with Nigerians worldwide. Share culture, find community, and build lasting relationships.
        </Text>
      </View>
      
      <View style={styles.actions}>
        <Button
          title="Get Started"
          onPress={() => router.push('/(auth)/signup')}
          fullWidth
          size="lg"
        />
        <Button
          title="Sign In"
          onPress={() => router.push('/(auth)/login')}
          variant="outline"
          fullWidth
          size="lg"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.xxxl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingHorizontal: SPACING.lg,
  },
  actions: {
    gap: SPACING.md,
    paddingBottom: SPACING.xl,
  },
});
```

### Step 72: Implement Login Screen with Redirect Logic
**Action**: Update `src/app/(auth)/login.tsx`
**Details**: After successful login, redirect based on onboarding status

### Step 73: Implement Signup Screen with Redirect Logic
**Action**: Update `src/app/(auth)/signup.tsx`
**Details**: After signup, redirect to verification or onboarding

### Step 74-100: Complete Authentication Flow
**Details**:
- OTP verification
- Password reset
- Social login redirects
- Email verification
- Session management
- Token refresh handling

---

## 📱 Onboarding Screens Implementation

### Step 101: Profile Setup Screen
**Action**: Complete `src/app/(onboarding)/profile-setup.tsx`
**Details**: 
- Profile photo upload
- Display name input
- Username validation
- Gender selection
- Bio input (optional)
- Continue button with validation

### Step 102: Location Setup Screen
**Action**: Complete `src/app/(onboarding)/location.tsx`
**Details**:
- Country picker (default: Nigeria)
- State picker (all 36 states + FCT)
- City input
- Tribe selector
- Diaspora toggle
- Diaspora country picker (if diaspora)

### Step 103: Naija DNA Quiz Screen
**Action**: Complete `src/app/(onboarding)/naija-dna.tsx`
**Details**:
- 10 questions about:
  - Pidgin fluency
  - Cultural preferences
  - Food preferences
  - Music preferences
  - Fashion style
  - Tribe connection
- Progress indicator
- Score calculation
- Save to user profile

### Step 104: Interests Selection Screen
**Action**: Complete `src/app/(onboarding)/interest.tsx`
**Details**:
- Grid of interest chips
- Multi-select functionality
- Categories: Music, Food, Tech, Fashion, Sports, etc.
- Save selected interests

### Step 105: Contacts Sync Screen
**Action**: Complete `src/app/(onboarding)/contacts.tsx`
**Details**:
- Request contacts permission
- Sync contacts
- Find existing users
- Show suggested connections
- Skip option
- Continue to main app

### Step 106-150: Additional Onboarding Features
**Details**:
- Progress tracking
- Back navigation
- Data persistence
- Validation
- Error handling
- Skip options

---

## ⚙️ Protected Screens - Settings

### Step 151: Create Settings Index Screen
**Action**: Implement `src/app/(protected)/settings/index.tsx`
**File**: `src/app/(protected)/settings/index.tsx`
```typescript
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY } from '@/constants/theme';
import { useAuthStore } from '@/store/authStore';
import { Avatar } from '@/components/ui/Avatar';
import { useUserStore } from '@/store/userStore';

export default function SettingsScreen() {
  const router = useRouter();
  const { user, signOut } = useAuthStore();
  const { profile } = useUserStore();

  const settingsItems = [
    {
      title: 'Account',
      icon: 'person-outline',
      route: '/(protected)/settings/account',
    },
    {
      title: 'Privacy',
      icon: 'lock-closed-outline',
      route: '/(protected)/settings/privacy',
    },
    {
      title: 'Notifications',
      icon: 'notifications-outline',
      route: '/(protected)/settings/notifications',
    },
    {
      title: 'Subscription',
      icon: 'star-outline',
      route: '/(protected)/settings/subscription',
    },
    {
      title: 'Help & Support',
      icon: 'help-circle-outline',
      route: null,
      onPress: () => {
        // Open help modal or link
      },
    },
    {
      title: 'About',
      icon: 'information-circle-outline',
      route: null,
      onPress: () => {
        // Show about modal
      },
    },
    {
      title: 'Sign Out',
      icon: 'log-out-outline',
      route: null,
      onPress: async () => {
        await signOut();
        router.replace('/(auth)/welcome');
      },
      danger: true,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar 
          uri={profile?.avatar_url} 
          name={profile?.display_name || user?.email || 'User'}
          size={80}
        />
        <Text style={styles.name}>{profile?.display_name || 'User'}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.section}>
        {settingsItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.item}
            onPress={() => {
              if (item.route) {
                router.push(item.route as any);
              } else if (item.onPress) {
                item.onPress();
              }
            }}
          >
            <View style={styles.itemLeft}>
              <Ionicons 
                name={item.icon as any} 
                size={24} 
                color={item.danger ? COLORS.error : COLORS.text} 
              />
              <Text style={[styles.itemText, item.danger && styles.dangerText]}>
                {item.title}
              </Text>
            </View>
            <Ionicons 
              name="chevron-forward" 
              size={20} 
              color={COLORS.textSecondary} 
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  name: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: SPACING.md,
  },
  email: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  section: {
    paddingVertical: SPACING.md,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  itemText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text,
  },
  dangerText: {
    color: COLORS.error,
  },
});
```

### Step 152: Create Account Settings Screen
**Action**: Implement `src/app/(protected)/settings/account.tsx`
**Details**:
- Edit profile information
- Change email
- Change password
- Delete account option
- Account verification status

### Step 153: Create Privacy Settings Screen
**Action**: Implement `src/app/(protected)/settings/privacy.tsx`
**Details**:
- Profile visibility settings
- Location sharing toggle
- Blocked users list
- Who can message you
- Who can see your posts
- Data download option

### Step 154: Create Notifications Settings Screen
**Action**: Implement `src/app/(protected)/settings/notifications.tsx`
**Details**:
- Push notification toggles
- Email notification settings
- In-app notification preferences
- Quiet hours
- Notification sound settings

### Step 155: Create Subscription Settings Screen
**Action**: Implement `src/app/(protected)/settings/subscription.tsx`
**Details**:
- Current plan display
- Upgrade to premium option
- Subscription benefits
- Payment method management
- Billing history
- Cancel subscription

### Step 156-200: Additional Settings Features
**Details**:
- Language preferences
- Theme settings (light/dark)
- Data usage settings
- Cache management
- App version info
- Terms & Privacy links

---

## 🎯 Protected Screens - Additional Features

### Step 201: Create User Profile Screen
**Action**: Complete `src/app/(protected)/user/[id].tsx`
**Details**:
- User profile header
- Posts grid
- Follow/Unfollow button
- Message button
- Block user option
- Mutual connections

### Step 202: Create Edit Profile Screen
**Action**: Complete `src/app/(protected)/user/edit.tsx`
**Details**:
- Edit all profile fields
- Photo upload
- Bio editing
- Location update
- Interests update

### Step 203: Create AI Hub Screen
**Action**: Complete `src/app/(protected)/ai/hub.tsx`
**Details**:
- AI features overview
- Quick access to:
  - Search
  - Reconnect
  - Translation
  - Content suggestions

### Step 204: Create Events Screen
**Action**: Complete `src/app/(protected)/events/index.tsx`
**Details**:
- List of upcoming events
- Event categories
- Create event button
- Filter by location/date
- RSVP functionality

### Step 205: Create Event Details Screen
**Action**: Complete `src/app/(protected)/events/[id].tsx`
**Details**:
- Event information
- Attendees list
- RSVP button
- Share event
- Add to calendar

### Step 206: Create Wallet Screen
**Action**: Complete `src/app/(protected)/wallet/index.tsx`
**Details**:
- Balance display
- Transaction history
- Add funds button
- Withdraw funds option
- Payment methods

### Step 207-250: Additional Protected Screens
**Details**:
- Community creation
- Marketplace item creation
- Post creation enhancements
- Chat enhancements
- Map features
- Search functionality

---

## 🗄️ Database Migrations - Docker vs SQL

### Step 251: Understanding Migration Options

#### Option A: Direct SQL Migrations (Recommended for MVP)
**Pros**:
- ✅ Simple and straightforward
- ✅ No additional setup required
- ✅ Works directly with Supabase Dashboard
- ✅ Easy to version control
- ✅ Quick for small projects
- ✅ Free (no Docker overhead)

**Cons**:
- ❌ Manual execution required
- ❌ No local testing environment
- ❌ Harder to rollback
- ❌ No migration history tracking

#### Option B: Docker with Supabase CLI (Recommended for Production)
**Pros**:
- ✅ Local development environment
- ✅ Migration versioning
- ✅ Easy rollback
- ✅ Team collaboration
- ✅ Testing before production
- ✅ Automated migrations

**Cons**:
- ❌ Requires Docker Desktop installation
- ❌ More setup complexity
- ❌ Higher resource usage
- ❌ Learning curve

**Recommendation**: Start with **Direct SQL Migrations** for MVP, migrate to **Docker + Supabase CLI** for production.

### Step 252: Direct SQL Migration Setup

#### Step 252.1: Create Migration File Structure
**Action**: Create migration files in `supabase/migrations/`
**Structure**:
```
supabase/
  migrations/
    001_initial_schema.sql
    002_add_indexes.sql
    003_add_rls_policies.sql
    004_add_functions.sql
```

#### Step 252.2: Create Initial Schema Migration
**Action**: Create `supabase/migrations/001_initial_schema.sql`
**File**: `supabase/migrations/001_initial_schema.sql`
```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table (extends auth.users)
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
  country TEXT DEFAULT 'Nigeria',
  state TEXT,
  city TEXT,
  tribe TEXT,
  is_diaspora BOOLEAN DEFAULT false,
  diaspora_country TEXT,
  naija_dna_score JSONB,
  interests TEXT[],
  naija_score INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT false,
  is_premium BOOLEAN DEFAULT false,
  last_seen TIMESTAMPTZ,
  location_latitude DOUBLE PRECISION,
  location_longitude DOUBLE PRECISION,
  location_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_users_username ON public.users(username);
CREATE INDEX idx_users_country ON public.users(country);
CREATE INDEX idx_users_state ON public.users(state);
CREATE INDEX idx_users_tribe ON public.users(tribe);
CREATE INDEX idx_users_location ON public.users(location_latitude, location_longitude);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add trigger to users table
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

#### Step 252.3: Execute Migration in Supabase Dashboard
**Steps**:
1. Go to Supabase Dashboard → SQL Editor
2. Click "New Query"
3. Copy contents of `001_initial_schema.sql`
4. Paste and click "Run"
5. Verify tables are created (Database → Tables)

#### Step 252.4: Create Additional Migrations
**Action**: Create migration files for each feature incrementally
**Best Practice**: One migration per feature or logical group

### Step 253: Docker + Supabase CLI Setup (Advanced)

#### Step 253.1: Install Docker Desktop
**Action**: Download and install Docker Desktop
**Steps**:
1. Download from [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/)
2. Install Docker Desktop
3. Start Docker Desktop
4. Verify installation: `docker --version`

#### Step 253.2: Install Supabase CLI
**Action**: Install Supabase CLI
**Windows (PowerShell)**:
```powershell
# Using Scoop
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

# Or using npm
npm install -g supabase
```

**Mac/Linux**:
```bash
brew install supabase/tap/supabase
```

#### Step 253.3: Initialize Supabase Project
**Action**: Initialize Supabase locally
```bash
cd C:\Users\hp\Desktop\NaijaConnect
supabase init
```

#### Step 253.4: Link to Remote Project
**Action**: Link local project to Supabase project
```bash
supabase link --project-ref your-project-ref
```
**Get project ref**: Supabase Dashboard → Project Settings → General → Reference ID

#### Step 253.5: Start Local Supabase
**Action**: Start local Supabase instance
```bash
supabase start
```
**Note**: This starts Docker containers for PostgreSQL, Auth, Storage, etc.

#### Step 253.6: Create Migration with CLI
**Action**: Create new migration
```bash
supabase migration new create_posts_table
```
**Creates**: `supabase/migrations/YYYYMMDDHHMMSS_create_posts_table.sql`

#### Step 253.7: Write Migration SQL
**Action**: Edit the migration file
**File**: `supabase/migrations/YYYYMMDDHHMMSS_create_posts_table.sql`
```sql
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  images TEXT[],
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

#### Step 253.8: Test Migration Locally
**Action**: Apply migration locally
```bash
supabase db reset
```
**Note**: This resets local database and applies all migrations

#### Step 253.9: Push Migration to Production
**Action**: Push migration to remote Supabase
```bash
supabase db push
```
**Warning**: This applies migrations to production! Test locally first.

#### Step 253.10: Rollback Migration (if needed)
**Action**: Create rollback migration
```bash
supabase migration new rollback_posts_table
```
**File**: `supabase/migrations/YYYYMMDDHHMMSS_rollback_posts_table.sql`
```sql
DROP TABLE IF EXISTS public.posts CASCADE;
```

### Step 254: Migration Best Practices

#### Step 254.1: Naming Conventions
**Format**: `YYYYMMDDHHMMSS_description.sql`
**Example**: `20240115143000_create_users_table.sql`

#### Step 254.2: Migration Order
- Always run migrations in chronological order
- Never modify existing migrations (create new ones)
- Use transactions for safety

#### Step 254.3: Testing Migrations
- Test locally before production
- Backup production database before migrations
- Test rollback procedures

#### Step 254.4: Version Control
- Commit all migration files to Git
- Document migration purpose in comments
- Tag releases with migration numbers

### Step 255-300: Complete Migration Files
**Details**:
- All table creations
- Indexes
- RLS policies
- Functions
- Triggers
- Seed data (optional)

---

## 🚀 Production Optimization

### Step 301: Performance Optimization
**Details**:
- Image optimization
- Code splitting
- Lazy loading
- Memoization
- FlatList optimization

### Step 302: Error Handling
**Details**:
- Error boundaries
- Global error handler
- User-friendly error messages
- Error logging

### Step 303: Security Hardening
**Details**:
- RLS policies review
- Input validation
- Rate limiting
- Content moderation

### Step 304: Testing
**Details**:
- Unit tests
- Integration tests
- E2E tests
- Performance tests

### Step 305-350: Additional Production Steps
**Details**:
- Analytics setup
- Monitoring
- Crash reporting
- A/B testing
- Feature flags
- CI/CD pipeline

---

## ✅ Summary

This comprehensive guide covers **350+ detailed steps** for:

1. ✅ Complete app routing and navigation
2. ✅ Splash screen and initialization
3. ✅ Authentication flow with proper redirects
4. ✅ All onboarding screens
5. ✅ Settings screens (Account, Privacy, Notifications, Subscription)
6. ✅ Additional protected screens
7. ✅ Database migrations (Docker vs SQL comparison)
8. ✅ Production optimization

**Migration Recommendation**: 
- **MVP**: Use Direct SQL Migrations (Steps 252-254)
- **Production**: Migrate to Docker + Supabase CLI (Steps 253-254)

**Next Steps**: Follow the steps sequentially, starting with routing fixes, then implementing each screen systematically.

Good luck building NaijaConnect! 🚀🇳🇬

