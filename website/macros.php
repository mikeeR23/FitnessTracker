<?php 
	// This script enters a users' macros
	// Only used by the app so far 

	$userID = $_POST["userID"];
	$calories = $_POST["calories"];
	$protein = $_POST["protein"];
	$carbs = $_POST["carbs"];
	$fat = $_POST["fat"];


	// Mysql info
	$database = 'workoutapp';
	$server = 'localhost';
	$username = '';
	$password = '';

	$conn = new mysqli($server, $username, $password, $database);

	// Error connecting to database
	if($conn->connect_error)
	{
		//returnWithError($conn->connect_error);
		echo "Connection to database failed";
	}

	// Able to connect to database
	else
	{
		// Check if the user is already tracking their macros 
		$check = "select userID from macros where userID = '$userID'";
		$result = $conn->query($check);

		// If the user has already entered macros before execute this query
		if($result->num_rows > 0)
		{
			$update = "insert into macros (userID, calories, protein, fat, carbs) values ('$userID', 2, 2, 2, 2) on duplicate key update userID = '$userID', calories = '$calories', protein = '$protein', fat = '$fat', carbs = '$carbs'";

			$result = $conn->query($update);

			// Failed to update macros -- something went wrong in query!
			if(!$result)
				echo "Failed to update macros";
			// Successfully updated macros, nice!
			else
				echo "Update macros";

			exit();
		}

		// Insert macros for a user into database
		$sql = "insert into macros (userID, calories, protein, fat, carbs) values ('$userID', '$calories', '$protein', '$fat', '$carbs');";

		// Execute query
		$result = $conn->query($sql);

		// Something went wrong with the query
		if(!$result)
		{
			echo "Error executing query";
			exit();
		}

		// Query executed correctly
		else
		{
			echo "Successfully updated goals. Your calorie intake is " . $calories;
		}
			
		// Close the connection
		$conn->close();
	}

 ?>