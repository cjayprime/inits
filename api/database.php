<?php

    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Max-Age: 86400'); 
    header('Content-Type: application/json');

    $database = mysqli_connect('localhost', 'root', '', 'inits');
    if(mysqli_connect_error()){
        
        $database = mysqli_connect('sql307.byethost.com', 'b14_24794383', 'stripedadynamo1.', 'b14_24794383_inits');
    
    }

?>