export const COLORS = {
  
  primary: "#4ADE80",      
  primaryDark: "#22C55E", 
  primaryLight: "#86EFAC", 
  secondary: "#2DD4BF",    
  
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