<?php

//This file must be required_once in all php files that need to access the database
header('Access-Control-Allow-Origin: *');

//Details hidden because of pub;ic github repo
$username = "hidden";
$password = "hidden";
$database = "hidden";

$link = mysqli_connect("localhost", $username, $password, $database);
if ($link->connect_error) {
    die("Connection failed: " . $link->connect_error);
}

?>