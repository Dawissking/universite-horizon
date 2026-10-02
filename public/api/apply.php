<?php
/**
 * ============================================================
 *  UNIVERSITÉ HORIZON — Dépôt d'un dossier de candidature
 *  POST /api/apply.php   (multipart/form-data)
 * ============================================================
 */

require __DIR__ . '/config.php';
requireMethod('POST');

// --- Validation des champs obligatoires ---
$required = ['firstName', 'lastName', 'email'];
$payload  = $_POST;

foreach ($required as $field) {
    if (!isset($payload[$field]) || trim((string) $payload[$field]) === '') {
        respond(422, ['error' => "Le champ « $field » est obligatoire."]);
    }
}

$email = filter_var($payload['email'], FILTER_VALIDATE_EMAIL);
if ($email === false) {
    respond(422, ['error' => 'Adresse e-mail invalide.']);
}

$firstName = mb_substr(trim((string) $payload['firstName']), 0, 80);
$lastName  = mb_substr(trim((string) $payload['lastName']), 0, 80);

$optional = [
    'civility'    => 20,
    'birthDate'   => 10,
    'birthplace'  => 120,
    'nationality' => 60,
    'phone'       => 30,
    'address'     => 255,
    'lastDegree'  => 80,
    'serieBac'    => 60,
    'highSchool'  => 180,
    'motivation'  => 5000,
];

$clean = [];
foreach ($optional as $field => $maxLen) {
    $value = isset($payload[$field]) ? trim((string) $payload[$field]) : '';
    $clean[$field] = mb_substr($value, 0, $maxLen);
}

$courseId = isset($payload['courseId']) && $payload['courseId'] !== ''
    ? (int) $payload['courseId']
    : null;

// Vérifie que la formation existe si elle est fournie
if ($courseId !== null) {
    $stmt = db()->prepare('SELECT id FROM courses WHERE id = ? AND is_active = 1 LIMIT 1');
    $stmt->execute([$courseId]);
    if ($stmt->fetchColumn() === false) {
        respond(422, ['error' => 'Formation sélectionnée introuvable.']);
    }
}

// --- Contrôle anti-doublon sur la même adresse ---
$stmt = db()->prepare(
    'SELECT reference, created_at FROM applications
     WHERE email = ? AND status IN ("received","under_review")
       AND created_at > DATE_SUB(NOW(), INTERVAL 30 DAY)
     LIMIT 1'
);
$stmt->execute([$email]);
$existing = $stmt->fetch();
if ($existing) {
    // Réponse générique : ne jamais renvoyer la référence d'un dossier
    // existant, sinon connaître une adresse e-mail suffirait à obtenir
    // l'identifiant puis à consulter le dossier entier.
    respond(409, [
        'error' => 'Un dossier a déjà été déposé avec cette adresse il y a moins de 30 jours. '
                 . 'Utilisez votre identifiant de candidature pour en suivre l\'état.',
    ]);
}

// --- Contrôle du nombre de pièces reçues ---
$docKeys   = array_keys(ALLOWED_DOC_TYPES);
$documents = [];
foreach ($docKeys as $key) {
    if (isset($_FILES['documents']['name'][$key])
        && $_FILES['documents']['error'][$key] !== UPLOAD_ERR_NO_FILE) {
        $documents[$key] = [
            'name'     => $_FILES['documents']['name'][$key],
            'type'     => $_FILES['documents']['type'][$key],
            'tmp_name' => $_FILES['documents']['tmp_name'][$key],
            'error'    => $_FILES['documents']['error'][$key],
            'size'     => $_FILES['documents']['size'][$key],
        ];
    }
}

// --- Insertion du dossier ---
$pdo = db();
$pdo->beginTransaction();

