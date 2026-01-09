# Live Code Notes Backend

## Tech Stack
- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication
- Socket.IO

## Setup Instructions

```bash
npm install
```
Create .env file:

PORT=5000
MONGO_URI=mongodb://localhost:27017/livecodenotes
JWT_SECRET=your_secret_key


Run server:

npm start


## Features

1. User authentication (JWT)
2. Notes CRUD (user-scoped)
3. Real-time collaboration using Socket.IO

## Socket Events

1. join-note
2. code-update
3. code-sync