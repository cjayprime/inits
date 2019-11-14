<?php

    require_once('../database.php');
    
    $category_id = isset($_POST['category_id']) ? $_POST['category_id'] : '';
    $title = isset($_POST['title']) ? $_POST['title'] : '';
    $emoji = isset($_POST['emoji']) ? $_POST['emoji'] : '';


    $sql = "UPDATE `category` SET `title` = '$title', `emoji` = '$emoji' WHERE `category_id` = '$category_id'";
    $query = mysqli_query($database, $sql);
    $num = mysqli_affected_rows($database);
    

    require_once('index.php');
?>