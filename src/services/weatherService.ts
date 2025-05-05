import { WeatherData, WeatherForecast } from '../types/weather';
import { getWeatherByCity, getWeatherByCoords, getWeatherForecastByCoords } from './api';

export const getWeatherByCityService = async (city: string): Promise<WeatherData> => {
  const data = await getWeatherByCity(city);
  return {
    location: {
      name: data.location.name,
      region: data.location.region,
      country: data.location.country,
      lat: data.location.lat,
      lon: data.location.lon,
      localtime: data.location.localtime,
    },
    current: {
      temp_c: Math.round(data.current.temp_c),
      condition: {
        text: data.current.condition.text,
        icon: data.current.condition.icon,
      },
      wind_kph: Math.round(data.current.wind_kph),
      humidity: data.current.humidity,
      feelslike_c: Math.round(data.current.feelslike_c),
    },
  };
};

export const getWeatherByCoordsService = async (lat: number, lon: number): Promise<WeatherData> => {
  const data = await getWeatherByCoords(lat, lon);
  return {
    location: {
      name: data.location.name,
      region: data.location.region,
      country: data.location.country,
      lat: data.location.lat,
      lon: data.location.lon,
      localtime: data.location.localtime,
    },
    current: {
      temp_c: Math.round(data.current.temp_c),
      condition: {
        text: data.current.condition.text,
        icon: data.current.condition.icon,
      },
      wind_kph: Math.round(data.current.wind_kph),
      humidity: data.current.humidity,
      feelslike_c: Math.round(data.current.feelslike_c),
    },
  };
};

export const getWeatherForecastByCoordsService = async (lat: number, lon: number): Promise<WeatherForecast> => {
  const data = await getWeatherForecastByCoords(lat, lon);
  return {
    forecastday: data.forecast.forecastday.map(day => ({
      date: day.date,
      day: {
        maxtemp_c: Math.round(day.day.maxtemp_c),
        mintemp_c: Math.round(day.day.mintemp_c),
        condition: {
          text: day.day.condition.text,
          icon: day.day.condition.icon,
        },
      },
      hour: day.hour.map(hour => ({
        time: hour.time,
        temp_c: Math.round(hour.temp_c),
        condition: {
          text: hour.condition.text,
          icon: hour.condition.icon,
        },
      })),
    })),
  };
}; 