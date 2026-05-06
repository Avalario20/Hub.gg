<?php
require_once "../../core/db.php";

try {
    $stmt = $pdo->query("SELECT * FROM tournaments ORDER BY tournament_date ASC");
    $tournaments = $stmt->fetchAll();

     echo json_encode([
        "success" => true,
        "data" => $tournaments
    ]);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
}