# Cipher Mobile

The Cipher mobile client is a React Native application built with Expo, Expo Router, and TypeScript.

It currently provides the user interface for Cipher and can communicate with the local Cipher backend API during development.

## Current Status

Implemented:

- Login interface
- Login form validation
- Conversation list
- Conversation searching
- Dynamic chat routes
- Incoming and outgoing message bubbles
- Local message sending
- Automatic chat scrolling
- Settings/profile screen
- Logout navigation
- Safe-area handling
- Keyboard handling
- Basic accessibility support
- Reusable API service
- Backend health checks
- Database-backed user count retrieval
- Physical iPhone development through Expo Go

Still using local mock data:

- Authentication
- Current user
- Conversations
- Messages

Not yet implemented:

- Real authentication
- Backend-driven conversation data
- Backend-driven message data
- Real-time messaging
- End-to-end encryption
- Push notifications

## Technology Stack

- React Native
- Expo
- Expo Router
- TypeScript

## Project Structure

```text
mobile/
├── src/
│   ├── app/
│   │   ├── chat/
│   │   │   └── [id].tsx
│   │   ├── _layout.tsx
│   │   ├── conversations.tsx
│   │   ├── index.tsx
│   │   └── settings.tsx
│   │
│   ├── components/
│   │   ├── AppTitle.tsx
│   │   ├── ConversationRow.tsx
│   │   ├── MessageBubble.tsx
│   │   ├── MessageInput.tsx
│   │   └── PrimaryButton.tsx
│   │
│   ├── constants/
│   │   ├── AppConfig.ts
│   │   ├── MockConversations.ts
│   │   ├── MockCurrentUser.ts
│   │   ├── MockMessages.ts
│   │   └── Theme.ts
│   │
│   ├── services/
│   │   └── api.ts
│   │
│   ├── types/
│   │   ├── Conversation.ts
│   │   ├── Message.ts
│   │   └── User.ts
│   │
│   └── utils/
│       └── formatConversationTime.ts
│
├── .env.example
├── package.json
└── tsconfig.json
```

## Development Setup

Install dependencies:

```powershell
npm install
```

Type-check the project:

```powershell
npx tsc --noEmit
```

Check the Expo project:

```powershell
npx expo-doctor@latest
```

Start the Expo development server:

```powershell
npx expo start --clear
```

The project is currently tested primarily on a physical iPhone using Expo Go.

## Backend Configuration

The mobile client reads the backend API address from:

```text
.env.local
```

Create the file in the `mobile` directory and add:

```text
EXPO_PUBLIC_API_URL=http://YOUR_COMPUTER_IP:3000
```

For example:

```text
EXPO_PUBLIC_API_URL=http://192.168.x.x:3000
```

Do not commit `.env.local`.

The repository includes `.env.example` to document the required environment variable.

The API URL is not a secret. Values beginning with `EXPO_PUBLIC_` are available to the mobile application at runtime and should never contain passwords, private keys, API secrets, or other sensitive credentials.

## Local Network Development

During local development, the physical iPhone connects to the Windows development machine over a Windows mobile hotspot.

The Express backend must be running and accessible from the iPhone before API requests from Cipher will work.

The backend currently listens on port:

```text
3000
```

A successful backend health response should resemble:

```json
{
  "status": "ok",
  "service": "cipher-api",
  "database": "connected"
}
```

## API Service

Backend requests are centralized in:

```text
src/services/api.ts
```

The service currently supports:

- Backend health checks
- Retrieving database-backed users

The Settings screen uses these requests to display:

- Backend connection status
- Number of users currently stored in PostgreSQL

## Current Data Flow

```text
                  React Native
                    /      \
                   /        \
                  v          v
         Local Mock Data   API Service
              |                |
              v                v
     Conversations /       Express API
        Messages                |
                                v
                            PostgreSQL
```

The mobile client currently uses real backend data only for connectivity and user information.

Conversation and message screens still use local mock data.

## Security Status

Cipher does not currently provide end-to-end encryption.

Current development limitations include:

- Login is simulated
- No real user authentication
- Conversation and message data are local mock data
- Local API communication uses HTTP during development
- Real-time networking has not been implemented
- Message encryption has not been implemented

Production communication is planned to use HTTPS.

End-to-end encryption will be implemented separately after the core client/server messaging architecture is functioning.

## Development Notes

If the backend URL changes, update:

```text
.env.local
```

and restart Expo:

```powershell
npx expo start --clear
```

If the iPhone cannot reach the backend, verify:

- The backend server is running
- PostgreSQL is running
- The iPhone is connected to the development hotspot
- The API address in `.env.local` matches the Windows hotspot IPv4 address
- Port `3000` is reachable from the iPhone

## Next Steps

The next major mobile milestone is to replace local conversation and message mock data with PostgreSQL-backed API data once the corresponding backend endpoints are implemented.
