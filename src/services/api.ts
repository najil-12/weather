import axios from 'axios';
import Config from 'react-native-config';
import { useState, useCallback } from 'react';

// Type definitions for the config
declare module 'react-native-config' {
  interface NativeConfig {
    WEATHERAPI_BASE_URL: string;
    WEATHERAPI_KEY: string;
    API_TIMEOUT: number;
    GOOGLE_PLACES_API_KEY: string;
    GOOGLE_PLACES_BASE_URL: string;
  }
}

// Types
export interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    localtime: string;
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

export interface WeatherForecast {
  forecastday: Array<{
    date: string;
    day: {
      maxtemp_c: number;
      mintemp_c: number;
      condition: {
        text: string;
        icon: string;
      };
    };
    hour: Array<{
      time: string;
      temp_c: number;
      condition: {
        text: string;
        icon: string;
      };
    }>;
  }>;
}

export interface PlaceSuggestion {
  predictions: Array<{
    place_id: string;
    description: string;
  }>;
}

export interface PlaceDetails {
  result: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  };
}

// Create axios instances
const weatherApi = axios.create({
  baseURL: Config.WEATHERAPI_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

const placesApi = axios.create({
  baseURL: Config.GOOGLE_PLACES_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Custom hooks for weather data
export const useWeatherData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<WeatherData | null>(null);

  const fetchWeatherByCity = useCallback(async (city: string) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching weather for city:', city);
      console.log('Using API key:', Config.WEATHERAPI_KEY ? 'Present' : 'Missing');
      console.log('Using base URL:', Config.WEATHERAPI_BASE_URL);
      
      const response = await weatherApi.get('/current.json', {
        params: {
          key: Config.WEATHERAPI_KEY,
          q: city,
        },
      });
      console.log('Weather API response:', response.data);
      setData(response.data);
    } catch (err) {
      console.error('Error fetching weather by city:', err);
      if (axios.isAxiosError(err)) {
        console.error('API Error details:', {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data,
          config: {
            url: err.config?.url,
            params: err.config?.params,
            baseURL: err.config?.baseURL
          }
        });
        setError(err.response?.data?.error?.message || err.message);
      } else {
        setError('An error occurred while fetching weather data');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWeatherByCoords = useCallback(async (lat: number, lon: number) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching weather for coordinates:', { lat, lon });
      console.log('Using API key:', Config.WEATHERAPI_KEY ? 'Present' : 'Missing');
      console.log('Using base URL:', Config.WEATHERAPI_BASE_URL);
      
      const response = await weatherApi.get('/current.json', {
        params: {
          key: Config.WEATHERAPI_KEY,
          q: `${lat},${lon}`,
        },
      });
      console.log('Weather API response:', response.data);
      setData(response.data);
    } catch (err) {
      console.error('Error fetching weather by coordinates:', err);
      if (axios.isAxiosError(err)) {
        console.error('API Error details:', {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data,
          config: {
            url: err.config?.url,
            params: err.config?.params,
            baseURL: err.config?.baseURL
          }
        });
        setError(err.response?.data?.error?.message || err.message);
      } else {
        setError('An error occurred while fetching weather data');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchWeatherByCity, fetchWeatherByCoords };
};

export const useWeatherForecast = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<WeatherForecast | null>(null);

  const fetchForecast = useCallback(async (lat: number, lon: number) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching forecast for coordinates:', { lat, lon });
      console.log('Using API key:', Config.WEATHERAPI_KEY ? 'Present' : 'Missing');
      console.log('Using base URL:', Config.WEATHERAPI_BASE_URL);
      
      const response = await weatherApi.get('/forecast.json', {
        params: {
          key: Config.WEATHERAPI_KEY,
          q: `${lat},${lon}`,
          days: 7,
          aqi: 'no',
          alerts: 'no',
        },
      });
      console.log('Forecast API response:', response.data);
      setData(response.data.forecast);
    } catch (err) {
      console.error('Error fetching forecast:', err);
      if (axios.isAxiosError(err)) {
        console.error('API Error details:', {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data,
          config: {
            url: err.config?.url,
            params: err.config?.params,
            baseURL: err.config?.baseURL
          }
        });
        setError(err.response?.data?.error?.message || err.message);
      } else {
        setError('An error occurred while fetching forecast data');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchForecast };
};

// Place-related functions
export const getPlaceSuggestions = async (input: string): Promise<PlaceSuggestion> => {
  try {
    console.log('Fetching place suggestions with input:', input);
    console.log('Using API key:', Config.GOOGLE_PLACES_API_KEY ? 'Present' : 'Missing');
    console.log('Using base URL:', Config.GOOGLE_PLACES_BASE_URL);
    
    const response = await placesApi.get('/place/autocomplete/json', {
      params: {
        key: Config.GOOGLE_PLACES_API_KEY,
        input
      },
    });
    console.log('Place suggestions response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching place suggestions:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          params: error.config?.params,
          baseURL: error.config?.baseURL
        }
      });
    } else {
      console.error('Error fetching place suggestions:', error);
    }
    throw error;
  }
};

export const getPlaceDetails = async (placeId: string): Promise<PlaceDetails> => {
  try {
    console.log('Fetching place details for ID:', placeId);
    console.log('Using API key:', Config.GOOGLE_PLACES_API_KEY ? 'Present' : 'Missing');
    console.log('Using base URL:', Config.GOOGLE_PLACES_BASE_URL);
    
    const response = await placesApi.get('/place/details/json', {
      params: {
        key: Config.GOOGLE_PLACES_API_KEY,
        place_id: placeId,
        fields: 'geometry',
      },
    });
    
    console.log('Place details response:', JSON.stringify(response.data, null, 2));
    
    if (!response.data || !response.data.result) {
      console.error('Invalid response format:', response.data);
      throw new Error('Invalid response from Places API');
    }
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching place details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          params: error.config?.params,
          baseURL: error.config?.baseURL
        }
      });
      throw new Error(error.response?.data?.error_message || error.message);
    } else {
      console.error('Error fetching place details:', error);
      throw error;
    }
  }
};

// Weather API functions
export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  try {
    const response = await weatherApi.get('/current.json', {
      params: {
        key: Config.WEATHERAPI_KEY,
        q: city,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error?.message || error.message);
    }
    throw error;
  }
};

export const getWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await weatherApi.get('/current.json', {
      params: {
        key: Config.WEATHERAPI_KEY,
        q: `${lat},${lon}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error?.message || error.message);
    }
    throw error;
  }
};

export const getWeatherForecastByCoords = async (lat: number, lon: number): Promise<WeatherData & { forecast: WeatherForecast }> => {
  try {
    const response = await weatherApi.get('/forecast.json', {
      params: {
        key: Config.WEATHERAPI_KEY,
        q: `${lat},${lon}`,
        days: 7,
        aqi: 'no',
        alerts: 'no',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error?.message || error.message);
    }
    throw error;
  }
}; 