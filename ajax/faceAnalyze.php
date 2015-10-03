<?php
// header("Content-Type: application/json; charset=utf-8");

require_once '../app/bootstrap.php';

Bootstrap::loadFile('Lib/Alchemy.php');

Alchemy::init();
$image_url = $_POST['image_url'];
$rs = Alchemy::analyze($image_url);

echo json_encode($rs);