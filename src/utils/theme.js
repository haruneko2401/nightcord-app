// src/utils/theme.js
import { scale, verticalScale, moderateScale, responsiveFontSize, responsiveSpacing, isTablet, isSmallDevice } from './responsive';

export const Colors = {
  background: '#0a0a1a',
  backgroundSecondary: '#1a1a2e',
  primary: '#5865F2', // Discord blue
  primaryLight: '#7289DA',
  primaryDark: '#4752C4',
  secondary: '#9370DB',
  accent: '#00ffff',
  accentDark: '#008b8b',
  text: '#ffffff',
  textSecondary: '#b9bbbe', // Discord gray text
  textMuted: '#72767d', // Discord muted text
  success: '#28a745',
  danger: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
  
  // Discord-like colors
  discordBackground: '#2c1810',
  discordCard: '#36393f', // Discord modal background
  discordInput: '#202225', // Discord input background
  discordBorder: '#202225',
  discordPurple: '#8B5CF6',
  discordPink: '#EB459E',
  
  // Nightcord theme colors (đêm)
  nightBlue: '#0a1628',
  nightPurple: '#1a0f2e',
  nightViolet: '#2d1b4e',
  nightDark: '#050510',
  nightCard: '#1a1a2e',
  nightCardLight: '#252540',
  nightInput: '#0f0f1a',
  electricBlue: '#00d4ff',
  electricCyan: '#00ffff',
  electricPurple: '#8b5cf6',
  electricPink: '#ff00ff',
  moonGlow: '#fff8e1',
  starWhite: '#ffffff',
};

export const Fonts = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  light: 'System',
};

export const Sizes = {
  small: responsiveFontSize(12),
  medium: responsiveFontSize(16),
  large: responsiveFontSize(20),
  xlarge: responsiveFontSize(24),
  xxlarge: responsiveFontSize(32),
};

export const Spacing = {
  xs: responsiveSpacing(4),
  sm: responsiveSpacing(8),
  md: responsiveSpacing(16),
  lg: responsiveSpacing(24),
  xl: responsiveSpacing(32),
  xxl: responsiveSpacing(48),
};

const theme = {
  Colors,
  Fonts,
  Sizes,
  Spacing,
  
  // Responsive utilities
  scale,
  verticalScale,
  moderateScale,
  responsiveFontSize,
  responsiveSpacing,
  isTablet,
  isSmallDevice,
  
  // Common styles
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.md,
  },
  
  card: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: moderateScale(12),
    padding: Spacing.md,
    marginVertical: Spacing.sm,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.1,
    shadowRadius: scale(4),
    elevation: 3,
  },
  
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: moderateScale(8),
    padding: Spacing.sm,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  
  button: {
    backgroundColor: Colors.primary,
    borderRadius: moderateScale(8),
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
  },
  
  buttonText: {
    color: Colors.text,
    fontSize: Sizes.medium,
    fontWeight: '600',
  },
};

export default theme;