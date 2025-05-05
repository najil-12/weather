import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import { useThemeColors } from '../theme/useThemeColors';
import { metrics } from '../utils/metrics';

const { width } = Dimensions.get('window');

export const LocationLottie: React.FC = () => {
  const colors = useThemeColors();

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/animations/location.json')}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: metrics?.spacing?.space_20,
  },
  animation: {
    width: width * 0.6,
    height: width * 0.6,
  },
}); 