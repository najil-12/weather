import { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import { Alert, Platform } from 'react-native';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { useWeatherData, useWeatherForecast, getPlaceDetails, getPlaceSuggestions } from '../services/api';

const STORAGE_KEYS = {
  SELECTED_CITY: 'selected_city',
  WEATHER_DATA: 'weather_data',
  FORECAST_DATA: 'forecast_data',
};

interface Suggestion {
  place_id: string;
  description: string;
}

export const useWeatherState = () => {
  const [cityInput, setCityInput] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [searching, setSearching] = useState(false);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);

  const { 
    data: weatherData, 
    loading: weatherLoading, 
    error: weatherError, 
    fetchWeatherByCity, 
    fetchWeatherByCoords 
  } = useWeatherData();

  const {
    data: forecastData,
    loading: forecastLoading,
    error: forecastError,
    fetchForecast
  } = useWeatherForecast();

  const handleSearch = useCallback(async () => {
    if (cityInput.trim()) {
      setSearching(true);
      try {
        await fetchWeatherByCity(cityInput.trim());
        if (weatherData?.location) {
          await fetchForecast(weatherData.location.lat, weatherData.location.lon);
        }
      } finally {
        setSearching(false);
      }
    }
  }, [cityInput, fetchWeatherByCity, fetchForecast, weatherData]);

  const debouncedFetchSuggestions = useCallback(
    (input: string) => {
      const timeoutId = setTimeout(() => {
        fetchPlaceSuggestions(input);
      }, 300);
      return () => clearTimeout(timeoutId);
    },
    []
  );

  const handleInputChange = useCallback((text: string) => {
    setCityInput(text);
    debouncedFetchSuggestions(text);
  }, [debouncedFetchSuggestions]);

  const fetchPlaceSuggestions = useCallback(async (input: string) => {
    if (!input.trim()) {
      setSuggestions([]);
      return;
    }
    setSuggestionsLoading(true);
    try {
      const response = await getPlaceSuggestions(input);
      setSuggestions(response.predictions || []);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    } finally {
      setSuggestionsLoading(false);
    }
  }, []);

  const handleSuggestionSelect = useCallback(async (suggestion: Suggestion) => {
    try {
      setCityInput(suggestion.description);
      setSuggestions([]);
      setSearching(true);
      setSuggestionsLoading(true);
      setShowSkeleton(true);

      const data = await getPlaceDetails(suggestion.place_id);
      if (data.result?.geometry?.location) {
        const location = data.result.geometry.location;
        await Promise.all([
          fetchWeatherByCoords(location.lat, location.lng),
          fetchForecast(location.lat, location.lng)
        ]);
        
        await AsyncStorage.setItem(STORAGE_KEYS.SELECTED_CITY, suggestion.description);
      } else {
        throw new Error('Invalid place details response');
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
      Alert.alert(
        'Error',
        'Failed to get weather for selected location. Please try again.'
      );
      setCityInput('');
    } finally {
      setSearching(false);
      setSuggestionsLoading(false);
      setShowSkeleton(false);
    }
  }, [fetchWeatherByCoords, fetchForecast]);

  const handleLocationPermission = useCallback(async () => {
    try {
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        setShowSkeleton(true);
        Geolocation.getCurrentPosition(
          async (position) => {
            try {
              await fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
              console.log('Weather data:', weatherData);
              
              if (position.coords) {
                await fetchForecast(position.coords.latitude, position.coords.longitude);
              }
            } finally {
              setShowSkeleton(false);
            }
          },
          (error) => {
            console.error('Error getting location:', error);
            setShowSkeleton(false);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      }
    } catch (error) {
      console.error('Error handling location:', error);
      setShowSkeleton(false);
    }
  }, [fetchWeatherByCoords, fetchForecast, weatherData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      if (weatherData?.location) {
        await fetchWeatherByCoords(weatherData.location.lat, weatherData.location.lon);
        await fetchForecast(weatherData.location.lat, weatherData.location.lon);
      }
    } finally {
      setRefreshing(false);
    }
  }, [weatherData, fetchWeatherByCoords, fetchForecast]);

  const requestLocationPermission = async () => {
    const permission = Platform.OS === 'android' ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
    const result = await request(permission);
    return result === RESULTS.GRANTED;
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (weatherLoading) {
      setShowSkeleton(true);
      timeout = setTimeout(() => setShowSkeleton(false), 1500);
    } else {
      setShowSkeleton(false);
    }
    return () => clearTimeout(timeout);
  }, [weatherLoading]);

  useEffect(() => {
    const checkAndRequestLocationPermission = async () => {
      if (!weatherData?.location) {
        const granted = await requestLocationPermission();
        if (granted) {
          handleLocationPermission();
        }
      }
    };

    checkAndRequestLocationPermission();
  }, [weatherData, handleLocationPermission]);

  useEffect(() => {
    return () => {
      setSuggestions([]);
      setSearching(false);
      setSuggestionsLoading(false);
    };
  }, []);

  return {
    cityInput,
    setCityInput,
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
    handleLocationPermission,
    onRefresh
  };
}; 