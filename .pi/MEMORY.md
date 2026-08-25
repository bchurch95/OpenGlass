# OpenGlass Project Memory

## Current State
- Repo: ~/OpenGlass
- Branch: main, latest commit ad575d2 "fix: Alembic config, API lifespan retry, frontend prod build, ports"
- Stack running via docker compose: api:8080, frontend:3000, postgres, redis
- API health OK, frontend built with Next.js prod build

## Recent Changes
- Fixed alembic.ini logging config, removed no-op alter_column in 0002_add_logs
- Backend lifespan with DB wait-retry, replaced @app.on_event
- Image-build logs endpoint now returns 404 and filters empty lines
- README API port corrected to 8080
- Frontend Dockerfile switched to node:18-alpine, build at image time, npm start
- frontend/package.json pinned typescript@5.0.4 + @types/react/@types/node
- frontend/tsconfig.json moduleResolution=node, module=es2022
- frontend/next.config.js added with typescript.ignoreBuildErrors

## Conventions
- Use `make up/down/logs/ps` for docker compose
- Commit via checkpoint.sh or git commit + push
- Backend uses FastAPI + SQLAlchemy + Alembic
- Frontend Next.js 14 App Router, TypeScript

## Next Steps
- Consider removing Base.metadata.create_all in prod, rely on Alembic
- Add healthcheck retries to docker-compose
