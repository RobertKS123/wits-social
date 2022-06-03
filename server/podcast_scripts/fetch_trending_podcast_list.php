<?php


/*  
    Script URL:
	https://startechies.000webhostapp.com/server/podcast_scripts/fetch_trending_podcast_list.php
	
	
	Parameters that must be sent in the url request:
	- No parameters are needed with this request 
	

    
    What the file does?
    - This file simply outputs an array of JSON objects, where each object is all info for a specific podcast.
    - If there are no podcasts on the server, this file just outputs a string "no_podcasts". But for our case, there should be podcasts.
    - This file orders podcasts from most liked to least liked.
    
    
*/


    
require_once '../db_config.php';

$query_podcasts = "SELECT * FROM ST_Podcasts, ST_EndUsers WHERE ST_Podcasts.EndUser_ID=ST_EndUsers.EndUser_ID ORDER BY Podcast_Likes DESC;";
$prepState_podcasts = mysqli_stmt_init($link);
mysqli_stmt_prepare($prepState_podcasts,$query_podcasts);
//mysqli_stmt_bind_param($prepState_orders, "s", $username);
mysqli_stmt_execute($prepState_podcasts);
$podcastsResultSet = mysqli_stmt_get_result($prepState_podcasts);

if (mysqli_num_rows($podcastsResultSet)==0){
		//No podcasts in database:
		echo "no_podcasts";
}
else{
		//Some set was returned:
		
		$output = array();
		while ($row = $podcastsResultSet->fetch_assoc()){
			$output[]=$row;
        }
		
		echo json_encode($output);
}
    

?>