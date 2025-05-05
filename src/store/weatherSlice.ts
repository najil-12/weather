import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { WeatherData, WeatherForecast } from '../types/weather';
import { getWeatherByCityService, getWeatherByCoordsService, getWeatherForecastByCoordsService } from '../services/weatherService';

interface WeatherState {
  city: string;
  weatherData: WeatherData | null;
  weatherForecast: WeatherForecast | null;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  city: '',
  weatherData: null,
  weatherForecast: null,
  loading: false,
  error: null,
};

export const fetchWeatherByCity = createAsyncThunk<
  { city: string; data: WeatherData },
  string,
  { rejectValue: string }
>(
  'weather/fetchWeatherByCity',
  async (city: string, { rejectWithValue }) => {
    try {
      const data = await getWeatherByCityService(city);
      return { city, data };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch weather');
    }
  }
);

export const fetchWeatherByCoords = createAsyncThunk<
  { city: string; data: WeatherData },
  { lat: number; lon: number },
  { rejectValue: string }
>(
  'weather/fetchWeatherByCoords',
  async ({ lat, lon }, { rejectWithValue }) => {
    try {
      const data = await getWeatherByCoordsService(lat, lon);
      return { city: data.location.name, data };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch weather');
    }
  }
);

export const fetchWeatherForecastByCoords = createAsyncThunk<
  WeatherForecast,
  { lat: number; lon: number },
  { rejectValue: string }
>(
  'weather/fetchWeatherForecastByCoords',
  async ({ lat, lon }, { rejectWithValue }) => {
    try {
      const data = await getWeatherForecastByCoordsService(lat, lon);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch weather forecast');
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherByCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        state.loading = false;
        state.weatherData = action.payload.data;
        state.city = action.payload.city;
      })
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch weather';
      })
      .addCase(fetchWeatherByCoords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByCoords.fulfilled, (state, action) => {
        state.loading = false;
        state.weatherData = action.payload.data;
        state.city = action.payload.city;
      })
      .addCase(fetchWeatherByCoords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch weather';
      })
      .addCase(fetchWeatherForecastByCoords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherForecastByCoords.fulfilled, (state, action) => {
        state.loading = false;
        state.weatherForecast = action.payload;
      })
      .addCase(fetchWeatherForecastByCoords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch weather forecast';
      });
  },
});

export default weatherSlice.reducer; 