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
    
    $stmt = $pdo->prepare("DELETE FROM tournaments WHERE id = ?");
    $stmt->execute([$id]);
    
    echo json_encode([
        "success" => true,
        "message" => "Tournoi supprimé"
    ]);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "Database error: " . $e->getMessage()]);
}