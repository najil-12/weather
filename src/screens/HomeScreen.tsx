import React, { useMemo } from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppText } from '../components/AppText';
import { Forecast } from '../components/Forecast';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { WeatherCard } from '../components/WeatherCard';
import { useWeatherState } from '../hooks/useWeatherState';
import { AppDispatch, RootState } from '../store/store';
import { toggleDarkMode } from '../store/themeSlice';
import { useThemeColors } from '../theme/useThemeColors';
import { createHomeScreenStyles } from './styles/HomeScreen.styles';

const PLACEHOLDER_TEXT = {
  SEARCH: 'Enter city name...',
  SEARCH_BUTTON: 'Search',
  DARK_MODE: 'Dark Mode',
  WELCOME: 'Welcome',
  WELCOME_DESCRIPTION: 'Start by allowing location access or search for your city to see the weather!',
};

export const HomeScreen: React.FC = () => {
  const {
    cityInput,
    refreshing,
    showSkeleton,
    suggestions,
    searching,
    suggestionsLoading,
    weatherData,
    weatherLoading,
    weatherError,
    forecastData,
    forecastLoading,
    forecastError,
    handleSearch,
    handleInputChange,
    handleSuggestionSelect,
    handleLocationPress,
    onRefresh
  } = useWeatherState();

  const dispatch = useDispatch<AppDispatch>();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const colors = useThemeColors();
  const styles = useMemo(() => createHomeScreenStyles(colors), [colors]);

  const hourlyData = useMemo(() => 
    forecastData?.forecastday[0].hour || [], 
    [forecastData?.forecastday]
  );

  const dailyData = useMemo(() => 
    forecastData?.forecastday || [], 
    [forecastData?.forecastday]
  );

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Header
        title="Weather"
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <SearchBar
          value={cityInput}
          onChangeText={handleInputChange}
          onSearch={handleSearch}
          onSuggestionSelect={handleSuggestionSelect}
          suggestions={suggestions}
          searching={searching}
          placeholder={PLACEHOLDER_TEXT.SEARCH}
          searchButtonText={PLACEHOLDER_TEXT.SEARCH_BUTTON}
        />
        <WeatherCard
          data={weatherData || undefined}
          showSkeleton={showSkeleton}
        />
        <Forecast
          hourlyData={hourlyData.map(item => ({
            timestamp: new Date(item.time).getTime() / 1000,
            temperature: item.temp_c,
            icon: item.condition.icon,
          }))}
          dailyData={dailyData.map(item => ({
            timestamp: new Date(item.date).getTime() / 1000,
            temperature: item.day.maxtemp_c,
            icon: item.day.condition.icon,
          }))}
          showSkeleton={showSkeleton}
        />
        {(weatherError || forecastError) && (
          <AppText style={styles.errorText}>
            {weatherError || forecastError}
          </AppText>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}; 