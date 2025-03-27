# Music App Backend

A NestJS-based backend application for a music app.

## Installation

1. Clone the repository:
```bash
git clone https://github.com/vivekbopaliya/music-app-nestjs.git

cd music-app-nestjs
```

2. Install all required dependencies
```bash 
pnpm i 
```

3. Set up your postgresql database.
```bash 
Option 1: Run locally using a PostgreSQL installation
Option 2: Use an online hosted PostgreSQL service (e.g., Supabase, Render, or AWS RDS) 
```

4. Configure environment variables
```bash
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
```

5. Start up your development server
```bash
pnpm start:dev
```
The server will run on http://localhost:4000 by default unless configured otherwise in main.ts file
