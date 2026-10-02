<?php
/**
 * ============================================================
 *  UNIVERSITÉ HORIZON — API PHP
 *  Configuration, connexion MySQL et utilitaires partagés
 * ============================================================
 */

// --- Mode d'erreur : aucune sortie parasite avant le JSON ---
declare(strict_types=1);
error_reporting(E_ALL);
ini_set('display_errors', '0');
ini_set('log_errors', '1');

// --- Configuration principale ---
// Remplacez ces valeurs par celles de hPanel > Bases de données
const DB_HOST = 'localhost';
const DB_NAME = 'uXXXXXX_horizon';
const DB_USER = 'uXXXXXX_horizon';
const DB_PASS = 'VOTRE_MOT_DE_PASSE';
const DB_CHARSET = 'utf8mb4';

// Correspond à base: 'public_html' sur hPanel
const UPLOAD_DIR = __DIR__ . '/../uploads';
const UPLOAD_PUBLIC_PATH = '/uploads';

// Types et tailles acceptés pour les pièces justificatives
const ALLOWED_DOC_TYPES = [
    'diploma'  => ['label' => 'Attestation du Baccalauréat ou dernier diplôme', 'max' => 5 * 1024 * 1024],
    'birthCert'=> ['label' => "Copie de l'Extrait d'Acte de Naissance",         'max' => 5 * 1024 * 1024],
    'idCard'   => ['label' => "Copie de la Pièce d'Identité ou Passeport",        'max' => 5 * 1024 * 1024],
    'photo'    => ['label' => "Photo d'identité récente (fond blanc)",            'max' => 2 * 1024 * 1024],
];

const ALLOWED_MIME = [
    'application/pdf' => 'pdf',
    'image/jpeg'      => 'jpg',
    'image/jpg'       => 'jpg',
    'image/png'       => 'png',
];

// --- En-têtes de réponse ---
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: strict-origin-when-cross-origin');

// --- Durcissement de la session ---
// Ces valeurs sont forcées côté application car elles dépendent sinon
// entièrement du php.ini de l'hébergeur.
@ini_set('session.use_strict_mode', '1');
@ini_set('session.use_only_cookies', '1');
@ini_set('session.cookie_httponly', '1');
@ini_set('session.cookie_samesite', 'Strict');
@ini_set('session.cookie_secure', !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' ? '1' : '0');
@ini_set('session.gc_maxlifetime', '1800');

/**
 * Toute exception non rattrapée doit produire une réponse JSON exploitable
 * par le client, jamais une page d'erreur HTML de l'hébergeur qui
 * exposerait un chemin ou une bannière serveur.
 */
set_exception_handler(static function (Throwable $e): void {
    error_log('Unhandled: ' . $e->getMessage() . ' @ ' . $e->getFile() . ':' . $e->getLine());
    if (!headers_sent()) {
        http_response_code(500);
        header('Content-Type: application/json; charset=utf-8');
    }
    echo json_encode(
        ['error' => 'Une erreur technique est survenue. Réessayez ou contactez la scolarité.'],
        JSON_UNESCAPED_UNICODE
    );
});

/**
 * Connexion PDO à la base de données.
 */
function db(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $dsn = sprintf('mysql:host=%s;dbname=%s;charset=%s', DB_HOST, DB_NAME, DB_CHARSET);
    try {
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]);
    } catch (PDOException $e) {
        error_log('DB connection failed: ' . $e->getMessage());
        respond(500, ['error' => 'Service temporairement indisponible.']);
    }

    return $pdo;
}

/**
 * Répond en JSON et termine le script.
 */
function respond(int $status, array $payload): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/**
 * Lit le corps JSON de la requête.
 */
function jsonBody(): array
{
    $raw = file_get_contents('php://input') ?: '';
    if ($raw === '') {
        return [];
    }
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

/**
 * Vérifie la méthode HTTP attendue.
 */
function requireMethod(string $method): void
{
    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== $method) {
        header('Allow: ' . $method);
        respond(405, ['error' => 'Méthode non autorisée.']);
    }
}

/**
 * Génère une référence de dossier lisible et unique.
 * Format : HZ-2026-A1B2C3
 */
function generateReference(): string
{
    $alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    $suffix = '';
    for ($i = 0; $i < 6; $i++) {
        $suffix .= $alphabet[random_int(0, strlen($alphabet) - 1)];
    }
    return 'HZ-' . date('Y') . '-' . $suffix;
}

/**
 * Retourne l'utilisateur de la session courante, ou null.
 */
function currentUser(): ?array
{
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    $user = $_SESSION['user'] ?? null;
    if ($user === null) {
        return null;
    }

    // Expiration par inactivité (30 minutes)
    $last = $_SESSION['hz_last_activity'] ?? 0;
    if ($last > 0 && (time() - $last) > 1800) {
        $_SESSION = [];
        return null;
    }

    // Le compte peut avoir été désactivé après l'ouverture de session :
    // on revérifie en base plutôt que de faire confiance à la session.
    try {
        $stmt = db()->prepare('SELECT is_active FROM users WHERE id = ? LIMIT 1');
        $stmt->execute([$user['id']]);
        $row = $stmt->fetch();
    } catch (Throwable $e) {
        error_log('session revalidation failed: ' . $e->getMessage());
        return null;
    }

    if ($row === false || (int) $row['is_active'] !== 1) {
        $_SESSION = [];
        return null;
    }

    $_SESSION['hz_last_activity'] = time();
    return $user;
}

