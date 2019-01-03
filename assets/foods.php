<?php 
	session_start();

	$data = getDataRequest();

	// Access specific fiels of the session
	$calories = $_SESSION['foods']['calories'];
	$protein = $_SESSION['foods']['protein'];
	$fat = $_SESSION['foods']['fat'];
	$carbs = $_SESSION['foods']['carbs'];

	// Send data back to javascript
	returnWithInfo($calories, $protein, $fat, $carbs);

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

	// Return info as json
	function returnWithInfo($calories, $protein, $fat, $carbs)
	{
		$retValue = '{"calories": "' . $calories . '", "protein": "' . $protein . '","fat": "' . $fat . '","carbs": "' . $carbs . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function getDataRequest()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

 ?>