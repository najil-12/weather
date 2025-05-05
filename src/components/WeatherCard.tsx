import React from 'react';
import { View, Image, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { AppText } from './AppText';
import { LocationLottie } from './LocationLottie';
import { useThemeColors } from '../theme/useThemeColors';
import { createWeatherCardStyles } from './styles/WeatherCard.styles';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { WEATHER_UNITS } from '../constants/config';

interface WeatherData {
  location: {
    name: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_kph: number;
    humidity: number;
    feelslike_c: number;
  };
}

interface WeatherCardProps {
  data?: WeatherData;
  showSkeleton?: boolean;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  data,
  showSkeleton = false
}) => {
  const colors = useThemeColors();
  const styles = createWeatherCardStyles(colors);

  if (showSkeleton) {
    return (
      <View style={styles.contentSection}>
        <View style={styles.weatherCard}>
          <SkeletonPlaceholder backgroundColor={colors.inputBackground} highlightColor={colors.border}>
            <View style={{ marginBottom: 20 }}>
              {/* City Name */}
              <View style={{ width: 120, height: 38, borderRadius: 8, marginBottom: 10 }} />
              {/* Temperature */}
              <View style={{ width: 100, height: 60, borderRadius: 12, marginBottom: 10 }} />
              {/* Condition */}
              <View style={{ width: 220, height: 28, borderRadius: 8, marginBottom: 18 }} />
            </View>
            {/* Divider */}
            <View style={{ height: 1, backgroundColor: colors.border, marginBottom: 18 }} />
            {/* Footer Row */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              {[...Array(3)].map((_, idx) => (
                <View key={idx} style={{ alignItems: 'flex-start' }}>
                  <View style={{ width: 60, height: 18, borderRadius: 6, marginBottom: 8 }} />
                  <View style={{ width: 50, height: 24, borderRadius: 6 }} />
                </View>
              ))}
            </View>
          </SkeletonPlaceholder>
        </View>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.contentSection}>
        <View style={styles.weatherCard}>
          <AppText style={styles.welcomeText}>Welcome</AppText>
          <AppText style={styles.welcomeDescription}>
            Start by allowing location access or search for your city to see the weather!
          </AppText>
          <LocationLottie />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.contentSection}>
      <View style={styles.weatherCard}>
        <View style={styles.weatherCardHeader}>
          <View style={{width:"60%"}}>
            <AppText style={styles.cityName}>{data.location.name}</AppText>
            <AppText style={styles.temperature}>{Math.round(data.current.temp_c)}{WEATHER_UNITS?.TEMPERATURE}</AppText>
            <AppText style={styles.condition}>{data.current.condition.text}</AppText>
          </View>
          {data.current.condition.icon && (
            <Image
              source={{ uri: data.current.condition.icon.startsWith('//') ? `https:${data.current.condition.icon}` : data.current.condition.icon }}
              style={styles.weatherIcon}
              resizeMode="contain"
            />
          )}
        </View>
        <View style={styles.weatherCardFooter}>
          <View style={styles.weatherCardFooterItem}>
            <AppText style={styles.footerLabel}>Wind</AppText>
            <AppText style={styles.footerValue}>{Math.round(data.current.wind_kph)} {WEATHER_UNITS?.WIND_SPEED}</AppText>
          </View>
          <View style={styles.weatherCardFooterItem}>
            <AppText style={styles.footerLabel}>Humidity</AppText>
            <AppText style={styles.footerValue}>{data.current.humidity}{WEATHER_UNITS?.HUMIDITY}</AppText>
          </View>
          <View style={styles.weatherCardFooterItem}>
            <AppText style={styles.footerLabel}>Feels Like</AppText>
            <AppText style={styles.footerValue}>{Math.round(data.current.feelslike_c)}{WEATHER_UNITS?.TEMPERATURE}</AppText>
          </View>
        </View>
      </View>
    </View>
  );
}; 