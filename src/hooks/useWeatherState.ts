import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import { Alert, Keyboard, Platform } from 'react-native';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { useWeatherData, useWeatherForecast, getPlaceDetails, getPlaceSuggestions } from '../services/api';
import { RootState, AppDispatch } from '../store/store';
import { fetchWeatherByCity, fetchWeatherByCoords, fetchWeatherForecastByCoords } from '../store/weatherSlice';

interface Suggestion {
  place_id: string;
  description: string;
}

export const useWeatherState = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { city, weatherData, weatherForecast, loading: weatherLoading, error: weatherError } = useSelector((state: RootState) => state.weather);

  const [cityInput, setCityInput] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [searching, setSearching] = useState(false);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);

  const handleSearch = useCallback(async () => {
    if (cityInput.trim()) {
      setSearching(true);
      try {
        await dispatch(fetchWeatherByCity(cityInput.trim()));
        if (weatherData?.location) {
          await dispatch(fetchWeatherForecastByCoords({
            lat: weatherData.location.lat,
            lon: weatherData.location.lon
          }));
        }
      } finally {
        setSearching(false);
      }
    }
  }, [cityInput, dispatch, weatherData]);

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
      Keyboard.dismiss();
      const data = await getPlaceDetails(suggestion.place_id);
      if (data.result?.geometry?.location) {
        const location = data.result.geometry.location;
        await Promise.all([
          dispatch(fetchWeatherByCoords({ lat: location.lat, lon: location.lng })),
          dispatch(fetchWeatherForecastByCoords({ lat: location.lat, lon: location.lng }))
        ]);
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
  }, [dispatch]);

  const handleLocationPermission = async () => {
    try {
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        setShowSkeleton(true);
        Geolocation.getCurrentPosition(
          async (position) => {
            try {
              await dispatch(fetchWeatherByCoords({
                lat: position.coords.latitude,
                lon: position.coords.longitude
              }));
              if (position.coords) {
                await dispatch(fetchWeatherForecastByCoords({
                  lat: position.coords.latitude,
                  lon: position.coords.longitude
                }));
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
  }
    
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      if (weatherData?.location) {
        await dispatch(fetchWeatherByCoords({
          lat: weatherData.location.lat,
          lon: weatherData.location.lon
        }));
        await dispatch(fetchWeatherForecastByCoords({
          lat: weatherData.location.lat,
          lon: weatherData.location.lon
        }));
      }
    } finally {
      setRefreshing(false);
    }
  }, [weatherData, dispatch]);

  const requestLocationPermission = async () => {
    const permission = Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
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
      if (!city) {
        const granted = await requestLocationPermission();
        if (granted) {
          handleLocationPermission();
        }
      }
    };

    checkAndRequestLocationPermission();
  }, [city]);

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
    forecastData: weatherForecast,
    forecastLoading: weatherLoading,
    forecastError: weatherError,
    handleSearch,
    handleInputChange,
    handleSuggestionSelect,
    handleLocationPermission,
    onRefresh
  };
}; 