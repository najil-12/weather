import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { HomeScreen } from '../HomeScreen';
import { useWeatherState } from '../../hooks/useWeatherState';
import { WeatherData, WeatherForecast } from '../../types/weather';

// Mock the useWeatherState hook
jest.mock('../../hooks/useWeatherState');

// Mock the useWeatherState hook implementation
const mockUseWeatherState = useWeatherState as jest.MockedFunction<typeof useWeatherState>;

describe('HomeScreen', () => {
  const mockWeatherData: WeatherData = {
    location: {
      name: 'London',
      region: 'City of London',
      country: 'United Kingdom',
      lat: 51.52,
      lon: -0.11,
      localtime: '2024-03-20 12:00',
    },
    current: {
      temp_c: 15,
      condition: {
        text: 'Partly cloudy',
        icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
      },
      wind_kph: 10,
      humidity: 75,
      feelslike_c: 14,
    },
  };

  const mockForecastData: WeatherForecast = {
    forecastday: [
      {
        date: '2024-03-20',
        day: {
          maxtemp_c: 18,
          mintemp_c: 12,
          condition: {
            text: 'Partly cloudy',
            icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
          },
        },
        hour: [
          {
            time: '2024-03-20 00:00',
            temp_c: 15,
            condition: {
              text: 'Partly cloudy',
              icon: '//cdn.weatherapi.com/weather/64x64/night/116.png',
            },
          },
        ],
      },
    ],
  };

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('renders loading state correctly', () => {
    mockUseWeatherState.mockReturnValue({
      cityInput: '',
      setCityInput: jest.fn(),
      refreshing: false,
      showSkeleton: true,
      suggestions: [],
      searching: false,
      suggestionsLoading: false,
      weatherData: null,
      weatherLoading: false,
      weatherError: null,
      forecastData: null,
      forecastLoading: false,
      forecastError: null,
      handleSearch: jest.fn(),
      handleInputChange: jest.fn(),
      handleSuggestionSelect: jest.fn(),
      handleLocationPress: jest.fn(),
      onRefresh: jest.fn(),
    });

    const { getByTestId } = render(<HomeScreen />);
    expect(getByTestId('weather-card-skeleton')).toBeTruthy();
  });

  it('renders weather data correctly', () => {
    mockUseWeatherState.mockReturnValue({
      cityInput: 'London',
      setCityInput: jest.fn(),
      refreshing: false,
      showSkeleton: false,
      suggestions: [],
      searching: false,
      suggestionsLoading: false,
      weatherData: mockWeatherData,
      weatherLoading: false,
      weatherError: null,
      forecastData: mockForecastData,
      forecastLoading: false,
      forecastError: null,
      handleSearch: jest.fn(),
      handleInputChange: jest.fn(),
      handleSuggestionSelect: jest.fn(),
      handleLocationPress: jest.fn(),
      onRefresh: jest.fn(),
    });

    const { getByText, getByTestId } = render(<HomeScreen />);
    expect(getByText('London')).toBeTruthy();
    expect(getByText('15°')).toBeTruthy();
    expect(getByText('Partly cloudy')).toBeTruthy();
    expect(getByTestId('forecast-section')).toBeTruthy();
  });

  it('handles input change correctly', () => {
    const handleInputChange = jest.fn();
    mockUseWeatherState.mockReturnValue({
      cityInput: '',
      setCityInput: jest.fn(),
      refreshing: false,
      showSkeleton: false,
      suggestions: [],
      searching: false,
      suggestionsLoading: false,
      weatherData: null,
      weatherLoading: false,
      weatherError: null,
      forecastData: null,
      forecastLoading: false,
      forecastError: null,
      handleSearch: jest.fn(),
      handleInputChange,
      handleSuggestionSelect: jest.fn(),
      handleLocationPress: jest.fn(),
      onRefresh: jest.fn(),
    });

    const { getByPlaceholderText } = render(<HomeScreen />);
    const input = getByPlaceholderText('Enter city name');
    fireEvent.changeText(input, 'London');

    expect(handleInputChange).toHaveBeenCalledWith('London');
  });

  it('handles suggestion selection correctly', async () => {
    const handleSuggestionSelect = jest.fn();
    mockUseWeatherState.mockReturnValue({
      cityInput: 'London',
      setCityInput: jest.fn(),
      refreshing: false,
      showSkeleton: false,
      suggestions: [
        { place_id: '1', description: 'London, UK' },
        { place_id: '2', description: 'London, Canada' },
      ],
      searching: false,
      suggestionsLoading: false,
      weatherData: null,
      weatherLoading: false,
      weatherError: null,
      forecastData: null,
      forecastLoading: false,
      forecastError: null,
      handleSearch: jest.fn(),
      handleInputChange: jest.fn(),
      handleSuggestionSelect,
      handleLocationPress: jest.fn(),
      onRefresh: jest.fn(),
    });

    const { getByText } = render(<HomeScreen />);
    const suggestion = getByText('London, UK');
    fireEvent.press(suggestion);

    expect(handleSuggestionSelect).toHaveBeenCalledWith({
      place_id: '1',
      description: 'London, UK',
    });
  });

  it('handles refresh correctly', async () => {
    const onRefresh = jest.fn();
    mockUseWeatherState.mockReturnValue({
      cityInput: 'London',
      setCityInput: jest.fn(),
      refreshing: false,
      showSkeleton: false,
      suggestions: [],
      searching: false,
      suggestionsLoading: false,
      weatherData: mockWeatherData,
      weatherLoading: false,
      weatherError: null,
      forecastData: mockForecastData,
      forecastLoading: false,
      forecastError: null,
      handleSearch: jest.fn(),
      handleInputChange: jest.fn(),
      handleSuggestionSelect: jest.fn(),
      handleLocationPress: jest.fn(),
      onRefresh,
    });

    const { getByTestId } = render(<HomeScreen />);
    const scrollView = getByTestId('home-scroll-view');
    fireEvent.scroll(scrollView, {
      nativeEvent: {
        contentOffset: { y: -100 },
        contentSize: { height: 1000 },
        layoutMeasurement: { height: 500 },
      },
    });

    await waitFor(() => {
      expect(onRefresh).toHaveBeenCalled();
    });
  });

  it('handles clear input correctly', () => {
    const handleClearInput = jest.fn();
    mockUseWeatherState.mockReturnValue({
      cityInput: 'London',
      setCityInput: jest.fn(),
      refreshing: false,
      showSkeleton: false,
      suggestions: [],
      searching: false,
      suggestionsLoading: false,
      weatherData: null,
      weatherLoading: false,
      weatherError: null,
      forecastData: null,
      forecastLoading: false,
      forecastError: null,
      handleSearch: jest.fn(),
      handleInputChange: jest.fn(),
      handleSuggestionSelect: jest.fn(),
      handleLocationPress: jest.fn(),
      onRefresh: jest.fn(),
    });

    const { getByTestId } = render(<HomeScreen />);
    const clearButton = getByTestId('clear-input-button');
    fireEvent.press(clearButton);

    expect(handleClearInput).toHaveBeenCalled();
  });

  it('handles get location correctly', () => {
    const handleLocationPress = jest.fn();
    mockUseWeatherState.mockReturnValue({
      cityInput: '',
      setCityInput: jest.fn(),
      refreshing: false,
      showSkeleton: false,
      suggestions: [],
      searching: false,
      suggestionsLoading: false,
      weatherData: null,
      weatherLoading: false,
      weatherError: null,
      forecastData: null,
      forecastLoading: false,
      forecastError: null,
      handleSearch: jest.fn(),
      handleInputChange: jest.fn(),
      handleSuggestionSelect: jest.fn(),
      handleLocationPress,
      onRefresh: jest.fn(),
    });

    const { getByTestId } = render(<HomeScreen />);
    const locationButton = getByTestId('get-location-button');
    fireEvent.press(locationButton);

    expect(handleLocationPress).toHaveBeenCalled();
  });
}); 