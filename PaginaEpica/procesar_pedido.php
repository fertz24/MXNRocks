<?php
    include("conexion.php");

    if(isset($_POST['nombre']) && isset($_POST['direccion']) && isset($_POST['cantidad']) && isset($_POST['telefono']) && isset($_POST['tipo'])) {

        if(
            strlen($_POST['nombre']) >= 1 &&
            strlen($_POST['direccion']) >= 1 &&
            strlen($_POST['cantidad']) >= 1 &&
            strlen($_POST['telefono']) >= 1 &&
            strlen($_POST['tipo']) >= 1 
            ) {
                $folio = $_POST['folio'];
                $nombre = trim($_POST['nombre']);
                $direccion = trim($_POST['direccion']);
                $cantidad = (int)$_POST['cantidad'];
                $telefono= trim($_POST['telefono']);
                $tipo = trim($_POST['tipo']);
                $fecha = date("Y-m-d");

                $consulta = "INSERT INTO pedidos (folio, nombre, direccion, cantidad, telefono, tipo, fecha)
                    VALUES('$folio', '$nombre', '$direccion','$cantidad', '$telefono', '$tipo', '$fecha')";

    //Definimos la conexión, mandamos la consulta para que se inserte en la base de datos.
    $resultado = mysqli_query($conex, $consulta);

    //Estructura para que el usuario vea que se envío con éxito sus datos a la bd
    if($resultado) {
          echo "<h3 class='success'>¡Tu pedido ha sido enviado con éxito!</h3>";
    }else {
           echo "<h3 class='error'>Por favor, llena todos los campos.</h3>";
    }
} 
    }
?>