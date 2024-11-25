<?php
include ("conexion.php");

if(isset($_POST['folio'])) {

 $folio = $_POST['folio'];

    $sql = "SELECT * FROM pedidos WHERE folio = ?"; //Definimos la consulta y se pone ? que actua como marcador de posicion para el folio que se ingreso
    $stmt = $conex->prepare($sql); //stmt es statement (declaracion), es una variable utilizada para manejar consultas preparadas en PHP!
    //Las consultas preparadas nos permite ejecutar de forna segura las consultas de SQL, especialmente si estos fueron agregados por los usuarios
    $stmt->bind_param("s", $folio); //Se une el ? con el folio, y s quiere decir de el folio es string
    $stmt->execute(); //Para ejecutar la consulta preparada
    $result = $stmt->get_result(); //Obtenemos le resultado de la consulta


    //Para verificar si el pedido existe
    if($result->num_rows > 0) { //Si este es mayor a 0 quiere decir que si existe un pedido con ese folio y se guarda en fetch
        $pedido = $result->fetch_assoc();

        //Para insertar el pedido cancelado a la tabla cancelado que creamos en phpmyadmin
        $sqlInsert = "INSERT INTO cancelado (folio, nombre, direccion, tipo, cantidad, telefono, fecha)
                    VALUES (?, ?, ?, ?, ?, ?, ?)";

        $stmtInsert = $conex->prepare($sqlInsert);
        $stmtInsert->bind_param(
            "ssssiss", //Se enlazan los valores del pedido, quiere decir s por 4 cadenas, un entero i
            $pedido['folio'],
            $pedido['nombre'],
            $pedido['direccion'],
            $pedido['tipo'],
            $pedido['cantidad'],
            $pedido['telefono'],
            $pedido['fecha']
        );
        $stmtInsert->execute();

        //Basicamente las variables de stmt nos sirven para manejar y ejecutar consultas preparadas en PHP,
        //esto hace que el codigo sea mas seguro y evita problemas con inyecciones SQL.

        //Para eliminar el pedido de la tabla de los pedidos que estan activos
        $sqlDelete = "DELETE FROM pedidos WHERE folio = ?";
        $stmtDelete = $conex->prepare($sqlDelete);
        $stmtDelete->bind_param("s", $folio);
        $stmtDelete->execute();

        echo "<h3 class='success'>El pedido con folio $folio ha sido cancelado, ¡Gracias!</h3>";
    } else {
        echo "<h3 class='error'>Oops! No se encontró el pedido con el folio $folio</h3>";
    }

    $stmt->close();
    $conex->close();
} 
?>