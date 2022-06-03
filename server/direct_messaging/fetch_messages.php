<?php

    
/*  
    
    Script URL:
	https://startechies.000webhostapp.com/server/direct_messaging/fetch_messages.php
	
	
	Parameters that must be sent in the url request:
	- Parameter with name "logged_in_user_id" which is the user id of the currently logged in user.
	- Parmater with name "chatting_with_id" which is the user id of the other user whom we are looking for chats with.
	
    What the file does?
    - Returns integer 301 if no messages between the 2 users exist.
    - Returns JSON array of messages between the two users if messages between them exist. 
    
*/

	require_once '../db_config.php';
	
	//Declaring variables to use
    
    $logged_in_user_id = $_REQUEST['logged_in_user_id'];
    $chatting_with_id = $_REQUEST['chatting_with_id'];
    
    $query_MESSAGES = "SELECT * FROM ST_DirectMessages WHERE (Sender_UserID=? OR Sender_UserID=?) && (Receiver_UserID=? OR Receiver_UserID=?);";
    
    //Initialize prepared statement
    $prepState_MESSAGES = mysqli_stmt_init($link);

    //Pass SQL query to prepare the prepared statement
    mysqli_stmt_prepare($prepState_MESSAGES, $query_MESSAGES);

    //Bind parameters to prepared statement
    mysqli_stmt_bind_param($prepState_MESSAGES, "iiii", $logged_in_user_id, $chatting_with_id,$logged_in_user_id, $chatting_with_id);

    //Execute prepared statement
    mysqli_stmt_execute($prepState_MESSAGES);

    //Get result set
    $messageResultSet = mysqli_stmt_get_result($prepState_MESSAGES);
    
    if (mysqli_num_rows($messageResultSet)==0){
		//No messages between these two users:
		echo 301;
    }
    else{
		//Some set was returned:
		
		$output = array();
		while ($row = $messageResultSet->fetch_assoc()){
			$output[]=$row;
        }
		
		echo json_encode($output);
    }
	
	
	
	   
?>