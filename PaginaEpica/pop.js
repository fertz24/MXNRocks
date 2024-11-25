//Para poder mostrar los datos que se ingresaron al formulario en el popup

function mostrarPopup() {
   
    const nombre = document.getElementById("nombre").value;
    const direccion = document.getElementById("direccion").value;
    const tipo = document.getElementById("tipo").value;
    const cantidad = document.getElementById("cantidad").value;
    const telefono = document.getElementById("telefono").value;

    //Verifica que los campos estan vacios 
    if (!nombre || !direccion || !tipo || !cantidad || !telefono) {
         // Si algún campo está vacío, mostrar mensaje de error en el frontend
         document.getElementById("mensaje-error").innerHTML = "Por favor, llena todos los campos.";
         document.getElementById("mensaje-error").style.display = "block"; // Muestra el mensaje
 
         return; //Sale de la función sin enviar el formulario ya que no hay datos de por medio.
 
    }

     generarFolio(); //Se genera el folio y se muestra en el popup
    document.getElementById('popup-o').style.display = 'flex';

    //Para mostrar los datos en el popup
    const contP = `
    <strong>Nombre:</strong> ${nombre}<br>
    <strong>Dirección:</strong> ${direccion}<br>
    <strong>Cantidad de tacos:</strong> ${cantidad}<br>
    <strong>Tipo de taco:</strong> ${tipo}<br>
    <strong>Teléfono:</strong> ${telefono}<br>
`;

document.getElementById("contP").innerHTML = contP;

}

//Esta función permite que se envíen los datos de un formulario de manera asíncrona
 //usando AJAX sin recargar la página. 
function enviarFormulario(event) { //Esta función evita que el formulario se envíe de manera tradicional (que recargue la página).
    event.preventDefault(); 

    //Con estas líneas de código pedidoForm selecciona el formulario de HTML y formData 
    //crea un objeto formData donde contiene todos los datos del formulario, todo listo para enviarse.
    const form = document.getElementById("pedidoForm");
    const formData = new FormData(form);

    // Enviar el formulario mediante AJAX
    const xhr = new XMLHttpRequest(); //xhr es un objeto que permite enviar y recibir datos de un servidor sin recargar la página.
    xhr.open("POST", "procesar_pedido.php", true); //Se configura la solicitud como POST y se define nuestro .php para que procese los datos.

    xhr.onload = function () { //Este se activa cuando la solicitud AJAX se completa.
        if (xhr.status === 200) { //Si la respuesta del servidor es exitosa entonces mostrará el contenido del formulario
            //La respuesta esta dentro del elemento contP
            document.getElementById("contP").innerHTML = xhr.responseText;
        } else { //Mensaje de error si es que falla.
            document.getElementById("contP").innerHTML = "<h3 class='error'>Error al enviar el pedido. Intenta de nuevo.</h3>";
        }
    };

    xhr.send(formData); //Aquí envía los datos a procesar_pedido.php
}


//Funcion para cerrar el popup
function cerrarPopup() {
    document.getElementById("popup-o").style.display = "none";
}

function generarFolio() {
    const folio = 'P' + Math.floor(Math.random() * 1000).toString().padStart(3, '0'); //Este genera un folio con número aleatorio y que sea un formato como: P030
    document.getElementById('folio').textContent = folio; //Asigna el folio al popup porque es parte del resumen del pedido
    document.getElementById('folioInput').value = folio; //Guarda el folio pero en el campo oculto del formulario para enviar eso al servidor.
}

//Esta función nos asegura que el código dentro de la función se ejeciutará una vez que el HTML termine de cargarse.
document.addEventListener("DOMContentLoaded", function() { 
  
    //Estos son para el evento de click 
    document.getElementById("enviarPedido").addEventListener("click", enviarFormulario);
    document.getElementById("confirmarPedidoBtn").addEventListener("click", mostrarPopup);
    document.getElementById("cerrarPopup").addEventListener("click",cerrarPopup);
});