# Cipher Architecture

## Current Prototype

Cipher currently consists of two separate applications:

- React Native mobile client running through Expo
- Node.js/TypeScript HTTP API using Express

The mobile client still uses local mock data and is not yet connected to the API.

```text
Mobile Client

Mock Data
   |
   v
React Native
   |
   v
Cipher UI
```

### Current Backend

The Cipher backend currently uses Node.js, TypeScript, and Express.

Implemented endpoints:

- `GET /`
- `GET /health`
- `GET /api/users`
- `GET /api/users/:id`
- `POST /api/users`

User information is currently stored in memory for development.
PostgreSQL persistence has not yet been implemented.

```text
Client
   |
   | HTTP
   v
Express API
   |
   v
In-Memory Data
```

Planned Architecture:

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

Message encryption and decryption will occur on client devices rather than on the server.

---
