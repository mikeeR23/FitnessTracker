<?php 
	// App scrit

	$user = $_POST['username'];
	$pw = $_POST['password'];


	// Mysql info
	$database = 'workoutApp';
	$server = 'localhost';
	$username = 'root';
	$password = 'Dg464569!';

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
 ?>