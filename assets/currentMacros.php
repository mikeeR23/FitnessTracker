<?php 
	$data = getDataRequest();
	session_start();
	if($data == '')
	{
		returnWithInfo($_SESSION['currentProtein'], $_SESSION['currentFat'], $_SESSION['currentCarbs']);
		exit();
	}

	

	unset($_SESSION['currentProtein']);
	unset($_SESSION['currentFat']);
	unset($_SESSION['currentCarbs']);

	$_SESSION['currentProtein'] = $data['currentProtein'];
	$_SESSION['currentFat'] = $data['currentFat'];
	$_SESSION['currentCarbs'] = $data['currentCarbs'];

	$currentProtein = $_SESSION['currentProtein'];
	$currentFat = $_SESSION['currentFat'];
	$currentCarbs = $_SESSION['currentCarbs'];

	returnWithInfo($currentProtein, $currentFat, $currentCarbs);


	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

	// Return info as json
	function returnWithInfo($currentProtein, $currentFat, $currentCarbs)
	{
		$retValue = '{"currentProtein":"' . $currentProtein . '", "currentFat":"' . $currentFat . '","currentCarbs":"' . $currentCarbs . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithError($err)
	{
		$retValue = '{"error": "' . $err . '"}';
		sendResultInfoAsJson($retValue);
	}

	function getDataRequest()
	{
		return json_decode(file_get_contents('php://input'), true);
	}





 ?>