# Image Builder

Build pre-configured OpenWrt images for APs/routers.

## Usage
- Define target model + packages + config in `builds/`
- Run `docker compose up --build image-builder`
- Artifacts output to `artifacts/`

## Pipeline
1. Pull OpenWrt Image Builder for target
2. Inject packages, configs, certificates
3. Build image
4. Sign & publish
