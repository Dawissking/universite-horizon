# Déploiement — GitHub + Hostinger

Le site est une SPA React (Vite). Chaque `push` sur `main` déclenche un build
et un upload FTP vers l'hébergement Hostinger.

## 1. Secrets GitHub (Settings → Secrets and variables → Actions → New repository secret)

| Secret | Valeur | Où la trouver dans hPanel |
| --- | --- | --- |
| `HOSTINGER_FTP_USERNAME` | Ton utilisateur FTP | hPanel → Fichiers → Comptes FTP |
| `HOSTINGER_FTP_PASSWORD` | Mot de passe FTP | hPanel → Fichiers → Comptes FTP |
| `HOSTINGER_FTP_HOST` | `ftp.universite-horizon.ml` | hPanel → Fichiers → Comptes FTP |
| `HOSTINGER_FTP_PORT` | `21` | Valeur par défaut |

## 2. Variable GitHub (Settings → Secrets and variables → Actions → Variables)

| Variable | Valeur |
| --- | --- |
| `VITE_SITE_URL` | `https://universite-horizon.ml` |

Tant que le domaine n'est pas actif, utilise l'URL temporaire fournie par
Hostinger, par exemple `https://epic-name1234567890.hostinger.site`.
Cette variable pilote le canonical, les balises Open Graph, `robots.txt`
et `sitemap.xml`. **Un seul endroit à modifier** quand le domaine change.

## 3. Dossier cible sur Hostinger

Le workflow envoie le contenu de `dist/` à la racine FTP, qui correspond à
`public_html/`. Si ton domaine pointe vers un sous-dossier, ajuste
`FTP_DIRECTORY` dans `.github/workflows/deploy-hostinger.yml`.

## 4. Configuration serveur

`public/.htaccess` est copié dans `dist/` et s'applique automatiquement
(Hostinger utilise LiteSpeed, compatible Apache) :

- redirection SPA vers `index.html` (React Router) ;
- compression gzip ;
- en-têtes de sécurité ;
- cache long pour les assets, `index.html` jamais caché.

## 5. SSL

Active le certificat Let's Encrypt dans hPanel → Sécurité → SSL
avant de pointer le domaine, sinon le push automatique échouera sur le mixed content.

## Déploiement manuel (dépannage)

```powershell
cd "D:\BENK"
npm run build
# puis uploader le contenu de dist/ via FileZilla vers public_html/
```

## Notes

- `npm run build` exécute automatiquement `scripts/generate-seo.mjs`
  (étape `prebuild`) qui régénère `robots.txt` et `sitemap.xml`.
- `netlify.toml` a été supprimé : Netlify n'est plus utilisé.
- `vite.config.js` utilise `base: '/'`, adapté à un domaine racine.
