<?php
require_once "../../core/db.php";

header("Content-Type: application/json");

// Récupérer les données JSON
$data = json_decode(file_get_contents("php://input"), true);

$email = $data["email"] ?? "";
$username = $data["username"] ?? "";
$password = $data["password"] ?? "";

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

if (empty($email) || empty($username) || empty($password)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Email, nom d'utilisateur et mot de passe obligatoires"
    ]);
    exit;
}

try {
    // Vérifier si l'utilisateur existe déjà
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email OR username = :username");
    $stmt->execute([
        ":email" => $email,
        ":username" => $username
    ]);
    $existingUser = $stmt->fetch();

    if ($existingUser) {
        http_response_code(409);
        echo json_encode([
            "success" => false,
            "message" => "Cet email ou ce nom d'utilisateur est déjà utilisé"
        ]);
        exit;
    }

    // Insérer le nouvel utilisateur
    $stmt = $pdo->prepare("INSERT INTO users (email, username, password) VALUES (:email, :username, :password)");
    $stmt->execute([
        ":email" => $email,
        ":username" => $username,
        ":password" => $hashedPassword
    ]);

    // Récupérer l'ID de l'utilisateur créé
    $userId = $pdo->lastInsertId();

    echo json_encode([
        "success" => true,
        "message" => "Compte créé avec succès",
        "user" => [
            "id" => $userId,
            "email" => $email,
            "username" => $username
        ]
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Erreur base de données: " . $e->getMessage()
    ]);
}
