# Tweety Backend

NestJS backend server for the Tweety social media app.

## Quick Start

```bash
npm install
npm run start:dev
```

Server runs on `http://localhost:3000`

## Structure

```
src/
├── auth/          # Authentication (JWT, signup/login)
├── tweety/        # Tweet CRUD operations
├── guards/        # Auth guards
└── main.ts        # Entry point
```

## API Endpoints

- `POST /auth/signup` - Create account
- `POST /auth/login` - Login
- `POST /auth/refresh` - Refresh token
- `GET /tweety` - Get all tweets
- `POST /tweety` - Create tweet
- `PATCH /tweety/:id` - Update tweet
- `DELETE /tweety/:id` - Delete tweet

## Environment

Make sure you have:

- MongoDB connection
- JWT secrets configured

## Scripts

- `npm run start:dev` - Development with hot reload
- `npm run build` - Build for production
- `npm run test` - Run tests

## Tech Stack

- NestJS + TypeScript
- MongoDB + Mongoose
- JWT Authentication
- Class Validator
