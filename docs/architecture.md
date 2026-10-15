# Cipher Architecture

## Current Prototype

Cipher currently consists of two application components and a database service:

- React Native mobile client running through Expo
- Node.js/TypeScript HTTP API using Express
- PostgreSQL development database running through Docker

The mobile client is connected to the backend API for backend health information and database-backend user data.

Conversation and message data still use local mock data in the mobile application.

The Express backend is connected to PostgreSQL and currently exposes database-backed operations for:

- Users
- Conversations
- Messages
- Conversation membership validation

PostgreSQL contains persistent tables for users, conversations, conversation membership, and messages.

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

The backend now supports conversation and message operations, but the mobile conversation and chat screens have not yet been migrated from mock data to those endpoints.

## Current Backend

The Cipher backend currently uses Node.js, TypeScript, Express, node-postgres, and express-rate-limit.

Implemented endpoints:

- `GET /`
- `GET /health`
- `GET /api/users`
- `GET /api/users/:id`
- `POST /api/users`
- `GET /api/users/:userId/conversations`
- `GET /api/conversations/:conversationId/messages`
- `POST /api/conversations/:conversationId/messages`

The Express API retrieves and creates users through PostgreSQL.

The backend can also:

- Retrieve conversations belonging to a user
- Retrieve members of a conversation
- Retrieve the most recent message for a conversation
- Retrieve conversation messages in chronological order
- Create persistent messages
- Verify conversation membership before returning messages
- Verify conversation membership before allowing message creation

Database communication is handled by a reusable node-postgres connection pool.

User, conversation, membership, and message data are persisted in PostgreSQL.

The `/health` endpoint also checks whether the API can successfully communicate with PostgreSQL.

```text
HTTP Request
    |
    v
Express API
    |
    | Validation
    | Membership Checks
    | Parameterized SQL
    v
PostgreSQL
    |
    v
JSON Response
```

User and conversation API route groups are protected by request rate limiting.

The health endpoint is not currently rate limited.

## Conversation Retrieval

A user's conversations are retrieved through:

```text
GET /api/users/:userId/conversations
```

Conversation summaries currently include:

- Conversation ID
- Conversation creation timestamp
- Conversation members
- Most recent message, if one exists

The backend retrieves the requested user's memberships and then retrieves all members associated with each matching conversation.

The most recent message is retrieved for each conversation so the API can eventually support the mobile conversation list.

## Message Retrieval

Messages are retrieved through:

```text
GET /api/conversations/:conversationId/messages?userId=<userId>
```

Before returning messages, the backend checks:

- Whether the conversation exists
- Whether the provided user ID belongs to the conversation

If the conversation does not exist, the API returns a 404 Not Found response.

If the conversation exists but the supplied user is not a member, the API returns a 403 Forbidden response.

Messages are returned in chronological order.

## Message Creation

Messages are created through:

```text
POST /api/conversations/:conversationId/messages
```

The request currently contains:

```JSON
{
    "senderId": "user-uuid",
    "content": "Message content"
}
```

Before creating a message, the backend validates:

- A sender ID is provided
- Message content is a string
- Message content is not blank
- Message content does not exceed the current 2000-character limit
- The conversation exists
- The sender belongs to the conversation

Valid messages are persisted in PostgreSQL and returned to the caller.

This membership validation is not yet secure authorization because Cipher does not currently authenticate the caller. The server cannot yet prove that the caller actually owns the supplied user ID.

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
                       ┌──────────┼──────────┐
                       |          |          |
                       v          v          v
                     Users   Conversations Messages
                                  |
                                  v
                         Membership Checks
                                  |
                                  | Parameterized SQL
                                  v
                              PostgreSQL
                                  |
                 ┌────────────────┼────────────────┐
                 |                |                |
                 v                v                v
               users       conversations       messages
                                  |
                                  v
                       conversation_members
                                  |
                                  v
                            Docker Volume
```

The mobile client can communicate with the Express API over the local development network.

The backend and PostgreSQL database are connected, and the mobile client can retrieve real backend status and database-backed user information.

Conversation and message records are now exposed through the Express API.

However, the React Native conversation and chat screens still use local mock data. Migrating those screens to the backend API is the next development step.

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

Conversation and message data will be retrieved and created through the backend instead of local mock data.

## Development Networking

During local development, the mobile client currently communicates with the Express backend over HTTP through a Windows mobile hotspot.

This local HTTP setup is for development only.

Production communication is planned to use HTTPS.

The PostgreSQL development port is bound to localhost so the database is not intentionally exposed directly to devices on the local network.

The mobile client communicates with Express, and Express communicates with PostgreSQL.

```text
iPhone
   |
   | HTTP development traffic
   v
Express API
   |
   | localhost database connection
   v
PostgreSQL
```

## Security Architecture

Message encryption and decryption will eventually occur on client devices rather than on the server.

The long-term goal is for the server to handle message delivery without having access to plaintext message contents or users' private messaging keys.

Database queries that include user-supplied values use parameterized SQL queries rather than directly inserting those values into SQL strings.

Database credentials are loaded from ignored environment files and are not stored directly in source code.

API route groups use rate limiting to reduce unrestricted repeated requests.

Conversation and message operations perform conversation membership checks before returning messages or allowing message creation.

These membership checks are not yet secure authorization because authentication has not been implemented.

The current PostgreSQL messages table stores plaintext message content for development purposes. This is temporary and is not the intended production security design.

The current local mobile-to-backend connection uses HTTP for development and does not yet provide production transport security.

Authentication, secure authorization, and end-to-end encryption have not yet been implemented in the current prototype.
