<?php
/**
 * ============================================================
 *  UNIVERSITÉ HORIZON — Téléchargement d'une pièce justificative
 *  GET /api/document.php?id=123
 *
 *  Le dossier /uploads est en accès direct refusé par .htaccess.
 *  Ce endpoint est le seul chemin d'accès, et il contrôle
 *  que l'appelant a le droit de voir ce document :
 *    - un administrateur voit tout ;
 *    - un enseignant ne voit rien ;
 *    - un étudiant ne voit que les documents de son propre dossier.
 * ============================================================
 */

require __DIR__ . '/config.php';
requireMethod('GET');

$user = currentUser();
if ($user === null) {
    respond(401, ['error' => 'Authentification requise.']);
}

$id = (int) ($_GET['id'] ?? 0);
if ($id <= 0) {
    respond(422, ['error' => 'Identifiant de document requis.']);
}

$stmt = db()->prepare(
    'SELECT d.id, d.doc_key, d.original_name, d.stored_name, d.mime_type,
            a.id AS application_id, a.user_id, a.email, a.first_name, a.last_name
     FROM application_documents d
     JOIN applications a ON a.id = d.application_id
     WHERE d.id = ? LIMIT 1'
);
$stmt->execute([$id]);
$doc = $stmt->fetch();

if ($doc === false) {
    respond(404, ['error' => 'Document introuvable.']);
}

// --- Contrôle d'accès ---
$allowed = false;

if ($user['role'] === 'admin') {
    $allowed = true;
} elseif ($user['role'] === 'student') {
    $allowed = $doc['user_id'] !== null && (int) $doc['user_id'] === (int) $user['id'];
} elseif ($user['role'] === 'teacher') {
    $allowed = false;
}

if (!$allowed) {
    respond(403, ['error' => 'Accès refusé à ce document.']);
}

// --- Envoi du fichier ---
$path = UPLOAD_DIR . '/' . basename($doc['stored_name']);
$real = realpath($path);
$root = realpath(UPLOAD_DIR);

if ($real === false || $root === false || !str_starts_with($real, $root . DIRECTORY_SEPARATOR)) {
    respond(404, ['error' => 'Fichier indisponible.']);
}
if (!is_readable($real)) {
    respond(404, ['error' => 'Fichier indisponible.']);
}

// Nom servi proprement encodé, avec repli ASCII pour les anciens clients
$filename = preg_replace('/[\x00-\x1F\x7F]/u', '', (string) $doc['original_name']) ?: 'document';

header('Content-Type: ' . $doc['mime_type']);
header('Content-Length: ' . filesize($real));
header("Content-Disposition: attachment; filename=\"" . addcslashes($filename, '"\\') . "\"; filename*=UTF-8''" . rawurlencode($filename));
header('Cache-Control: private, no-store');
header('X-Content-Type-Options: nosniff');

readfile($real);
exit;
