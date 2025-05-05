import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// Base dimensions
const baseWidth = 375; 
const baseHeight = 667; 

// Scale factors
const widthScale = width / baseWidth;
const heightScale = height / baseHeight;

// Responsive font sizes
const fontSize = {
  tiny: Math.round(10 * widthScale),
  small: Math.round(12 * widthScale),
  medium: Math.round(14 * widthScale),
  large: Math.round(16 * widthScale),
  xlarge: Math.round(18 * widthScale),
  xxlarge: Math.round(20 * widthScale),
  huge: Math.round(24 * widthScale),
  fontSize_1: Math.round(1 * widthScale),
  fontSize_2: Math.round(2 * widthScale),
  fontSize_3: Math.round(3 * widthScale),
  fontSize_4: Math.round(4 * widthScale),
  fontSize_5: Math.round(5 * widthScale),
  fontSize_6: Math.round(6 * widthScale),
  fontSize_7: Math.round(7 * widthScale),
  fontSize_8: Math.round(8 * widthScale),
  fontSize_9: Math.round(9 * widthScale),
  fontSize_10: Math.round(10 * widthScale),
  fontSize_11: Math.round(11 * widthScale),
  fontSize_12: Math.round(12 * widthScale),
  fontSize_13: Math.round(13 * widthScale),
  fontSize_14: Math.round(14 * widthScale),
  fontSize_15: Math.round(15 * widthScale),
  fontSize_16: Math.round(16 * widthScale),
  fontSize_17: Math.round(17 * widthScale),
  fontSize_18: Math.round(18 * widthScale),
  fontSize_19: Math.round(19 * widthScale),
  fontSize_20: Math.round(20 * widthScale),
  fontSize_21: Math.round(21 * widthScale),
  fontSize_34: Math.round(34 * widthScale),
  fontSize_30: Math.round(30 * widthScale),
  fontSize_45: Math.round(45 * widthScale),
  fontSize_24: Math.round(24 * widthScale),
};

// Responsive spacing
const spacing = {
  xs: Math.round(4 * widthScale),
  s: Math.round(8 * widthScale),
  m: Math.round(16 * widthScale),
  l: Math.round(24 * widthScale),
  xl: Math.round(32 * widthScale),
  xxl: Math.round(48 * widthScale),
  space_1: Math.round(1 * widthScale),
  space_2: Math.round(2 * widthScale),
  space_3: Math.round(3 * widthScale),
  space_4: Math.round(4 * widthScale),
  space_5: Math.round(5 * widthScale),
  space_6: Math.round(6 * widthScale),
  space_7: Math.round(7 * widthScale),
  space_8: Math.round(8 * widthScale),
  space_9: Math.round(9 * widthScale),
  space_10: Math.round(10 * widthScale),
  space_11: Math.round(11 * widthScale),
  space_12: Math.round(12 * widthScale),
  space_13: Math.round(13 * widthScale),
  space_14: Math.round(14 * widthScale),
  space_15: Math.round(15 * widthScale),
  space_16: Math.round(16 * widthScale),
  space_17: Math.round(17 * widthScale),
  space_18: Math.round(18 * widthScale),
  space_19: Math.round(19 * widthScale),
  space_20: Math.round(20 * widthScale),
  space_21: Math.round(21 * widthScale),
  space_22: Math.round(22 * widthScale),
  space_23: Math.round(23 * widthScale),
  space_24: Math.round(24 * widthScale),
  space_25: Math.round(25 * widthScale),
  space_48: Math.round(48 * widthScale),
  space_50: Math.round(50 * widthScale),
  space_30: Math.round(30 * widthScale),
  space_40: Math.round(40 * widthScale),
  space_60: Math.round(60 * widthScale),
  space_70: Math.round(70 * widthScale),
  space_80: Math.round(80 * widthScale),
  space_90: Math.round(90 * widthScale),
  space_100: Math.round(100 * widthScale),
  space_110: Math.round(110 * widthScale),
  space_120: Math.round(120 * widthScale),
  
};

// Responsive dimensions
export const metrics = {
  screenWidth: width,
  screenHeight: height,
  statusBarHeight: Platform.OS === 'ios' ? 20 : 0,
  headerHeight: Math.round(56 * heightScale),
  tabBarHeight: Math.round(49 * heightScale),
  borderRadius: {
    small: Math.round(4 * widthScale),
    medium: Math.round(8 * widthScale),
    large: Math.round(12 * widthScale),
  },
  shadow: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 6,
    },
  },
  fontSize,
  spacing,
}; 