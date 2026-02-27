# Migratie van Netlify naar Plex (met behoud functionaliteit)

Dit project draait nu platform-onafhankelijk via Next.js + Docker.

## Wat is aangepast

- Click logging draait niet meer via Netlify Function (`/.netlify/functions/log-click`), maar via:
  - `POST /api/log-click`
- Click logs worden opgeslagen in `CLICK_LOG_DIR` (default `/tmp/dutchgoose-logs`).
- Docker deployment toegevoegd met persistente log volume.

## Vereisten op je Plex server

- Docker
- Docker Compose plugin
- Reverse proxy (Nginx Proxy Manager / Caddy / Traefik) voor HTTPS + domein

## Stap 1: project naar server kopieren

Voorbeeld map op server:

- `/opt/dutchgoose-wls`

## Stap 2: env vars zetten

Maak in projectroot een `.env` met:

```env
SMTP_HOST=smtp.jouwdomein.nl
SMTP_PORT=587
SMTP_USER=jouw-user
SMTP_PASS=jouw-pass
SMTP_FROM=no-reply@jouwdomein.nl
CONTACT_FORM_TO=info@dutchgoose.nl
NEXT_PUBLIC_SITE_URL=https://www.maagverkleiningvitaminen.nl
```

## Stap 3: build + start

```bash
cd /opt/dutchgoose-wls
docker compose -f docker-compose.plex.yml up -d --build
```

App draait daarna op:

- `http://SERVER-IP:3000`

## Stap 4: reverse proxy koppelen

Koppel je domein/subdomein naar de app:

- target: `http://127.0.0.1:3000`

Aanrader:

- force HTTPS
- HSTS aan

## Domein setup: `www` en non-`www`

Doel:

- `https://www.maagverkleiningvitaminen.nl` = hoofdadres (canonical)
- `https://maagverkleiningvitaminen.nl` = 301 redirect naar `www`

### DNS records

Bij je DNS provider:

- `A` record:
  - host: `@`
  - value: publieke IP van je Plex server
- `CNAME` record:
  - host: `www`
  - value: `maagverkleiningvitaminen.nl`

Als je provider geen `CNAME` op `www` wil gebruiken, zet ook voor `www` een `A` record naar dezelfde server-IP.

### Reverse proxy (Nginx Proxy Manager voorbeeld)

1. Proxy Host voor `www.maagverkleiningvitaminen.nl`
   - Forward host: `127.0.0.1`
   - Forward port: `3000`
   - SSL: Let's Encrypt, Force SSL aan
2. Redirect Host voor `maagverkleiningvitaminen.nl`
   - Scheme: `https`
   - Forward hostname: `www.maagverkleiningvitaminen.nl`
   - HTTP code: `301`

## Beheercommando's

```bash
# status
docker compose -f docker-compose.plex.yml ps

# logs
docker compose -f docker-compose.plex.yml logs -f

# restart
docker compose -f docker-compose.plex.yml restart

# stop
docker compose -f docker-compose.plex.yml down
```

## Automatisch deployen vanuit deze repo

### Optie 1: GitHub Actions (aanrader)

Voeg in GitHub repository secrets toe:

- `MV_DEPLOY_HOST` (bijv. `79.137.20.193`)
- `MV_DEPLOY_USER` (ssh user op je server)
- `MV_DEPLOY_PORT` (meestal `22`)
- `MV_DEPLOY_PATH` (bijv. `/opt/dutchgoose-wls`)
- `MV_DEPLOY_SSH_KEY` (private key met toegang tot die user)

Workflow bestand:

- `.github/workflows/deploy-plex.yml`

Gedrag:

- deploy bij push op `codex/maagverkleiningvitaminen`
- ook handmatig te starten via `workflow_dispatch`

### Optie 2: Lokaal vanuit deze map

Script:

- `scripts/deploy-plex.sh`

Voorbeeld:

```bash
DEPLOY_HOST=79.137.20.193 \
DEPLOY_USER=YOUR_USER \
DEPLOY_PATH=/opt/dutchgoose-wls \
./scripts/deploy-plex.sh
```

## Data en behoud functionaliteit

- Contactform blijft werken via `/api/contact` (SMTP vereist).
- Affiliate click logging blijft werken via `/go/[slug] -> /api/log-click`.
- Logs blijven bewaard in hostmap:
  - `./runtime/click-logs/clicks.ndjson`

## Migratie van Netlify URL naar Plex URL

- Update DNS naar je nieuwe domein/proxy.
- Test routes:
  - `/`
  - `/deals`
  - `/go/<slug>`
  - `/contact`
