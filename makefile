COMPOSE_FILE_development=./deployments/development/docker-compose-development.yml
COMPOSE_FILE_staging=./deployments/staging/docker-compose-staging.yml

NAME_staging=parkease-staging
NAME_development=parkease-development

BASE_PATH=$(PWD)

create-env-stage:
	@echo
	@echo "🚀Moving secrets of $(stage) to .env"
	@echo
	@chmod +x ./scripts/create-env.sh
	@./scripts/create-env.sh "$(PWD)" "$(stage)"

validate:
	@echo "Validating the codebase"
	yarn format:write && yarn tsc && yarn lint && yarn build

dev-all:
	@echo "Starting all applications..."
	@npx concurrently \
		"make dev-web" \
		"make dev-api" \
		"make dev-web-admin" \
		"make dev-web-manager" \
		"make dev-web-valet"

dev-web:
	@echo "Starting web app..."
	@cd apps/web && yarn dev

dev-api:
	@echo "Starting API..."
	@echo "NODE_ENV=$(stage) yarn dev"
	@cd apps/api && NODE_ENV=$(stage) yarn dev

dev-web-admin:
	@echo "Starting web admin..."
	@cd apps/web-admin && yarn dev

dev-web-manager:
	@echo "Starting web manager..."
	@cd apps/web-manager && yarn dev

dev-web-valet:
	@echo "Starting web valet..."
	@cd apps/web-valet && yarn dev

dev-frontend:
	@echo "Starting frontend apps..."
	@npx concurrently \
		"make dev-web" \
		"make dev-web-admin" \
		"make dev-web-manager" \
		"make dev-web-valet"

dev-backend:
	@echo "Starting backend..."
	@make dev-api

deploy:
	@echo
	@echo "🚀Deploying $(stage) services"
	@echo
	@COMPOSE_DOCKER_CLI_BUILD=1 BASE_PATH=$(BASE_PATH) docker-compose -f $(COMPOSE_FILE_$(stage)) -p $(NAME_$(stage)) up -d

restart:
	@echo
	@echo "🔁Restart $(stage) service"
	@echo
	@COMPOSE_DOCKER_CLI_BUILD=1 BASE_PATH=$(BASE_PATH) HBP_C_PATH=$(HBP_C_PATH) docker compose -f $(COMPOSE_FILE_$(stage)) -p $(NAME_$(stage)) restart $(service)

recreate_no-seed_no-clean:
	@$(MAKE) --no-print-directory create-env-stage
	@echo "Installing dependencies"
	@yarn install
	@echo
	@echo "🧹Deleting $(stage) services"
	@echo
	# Below script does not work due to prisma
	# @COMPOSE_DOCKER_CLI_BUILD=1 BASE_PATH=$(BASE_PATH) HBP_C_PATH=$(HBP_C_PATH) docker compose -f $(COMPOSE_FILE_$# ##(stage)) -p $(NAME_$(stage)) down
	@echo starting docker container
	@cd apps/api && docker-compose up -d
	@$(MAKE) --no-print-directory deploy
