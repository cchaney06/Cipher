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


Backend

HTTP Request
   |
   v
Express API
   |
   v
JSON Response
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
