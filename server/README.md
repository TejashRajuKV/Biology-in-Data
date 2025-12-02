# Server (API)

This is a minimal Express server that exposes a POST /api/research endpoint to store research documents in MongoDB.

Setup

1. Install dependencies:

   npm install

2. Add a .env file in the server/ directory with MONGODB_URI (or use the example .env.example):

   MONGODB_URI=mongodb://127.0.0.1:27017/biology-in-data

3. Start the server:

   npm run dev

API

POST /api/research
- JSON body fields: { title, authors (array), year, category, abstract, tags(array), chartJson (object) }
- Returns { id } on success.

