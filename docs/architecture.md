# Cipher Architecture

## Current Prototype

The current application consists of a React Native mobile client running through Expo.

Current data is stored as mock TypeScript objects.

```text
Mock Data
   |
   v
React Native
   |
   v
Cipher UI
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
