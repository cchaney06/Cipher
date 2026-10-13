# Cipher Security Notes

Cipher is currently a prototype and does not yet provide end-to-end encryption.

## Planned Security Goals

- Messages encrypted before leaving the sender's device
- Messages decrypted only on recipient devices
- Server does not possess private message keys
- Private keys are not stored in the backend database
- TLS used for client/server communication
- Secure device-side key storage
- Identity verification
- Protection against replayed messages
- Forward secrecy
- Secure attachment encryption

## Current Limitations

- Authentication is simulated
- Messages are still local mock data in the mobile client
- The mobile client is not yet connected to the backend API
- User authentication has not been implemented
- Passwords are not yet accepted or stored by the backend
- No cryptographic protocol has been integrated
- End-to-end encryption has not yet been implemented
- Real-time messaging has not yet been implemented
- No security audit has been performed

## Backend Security

The backend currently uses Node.js, TypeScript, Express, and PostgreSQL.

Current protections include:

- Database credentials are loaded from an ignored server .env file
- Database credentials are not stored directly in source code
- User-supplied values are passed to PostgreSQL using parameterized SQL queries
- API input is validated before user records are created
- Duplicate usernames are rejected
- Database errors are handled without intentionally exposing database credentials to clients

The backend does not currently implement user authentication, authorization, session management, or password handling.

## Database Security

The current development database runs locally using PostgreSQL inside Docker.

Current database protections include:

- PostgreSQL credentials are stored in ignored `.env` files
- Credentials are not committed to Git
- User IDs use UUIDs
- Usernames are unique
- Usernames are constrained to lowercase values
- Username length is constrained at the database level
- User data is persisted in a Docker volume
- No plaintext passwords are stored

The current database configuration is intended for local development and should not be treated as a production security configuration.

## Password Security

Cipher does not currently accept or store passwords through the backend.

When password authentication is implemented:

- Plaintext passwords must never be stored
- Passwords must be processed using an appropriate password-hashing algorithm
- Password hashes must be stored instead of plaintext passwords
- Authentication errors should avoid revealing whether a specific account exists

## Encryption Status

End-to-end encryption has not yet been implemented.

The long-term design goal is for encryption and decryption to occur on client devices so that the backend can deliver encrypted messages without having access to plaintext message contents or users' private messaging keys.
