<?php
/**
 * ============================================================
 *  UNIVERSITÉ HORIZON — Création interactive du compte admin
 *  Usage en ligne de commande :  php api/setup-admin.php
 *  (exécutez le script une seule fois, puis supprimez-le du serveur)
 * ============================================================
 */

if (PHP_SAPI !== 'cli') {
    http_response_code(403);
    exit("Ce script ne doit être exécuté qu'en ligne de commande.\n");
}

require __DIR__ . '/config.php';

function ask(string $label, string $default = ''): string
{
    $suffix = $default !== '' ? " [$default]" : '';
    echo $label . $suffix . ' : ';
    $answer = trim((string) fgets(STDIN));
    return $answer === '' ? $default : $answer;
}

echo "============================================\n";
echo " Université Horizon — Compte administrateur\n";
echo "============================================\n\n";

$email = strtolower(ask('Adresse e-mail', 'admin@universite-horizon.ml'));
if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    exit("Adresse e-mail invalide.\n");
}

$firstName = ask('Prénom', 'Administrateur');
$lastName  = ask('Nom', 'Horizon');

$password = ask('Mot de passe (10 caractères minimum, lettres + chiffres)');
if (strlen($password) < 10 || !preg_match('/[A-Za-z]/', $password) || !preg_match('/\d/', $password)) {
    exit("Mot de passe trop faible : 10 caractères minimum, avec lettres et chiffres.\n");
}

$confirm = ask('Confirmer le mot de passe');
if ($confirm !== $password) {
    exit("Les mots de passe ne correspondent pas.\n");
}

$hash = password_hash($password, PASSWORD_BCRYPT);

try {
    // Un e-mail déjà rattaché à un étudiant ou un enseignant ne doit
    // jamais être réinitialisé : cela hijackerait le compte sans créer
    // d'administrateur, tout en affichant un message de succès.
    $check = db()->prepare('SELECT id, role FROM users WHERE email = ? LIMIT 1');
    $check->execute([$email]);
    $existing = $check->fetch();

    if ($existing !== false && $existing['role'] !== 'admin') {
        exit("Refus : cette adresse appartient déjà à un compte « {$existing['role']} ».\n"
           . "Choisissez une autre adresse pour le compte administrateur.\n");
    }

    if ($existing === false) {
        $stmt = db()->prepare(
            'INSERT INTO users (role, email, password_hash, first_name, last_name)
             VALUES ("admin", ?, ?, ?, ?)'
        );
        $stmt->execute([$email, $hash, $firstName, $lastName]);
    } else {
        $stmt = db()->prepare(
            'UPDATE users
             SET password_hash = ?, first_name = ?, last_name = ?, is_active = 1
             WHERE id = ?'
        );
        $stmt->execute([$hash, $firstName, $lastName, $existing['id']]);
    }

    echo "\nCompte administrateur prêt : $email\n";
    echo "IMPORTANT : supprimez setup-admin.php du serveur.\n";
} catch (Throwable $e) {
    error_log('setup-admin: ' . $e->getMessage());
    exit("Échec de la création du compte. Vérifiez la configuration et les logs.\n");
}
