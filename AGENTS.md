# OpenGlass Agent Guide

## Quick Start
```bash
cd ~/OpenGlass
make up      # docker compose up -d --build
make ps      # status
make logs    # follow logs
make down    # stop
```

Services:
- API: http://localhost:8080  →  `curl http://localhost:8080/health`
- Frontend: http://localhost:3000
- DB: postgres:16, user openglass/openglass
- Redis: redis:7

## Repo Layout
- `backend/` – FastAPI + SQLAlchemy + Alembic
- `frontend/` – Next.js 14 App Router, TypeScript, built in Dockerfile
- `image-builder/` – OpenWrt pipeline
- `docs/` – planning

## Common Tasks
- Run migrations: `cd backend && python -m alembic upgrade head`
- Seed DB: `cd backend && python -m app.seed`
- Commit: `./checkpoint.sh "message"` or `git add -A && git commit -m "..." && git push`
- Project memory: `.pi/MEMORY.md`
- Global memory: `~/.pi/agent/MEMORY.md`

## Conventions
- Backend lifespan waits for DB, creates tables for dev only
- Frontend is built at image build time, runs `npm start`
- Port mapping: API 8080:8000, Frontend 3000:3000
- Do not use `Base.metadata.create_all` in prod; use Alembic

## Current State
See `.pi/MEMORY.md` for latest changes and open items.
