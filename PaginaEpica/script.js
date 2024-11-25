document.addEventListener('DOMContentLoaded', function() {

const form = document.querySelector(".formu"); //Ponemos a form como constante para poder manipularla donde ocupemos
//Seleccionamos al form

form.addEventListener('submit', function(event) {
    event.preventDefault(); //Evitar envío de datos a un servidor, realmente no se está haciendo eso por lo pronto, se puso para poder manejar la página sin enviarla a un servidor.

    const values = {}; 
    const inpu = form.querySelectorAll('input');
    
    inpu.forEach(input => { 
        const name= input.name || input.placeholder; 
        values[name] = input.value; 
    });

    console.log("Nombre completo: " + values["Nombre(s)"] + " " + values["Apellido(s)"]);
    console.log("Fecha reservada: " + values["Fecha de reservacion"]);
    console.log("Cantidad de personas: " +values["Personas"]);
    console.log("Correo electrónico: " + values["Correo electrónico"]);
    console.log("Teléfono: " + values["Teléfono"]);

    //Para simular que se enviaron correctamente los datos
    form.reset();
    });

});