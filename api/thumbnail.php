<?php

session_save_path('sessions');
session_start();


require_once 'connect.php';
require_once 'get_thumb.php';

if (isset($_GET["i"])){
    if (isset($_GET["webp"])){
        header('Content-Type: image/webp');
        $webp=true;
    }
    else{
        header('Content-Type: image/jpeg');
        $webp=false;
    }
    
    $tamanio = 600;
    if (isset($_GET["t"])){
        $tamanio = $_GET["t"];
    }
//     echo $_GET["i"];
    $dire=explode('/',$_GET["i"])[0];
//     echo $dire;
    $archivo=explode('/',$_GET["i"])[1];
//     echo $archivo;
    $arch = crearThumbConMinimoWidth($dire,$archivo,$tamanio,$webp);

    readfile($arch);
}
?>