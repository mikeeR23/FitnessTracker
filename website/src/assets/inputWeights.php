<?php
    include 'mysqlInfo.php';

    $_POST = getRequestInfo();
    
    



    function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

	// Return info as json
	function returnWithInfo($userID, $firstName, $lastName, $email, $user)
	{
		$retValue = '{"userID":"' . $userID . '", "firstName":"' . $firstName . '","lastName":"' . $lastName . '","email":"' . $email . '", "username":"' . $user . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

?>