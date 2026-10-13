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
- Database-aware health checks
- User API endpoints
- Basic API request validation
- Local PostgreSQL development database
- Persistent users table
- Docker-based database environment
- Express-to-PostgreSQL integration
- Reusable PostgreSQL connection pool
- Persistent database-backend user retrieval
- Persistent database-backend user creation
- Parameterized SQL queries for user-supplied values

Not yet implemented:

- Real user authentication
- Mobile client connection to the backend API
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
- node-postgres

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
- Connected the Express backend to PostgreSQL
- Replaced temporary in-memory user storage with database queries
- Added a reusable PostgreSQL connection pool
- Added database-aware backend health checks
- Added parameterized SQL queries for user operations

### Next

- Connect the React Native mobile client to the Express backend API and begin replacing local mock data with real API requests.
