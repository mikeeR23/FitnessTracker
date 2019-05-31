<?php 
	include 'mysqlInfo.php';
	// This script enters a users' macros
	// Only used by the app so far 

	$data = getRequestInfo();
	$_POST = $data;

	$userID = $_POST["userID"];
	$calories = $_POST["calories"];
	$protein = $_POST["protein"];
	$carbs = $_POST["carbs"];
	$fat = $_POST["fat"];

	$conn = new mysqli($server, $username, $password, $database);

	// Error connecting to database
	if($conn->connect_error)
	{
		//returnWithError($conn->connect_error);
		die("Connection to database failed");
	}

	// Able to connect to database
	else
	{
		// Check if the user is already tracking their macros 
		$check = "select * from macros where userID = '$userID'";
		$result = $conn->query($check);

		// If the user has already entered macros before execute this query
		if($result->num_rows > 0)
		{
			$update = "insert into macros (userID, calories, protein, fat, carbs) values ('$userID', 2, 2, 2, 2) on duplicate key update userID = '$userID', calories = '$calories', protein = '$protein', fat = '$fat', carbs = '$carbs'";

			$res = $conn->query($update);

			// Failed to update macros -- something went wrong in query!
			if(!$res)
				returnWithError("Failed to update macros");
			// Successfully updated macros, nice!
			else
			{
				while($row = $result->fetch_assoc())
				{
					$calories = $row['calories'];
					$protein = $row['protein'];
					$fat = $row['fat'];
					$carbs = $row['carbs'];
					$_POST = $row;
				}
			}

			//$_SESSION['macros'] = $_POST;
			returnWithInfo($calories, $protein, $fat, $carbs);

			exit();
		}

		// Insert macros for a user into database
		$sql = "insert into macros (userID, calories, protein, fat, carbs) values ('$userID', '$calories', '$protein', '$fat', '$carbs');";

		// Execute query
		$result = $conn->query($sql);

		// Something went wrong with the query
		if(!$result)
		{
			returnWithError("Error executing query");
			exit();
		}

		// Query executed correctly
		else
		{
			returnWithInfo($calories, $protein, $fat, $carbs);
		}
			
		// Close the connection
		$conn->close();
	}



	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}


	function returnWithError($err)
	{
		$ret  = '{"error":"' . $err . '"}';
		sendResultInfoAsJson($ret);
	}
	// Return info as json
	function returnWithInfo($calories, $protein, $fat, $carbs)
	{
		$retValue = '{"calories":"' . $calories . '", "protein":"' . $protein . '","fat":"' . $fat . '","carbs":"' . $carbs . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

 ?>