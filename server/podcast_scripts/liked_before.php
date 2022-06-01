<?php
/*  
    
    
    Script URL:
	https://startechies.000webhostapp.com/server/podcast_scripts/liked_before.php
	
	
	Parameters that must be sent in the url request:
	- Parameter named 'user_id' which is the unique id of the user being checked.
	- Parameter named 'podcast_id' which is the unique id of the podcast being checked.
	

    
    What the file does?
    - Returns string "liked" if the like instance exists.
    - Returns string "not_liked" if the like instance does not exist
    
    
*/

require_once '../db_config.php';


$user_id = $_REQUEST['user_id'];
$podcast_id = $_REQUEST['podcast_id'];




//Check whether an instance of like exists for this user and this podcast
$queryDoesLikeExist = "SELECT * FROM ST_PodcastLikes WHERE Podcast_ID=? && EndUser_ID=?;";
$prepStateDoesLikeExist = mysqli_stmt_init($link);
mysqli_stmt_prepare($prepStateDoesLikeExist,$queryDoesLikeExist);
mysqli_stmt_bind_param($prepStateDoesLikeExist, "ii", $podcast_id,$user_id);
mysqli_stmt_execute($prepStateDoesLikeExist);
$resultSetDoesLikeExist = mysqli_stmt_get_result($prepStateDoesLikeExist);

//Check to see if result set is empty, this would imply that the like instance does not exist.
if(mysqli_num_rows($resultSetDoesLikeExist)==0){
	echo "not_liked";
}
else{
    //Like instance does exist
    echo "liked";
}


?>