<?php
require_once '../app/bootstrap.php';

Bootstrap::loadFile('Lib/Alchemy.php');

$data = base64_decode($_POST['image_data']);

$rs = Alchemy::uploadImage($data);

if($rs) {
    echo json_encode(['image_url' => htmlspecialchars($rs, ENT_QUOTES)]);
} else {
    die(json_encode(['error' => ERROR_MSG]));
}