/**
 * Exige une authentification et (optionnellement) un rôle précis.
 */
function requireAuth(?string $role = null): array
{
    $user = currentUser();
    if ($user === null) {
        respond(401, ['error' => 'Authentification requise.']);
    }
    if ($role !== null && $user['role'] !== $role) {
        respond(403, ['error' => 'Accès refusé.']);
    }
    return $user;
}

/**
 * Enregistre un fichier déjà écrit sur le disque pour nettoyage automatique.
 *
 * Tant que commitUploads() n'a pas été appelé, le fichier est supprimé en fin
 * de requête, y compris si le script se termine par respond() (donc par exit).
 * Cela évite de laisser des pièces orphelines quand une pièce sur plusieurs
 * est rejetée après les précédentes.
 */
$GLOBALS['hz_pending_uploads'] = [];

function trackUpload(string $storedName): void
{
    $GLOBALS['hz_pending_uploads'][] = UPLOAD_DIR . '/' . $storedName;
}

function commitUploads(): void
{
    $GLOBALS['hz_pending_uploads'] = [];
}

register_shutdown_function(static function (): void {
    foreach ($GLOBALS['hz_pending_uploads'] as $path) {
        if (is_file($path)) {
            @unlink($path);
        }
    }
});

/**
 * Valide un téléversement de fichier et le déplace en stockage privé.
 *
 * Le nom de fichier est généré aléatoirement : le nom d'origine n'est
 * jamais utilisé sur le disque, ce qui neutralise la traversée de
 * répertoire et les collisions.
 */
function storeUploadedDocument(array $file, string $docKey): array
{
    if (!isset(ALLOWED_DOC_TYPES[$docKey])) {
        respond(400, ['error' => 'Type de document non reconnu.']);
    }

    if (!isset($file['error']) || is_array($file['error'])) {
        respond(400, ['error' => 'Données de fichier invalides.']);
    }

    switch ($file['error']) {
        case UPLOAD_ERR_OK:
            break;
        case UPLOAD_ERR_NO_FILE:
            respond(400, ['error' => 'Aucun fichier reçu.']);
        case UPLOAD_ERR_INI_SIZE:
        case UPLOAD_ERR_FORM_SIZE:
            respond(413, ['error' => 'Fichier trop volumineux.']);
        case UPLOAD_ERR_PARTIAL:
            respond(400, ['error' => 'Téléversement incomplet, réessayez.']);
        case UPLOAD_ERR_NO_TMP_DIR:
        case UPLOAD_ERR_CANT_WRITE:
            respond(500, ['error' => 'Erreur serveur lors de l\'écriture.']);
        default:
            respond(400, ['error' => 'Téléversement refusé.']);
    }

    $max = ALLOWED_DOC_TYPES[$docKey]['max'];
    if ($file['size'] > $max) {
        respond(413, ['error' => sprintf('Fichier trop volumineux (max %d Mo).', intdiv($max, 1024 * 1024))]);
    }
    if ($file['size'] === 0) {
        respond(400, ['error' => 'Fichier vide.']);
    }

    // Vérification du type réel par contenu, pas par extension
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mime = $finfo->file($file['tmp_name']);
    if (!isset(ALLOWED_MIME[$mime])) {
        respond(415, ['error' => 'Format non accepté. Utilisez PDF, JPEG ou PNG.']);
    }

    // Contrôle qu'il s'agit bien d'une image (pour les formats image)
    if (str_starts_with($mime, 'image/') && @getimagesize($file['tmp_name']) === false) {
        respond(415, ['error' => 'Fichier image corrompu ou invalide.']);
    }

    if (!is_dir(UPLOAD_DIR) && !mkdir(UPLOAD_DIR, 0755, true) && !is_dir(UPLOAD_DIR)) {
        error_log('Cannot create upload dir: ' . UPLOAD_DIR);
        respond(500, ['error' => 'Stockage indisponible.']);
    }

    // L'extension suit le type MIME réellement détecté, jamais celui
    // annoncé par le client ni celui du nom d'origine.
    $extension = ALLOWED_MIME[$mime];
    $storedName = bin2hex(random_bytes(16)) . '.' . $extension;
    $destination = UPLOAD_DIR . '/' . $storedName;

    // Enregistré AVANT le déplacement : ainsi, même un arrêt brutal du
    // script laisse la suppression de secours s'exécuter au shutdown.
    trackUpload($storedName);

    if (!move_uploaded_file($file['tmp_name'], $destination)) {
        error_log('move_uploaded_file failed for ' . $file['tmp_name']);
        respond(500, ['error' => 'Enregistrement du fichier impossible.']);
    }
    // 0600 : les pièces d'identité ne doivent pas être lisibles par
    // d'autres comptes PHP de l'hébergement mutualisé.
    chmod($destination, 0600);

    return [
        'original_name' => mb_substr(basename((string) $file['name']), 0, 255),
        'stored_name'   => $storedName,
        'mime_type'     => $mime,
        'size_bytes'    => (int) $file['size'],
    ];
}
