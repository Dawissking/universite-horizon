<?php
/**
 * ============================================================
 *  UNIVERSITÉ HORIZON — Réception des messages de contact
 *  POST /api/contact.php
 * ============================================================
 */

require __DIR__ . '/config.php';
requireMethod('POST');

$data    = jsonBody();
$name    = mb_substr(trim((string) ($data['name'] ?? '')), 0, 120);
$email   = strtolower(trim((string) ($data['email'] ?? '')));
$phone   = mb_substr(trim((string) ($data['phone'] ?? '')), 0, 30);
$subject = mb_substr(trim((string) ($data['subject'] ?? '')), 0, 180);
$message = mb_substr(trim((string) ($data['message'] ?? '')), 0, 5000);

if ($name === '' || $message === '') {
    respond(422, ['error' => 'Nom et message requis.']);
}
$email = filter_var($email, FILTER_VALIDATE_EMAIL);
if ($email === false) {
    respond(422, ['error' => 'Adresse e-mail invalide.']);
}

$stmt = db()->prepare(
    'INSERT INTO contact_messages (name, email, phone, subject, message)
     VALUES (?, ?, ?, ?, ?)'
);
$stmt->execute([$name, $email, $phone ?: null, $subject ?: null, $message]);

respond(201, ['ok' => true, 'message' => 'Votre message a bien été transmis.']);
