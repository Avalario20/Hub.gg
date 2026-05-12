<?php
require "session.php";

header("Content-Type: application/json");

require_once "../../core/db.php";

$data = json_decode(file_get_contents("php://input"), true);

$username = trim($data["username"] ?? "");
$password = $data["password"] ?? "";


if ($username === "" || $password === "") {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Champs manquants"
    ]);
    exit;
}

$stmt = $pdo->prepare("SELECT id, username, email, password, role FROM users WHERE username = ?");
$stmt->execute([$username]);

$user = $stmt->fetch(PDO::FETCH_ASSOC);


if (!$user) {
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "message" => "Identifiants incorrects"
    ]);
    exit;
}

if (!password_verify($password, $user["password"])) {
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "message" => "Identifiants incorrects"
    ]);
    exit;
}

$_SESSION["user"] = [
    "id" => $user["id"],
    "username" => $user["username"],
    "role" => $user["role"]
];

echo json_encode([
    "success" => true,
    "message" => "Connexion réussie",
    "user" => [
        "id" => $user["id"],
        "username" => $user["username"],
        "email" => $user["email"],
        "role" => $user["role"]
    ]
]);