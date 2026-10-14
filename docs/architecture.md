# Cipher Architecture

## Current Prototype

Cipher currently consists of two application components and a database service:

- React Native mobile client running through Expo
- Node.js/TypeScript HTTP API using Express
- PostgreSQL development database running through Docker

The mobile client is connected to the backend API for backend health information and database-backend user data.

Conversation and message data still use local mock data in the mobile application.

The Express backend is connected to PostgreSQL and currently exposes database-backed user operations.

PostgreSQL now also contains persistent tables for conversations, conversation membership, and messages. These new messaging tables are not yet exposed through Express API endpoints.

## Mobile Client

The React Native client currently uses both local mock data and real backend API requests.

```text
                  React Native
                    /      \
                   /        \
                  v          v
         Local Mock Data   API Service
              |                |
              v                v
     Conversations /       Express API
        Messages
```

Local mock data is still used for:

- Conversations
- Messages
- Simulated current-user information
- Simulated login behavior

The backend API is currently used for:

- Server health status
- Database connectivity status
- Retrieving database-backed user information

The mobile API service is located in:

```text
mobile/src/services/api.ts
```

During local development, the physical iPhone connects to the backend over a Windows mobile hotspot using the Lenovo's local network address.

## Current Backend

The Cipher backend currently uses Node.js, TypeScript, Express, and node-postgres.

Implemented endpoints:

- `GET /`
- `GET /health`
- `GET /api/users`
- `GET /api/users/:id`
- `POST /api/users`

The Express API retrieves and creates users through PostgreSQL.

Database communication is handled by a reusable node-postgres connection pool. User data is persisted in the PostgreSQL `users` table.

The `/health` endpoint also checks whether the API can successfully communicate with PostgreSQL.

```text
HTTP Request
    |
    v
Express API
    |
    | Parameterized SQL
    v
PostgreSQL
    |
    v
JSON Response
```

Conversation and message API endpoints have not yet been implemented.

### Current Database

Cipher uses a local PostgreSQL 18 development database running inside Docker.

The database currently contains:

- users
- conversations
- conversation_members
- messages

#### Users

The users table contains:

- UUID primary key
- Unique lowercase username
- Creation timestamp
- Username validation constraints

#### Conversations

The conversations table contains:

- UUID primary key
- Creation timestamp

#### Conversation Membership

The conversation_members table creates a many-to-many relationship between users and conversations.

Each membership contains:

- Conversation ID
- User ID
- Join timestamp

The combination of conversation ID and user ID forms the table's primary key, preventing the same user from being added to the same conversation more than once.

#### Messages

The messages table contains:

- UUID primary key
- Conversation ID
- Sender ID
- Message content
- Creation timestamp
- Message length validation

Messages reference both an existing conversation and an existing user.

Foreign-key constraints maintain relationships between the messaging tables.

Indexes support common lookups for:

- Conversations belonging to a user
- Messages belonging to a conversation in chronological order

PostgreSQL data is persisted using a Docker volume.

```text
             users
            /     \
           /       \
          v         v
conversation_members messages
          |             |
          v             |
    conversations <-----┘
          |
          v
    Docker Volume
```

## Current System Architecture

```text
                     Mobile Client
                     React Native
                       /       \
                      /         \
                     v           v
           Local Mock Data     API Service
               |                   |
               v                   | HTTP
       Conversations /             v
          Messages             Express API
                                   |
                                   | SQL
                                   v
                               PostgreSQL
                                   |
                 ┌─────────────────┼──────────────────┐
                 |                 |                  |
                 v                 v                  v
               users        conversations         messages
                                 |
                                 v
                      conversation_members
                                 |
                                 v
                           Docker Volume
```

The mobile client can communicate with the Express API over the local development network.

The backend and PostgreSQL database are connected, and the mobile client can retrieve real backend status and database-backed user information.

Conversation and message data now exist persistently in PostgreSQL, but the Express API does not yet expose those records and the mobile application still relies on local mock conversation and message data.

## Planned Architecture

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

The server will eventually handle:

- Account authentication
- User lookup
- Device registration
- Conversation membership
- Conversation retrieval
- Message retrieval
- Message delivery
- Offline message queues
- Public-key distribution

The mobile client will communicate with the backend through HTTPS for standard API requests and WebSockets for real-time messaging.

Conversation and message data will eventually be retrieved and created through the backend instead of local mock data.

## Development Networking

During local development, the mobile client currently communicates with the Express backend over HTTP through a Windows mobile hotspot.

This local HTTP setup is for development only.

Production communication is planned to use HTTPS.

## Security Architecture

Message encryption and decryption will eventually occur on client devices rather than on the server.

The long-term goal is for the server to handle message delivery without having access to plaintext message contents or users' private messaging keys.

Database queries that include user-supplied values use parameterized SQL queries rather than directly inserting those values into SQL strings.

Database credentials are loaded from ignored environment files and are not stored directly in source code.

The current PostgreSQL messages table stores plaintext message content for development purposes. This is temporary and is not the intended production security design.

The current local mobile-to-backend connection uses HTTP for development and does not yet provide production transport security.

Authentication, authorization, and end-to-end encryption have not yet been implemented in the current prototype.
