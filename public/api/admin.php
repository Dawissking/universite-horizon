<?php
/**
 * ============================================================
 *  UNIVERSITÉ HORIZON — API Portail Administration
 *  GET  /api/admin.php?action=applications|stats|users
 *  POST /api/admin.php?action=review     (décision sur un dossier)
 *  POST /api/admin.php?action=create-user (création de compte)
 * ============================================================
 */

require __DIR__ . '/config.php';

$action = $_GET['action'] ?? '';
requireAuth('admin');

if ($action === 'applications') {
    requireMethod('GET');

    $status = trim((string) ($_GET['status'] ?? ''));
    $search = trim((string) ($_GET['search'] ?? ''));

    $sql = 'SELECT a.id, a.reference, a.first_name, a.last_name, a.email,
                   a.phone, a.status, a.created_at, c.title AS course_title
            FROM applications a
            LEFT JOIN courses c ON c.id = a.course_id';
    $where = [];
    $params = [];

    if ($status !== '' && in_array($status, ['received', 'under_review', 'accepted', 'rejected'], true)) {
        $where[] = 'a.status = ?';
        $params[] = $status;
    }
    if ($search !== '') {
        $where[] = '(a.reference LIKE ? OR a.first_name LIKE ? OR a.last_name LIKE ? OR a.email LIKE ?)';
        $like = '%' . $search . '%';
        array_push($params, $like, $like, $like, $like);
    }
    if ($where) {
        $sql .= ' WHERE ' . implode(' AND ', $where);
    }
    $sql .= ' ORDER BY a.created_at DESC LIMIT 500';

    $stmt = db()->prepare($sql);
    $stmt->execute($params);
    respond(200, ['ok' => true, 'applications' => $stmt->fetchAll()]);
}

if ($action === 'application') {
    requireMethod('GET');
    $id = (int) ($_GET['id'] ?? 0);
    if ($id <= 0) {
        respond(422, ['error' => 'Identifiant requis.']);
    }

    $stmt = db()->prepare(
        'SELECT a.*, c.title AS course_title
         FROM applications a
         LEFT JOIN courses c ON c.id = a.course_id
         WHERE a.id = ? LIMIT 1'
    );
    $stmt->execute([$id]);
    $application = $stmt->fetch();
    if ($application === false) {
        respond(404, ['error' => 'Dossier introuvable.']);
    }

    $docStmt = db()->prepare(
        'SELECT d.id, d.doc_key, d.original_name, d.mime_type, d.size_bytes, d.uploaded_at
         FROM application_documents d WHERE d.application_id = ?'
    );
    $docStmt->execute([$id]);

    respond(200, [
        'ok'         => true,
        'application'=> $application,
        'documents'  => $docStmt->fetchAll(),
    ]);
}

if ($action === 'stats') {
    requireMethod('GET');
    $stmt = db()->query(
        'SELECT status, COUNT(*) AS total FROM applications GROUP BY status'
    );
    $stats = ['received' => 0, 'under_review' => 0, 'accepted' => 0, 'rejected' => 0];
    foreach ($stmt->fetchAll() as $row) {
        $stats[$row['status']] = (int) $row['total'];
    }

    $usersStmt = db()->query(
        'SELECT role, COUNT(*) AS total FROM users WHERE is_active = 1 GROUP BY role'
    );
    $users = ['student' => 0, 'teacher' => 0, 'admin' => 0];
    foreach ($usersStmt->fetchAll() as $row) {
        $users[$row['role']] = (int) $row['total'];
    }

    respond(200, ['ok' => true, 'applications' => $stats, 'users' => $users]);
}

