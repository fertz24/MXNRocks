document.addEventListener('DOMContentLoaded', function() {
//este se utiliza para ejecutar una función cuando todo el HTML de la página ha sido cargado y procesado por el navegador
//Nos sirve para que el js no intente hacer acceder a esos elementos de HTML.


//Para obtener el número de visitas de mi página de manera local ya que no estamos conectados a ningún servidor...
var visitas = localStorage.getItem('pagina_visitas');
//localStorage es para guardar el número de veces que se ha visitado la página, este dato se guarda en el navegador, 
//este número no va a desaparecer cuando se haga refresh a la página (este sólo se borra si se limpia el almacenamiento local)

//En el caso de que no haya visitas registradas, se inicializa el contador desde 0 
if (!visitas){
    visitas = 0; //Empezamos en 0
}

//Incrementamos el contador
visitas++;

//Para guardar el nuevo valor en el localStorage
localStorage.setItem('pagina_visitas', visitas); //Se al macena en la variable de visitas 
//Con localStorage el contador va a permanecer e incrementar a menos que se borre directamente de la consola del navegador

var visitasE = document.getElementById('visitas');
if(visitasE) { //Si existen visitas entonces las mostraremos con textContent concatenando a la variable de visitas
    visitasE.textContent += "Wao! Son bastantes visitas a la página: " + visitas;
//Ahora para mostrar este contador en la página o sea en nuestro pie de página (al final)
}
//Para eliminar el almacenamiento local localStorage.removeItem('pagina_visitas'); se usa esa linea directamente en la consola del navegador
//con eso reiniciamos el contador a 1
});
