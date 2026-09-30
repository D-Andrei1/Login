<?php

try{
    $stmt = $pdo->query("
        SELECT product_id, name, description, price, image_url, category, is_available
        FROM products
    ");
    $items = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'items' => $items
    ]);

} catch(PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => "Database error"
    ]);
}