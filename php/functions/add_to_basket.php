<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {

    http_response_code(405);

    echo json_encode([
        'success' => false,
        'error' => 'Method not allowed'
    ]);

    exit;
}
if (!isset($_SESSION['user_id'])){
    echo json_encode([
        'success' => false,
        'message' => "User isnt logged in."
    ]);
} else{
    try {
        $product_id = $_POST['product_id'];
        $quantity = $_POST['quantity'];

        $stmt = $pdo->prepare("
            INSERT INTO basket (user_id, product_id, quantity)
            VALUES (:UID, :PID, :q)
            ON DUPLICATE KEY UPDATE quantity = quantity + :q;
        ");
        $stmt->execute([
            ':UID' => $_SESSION['user_id'],
            ':PID' => $product_id,
            ':q' => $quantity
        ]);

        echo json_encode([
            'success' => true,
            'message' => "Item $product_id added to basket"
        ]);

    } catch(PDOException $e){
        echo json_encode([
            'success' => false,
            'message' => "Database error" . $e
        ]);
    }
}
