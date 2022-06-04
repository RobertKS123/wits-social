<?php

    
/*  
    
    Script URL:
	https://startechies.000webhostapp.com/server/direct_messaging/insert_direct_message.php
	
	
	Parameters that must be sent in the url request:
	- Parameter called "sender_user_id" which is the id of the user sending the message
	- Parameter called "recipient_user_id" which is the id of the user receiving the message
	
    What the file does?
    - Accepts above parmaters and outputs the last inserted message. ie. The one that is being inserted in this file
    - File outputs 301 integer if something went wrong or parameters not received
    
    
*/

	require_once '../db_config.php';
	
	
	

	$sender_user_id = $_REQUEST['sender_user_id'];
	$recipient_user_id = $_REQUEST['recipient_user_id'];
	$message_body = $_REQUEST['message_body'];
	
	
	
	    //Set timezone to South Africa
        date_default_timezone_set('Africa/Johannesburg');

        //Get current date and time
        $theDate = new DateTime();

        //Convert current date/time to string
        $stringDate = $theDate->format('Y-m-d H:i:s');

        //Define message insert query
        $insertQuery = "INSERT INTO ST_DirectMessages(Sender_UserID,Receiver_UserID,
        Message_TimeSent,Message_Body) VALUES(?,?,?,?);";

        //Define prepeared statement
        $prepState = mysqli_stmt_init($link);
        mysqli_stmt_prepare($prepState,$insertQuery);

        //Bind parameters to prepared statement
        mysqli_stmt_bind_param($prepState, "iiss", $sender_user_id,$recipient_user_id,$stringDate,$message_body);

        //Execute
        mysqli_stmt_execute($prepState);
    
        //Get last inserted id - for DirectMessages table
        $last_id = mysqli_insert_id($link);
        //echo "New record created successfully. Last inserted ID is: " . $last_id;
        
        //This block must insert record into DMExist table if no such record  exists for the two users communicating and must not insert anything into the DMExist table if the two have communicated before.
        
        //1. First check if a record exists in DMExist table
        $query_communicatedBefore = "SELECT * FROM ST_DMExists WHERE (User_One_ID=? AND User_Two_ID=?) OR (User_One_ID=? AND User_Two_ID=?);";
        $prepState_communicatedBefore = mysqli_stmt_init($link);
        mysqli_stmt_prepare($prepState_communicatedBefore,$query_communicatedBefore);
        mysqli_stmt_bind_param($prepState_communicatedBefore, "iiii", $sender_user_id,$recipient_user_id,$recipient_user_id,$sender_user_id);
        mysqli_stmt_execute($prepState_communicatedBefore);
        $communicatedBeforeResultSet = mysqli_stmt_get_result($prepState_communicatedBefore);
        if(mysqli_num_rows($communicatedBeforeResultSet)==0){
            //They have not communicated before, therefore add a record of them to DMExists table
            $query_insertCommunicatedBefore = "INSERT INTO ST_DMExists(User_One_ID,User_Two_ID) VALUES(?,?);";
            $prepState_insertCommunicatedBefore = mysqli_stmt_init($link);
            mysqli_stmt_prepare($prepState_insertCommunicatedBefore,$query_insertCommunicatedBefore);
            mysqli_stmt_bind_param($prepState_insertCommunicatedBefore, "ii", $sender_user_id,$recipient_user_id);
            mysqli_stmt_execute($prepState_insertCommunicatedBefore);
        }
        else{
            //They have communicated before, therefore DONT add record of this to DMExists table
            //ie. Do nothing
        }
        

        //Return last inserted record
        $query_lastRecord = "SELECT * FROM ST_DirectMessages WHERE Direct_Message_ID=?;";
        $prepState_lastRecord = mysqli_stmt_init($link);
        mysqli_stmt_prepare($prepState_lastRecord,$query_lastRecord);
        mysqli_stmt_bind_param($prepState_lastRecord, "i", $last_id);
        mysqli_stmt_execute($prepState_lastRecord);
        $lastRecordResultSet = mysqli_stmt_get_result($prepState_lastRecord);

   
    		
        $output = array();
        while ($row = $lastRecordResultSet->fetch_assoc()){
        	$output[]=$row;
        }
    		
        echo json_encode($output);
	
	
	
    
    

	
	
?>