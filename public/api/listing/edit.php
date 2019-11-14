<?php

    require_once('../database.php');
    
    $id = isset($_POST['id']) ? $_POST['id'] : 0;
    $category_id = isset($_POST['category_id']) ? $_POST['category_id'] : '';
    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $description = isset($_POST['description']) ? $_POST['description'] : '';
    $url = isset($_POST['url']) ? $_POST['url'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $mobile = isset($_POST['mobile']) ? $_POST['mobile'] : '';
    $address = isset($_POST['address']) ? $_POST['address'] : '';


    $sql = "UPDATE `listing` SET `category_id` = '$category_id', `name` = '$name', `description` = '$description', `url` = '$url', `email` = '$email', `mobile` = '$mobile', `address` = '$address'   WHERE `listing_id` = '$id'";
    $query = mysqli_query($database, $sql);
    $num = mysqli_affected_rows($database);
    

    $_GET['category'] = 'all';
    require_once('index.php');
?>