<?php

if (isset($_SESSION['account_id'])){
    try{
        $stmt = $pdo->prepare("
            SELECT points_balance 
            FROM loyalty_accounts 
            WHERE account_id = :account_id
        ");
        $stmt->execute([':account_id' => $_SESSION['account_id']]);

        $points_balance = $stmt->fetchColumn();

        echo json_encode([
            'success' => true,
            'points_balance' => $points_balance
        ]);
    
    } catch(PDOException $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Database error'
        ]);
    };
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Loyalty account no created.'
    ]);
}