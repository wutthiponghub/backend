
<?php
    require_once("connectDB.php");

    $postdata = file_get_contents("php://input");

    if($postdata != "")
    {
        $request = json_decode($postdata);

        foreach ($request as $k=>$v){
            $_POST[$k] = $v;
        }	
    }

        $action = $_POST['action'];
        unset($_POST['action']);


    if(isset($_GET["table"]) && $_GET["table"] != "")
    {
        $table = $_GET['table'];

        $query="SELECT * FROM $table";

        $result = $conn->query($query) or die($conn->error.__LINE__);

        $arr = array();
        if($result->num_rows > 0)
        {
            while($row = $result->fetch_assoc())
            {
                $arr[] = $row;
            }
        }
        $json_response = json_encode($arr);

        echo $json_response;	
    }

	if(isset($_POST['table']) && isset($_POST['id']) && isset($_POST['primarykey']) && $action == "delete")
	{
		$table = $_POST['table'];
		$id = $_POST['id'];
		$primarykey = $_POST['primarykey'];
        $query = 'DELETE FROM `'.$table.'` WHERE '.$primarykey.'='.$id.';';
		$conn->query($query) or die($conn->error.__LINE__);
	}   


	if(isset($_POST['table']) && $action == "add" )
	{
		$table = $_POST['table'];
		unset($_POST['table']);
		unset($_POST['primarykey']);
		$sets = "";
		$values = "";
		$cpt = 1;
		foreach ($_POST as $k => $v) {
			if(is_string($v)){ $v = '"'.$v.'"';}
			if($cpt == 1){
				$sets .= $v . ',';
				$values .= '`'.$k . '`,';
			}
			else
			{
				$cpt = 1;
			}
		}
		$sets = substr($sets, 0, -1);
		$values = substr($values, 0, -1);

		$query = 'INSERT INTO `'.$table.'`('.$values.') VALUES ('.$sets.');';
		$conn->query($query) or die($conn->error.__LINE__);
	}    
?>
