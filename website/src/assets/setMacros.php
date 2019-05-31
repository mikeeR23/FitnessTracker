<?php 
	// Website script

	session_start();

	$data = getRequestInfo();
	
	// Access the values of the post array inside the session 
	$userID = $_SESSION['macros']['userID'];
	$calories =  $_SESSION['macros']['calories'];
	$protein =  $_SESSION['macros']['protein'];
	$fat = $_SESSION['macros']['fat'];
	$carbs = $_SESSION['macros']['carbs'];

	returnWithInfo($userID, $calories, $protein, $fat, $carbs);

	// Header for JSON -- used by website
	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

	// Return info as json
	function returnWithInfo($userID, $calories, $protein, $fat, $carbs )
	{
		$retValue = '{"calories":"' . $calories . '","protein":"' . $protein . '","userID":"' . $userID . '", "fat":"' . $fat . '", "carbs":"' . $carbs . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

 ?>