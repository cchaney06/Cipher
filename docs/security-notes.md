# Cipher Security Notes

Cipher is currently a development prototype and does not yet provide end-to-end encryption, real user authentication, or production transport security.

## Security Goals

Cipher's planned security model includes:

- Messages encrypted before leaving the sender's device
- Messages decrypted only on recipient devices
- Server does not possess private messaging keys
- Private keys are not stored in the backend database
- HTTPS/TLS for client-server communication
- Secure device-side key storage
- User and device identity verification
- Replay protection
- Forward secrecy
- Secure attachment encryption

## Current Security Status

Cipher currently uses real backend and database operations for users, conversations, and messages.

Current limitations include:

- Login behavior is simulated
- Current-user identity is simulated
- User authentication has not been implemented
- Secure authorization has not been implemented
- Passwords are not yet accepted or stored
- Message content is stored as plaintext during development
- Message content is transmitted over local HTTP during development
- End-to-end encryption has not been implemented
- Real-time messaging has not been implemented
- No formal security audit has been performed

The current prototype should not be treated as production-ready secure messaging software.

## Backend Security

The backend currently uses Node.js, TypeScript, Express, node-postgres, express-rate-limit, and PostgreSQL.

Implemented protections include:

- Database credentials loaded from ignored environment files
- Parameterized SQL queries for user-supplied values
- API input validation
- Username validation and duplicate protection
- Message-content validation
- Conversation existence checks
- Conversation membership checks
- API rate limiting
- Database connectivity health checks
- Database errors handled without intentionally returning credentials or internal connection details to clients

### Rate Limiting

Cipher uses `express-rate-limit` on API route groups to restrict repeated requests from individual client IP addresses.

Requests exceeding the configured limit receive:

```text
429 Too Many Requests
```

The current limiter uses in-memory state and is appropriate only for the single-instance development backend.

A distributed production deployment would require shared rate-limit storage or equivalent infrastructure.

Rate limiting reduces abusive repeated requests but does not replace authentication, authorization, or broader denial-of-service protections.

## Conversation Membership Validation

Message operations verify conversation membership before accessing or modifying conversation data.

For message retrieval, the backend checks:

1. The conversation exists.
2. The supplied user ID belongs to the conversation.

For message creation, the backend checks:

1. The conversation exists.
2. The supplied sender ID belongs to the conversation.
3. Message content passes validation.

A nonexistent conversation returns:

```text
404 Not Found
```

A supplied user who is not a conversation member receives:

```text
403 Forbidden
```

These checks provide prototype membership validation, but they are **not secure authorization**.

Because authentication has not yet been implemented, clients currently provide user IDs directly. The backend cannot prove that the caller actually owns the supplied identity.

Real authentication must be implemented before these membership checks can become meaningful authorization controls.

## Mobile and Network Security

The React Native client communicates with the Express API over the local development network.

Current development behavior includes:

- Physical iPhone connected through a Windows mobile hotspot
- Local network API address configured through `EXPO_PUBLIC_API_URL`
- Conversations retrieved through the backend API
- Messages retrieved through the backend API
- New messages sent through the backend API
- Development API traffic transmitted over HTTP

`EXPO_PUBLIC_API_URL` contains only the API location and must not contain secrets.

The local HTTP configuration is intended only for development.

Production communication is planned to use HTTPS.

## Database Security

The development database runs locally using PostgreSQL inside Docker.

Current protections include:

- PostgreSQL credentials stored in ignored `.env` files
- Credentials excluded from Git
- PostgreSQL bound to localhost during development
- UUID identifiers for users, conversations, and messages
- Unique lowercase usernames
- Database-level username validation
- Foreign-key relationships between users, conversations, memberships, and messages
- Duplicate conversation membership prevented by a composite primary key
- Messages required to reference existing users and conversations
- Empty or whitespace-only messages rejected
- Message length constrained at the database level
- Persistent storage through a Docker volume
- No plaintext passwords stored

The database configuration is intended for local development and should not be considered production hardened.

## Development Message Storage

The PostgreSQL `messages` table currently stores plaintext message content.

This is temporary and is not the intended production design.

Current message flow is:

```text
React Native
    |
    | plaintext over development HTTP
    v
Express API
    |
    | plaintext
    v
PostgreSQL
```

This means both the backend and database can currently read message contents.

The intended end-to-end encrypted design is:

```text
Sender Device
    |
    | encrypt
    v
Encrypted Payload
    |
    v
Backend / PostgreSQL
    |
    | encrypted payload only
    v
Recipient Device
    |
    | decrypt
    v
Plaintext Message
```

Before Cipher can claim end-to-end encryption, encryption must occur on client devices before message content is transmitted to the backend.

The server should eventually store and deliver encrypted payloads without access to plaintext messages or private messaging keys.

## Password and Authentication Security

Cipher does not currently accept or store passwords through the backend.

When authentication is implemented:

- Plaintext passwords must never be stored
- Passwords must use an appropriate password-hashing algorithm
- Only password hashes should be stored
- Authentication responses should avoid unnecessary account-existence disclosure
- Authenticated identity should determine authorization decisions
- Clients should no longer be trusted to identify themselves by supplying arbitrary user IDs

The current simulated user identity will be removed when real authentication is introduced.

## Encryption Status

End-to-end encryption has not yet been implemented.

Cipher's long-term security model is client-side encryption and decryption so that the backend can route and persist messages without access to plaintext content or users' private messaging keys.