if ($action === 'review') {
    requireMethod('POST');

    $data    = jsonBody();
    $id      = (int) ($data['id'] ?? 0);
    $status  = (string) ($data['status'] ?? '');
    $note    = mb_substr(trim((string) ($data['note'] ?? '')), 0, 1000);
    $adminId = $user['id'];

    $allowed = ['received', 'under_review', 'accepted', 'rejected'];
    if ($id <= 0 || !in_array($status, $allowed, true)) {
        respond(422, ['error' => 'Identifiant ou statut invalide.']);
    }

    $pdo = db();
    $pdo->beginTransaction();
    try {
        $stmt = $pdo->prepare(
            'UPDATE applications
             SET status = ?, review_note = ?, reviewed_by = ?, reviewed_at = NOW()
             WHERE id = ?'
        );
        $stmt->execute([$status, $note ?: null, $adminId, $id]);
        if ($stmt->rowCount() === 0) {
            $exists = $pdo->prepare('SELECT 1 FROM applications WHERE id = ?');
            $exists->execute([$id]);
            if ($exists->fetchColumn() === false) {
                $pdo->rollBack();
                respond(404, ['error' => 'Dossier introuvable.']);
            }
        }

        $labels = [
            'received'     => 'Dossier reçu',
            'under_review' => 'Mis en examen',
            'accepted'     => 'Dossier accepté',
            'rejected'     => 'Dossier non retenu',
        ];

        $pdo->prepare(
            'INSERT INTO application_events (application_id, status, note, created_by)
             VALUES (?, ?, ?, ?)'
        )->execute([$id, $status, $note ?: ($labels[$status] ?? null), $adminId]);

        $pdo->commit();
        respond(200, ['ok' => true, 'status' => $status, 'label' => $labels[$status] ?? $status]);
    } catch (Throwable $e) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        error_log('admin review error: ' . $e->getMessage());
        respond(500, ['error' => 'Mise à jour impossible.']);
    }
}

if ($action === 'create-user') {
    requireMethod('POST');

    $data   = jsonBody();
    $role   = (string) ($data['role'] ?? '');
    $email  = strtolower(trim((string) ($data['email'] ?? '')));
    $pass   = (string) ($data['password'] ?? '');
    $first  = mb_substr(trim((string) ($data['firstName'] ?? '')), 0, 80);
    $last   = mb_substr(trim((string) ($data['lastName'] ?? '')), 0, 80);
    $matric = mb_substr(trim((string) ($data['matricule'] ?? '')), 0, 40);

    if (!in_array($role, ['student', 'teacher', 'admin'], true)) {
        respond(422, ['error' => 'Rôle invalide.']);
    }
    $email = filter_var($email, FILTER_VALIDATE_EMAIL);
    if ($email === false) {
        respond(422, ['error' => 'Adresse e-mail invalide.']);
    }
    if ($first === '' || $last === '') {
        respond(422, ['error' => 'Prénom et nom requis.']);
    }
    // 10 caractères minimum, avec au moins une lettre et un chiffre
    if (strlen($pass) < 10 || !preg_match('/[A-Za-z]/', $pass) || !preg_match('/\d/', $pass)) {
        respond(422, ['error' => 'Mot de passe : 10 caractères minimum, avec lettres et chiffres.']);
    }

    try {
        $stmt = db()->prepare(
            'INSERT INTO users (role, email, password_hash, matricule, first_name, last_name)
             VALUES (?, ?, ?, ?, ?, ?)'
        );
        $stmt->execute([
            $role, $email, password_hash($pass, PASSWORD_BCRYPT),
            $matric ?: null, $first, $last,
        ]);
        respond(201, ['ok' => true, 'id' => (int) db()->lastInsertId()]);
    } catch (PDOException $e) {
        if ($e->getCode() === '23000') {
            respond(409, ['error' => 'Cette adresse e-mail ou ce matricule existe déjà.']);
        }
        error_log('create-user error: ' . $e->getMessage());
        respond(500, ['error' => 'Création impossible.']);
    }
}

if ($action === 'users') {
    requireMethod('GET');
    $stmt = db()->query(
        'SELECT id, role, email, matricule, first_name, last_name, is_active, last_login_at, created_at
         FROM users ORDER BY role, last_name, first_name LIMIT 1000'
    );
    respond(200, ['ok' => true, 'users' => $stmt->fetchAll()]);
}

respond(400, ['error' => 'Action inconnue.']);
