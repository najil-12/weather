import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { lightColors, darkColors } from './colors';

export const useThemeColors = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  return isDarkMode ? darkColors : lightColors;
}; 