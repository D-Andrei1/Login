<?php

require_once __DIR__ . '/config/bootstrap.php';

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$basePath = '/website/php';

if (str_starts_with($path, $basePath)) {
    $path = substr($path, strlen($basePath));
}

if (str_starts_with($path, '/api/')) {
    require __DIR__ . '/index.php';
    exit;
}

http_response_code(404);

header('Content-Type: application/json');
echo json_encode([
    'error' => 'Not found'
]);