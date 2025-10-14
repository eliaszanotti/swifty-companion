# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Swifty Companion - 42 API Mobile App

Swifty Companion is an Expo React Native app for searching and viewing 42 school user profiles. The app integrates with the 42 API (api.intra.42.fr) using OAuth2 authentication and implements the Mobile Initiation project requirements.

## Development Commands

- `pnpm install` - Install dependencies (use pnpm, not npm)
- `pnpm start` or `npx expo start` - Start development server
- `pnpm android` - Run on Android emulator/device
- `pnpm ios` - Run on iOS simulator/device
- `pnpm web` - Run in web browser
- `pnpm lint` - Run ESLint
- `pnpm reset-project` - Reset to blank project template

**IMPORTANT: Always use pnpm for package management in this project.**

## Architecture Overview

### Authentication Flow
- OAuth2 implementation using expo-auth-session with PKCE
- Auth context managed in `hooks/useAuthContext.tsx` provides global auth state
- Access tokens are stored in React Context, not persisted (bonus requirement: implement token refresh)
- App redirects to login screen when not authenticated

### Navigation Structure
- **File-based routing** with Expo Router
- **Root layout** (`app/_layout.tsx`): Stack navigator with safe areas and theming
- **Tab navigation** (`app/(tabs)/_layout.tsx`): Bottom tabs for "Recherche" and "Profil"
- **Modal screens**: User profile (`app/user/[login].tsx`) and login (`app/login.tsx`)

### State Management
- **React Context patterns** for global state (no external state libraries)
- `useAuthContext`: Authentication state and token management
- `useSearchContext`: Search state with query, results, loading, and error handling
- Search API implements 300ms debouncing and range-based user lookup

### API Integration
- **42 API base URL**: `https://api.intra.42.fr`
- **Search API** (`hooks/useSearchApi.tsx`): Custom range-based search for efficient user lookup
- **Profile API** (`hooks/useProfileApi.tsx`): Individual user data fetching
- **OAuth endpoints**: Authorization and token exchange handled by expo-auth-session

### UI Framework
- **React Native Paper** for Material Design components
- **Custom theming** in `constants/PaperTheme.ts` with dark/light mode support
- **Responsive design** using flexible layouts (mandatory project requirement)
- **4-space tab indentation** enforced by ESLint (configured in `eslint.config.js`)

### Security Considerations
- **Sensitive credentials** in `constants/Config.ts` (should be moved to .env for production)
- **OAuth2 PKCE flow** for secure authentication
- **No token persistence** currently implemented (bonus requirement)

### Component Organization
```
components/
├── PaperView.tsx          # Root wrapper with Paper theming
└── auth/
    └── LoginForm.tsx      # OAuth2 login interface
```

### Key Implementation Details
- **Range-based search**: Uses character code incrementing for efficient API pagination
- **Error handling**: Comprehensive error states for network failures and API errors
- **Loading states**: Built-in loading indicators for async operations
- **Modal presentations**: User profiles open as modals from search results

## Project Requirements Status

✅ **Implemented:**
- At least 2 views (search tabs + user profile modal)
- Error handling for all cases
- User information display with profile picture
- Skills and projects display
- Navigation back to first view
- Flexible/modern layout techniques
- OAuth2 integration without per-query tokens

⚠️ **To Address (Bonus):**
- Token refresh implementation for expired tokens
- .env file usage for credential management