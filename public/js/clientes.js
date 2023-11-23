const host = "http://localhost:8000";

// conexion con api--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

window.addEventListener("load", mostrarCliente);

// mostrar listado clientes-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function mostrarCliente() {
        fetch(`${host}/clientes`)
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          const containerDiv = document.getElementById("listadoclientes");
          let innerHTML = "<div><ul>";
    
          for (let i = 0; i < json.length; i++) {
            innerHTML += `<li id = "h1">${json[i].razonsocial}</li> 
            <p>${json[i].cif}</p>
            <p>${json[i].sector}</p>
            <p>${json[i].telefono}</p>
            <p>${json[i].numeroempleados}</p>
            <button onclick="editarDatos()(${json[i].id})">Editar datos</button>`;
          }
          innerHTML += "</ul></div>"; 
          containerDiv.innerHTML = innerHTML;
        })
        .catch(function (error) {
          console.log(error);
        });      
  };

// funcion editar datos del cliente

function editarDatos() {
    fetch(`${host}/clientes/:id`)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const containerDiv = document.getElementById("listadoclientes");
      let innerHTML = "<ul>";

      for (let i = 0; i < json.length; i++) {
        innerHTML += `<li>${json[i].razonsocial}</li> <button onclick="editarDatos()(${json[i].id})">Editar datos</button>`;
      }
      innerHTML += "</ul>"; 
      containerDiv.innerHTML = innerHTML;
    })
    .catch(function (error) {
      console.log(error);
    });      
};

// funcion guardar cambios

//   function guardar_cambios(json) {
//     let razonsocial = json[i].razonsocial;
//     let cif = json[i].cif;
//     let sector = json[i].sector;
//     let telefono = json[i].telefono;
//     let numeroempleados = json[i].numeroempleados;
    

//     if (password == repitePassword) {
//       fetch(`${host}/registro`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           razonsocial: razonsocial,
//           cif: cif,
//           sector: sector,
//           telefono: telefono,
//           numeroempleados: numeroempleados
//         }),
//       })
//         .then(function (response) {
//           return response.json();
//         })
//         .then(function (json) {
//           if (json.registrado) {
//             localStorage.setItem("email", email);
//             window.location.href = "/index.html";
//           }
//         })
//         .catch(function (error) {
//           alert(error);
//         });
//     } else {
//       alert("las contraseñas no coinciden");
//     }
//   }
  

// funcion para mostrar usuario donde login/register-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  window.addEventListener("load", function (event) {
    if (localStorage.getItem("email")) {
      let registrado = document.getElementById("registrado");
      registrado.innerHTML = `<li>${localStorage.getItem(
        "email"
      )}</li><button onClick="desloguear()">Salir</button>`;
    }
  });
  
  // funcion desloguearse-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function desloguear() {
    localStorage.removeItem("email");
    let loginemail = document.getElementById("registrado");
    loginemail.innerHTML = `<div id="registrado"><li><a href="/html/login.html">Login/registro</a></li></div>`;
  }
  