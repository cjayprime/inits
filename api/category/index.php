<?php

    require_once('../database.php');
    
    $sql = "SELECT * FROM `category`";
    $query = mysqli_query($database, $sql);
    $num = mysqli_num_rows($query);
    
    if($num > 0){
        
        $categories = array(
            'status' => true,
            'data' => array(
                
            )
        );
        
        while($rows = mysqli_fetch_array($query, MYSQLI_ASSOC)){

            array_push($categories['data'], array('category_id' => $rows['category_id'], 'title' => $rows['title'], 'emoji' => $rows['emoji']));

        } 


    }else{
        
        $categories = array(
            'status' => false,
            'data' => array(
                
            )
        );

    }

    echo json_encode($categories);

?>