<?php

    require_once('../database.php');

    $title = isset($_POST['title']) ? $_POST['title'] : '';
    $emoji = isset($_POST['emoji']) ? $_POST['emoji'] : '';

    $sql = "INSERT INTO `category`(`title`, `emoji`, `date`) VALUES('$title', '$emoji', NOW())";
    $query = mysqli_query($database, $sql);
    $num = mysqli_affected_rows($database);
    

    require_once('index.php');
?>