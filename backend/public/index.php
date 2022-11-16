<?php 
//header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
//die(json_encode('teste'));
session_start();
require_once __DIR__ . '/../vendor/autoload.php';

/**
 * Die and dump
 */
function dd($value) {
    var_dump($value);
    die();
}

use Main\App;

$app = new App();

$app->init();