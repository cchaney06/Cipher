# Cipher

Cipher is a secure messaging application currently
under development, with end-to-end encryption planned as a core feature.

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
- Conversation API endpoints
- Message API endpoints
- Conversation retrieval through PostgreSQL
- Message retrieval through PostgreSQL
- Persistent message creation through the API
- Conversation membership validation
- Basic API request validation
- API rate limiting
- Local PostgreSQL development database
- Persistent users table
- Persistent conversations table
- Conversation membership table
- Persistent messages table
- Docker-based database environment
- Express-to-PostgreSQL integration
- Reusable PostgreSQL connection pool
- Persistent database-backed user retrieval
- Persistent database-backed user creation
- Parameterized SQL queries for user-supplied values
- Database foreign-key relationships
- Conversation and message lookup indexes
- Database-level message validation
- Mobile-to-backend API connectivity
- Reusable React Native API service
- Backend connectivity status in the mobile client
- Database-backed user data retrieval from the mobile client

Not yet implemented:

- Real user authentication
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
- express-rate-limit

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

### October 2026

- Added API rate limiting to backend user and conversation routes
- Added PostgreSQL-backed conversation retrieval
- Added PostgreSQL-backed message retrieval
- Added persistent message creation through the Express API
- Added conversation membership validation for message rerieval
- Added conversation membership validation for message creation
- Added conversation summaries containing members and the latest message
- Added API validation for message sender IDs and message content
- Verified persistent message creation through the Express API
- Enabled repository security scanning and dependency monitoring

### Next

- Replace the mobile client's local conversation mock data with PostgreSQL-backed conversation data
- Replace the mobile client's local message mock data with PostgreSQL-backed message data
- Send messages from the mobile client through the Express API
- Begin implementing real user authentication
