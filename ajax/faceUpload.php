<?php
require_once '../app/bootstrap.php';

Bootstrap::loadFile('Lib/Alchemy.php');

$key = filter_input(INPUT_POST, 'key');
if($key != 'ojsafdiwea645wear64wea') die('error');

$data = base64_decode($_POST['image_data']);
$rs = Alchemy::uploadImage($data);

if($rs) {
    echo json_encode(['image_url' => htmlspecialchars($rs, ENT_QUOTES)]);
} else {
    die(json_encode(['error' => ERROR_MSG]));
}