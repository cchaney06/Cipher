# Cipher Architecture

## Overview

Cipher is a full-stack secure messaging application prototype built with:

- React Native and Expo for the mobile client
- Node.js, TypeScript, and Express for the backend API
- PostgreSQL for persistent application data
- Docker for the local database environment

The mobile client communicates with the Express API, which handles validation, conversation membership checks, and PostgreSQL queries.

```text
iPhone
  |
  | HTTP during local development
  v
React Native
  |
  v
API Service
  |
  v
Express API
  |
  | Parameterized SQL
  v
PostgreSQL
```

Authentication and end-to-end encryption are not yet implemented.

## Mobile Client

The React Native client uses Expo Router and TypeScript.

The mobile application currently supports:

- Simulated login
- Conversation retrieval from the backend
- Conversation searching
- Dynamic chat routes
- Message retrieval from the backend
- Persistent message creation through the backend
- Settings and backend-status information
- Safe-area handling
- Basic accessibility support

The mobile API service is located at:

```text
mobile/src/services/api.ts
```

The current user identity is still simulated during development. The application resolves the simulated username to a real PostgreSQL user ID before retrieving conversations or messages.

Real authentication will eventually replace this behavior.

## Backend API

The backend uses:

- Node.js
- TypeScript
- Express
- node-postgres
- express-rate-limit

Implemented endpoints include:

```text
GET  /
GET  /health

GET  /api/users
GET  /api/users/:id
POST /api/users

GET  /api/users/:userId/conversations

GET  /api/conversations/:conversationId/messages
POST /api/conversations/:conversationId/messages
```

The backend handles:

- User retrieval and creation
- Conversation retrieval
- Conversation-member retrieval
- Latest-message retrieval
- Chronological message retrieval
- Persistent message creation
- Conversation membership validation
- Input validation
- Request rate limiting
- Database health checks

Database communication is handled through a reusable node-postgres connection pool.

```text
HTTP Request
    |
    v
Express
    |
    | Input validation
    | Membership validation
    | Rate limiting
    | Parameterized SQL
    v
PostgreSQL
    |
    v
JSON Response
```

## Conversation and Message Flow

A user's conversations are retrieved through:

```text
GET /api/users/:userId/conversations
```

Each conversation summary can include:

- Conversation ID
- Creation timestamp
- Members
- Most recent message

Messages are retrieved through:

```text
GET /api/conversations/:conversationId/messages?userId=<userId>
```

Before returning messages, the backend verifies that:

1. The conversation exists.
2. The supplied user belongs to the conversation.

Message creation uses:

```text
POST /api/conversations/:conversationId/messages
```

with a request body containing:

```json
{
  "senderId": "user-uuid",
  "content": "Message content"
}
```

Before inserting a message, the backend verifies:

- A sender ID is provided
- Message content is valid
- The conversation exists
- The sender belongs to the conversation

Valid messages are stored in PostgreSQL and returned to the mobile client.

These membership checks are not yet secure authorization because Cipher does not authenticate callers. A client can currently provide a user ID directly.

## Database

Cipher uses PostgreSQL 18 running locally through Docker.

The database contains four primary tables:

```text
users
conversations
conversation_members
messages
```

### users

Stores:

- UUID primary key
- Unique lowercase username
- Creation timestamp
- Username validation constraints

### conversations

Stores:

- UUID primary key
- Creation timestamp

### conversation_members

Creates the many-to-many relationship between users and conversations.

Stores:

- Conversation ID
- User ID
- Join timestamp

The combination of conversation ID and user ID is the primary key, preventing duplicate membership.

### messages

Stores:

- UUID primary key
- Conversation ID
- Sender ID
- Message content
- Creation timestamp

Foreign-key constraints connect messages to existing users and conversations.

Database constraints also enforce message-content requirements.

Indexes support common lookups for:

- Conversations belonging to a user
- Messages belonging to a conversation in chronological order

PostgreSQL data is persisted using a Docker volume.

```text
           users
          /     \
         v       v
conversation_members   messages
         |                |
         v                |
    conversations <-------┘
```

## Development Networking

During local development, the physical iPhone communicates with the Express backend over a Windows mobile hotspot.

```text
iPhone
  |
  | Local HTTP
  v
Express API
  |
  | localhost:5432
  v
PostgreSQL
```

PostgreSQL is bound to localhost and is not intentionally exposed directly to devices on the local network.

HTTP is used only for local development.

Production communication is planned to use HTTPS.

## Security Architecture

Current backend protections include:

- Parameterized SQL queries
- API input validation
- Conversation membership validation
- API rate limiting
- Database credentials stored in ignored environment files
- PostgreSQL bound to localhost during development
- Database-level validation and foreign-key constraints

Cipher does not yet provide:

- Real user authentication
- Secure authorization
- End-to-end encryption
- Production HTTPS
- Real-time messaging

The current `messages` table stores plaintext message content for development purposes.

The long-term design is for message encryption and decryption to occur on client devices so that the backend stores and delivers encrypted payloads without access to plaintext message contents or private messaging keys.

## Planned Architecture

The long-term system will use:

```text
iPhone
  |
  | HTTPS / WebSocket
  v
Node.js API
  |
  | SQL
  v
PostgreSQL
```

Planned backend responsibilities include:

- Account authentication
- Secure authorization
- Device registration
- Conversation management
- Real-time message delivery
- Offline message queues
- Public-key distribution

The next major architectural milestone is replacing the simulated current-user identity with real authentication.