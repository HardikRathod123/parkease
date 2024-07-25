COMPOSE_FILE_development=./deployments/development/docker-compose-development.yml
COMPOSE_FILE_staging=./deployments/staging/docker-compose-staging.yml

NAME_staging=parkease-staging
NAME_development=parkease-development

BASE_PATH=$(PWD)

# Default target when no specific target is specified.
# It prompts the user to specify a command.
all:
	@echo
	@echo "please specifiy the command 👊"
	@echo

# Creates a .env file for a specified stage by executing a script.
create-env-stage:
	@echo
	@echo "🚀Moving secrets of $(stage) to .env"
	@echo
	@chmod +x ./scripts/create-env.sh
	@./scripts/create-env.sh "$(PWD)" "$(stage)"

# Decrypts environment variables for all environments using nx-manage.
# //   TODO   Pending NX Manage
# decrypt-envs:
# 	@npx @raftlabs/nx-manage decrypt -e production -p $(PASSPHRASE_PRODUCTION)
# 	@npx @raftlabs/nx-manage decrypt -e staging -p $(PASSPHRASE_STAGING)
# 	@npx @raftlabs/nx-manage decrypt -e development -p $(PASSPHRASE_DEVELOPMENT)
# 	@npx @raftlabs/nx-manage decrypt -e development -p $(PASSPHRASE_LOCAL_DEVELOPMENT)

# Decrypts environment variables for a specific stage.
decrypt-envs-stage:
	@echo
	@echo "🚀Decrypt secrets $(stage)"
	@echo
	@npx @raftlabs/nx-manage decrypt -e $(stage) -p $(passphrase)

# Encrypts environment variables for a specific stage.
encrypt-envs-stage:
	@echo
	@echo "🚀Encrypt secrets $(stage)"
	@echo
	@npx @raftlabs/nx-manage encrypt -e $(stage) -p $(passphrase)

# Encrypts environment variables for all environments using nx-manage.
# //   TODO   Pending NX Manage
# encrypt-envs:
# 	@npx @raftlabs/nx-manage encrypt -e production -p $(PASSPHRASE_PRODUCTION)
# 	@npx @raftlabs/nx-manage encrypt -e staging -p $(PASSPHRASE_STAGING)
# 	@npx @raftlabs/nx-manage encrypt -e development -p $(PASSPHRASE_DEVELOPMENT)
# 	@npx @raftlabs/nx-manage encrypt -e local-development -p $(PASSPHRASE_LOCAL_DEVELOPMENT)

# Sets up the remote environment by installing dependencies and decrypting environments.
setup-remote:
	@pnpm i
	@$(MAKE) --no-print-directory decrypt-envs

# This target is used to deploy the services for the specified stage using Docker Compose. The COMPOSE_DOCKER_CLI_BUILD environment variable is set to 1 to enable BuildKit, which is a new feature in Docker that allows for faster and more efficient builds. The BASE_PATH environment variables are set to the base path and the path to the service respectively. The compose file and the project name are determined by the stage.
deploy:
	@echo
	@echo "🚀Deploying $(stage) services"
	@echo
# @COMPOSE_DOCKER_CLI_BUILD=1 BASE_PATH=$(BASE_PATH) docker-compose -f $(COMPOSE_FILE_$(stage)) -p api up -d
# //   TODO   Bug Fix on why below doesnt work due to network name issue prisma is not able to authenticate it
	@COMPOSE_DOCKER_CLI_BUILD=1 BASE_PATH=$(BASE_PATH) docker-compose -f $(COMPOSE_FILE_$(stage)) up -d

# This code is used to restart a service in a given stage
# The stage parameter can be any of the following: dev, test, prod
# The service parameter can be any of the following: api, db, redis, frontend
# The command to run this code is: make restart stage=dev service=api
restart:
	@echo
	@echo "🔁Restart $(stage) service"
	@echo
	@COMPOSE_DOCKER_CLI_BUILD=1 BASE_PATH=$(BASE_PATH) docker compose -f $(COMPOSE_FILE_$(stage)) -p $(NAME_$(stage)) restart $(service)

# This function is used to setup apps with the development environment and deploy services as docker containers.
recreate_no-seed_no-clean:
# @$(MAKE) --no-print-directory git-clean
	@echo "Installing dependencies"
	@pnpm install
# //   TODO   Setup nx and nx-manage for envs
# @$(MAKE) --no-print-directory decrypt-envs-stage
# @$(MAKE) --no-print-directory create-env-stage
	@echo
	@echo "🧹Deleting $(stage) services"
	@echo
	@COMPOSE_DOCKER_CLI_BUILD=1 BASE_PATH=$(BASE_PATH) docker compose -f $(COMPOSE_FILE_$(stage)) down
	@$(MAKE) --no-print-directory deploy

# Cleans the project directory of all files that are typically git ignored.
git-clean:
	@echo "Deleting all git ignored items"
	@[ ! -f .idea/workspace.xml ] || mv .idea/workspace.xml .idea/workspace.xml.tmp
	@[ ! -f .envrc ] || mv .envrc .envrc.tmp
	@[ ! -f .github/CODEOWNERS ] || mv .github/CODEOWNERS .github/CODEOWNERS.tmp
	@sudo git clean -dfX
	@[ ! -f .idea/workspace.xml.tmp ] || mv .idea/workspace.xml.tmp .idea/workspace.xml
	@[ ! -f .envrc.tmp ] || mv .envrc.tmp .envrc
	@[ ! -f .github/CODEOWNERS.tmp ] || mv .github/CODEOWNERS.tmp .github/CODEOWNERS