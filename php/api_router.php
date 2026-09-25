<?php

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if (str_starts_with($path, $basePath)) {
    $path = substr($path, strlen($basePath));
}

switch ($path) {
    case '/api/login':
        require __DIR__ . '\functions\login.php';
        break;

    case '/api/register':
        require __DIR__ . '\functions\create_account.php';
        break;
        
    case '/api/check_session':
        require __DIR__ . '\functions\check_session.php';
        break;
    
    case '/api/logout':
        require __DIR__ . '\functions\logout.php';
        break;

    default:
        http_response_code(404);

        echo json_encode([
            'success' => false,
            'error' => 'Endpoint not found'
        ]);
}