# API PHP + MySQL — Université Horizon

Le site est une SPA React servie par Apache/LiteSpeed, accompagnée d'une API
PHP 8 et d'une base MySQL pour les candidatures et les trois portails.

## Arborescence déployée

```
public_html/
├── index.html            SPA React
├── .htaccess             redirection SPA, cache, sécurité
├── assets/               JS, CSS, images
├── api/                  endpoints PHP
│   ├── .htaccess         bloque config.php et setup-admin.php
│   ├── config.php        connexion PDO, helpers, validation
│   ├── apply.php         dépôt d'un dossier + pièces jointes
│   ├── track.php         suivi par référence + e-mail
│   ├── document.php      téléchargement protégé d'une pièce
│   ├── auth.php          login / logout / session
│   ├── student.php       portail étudiant
│   ├── teacher.php       portail enseignant
│   ├── admin.php         portail administration
│   └── contact.php       formulaire de contact
└── uploads/              pièces jointes (accès direct refusé)
    └── .htaccess         Require all denied
```

## Mise en place initiale

### 1. Base de données

hPanel → Bases de données → créer une base (ex. `u123456_horizon`) puis
Importer `database.sql` dans phpMyAdmin. Le script crée 10 tables :
`domains`, `courses`, `users`, `applications`, `application_documents`,
`application_events`, `teacher_courses`, `grades`, `contact_messages`.

### 2. Identifiants de connexion

Ouvrir `api/config.php` et renseigner les valeurs de hPanel :

```php
const DB_HOST = 'localhost';
const DB_NAME = 'u123456_horizon';
const DB_USER = 'u123456_horizon';
const DB_PASS = 'votre_mot_de_passe';
```

### 3. Compte administrateur

Le compte admin n'est pas créé par le SQL, pour ne pas versionner de hash
de mot de passe. Envoyez `api/setup-admin.php` sur le serveur, exécutez :

```bash
php api/setup-admin.php
```

Puis **supprimez `api/setup-admin.php` du serveur** — le `.htaccess` le
bloque déjà à l'accès web, mais il ne doit pas rester en place.

## Variables d'environnement

| Variable | Rôle |
| --- | --- |
| `VITE_SITE_URL` | Domaine du site (SEO, sitemap, robots) |
| `VITE_API_URL` | URL de l'API. Par défaut `/api`. À définir uniquement si l'API est sur un autre domaine |

## Points de sécurité appliqués

- Mots de passe hachés avec `password_hash()` / bcrypt, jamais en clair.
- Message d'erreur identique pour un compte inconnu et un mot de passe faux,
  ce qui empêche l'énumération des comptes.
- `session_regenerate_id(true)` à la connexion, vérification du rôle à chaque
  endpoint protégé.
- Session durcie côté application : `use_strict_mode`, `httponly`,
  `SameSite=Strict`, `secure` si HTTPS, expiration par inactivité de 30 minutes
  et revérification de `is_active` en base à chaque requête authentifiée.
- Requêtes exclusivement en PDO préparé : aucune concaténation SQL.
- Fichiers téléversés renommés aléatoirement (nom d'origine ignoré sur le
  disque), type MIME vérifié par analyse du contenu (`finfo`) et non par
  extension, images contrôlées avec `getimagesize()`, extension de stockage
  déduite du MIME réel, permissions `0600`.
- `uploads/` en `Require all denied` : les pièces ne sont accessibles que via
  `api/document.php`, qui vérifie que l'appelant a le droit de voir le
  document. L'accès direct par URL ne fonctionne pas.
- Contrôle anti-doublon : un même e-mail ne peut pas déposer un second
  dossier en cours dans les 30 jours. La réponse ne renvoie jamais la
  référence existante, sinon connaître un e-mail suffirait à consulter le
  dossier.
- Création de compte réservée à l'administrateur, avec mot de passe
  minimal (10 caractères, lettres et chiffres). `setup-admin.php` refuse de
  réinitialiser un compte qui appartient à un étudiant ou un enseignant.
- Périmètre enseignant : un enseignant ne voit et ne note que les formations
  affectées dans `teacher_courses`, et seulement les étudiants qui suivent
  ces formations. La formation est obligatoire à la saisie d'une note.
- Un dossier déposé avec une adresse e-mail correspondant à un compte étudiant
  actif est automatiquement rattaché à ce compte, ce qui donne accès au suivi
  et au téléchargement des pièces dans le portail Étudiant.
- Un fichier écrit sur le disque mais non validé est supprimé en fin de
  requête, y compris en cas d'échec sur une pièce ultérieure : aucun dossier
  ne peut être enregistré sans ses pièces, et aucune pièce ne reste orpheline.

## Réglages PHP à vérifier dans hPanel

| Directive | Valeur recommandée |
| --- | --- |
| `upload_max_filesize` | 8 Mo |
| `post_max_size` | 32 Mo |
| `max_file_uploads` | 10 |
| `max_execution_time` | 60 |

Si une pièce dépasse la limite, l'erreur est explicite côté candidat.

## Vérification rapide

1. Ouvrir `/api/auth.php?action=me` doit répondre `{"error":"Authentification requise.","user":null}` — cela prouve que PHP s'exécute et que la session démarre.
2. Si la réponse est une page HTML brute ou un 404, l'API n'est pas à la bonne racine : vérifier `FTP_DIRECTORY`.
3. Déposer un dossier de candidature depuis `/admissions` doit créer une ligne dans `applications` et un fichier dans `uploads/`.