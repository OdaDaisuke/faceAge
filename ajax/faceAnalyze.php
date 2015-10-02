<?php
header("Content-Type: application/json; charset=utf-8");

require_once '../app/bootstrap.php';

Bootstrap::loadFile('Lib/Alchemy.php');

Alchemy::init();
$rs = Alchemy::analyze(filter_input(INPUT_POST, 'image_url'));

echo $rs;