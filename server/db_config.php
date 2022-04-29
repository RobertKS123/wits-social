<?php

//This file must be required_once in all php files that need to access the database

$username = "id18696689_startechies45907de34kh28";
$password = "f_ia5F3<fZ*[}LV>";
$database = "id18696689_startechies2347vgh3";

$link = mysqli_connect("localhost", $username, $password, $database);
if ($link->connect_error) {
    die("Connection failed: " . $link->connect_error);
}

?>