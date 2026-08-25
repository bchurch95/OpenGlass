.PHONY: up down logs build restart ps agent-info

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
