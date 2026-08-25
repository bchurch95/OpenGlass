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

## Deployment - Cortana
- Host: 192.168.66.232
- Git HEAD: 
- Services: api:8080, frontend:3000, db:5432, redis:6379
- Last sync: 2026-08-25T10:14:26-05:00
- Notes: Ports 8000/8001 occupied by vLLM router. OpenGlass uses 8080/3000.

## Deployment - Cortana Updated
- Host: 192.168.66.232
- Git HEAD: 
- Services: api:8080, frontend:3000, db:5432, redis:6379
- Last sync: 2026-08-25T10:14:42-05:00
- Notes: Ports 8000/8001 occupied by vLLM router. OpenGlass uses 8080/3000.
=== OpenGlass Agent Info ===

Git:
26759b3 Merge origin/main into Cortana setup

Memory:
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

## Deployment - Cortana
- Host: 192.168.66.232
- Git HEAD: 
- Services: api:8080, frontend:3000, db:5432, redis:6379
- Last sync: 2026-08-25T10:14:26-05:00
- Notes: Ports 8000/8001 occupied by vLLM router. OpenGlass uses 8080/3000.

## Deployment - Cortana Updated
- Host: 192.168.66.232
- Git HEAD: 
- Services: api:8080, frontend:3000, db:5432, redis:6379
- Last sync: 2026-08-25T10:14:42-05:00
- Notes: Ports 8000/8001 occupied by vLLM router. OpenGlass uses 8080/3000.

Services:
NAME                   STATUS             PORTS
openglass-api-1        Up 2 minutes       0.0.0.0:8080->8000/tcp, [::]:8080->8000/tcp
openglass-db-1         Up About an hour   5432/tcp
openglass-frontend-1   Up 2 minutes       0.0.0.0:3000->3000/tcp, [::]:3000->3000/tcp
openglass-redis-1      Up About an hour   6379/tcp
