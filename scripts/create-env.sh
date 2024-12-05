#!/bin/bash

# Check if both arguments are provided
if [ "$#" -ne 2 ]; then
  echo "Error: Missing arguments."
  echo "Usage: ./scripts/create-env.sh <project-root-path> <stage>"
  exit 1
fi

# Arguments
PROJECT_ROOT=$1
STAGE=$2

# List of apps that need environment files
APPS=("api" "web" "web-admin" "web-manager" "web-valet")

echo "🚀 Moving secrets of $STAGE to .env"

# Iterate over each app and copy the appropriate environment file
for APP in "${APPS[@]}"; do
  ENV_SOURCE="$PROJECT_ROOT/apps/$APP/.env.$STAGE"
  ENV_TARGET="$PROJECT_ROOT/apps/$APP/.env"

  if [ -f "$ENV_SOURCE" ]; then
    echo "Copying $ENV_SOURCE to $ENV_TARGET"

    # If .env exists, it will be overwritten by .env.<stage>
    cp "$ENV_SOURCE" "$ENV_TARGET"

    echo "✅ Successfully copied $ENV_SOURCE to $ENV_TARGET"
  else
    echo "⚠️ Warning: $ENV_SOURCE not found, skipping."
  fi
done

echo "Environment setup for $STAGE complete."
