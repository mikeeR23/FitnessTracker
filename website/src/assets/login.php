<?php 
	include 'mysqlInfo.php';
	/*
	// Gets the json from javascript
	$data = getRequestInfo();

	// Parse the json into variables
	$user = $data["username"];
	$pw = $data["pw"];
	*/

	$user = $_POST['username'];
	$pw = $_POST['password'];

	require_once "setData.php";
	/*
	$firstName = "";
	$lastName = "";
	$userID = 0;
	$email = "";
*/


	$conn = new mysqli($server, $username, $password, $database);

	// Error connecting to database
	if($conn->connect_error)
	{
		echo "Error connecting to database";
	}

	// Able to connect to database
	else
	{
		// SQL query
		$sql = "select * from users where username = '$user' and password = '$pw'";

		// Execute query
		$result = $conn->query($sql);

		// $result Returns a 1 or 0 
		if($result)
		{
			// Fetch columns from database based on the name of the column
			while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
			{
				// Store columns into an array
				$response[] = $row;
			}

			// JSON is encodes and stored in an abject
			echo json_encode($response);

		}

		// Query executed incorrectly
		else
		{
			echo "Incorrect Username/Password Combination. Please Try again";
			//returnWithError($conn->error);
		}
			
		// Close the connection
		$conn->close();
	}

	// Header for JSON -- used by website
	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		//echo $obj;
	}

	// Return info as json
	function returnWithInfo( $firstName, $lastName )
	{
		$retValue = '{"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}

	// This function retrieves the json from javascript and should be called in the 
	// beginning of the script
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	// Sends the error in json format to javascript file
	function returnWithError( $err )
	{
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
 ?>