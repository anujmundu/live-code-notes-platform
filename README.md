# Live Code Notes Platform

Live Code Notes Platform is a real-time collaborative note-taking application designed for writing, editing, and sharing code-centric notes. It combines secure authentication, persistent storage, and live synchronization to enable multiple users to work on notes seamlessly.

The project is built as a full-stack application with a clear separation between backend services and frontend UI.

---

## Features

- User authentication using JWT
- Secure, user-scoped notes
- Create, read, and manage code notes
- Real-time collaborative editing using WebSockets
- Persistent storage with MongoDB
- Clean and minimal frontend interface
- Scalable backend architecture

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Socket.IO for real-time communication

### Frontend
- React
- Vite
- Axios
- Socket.IO Client
- Modern CSS for a minimal UI

---

## Project Structure

live-code-notes-platform/
├── backend/
│ ├── src/
│ │ ├── config/
│ │ ├── middleware/
│ │ ├── models/
│ │ ├── routes/
│ │ └── sockets/
│ ├── package.json
│ └── .env.example
│
├── frontend/
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── vite.config.js
│
├── README.md
└── .gitignore


---

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB (local instance)

---

## Backend Setup

```bash
cd backend
npm install
```

Create a .env file in the backend folder:

PORT=5000
MONGO_URI=mongodb://localhost:27017/livecodenotes
JWT_SECRET=your_secret_key

Start the backend server:
npm start

The backend will run on:
http://localhost:5000

Frontend Setup
cd frontend
npm install
npm run dev


The frontend will run on:

http://localhost:5173

## How It Works

Users authenticate via JWT-based login
Notes are created and stored per user
When a note is opened, the client joins a WebSocket room
Changes are broadcast in real time to all connected users
Notes remain synced and persisted in the database

## Collaboration Model

Each note has a dedicated Socket.IO room
Clients emit updates as text changes
The server relays updates to all participants in the room
Every participant sees changes instantly

## Use Cases

Collaborative coding notes
Interview preparation
Pair programming documentation
Learning and revision notes
Hackathon collaboration

## Team Workflow

Backend and frontend are developed independently
Changes are integrated via a single monorepo
Each contributor owns a clear responsibility area
All contributions are tracked through Git history

License

This project is created for educational and hackathon purposes.

## Authors

- Anuj Mundu  
- Mahendhar Banavath
