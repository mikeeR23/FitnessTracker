<?php 
	// This script creates a new user and inserts the data into the database
	
	// Gets the json from javascript --website
	//$data = getRequestInfo();

	// Parse the json into variables
/*
	$firstName = $data["firstName"];
	$lastName = $data["lastName"];
	$user = $data["username"];
	$pw1 = $data["pw"];
	$email = $data["email"];
*/

	$firstName = $_POST["firstName"];
	$lastName = $_POST["lastName"];
	$user = $_POST["username"];
	$pw1 = $_POST["password"];
	$email = $_POST["email"];


	// Mysql info
	$database = 'workoutapp';
	$server = 'localhost';
	$username = '';
	$password = '';

	$conn = new mysqli($server, $username, $password, $database);

	// Error connecting to database
	if($conn->connect_error)
	{
		echo "Connection to database failed";
	}

	// Able to connect to database
	else
	{
		// Check if email already exists
		$emailQuery = "select email from users where email = '$email'";
		$result = $conn->query($emailQuery);

		// If the email exists, exit script
		if($result->num_rows > 0)
		{
			echo "That email is already in use. Please enter a different email";
			exit();
		}
		

		// Check if the username is already in use
		$usernameQuery = "select username from users where username = '$user'";
		$result = $conn->query($usernameQuery);

		// Exit if username is in use already
		if($result->num_rows > 0)
		{
			echo "That username is already in use. Please enter a different username";
			//returnWithError("That email is already in use. Please enter a different email");
			exit();
		}

		// SQL query
		$sql = "insert into users (firstName, lastName, username, password, email) values ('$firstName', '$lastName', '$user', '$pw1', '$email');";

		// Execute query
		$result = $conn->query($sql);

		// $result returns 1 if the query is successful and 0 if it fails
		// Error with query
		if(!$result)
		{
			echo "Error executing query";
			exit();
		}

		// Query executed correctly
		else
		{
			echo "Successfully inserted data into database. Welcome, " .$user;
		}
			
		// Close the connection
		$conn->close();
	}

	// Header for JSON -- used by website
	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
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