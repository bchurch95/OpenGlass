# OpenGlass Platform Plan

## Vision
A “one plane of glass” web platform for managing a mixed fleet of OpenWrt access points/routers and Cisco switches, with a polished UI, fleet automation, and a custom image build pipeline for pre-configured APs/routers ready for deployment.

## Scope v1
- Fleet discovery & inventory
- Device groups / sites
- Real-time status & telemetry
- Configuration management & push
- Firmware / custom image build & deployment
- Web UI for operators

Out of v1: AAA/RADIUS integration, advanced analytics, multi-tenant.

## Architecture Overview

```
[Web UI - React/Next.js]
       |
[API Gateway - FastAPI / Node]
       |
[Core Services]
  - Device Manager
  - Config Manager
  - Image Builder
  - Telemetry Ingest
       |
[Data Layer - Postgres + Redis + S3/MinIO]
       |
[Device Agents]
  - OpenWrt: UCI + ubus + procd script / luci-app
  - Cisco: NETCONF/RESTCONF/SSH + Ansible
```

### Components

1. **Web UI**
   - Dashboard, map view, device table, live metrics
   - Site/Group management
   - Config editor, bulk actions
   - Image builder wizard

2. **API & Backend**
   - FastAPI for REST + WebSocket telemetry
   - Job queue: Celery / RQ
   - Auth: OAuth2 / JWT

3. **Device Manager**
   - OpenWrt: SSH + UCI, ubus, or custom agent
   - Cisco: NETCONF/RESTCONF, SSH via Netmiko/Ansible
   - Heartbeat, reachability, inventory sync

4. **Config Manager**
   - Declarative desired state per device type
   - Diff & dry-run, rollback
   - Versioned configs in DB + Git

5. **Image Builder**
   - OpenWrt Image Builder / Buildroot pipeline
   - Pre-bake packages, configs, certificates
   - Build variants per model/site
   - Artifact storage + signing

6. **Telemetry**
   - Prometheus metrics from devices
   - Timeseries DB for graphs

## Tech Stack Proposal
- Frontend: Next.js + TypeScript + Tailwind + shadcn/ui + Recharts
- Backend: Python FastAPI, SQLAlchemy, Alembic
- Queue: Redis + Celery
- DB: PostgreSQL
- Object Storage: MinIO / S3
- Infra: Docker Compose for dev, Kubernetes for prod
- CI/CD: GitHub Actions

## Data Model Sketch
- Site { id, name }
- Device { id, hostname, mac, model, vendor, site_id, ip, last_seen }
- ConfigVersion { id, device_id, version, data, created_at }
- ImageBuild { id, target, version, variant, artifact_url, status }

## Workflows
1. **Onboard Device**
   - Discovery → Claim → Initial config push → Heartbeat

2. **Manage Config**
   - Edit desired state → Validate → Push → Verify

3. **Build Custom Image**
   - Select target model + packages + base config → Build → Sign → Publish → Deploy to fleet/group

4. **Deploy**
   - Staged rollout, canary, rollback

## OpenWrt Custom Image Pipeline
- Use official OpenWrt Image Builder per target
- Inject: `openglass-agent`, pre-seed UCI defaults, SSH keys, certificates
- Build via GitHub Actions on tag
- Output: `.img`, `.bin`, checksums, manifest

## Cisco Switch Integration
- Inventory via SNMP/LLDP
- Config backup via SSH/SCP
- Changes via Ansible playbooks / NETCONF

## Roadmap
**Milestone 0 - Foundations**
- Repo scaffold, Docker Compose, DB migrations
- Basic auth + UI shell

**Milestone 1 - Device Inventory**
- OpenWrt SSH inventory, Cisco SNMP inventory
- Device list UI

**Milestone 2 - Telemetry & Dashboard**
- Heartbeat, metrics, map view

**Milestone 3 - Config Management**
- Push/retrieve configs, versioning

**Milestone 4 - Image Builder**
- OpenWrt image builder pipeline, UI wizard

**Milestone 5 - Fleet Deploy**
- Bulk actions, staged rollout, rollback

## Risks
- OpenWrt model fragmentation
- Cisco model API variance
- Secure key management for fleet
- Image build time & storage

## Next Steps
1. Confirm tech stack preferences
2. Define initial device models to support
3. Start scaffold: backend + UI shell + DB schema
