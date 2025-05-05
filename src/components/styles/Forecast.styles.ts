import { StyleSheet, ViewStyle, TextStyle, ImageStyle, Platform } from 'react-native';
import { metrics } from '../../utils/metrics';
import { fonts } from '../../theme/fonts';

interface ForecastStyles {
  sectionTitle: TextStyle;
  hourlyScroll: ViewStyle;
  hourlyCard: ViewStyle;
  hourlyTime: TextStyle;
  hourlyIcon: ImageStyle;
  hourlyTemp: TextStyle;
  dailyScroll: ViewStyle;
  dailyCard: ViewStyle;
  dailyDay: TextStyle;
  dailyIcon: ImageStyle;
  dailyTemp: TextStyle;
}

export const createForecastStyles = (colors: any): ForecastStyles => StyleSheet.create({
  sectionTitle: {
    fontSize: metrics?.fontSize?.fontSize_20,
    fontFamily: fonts?.bold,
    marginVertical: metrics?.spacing?.space_10,
    color: colors.text,
    paddingHorizontal: metrics?.spacing?.m,
    textAlign: 'left',
  },
  hourlyScroll: {
    marginBottom: metrics?.spacing?.space_12,
  },
  hourlyCard: {
    borderRadius: metrics?.spacing?.space_12,
    paddingVertical: metrics?.spacing?.space_14,
    paddingHorizontal: metrics?.spacing?.space_10,
    alignItems: 'center',
    marginRight: metrics?.spacing?.m,
    width: metrics?.spacing?.space_100,
    backgroundColor: colors.hourlyDailyCardBackground,
    shadowOpacity: 0,
    borderWidth: 0.7,
    borderColor: colors.primary,
    marginVertical: metrics?.spacing?.space_1,
  },
  hourlyTime: {
    fontSize: metrics?.fontSize?.fontSize_18,
    marginBottom: metrics?.spacing?.space_4,
    color: colors.textSecondary,
    fontFamily: fonts?.medium,
    textAlign: 'center',
  },
  hourlyIcon: {
    width: metrics?.spacing?.space_50,
    height: metrics?.spacing?.space_50,
    marginBottom: metrics?.spacing?.space_4,
    resizeMode: Platform?.OS == 'ios' ? "cover" : "center",
  },
  hourlyTemp: {
    fontSize: metrics?.fontSize?.fontSize_20,
    fontFamily: fonts?.bold,
    color: colors.text,
    textAlign: 'center',
  },
  dailyScroll: {
    marginBottom: metrics?.spacing?.space_16,
  },
  dailyCard: {
    borderRadius: metrics?.spacing?.space_12,
    paddingVertical: metrics?.spacing?.space_12,
    paddingHorizontal: metrics?.spacing?.space_10,
    alignItems: 'center',
    marginRight: metrics?.spacing?.m,
    width: metrics?.spacing?.space_100,
    marginVertical: 0,
    backgroundColor: colors.hourlyDailyCardBackground,
    shadowOpacity: 0,
    borderWidth: 0.7,
    borderColor: colors.primary,
  },
  dailyDay: {
    fontSize: metrics?.fontSize?.fontSize_18,
    color: colors.textSecondary,
    fontFamily: fonts?.medium,
    textAlign: 'center',
  },
  dailyIcon: {
    width: metrics?.spacing?.space_48,
    height: metrics?.spacing?.space_48,
    marginBottom: metrics?.spacing?.space_4,
    resizeMode: Platform?.OS == 'ios' ? "cover" : "contain",
  },
  dailyTemp: {
    fontSize: metrics?.fontSize?.fontSize_20,
    fontFamily: fonts?.bold,
    color: colors.text,
    textAlign: 'center',
  },
}); 