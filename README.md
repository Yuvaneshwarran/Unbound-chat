# Unbound Chat

This project consists of a backend and frontend setup for a web application. The backend is built using Node.js with Express, and the frontend is a React application.

## Backend Structure

The backend is organized as follows:

```
backend/
├── controllers/     # Controllers for handling business logic
├── node_modules/    # Node.js dependencies
├── package.json     # Node.js project metadata and dependencies
├── package-lock.json# Exact dependency tree
├── prisma/         # Prisma ORM configuration and migrations
├── routes/         # Route definitions for the API
├── server.js       # Entry point for the backend server
└── services/       # Business logic and service layers
```

### Backend Setup

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Set up environment variables:
   - Create a `.env` file in the backend directory
   - Add the required environment variables (see Environment Variables section)

3. Run the server:
   ```bash
   npm run dev
   ```

## Frontend Structure

The frontend is organized as follows:

```
frontend/
├── node_modules/    # Node.js dependencies
├── package.json     # Node.js project metadata and dependencies
├── package-lock.json# Exact dependency tree
├── public/         # Static assets (e.g., index.html)
└── src/            # React application source code
    ├── components/ # Reusable React components
    ├── App.js      # Main application component
    ├── index.js    # Entry point for the React app
    └── styles.css  # Global styles
```

### Frontend Setup

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Run the development server:
   ```bash
   npm start
   ```

## API Routes

The following API routes are available:

- `/models` - Handled by `models.routes.js`
- `/api` - Handled by `chat.js`
- `/upload` - Handled by `upload.routes.js`

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

- `PORT`: Port for the backend server (default: 5000)
- `DATABASE_URL`: Connection string for your database

Example `.env` file:
```
PORT=5000
DATABASE_URL="postgresql://username:password@localhost:5432/dbname"
```

## Getting Started

1. Clone the repository
2. Set up the backend (follow Backend Setup)
3. Set up the frontend (follow Frontend Setup)
4. Ensure all environment variables are properly configured
5. Start both servers and begin development

## Demo Video
https://github.com/Yuvaneshwarran/Unbound-chat/blob/main/video/2025-02-19-19-06-46_rzIZG0E1.mp4