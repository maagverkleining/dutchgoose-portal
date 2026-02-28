# Maagverkleiningvitaminen (Plesk Static Deploy)

Actieve productiebron voor `www.maagverkleiningvitaminen.nl` staat in:

- `wls-static/`

Deze map bevat de statische WLS-vergelijkingssite (inhoud van `dutchgoose-wls.netlify.app`) en wordt direct naar Plesk gedeployed.

## Stack

- Statische HTML/CSS/JS
- GitHub Actions deploy via SSH/rsync of FTP/FTPS
- Plesk hosting (dotpoint)

## Lokale preview

```bash
npm run dev
```

Open daarna `http://localhost:3002`.

Portal (oude Next.js app) lokaal openen kan nog via:

```bash
npm run dev:portal
```

Dan draait die op `http://localhost:3003`.

## Deploy naar Plesk

Workflow:

- `.github/workflows/deploy-plex.yml`

Trigger:

- push naar branch `codex/maagverkleiningvitaminen`
- of handmatig via `workflow_dispatch`

Benodigde GitHub Secrets:

- `MV_DEPLOY_METHOD` (`ssh` of `ftp`)
- `MV_DEPLOY_HOST`
- `MV_DEPLOY_USER`
- `MV_DEPLOY_PORT`
- `MV_DEPLOY_PATH`
- `MV_DEPLOY_SSH_KEY`

Optioneel voor FTP/FTPS deploy:

- `MV_FTP_HOST`
- `MV_FTP_USER`
- `MV_FTP_PASS`
- `MV_FTP_PORT`
- `MV_FTP_PATH`

Doelpad op server:

- `MV_DEPLOY_PATH` moet de documentroot van je domein/subdomein zijn (bijv. `httpdocs` of `httpdocs/maagverkleiningvitaminen`).
