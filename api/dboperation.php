
<?php
    require_once("connectDB.php");

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
?>
