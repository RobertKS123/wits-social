<?php

/*
    Script URL:
	https://startechies.000webhostapp.com/server/podcast_scripts/fetch_podcast_comments.php
	
	
	Parameters that must be sent in the url request:
	- A parameter with name 'podcast_id' must be sent. 
	

    
    What the file does?
    - This file simply outputs an array of JSON objects, where each object is all info for a specific comment.
    - If there are no comments on the server for the particular podcast, this file just outputs a string "no_comments". Frontend must account for the possinility that this file returns "no_comments"
    
    Note:
    - I made the file so that the JSON array gives the comments from newest to oldest. ie. The first item (object) in the JSON array is the newest comment and the last item in the JSON array is the oldest comment.

*/
require_once '../db_config.php';

$podcast_id = $_REQUEST['podcast_id'];

$query_COMMENTS = "SELECT * FROM ST_PodcastComments, ST_EndUsers WHERE ST_PodcastComments.EndUser_ID=ST_EndUsers.EndUser_ID AND ST_PodcastComments.Podcast_ID=? ORDER BY Comment_TimePosted DESC;";
$prepState_COMMENTS = mysqli_stmt_init($link);
mysqli_stmt_prepare($prepState_COMMENTS,$query_COMMENTS);
mysqli_stmt_bind_param($prepState_COMMENTS, "i", $podcast_id);
mysqli_stmt_execute($prepState_COMMENTS);
$commentsResultSet = mysqli_stmt_get_result($prepState_COMMENTS);
	
	
if (mysqli_num_rows($commentsResultSet)==0){
	//No comments on the podcast:
	echo "no_comments";
}
else{
	//Some set was returned:
		
	$output = array();
	while ($row = $commentsResultSet->fetch_assoc()){
		$output[]=$row;
	}
		
	echo json_encode($output);
}

?>