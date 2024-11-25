<?php
//Aquí se crea la conexión
    $conex = mysqli_connect("localhost", "root", "", "tacos_pedidos");

    //Para verificar la conexión
    if(!$conex) {
        die("Conexión fallida: " . mysqli_connect_error());
    }
?>