<?php

    //['image']['name']
    $rat = array('image' => array('name'=> array('a','b')));
    $rat = array('image' => array('name'=> 'sdf'));

    echo count($rat['image']['name']);

?>