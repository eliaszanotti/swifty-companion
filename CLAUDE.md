# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Sujet Mobile Initiation - Swifty Companion

```
Summary: This project aims to introduce you to the development of mobile application.
Version: 4
```

### Project Overview

The aim of the project is to build an application that will retrieve the information of 42 students, using the 42 API. An API (Application programming interface) is a set of routines, protocols, and tools for building software applications.

### Goals

This project aims to make you familiar with:
- Mobile programming language (Dart, Swift, Kotlin, Java etc.)
- Any IDE of your choice (Android Studio looks like a good choice)
- Mobile Frameworks (Flutter)
- 42 API

### Mandatory Part Requirements

To validate the mandatory part of the project, you need to meet the following criteria:

- **Your app must have at least 2 views**
- **You must handle all cases of errors** (login not found, network error, etc.)
- **The second view must display the login information, if the login exists**
- **You must display at least four details for the user** (login, email, mobile, level, location, wallet, evaluations etc.) along with the profile picture
- **You must display the user's skills with level and percentage**
- **You must display the projects that the user has completed, including failed ones**
- **Your app must allow for navigating back to the first view**
- **This project must use a flexible or modern layout technique**, such as layout constraints, to ensure that the user interface displays correctly on different screen sizes and mobile platforms
- **Do not create a token for each query** - Refer to the OAuth2 documentation. You must use intra oauth2

### Important Security Notes

- **For obvious security reasons, any credentials, API keys, env variables etc. must be saved locally in a .env file and ignored by git**
- **Publicly stored credentials will lead you directly to a failure of the project**
- **Due to data privacy concerns, and in compliance with relevant laws in certain countries, it may be necessary to refrain from disclosing certain information**

### Bonus Requirements

- **Recreate token at expiration date. If the token expires, the application must refresh it. The application must still be able to work properly in any case.**

## Project Overview

Swifty Companion is an Expo React Native app for searching and viewing 42 school user profiles. The app integrates with the 42 API (api.intra.42.fr) using OAuth2 authentication.

## Development Commands

- `npm install` - Install dependencies
- `npm start` or `npx expo start` - Start development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint
- `npm run reset-project` - Reset to blank project template

## Architecture

### Navigation & Routing
- Uses Expo Router with file-based routing
- Main navigation in `app/_layout.tsx` with Stack navigator
- Tab navigation in `app/(tabs)/_layout.tsx` with bottom tabs
- Two main tabs: "Recherche" (search) and "Profil" (profile)

### Authentication
- OAuth2 flow with 42 API using expo-auth-session
- Auth context managed in `hooks/useAuthContext.tsx`
- App shows LoginForm when not authenticated
- Access token stored in context and used for API calls

### State Management
- React Context for auth state (`useAuthContext`)
- Zustand-like store pattern for search state (`useSearchContext`)
- Search state includes: searchQuery, users, isLoading, error

### API Integration
- 42 API base URL: `https://api.intra.42.fr`
- Search API in `hooks/useSearchApi.tsx` with debounced search (300ms)
- Profile API in `hooks/useProfileApi.tsx`
- Custom range-based search for efficient user lookup

### UI Components
- React Native Paper for material design components
- Custom theme configuration in `constants/PaperTheme.ts`
- Components organized by domain:
  - `components/user/` - User profile related components
  - `components/ui/` - Reusable UI components
  - Root level components for major features

### Key Files
- `constants/Config.ts` - API credentials and endpoints (contains sensitive data)
- `hooks/useColorScheme.ts` - Theme switching logic
- `eslint.config.js` - Linting rules (4-space indentation enforced)

### Styling
- Uses React Native Paper theming system
- Dark/light theme support
- 4-space indentation enforced by ESLint
- Lance toujours tout avec pnpm