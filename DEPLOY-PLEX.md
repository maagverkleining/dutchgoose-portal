# Deploy naar Plesk (statische WLS site)

Dit project deployt de statische site in `wls-static/` naar Plesk voor:

- `https://www.maagverkleiningvitaminen.nl`

## Wat wordt gedeployed

- `wls-static/index.html`
- `wls-static/public/styles.css`
- `wls-static/public/app.js`
- `wls-static/public/catalog-data.js`
- `wls-static/public/dutch-goose-logo.svg`

## GitHub Actions workflow

Bestand:

- `.github/workflows/deploy-plex.yml`

Trigger:

- push op `codex/maagverkleiningvitaminen`
- handmatig via `workflow_dispatch`

## Vereiste GitHub Secrets

- `MV_DEPLOY_METHOD` (`ssh` of `ftp`)
- `MV_DEPLOY_HOST` (bijv. `79.137.20.193`)
- `MV_DEPLOY_USER` (Plesk system user, bijv. `dutchgoo`)
- `MV_DEPLOY_PORT` (meestal `22`)
- `MV_DEPLOY_PATH` (document root, bijv. `httpdocs` of `httpdocs/maagverkleiningvitaminen`)
- `MV_DEPLOY_SSH_KEY` (private key die toegang heeft tot die user)

Voor FTP/FTPS (als SSH niet beschikbaar is):

- `MV_FTP_HOST` (bijv. Plesk FTP host)
- `MV_FTP_USER`
- `MV_FTP_PASS`
- `MV_FTP_PORT` (meestal `21`)
- `MV_FTP_PATH` (document root, vaak `httpdocs`)

## DNS

Voor productie:

- `A` record `@` -> server IP
- `A` of `CNAME` record `www` -> hoofdadres/IP

## SSL

Gebruik in Plesk een geldig certificaat (Let's Encrypt) op:

- `www.maagverkleiningvitaminen.nl`

## Handige checks

Na deploy:

1. Open `https://www.maagverkleiningvitaminen.nl`.
2. Controleer dat de titel is:
   - `De Grote Dutch Goose WLS Vitamine Vergelijking`
3. Hard refresh (`Cmd+Shift+R`) om oude cache te vermijden.
