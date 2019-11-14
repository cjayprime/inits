<?php

    require_once('../database.php');
    
    $category_id = isset($_POST['category_id']) ? $_POST['category_id'] : '';
    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $description = isset($_POST['description']) ? $_POST['description'] : '';
    $url = isset($_POST['url']) ? $_POST['url'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $mobile = isset($_POST['mobile']) ? $_POST['mobile'] : '';
    $address = isset($_POST['address']) ? $_POST['address'] : '';

    $sql = "INSERT INTO `listing`(`category_id`, `name`, `description`, `image`, `url`, `email`, `mobile`, `address`, `views`, `date`) VALUES('$category_id', '$name', '$description', '[]', '$url', '$email', '$mobile', '$address', '0', NOW())";
    $query = mysqli_query($database, $sql);
    $num = mysqli_affected_rows($database);
    

    $_GET['category'] = 'all';
    require_once('index.php');
?>