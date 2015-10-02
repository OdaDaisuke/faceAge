<?php
require_once '../app/bootstrap.php';

Bootstrap::loadFile('Lib/Alchemy.php');

$rs = Alchemy::uploadImage('画像バイナリデータ');

if($rs) {
    echo json_encode(['image_url' => htmlspecialchars('https://lh6.googleusercontent.com/-2lJYGtfXKwQ/AAAAAAAAAAI/AAAAAAAAAAA/e7HJzeltPhM/s0-c-k-no-ns/photo.jpg', ENT_QUOTES)]);
} else {
    die(json_encode(['error' => ERROR_MSG]));
}