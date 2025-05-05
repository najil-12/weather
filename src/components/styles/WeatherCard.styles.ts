import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { metrics } from '../../utils/metrics';
import { fonts } from '../../theme/fonts';

interface WeatherCardStyles {
  contentSection: ViewStyle;
  weatherCard: ViewStyle;
  weatherCardHeader: ViewStyle;
  weatherCardFooter: ViewStyle;
  weatherCardFooterItem: ViewStyle;
  weatherIcon: ImageStyle;
  cityName: TextStyle;
  temperature: TextStyle;
  condition: TextStyle;
  footerLabel: TextStyle;
  footerValue: TextStyle;
  welcomeText: TextStyle;
  welcomeDescription: TextStyle;
}

export const createWeatherCardStyles = (colors: any): WeatherCardStyles => StyleSheet.create({
  contentSection: {
    paddingHorizontal: metrics?.spacing?.m,
    width: '100%',
  },
  weatherCard: {
    padding: metrics?.spacing?.space_20,
    marginVertical: metrics?.spacing?.space_10,
    backgroundColor: colors.weatherCardBackground,
    shadowOpacity: 0,
    borderRadius: metrics?.spacing?.space_12,
  },
  weatherCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weatherCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: metrics?.spacing?.space_10,
    paddingTop: metrics?.spacing?.space_10,
    borderTopWidth: metrics?.spacing?.space_1,
    borderTopColor: colors.border,
  },
  weatherCardFooterItem: {
    alignItems: 'flex-start',
    flex: 1,
  },
  weatherIcon: {
    width: metrics?.spacing?.space_50 * 2,
    height: metrics?.spacing?.space_50 * 2,
    marginLeft: metrics?.spacing?.space_8,
  },
  cityName: {
    fontSize: metrics?.fontSize?.fontSize_20,
    fontFamily: fonts?.regular,
    color: colors.text,
    textAlign: 'left',
  },
  temperature: {
    fontSize: metrics?.fontSize?.fontSize_34,
    fontFamily: fonts?.bold,
    color: colors.text,
    textAlign: 'left',
  },
  condition: {
    fontSize: metrics?.fontSize?.fontSize_18,
    marginBottom: 0,
    color: colors.text,
    textAlign: 'left',
    fontFamily: fonts?.regular,
  },
  footerLabel: {
    fontSize: metrics?.fontSize?.fontSize_16,
    marginBottom: metrics?.spacing?.space_4,
    color: colors.textSecondary,
    fontFamily: fonts?.regular,
    textAlign: 'left',
  },
  footerValue: {
    fontSize: metrics?.fontSize?.fontSize_20,
    fontFamily: fonts?.bold,
    color: colors.text,
    textAlign: 'left',
  },
  welcomeText: {
    fontSize: metrics.fontSize.large,
    fontFamily: fonts?.bold,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  welcomeDescription: {
    fontSize: metrics.fontSize.medium,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: fonts?.regular,
  },
}); 