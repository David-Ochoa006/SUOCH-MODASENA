// import {createPool} from "mysql2/promise";

// const pool = createPool({
//     host:"localhost",
//     port: 3306,
//     datebase:"",
//     user:"root",
//     passeword:"root123"
// })


// const mysql = require('mysql2');

// // Crear la conexión
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'tu-contraseña',
//   database: 'nombre_base_datos'
// });

// // Consulta a la base de datos
// connection.query('SELECT * FROM productos', (err, results) => {
//   if (err) throw err;
//   console.log(results); // Resultados de la consulta
// });

const mysql = require('mysql2');

// Crear conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost', // O la dirección del servidor MySQL
  user: 'root',      // Usuario de MySQL
  password: 'root0603', // Contraseña de MySQL
  database: 'SUOCHMODA', // Nombre de tu base de datos
});

// Verificar la conexión
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a MySQL:', err);
    return;
  }
  console.log('Conectado a MySQL');
});

module.exports = connection;
