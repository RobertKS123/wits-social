<?php

/*
    URL:
    https://startechies.000webhostapp.com/server/direct_messaging/get_user_info.php
    
    Parameter:
    - Receives one parameter named "user_id" and returns JSON array with one object only, this object contains all
      user info associated with the user
*/
require_once '../db_config.php';

$user_id = $_REQUEST['user_id'];

$query_user_info = "SELECT * FROM ST_EndUsers WHERE EndUser_ID=?;";
$prepState_user_info = mysqli_stmt_init($link);
mysqli_stmt_prepare($prepState_user_info,$query_user_info);
mysqli_stmt_bind_param($prepState_user_info, "i", $user_id);
mysqli_stmt_execute($prepState_user_info);
$user_infoResultSet = mysqli_stmt_get_result($prepState_user_info);
	
	
if (mysqli_num_rows($user_infoResultSet)==0){
	//No comments on the podcast:
	echo 301;
}
else{
	//Some set was returned:
		
	$output = array();
	while ($row = $user_infoResultSet->fetch_assoc()){
		$output[]=$row;
	}
		
	echo json_encode($output);
}

?>