const mysql = require("mysql");
const config = require("../config");

const connection = mysql.createConnection({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
});

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

function list(table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (error, data) => {
      if (error) return reject(error);
      resolve(data);
    });
  });
}

function get(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} WHERE id = '${id}'`,
      (error, data) => {
        if (error) return reject(error);
        resolve(data);
      }
    );
  });
}

async function upsert(table, data) {
  let row = [];
  if (data.id) {
    row = await get(table, data.id);
  }

  if (row.length === 0) {
    return insert(table, data);
  } else {
    return update(table, data);
  }
}

function insert(table, data) {
  console.log("🚀 ~ file: mysql.js:62 ~ insert ~ data:", data);
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
}

function update(table, data = {}) {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ${table} SET ? WHERE id = ?`,
      [data, data.id],
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
  });
}

module.exports = {
  list,
  get,
  upsert,
};
