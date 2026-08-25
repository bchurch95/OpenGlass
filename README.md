# OpenGlass

OpenGlass is a UniFi-style “one plane of glass” platform for managing a mixed fleet of OpenWrt access points/routers and Cisco switches, with a polished web UI and custom image build pipeline for pre-configured deployment.

## Getting Started

```bash
cd OpenGlass
docker compose up --build
```

API: http://localhost:8080
Frontend: http://localhost:3000

## Structure
- `backend/` - FastAPI API
- `frontend/` - Next.js UI
- `image-builder/` - OpenWrt custom image pipeline
- `infra/` - deployment manifests
- `docs/` - planning & design

See `docs/PLAN.md` for full architecture.
