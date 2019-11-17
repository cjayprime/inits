<?php
/**
 * 
 * 
 * Validate all entries
 * 
 * 
 */
    require_once('../database.php');
    
    $category = isset($_GET['category']) ? $_GET['category'] : '';
    $category = strtolower($category) == 'all' ? "" : "AND LOWER(`title`) = LOWER('$category')";

    $sql = "SELECT * FROM `listing` INNER JOIN `category` WHERE `listing`.`category_id` = `category`.`category_id` " . $category;
    $query = mysqli_query($database, $sql);
    $num = mysqli_num_rows($query);
        
    $listings = array(
        'status' => false,
        'data' => array(
            
        )
    );
    
    if($num > 0){
        
        while($rows = mysqli_fetch_array($query, MYSQLI_ASSOC)){

            $rows['id'] = $rows['listing_id'];
            $rows['image'] = json_decode($rows['image'], true);

            $listings['status'] = true;
            array_push($listings['data'], $rows);

        }

    }

    echo json_encode($listings);
    
?>