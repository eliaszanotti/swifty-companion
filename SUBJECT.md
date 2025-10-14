# Swifty Companion - Mobile Initiation Project

## Summary
Build a mobile application that retrieves and displays 42 student information using the 42 API.

## Project Overview
The goal is to create an app that searches for 42 students and displays their profiles using OAuth2 authentication with the 42 API (api.intra.42.fr).

## Mandatory Requirements

### Core Features
- **2 views minimum**: Search view and Profile view
- **Error handling**: All cases (login not found, network errors, etc.)
- **Profile display**: Show user information if login exists
- **User details**: Display at least 4 details (login, email, mobile, level, location, wallet, evaluations, etc.) with profile picture
- **Skills section**: Display user skills with level and percentage
- **Projects section**: Display completed projects including failed ones
- **Navigation**: Allow returning to first view
- **Responsive design**: Use flexible layout for different screen sizes

### Technical Requirements
- **OAuth2 authentication**: Use intra OAuth2 (do not create token for each query)
- **Security**: Store credentials locally in .env file, ignore with git
- **Privacy**: Consider data privacy laws for sensitive information

### API Integration
- **Base URL**: https://api.intra.42.fr
- **Authentication**: OAuth2 flow with token refresh capability
- **Data to retrieve**: User profile, skills, projects, and other relevant details

## Bonus Requirements
- **Token refresh**: Automatically recreate token at expiration date
- **Continuous operation**: App must work properly during token refresh

## Technology Stack
- **Mobile framework**: Flutter (React Native also acceptable)
- **IDE**: Latest version of Android Studio or equivalent
- **Language**: Latest mobile programming language version
- **API version**: Latest available 42 API

## Security Notes
⚠️ **Critical**: Any credentials, API keys, or environment variables must be saved locally in a .env file and ignored by git. Publicly stored credentials will result in project failure.