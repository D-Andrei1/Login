<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {

    http_response_code(405);

    echo json_encode([
        'success' => false,
        'error' => 'Method not allowed'
    ]);

    exit;
}
if(!isset($_SESSION['user_id']) || !isset($_SESSION['account_id'])){
    echo json_encode([
        'success' => false,
        'message' => "User isnt logged in."
    ]);

    exit;
}else{
    try {
    $point_reduction = $_POST['point_reduction'];

        $stmt = $pdo->prepare("
            UPDATE loyalty_accounts
            SET points_balance = points_balance - :point_reduction
            WHERE account_id = :id;
        ");

        $stmt->execute([
            ':point_reduction' => $point_reduction,
            ':id' => $_SESSION['account_id']
        ]);

        echo json_encode([
            'success' => true,
            'message' => "Points subtracted."
        ]);

    } catch(PDOException $e){
        echo json_encode([
            'success' => false,
            'message' => "Database error" . $e
        ]);
    }
}