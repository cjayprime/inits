<?php

    require_once('../database.php');
    
    $id = isset($_POST['id']) ? $_POST['id'] : 0;

    $sql = "DELETE FROM `category` WHERE `category_id` = '$id'";
    $query = mysqli_query($database, $sql);
    $num = mysqli_affected_rows($database);
    

    require_once('index.php');

?>