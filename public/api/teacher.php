<?php
/**
 * ============================================================
 *  UNIVERSITÉ HORIZON — API Portail Enseignant
 *  GET  /api/teacher.php?action=students|courses|mygrades
 *  POST /api/teacher.php?action=grade   (saisie d'une note)
 *
 *  Un enseignant n'accède qu'aux formations qui lui sont affectées
 *  (table teacher_courses) et aux étudiants notes dans ces formations.
 * ============================================================
 */

require __DIR__ . '/config.php';

$action = $_GET['action'] ?? '';
$user = requireAuth('teacher');

/** Formations affectées à l'enseignant connecté. */
function teacherCourses(int $teacherId): array
{
    $stmt = db()->prepare(
        'SELECT c.id, c.title
         FROM teacher_courses tc
         JOIN courses c ON c.id = tc.course_id
         WHERE tc.teacher_id = ?
         ORDER BY c.title'
    );
    $stmt->execute([$teacherId]);
    return $stmt->fetchAll();
}

if ($action === 'courses') {
    requireMethod('GET');
    respond(200, ['ok' => true, 'courses' => teacherCourses((int) $user['id'])]);
}

if ($action === 'students') {
    requireMethod('GET');

    $courses = teacherCourses((int) $user['id']);
    if ($courses === []) {
        respond(200, ['ok' => true, 'students' => [], 'message' => 'Aucune formation ne vous est affectée.']);
    }

    $courseIds = array_column($courses, 'id');
    $placeholders = implode(',', array_fill(0, count($courseIds), '?'));

    // Étudiants ayant déjà une note dans l'une de ces formations
    $stmt = db()->prepare(
        "SELECT DISTINCT u.id, u.matricule, u.first_name, u.last_name, u.email
         FROM users u
         JOIN grades g ON g.student_id = u.id
         WHERE u.role = 'student' AND u.is_active = 1 AND g.course_id IN ($placeholders)
         ORDER BY u.last_name, u.first_name"
    );
    $stmt->execute(array_map('intval', $courseIds));
    respond(200, ['ok' => true, 'students' => $stmt->fetchAll(), 'courses' => $courses]);
}

if ($action === 'grade') {
    requireMethod('POST');

    $data     = jsonBody();
    $studentId = (int) ($data['studentId'] ?? 0);
    $label    = mb_substr(trim((string) ($data['label'] ?? '')), 0, 120);
    $valueRaw = $data['value'] ?? null;
    $maxRaw   = $data['max'] ?? 20;
    $semester = mb_substr(trim((string) ($data['semester'] ?? '')), 0, 20);
    $courseId = isset($data['courseId']) && $data['courseId'] !== '' ? (int) $data['courseId'] : null;

    if ($studentId <= 0 || $label === '' || $valueRaw === null) {
        respond(422, ['error' => 'Étudiant, intitulé et note sont requis.']);
    }
    if (!is_scalar($maxRaw) || !is_numeric($maxRaw)) {
        respond(422, ['error' => 'Barème invalide.']);
    }
    if (!is_numeric($valueRaw)) {
        respond(422, ['error' => 'La note doit être un nombre.']);
    }

    $maxValue = (float) $maxRaw;
    // Le barème est validé avant la note : sinon un barème nul ou négatif
    // produirait un message trompeur du type "entre 0 et -1".
    if ($maxValue <= 0 || $maxValue > 100) {
        respond(422, ['error' => 'Le barème doit être compris entre 1 et 100.']);
    }

    $value = (float) $valueRaw;
    if ($value < 0 || $value > $maxValue) {
        respond(422, ['error' => sprintf('La note doit être comprise entre 0 et %s.', $maxValue)]);
    }

    // La formation est obligatoire et doit être affectée à l'enseignant :
    // sans ce contrôle, tout enseignant pourrait noter n'importe quel
    // étudiant dans n'importe quelle matière.
    if ($courseId === null) {
        respond(422, ['error' => 'Sélectionnez la formation concernée.']);
    }
    $allowed = teacherCourses((int) $user['id']);
    $allowedIds = array_map('intval', array_column($allowed, 'id'));
    if (!in_array($courseId, $allowedIds, true)) {
        respond(403, ['error' => 'Cette formation ne vous est pas affectée.']);
    }

    // L'étudiant doit avoir au moins une note dans cette formation
    $check = db()->prepare(
        "SELECT DISTINCT u.id
         FROM users u
         JOIN grades g ON g.student_id = u.id
         WHERE u.id = ? AND u.role = 'student' AND g.course_id = ?
         LIMIT 1"
    );
    $check->execute([$studentId, $courseId]);
    if ($check->fetchColumn() === false) {
        respond(403, ['error' => 'Cet étudiant ne suit pas cette formation.']);
    }

    $stmt = db()->prepare(
        'INSERT INTO grades (student_id, teacher_id, course_id, label, value, max_value, semester)
         VALUES (?, ?, ?, ?, ?, ?, ?)'
    );
    $stmt->execute([$studentId, $user['id'], $courseId, $label, $value, $maxValue, $semester ?: null]);

    respond(201, ['ok' => true, 'id' => (int) db()->lastInsertId()]);
}

if ($action === 'mygrades') {
    requireMethod('GET');
    $stmt = db()->prepare(
        'SELECT g.id, g.label, g.value, g.max_value, g.semester, g.course_id,
                CONCAT(s.first_name, " ", s.last_name) AS student,
                s.matricule
         FROM grades g
         JOIN users s ON s.id = g.student_id
         WHERE g.teacher_id = ?
         ORDER BY g.created_at DESC'
    );
    $stmt->execute([$user['id']]);
    respond(200, ['ok' => true, 'grades' => $stmt->fetchAll()]);
}

respond(400, ['error' => 'Action inconnue.']);