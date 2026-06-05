# Cyber Training Lab

A full-stack real-time cybersecurity authentication **training simulator**.

## Stack

- Frontend: React + TypeScript (Vite)
- Backend: Node.js + TypeScript (Express)
- Real-time updates: Socket.IO
- Storage: in-memory session store only (no database)

## Training Flow

`INIT -> LOGIN_STEP -> MFA_STEP -> EMAIL_STEP -> SUCCESS_STEP`

Server-side state is authoritative. Clients only render current state.

## WebSocket Events

### Client -> Server

- `JOIN_SESSION`
- `ADMIN_SET_STEP`
- `RESET_SESSION`

### Server -> Client

- `SESSION_STATE`
- `STEP_CHANGED`
- `SESSION_RESET`

## Run

```bash
cd server && npm install && npm run dev
```

```bash
cd client && npm install && npm run dev
```

Server defaults to `http://localhost:3001`.
Client connects to `VITE_SOCKET_URL` or `http://localhost:3001`.

## Security & Ethics

This project is a simulation only:

- No real authentication
- No password storage
- No OTP/email sending
- No external identity providers
- No real user data persistence
