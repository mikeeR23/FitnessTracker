<?php 
	include 'mysqlInfo.php';

	$date = $_POST["date"];
	$size = $_POST["size"];
	echo $date;

	// Connect to remote database on server
	$conn = new mysqli($server, $username, $password, $database);

	if($conn->connect_error)
	{
		returnWithError($conn->connect_error);
	}
	// Create new user
	else
	{
	
		$sql = "insert into chestSize (dateMeasured, size) values ('$date', '$size')";
		$result = $conn->query($sql);
	
		if(!$result)
			echo "Failed to insert";
		else
			echo "Successfully inserted data";

		$conn->close();
	}
 ?>