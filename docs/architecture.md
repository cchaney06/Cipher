# Cipher Architecture

## Current Prototype

Cipher currently consists of two application components and a database service:

- React Native mobile client running through Expo
- Node.js/TypeScript HTTP API using Express
- PostgreSQL development database running through Docker

The mobile client is now connected to the backend API for backend health information and database-backend user data.

Conversation and message data still use local mock data in the mobile application.

The Express backend is connected to PostgreSQL and uses the database for persistent user storage.

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

During local development, the physical iPhone connects to the backend over the Windows mobile hotspot using the Lenovo's local network address.

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

### Current Database

Cipher uses a local PostgreSQL 18 development database running inside Docker.

The database currently contains a `users` table with:

- UUID primary key
- Unique lowercase username
- Creation timestamp
- User validation constraints

PostgreSQL data is persisted using a Docker volume.

```text
Express API
    |
    | SQL via node-postgres
    v
PostgreSQL
    |
    v
users table
    |
    v
Docker Volume
```

## Current System Architecture

```text
                       Cipher

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
                                  v
                              users table
                                  |
                                  v
                            Docker Volume
```

The mobile client can now communicate with the Express API over the local development network.

The backend and PostgreSQL database are connected, and the mobile client can retrieve real backend status and database-backed user information.

Conversation and message data have not yet been moved to the backend and still rely on local mock data.

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
- Message delivery
- Offline message queues
- Public-key distribution

The mobile client will communicate with the backend through HTTPS for standard API requests and WebSockets for real-time messaging.

Conversation and message data will eventually be stored and retrieved through the backend instead of local mock data.

## Development Networking

During local development, the mobile client currently communicates with the Express backend over HTTP through a Windows mobile hotspot.

This local HTTP setup is for development only.

Production communication is planned to use HTTPS.

## Security Architecture

Message encryption and decryption will occur on client devices rather than on the server.

The long-term goal is for the server to handle message delivery without having access to plaintext message contents or users' private messaging keys.

Database queries that include user-supplied values use parameterized SQL queries rather than directly inserting those values into SQL strings.

Database credentials are loaded from ignored environment files and are not stored directly in source code.

The current local mobile-to-backend connection uses HTTP for development and does not yet provide production transport security.

Authentication, authorization, and end-to-end encryption have not yet been implemented in the current prototype.
