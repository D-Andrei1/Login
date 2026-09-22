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