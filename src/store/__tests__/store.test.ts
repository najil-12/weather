import { configureStore } from '@reduxjs/toolkit';
import weatherReducer, {
  fetchWeatherByCity,
  fetchWeatherByCoords,
  fetchWeatherForecastByCoords,
} from '../weatherSlice';
import { getWeatherByCityService, getWeatherByCoordsService, getWeatherForecastByCoordsService } from '../../services/weatherService';
import { WeatherData, WeatherForecast } from '../../types/weather';

// Mock the weather service
jest.mock('../../services/weatherService', () => ({
  getWeatherByCityService: jest.fn(),
  getWeatherByCoordsService: jest.fn(),
  getWeatherForecastByCoordsService: jest.fn(),
}));

interface RootState {
  weather: {
    city: string;
    weatherData: WeatherData | null;
    weatherForecast: WeatherForecast | null;
    loading: boolean;
    error: string | null;
  };
}

describe('Weather Store', () => {
  let store: ReturnType<typeof configureStore<RootState>>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        weather: weatherReducer,
      },
    });
    jest.clearAllMocks();
  });

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

  describe('fetchWeatherByCity', () => {
    it('should handle fetchWeatherByCity.pending', () => {
      store.dispatch(fetchWeatherByCity.pending('requestId', 'London'));
      const state = store.getState().weather;
      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('should handle fetchWeatherByCity.fulfilled', () => {
      store.dispatch(
        fetchWeatherByCity.fulfilled(
          { city: 'London', data: mockWeatherData },
          'requestId',
          'London'
        )
      );
      const state = store.getState().weather;
      expect(state.loading).toBe(false);
      expect(state.city).toBe('London');
      expect(state.weatherData).toEqual(mockWeatherData);
    });

    it('should handle fetchWeatherByCity.rejected', () => {
      const error = 'Failed to fetch weather';
      store.dispatch(
        fetchWeatherByCity.rejected(
          new Error(error),
          'requestId',
          'London',
          error
        )
      );
      const state = store.getState().weather;
      expect(state.loading).toBe(false);
      expect(state.error).toBe(error);
    });
  });

  describe('fetchWeatherByCoords', () => {
    it('should handle fetchWeatherByCoords.pending', () => {
      store.dispatch(
        fetchWeatherByCoords.pending('requestId', { lat: 51.52, lon: -0.11 })
      );
      const state = store.getState().weather;
      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('should handle fetchWeatherByCoords.fulfilled', () => {
      store.dispatch(
        fetchWeatherByCoords.fulfilled(
          { city: 'London', data: mockWeatherData },
          'requestId',
          { lat: 51.52, lon: -0.11 }
        )
      );
      const state = store.getState().weather;
      expect(state.loading).toBe(false);
      expect(state.city).toBe('London');
      expect(state.weatherData).toEqual(mockWeatherData);
    });

    it('should handle fetchWeatherByCoords.rejected', () => {
      const error = 'Failed to fetch weather';
      store.dispatch(
        fetchWeatherByCoords.rejected(
          new Error(error),
          'requestId',
          { lat: 51.52, lon: -0.11 },
          error
        )
      );
      const state = store.getState().weather;
      expect(state.loading).toBe(false);
      expect(state.error).toBe(error);
    });
  });

  describe('fetchWeatherForecastByCoords', () => {
    it('should handle fetchWeatherForecastByCoords.pending', () => {
      store.dispatch(
        fetchWeatherForecastByCoords.pending('requestId', {
          lat: 51.52,
          lon: -0.11,
        })
      );
      const state = store.getState().weather;
      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('should handle fetchWeatherForecastByCoords.fulfilled', () => {
      store.dispatch(
        fetchWeatherForecastByCoords.fulfilled(
          mockForecastData,
          'requestId',
          { lat: 51.52, lon: -0.11 }
        )
      );
      const state = store.getState().weather;
      expect(state.loading).toBe(false);
      expect(state.weatherForecast).toEqual(mockForecastData);
    });

    it('should handle fetchWeatherForecastByCoords.rejected', () => {
      const error = 'Failed to fetch forecast';
      store.dispatch(
        fetchWeatherForecastByCoords.rejected(
          new Error(error),
          'requestId',
          { lat: 51.52, lon: -0.11 },
          error
        )
      );
      const state = store.getState().weather;
      expect(state.loading).toBe(false);
      expect(state.error).toBe(error);
    });
  });

  describe('Integration Tests', () => {
    it('should handle successful weather and forecast fetch sequence', async () => {
      // Mock successful API responses
      (getWeatherByCoordsService as jest.Mock).mockResolvedValue(mockWeatherData);
      (getWeatherForecastByCoordsService as jest.Mock).mockResolvedValue(mockForecastData);

      // Dispatch weather fetch
      await store.dispatch(
        fetchWeatherByCoords({ lat: 51.52, lon: -0.11 })
      );

      // Dispatch forecast fetch
      await store.dispatch(
        fetchWeatherForecastByCoords({ lat: 51.52, lon: -0.11 })
      );

      const state = store.getState().weather;
      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
      expect(state.city).toBe('London');
      expect(state.weatherData).toEqual(mockWeatherData);
      expect(state.weatherForecast).toEqual(mockForecastData);
    });

    it('should handle error in weather fetch sequence', async () => {
      // Mock failed API response
      const error = 'Failed to fetch weather';
      (getWeatherByCoordsService as jest.Mock).mockRejectedValue(new Error(error));

      // Dispatch weather fetch
      await store.dispatch(
        fetchWeatherByCoords({ lat: 51.52, lon: -0.11 })
      );

      const state = store.getState().weather;
      expect(state.loading).toBe(false);
      expect(state.error).toBe(error);
      expect(state.weatherData).toBe(null);
    });

    it('should handle error in forecast fetch sequence', async () => {
      // Mock successful weather fetch but failed forecast fetch
      (getWeatherByCoordsService as jest.Mock).mockResolvedValue(mockWeatherData);
      const error = 'Failed to fetch forecast';
      (getWeatherForecastByCoordsService as jest.Mock).mockRejectedValue(new Error(error));

      // Dispatch weather fetch
      await store.dispatch(
        fetchWeatherByCoords({ lat: 51.52, lon: -0.11 })
      );

      // Dispatch forecast fetch
      await store.dispatch(
        fetchWeatherForecastByCoords({ lat: 51.52, lon: -0.11 })
      );

      const state = store.getState().weather;
      expect(state.loading).toBe(false);
      expect(state.error).toBe(error);
      expect(state.weatherData).toEqual(mockWeatherData);
      expect(state.weatherForecast).toBe(null);
    });
  });
}); 