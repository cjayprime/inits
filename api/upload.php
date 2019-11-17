<?php

    function upload($name, $type, $tmpName, $error, $size){

        $nameCmps = explode(".", $name);
        $extension = strtolower(end($nameCmps));
        
        $newName = md5(time() . $name) . '.' . $extension;
        
        $allowedExtensions = array('jpeg', 'jpg', 'gif', 'png', 'zip', 'txt', 'xls', 'doc');
        if (in_array($extension, $allowedExtensions)) {
        
        }

        // directory in which the uploaded file will be moved
        $directory = './upload/';
        $destination = $directory . $newName;
        
        if(move_uploaded_file($tmpName, $destination)){

            $message ='File is successfully uploaded.';
        
        }else{

            $message = 'There was some error moving the file to upload directory. Please make sure the upload directory is writable by web server.';
        
        }

        echo $message;
        return $newName;

    }

    $image = array();
    if(is_array($_FILES['image']['name'])){

        for($i = 0; $i < count($_FILES['image']['name']); $i++)
        array_push($image, upload(
            $_FILES['image']['name'][$i],
            $_FILES['image']['type'][$i],
            $_FILES['image']['tmp_name'][$i],
            $_FILES['image']['error'][$i],
            $_FILES['image']['size'][$i]
        ));

    }else{

        array_push($image, upload(
            $_FILES['image']['name'],
            $_FILES['image']['type'],
            $_FILES['image']['tmp_name'],
            $_FILES['image']['error'],
            $_FILES['image']['size']
        ));
    
    }

?>