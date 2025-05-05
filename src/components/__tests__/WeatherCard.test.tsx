import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { WeatherCard } from '../WeatherCard';
import { WeatherData } from '../../types/weather';

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

describe('WeatherCard', () => {
  it('renders welcome message when no data is provided', () => {
    render(<WeatherCard />);
    expect(screen.getByText('Welcome')).toBeTruthy();
    expect(screen.getByText('Start by allowing location access or search for your city to see the weather!')).toBeTruthy();
  });

  it('renders skeleton when showSkeleton is true', () => {
    render(<WeatherCard showSkeleton={true} />);
    expect(screen.getByTestId('weather-card-skeleton')).toBeTruthy();
  });

  it('renders weather data correctly', () => {
    render(<WeatherCard data={mockWeatherData} />);
    
    expect(screen.getByText('London')).toBeTruthy();
    expect(screen.getByText('15°C')).toBeTruthy();
    expect(screen.getByText('Partly cloudy')).toBeTruthy();
    expect(screen.getByText('10 km/h')).toBeTruthy();
    expect(screen.getByText('75%')).toBeTruthy();
    expect(screen.getByText('14°C')).toBeTruthy();
  });

  it('renders location animation when no data is provided', () => {
    render(<WeatherCard />);
    expect(screen.getByTestId('location-animation')).toBeTruthy();
  });
}); 