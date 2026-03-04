#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

DG_DEPLOY_HOST="${DG_DEPLOY_HOST:-${DEPLOY_HOST:-}}"
DG_DEPLOY_USER="${DG_DEPLOY_USER:-${DEPLOY_USER:-}}"
DG_DEPLOY_PORT="${DG_DEPLOY_PORT:-${DEPLOY_PORT:-22}}"
DG_DEPLOY_PATH="${DG_DEPLOY_PATH:-${DEPLOY_PATH:-/opt/dutchgoose-portal}}"

if [[ -z "$DG_DEPLOY_HOST" || -z "$DG_DEPLOY_USER" ]]; then
  echo "DG_DEPLOY_HOST en DG_DEPLOY_USER zijn verplicht."
  echo "Voorbeeld:"
  echo "DG_DEPLOY_HOST=1.2.3.4 DG_DEPLOY_USER=ubuntu DG_DEPLOY_PATH=/opt/dutchgoose-portal bash ./scripts/deploy-dutchgoose.sh"
  exit 1
fi

if ! command -v rsync >/dev/null 2>&1; then
  echo "rsync is niet gevonden. Installeer rsync en probeer opnieuw."
  exit 1
fi

echo "[1/3] Sync naar $DG_DEPLOY_USER@$DG_DEPLOY_HOST:$DG_DEPLOY_PATH"
rsync -az --delete \
  --exclude '.git' \
  --exclude 'node_modules' \
  --exclude '.next' \
  --exclude '.env' \
  --exclude '.logs' \
  --exclude '.run' \
  --exclude 'portal-*.zip' \
  -e "ssh -p $DG_DEPLOY_PORT" \
  "$ROOT_DIR/" "$DG_DEPLOY_USER@$DG_DEPLOY_HOST:$DG_DEPLOY_PATH/"

echo "[2/3] Build + restart op server"
ssh -p "$DG_DEPLOY_PORT" "$DG_DEPLOY_USER@$DG_DEPLOY_HOST" "cd '$DG_DEPLOY_PATH' && docker compose -f docker-compose.plex.yml up -d --build --remove-orphans"

echo "[3/3] Klaar"
echo "Live URL: https://www.dutchgoose.nl"
