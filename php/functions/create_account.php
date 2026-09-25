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
    $email = $_POST['email'];
    $password = $_POST['password'];
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $username = $_POST['username'];

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $pdo->prepare("SELECT 1 FROM Users WHERE Email = :email LIMIT 1");
    $stmt->execute([':email' => $email]);
    $exists = $stmt->fetchColumn() !== false;

    if ($exists) {
        echo json_encode([
            'success' => false,
            'error' => "Email already registered"
            ]);
    } else {
        $stmt = $pdo->prepare("INSERT INTO users (Email, Password, First_name, Last_name, Username) VALUES (:email, :password, :first_name, :last_name, :username)");
        $stmt->execute([
            ':email' => $email,
            ':password' => $hashed_password,
            ':first_name' => $first_name,
            ':last_name' => $last_name,
            ':username' => $username
            ]);

        $stmt = $pdo->prepare("SELECT UserId FROM Users WHERE Email = :email");
        $stmt->execute([':email' => $email]);

        $customerId = $stmt->fetchColumn();

        echo json_encode([
            'success' => true,
            'message' => "Account created with ID $customerId"
            ]);
    };
// Catches errors and sends a response
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
}