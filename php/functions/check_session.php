<?php

if (isset($_SESSION['user_id'])){
    if (isset($_SESSION['account_id'])){
        echo json_encode([
            'user_id' => $_SESSION['user_id'],
            'logged_in' => $_SESSION['logged_in'],
            'username' => $_SESSION['username'],
            'account_id' => $_SESSION['account_id']
        ]);
    } else {
        echo json_encode([
            'user_id' => $_SESSION['user_id'],
            'logged_in' => $_SESSION['logged_in'],
            'username' => $_SESSION['username'],
    ]);
    }

} else {
    echo json_encode([
        'logged_in' => false
    ]);
}

