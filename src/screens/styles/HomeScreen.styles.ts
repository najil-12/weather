import { StyleSheet, ViewStyle, TextStyle, ImageStyle, Platform } from 'react-native';
import { metrics } from '../../utils/metrics';
import { fonts } from '../../theme/fonts';

interface HomeScreenStyles {
  container: ViewStyle;
  contentContainer: ViewStyle;
  contentSection: ViewStyle;
  
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
  
  errorText: TextStyle;
  loadingContainer: ViewStyle;
  loadingText: TextStyle;
  loadingDescription: TextStyle;
}

export const createHomeScreenStyles = (colors: any): HomeScreenStyles => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingTop: metrics?.spacing?.space_20,
    paddingBottom: Platform.OS === 'ios' ? metrics?.spacing?.space_50 : metrics?.spacing?.space_30,
    flexGrow: 1,
  },
  contentSection: {
    paddingHorizontal: metrics?.spacing?.m,
    width: '100%',
  },
  
  sectionTitle: {
    fontSize: metrics?.fontSize?.fontSize_20,
    fontFamily: fonts?.regular,
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
    height: metrics?.spacing?.space_40,
    marginBottom: metrics?.spacing?.space_4,
    resizeMode: "center",
  },
  hourlyTemp: {
    fontSize: metrics?.fontSize?.fontSize_20,
    fontFamily: fonts?.regular,
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
    fontFamily: fonts?.regular,
    textAlign: 'center',
  },
  dailyIcon: {
    width: metrics?.spacing?.space_48,
    height: metrics?.spacing?.space_48,
    marginBottom: metrics?.spacing?.space_4,
  },
  dailyTemp: {
    fontSize: metrics?.fontSize?.fontSize_20,
    fontFamily: fonts?.regular,
    color: colors.text,
    textAlign: 'center',
  },
  errorText: {
    color: colors.error,
    textAlign: 'center',
    marginTop: metrics?.spacing?.space_8,
    fontSize: metrics?.fontSize?.fontSize_16,
    fontFamily: fonts?.regular,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: metrics?.spacing?.space_20,
  },
  loadingText: {
    fontSize: metrics?.fontSize?.fontSize_20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: metrics?.spacing?.space_8,
    textAlign: 'center',
  },
  loadingDescription: {
    fontSize: metrics?.fontSize?.fontSize_15,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: metrics?.spacing?.space_20,
    lineHeight: metrics?.spacing?.space_18,
    fontFamily: fonts?.medium,
  },
}); 