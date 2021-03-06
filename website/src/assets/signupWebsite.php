<?php 
	include 'mysqlInfo.php';
	// This script creates a new user and inserts the data into the database
	// website script
	
	// Gets the json from javascript 
	$data = getRequestInfo();

	// Parse the json into variables
	$firstName = $data["firstName"];
	$lastName = $data["lastName"];
	$user = $data["username"];
	$pw1 = $data["password"];
	$email = $data["email"];

	$conn = new mysqli($server, $username, $password, $database);

	// Error connecting to database
	if($conn->connect_error)
	{
		die("Connection to database failed");
	}

	// Able to connect to database
	else
	{
		// Check if email already exists
		$emailQuery = "call checkEmailInUse('$email')";
		$result = $conn->query($emailQuery);

		// If the email exists, exit script
		if($result->num_rows > 0)
		{
			echo "That email is already in use. Please enter a different email";
			exit();
		}
		

		// Check if the username is already in use
		$usernameQuery = "call checkUsernameInUse('$user')";
		$result = $conn->query($usernameQuery);

		// Exit if username is in use already
		if($result->num_rows > 0)
		{
			echo "That username is already in use. Please enter a different username";
			exit();
		}

		// SQL query
		//$sql = "insert into users (firstName, lastName, username, password, email) values ('$firstName', '$lastName', '$user', '$pw1', '$email');";
		$sql = "call insertNewUser('$firstName', '$lastName, '$user', '$pw1', '$email')";
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

	// This function retrieves the json from javascript file
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}
 ?>