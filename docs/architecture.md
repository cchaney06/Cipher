# Cipher Architecture

## Current Prototype

Cipher currently consists of two application components and a database service:

- React Native mobile client running through Expo
- Node.js/TypeScript HTTP API using Express
- PostgreSQL development database running through Docker

The mobile client still uses local mock data and is not yet connected to the backend API.

The Express backend is connected to PostgreSQL and uses the database for persistent user storage.

## Mobile Client

```text

Mock Data
   |
   v
React Native
   |
   v
Cipher UI
```

## Current Backend

The Cipher backend currently uses Node.js, TypeScript, and Express.

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

        ┌──────────────────────────┐
        │                          │
        v                          v

 Mobile Client                Express API
 React Native                 Node.js
     |                            |
     v                            | SQL
 Mock Data                       v
                             PostgreSQL
                                  |
                                  v
                              users table
                                  |
                                  v
                            Docker Volume
```

The mobile client has not yet been connected to the Express API.

The backend and database are connected, but the mobile application still relies on local mock data.

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

## Security Architecture

Message encryption and decryption will occur on client devices rather than on the server.

The long-term goal is for the server to handle message delivery without having access to plaintext message contents or users' private messaging keys.

Database queries that include user-supplied values use parameterized SQL queries rather than directly inserting those values into SQL strings.

End-to-end encryption has not yet been implemented in the current prototype.
