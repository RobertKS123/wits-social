<?php
/*  
    
    
    Script URL:
	https://startechies.000webhostapp.com/server/podcast_scripts/upload_podcast.php
	
	
	Parameters that must be sent in the url request:
	- Parameter named 'podcast_title' which is the title of the podcast being uploaded.
	- Parameter named 'user_id' which is the unique id of the user that is uploading this podcast.
	- Parameter named 'podcast_description' which is the description for this podcast.
	- Parameter of type file named 'fileToUpload' which is the actual audio file in either .mp3 or .wav format
	- The below <form></form> is the general structure to use to send parameters to this script
	
	
	
	<form action="https://startechies.000webhostapp.com/server/podcast_scripts/upload_podcast.php" method="post" enctype="multipart/form-data">
    Select image to upload:
    File <input type="file" name="fileToUpload" id="fileToUpload"><br/>
    Title <input type="text" name="podcast_title" id="podcast_title"><br/>
    Description<input type="text" name="podcast_description" id="podcast_description"><br/>
    User ID<input type="text" name="user_id" id="user_id"><br/>
    <input type="submit" value="Upload Audio" name="submit">
    </form>
	

    
    
    What the file does?
    - Accepts the above listed parameters and uploads the audio file onto the server and records its link in the database
      
    
    
    What the file outputs? (ie. the response)
    - A JSON object in the following format:
    {file_exists:x,extension_valid:y,podcast_uploaded:z}
    - If x is true, then the file already exists and the upload is a failure
    - If x is false, then the file does not yet exists in the database - this is what we want.
    - If y is false, then the extension is not .mp3 or .wav and the upload is a failure.
    - If y is true, then the extension is valid. ie. .mp3 or .wav
    - z determines whether the script was successful or not. 
    - z = true => upload was a success
    - z = false => upload was a failure
    
*/

require_once '../db_config.php';

//First define response data:

$file_Exists = false;
$extension_valid = true;
$podcast_uploaded = false;
	
$response_data = array('file_exists' => $file_Exists, 'extension_valid' => $extension_valid, 'podcast_uploaded' => $podcast_uploaded);

/*Following required to create a podcast:
1. Podcast Title - Requested from Parameters -
2. Podcast Description - Requested from Parameters -
3. Podcast Audio Link (To be created in this script)
4. ID of End User thats uploading it - Requested from Parameters -
5. Actual Podcast Audio file - Requested from Parameters -
*/

//Request parameters:
$user_id = $_REQUEST['user_id'];
$podcast_title = $_REQUEST['podcast_title'];
$podcast_description = $_REQUEST['podcast_description'];


$target_dir = "../../podcasts/uploads/";
$target_file = $target_dir .basename($_FILES["fileToUpload"]["name"]) ; 
$uploadOk = 1;
$fileExtension = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
$type = $_FILES["fileToUpload"]["type"];

$extensions= array("mp3","wav");

// Check if audio file is audio based on extension
if(in_array($fileExtension,$extensions) === false){
    $response_data['extension_valid'] = false;
    $uploadOk = 0;
}

// Check if file already exists
if (file_exists($target_file)) {
  $response_data['file_exists'] = true;
  $uploadOk = 0;
}

// Check file size - Initially will leave this commented out
/*if ($_FILES["fileToUpload"]["size"] > 500000) {
  echo "Sorry, your file is too large.<br/>";
  $uploadOk = 0;
}*/


//Check whether file is an audio file, ie. An image file could've been given the 'mp3' extension
//{Still need to figure this out}



// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    $response_data['podcast_uploaded'] = false;
    // if everything is ok, try to upload file
} 
else{
    //Set timezone to South Africa
    date_default_timezone_set('Africa/Johannesburg');

    //Get current date and time
    $theDate = new DateTime();
    
    //Convert current date/time to string
    $stringDate = $theDate->format('Y-m-d H:i:s');
    
    //Prepend user id to above string for added uniqueness
    $filename = $stringDate.$user_id;
    
    //AudioLink will be:
    $audioLink = $target_dir.$filename.".".$fileExtension;
    
    
    //Second parmater of this if is the name of the file basically on the server
  if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"],$target_dir .$filename.".".$fileExtension )) { 
    
    //Insert record of podcast into database:
    
    //Define podcast insert query
    $podcastInsertQuery = "INSERT INTO ST_Podcasts(Podcast_Title,Podcast_Description,
    Podcast_AudioLink,EndUser_ID) VALUES(?,?,?,?);";

    //Define prepeared statement
    $prepStatePodcastInsertion = mysqli_stmt_init($link);
    mysqli_stmt_prepare($prepStatePodcastInsertion,$podcastInsertQuery);

    //Bind parameters to prepared statement
    mysqli_stmt_bind_param($prepStatePodcastInsertion, "sssi", $podcast_title,$podcast_description,$audioLink,$user_id);

    //Execute
    mysqli_stmt_execute($prepStatePodcastInsertion);
    
    
    $response_data['podcast_uploaded'] = true;
  } else {
    $response_data['podcast_uploaded'] = false;
  }
}

echo json_encode($response_data);


?>

