# Swifty Companion - TODO List

## Mandatory Requirements

### Core Functionality
- [ ] App has at least 2 views (search and profile)
- [ ] Implement OAuth2 authentication with 42 API
- [ ] Handle all error cases (login not found, network error, etc.)
- [ ] Second view displays login information when login exists
- [ ] Display at least 4 user details (login, email, mobile, level, location, wallet, evaluations, etc.)
- [ ] Display user profile picture
- [ ] Display user's skills with level and percentage
- [ ] Display user's projects (including failed ones)
- [ ] Allow navigation back to first view
- [ ] Use flexible/modern layout technique (constraints) for different screen sizes
- [ ] Do not create token for each query - use intra oauth2 properly

### Security & Configuration
- [ ] Store credentials/API keys in local .env file
- [ ] Ensure .env file is ignored by git
- [ ] Implement proper data privacy compliance

### Technical Implementation
- [ ] Set up mobile programming language (Dart/Swift/Kotlin/Java)
- [ ] Configure IDE (Android Studio recommended)
- [ ] Implement mobile framework (Flutter)
- [ ] Integrate with 42 API (api.intra.42.fr)

## Bonus Requirements
- [ ] Implement token refresh when expired
- [ ] Ensure app continues working properly during token refresh

## Testing & Validation
- [ ] Test on different screen sizes and platforms
- [ ] Validate all mandatory requirements are met
- [ ] Test error handling scenarios
- [ ] Verify security measures are in place

## Code Quality
- [ ] Follow project coding standards
- [ ] Implement proper state management
- [ ] Add appropriate error handling
- [ ] Ensure responsive design
- [ ] Test on real devices if possible