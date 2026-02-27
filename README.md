# Maagverkleiningvitaminen (Plesk Static Deploy)

Actieve productiebron voor `www.maagverkleiningvitaminen.nl` staat in:

- `wls-static/`

Deze map bevat de statische WLS-vergelijkingssite (inhoud van `dutchgoose-wls.netlify.app`) en wordt direct naar Plesk gedeployed.

## Stack

- Statische HTML/CSS/JS
- GitHub Actions deploy via SSH/rsync
- Plesk hosting (dotpoint)

## Lokale preview

```bash
cd wls-static
python3 -m http.server 4080
```

Open daarna `http://localhost:4080`.

## Deploy naar Plesk

Workflow:

- `.github/workflows/deploy-plex.yml`

Trigger:

- push naar branch `codex/maagverkleiningvitaminen`
- of handmatig via `workflow_dispatch`

Benodigde GitHub Secrets:

- `MV_DEPLOY_HOST`
- `MV_DEPLOY_USER`
- `MV_DEPLOY_PORT`
- `MV_DEPLOY_PATH`
- `MV_DEPLOY_SSH_KEY`

Doelpad op server:

- `MV_DEPLOY_PATH` moet de documentroot van je domein/subdomein zijn (bijv. `httpdocs` of `httpdocs/maagverkleiningvitaminen`).
