import Constants from 'expo-constants';

// Get environment variables
const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = Constants.expoConfig?.extra?.[key] || process.env[key];
  if (!value && !defaultValue) {
    console.warn(`Missing environment variable: ${key}`);
  }
  return value || defaultValue || '';
};

export const CONFIG = {
  // Supabase
  SUPABASE_URL: getEnvVar('EXPO_PUBLIC_SUPABASE_URL', ''),
  SUPABASE_ANON_KEY: getEnvVar('EXPO_PUBLIC_SUPABASE_ANON_KEY', ''),
  
  // AI - Using Hugging Face
  HUGGINGFACE_API_KEY: getEnvVar('HUGGINGFACE_API_KEY', ''),
  HUGGINGFACE_API_URL: 'https://api-inference.huggingface.co/models',
  
  // App
  ENV: getEnvVar('EXPO_PUBLIC_APP_ENV', 'development'),
  APP_VERSION: '1.0.0',
  
  // Features
  ENABLE_VIDEO_CALLS: true,
  ENABLE_MARKETPLACE: true,
  ENABLE_ESCROW: true,
} as const;
