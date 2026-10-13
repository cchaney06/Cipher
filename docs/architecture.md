# Cipher Architecture

## Current Prototype

Cipher currently consists of two application components and a database service:

- React Native mobile client running through Expo
- Node.js/TypeScript HTTP API using Express
- PostgreSQL development database running through Docker

The mobile client still uses local mock data and is not yet connected to the backend API.

The Express backend currently uses temporary in-memory user data and has not yet been connected to PostgreSQL.

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

User API data is currently stored in memory for development.

```text
HTTP Request
    │
    ▼
Express API
    │
    ▼
In-Memory User Data
    │
    ▼
JSON Response
```

### Current Database

Cipher now uses a local PostgreSQL 18 development database running
inside Docker.

The database currently contains a `users` table with:

- UUID primary key
- Unique lowercase username
- Creation timestamp
- User validation constraints

PostgreSQL data is persisted using a Docker volume.

The PostgreSQL database currently exists separately from the Express API.

```text
PostgreSQL 18
     |
     v
users table
     |
     v
Docker volume
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
     v                            v
 Mock Data                 In-Memory Users


                         PostgreSQL
                             |
                             v
                         users table
                             |
                             v
                       Docker Volume
```

The three components currently operate independently where applicable. The mobile client has not yet been connected to the Express API, and the Express API has not yet been connected to PostgreSQL.

## Planned Architecture

```text
iPhone
   |
   | HTTPS / WebSocket
   v
Node.js API
   |
   v
PostgreSQL
```

The server will eventually handle:

```text
- Account authentication
- User lookup
- Device registration
- Message delivery
- Offline message queues
- Public-key distribution
```

## Security Architecture

Message encryption and decryption will occur on client devices rather than on the server.

The long-term goal is for the server to handle message delivery without having access to plaintext message contents or users' private messaging keys.

End-to-end encryption has not yet been implemented in the current prototype.
