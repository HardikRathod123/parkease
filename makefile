COMPOSE_FILE_development=./deployments/development/docker-compose-development.yml
COMPOSE_FILE_staging=./deployments/staging/docker-compose-staging.yml

NAME_staging=parkease-staging
NAME_development=parkease-development

BASE_PATH=$(PWD)


# This target is used to deploy the services for the specified stage using Docker Compose. The COMPOSE_DOCKER_CLI_BUILD environment variable is set to 1 to enable BuildKit, which is a new feature in Docker that allows for faster and more efficient builds. The BASE_PATH environment variables are set to the base path and the path to the service respectively. The compose file and the project name are determined by the stage.
deploy:
	@echo
	@echo "🚀Deploying $(stage) services"
	@echo
	@COMPOSE_DOCKER_CLI_BUILD=1 BASE_PATH=$(BASE_PATH) docker-compose -f $(COMPOSE_FILE_$(stage)) -p $(NAME_$(stage)) up -d

# This code is used to restart a service in a given stage
# The stage parameter can be any of the following: dev, test, prod
# The service parameter can be any of the following: api, db, redis, frontend
# The command to run this code is: make restart stage=dev service=api
restart:
	@echo
	@echo "🔁Restart $(stage) service"
	@echo
	@COMPOSE_DOCKER_CLI_BUILD=1 BASE_PATH=$(BASE_PATH) HBP_C_PATH=$(HBP_C_PATH) docker compose -f $(COMPOSE_FILE_$(stage)) -p $(NAME_$(stage)) restart $(service)

# This function is used to setup apps with the development environment and deploy services as docker containers.
recreate_no-seed_no-clean:
# @$(MAKE) --no-print-directory git-clean
	@echo "Installing dependencies"
	@pnpm install
# @$(MAKE) --no-print-directory decrypt-envs-stage
# @$(MAKE) --no-print-directory create-env-stage
	@echo
	@echo "🧹Deleting $(stage) services"
	@echo
	@COMPOSE_DOCKER_CLI_BUILD=1 BASE_PATH=$(BASE_PATH) HBP_C_PATH=$(HBP_C_PATH) docker compose -f $(COMPOSE_FILE_$(stage)) -p $(NAME_$(stage)) down
	@$(MAKE) --no-print-directory deploy
