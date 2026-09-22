<?php

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {

    http_response_code(405);

    echo json_encode([
        'success' => false,
        'error' => 'Method not allowed'
    ]);

    exit;
}

/*
 * Remove everything stored in the session.
 */
$_SESSION = [];

/*
 * Remove PHP's session cookie from the browser.
 */
if (ini_get('session.use_cookies')) {

    $params = session_get_cookie_params();

    setcookie(
        session_name(),
        '',
        [
            'expires' => time() - 42000,
            'path' => $params['path'],
            'domain' => $params['domain'],
            'secure' => $params['secure'],
            'httponly' => $params['httponly'],
            'samesite' => 'Lax'
        ]
    );
}

/*
 * Delete session data on the server.
 */
session_destroy();

echo json_encode([
    'success' => true,
    'message' => 'Logged out successfully'
]);