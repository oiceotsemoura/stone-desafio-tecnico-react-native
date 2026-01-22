# Teste Biometrics

A React Native Expo app demonstrating biometric authentication with login screen.

## Features

- Login with email and password validation using Zod
- Biometric authentication (Face ID/Touch ID) using Expo Local Authentication
- State management with Zustand
- Local storage with React Native MMKV
- Navigation with Expo Router

## Technologies

- React Native 0.81.5
- Expo ~54.0.0
- TypeScript ~5.9.2
- Expo Router ~6.0.0
- Zod ^4.0.0
- Zustand ^5.0.0
- Expo Local Authentication ~17.0.8
- React Native MMKV ^3.0.0

## Getting Started

1. Install dependencies:

   ```yarn

   ```

2. Start the development server:

   ```
   yarn run android
   ```

3. Run on device/emulator:
   - For Android: `npx expo start --android`
   - For iOS: `npx expo start --ios`
   - For web: `npx expo start --web`

## Usage

- Enter email: user@example.com and password: password to login conventionally.
- Use biometric button to authenticate with Face ID/Touch ID (if available).
