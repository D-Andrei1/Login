<?php

if (isset($_SESSION['user_id'])){
    echo json_encode([
        'user_id' => $_SESSION['user_id'],
        'logged_in' => $_SESSION['logged_in'],
    ]);
} else {
    echo json_encode([
        'logged_in' => false
    ]);
}

