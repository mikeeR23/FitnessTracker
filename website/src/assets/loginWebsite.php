<?php 
	// Script called when user tries to login

	include 'mysqlInfo.php';
	
	// Start session
	session_destroy();
	session_start();
	
	// Gets the json from javascript
	$data = getRequestInfo();
	$_POST = $data;

	$user = $_POST["username"];
	$pw = $_POST["password"];

	$userID = 0;
	$firstName = "";
	$lastName = "";
	$email = "";

	$conn = new mysqli($server, $username, $password, $database);

	// Error connecting to database
	if($conn->connect_error)
	{
		die("Connection to database failed");
	}
	else
	{
		// SQL query
		$sql = "call userLogin('$user', '$pw')";

		// Execute query
		$result = $conn->query($sql);

		if($result->num_rows > 0)
		{
			while($row = $result->fetch_assoc())
			{
				$userID = $row["userID"];
				$firstName = $row["firstName"];
				$lastName = $row["lastName"];
				$email = $row["email"];
				$_POST = $row;
			}

			// Create a session and store the post array in it
			$_SESSION['post-data'] = $_POST;
			
			returnWithInfo($userID, $firstName, $lastName, $email, $user);
		}
		else
		{
			echo "Incorrect username/password. Try again";
			exit();
		}

		$conn->close();
	}
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