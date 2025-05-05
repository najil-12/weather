# Weather App

A beautiful and modern weather application built with React Native that provides real-time weather information and forecasts.

## Features

- Real-time weather data
- Hourly and daily forecasts
- Location-based weather
- City search functionality
- Beautiful UI with animations
- Dark/Light theme support

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or newer)
- npm or yarn
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)
- CocoaPods (for iOS dependencies)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Weather
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Install iOS dependencies (iOS only):
```bash
cd ios
pod install
cd ..
```

4. Create a `.env` file in the root directory and add your API keys:
```
WEATHERAPI_BASE_URL=your_weather_api_base_url
WEATHERAPI_KEY=your_weather_api_key
API_TIMEOUT=10000
GOOGLE_PLACES_API_KEY=your_google_places_api_key
GOOGLE_PLACES_BASE_URL=your_google_places_base_url
```

## Running the App

### iOS

1. Start the Metro bundler:
```bash
npm start
# or
yarn start
```

2. In a new terminal, run the iOS app:
```bash
npm run ios
# or
yarn ios
```

### Android

1. Start the Metro bundler:
```bash
npm start
# or
yarn start
```

2. In a new terminal, run the Android app:
```bash
npm run android
# or
yarn android
```

## Development

### Available Scripts

- `npm start` or `yarn start`: Start the Metro bundler
- `npm run ios` or `yarn ios`: Run the iOS app
- `npm run android` or `yarn android`: Run the Android app
- `npm test` or `yarn test`: Run tests
- `npm run lint` or `yarn lint`: Run linting

### Project Structure

```
src/
├── components/     # Reusable components
├── screens/        # Screen components
├── services/       # API and other services
├── store/          # Redux store and slices
├── theme/          # Theme configuration
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## Troubleshooting

### iOS Issues

1. If you encounter build issues:
```bash
cd ios
pod deintegrate
pod install
cd ..
```

2. Clean build folder:
```bash
cd ios
xcodebuild clean
cd ..
```

### Android Issues

1. Clean Android build:
```bash
cd android
./gradlew clean
cd ..
```

2. If you encounter Metro bundler issues:
```bash
npm start -- --reset-cache
# or
yarn start -- --reset-cache
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
