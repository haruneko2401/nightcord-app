// src/utils/responsive.js
import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions (iPhone 11 Pro - 375x812)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

// Scale based on width
export const scale = (size) => {
  const scaleWidth = SCREEN_WIDTH / BASE_WIDTH;
  return Math.round(size * scaleWidth);
};

// Scale based on height
export const verticalScale = (size) => {
  const scaleHeight = SCREEN_HEIGHT / BASE_HEIGHT;
  return Math.round(size * scaleHeight);
};

// Moderate scale (less aggressive scaling)
export const moderateScale = (size, factor = 0.5) => {
  const scaleWidth = SCREEN_WIDTH / BASE_WIDTH;
  return Math.round(size + (scaleWidth - 1) * size * factor);
};

// Get screen dimensions
export const getScreenWidth = () => SCREEN_WIDTH;
export const getScreenHeight = () => SCREEN_HEIGHT;

// Check if device is tablet
export const isTablet = () => {
  const aspectRatio = SCREEN_HEIGHT / SCREEN_WIDTH;
  return SCREEN_WIDTH >= 768 || (SCREEN_WIDTH >= 600 && aspectRatio < 1.6);
};

// Check if device is small
export const isSmallDevice = () => SCREEN_WIDTH < 375;

// Responsive font size
export const responsiveFontSize = (size) => {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  const newSize = size * scale;
  return Math.max(12, Math.min(newSize, size * 1.2)); // Min 12, Max 20% larger
};

// Responsive spacing
export const responsiveSpacing = (size) => {
  return moderateScale(size, 0.3);
};

export default {
  scale,
  verticalScale,
  moderateScale,
  getScreenWidth,
  getScreenHeight,
  isTablet,
  isSmallDevice,
  responsiveFontSize,
  responsiveSpacing,
};

