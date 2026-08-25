.PHONY: up down logs build restart ps agent-info cortana-sync

up:
	docker compose up -d --build

down:
	docker compose down

logs:
	docker compose logs -f

build:
	docker compose build

restart:
	docker compose restart

ps:
	docker compose ps

agent-info:
	@echo "=== OpenGlass Agent Info ==="
	@echo ""
	@echo "Git:"
	@git -C $(CURDIR) log -1 --oneline
	@echo ""
	@echo "Memory:"
	@cat .pi/MEMORY.md
	@echo ""
	@echo "Services:"
	@docker compose ps --format "table {{.Name}}\t{{.Status}}\t{{.Ports}}"

cortana-sync:
	@echo "Pulling latest from GitHub..."
	@git pull origin main || true
	@echo "Rebuilding and starting services..."
	@docker compose up -d --build
	@echo "Updating project memory..."
	@mkdir -p .pi
	@make agent-info > .pi/agent_snapshot_$(shell date +%Y%m%d_%H%M%S).txt
	@echo "Sync complete. Run 'make agent-info' to verify."
