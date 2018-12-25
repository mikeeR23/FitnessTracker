<?php 
	// Website script

	session_start();

	$data = getRequestInfo();
	
	// Access the values of the post array inside the session 
	$userID = $_SESSION['post-data']['userID'];
	$firstName =  $_SESSION['post-data']['firstName'];
	$lastName =  $_SESSION['post-data']['lastName'];
	$username = $_SESSION['post-data']['username'];
	$email = $_SESSION['post-data']['email'];

	returnWithInfo($userID, $firstName, $lastName, $username, $email);

	// Header for JSON -- used by website
	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

	// Return info as json
	function returnWithInfo($userID, $firstName, $lastName, $username, $email )
	{
		$retValue = '{"firstName":"' . $firstName . '","lastName":"' . $lastName . '","userID":"' . $userID . '", "username":"' . $username . '", "email":"' . $email . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

 ?>