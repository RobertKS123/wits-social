<?php

    
/*  
    
    Script URL:
	https://startechies.000webhostapp.com/server/direct_messaging/inbox.php
	
	
	Parameters that must be sent in the url request:
	- Parmater called "logged_in_UserID" which is the unique id of the logged in user.
	
    What the file does?
    - Outputs a response in the following format:
        {logged_in_user_info:{},inbox_user_info:[{},{},...]}
    - The response is ONE JSON object with two keys:
    - First key is 'logged_in_user_info' and its value is another JSON object with info of the logged in user
    - Second key is 'inbox_user_info' and its value can be one of two things:
            i)  An integer 301 indicating that the logged in user has no DM histories.
            ii) A JSON array of user information for all users who the logged in user has a chat history with.
    
    
*/

	require_once '../db_config.php';
	
	$logged_in_UserID = $_REQUEST['logged_in_UserID'];
	
	//Define response data

    $Array_LoggedInUserInfo = [];
	$Array_InboxUsersInfo = [];
	
	$response_data = array('logged_in_user_info' => $Array_LoggedInUserInfo, 'inbox_user_info' => $Array_InboxUsersInfo);
	
	//First get currently logged in user information
	
	$query_logged_in_UserInfo = "SELECT * FROM ST_EndUsers WHERE EndUser_ID=?;";
    $prepState_logged_in_UserInfo = mysqli_stmt_init($link);
    mysqli_stmt_prepare($prepState_logged_in_UserInfo,$query_logged_in_UserInfo);
    mysqli_stmt_bind_param($prepState_logged_in_UserInfo, "i", $logged_in_UserID);
    mysqli_stmt_execute($prepState_logged_in_UserInfo);
    $LoggedInUserResultSet = mysqli_stmt_get_result($prepState_logged_in_UserInfo);
    
    
	while ($row = $LoggedInUserResultSet->fetch_assoc()){
		
		$Array_LoggedInUserInfo[] = $row;
	}
		
	//Add user info to response array
	$response_data['logged_in_user_info'] = $Array_LoggedInUserInfo[0];
	
	//Now get list of user info for all distinct users who have chatted with the logged in user
	
	$query_inbox = "SELECT * FROM ST_EndUsers,ST_DMExists WHERE (ST_DMExists.User_One_ID=ST_EndUsers.EndUser_ID AND ST_DMExists.User_Two_ID=?) OR 
	(ST_DMExists.User_Two_ID=ST_EndUsers.EndUser_ID AND ST_DMExists.User_One_ID=?);";
    $prepState_inbox = mysqli_stmt_init($link);
    mysqli_stmt_prepare($prepState_inbox,$query_inbox);
    mysqli_stmt_bind_param($prepState_inbox, "ii",$logged_in_UserID,$logged_in_UserID );
    mysqli_stmt_execute($prepState_inbox);
    $Inbox_ResultSet = mysqli_stmt_get_result($prepState_inbox);
    
    
    while ($row = $Inbox_ResultSet->fetch_assoc()){
		
		$Array_InboxUsersInfo[] = $row;
	}
	
    //echo json_encode($Array_InboxUsersInfo);
    
    //Add inbox response to response array:
    if(sizeof($Array_InboxUsersInfo)==0){
        //Logged in user has no direct messages with anyone
        $response_data['inbox_user_info']=301;
    }
    else{
        //Logged in user has got existing DM histories
        $response_data['inbox_user_info'] = $Array_InboxUsersInfo;
    }
    
    echo json_encode($response_data);
	
	

?>