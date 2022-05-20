<?php
/*  
    
    
    Script URL:
	https://startechies.000webhostapp.com/server/podcast_scripts/like_unlike_podcast.php
	
	
	Parameters that must be sent in the url request:
	- Parameter named 'user_id' which is the unique id of the user thats either liking or unliking
	- Parameter named 'podcast_id' which is the unique id of the podcast that the user is either liking or unliking
	

    
    What the file does?
    - This file takes in the users id and the podcasts id.
    - If the user has not liked this podcast, then an instance of (this user id with this podcast id) will be inserted into the podcast likes table and the amount of likes
      for this podcast in the podcast table will increment by 1.
    - If the user has already liked this podcast, then the existing instance of (this user id with this podcast id) will be deleted from the podcast likes table and the amount of likes
      for this podcast in the podcast table will decrement by 1.
      
     What the file outputs? (ie. the response)
     - A JSON object in the following format:
        {like_response:x,podcast_no_likes:y}
    - If x is true, then the podcast was just liked and its number of likes was incremented by 1.
    - If x is false, then the podcast was just unliked and its number of likes was decremented by 1.
    - y just gives an update on the number of likes of the podcast that this script deals with
    
*/

require_once '../db_config.php';

//First define response data:

$likeResponse = true;
$noLikesPodcast = 0;

	
$response_data = array('like_response' => $likeResponse, 'podcast_no_likes' => $noLikesPodcast);

$user_id = $_REQUEST['user_id'];
$podcast_id = $_REQUEST['podcast_id'];

//Define variable that defines whether the request is an 'addLike' or 'removeLike'
$like = "";


//First check whether the user is intending to like or unlike the podcast
$queryDoesLikeExist = "SELECT * FROM ST_PodcastLikes WHERE Podcast_ID=? && EndUser_ID=?;";
$prepStateDoesLikeExist = mysqli_stmt_init($link);
mysqli_stmt_prepare($prepStateDoesLikeExist,$queryDoesLikeExist);
mysqli_stmt_bind_param($prepStateDoesLikeExist, "ii", $podcast_id,$user_id);
mysqli_stmt_execute($prepStateDoesLikeExist);
$resultSetDoesLikeExist = mysqli_stmt_get_result($prepStateDoesLikeExist);

//Check to see if result set is empty, this would imply the user wants to like and not unlike.
if(mysqli_num_rows($resultSetDoesLikeExist)==0){
	//User wants to add like and not remove their like
	$like = "addLike";
}
else{
    //User wants to remove their like
    $like = "removeLike";
}

//Now we add/remove like:
if($like=="addLike"){
    //1. Insert record of user id and podcast id in podcast likes table + 2. increment podcast likes by 1 in podcast table + 3. Return the response
    
    //1.
    
    $query_insert = "INSERT INTO ST_PodcastLikes(Podcast_ID,EndUser_ID) 
     VALUES(?,?);";
    
    $prepStateInsertion = mysqli_stmt_init($link);
    mysqli_stmt_prepare($prepStateInsertion,$query_insert);
    mysqli_stmt_bind_param($prepStateInsertion, "ii", $podcast_id, $user_id);
    mysqli_stmt_execute($prepStateInsertion);
    
    //2.
    
    $query_increment = "UPDATE ST_Podcasts SET Podcast_Likes = Podcast_Likes + 1 WHERE Podcast_ID=?;"; 
    
    
    $prepStateIncrement = mysqli_stmt_init($link);
    mysqli_stmt_prepare($prepStateIncrement,$query_increment);
    mysqli_stmt_bind_param($prepStateIncrement, "i", $podcast_id);
    mysqli_stmt_execute($prepStateIncrement);
    
    //3.
    
    $query_getLikes = "SELECT Podcast_Likes FROM ST_Podcasts WHERE Podcast_ID=?;";
    $prepStategetLikes = mysqli_stmt_init($link);
    mysqli_stmt_prepare($prepStategetLikes,$query_getLikes);
    mysqli_stmt_bind_param($prepStategetLikes, "i", $podcast_id);
    mysqli_stmt_execute($prepStategetLikes);
    $getLikesResultSet = mysqli_stmt_get_result($prepStategetLikes);
    while ($row = mysqli_fetch_assoc($getLikesResultSet)){
	    $noLikesPodcast = $row["Podcast_Likes"];
	}
	$response_data['podcast_no_likes'] = $noLikesPodcast;
	$response_data['like_response'] = true;
    
    
}
else if($like=="removeLike"){
    //1. Delete record of user id and podcast id in podcast likes table + 2. decrement podcast likes by 1 in podcast table + 3. Return the response
    
    //1.
    
    $query_delete = "DELETE FROM ST_PodcastLikes WHERE Podcast_ID=? && EndUser_ID=?;";
    
    $prepStateDeletion = mysqli_stmt_init($link);
    mysqli_stmt_prepare($prepStateDeletion,$query_delete);
    mysqli_stmt_bind_param($prepStateDeletion, "ii", $podcast_id, $user_id);
    mysqli_stmt_execute($prepStateDeletion);
    
    //2.
    
    $query_decrement = "UPDATE ST_Podcasts SET Podcast_Likes = Podcast_Likes - 1 WHERE Podcast_ID=?;"; 
    
    
    $prepStateDecrement = mysqli_stmt_init($link);
    mysqli_stmt_prepare($prepStateDecrement,$query_decrement);
    mysqli_stmt_bind_param($prepStateDecrement, "i", $podcast_id);
    mysqli_stmt_execute($prepStateDecrement);
    
    //3.
    
    $query_getLikes = "SELECT Podcast_Likes FROM ST_Podcasts WHERE Podcast_ID=?;";
    $prepStategetLikes = mysqli_stmt_init($link);
    mysqli_stmt_prepare($prepStategetLikes,$query_getLikes);
    mysqli_stmt_bind_param($prepStategetLikes, "i", $podcast_id);
    mysqli_stmt_execute($prepStategetLikes);
    $getLikesResultSet = mysqli_stmt_get_result($prepStategetLikes);
    while ($row = mysqli_fetch_assoc($getLikesResultSet)){
	    $noLikesPodcast = $row["Podcast_Likes"];
	}
	$response_data['podcast_no_likes'] = $noLikesPodcast;
	$response_data['like_response'] = false;
}
else{
    //Something went wrong, do nothing
    echo "Something went wrong";
}

echo json_encode($response_data);


?>