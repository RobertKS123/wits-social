<?php

/*  
    Script URL:
	https://startechies.000webhostapp.com/server/direct_messaging/search_username.php
	
	
	Parameters that must be sent in the url request:
	- Parameter called "username_wildcard" which will be a substring contained in some username that the logged in user will search for.
	- Parmater called "logged_in_user_id" which is the unique id of the logged in user - It will be used to return all user info for the logged in user.
    
    What the file does?
    - Outputs a response in the following format:
        {logged_in_user_info:{},wildcard_matches:[{},{},...]}
    - The response is ONE JSON object with two keys:
    - First key is 'logged_in_user_info' and its value is another JSON object with info of the logged in user
    - Second key is 'wildcard_matches' and its value can be one of two things:
            i)  An integer 301 indicating that there were no wildcard matches
            ii) A JSON array of user information for all users whose usernames match the wildcard.
    
    
*/
    
require_once '../db_config.php';


    
//Start:
 $username_wildcard = $_REQUEST['username_wildcard'];
 $logged_in_user_id = $_REQUEST['logged_in_user_id'];
 
 //Define response data

	
    $Array_LoggedInUserInfo = [];
	$Array_WildcardMatches = [];
	
	
	$response_data = array('logged_in_user_info' => $Array_LoggedInUserInfo, 'wildcard_matches' => $Array_WildcardMatches);
	
	//First get currently logged in user information
	
	$query_logged_in_UserInfo = "SELECT * FROM ST_EndUsers WHERE EndUser_ID=?;";
    $prepState_logged_in_UserInfo = mysqli_stmt_init($link);
    mysqli_stmt_prepare($prepState_logged_in_UserInfo,$query_logged_in_UserInfo);
    mysqli_stmt_bind_param($prepState_logged_in_UserInfo, "i", $logged_in_user_id);
    mysqli_stmt_execute($prepState_logged_in_UserInfo);
    $LoggedInUserResultSet = mysqli_stmt_get_result($prepState_logged_in_UserInfo);
    
    
	while ($row = $LoggedInUserResultSet->fetch_assoc()){
		
		$Array_LoggedInUserInfo[] = $row;
	}
		
	//Add user info to response array
	$response_data['logged_in_user_info'] = $Array_LoggedInUserInfo[0];
	
	//TESTING
	//echo json_encode($Array_LoggedInUserInfo[0]);
	//echo json_encode($response_data);
	//TESTING
	
	
	//Now find wildcard matches

    $wildcardPlaceholder = "%".$username_wildcard."%";
	$query_wildcard_matches = "SELECT * FROM ST_EndUsers WHERE EndUser_Username LIKE ?;";
    $prepState_wildcard_matches = mysqli_stmt_init($link);
    mysqli_stmt_prepare($prepState_wildcard_matches,$query_wildcard_matches);
    mysqli_stmt_bind_param($prepState_wildcard_matches, "s", $wildcardPlaceholder);
    mysqli_stmt_execute($prepState_wildcard_matches);
    $wildcardMatchesResultSet = mysqli_stmt_get_result($prepState_wildcard_matches);
    
    
    while ($row = $wildcardMatchesResultSet->fetch_assoc()){
		
		$Array_WildcardMatches[] = $row;
	}
	
    //TESTING
    // 	echo json_encode($Array_WildcardMatches);
    // 	echo "Size of array of matches: ".sizeof($Array_WildcardMatches);
    //TESTING

    //Add wildcard response to response array:
    if(sizeof($Array_WildcardMatches)==0){
        //No wildcard matches found
        $response_data['wildcard_matches']=301;
    }
    else{
        //There are wildcard matches
        $response_data['wildcard_matches'] = $Array_WildcardMatches;
    }
    
    //Output response data
    echo json_encode($response_data);

?>