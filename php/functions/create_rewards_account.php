<?php

if (isset($_SESSION['user_id'])){
    try {
        $stmt = $pdo->prepare("
            INSERT INTO loyalty_accounts (UserId)
            SELECT :UserId
            WHERE NOT EXISTS (
                SELECT 1 FROM loyalty_accounts WHERE UserId = :UserId
            )
        ");
        $stmt->execute([
            ':UserId' => $_SESSION['user_id']
        ]);

        $stmt = $pdo->prepare("SELECT account_id FROM loyalty_accounts WHERE UserId = :UserId");
        $stmt->execute([
            ':UserId' => $_SESSION['user_id']
        ]);

        $rewards_account_id = $stmt->fetchColumn();

        echo json_encode([
            'success' => true,
            'message' => "Account created with ID $rewards_account_id"
        ]);
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage() . "\n";
    };
} else {
    echo json_encode([
        'success' => false,
        'message' => "User isnt logged in, account not created"
    ]);
};