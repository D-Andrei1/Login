<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {

    http_response_code(405);

    echo json_encode([
        'success' => false,
        'error' => 'Method not allowed'
    ]);

    exit;
}
try {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    $stmt = $pdo->prepare(
        "SELECT UserId, Password, First_name, Last_name, Username, Role FROM users WHERE Email = :email"
    );

    $stmt->execute([
        ':email' => $email
    ]);

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {

        echo json_encode([
            'success' => false,
            'error' => "Email isn't registered"
        ]);

    } elseif (!password_verify($password, $user['Password'])) {

        echo json_encode([
            'success' => false,
            'error' => "Wrong password"
        ]);

    } else {

        session_regenerate_id(true);


        $_SESSION['user_id'] = $user['UserId'];
        $_SESSION['email'] = $email;
        $_SESSION['logged_in'] = true;
        $_SESSION['first_name'] = $user['First_name'];
        $_SESSION['last_name'] = $user['Last_name'];
        $_SESSION['username'] = $user['Username'];
        $_SESSION['role'] = $user['Role'];

        // Get the loyalty account ID, if one exists
        $stmt = $pdo->prepare("
            SELECT account_id
            FROM loyalty_accounts
            WHERE UserId = :Userid
            LIMIT 1
        ");

        $stmt->execute([
            ':Userid' => $_SESSION['user_id']
        ]);

        $rewards_account_id = $stmt->fetchColumn();

        if ($rewards_account_id !== false) {
            $_SESSION['account_id'] = $rewards_account_id;
        }
        echo json_encode([
            'success' => true,
            'message' => "You logged in.",
            'role' => $_SESSION['role']
        ]);
    }

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        'success' => false,
        'error' => 'Database error'
    ]);
}