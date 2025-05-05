import React from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';
import { fonts } from '../theme/fonts';
import { useThemeColors } from '../theme/useThemeColors';
import { metrics } from '../utils/metrics';

export const AppInput: React.FC<TextInputProps> = ({ style, ...props }) => {
  const colors = useThemeColors();
  return (
    <TextInput
      style={[
        styles.input,
        {
          color: colors.text,
          backgroundColor: colors.inputBackground,
          borderWidth: 1,
          borderColor: colors.border,
        },
        style
      ]}
      placeholderTextColor={colors.textSecondary}
      cursorColor={colors.primary}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 44,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: metrics?.fontSize?.fontSize_16,
    fontFamily: fonts.regular,
  },
}); 