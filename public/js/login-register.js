const host = "http://localhost:8000";

// funcion para el login-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  // const checked = document.getElementById("checked").checked;
  // console.log(checked);

  fetch(`${host}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      console.log(json);

      alert(json.message);

      if (json.registrado) {
        localStorage.setItem("email", email);
        window.location.href = "/index.html";
      }
    })
    .catch(function (error) {
      alert(error);
    });
}

// funcion para el register-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function register() {
  const nombre = document.getElementById("nombre").value;
  const apellidos = document.getElementById("apellidos").value;
  const email = document.getElementById("email-register").value;
  const password = document.getElementById("password-register").value;
  const repitePassword = document.getElementById("repitecontraseña").value;
  const razonsocial = document.getElementById("razonsocial").value;

  if (password == repitePassword) {
    fetch(`${host}/registro`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        nombre: nombre,
        apellidos: apellidos,
        repitePassword: repitePassword,
        razonsocial: razonsocial,
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        if (json.registrado) {
          localStorage.setItem("email", email);
          window.location.href = "/index.html";
        }
      })
      .catch(function (error) {
        alert(error);
      });
  } else {
    alert("las contraseñas no coinciden");
  }
}
