# Personal Portfolio

## Frontend

### Run

```bash
npm install
npm run dev
```

### Run Frontend + Backend Together

```bash
npm install
npm run dev:all
```

### Routes

- `/` (home)
- `/about`
- `/projects`
- `/experience`
- `/contact`

## Backend (API)

A minimal Express API lives in `server/`.

### Run

```bash
cd server
npm install
npm run dev
```

### Endpoints

- `GET /api/health`
- `POST /api/contact` (expects JSON: `{ "name": "...", "email": "...", "message": "..." }`)

### Admin (optional)

- Admin Login: `/admin/login`
- Admin Dashboard: `/admin`

In dev, the frontend proxies `/api/*` to `http://localhost:5050`.
