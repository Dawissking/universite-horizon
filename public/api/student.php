<?php
/**
 * ============================================================
 *  UNIVERSITÉ HORIZON — API Portail Étudiant
 *  GET /api/student.php?action=grades|timetable|documents
 *  Toutes les actions exigent une session avec le rôle "student".
 * ============================================================
 */

require __DIR__ . '/config.php';
requireMethod('GET');

$user = requireAuth('student');
$action = $_GET['action'] ?? 'grades';

if ($action === 'grades') {
    $stmt = db()->prepare(
        'SELECT g.label, g.value, g.max_value, g.semester, g.created_at,
                c.title AS course_title, CONCAT(u.first_name, " ", u.last_name) AS teacher
         FROM grades g
         LEFT JOIN courses c ON c.id = g.course_id
         LEFT JOIN users u ON u.id = g.teacher_id
         WHERE g.student_id = ?
         ORDER BY g.created_at DESC'
    );
    $stmt->execute([$user['id']]);

    $grades = [];
    $totalWeighted = 0.0;
    $totalMax = 0.0;

    foreach ($stmt->fetchAll() as $row) {
        $ratio = $row['max_value'] > 0 ? ($row['value'] / $row['max_value']) * 20 : 0;
        $totalWeighted += (float) $row['value'];
        $totalMax += (float) $row['max_value'];
        $grades[] = [
            'label'       => $row['label'],
            'course'      => $row['course_title'],
            'teacher'     => $row['teacher'],
            'value'       => (float) $row['value'],
            'max'         => (float) $row['max_value'],
            'onTwenty'    => round($ratio, 2),
            'semester'    => $row['semester'],
            'createdAt'   => $row['created_at'],
        ];
    }

    $average = $totalMax > 0 ? round(($totalWeighted / $totalMax) * 20, 2) : null;

    respond(200, ['ok' => true, 'grades' => $grades, 'average' => $average]);
}

if ($action === 'documents') {
    // Un étudiant ne voit que ses propres dossiers de candidature
    $stmt = db()->prepare(
        'SELECT a.reference, a.status, a.created_at, c.title AS course_title
         FROM applications a
         LEFT JOIN courses c ON c.id = a.course_id
         WHERE a.user_id = ?
         ORDER BY a.created_at DESC'
    );
    $stmt->execute([$user['id']]);
    respond(200, ['ok' => true, 'applications' => $stmt->fetchAll()]);
}

if ($action === 'application') {
    $reference = trim((string) ($_GET['reference'] ?? ''));
    if ($reference === '') {
        respond(422, ['error' => 'Référence requise.']);
    }
    $stmt = db()->prepare(
        'SELECT id FROM applications WHERE reference = ? AND user_id = ? LIMIT 1'
    );
    $stmt->execute([$reference, $user['id']]);
    $applicationId = $stmt->fetchColumn();
    if ($applicationId === false) {
        respond(404, ['error' => 'Dossier introuvable.']);
    }

    $docStmt = db()->prepare(
        'SELECT doc_key, original_name, size_bytes, uploaded_at
         FROM application_documents WHERE application_id = ?'
    );
    $docStmt->execute([$applicationId]);
    respond(200, ['ok' => true, 'documents' => $docStmt->fetchAll()]);
}

respond(400, ['error' => 'Action inconnue.']);
