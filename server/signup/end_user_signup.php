<?php

    
/*  
    
    Script URL:
	https://startechies.000webhostapp.com/server/signup/end_user_signup.php
	
	
	Parameters that must be sent in the url request:
	
	- A parameter with name "email" which the user supplies on registration.
	- A parameter with name "pwd" which the user supplies on registration.
	- A parameter with name "username" which the user supplies on registration.
    
    
    
    What the file does?
    
    - Outputs a JSON object in the following format: {"email_availability":x,"username_availability":y,"user_unique_id":z,"registration_outcome":a}
    - If the email is not available, then x = "not_available". If the email is available, then x = "available"
    - If the username is not available, then y = "not_available". If the username is available, then y = "available"
    - Registration is a success if a = "success". Registration is a failure if a = "failure"
    - If the registration is a failure, then z = "not_defined". If the registration is a success, then z will return the user unique id for use somewhere else in application
    - Last Note: The registration is only successful if both x and y are available.
    
    
    What the file does? (Revised for Robert) - "not_available" will be replaced by number 301 and "available" will be replaced by number 300. "success" will be replaced by number 520 and "failure" will be replaced by number 521
    
    - Outputs a JSON object in the following format: {"email_availability":x,"username_availability":y,"user_unique_id":z,"registration_outcome":a}
    - If the email is not available, then x = 301. If the email is available, then x = 300
    - If the username is not available, then y = 301. If the username is available, then y = 300
    - Registration is a success if a = 520. Registration is a failure if a = 521
    - If the registration is a failure, then z = "not_defined". If the registration is a success, then z will return the user unique id for use somewhere else in application
    - Last Note: The registration is only successful if both x and y are available.
    
    
    
*/

	require_once '../db_config.php';
	
	//First define response data:
	//Change to numbers for Robert
	$email_availability = 0;
	$username_availability = 0;
	$user_unique_id = 0;
	$registrationOutcome = 0;
	
	$response_data = array('email_availability' => $email_availability, 'username_availability' => $username_availability, 'user_unique_id' => $user_unique_id, 'registration_outcome' => $registrationOutcome);
	
	
	
	//$first_name = $_REQUEST['first_name'];
	//$last_name = $_REQUEST['last_name'];
	
	$emailRaw = $_REQUEST['email'];
	$password = $_REQUEST['pwd'];
	$usernameRaw = $_REQUEST['username'];
	
	
	//Convert email and username to all caps for standard format in DB:
	$email = strtoupper($emailRaw);
	$username = strtoupper($usernameRaw);
	
	//Check email availability
	
	//Template:
	$query_doesEmailExist = "SELECT * FROM ST_EndUsers WHERE EndUser_Email = ?";
	
	//Prepared Statement:
	$prepState_doesEmailExist = mysqli_stmt_init($link);
	
	//Prepare the prepared statement:
	mysqli_stmt_prepare($prepState_doesEmailExist,$query_doesEmailExist);
	
	//Bind parameters to prepared statement:
	mysqli_stmt_bind_param($prepState_doesEmailExist, "s", $email);
	
	//Execute prepared statement:
	mysqli_stmt_execute($prepState_doesEmailExist);
	
	//Get query resultset:
	$doesEmailExistResultSet = mysqli_stmt_get_result($prepState_doesEmailExist);
	
	
	//If the desired email was found in user table, its not available:
	if (mysqli_num_rows($doesEmailExistResultSet) > 0 ){
		//$email_availability = 'not_available';
		$response_data['email_availability'] = 301;
		
		
	}
	else{
	    //Email available
	    //$email_availability = 'available';
	    $response_data['email_availability'] = 300;
	    
	}
	
	///////////////////////////
	
	//Check username availability:
	//Template:
	$query_doesUsernameExist = "SELECT * FROM ST_EndUsers WHERE EndUser_Username = ?";
	
	//Prepared Statement:
	$prepState_doesUsernameExist = mysqli_stmt_init($link);
	
	//Prepare the prepared statement:
	mysqli_stmt_prepare($prepState_doesUsernameExist,$query_doesUsernameExist);
	
	//Bind parameters to prepared statement:
	mysqli_stmt_bind_param($prepState_doesUsernameExist, "s", $username);
	
	//Execute prepared statement:
	mysqli_stmt_execute($prepState_doesUsernameExist);
	
	//Get query resultset:
	$doesUsernameExistResultSet = mysqli_stmt_get_result($prepState_doesUsernameExist);
	
	
	//If the desired username was found in user table, its not available:
	if (mysqli_num_rows($doesUsernameExistResultSet) > 0 ){
		//$username_availability = 'not_available';
		$response_data['username_availability'] = 301;
		
	}
	else{
	    //The username is available
	    //$username_availability = 'available';
	    $response_data['username_availability'] = 300;
	}
	///////////////////////////////////////
	
	
	
	
	
	//Now we register if both email and username are available and dont register if at least one of the two is unavailable
	if($response_data['username_availability'] == 301 || $response_data['email_availability'] == 301){
	    //$user_unique_id = 'not_defined';
	    $response_data['user_unique_id'] = "not_defined";
	    //$registrationOutcome = 'failure';
	    $response_data['registration_outcome'] = 521;
	    
	}
	else{
	    //Both username and email are available
	    
	    
	    //Insert user details:
	    $query_insert = "INSERT INTO ST_EndUsers(EndUser_Email,EndUser_Password,EndUser_Username,EndUser_ProfilePicLink,EndUser_BannerLink) VALUES(?,?,?,?,?);";
	    $hashed_password_to_insert = password_hash($password, PASSWORD_DEFAULT);
		$prepState_detailsInsertion = mysqli_stmt_init($link);
		mysqli_stmt_prepare($prepState_detailsInsertion,$query_insert);
		$default_profile_pic = "https://startechies.000webhostapp.com/end_users/profile_pictures/default_profilePic/defaultprofilepic.jpg";
		$default_user_banner = "https://startechies.000webhostapp.com/end_users/banners/default_userBanner/defaultbanner.jpg";
		mysqli_stmt_bind_param($prepState_detailsInsertion, "sssss", $email, $hashed_password_to_insert, $username,$default_profile_pic,$default_user_banner );
		mysqli_stmt_execute($prepState_detailsInsertion);
		
		//Registration is success:
		//$registrationOutcome = 'success';
		$response_data['registration_outcome'] = 520;
		
		//Get user auto generated unique id for use in the application
		
	    $query_fetchUserID = "SELECT EndUser_ID FROM ST_EndUsers WHERE EndUser_Username=?";
	    $prepStateUserID = mysqli_stmt_init($link);
	    mysqli_stmt_prepare($prepStateUserID,$query_fetchUserID);
	    mysqli_stmt_bind_param($prepStateUserID, "s", $username);
	    mysqli_stmt_execute($prepStateUserID);
	    $resultSetUserID = mysqli_stmt_get_result($prepStateUserID);
	
	    while ($row = mysqli_fetch_assoc($resultSetUserID)){
	    		$UserID = $row["EndUser_ID"];
	    		
			
	    }
	    //$user_unique_id = $UserID;
	    $response_data['user_unique_id'] = $UserID;
	    
	}
	
	//Output result set
	
	//Only commented out for sprint 1
	echo json_encode($response_data);
	//echo $response_data['registration_outcome'];
	 
	 
?>
