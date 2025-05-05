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

describe('weatherSlice', () => {
  const initialState = {
    city: '',
    weatherData: null,
    weatherForecast: null,
    loading: false,
    error: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchWeatherByCity', () => {
    it('should handle pending state', () => {
      const action = fetchWeatherByCity.pending('requestId', 'London');
      const state = weatherReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('should handle fulfilled state', () => {
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
      const action = fetchWeatherByCity.fulfilled(
        { city: 'London', data: mockWeatherData },
        'requestId',
        'London'
      );
      const state = weatherReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.city).toBe('London');
      expect(state.weatherData).toEqual(mockWeatherData);
    });

    it('should handle rejected state', () => {
      const error = 'Failed to fetch weather';
      const action = fetchWeatherByCity.rejected(
        new Error(error),
        'requestId',
        'London',
        error
      );
      const state = weatherReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(error);
    });
  });

  describe('fetchWeatherByCoords', () => {
    it('should handle pending state', () => {
      const action = fetchWeatherByCoords.pending('requestId', { lat: 51.52, lon: -0.11 });
      const state = weatherReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('should handle fulfilled state', () => {
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
      const action = fetchWeatherByCoords.fulfilled(
        { city: 'London', data: mockWeatherData },
        'requestId',
        { lat: 51.52, lon: -0.11 }
      );
      const state = weatherReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.city).toBe('London');
      expect(state.weatherData).toEqual(mockWeatherData);
    });

    it('should handle rejected state', () => {
      const error = 'Failed to fetch weather';
      const action = fetchWeatherByCoords.rejected(
        new Error(error),
        'requestId',
        { lat: 51.52, lon: -0.11 },
        error
      );
      const state = weatherReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(error);
    });
  });

  describe('fetchWeatherForecastByCoords', () => {
    it('should handle pending state', () => {
      const action = fetchWeatherForecastByCoords.pending('requestId', { lat: 51.52, lon: -0.11 });
      const state = weatherReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('should handle fulfilled state', () => {
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
      const action = fetchWeatherForecastByCoords.fulfilled(
        mockForecastData,
        'requestId',
        { lat: 51.52, lon: -0.11 }
      );
      const state = weatherReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.weatherForecast).toEqual(mockForecastData);
    });

    it('should handle rejected state', () => {
      const error = 'Failed to fetch forecast';
      const action = fetchWeatherForecastByCoords.rejected(
        new Error(error),
        'requestId',
        { lat: 51.52, lon: -0.11 },
        error
      );
      const state = weatherReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(error);
    });
  });
}); 