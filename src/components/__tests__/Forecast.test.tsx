import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Forecast } from '../Forecast';
import { WeatherForecast } from '../../types/weather';

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
        {
          time: '2024-03-20 01:00',
          temp_c: 14,
          condition: {
            text: 'Clear',
            icon: '//cdn.weatherapi.com/weather/64x64/night/113.png',
          },
        },
      ],
    },
    {
      date: '2024-03-21',
      day: {
        maxtemp_c: 20,
        mintemp_c: 13,
        condition: {
          text: 'Sunny',
          icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
        },
      },
      hour: [],
    },
  ],
};

// Transform the mock data to match the ForecastItem interface
const hourlyData = mockForecastData.forecastday[0].hour.map(hour => ({
  timestamp: new Date(hour.time).getTime() / 1000,
  temperature: hour.temp_c,
  icon: hour.condition.icon,
}));

const dailyData = mockForecastData.forecastday.map(day => ({
  timestamp: new Date(day.date).getTime() / 1000,
  temperature: day.day.maxtemp_c,
  icon: day.day.condition.icon,
}));

describe('Forecast', () => {
  it('renders no data message when no forecast is provided', () => {
    render(<Forecast />);
    expect(screen.getByText('No forecast data available')).toBeTruthy();
  });

  it('renders skeleton when showSkeleton is true', () => {
    render(<Forecast showSkeleton={true} />);
    expect(screen.getByTestId('forecast-skeleton')).toBeTruthy();
  });

  it('renders hourly forecast correctly', () => {
    render(<Forecast hourlyData={hourlyData} />);
    
    // Check hourly forecast items
    expect(screen.getByText('00:00')).toBeTruthy();
    expect(screen.getByText('15°C')).toBeTruthy();
    expect(screen.getByText('01:00')).toBeTruthy();
    expect(screen.getByText('14°C')).toBeTruthy();
  });

  it('renders daily forecast correctly', () => {
    render(<Forecast dailyData={dailyData} />);
    
    // Check daily forecast items
    expect(screen.getByText('Mar 20')).toBeTruthy();
    expect(screen.getByText('18°C')).toBeTruthy();
    expect(screen.getByText('Mar 21')).toBeTruthy();
    expect(screen.getByText('20°C')).toBeTruthy();
  });
}); 