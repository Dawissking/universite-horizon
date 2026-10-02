<?php
/**
 * ============================================================
 *  UNIVERSITÉ HORIZON — Authentification des portails
 *  POST /api/auth.php?action=login
 *  POST /api/auth.php?action=logout
 *  GET  /api/auth.php?action=me
 * ============================================================
 */

require __DIR__ . '/config.php';

$action = $_GET['action'] ?? '';

if ($action === 'login') {
    requireMethod('POST');
    handleLogin();
} elseif ($action === 'logout') {
    requireMethod('POST');
    handleLogout();
} elseif ($action === 'me') {
    requireMethod('GET');
    handleMe();
} else {
    respond(400, ['error' => 'Action inconnue.']);
}

function handleLogin(): never
{
    $data    = jsonBody();
    $email   = strtolower(trim((string) ($data['email'] ?? '')));
    $password = (string) ($data['password'] ?? '');

    if ($email === '' || $password === '') {
        respond(422, ['error' => 'E-mail et mot de passe requis.']);
    }

    $email = filter_var($email, FILTER_VALIDATE_EMAIL);
    if ($email === false) {
        respond(422, ['error' => 'Adresse e-mail invalide.']);
    }

    $stmt = db()->prepare(
        'SELECT id, role, email, matricule, first_name, last_name,
                password_hash, is_active
         FROM users WHERE email = ? LIMIT 1'
    );
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    // Message identique que l'utilisateur n'existe pas ou le mot de passe
    // est faux : évite d'énumérer les comptes existants.
    if ($user === false
        || !password_verify($password, $user['password_hash'])
        || (int) $user['is_active'] !== 1) {
        usleep(400000);
        respond(401, ['error' => 'Identifiants incorrects.']);
    }

    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    session_regenerate_id(true);

    $db = db();
    $db->prepare('UPDATE users SET last_login_at = NOW() WHERE id = ?')->execute([$user['id']]);

    $_SESSION['user'] = [
        'id'         => (int) $user['id'],
        'role'       => $user['role'],
        'email'      => $user['email'],
        'matricule'  => $user['matricule'],
        'firstName'  => $user['first_name'],
        'lastName'   => $user['last_name'],
    ];

    respond(200, ['ok' => true, 'user' => $_SESSION['user']]);
}

function handleLogout(): never
{
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $p = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $p['path'], $p['domain'], $p['secure'], $p['httponly']);
    }
    session_destroy();
    respond(200, ['ok' => true]);
}

function handleMe(): never
{
    $user = currentUser();
    if ($user === null) {
        respond(401, ['error' => 'Non authentifié.', 'user' => null]);
    }
    respond(200, ['ok' => true, 'user' => $user]);
}
