# Pokemon Prisma

A REST API built with Express, Prisma ORM 7, and PostgreSQL. It provides health checks and CRUD operations for user profiles.

## Requirements

- Node.js
- A PostgreSQL database

## Setup

Install dependencies:

```sh
npm ci
```

Create a `.env` file in the project root and set your database connection string:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"
```

Apply database migrations and generate the Prisma client:

```sh
npx prisma migrate dev
npx prisma generate
```

Start the API:

```sh
node src/index.js
```

The server listens on port `3000`.

## API

All endpoints return JSON unless noted otherwise.

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/health` | Check whether the API is running. |
| `POST` | `/users` | Create a user. Requires `username`, `email`, and `fullName`; accepts optional `bio` and `isPrivate`. |
| `GET` | `/users` | List users. |
| `GET` | `/users/:id` | Get a user by ID. |
| `PATCH` | `/users/:id` | Update `fullName`, `bio`, or `isPrivate`. |
| `DELETE` | `/users/:id` | Delete a user. Returns `204` on success. |

Example user creation request:

```sh
curl -X POST http://localhost:3000/users \
  -H 'Content-Type: application/json' \
  -d '{"username":"ash","email":"ash@example.com","fullName":"Ash Ketchum"}'
```

Usernames and email addresses must be unique. Requests to create a duplicate return `409`; requests for a missing user return `404`.