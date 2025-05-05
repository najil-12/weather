import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { useThemeColors } from '../theme/useThemeColors';
import { metrics } from '../utils/metrics';
import { fonts } from '../theme/fonts';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  loading?: boolean;
}

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  loading = false,
}) => {
  const colors = useThemeColors();
  
  const buttonStyles = StyleSheet.create({
    button: {
      minWidth: metrics?.spacing?.space_100,
      paddingVertical: metrics?.spacing?.space_6,
      paddingHorizontal: metrics?.spacing?.m,
      backgroundColor: colors.primary,
      borderRadius: metrics?.spacing?.space_12,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    title: {
      color: colors.white,
      fontSize: metrics?.fontSize?.fontSize_14,
      fontFamily: fonts?.medium,
      textAlign: 'center',
    },
    disabled: {
      opacity: 0.6,
    },
  });

  return (
    <TouchableOpacity
      style={[buttonStyles.button, style, disabled && buttonStyles.disabled]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text style={[buttonStyles.title, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}; 