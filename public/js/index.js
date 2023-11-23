const host = "http://localhost:8000";

// funcion para mostrar usuario donde login/register-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

window.addEventListener("load", function (event) {
  if (localStorage.getItem("email")) {
    let registrado = document.getElementById("registrado");
    registrado.innerHTML = `<li>${localStorage.getItem(
      "email"
    )}</li><button onClick="desloguear()">Salir</button>`;
  }

// funcion para mostrar carrusel de eventos-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  fetch(`${host}/carrusel?total=3`)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const containerDiv = document.getElementById("carrusel");
      containerDiv.innerHTML = "<ul>";

      for (let i = 0; i < json.length; i++) {
        containerDiv.innerHTML += `<li>${json[i].nombre} <button onclick="carruselClick(${json[i].id})">Saber mas</button></li>`;
      }
      containerDiv.innerHTML += "</ul>";
    })
    .catch(function (error) {
      console.log(error);
    });
});

// funcion desloguearse-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function desloguear() {
  localStorage.removeItem("email");
  let loginemail = document.getElementById("registrado");
  loginemail.innerHTML = `<div id="registrado"><li><a href="/html/login.html">Login/registro</a></li></div>`;
}

// funcion para mostrar informacion del carrusel-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function carruselClick(eventoID) {
  fetch(`${host}/evento/${eventoID}`, {})
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const containerDiv = document.getElementById("sabermas");
      containerDiv.innerHTML = `<div>
      <h3>Detalles del evento</h3>
      <div id= "sabermas">
      <h5>Nombre del evento - ${json.nombre}</h5>
      <h5>Tipo de evento: ${json.tipo}</h5>
      <h5>Fecha de inicio - ${json.fechainicio}</h5>
      <h5>Fecha de cierre - ${json.fechafin}</h5>
      <h5>Aforo máximo - ${json.aforo}</h5>
      </div>
    </div>`;
    })
    .catch(function (error) {
      alert(error);
    });
}


