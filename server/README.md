# Backend Auth (Express + MongoDB + JWT)

This folder contains a minimal Express server that provides register/login endpoints using MongoDB (Mongoose) and JWT tokens.

Quick start

1. Open a terminal at `server/`.
2. Copy `.env.example` to `.env` and fill `MONGO_URI` and `JWT_SECRET`.
3. Install dependencies:

```powershell
npm install
```

4. Run in development (requires `nodemon`):

```powershell
npm run dev
```

Using MongoDB Atlas

- Create a free cluster at https://cloud.mongodb.com and add a database user with a password.
- Whitelist your IP (or allow access from anywhere during testing) and copy the connection string.
- Copy `.env.example` to `.env` and paste the connection string into `MONGO_URI`, replacing `<user>`, `<password>`, and the DB name.
- Example `MONGO_URI` format:

```dotenv
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.example.mongodb.net/mydb?retryWrites=true&w=majority
```

Then run `npm run dev` and the server will connect to Atlas if `MONGO_URI` is set.

5. Endpoints

- POST `/api/auth/register`  -> { name, email, password }
- POST `/api/auth/login`     -> { email, password }
- GET  `/api/auth/me`        -> Protected (Authorization: Bearer <token>)

Example curl (login):

```bash
curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d '{"email":"user@example.com","password":"secret"}'
```

Security

- Use a secure `JWT_SECRET` and store it safely.
- Use TLS (https) in production.

