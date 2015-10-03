<?php
require_once '../app/bootstrap.php';

Bootstrap::loadFile('Lib/Alchemy.php');

$rs = Alchemy::uploadImage(filter_input(INPUT_POST, 'image_data'));
var_dump($rs);
if($rs) {
    echo json_encode(['image_url' => htmlspecialchars($rs, ENT_QUOTES)]);
} else {
    die(json_encode(['error' => ERROR_MSG]));
}