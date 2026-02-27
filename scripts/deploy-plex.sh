#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

DEPLOY_HOST="${DEPLOY_HOST:-}"
DEPLOY_USER="${DEPLOY_USER:-}"
DEPLOY_PORT="${DEPLOY_PORT:-22}"
DEPLOY_PATH="${DEPLOY_PATH:-/opt/dutchgoose-wls}"

if [[ -z "$DEPLOY_HOST" || -z "$DEPLOY_USER" ]]; then
  echo "DEPLOY_HOST en DEPLOY_USER zijn verplicht."
  echo "Voorbeeld:"
  echo "DEPLOY_HOST=79.137.20.193 DEPLOY_USER=ubuntu DEPLOY_PATH=/opt/dutchgoose-wls ./scripts/deploy-plex.sh"
  exit 1
fi

if ! command -v rsync >/dev/null 2>&1; then
  echo "rsync is niet gevonden. Installeer rsync en probeer opnieuw."
  exit 1
fi

echo "[1/3] Sync naar $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH"
rsync -az --delete \
  --exclude '.git' \
  --exclude 'node_modules' \
  --exclude '.next' \
  --exclude '.env' \
  --exclude '.logs' \
  --exclude '.run' \
  --exclude 'portal-*.zip' \
  -e "ssh -p $DEPLOY_PORT" \
  "$ROOT_DIR/" "$DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH/"

echo "[2/3] Build + restart op server"
ssh -p "$DEPLOY_PORT" "$DEPLOY_USER@$DEPLOY_HOST" "cd '$DEPLOY_PATH' && docker compose -f docker-compose.plex.yml up -d --build --remove-orphans"

echo "[3/3] Klaar"
echo "Live URL: https://www.maagverkleiningvitaminen.nl"
