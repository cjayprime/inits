<?php

    require_once('database.php');
    
    $category = isset($_GET['category']) ? $_GET['category'] : '';
    $category = strtolower($category) == 'all' ? "" : "AND LOWER(`title`) = LOWER('$category')";
    $query = isset($_GET['query']) ? $_GET['query'] : '';

    $sql = "SELECT * FROM `listing` INNER JOIN `category` WHERE `listing`.`category_id` = `category`.`category_id` " . $category . " AND ((`name` LIKE '%$query%') OR (`description` LIKE '%$query%'))";
    $query = mysqli_query($database, $sql);
    $num = mysqli_num_rows($query);
    
    if($num > 0){
        
        $listings = array(
            'status' => true,
            'data' => array(
                
            )
        );
        
        while($rows = mysqli_fetch_array($query, MYSQLI_ASSOC)){

            $rows['image'] = json_decode($rows['image'], true);
            array_push($listings['data'], $rows);

        } 


    }else{
        
        $listings = array(
            'status' => false,
            'data' => array(
                
            )
        );

    }

    echo json_encode($listings);
    
?>