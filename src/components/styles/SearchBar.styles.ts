import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { metrics } from '../../utils/metrics';
import { fonts } from '../../theme/fonts';

interface SearchBarStyles {
  searchBarContainer: ViewStyle;
  searchInput: TextStyle;
  suggestionsContainer: ViewStyle;
  suggestionItem: ViewStyle;
  suggestionText: TextStyle;
}

export const createSearchBarStyles = (colors: any): SearchBarStyles => StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: metrics?.spacing?.space_12,
    gap: metrics?.spacing?.space_12,
    position: 'relative',
    backgroundColor: colors.card,
    borderRadius: metrics?.spacing?.space_12,
    padding: metrics?.spacing?.space_8,
    borderWidth: 0.7,
    borderColor: colors.primary,
    marginHorizontal: metrics?.spacing?.m,
  },
  searchInput: {
    height: metrics?.spacing?.space_40,
    borderRadius: metrics?.spacing?.space_12,
    paddingHorizontal: metrics?.spacing?.space_12,
    fontSize: metrics.fontSize.medium,
    backgroundColor: 'transparent',
    color: colors.text,
    flex: 1,
    borderWidth: 0,
    marginRight: metrics?.spacing?.space_8,
    fontFamily: fonts?.medium,
    includeFontPadding: false,
  },
  suggestionsContainer: {
    position: 'absolute',
    top: '135%',
    left: 0,
    right: 0,
    backgroundColor: colors.card,
    borderBottomLeftRadius: metrics?.spacing?.space_12,
    borderBottomRightRadius: metrics?.spacing?.space_12,
    marginTop: metrics?.spacing?.space_4,
    zIndex: 1000,
    shadowOpacity: 0,
    borderWidth: 0.7,
    borderColor: colors.primary,
    maxHeight: metrics?.spacing?.space_100 * 2.5,
    overflow: 'hidden',
    flexGrow: 1,
  },
  suggestionItem: {
    paddingHorizontal: metrics?.spacing?.space_14,
    paddingVertical: metrics?.spacing?.space_8,
    borderBottomWidth: metrics?.spacing?.space_1,
    borderBottomColor: colors.border,
    borderRadius: 0,
  },
  suggestionText: {
    color: colors.text,
    fontSize: metrics.fontSize.medium,
    fontFamily: fonts?.medium,
  },
}); 