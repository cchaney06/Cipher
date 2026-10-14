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
- Mobile-to-backend API connectivity
- Reusable React Native API service
- Backend connectivity status in the mobile client
- Database-backed user data retrieval from the mobile client
- Persistent conversations table
- Conversation membership table
- Persistent messages table
- Database foreign-key relationships
- Conversation and message lookup indexes
- Database-level message validation

Not yet implemented:

- Real user authentication
- Conversation API endpoints
- Message API endpoints
- Backend-driven conversations in the mobile client
- Backend-driven messages in the mobile client
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
- Connected the React Native mobile client to the Express API
- Added a reusable mobile API service
- Added live backend connectivity status to the Settings screen
- Added database-backed user count retrieval from the mobile client
- Verified full-stack communication from the physical iPhone through the API to PostgreSQL
- Added persistent conversation storage
- Added many-to-many conversation membership
- Added persistent message storage
- Added foreign-key relationships between users, conversations, memberships, and messages
- Added indexes for common conversation and message queries
- Added database-level validation for message content
- Created and queried a persistent test conversation and messages in PostgreSQL

### Next

- Build PostgreSQL-backed conversation and message API endpoints, including conversation retrieval, message retrieval, message creation, and conversation membership validation. After those endpoints are working, begin replacing the mobile client's local conversation and message mock data with backend API data.
