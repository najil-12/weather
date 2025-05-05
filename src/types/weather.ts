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

export type WeatherCondition = 
  | 'Clear'
  | 'Clouds'
  | 'Rain'
  | 'Snow'
  | 'Thunderstorm'
  | 'Drizzle'
  | 'Mist'
  | 'Smoke'
  | 'Haze'
  | 'Dust'
  | 'Fog'
  | 'Sand'
  | 'Ash'
  | 'Squall'
  | 'Tornado'; 