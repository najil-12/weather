import React, { memo } from 'react';
import { View, Image, FlatList, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { AppText } from './AppText';
import { useThemeColors } from '../theme/useThemeColors';
import { createForecastStyles } from './styles/Forecast.styles';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { WEATHER_UNITS } from '../constants/config';

interface ForecastItem {
  timestamp: number;
  temperature: number;
  icon: string;
}

interface ForecastProps {
  hourlyData?: ForecastItem[];
  dailyData?: ForecastItem[];
  showSkeleton?: boolean;
}

const HourlyCard = memo(({ item, styles }: { item: ForecastItem; styles: any }) => (
  <View style={styles.hourlyCard}>
    <AppText style={styles.hourlyTime}>{new Date(item.timestamp * 1000).getHours()}:00</AppText>
    {item.icon && (
      <Image 
        source={{ uri: item.icon.startsWith('//') ? `https:${item.icon}` : item.icon }} 
        style={styles.hourlyIcon} 
        resizeMode="cover" 
      />
    )}
    <AppText style={styles.hourlyTemp}>{item.temperature}{WEATHER_UNITS?.TEMPERATURE}</AppText>
  </View>
));

const DailyCard = memo(({ item, styles }: { item: ForecastItem; styles: any }) => (
  <View style={styles.dailyCard}>
    <AppText style={styles.dailyDay}>
      {new Date(item.timestamp * 1000).toLocaleDateString(undefined, { weekday: 'short' })}
    </AppText>
    {item.icon && (
      <Image 
        source={{ uri: item.icon.startsWith('//') ? `https:${item.icon}` : item.icon }} 
        style={styles.dailyIcon} 
      />
    )}
    <AppText style={styles.dailyTemp}>{item.temperature}{WEATHER_UNITS?.TEMPERATURE}</AppText>
  </View>
));

const SkeletonHourlyForecast = memo(({ colors, styles }: { colors: any; styles: any }) => (
  <View style={{ marginBottom: 8 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 8 }}>
      <View style={{ width: 180, height: 28, borderRadius: 8 }} />
    </View>
    <View style={{ flexDirection: 'row', paddingLeft: 20 }}>
      {[...Array(5)].map((_, idx) => (
        <View key={idx} style={{
          width: 100,
          borderRadius: 24,
          backgroundColor: colors.inputBackground,
          marginRight: 16,
          padding: 16,
          alignItems: 'center',
        }}>
          <SkeletonPlaceholder backgroundColor={colors.inputBackground} highlightColor={colors.border}>
            {/* Time */}
            <View style={{ width: 40, height: 18, borderRadius: 6, marginBottom: 8 }} />
            {/* Icon */}
            <View style={{ width: 48, height: 48, borderRadius: 24, marginBottom: 8 }} />
            {/* Temp */}
            <View style={{ width: 40, height: 22, borderRadius: 6 }} />
          </SkeletonPlaceholder>
        </View>
      ))}
    </View>
  </View>
));

const SkeletonDailyForecast = memo(({ colors, styles }: { colors: any; styles: any }) => (
  <View style={{ marginBottom: 16 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 8, marginTop: 8 }}>
      <View style={{ width: 180, height: 28, borderRadius: 8 }} />
    </View>
    <View style={{ flexDirection: 'row', paddingLeft: 20 }}>
      {[...Array(5)].map((_, idx) => (
        <View key={idx} style={{
          width: 100,
          borderRadius: 24,
          backgroundColor: colors.inputBackground,
          marginRight: 16,
          padding: 16,
          alignItems: 'center',
        }}>
          <SkeletonPlaceholder backgroundColor={colors.inputBackground} highlightColor={colors.border}>
            {/* Day */}
            <View style={{ width: 40, height: 18, borderRadius: 6, marginBottom: 8 }} />
            {/* Icon */}
            <View style={{ width: 48, height: 48, borderRadius: 24, marginBottom: 8 }} />
            {/* Temp */}
            <View style={{ width: 40, height: 22, borderRadius: 6 }} />
          </SkeletonPlaceholder>
        </View>
      ))}
    </View>
  </View>
));

export const Forecast: React.FC<ForecastProps> = ({
  hourlyData = [],
  dailyData = [],
  showSkeleton = false
}) => {
  const colors = useThemeColors();
  const styles = createForecastStyles(colors);

  if (showSkeleton) {
    return (
      <>
        <SkeletonHourlyForecast colors={colors} styles={styles} />
        <SkeletonDailyForecast colors={colors} styles={styles} />
      </>
    );
  }

  if (!hourlyData.length && !dailyData.length) {
    return null;
  }

  const renderHourlyItem = ({ item, index }: { item: ForecastItem; index: number }) => {
    const cardStyle: ViewStyle = {
      ...styles.hourlyCard,
      ...(index === 0 ? { marginLeft: 20 } : {}),
      ...(index === hourlyData.length - 1 ? { marginRight: 20 } : {}),
    };
    return (
      <HourlyCard
        item={item}
        styles={{ ...styles, hourlyCard: cardStyle }}
      />
    );
  };

  const renderDailyItem = ({ item, index }: { item: ForecastItem; index: number }) => {
    const cardStyle: ViewStyle = {
      ...styles.dailyCard,
      ...(index === 0 ? { marginLeft: 20 } : {}),
      ...(index === dailyData.length - 1 ? { marginRight: 20 } : {}),
    };
    return (
      <DailyCard
        item={item}
        styles={{ ...styles, dailyCard: cardStyle }}
      />
    );
  };

  return (
    <>
      {hourlyData.length > 0 && (
        <>
          <AppText style={styles.sectionTitle}>Hourly Forecast</AppText>
          <FlatList
            data={hourlyData}
            renderItem={renderHourlyItem}
            keyExtractor={(_, idx) => `hourly-${idx}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.hourlyScroll}
          />
        </>
      )}

      {dailyData.length > 0 && (
        <>
          <AppText style={styles.sectionTitle}>Daily Forecast</AppText>
          <FlatList
            data={dailyData}
            renderItem={renderDailyItem}
            keyExtractor={(_, idx) => `daily-${idx}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.dailyScroll}
          />
        </>
      )}
    </>
  );
}; 