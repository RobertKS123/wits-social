<?php

    //Dont worry about this file. It was just to test the DB Connection
    
    require_once 'db_config.php';
    
    
    $query = "SELECT * FROM CARS;";

    $prepState = mysqli_stmt_init($link);
    mysqli_stmt_prepare($prepState,$query);

    mysqli_stmt_execute($prepState);
    $ResultSet = mysqli_stmt_get_result($prepState);

    if (mysqli_num_rows($ResultSet)==0){
		//The table is empty and there are no cars:
		echo "no_cars";
	}
	else{
		//Some set was returned:
		
		$output = array();
		while ($row = $ResultSet->fetch_assoc()){
			$output[]=$row;
		}
		
		echo json_encode($output);
	}
?>