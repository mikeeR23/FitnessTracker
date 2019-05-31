<?php 
	//echo "THE FUCKING EMAIL IS " . $_SESSION['post-data']['email'];
	//echo"THE FUCKING ID IS " . $_SESSION['post-data']['userID'];
	
	session_start();
	$userID = $_SESSION['post-data']['userID'];
	$firstNme =  $_SESSION['post-data']['firstName'];
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


 ?>