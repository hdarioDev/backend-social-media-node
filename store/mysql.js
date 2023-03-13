const mysql = require("mysql");
const config = require("../config");

const connection = mysql.createConnection({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
});

// function list(table) {
//   return new Promise((resolve, reject) => {
//     connection.query(`SELECT * FROM ${table}`, (error, data) => {
//       if (error) return reject(error);
//       resolve(data);
//     });
//   });
// }

function handleConnection() {
  connection.connect((error) => {
    if (error) {
      console.error("[db error]", error);
      setTimeout(handleConnection, 2000);
    } else {
      console.log("DB connected!");
    }
  });

  connection.on("error", (error) => {
    console.error("[db error]", error);
    if (error.code === "PROTOCOL_CONNECTION_LOST") {
      handleConnection();
    } else {
      throw error;
    }
  });
}

handleConnection();
