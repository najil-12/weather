import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { metrics } from '../../utils/metrics';
import { fonts } from '../../theme/fonts';

interface HeaderStyles {
  header: ViewStyle;
  headerTitle: TextStyle;
  themeToggle: ViewStyle;
  themeToggleText: TextStyle;
}

export const createHeaderStyles = (colors: any): HeaderStyles => StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: metrics?.spacing?.space_16,
    paddingBottom: metrics?.spacing?.space_8,
    borderBottomWidth: metrics?.spacing?.space_2,
    borderBottomColor: colors.primary,
    paddingHorizontal: metrics?.spacing?.m,
  },
  headerTitle: {
    fontSize: metrics?.fontSize?.fontSize_30,
    fontFamily: fonts?.bold,
    color: colors.text,
    textAlign: 'left',
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  themeToggleText: {
    fontSize: metrics.fontSize.small,
    marginRight: metrics?.spacing?.space_10,
    color: colors.text,
    fontFamily: fonts?.medium,
  },
}); 