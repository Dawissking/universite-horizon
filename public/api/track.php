<?php
/**
 * ============================================================
 *  UNIVERSITÉ HORIZON — Suivi d'un dossier par sa référence
 *  GET /api/track.php?reference=HZ-2026-ABC123&email=...
 * ============================================================
 */

require __DIR__ . '/config.php';
requireMethod('GET');

$reference = trim((string) ($_GET['reference'] ?? ''));
$email     = trim((string) ($_GET['email'] ?? ''));

if ($reference === '' || $email === '') {
    respond(422, ['error' => 'Référence et e-mail requis.']);
}

$email = filter_var($email, FILTER_VALIDATE_EMAIL);
if ($email === false) {
    respond(422, ['error' => 'Adresse e-mail invalide.']);
}

// Limitation du débit par session : 20 consultations par minute.
// Le couple référence + e-mail étant déjà secret, ce garde-fou vise
// uniquement à empêcher le balayage automatisé massif.
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
$now = time();
$windowStart = $now - 60;
$attempts = array_filter(
    $_SESSION['hz_track_attempts'] ?? [],
    static fn ($ts) => $ts > $windowStart
);
if (count($attempts) >= 20) {
    respond(429, ['error' => 'Trop de consultations. Patientez une minute avant de réessayer.']);
}
$attempts[] = $now;
$_SESSION['hz_track_attempts'] = $attempts;

$stmt = db()->prepare(
    'SELECT a.id, a.reference, a.first_name, a.last_name, a.status, a.created_at,
            a.updated_at, a.review_note, c.title AS course_title
     FROM applications a
     LEFT JOIN courses c ON c.id = a.course_id
     WHERE a.reference = ? AND a.email = ?
     LIMIT 1'
);
$stmt->execute([$reference, $email]);
$application = $stmt->fetch();

if ($application === false) {
    // Message volontairement identique à celui d'un dossier en attente
    // pour ne pas révéler l'existence d'une autre adresse e-mail.
    respond(404, ['error' => 'Aucun dossier ne correspond à cette référence et cet e-mail.']);
}

$docStmt = db()->prepare(
    'SELECT doc_key, original_name, size_bytes, uploaded_at
     FROM application_documents WHERE application_id = ? ORDER BY doc_key'
);
$docStmt->execute([$application['id']]);
$documents = [];
foreach ($docStmt->fetchAll() as $doc) {
    $documents[] = [
        'key'         => $doc['doc_key'],
        'label'       => ALLOWED_DOC_TYPES[$doc['doc_key']]['label'] ?? $doc['doc_key'],
        'name'        => $doc['original_name'],
        'size'        => (int) $doc['size_bytes'],
        'uploaded_at' => $doc['uploaded_at'],
    ];
}

$eventStmt = db()->prepare(
    'SELECT status, note, created_at
     FROM application_events WHERE application_id = ? ORDER BY created_at ASC, id ASC'
);
$eventStmt->execute([$application['id']]);
$events = $eventStmt->fetchAll();

$statusLabels = [
    'received'    => 'Dossier reçu',
    'under_review'=> 'En cours d\'examen',
    'accepted'    => 'Dossier accepté',
    'rejected'    => 'Dossier non retenu',
];

respond(200, [
    'ok'    => true,
    'dossier' => [
        'reference'     => $application['reference'],
        'firstName'     => $application['first_name'],
        'lastName'      => $application['last_name'],
        'course'        => $application['course_title'],
        'status'        => $application['status'],
        'statusLabel'   => $statusLabels[$application['status']] ?? $application['status'],
        'note'          => $application['review_note'],
        'createdAt'     => $application['created_at'],
        'updatedAt'     => $application['updated_at'],
        'documents'     => $documents,
        'timeline'      => $events,
    ],
]);
