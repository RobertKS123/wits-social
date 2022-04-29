<?php

/*  
    
    What the file does?
    
    - Outputs a json object as follows: {"login":x, "user_id":y}
    - If the login is invalid, then x = invalid_login and y = not_defined
    - If the login is valid, then x = valid_login and y will be the unique user id.
    - The purpose of returning the unique user id on a successful login is for its use in other parts
      of the application.
    
    
    
*/
    
require_once '../db_config.php';


    
//Start:
$email = $_REQUEST['email'];
$password = $_REQUEST['password'];

//Does End User exist in database
//Template to see if user exists
$query ="SELECT * FROM ST_EndUsers WHERE EndUser_Email = ?";

//Create prepared statement:
$prepState = mysqli_stmt_init($link);
	
//Prepare the prepared statement:
mysqli_stmt_prepare($prepState,$query);
	
//Bind parameters to prepared statement:
mysqli_stmt_bind_param($prepState, "s", $email);
	
//Execute prepared statement:
mysqli_stmt_execute($prepState);

//Get query resultset:
//Basically converts $prepState to a result set:
$doesUserExistResultSet = mysqli_stmt_get_result($prepState);

//Check to see if result set is empty, this would imply user doesnt exist.
if(mysqli_num_rows($doesUserExistResultSet)==0){
	//User does not exist in database
	$response_data = array('login' => "invalid_login", 'user_id' => "not_defined");
	
	//Only commented out for sprint 1
	echo json_encode($response_data);
	
	
	
	
}
else{
    //User does exist and we see if he is using correct password
    //Get users real password:
	$prepState_realPassword = mysqli_stmt_init($link);
	$queryRealPassword = "SELECT EndUser_Password FROM ST_EndUsers WHERE EndUser_Email = ?";
	mysqli_stmt_prepare($prepState_realPassword,$queryRealPassword);
	mysqli_stmt_bind_param($prepState_realPassword, "s", $email);
	mysqli_stmt_execute($prepState_realPassword);
	$result_set = mysqli_stmt_get_result($prepState_realPassword);
	
	
	
	//Fetch store hashed password
	while ($row = mysqli_fetch_assoc($result_set)){
			$realHashedPassword = $row["EndUser_Password"];
	}
	
	//Finally, if the given password matches the database password, user logs in:
	
	
	if(password_verify($password,$realHashedPassword)){
	    //Fetch users's unique id for cookie purposes and echo it:
	    $prepState_userID = mysqli_stmt_init($link);
        $queryUserID = "SELECT EndUser_ID FROM ST_EndUsers WHERE EndUser_Email = ?";
	    mysqli_stmt_prepare($prepState_userID,$queryUserID);
	    mysqli_stmt_bind_param($prepState_userID, "s", $email);
	    mysqli_stmt_execute($prepState_userID);
	    $result_setUserID = mysqli_stmt_get_result($prepState_userID);
	
	    while ($row = mysqli_fetch_assoc($result_setUserID)){
			 $user_unique_id = $row["EndUser_ID"];
	    }
	    $response_data = array('login' => "valid_login", 'user_id' => $user_unique_id);
	    
	    //Only commented out for sprint 1
	    echo json_encode($response_data);
	    
	    
	    
	}
	else{
	    //Invalid login
	    $response_data = array('login' => "invalid_login", 'user_id' => "not_defined");
	    
	    //Only commented out for sprint 1
	    echo json_encode($response_data);
	    
	   
	}
	
}



    
?>