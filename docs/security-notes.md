# Cipher Security Notes

Cipher is currently a prototype and does not yet provide
end-to-end encryption.

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
- Messages are local mock data
- No backend exists yet
- No cryptographic protocol has been integrated
- No security audit has been performed
- User creation currently uses in-memory mock data
- User authentication has not been implemented
- Passwords are not yet accepted or stored by the backend
