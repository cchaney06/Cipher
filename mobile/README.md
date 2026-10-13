# Cipher

Cipher is an end-to-end encrypted messaging application currently
under development.

The project is being built as a native-style mobile application using
React Native and Expo, with a Node.js/TypeScript backend and PostgreSQL database for account and messaging services.

## Current Status

Cipher is currently in the early full-stack prototype stage.

Implemented:

- Login interface
- Conversation list
- Conversation searching
- Dynamic chat routes
- Incoming and outgoing message bubbles
- Local message sending
- Settings/profile screen
- Logout navigation
- Safe-area handling
- Basic accessibility support
- Node.js/TypeScript Express backend
- Backend health endpoint
- User API endpoints
- Basic API request validation
- Local PostgreSQL development database
- Persistent users table
- Docker-based database environment

Not yet implemented:

- Real user authentication
- Mobile client connection to the backend API
- Express-to-PostgreSQL integration
- Real-time networking
- End-to-end encryption
- Push notifications

## Technology Stack

### Mobile

- React Native
- Expo
- Expo Router
- TypeScript

### Backend

- Node.js
- TypeScript
- Express

### Database

- PostgreSQL
- Docker

### Planned

- WebSockets
- End-to-end encryption
- Push notifications

## Project Structure

```text
cipher/
├── mobile/
├── server/
├── database/
└── docs/
```

## Development Milestones

### September 2026

- Set up Expo/React Native development environment
- Ran Cipher on a physical iPhone from Windows
- Built login UI
- Built conversation inbox
- Added dynamic chat routing
- Built local messaging interface
- Added settings/profile screen
- Added conversation search
- Improved safe-area and keyboard handling
- Created Node.js/TypeScript backend
- Added Express API routes
- Added user creation and retrieval endpoints
- Added request validation
- Created PostgreSQL development database
- Created persistent users table
- Added Docker-based database persistence

### Next

- Connect the Node.js/TypeScript backend to PostgreSQL and replace the temporary in-memory user data with persistent database queries. After that, connect the mobile client to the backend API.
