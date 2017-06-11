<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    $conn = new mysqli("localhost", "nguser", "ngpwd001", "angularJSdb");
    $conn->set_charset("utf8");	

?>

