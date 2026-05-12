<?php
require_once "../../core/db.php";

header('Content-Type: application/json');

try {
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (!isset($data['id'])) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "ID manquant"]);
        exit;
    }
    
    $id = $data['id'];
    $title = $data['title'] ?? null;
    $game = $data['game'] ?? null;
    $description = $data['description'] ?? null;
    $location = $data['location'] ?? null;
    $image = $data['image'] ?? null;
    
    $stmt = $pdo->prepare("UPDATE tournaments SET title = ?, game = ?, description = ?, location = ?, image = ? WHERE id = ?");
    $stmt->execute([$title, $game, $description, $location, $image, $id]);
    
    echo json_encode([
        "success" => true,
        "message" => "Tournoi mis à jour"
    ]);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "Database error: " . $e->getMessage()]);
}