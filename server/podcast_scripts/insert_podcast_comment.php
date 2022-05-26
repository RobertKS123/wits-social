<?php
/*  
    Script URL:
	https://startechies.000webhostapp.com/server/podcast_scripts/insert_podcast_comment.php
	
	
	Parameters that must be sent in the url request:
	- A parameter called 'user_id' which is the id of the user thats creating the comment
	- A parameter called 'podcast_id' which is the id of the podcast that this user is commenting on
	- A parameter called 'comment_body' which is the actual content of the comment thats being inserted
	

    
    What the file does?
    - Simply accepts above parameters and inserts a record into the PodcastComments table
    - The file will output a ONLY a string 'inserted' once the comment has been inserted.
    
*/

require_once '../db_config.php';

$user_id = $_REQUEST['user_id'];
$podcast_id = $_REQUEST['podcast_id'];
$comment_body = $_REQUEST['comment_body'];

//Set timezone to South Africa
date_default_timezone_set('Africa/Johannesburg');

//Get current date and time
$theDate = new DateTime();

//Convert current date/time to string
$stringDate = $theDate->format('Y-m-d H:i:s');

//Define comment insert query
$insertQuery = "INSERT INTO ST_PodcastComments(Comment_Body,Comment_TimePosted,
Podcast_ID,EndUser_ID) VALUES(?,?,?,?);";

//Define prepeared statement
$prepState = mysqli_stmt_init($link);
mysqli_stmt_prepare($prepState,$insertQuery);

//Bind parameters to prepared statement
mysqli_stmt_bind_param($prepState, "ssii", $comment_body,$stringDate,$podcast_id,$user_id);

//Execute
mysqli_stmt_execute($prepState);

echo "inserted";



	
?>