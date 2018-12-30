<?php 
	// This script enters a users' macros
	// Only used by the app so far 

	//session_start();


	$data = getRequestInfo();
	$_POST = $data;

	$userID = $_POST["userID"];

	// Mysql info
	$database = 'workoutapp';
	$server = 'localhost';
	$username = '';
	$password = '';

	$conn = new mysqli($server, $username, $password, $database);

	// Error connecting to database
	if($conn->connect_error)
	{
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
			while($row = $result->fetch_assoc())
			{
				$calories = $row["calories"];
				$protein = $row["protein"];
				$fat = $row["fat"];
				$carbs = $row["carbs"];
				$_POST = $row;
			}

			//$_SESSION['macros'] = $_POST;

			returnWithInfo($calories, $protein, $fat, $carbs);
			exit();
		}
		else
		{
			returnWithError("You have not entered any macros");
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
