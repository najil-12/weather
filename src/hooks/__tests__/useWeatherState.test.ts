import { useWeatherState } from '../useWeatherState';
import { getWeatherByCityService, getWeatherByCoordsService, getWeatherForecastByCoordsService } from '../../services/weatherService';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Suggestion {
  place_id: string;
  description: string;
}

// Mock the weather service
jest.mock('../../services/weatherService', () => ({
  getWeatherByCityService: jest.fn(),
  getWeatherByCoordsService: jest.fn(),
  getWeatherForecastByCoordsService: jest.fn(),
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe('useWeatherState', () => {
  let hook: ReturnType<typeof useWeatherState>;

  beforeEach(() => {
    jest.clearAllMocks();
    hook = useWeatherState();
  });

  it('initializes with default values', () => {
    expect(hook.cityInput).toBe('');
    expect(hook.refreshing).toBe(false);
    expect(hook.showSkeleton).toBe(false);
    expect(hook.suggestions).toEqual([]);
    expect(hook.weatherData).toBeNull();
  });

  it('handles input change correctly', () => {
    hook.handleInputChange('London');
    expect(hook.cityInput).toBe('London');
  });

  it('handles search correctly', async () => {
    const mockWeatherData = {
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
    
    (getWeatherByCityService as jest.Mock).mockResolvedValue(mockWeatherData);
    
    await hook.handleSearch();
    
    expect(hook.weatherData).toEqual(mockWeatherData);
    expect(hook.cityInput).toBe('');
  });

  it('handles location press correctly', async () => {
    const mockWeatherData = {
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
    
    (getWeatherByCoordsService as jest.Mock).mockResolvedValue(mockWeatherData);
    
    await hook.handleLocationPress();
    
    expect(hook.weatherData).toEqual(mockWeatherData);
  });

  it('handles refresh correctly', async () => {
    const mockWeatherData = {
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
    
    (getWeatherByCoordsService as jest.Mock).mockResolvedValue(mockWeatherData);
    
    await hook.onRefresh();
    
    expect(hook.refreshing).toBe(false);
    expect(hook.weatherData).toEqual(mockWeatherData);
  });

  it('handles suggestion select correctly', async () => {
    const mockWeatherData = {
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
    
    (getWeatherByCityService as jest.Mock).mockResolvedValue(mockWeatherData);
    
    const suggestion: Suggestion = {
      place_id: 'ChIJdd4hrwug2EcRmSrV3Vo6llI',
      description: 'London, UK',
    };
    
    await hook.handleSuggestionSelect(suggestion);
    
    expect(hook.weatherData).toEqual(mockWeatherData);
    expect(hook.cityInput).toBe('');
    expect(hook.suggestions).toEqual([]);
  });

  it('handles error states correctly', async () => {
    const error = new Error('Failed to fetch weather');
    (getWeatherByCityService as jest.Mock).mockRejectedValue(error);
    
    await hook.handleSearch();
    
    expect(hook.weatherData).toBeNull();
    expect(hook.weatherError).toBe('Failed to fetch weather');
  });
}); 