import React from 'react';
import { View, Switch, ViewStyle, TextStyle } from 'react-native';
import { AppText } from './AppText';
import { useThemeColors } from '../theme/useThemeColors';
import { createHeaderStyles } from './styles/Header.styles';

interface HeaderProps {
  title: string;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  darkModeText?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  isDarkMode,
  onToggleDarkMode,
  darkModeText = 'Dark Mode'
}) => {
  const colors = useThemeColors();
  const styles = createHeaderStyles(colors);

  return (
    <View style={styles.header}>
      <AppText style={styles.headerTitle}>{title}</AppText>
      <View style={styles.themeToggle}>
        <AppText style={styles.themeToggleText}>{ isDarkMode ? 'Light Mode' : darkModeText}</AppText>
        <Switch value={isDarkMode} onValueChange={onToggleDarkMode} />
      </View>
    </View>
  );
}; 