import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { fonts } from '../theme/fonts';
import { useThemeColors } from '../theme/useThemeColors';

interface AppTextProps extends TextProps {
  children: React.ReactNode;
}

export const AppText: React.FC<AppTextProps> = ({ children, style, ...props }) => {
  const colors = useThemeColors();
  return (
    <Text 
      style={[
        styles.text,
        {
          color: colors.text,
          fontFamily: fonts.regular,
        },
        style
      ]} 
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
}); 