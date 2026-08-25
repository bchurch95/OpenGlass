# OpenGlass Implementation Plan

## Completed
- Repo init + GitHub
- Project scaffold + Docker Compose
- Backend FastAPI + SQLAlchemy models + Alembic
- CRUD routers for Sites/Devices
- Frontend Next.js + Tailwind + AppLayout + Sidebar
- Dashboard page + Device detail page
- Seed script

## Phase 1 - Core UI
1. Devices list page `/devices` with table, filters, search
2. Sites list page `/sites` with CRUD UI
3. DeviceTable reusable component
4. API client abstraction with error handling
5. Loading skeletons & toast notifications

## Phase 2 - Management
6. Device detail tabs: Overview, Config, Telemetry
7. Config version history & rollback UI
8. Bulk actions: reboot, firmware update, config push
9. Site management UI

## Phase 3 - Image Builder
10. Image builder UI wizard
11. Build job queue + status polling
12. Artifact listing & download

## Phase 4 - Integrations
13. OpenWrt agent + SSH inventory
14. Cisco NETCONF integration
15. Telemetry ingestion + charts

## Immediate Next
- Devices list page + DeviceTable
- Sites list page
- API client wrapper