try {
    // Boucle jusqu'à obtenir une référence unique (collision très improbable)
    $reference = generateReference();
    for ($attempt = 0; $attempt < 5; $attempt++) {
        $stmt = $pdo->prepare('SELECT 1 FROM applications WHERE reference = ? LIMIT 1');
        $stmt->execute([$reference]);
        if ($stmt->fetchColumn() === false) {
            break;
        }
        $reference = generateReference();
    }

    $stmt = $pdo->prepare(
        'INSERT INTO applications (
            reference, course_id, civility, first_name, last_name, birth_date,
            birthplace, nationality, phone, email, address,
            last_degree, serie_bac, high_school, motivation
         ) VALUES (
            :reference, :course_id, :civility, :first_name, :last_name, :birth_date,
            :birthplace, :nationality, :phone, :email, :address,
            :last_degree, :serie_bac, :high_school, :motivation
         )'
    );

    $stmt->execute([
        ':reference'    => $reference,
        ':course_id'    => $courseId,
        ':civility'     => $clean['civility'] !== '' ? $clean['civility'] : null,
        ':first_name'   => $firstName,
        ':last_name'    => $lastName,
        ':birth_date'   => $clean['birthDate'] !== '' ? $clean['birthDate'] : null,
        ':birthplace'   => $clean['birthplace'] !== '' ? $clean['birthplace'] : null,
        ':nationality'  => $clean['nationality'] !== '' ? $clean['nationality'] : null,
        ':phone'        => $clean['phone'] !== '' ? $clean['phone'] : null,
        ':email'        => $email,
        ':address'      => $clean['address'] !== '' ? $clean['address'] : null,
        ':last_degree'  => $clean['lastDegree'] !== '' ? $clean['lastDegree'] : null,
        ':serie_bac'    => $clean['serieBac'] !== '' ? $clean['serieBac'] : null,
        ':high_school'  => $clean['highSchool'] !== '' ? $clean['highSchool'] : null,
        ':motivation'   => $clean['motivation'] !== '' ? $clean['motivation'] : null,
    ]);

    $applicationId = (int) $pdo->lastInsertId();

    // Rattache le dossier à un compte étudiant existant lorsque l'adresse
    // e-mail correspond. Sans cela, le portail Étudiant ne pourrait pas
    // afficher les dossiers du candidat ni lui permettre de télécharger
    // ses propres pièces justificatives.
    $linkStmt = $pdo->prepare(
        'UPDATE applications SET user_id = ?
         WHERE id = ? AND user_id IS NULL AND email = ?
           AND EXISTS (SELECT 1 FROM users WHERE id = ? AND role = "student" AND is_active = 1)'
    );
    $candidateUserId = null;
    $lookup = $pdo->prepare('SELECT id FROM users WHERE email = ? AND role = "student" AND is_active = 1 LIMIT 1');
    $lookup->execute([$email]);
    $found = $lookup->fetchColumn();
    if ($found !== false) {
        $candidateUserId = (int) $found;
        $linkStmt->execute([$candidateUserId, $applicationId, $email, $candidateUserId]);
    }

    // Enregistrement des pièces justificatives
    $storedFiles = [];
    $docStmt = $pdo->prepare(
        'INSERT INTO application_documents
            (application_id, doc_key, original_name, stored_name, mime_type, size_bytes)
         VALUES (?, ?, ?, ?, ?, ?)'
    );

    foreach ($documents as $key => $file) {
        $info = storeUploadedDocument($file, $key);
        $docStmt->execute([
            $applicationId, $key,
            $info['original_name'], $info['stored_name'],
            $info['mime_type'], $info['size_bytes'],
        ]);
        $storedFiles[$key] = [
            'name' => $info['original_name'],
            'size' => $info['size_bytes'],
        ];
    }

    // Trace de l'événement initial
    $eventStmt = $pdo->prepare(
        'INSERT INTO application_events (application_id, status, note)
         VALUES (?, "received", ?)'
    );
    $eventStmt->execute([$applicationId, 'Dossier reçu']);

    $pdo->commit();

    // Les fichiers sont conservés : la candidature est enregistrée.
    commitUploads();

    respond(201, [
        'ok'         => true,
        'reference'  => $reference,
        'documents'  => $storedFiles,
        'message'    => 'Votre dossier a bien été enregistré.',
    ]);
} catch (Throwable $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    error_log('apply.php error: ' . $e->getMessage());
    respond(500, ['error' => 'Une erreur est survenue lors de l\'enregistrement du dossier.']);
}
