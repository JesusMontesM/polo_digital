const express = require(`express`);
const app = express();

app.use(express.static(`public`));
app.use(express.json());

// handleSQLError------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



// crear conexion con mysql------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "bichomalo17",
  database: "polo_digital",
});

// conectar con mysql------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

connection.connect(function (error) {
  if (error) {
    return console.error(`error: ${error.message}`);
  }

  console.log("Conectado a MYSQL!!!");
});

// Funciones utiles---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Endpoints para Index------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.get(`/carrusel`, function (request, response) {
  // select * from eventos
  connection.query("select * from eventos", function (error, result, fields) {
    if (error) {
      response.status(400).send(`error: ${error.message}`);
      return;
    }
    let total = request.query.total;
    let eventos = [];
    for (let i = 0; i < total; i++) {
      eventos[i] = result[i];
    }
    response.send(eventos);
  });
});

app.get("/evento/:idevento", function (request, response) {
  const idEvento = request.params.idevento;

  connection.query(
    `select * from eventos where id = "${idEvento}"`,
    function (error, result, fields) {
      if (error) {
        response.status(400).send(`error: ${error.message}`);
        return;
      }

      if (result.length == 0) {
        response.send({});
      } else {
        response.send(result[0]);
      }
    }
  );
});

// Termina el Index------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Endpoints para login y registro------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// app.get(`/login`, function (request, response) {
//   // hacer un login

//   connection.query(
//     `select * from usuarios where email = "${request.query.email}" and password = "${request.query.password}"`,
//     function (error, result, fields) {
//       if (error) {
//         response.status(400).send(`error: ${error.message}`);
//         return;
//       }

//       if (result.length == 0) {
//         response.send({ message: "email o password no validos" });
//       } else {
//         response.send({ message: "usuario logueado" });
//       }
//     }
//   );
// });

// login con app.post------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.post(`/login`, function (request, response) {
  let email = request.body.email;
  let password = request.body.password;
  connection.query(
    `select * from usuarios where email = "${email}" and password = "${password}"`,
    function (error, result, fields) {
      if (error) {
        response.status(400).send(`error: ${error.message}`);
        return;
      }

      if (result.length == 0) {
        response.send({ message: "email o password no validos" });
      } else {
        response.send({ message: "usuario logueado" });
      }
    }
  );
});

app.post(`/registro`, function (request, response) {
  // hacer un registro
  let nombre = request.body.nombre;
  let apellidos = request.body.apellidos;
  let email = request.body.email;
  let password = request.body.password;

  // console.log(request.body);

  // insert into usuarios------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  connection.query(
    `insert into usuarios (email, password) values ("${email}", "${password}")`,
    function (error, result, fields) {
      if (error) {
        response.status(400).send(`error: ${error.message}`);
        return;
      }
      console.log("usuario insertado");
    }
  );

  // select from usuarios------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  connection.query(
    `select id from usuarios where email = "${email}"`,
    function (error, resultselect, fields) {
      if (error) {
        response.status(400).send(`error: ${error.message}`);
        return;
      }
      const usuarioID = resultselect[0].id;

      // insert into empleados_clientes------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

      connection.query(
        `insert into empleados_clientes (nombre, apellidos, usuarioID) values ("${nombre}", "${apellidos}", "${usuarioID}")`,
        function (error, resultinsert, fields) {
          if (error) {
            response.status(400).send(`error: ${error.message}`);
            return;
          }
          response.send(resultinsert);
        }
      );
    }
  );
});

// Termina login y registro------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Endpoints para clientes------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.get("/clientes", function (request, response) {
  connection.query(`select * from clientes`, function (error, result, fields) {
    if (error) {
      response.status(400).send(`error: ${error.message}`);
      return;
    }
    response.send(result);
  });
  // console.log("listado de clientes en base de datos");
});

app.post("/clientes/:id", function (request, response) {
  let razonsocial = request.body.razonsocial;
  let cif = request.body.cif;
  let sector = request.body.sector;
  let telefono = request.body.telefono;
  let numeroempleados = request.body.numeroempleados;
  connection.query(
    `update clientes set razonsocial = "${razonsocial}", cif = "${cif}", sector = "${sector}", telefono = "${telefono}", numeroempleados = "${numeroempleados}" where id = "${request.params.id}"`,
    function (error, result, fields) {
      if (error) {
        response.status(400).send(`error: ${error.message}`);
        return;
      }
     
      response.send(request.body);
    }
  );
  console.log("cliente actualizado");
  // console.log("update clientes en base de datos");
});

app.post("/clientes", function (request, response) {
  let razonsocial = request.body.razonsocial;
  let cif = request.body.cif;
  let sector = request.body.sector;
  let telefono = request.body.telefono;
  let numeroempleados = request.body.numeroempleados;
  connection.query(
    `insert into clientes (razonsocial, cif, sector, telefono, numeroempleados) values ("${razonsocial}", "${cif}", "${sector}", "${telefono}", "${numeroempleados}")`,
    function (error, result, fields) {
      if (error) {
        response.status(400).send(`error: ${error.message}`);
        return;
      }
      console.log("cliente insertado");
      response.send(request.body);
    }
  );
  // console.log("insertar nuevo cliente en base de datos");
});

// extra------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.get("/clientes/:id", function (request, response) {
  connection.query(`select * from clientes where id = "${request.params.id}"`, function (error, result, fields) {
    if (error) {
      response.status(400).send(`error: ${error.message}`);
      return;
    }
    response.send(result);
  });
  console.log("datos del cliente");
  // console.log("obtiene los datos del cliente con el id en :id");
});

// Termina clientes------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.listen(8000, function () {
  console.log("server is up and running!!!");
});
